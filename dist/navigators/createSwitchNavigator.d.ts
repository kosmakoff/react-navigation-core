import { NavigationState, NavigationRouteConfigMap } from '../types';
declare type NavigationSwitchRouterConfig<S> = import('../routers').NavigationSwitchRouterConfig<S>;
export declare function createSwitchNavigator<State extends NavigationState>(routeConfigMap: NavigationRouteConfigMap, switchConfig?: NavigationSwitchRouterConfig<NavigationState>): import(".").NavigationNavigator<NavigationState, import("..").NavigationScreenOptions, Pick<import(".").NavigationViewProps<NavigationState, import("..").NavigationScreenOptions>, "navigation" | "screenProps">>;
export {};
