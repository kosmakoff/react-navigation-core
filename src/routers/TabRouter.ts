
import { withDefaultValue } from '../utils';
import {
  NavigationState,
  NavigationRouteConfigMap
} from '../types';
import {
  NavigationTabRouterConfig,
  SwitchRouter
} from '../routers';

/* tslint:disable:no-parameter-reassignment */
export function TabRouter(
  routeConfigs: NavigationRouteConfigMap,
  config: NavigationTabRouterConfig<NavigationState> = {} as any
) {
  config = { ...config };
  config = withDefaultValue(config, 'resetOnBlur', false);
  config = withDefaultValue(config, 'backBehavior', 'initialRoute');

  const switchRouter = SwitchRouter(routeConfigs, config);
  return switchRouter;
};
