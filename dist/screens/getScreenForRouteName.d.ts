import { NavigationComponent } from '../screens';
import { NavigationRouteConfigMap } from '../types';
/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
export default function getScreenForRouteName(routeConfigs: NavigationRouteConfigMap, routeName: string): NavigationComponent<any, import(".").NavigationScreenOptions>;
