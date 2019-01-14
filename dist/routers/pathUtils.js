"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_to_regexp_1 = tslib_1.__importStar(require("path-to-regexp"));
const query_string_1 = tslib_1.__importDefault(require("query-string"));
const utils_1 = require("../utils");
const actions_1 = require("../actions");
;
function getParamsFromPath(inputParams, pathMatch, pathMatchKeys) {
    const params = pathMatch.slice(1).reduce(
    // iterate over matched path params
    (paramsOut, matchResult, i) => {
        const key = pathMatchKeys[i];
        if (!key || key.asterisk) {
            return paramsOut;
        }
        const paramName = key.name;
        let decodedMatchResult;
        if (matchResult) {
            try {
                decodedMatchResult = decodeURIComponent(matchResult);
            }
            catch (e) {
                // ignore `URIError: malformed URI`
            }
        }
        paramsOut[paramName] = decodedMatchResult || matchResult;
        return paramsOut;
    }, Object.assign({}, inputParams));
    return params;
}
exports.getParamsFromPath = getParamsFromPath;
;
function getRestOfPath(pathMatch, pathMatchKeys) {
    return pathMatch[pathMatchKeys.findIndex(k => k.asterisk) + 1];
}
;
function urlToPathAndParams(url, uriPrefix) {
    const searchMatch = url.match(/^(.*)\?(.*)$/);
    const params = searchMatch ? query_string_1.default.parse(searchMatch[2]) : {};
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
}
exports.urlToPathAndParams = urlToPathAndParams;
;
function createPathParser(childRouters, routeConfigs, routerConfig) {
    const pathConfigs = routerConfig.paths || {};
    const { disableRouteNamePaths } = routerConfig;
    const pathsByRouteNames = {};
    // Build pathsByRouteNames, which includes a regex to match paths for each route.
    // Keep in mind, the regex will pass for the route and all child routes.
    // The code that uses pathsByRouteNames will need to also verify that the child router produces an action,
    // in the case of isPathMatchable false (a null path).
    Object.keys(childRouters).forEach(routeName => {
        let pathPattern;
        // First check for paths on the router, then check the route config
        if (pathConfigs[routeName] !== undefined) {
            pathPattern = pathConfigs[routeName];
        }
        else {
            pathPattern = routeConfigs[routeName].path;
        }
        if (pathPattern === undefined) {
            // If the user hasn't specified a path at all nor disableRouteNamePaths,
            // then we assume the routeName is an appropriate path
            pathPattern = disableRouteNamePaths ? null : routeName;
        }
        utils_1.invariant(pathPattern === null || typeof pathPattern === 'string', `Route path for ${routeName} must be specified as a string, or null.`);
        // the path may be specified as null, which is similar to empty string because
        // it allows child routers to handle the action, but it will not match empty paths
        const isPathMatchable = pathPattern !== null;
        // pathPattern is a string with inline params, such as people/:id/*foo
        const exactReKeys = [];
        const exactRe = isPathMatchable
            ? path_to_regexp_1.default(pathPattern, exactReKeys)
            : null;
        const extendedPathReKeys = [];
        const isWildcard = pathPattern === '' || !isPathMatchable;
        const extendedPathRe = path_to_regexp_1.default(isWildcard ? '*' : `${pathPattern}/*`, extendedPathReKeys);
        pathsByRouteNames[routeName] = {
            exactRe,
            exactReKeys,
            extendedPathRe,
            extendedPathReKeys,
            isWildcard,
            toPath: pathPattern === null ? () => '' : path_to_regexp_1.compile(pathPattern),
        };
    });
    const paths = Object.entries(pathsByRouteNames);
    function getActionForPathAndParams(pathToResolve = '', inputParams = {}) {
        // Attempt to match `pathToResolve` with a route in this router's routeConfigs, deferring to child routers
        for (const [routeName, path] of paths) {
            const { exactRe, exactReKeys, extendedPathRe, extendedPathReKeys } = path;
            const childRouter = childRouters[routeName];
            const exactMatch = exactRe && exactRe.exec(pathToResolve);
            if (exactMatch && exactMatch.length) {
                const extendedMatch = extendedPathRe && extendedPathRe.exec(pathToResolve);
                let childAction = null;
                if (extendedMatch && childRouter) {
                    const restOfPath = getRestOfPath(extendedMatch, extendedPathReKeys);
                    const action = childRouter.getActionForPathAndParams(restOfPath, inputParams);
                    if (action && action.type === actions_1.NavigationActions.NAVIGATE) {
                        childAction = action;
                    }
                }
                return actions_1.NavigationActions.navigate({
                    routeName,
                    params: getParamsFromPath(inputParams, exactMatch, exactReKeys),
                    action: childAction,
                });
            }
        }
        for (const [routeName, path] of paths) {
            const { extendedPathRe, extendedPathReKeys } = path;
            const childRouter = childRouters[routeName];
            const extendedMatch = extendedPathRe && extendedPathRe.exec(pathToResolve);
            if (extendedMatch && extendedMatch.length) {
                let childAction = null;
                if (childRouter) {
                    const restOfPath = getRestOfPath(extendedMatch, extendedPathReKeys);
                    const action = childRouter.getActionForPathAndParams(restOfPath, inputParams);
                    if (action && action.type === actions_1.NavigationActions.NAVIGATE) {
                        childAction = action;
                    }
                }
                if (!childAction) {
                    continue;
                }
                return actions_1.NavigationActions.navigate({
                    routeName,
                    params: getParamsFromPath(inputParams, extendedMatch, extendedPathReKeys),
                    action: childAction,
                });
            }
        }
        return null;
    }
    ;
    function getPathAndParamsForRoute(route) {
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
            const child = childRouter.getPathAndParamsForState(route);
            return {
                path: subPath ? `${subPath}/${child.path}` : child.path,
                params: child.params
                    ? Object.assign({}, nonPathParams, child.params) : nonPathParams,
            };
        }
        return {
            path: subPath,
            params: nonPathParams,
        };
    }
    ;
    return { getActionForPathAndParams, getPathAndParamsForRoute };
}
exports.createPathParser = createPathParser;
;
//# sourceMappingURL=pathUtils.js.map