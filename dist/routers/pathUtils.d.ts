import pathToRegexp from 'path-to-regexp';
import queryString from 'query-string';
export declare function getParamsFromPath(inputParams: {}, pathMatch: RegExpExecArray, pathMatchKeys: pathToRegexp.Key[]): {};
export declare function urlToPathAndParams(url: string, uriPrefix?: string): {
    path: string;
    params: queryString.OutputParams;
};
export declare function createPathParser(childRouters: import('../routers').NavigationChildRouters<any>, routeConfigs: import('../types').NavigationRouteConfigMap, routerConfig: import('../routers').NavigationRouterConfig<any>): {
    getActionForPathAndParams: (pathToResolve?: string, inputParams?: {}) => import("../actions").NavigationNavigateAction | null;
    getPathAndParamsForRoute: (route: import("../types").NavigationRoute<import("../types").NavigationParams>) => {
        path: string;
        params: {};
    };
};
