import { NavigationScreenOptions } from '../screens';
import { NavigationRouter, NavigationStackRouterConfig, NavigationStackRouterActionCreators } from '../routers';
import { NavigationRouteConfigMap, NavigationState } from '../types';
export declare function StackRouter<Actions extends NavigationStackRouterActionCreators>(routeConfigs: NavigationRouteConfigMap, stackConfig?: NavigationStackRouterConfig<NavigationState>): NavigationRouter<NavigationState, NavigationScreenOptions, Actions>;
