declare type NavigationState = import('../types').NavigationState;
export declare function createSwitchNavigator<State extends NavigationState>(routeConfigMap: import('../types').NavigationRouteConfigMap, switchConfig?: import('../routers').NavigationSwitchRouterConfig<NavigationState>): import("..").NavigationNavigator<import("../types").NavigationState, import("..").NavigationScreenOptions, import("..").NavigationNavigatorProps<import("../types").NavigationState, import("..").NavigationScreenOptions>>;
export {};
