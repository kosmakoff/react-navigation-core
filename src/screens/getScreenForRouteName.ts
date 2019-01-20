import { isValidElementType } from 'react-is';
import invariant from 'invariant';
import { NavigationComponent } from '../screens';
import { NavigationRouteConfigMap } from '../types';

/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
export default function getScreenForRouteName(
  routeConfigs: NavigationRouteConfigMap,
  routeName: string
) {
  const routeConfig = routeConfigs[routeName];
  if (!routeConfig) {
    invariant(
      false,
      `There is no route defined for key ${routeName}.\n` +
        `Must be one of: ${Object.keys(routeConfigs)
          .map(a => `'${a}'`)
          .join(',')}`
    );
  }

  if ('screen' in routeConfig) {
    return routeConfig.screen;
  }

  if (
    'getScreen' in routeConfig &&
    typeof routeConfig.getScreen === 'function'
  ) {
    const screen = routeConfig.getScreen();
    if (!isValidElementType(screen)) {
      invariant(
        false,
        `The getScreen defined for route '${routeName} didn't return a valid ` +
          'screen or navigator.\n\n' +
          'Please pass it like this:\n' +
          `${routeName}: {\n  getScreen: () => require('./MyScreen').default\n}`
      );
    }
    return screen;
  }

  return routeConfig as NavigationComponent<any>;
}
