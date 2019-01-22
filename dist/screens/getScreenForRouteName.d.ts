/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
export default function getScreenForRouteName(routeConfigs: import('../types').NavigationRouteConfigMap, routeName: string): import(".").NavigationComponent<any, import(".").NavigationScreenOptions>;
