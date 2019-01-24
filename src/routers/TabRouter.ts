import withDefaultValue from '../utils/withDefaultValue';
import { SwitchRouter } from '../routers';

// types
import {
  NavigationState,
  NavigationRouteConfigMap
} from '../types';

/* tslint:disable:no-parameter-reassignment */
export function TabRouter(
  routeConfigs: NavigationRouteConfigMap,
  config: import('../routers').NavigationTabRouterConfig<NavigationState> = {} as any
) {
  config = { ...config };
  config = withDefaultValue(config, 'resetOnBlur', false);
  config = withDefaultValue(config, 'backBehavior', 'initialRoute');

  const switchRouter = SwitchRouter(routeConfigs, config);
  return switchRouter;
}
