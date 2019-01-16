import { NavigationState, NavigationRouteConfigMap } from '../types';
import { NavigationSwitchRouterConfig } from '../routers';
export declare function createSwitchNavigator<State extends NavigationState>(routeConfigMap: NavigationRouteConfigMap, switchConfig?: NavigationSwitchRouterConfig<NavigationState>): import("..").NavigationNavigator<NavigationState, import("..").NavigationScreenOptions, import(".").NavigationViewProps<any, any>>;
