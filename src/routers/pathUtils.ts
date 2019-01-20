import pathToRegexp, { compile } from 'path-to-regexp';
import queryString from 'query-string';
import invariant from 'invariant';
import { NavigationScreenRouteConfig } from '../screens';
import {
  NavigationChildRouters,
  NavigationRouterConfig
} from '../routers';
import {
  NavigationActions,
  NavigationNavigateAction,
} from '../actions';
import {
  NavigationParams,
  NavigationRoute,
  NavigationRouteConfigMap,
  NavigationStateRoute
} from '../types';

interface PathParsed {
  exactRe: pathToRegexp.PathRegExp | null;
  exactReKeys: pathToRegexp.Key[];
  extendedPathRe: pathToRegexp.PathRegExp | null;
  extendedPathReKeys: pathToRegexp.Key[];
  isWildcard: boolean;
  toPath: (params?: NavigationParams) => string;
};

export function getParamsFromPath(
  inputParams: {},
  pathMatch: RegExpExecArray,
  pathMatchKeys: pathToRegexp.Key[]
) {
  const params = pathMatch.slice(1).reduce(
    // iterate over matched path params
    (paramsOut, matchResult: string, i) => {
      const key = pathMatchKeys[i];
      if (!key || key.asterisk) {
        return paramsOut;
      }
      const paramName = key.name;

      let decodedMatchResult: string | undefined;
      if (matchResult) {
        try {
          decodedMatchResult = decodeURIComponent(matchResult);
        } catch (e) {
          // ignore `URIError: malformed URI`
        }
      }

      paramsOut[paramName] = decodedMatchResult || matchResult;
      return paramsOut;
    },
    {
      // start with the input(query string) params, which will get overridden by path params
      ...inputParams,
    }
  );
  return params;
};

function getRestOfPath(pathMatch: RegExpExecArray, pathMatchKeys: pathToRegexp.Key[]) {
  return pathMatch[pathMatchKeys.findIndex(k => k.asterisk) + 1];
};

export function urlToPathAndParams(url: string, uriPrefix?: string) {
  const searchMatch = url.match(/^(.*)\?(.*)$/);
  const params = searchMatch ? queryString.parse(searchMatch[2]) : {};
  const urlWithoutSearch = searchMatch ? searchMatch[1] : url;
  const delimiter = uriPrefix || '://';
  let path = urlWithoutSearch.split(delimiter)[1];
  if (path === undefined) {
    path = urlWithoutSearch;
  }
  if (path === '/') {
    path = '';
  }
  if (path[path.length - 1] === '/') {
    path = path.slice(0, -1);
  }
  return {
    path,
    params,
  };
};

export function createPathParser(
  childRouters: NavigationChildRouters<any>,
  routeConfigs: NavigationRouteConfigMap,
  routerConfig: NavigationRouterConfig<any>
 ) {
  const pathConfigs = routerConfig.paths || {};
  const { disableRouteNamePaths } = routerConfig;
  const pathsByRouteNames: { [pathName: string]: PathParsed } = {};

  // Build pathsByRouteNames, which includes a regex to match paths for each route.
  // Keep in mind, the regex will pass for the route and all child routes.
  // The code that uses pathsByRouteNames will need to also verify that the child router produces an action,
  // in the case of isPathMatchable false (a null path).
  Object.keys(childRouters).forEach(routeName => {
    let pathPattern;

    // First check for paths on the router, then check the route config
    if (pathConfigs[routeName] !== undefined) {
      pathPattern = pathConfigs[routeName];
    } else {
      pathPattern = (routeConfigs[routeName] as NavigationScreenRouteConfig).path;
    }

    if (pathPattern === undefined) {
      // If the user hasn't specified a path at all nor disableRouteNamePaths,
      // then we assume the routeName is an appropriate path
      pathPattern = disableRouteNamePaths ? null : routeName;
    }

    if (pathPattern !== null && typeof pathPattern !== 'string') {
      invariant(false, `Route path for ${routeName} must be specified as a string, or null.`);
    }

    // the path may be specified as null, which is similar to empty string because
    // it allows child routers to handle the action, but it will not match empty paths
    const isPathMatchable = pathPattern !== null;
    // pathPattern is a string with inline params, such as people/:id/*foo
    const exactReKeys: pathToRegexp.Key[] = [];
    const exactRe = isPathMatchable
      ? pathToRegexp(pathPattern!, exactReKeys)
      : null;
    const extendedPathReKeys: pathToRegexp.Key[] = [];
    const isWildcard = pathPattern === '' || !isPathMatchable;
    const extendedPathRe = pathToRegexp(
      isWildcard ? '*' : `${pathPattern}/*`,
      extendedPathReKeys
    );

    pathsByRouteNames[routeName] = {
      exactRe,
      exactReKeys,
      extendedPathRe,
      extendedPathReKeys,
      isWildcard,
      toPath: pathPattern === null ? () => '' : compile(pathPattern),
    };
  });

  const paths: Array<[string, PathParsed]> = Object.entries(pathsByRouteNames);

  function getActionForPathAndParams(pathToResolve: string = '', inputParams: {} = {}) {
    // Attempt to match `pathToResolve` with a route in this router's routeConfigs, deferring to child routers

    for (const [routeName, path] of paths) {
      const { exactRe, exactReKeys, extendedPathRe, extendedPathReKeys } = path;
      const childRouter = childRouters[routeName];

      const exactMatch = exactRe && exactRe.exec(pathToResolve);

      if (exactMatch && exactMatch.length) {
        const extendedMatch =
          extendedPathRe && extendedPathRe.exec(pathToResolve);
        let childAction: NavigationNavigateAction | null = null;
        if (extendedMatch && childRouter) {
          const restOfPath = getRestOfPath(extendedMatch, extendedPathReKeys);
          const action = childRouter.getActionForPathAndParams(
            restOfPath,
            inputParams
          );
          if (action && action.type === NavigationActions.NAVIGATE) {
            childAction = action;
          }
        }

        return NavigationActions.navigate({
          routeName,
          params: getParamsFromPath(inputParams, exactMatch, exactReKeys),
          action: childAction,
        });
      }
    }

    for (const [routeName, path] of paths) {
      const { extendedPathRe, extendedPathReKeys } = path;
      const childRouter = childRouters[routeName];

      const extendedMatch =
        extendedPathRe && extendedPathRe.exec(pathToResolve);

      if (extendedMatch && extendedMatch.length) {
        let childAction: NavigationNavigateAction | null = null;
        if (childRouter) {
          const restOfPath = getRestOfPath(extendedMatch, extendedPathReKeys);
          const action = childRouter.getActionForPathAndParams(
            restOfPath,
            inputParams
          );
          if (action && action.type === NavigationActions.NAVIGATE) {
            childAction = action;
          }
        }
        if (!childAction) {
          continue;
        }
        return NavigationActions.navigate({
          routeName,
          params: getParamsFromPath(
            inputParams,
            extendedMatch,
            extendedPathReKeys
          ),
          action: childAction,
        });
      }
    }

    return null;
  };

  function getPathAndParamsForRoute(route: NavigationRoute) {
    const { routeName, params } = route;
    const childRouter = childRouters[routeName];
    const { toPath, exactReKeys } = pathsByRouteNames[routeName];
    const subPath = toPath(params);
    const nonPathParams = {};
    if (params) {
      Object.keys(params)
        .filter(paramName => !exactReKeys.find(k => k.name === paramName))
        .forEach(paramName => {
          nonPathParams[paramName] = params[paramName];
        });
    }
    if (childRouter) {
      // If it has a router it's a navigator.
      // If it doesn't have router it's an ordinary React component.
      const child = childRouter.getPathAndParamsForState(route as NavigationStateRoute);
      return {
        path: subPath ? `${subPath}/${child.path}` : child.path,
        params: child.params
          ? { ...nonPathParams, ...child.params }
          : nonPathParams,
      };
    }
    return {
      path: subPath,
      params: nonPathParams,
    };
  };
  return { getActionForPathAndParams, getPathAndParamsForRoute };
};
