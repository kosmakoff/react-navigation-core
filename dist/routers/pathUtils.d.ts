import pathToRegexp from 'path-to-regexp';
import queryString from 'query-string';
import { NavigationChildRouters, NavigationRouterConfig } from '../routers';
import { NavigationNavigateAction } from '../actions';
import { NavigationParams, NavigationRoute, NavigationRouteConfigMap } from '../types';
export declare function getParamsFromPath(inputParams: {}, pathMatch: RegExpExecArray, pathMatchKeys: pathToRegexp.Key[]): {};
export declare function urlToPathAndParams(url: string, uriPrefix?: string): {
    path: string;
    params: queryString.OutputParams;
};
export declare function createPathParser(childRouters: NavigationChildRouters<any>, routeConfigs: NavigationRouteConfigMap, routerConfig: NavigationRouterConfig<any>): {
    getActionForPathAndParams: (pathToResolve?: string, inputParams?: {}) => NavigationNavigateAction | null;
    getPathAndParamsForRoute: (route: NavigationRoute<NavigationParams>) => {
        path: string;
        params: {};
    };
};
