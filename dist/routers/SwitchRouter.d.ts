declare type NavigationScreenOptions = import('../screens').NavigationScreenOptions;
declare type NavigationState = import('../types').NavigationState;
declare type NavigationSwitchRouterActionCreators = import('../routers').NavigationSwitchRouterActionCreators;
export declare function SwitchRouter<Actions extends NavigationSwitchRouterActionCreators>(routeConfigs: import('../types').NavigationRouteConfigMap, config?: import('../routers').NavigationSwitchRouterConfig<NavigationState>): import('../routers').NavigationRouter<NavigationState, NavigationScreenOptions, Actions>;
export {};
