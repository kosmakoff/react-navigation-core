declare type NavigationScreenOptions = import('../screens').NavigationScreenOptions;
declare type NavigationState = import('../types').NavigationState;
declare type NavigationStackRouterActionCreators = import('../routers').NavigationStackRouterActionCreators;
export declare function StackRouter<Actions extends NavigationStackRouterActionCreators>(routeConfigs: import('../types').NavigationRouteConfigMap, stackConfig?: import('../routers').NavigationStackRouterConfig<NavigationState>): import('../routers').NavigationRouter<NavigationState, NavigationScreenOptions, Actions>;
export {};
