import { isValidElementType } from 'react-is';
import { NavigationRouteConfigMap } from '../types';
import { NavigationRouteConfig } from '../screens';

/**
 * Make sure the config passed e.g. to StackRouter, TabRouter has
 * the correct format, and throw a clear error if it doesn't.
 */
export default function validateRouteConfigMap(routeConfigs: NavigationRouteConfigMap) {
  const routeNames = Object.keys(routeConfigs);
  if (routeNames.length === 0) {
    throw new Error('Please specify at least one route when configuring a navigator.');
  }

  routeNames.forEach(routeName => {
    const routeConfig = routeConfigs[routeName];
    const screenComponent = getScreenComponent(routeConfig);

    if (
      !screenComponent ||
      (!isValidElementType(screenComponent) && !('getScreen' in routeConfig))
    ) {
      throw new Error(`The component for route '${routeName}' must be a React component. For example:

import MyScreen from './MyScreen';
...
${routeName}: MyScreen,
}

You can also use a navigator:

import MyNavigator from './MyNavigator';
...
${routeName}: MyNavigator,
}`);
    }

    if ('screen' in routeConfig && 'getScreen' in routeConfig) {
      throw new Error(
        `Route '${routeName}' should declare a screen or a getScreen, not both.`
      );
    }
  });
}

function getScreenComponent(routeConfig: NavigationRouteConfig) {
  if (!routeConfig) {
    return null;
  }
  return 'screen' in routeConfig ? routeConfig.screen : routeConfig;
}
