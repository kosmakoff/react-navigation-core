import { NavigationRouteConfigMap } from '../types';
import { NavigationScreenConfig, NavigationScreenOptions, NavigationScreenOptionsGetter } from '../screens';
export default function createConfigGetter<Options extends NavigationScreenOptions = NavigationScreenOptions>(routeConfigs: NavigationRouteConfigMap, navigatorScreenConfig?: NavigationScreenConfig<any, Options>): NavigationScreenOptionsGetter<any, Options>;
