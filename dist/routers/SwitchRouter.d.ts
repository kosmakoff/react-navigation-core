import { NavigationScreenOptions } from '../screens';
import { NavigationRouter, NavigationSwitchRouterConfig, NavigationSwitchRouterActionCreators } from '../routers';
import { NavigationState, NavigationRouteConfigMap } from '../types';
export declare function SwitchRouter<Actions extends NavigationSwitchRouterActionCreators>(routeConfigs: NavigationRouteConfigMap, config?: NavigationSwitchRouterConfig<NavigationState>): NavigationRouter<NavigationState, NavigationScreenOptions, Actions>;
