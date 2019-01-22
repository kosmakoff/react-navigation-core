import withDefaultValue from '../utils/withDefaultValue';
import { SwitchRouter } from '../routers';

type NavigationState = import('../types').NavigationState;

/* tslint:disable:no-parameter-reassignment */
export function TabRouter(
  routeConfigs: import('../types').NavigationRouteConfigMap,
  config: import('../routers').NavigationTabRouterConfig<NavigationState> = {} as any
) {
  config = { ...config };
  config = withDefaultValue(config, 'resetOnBlur', false);
  config = withDefaultValue(config, 'backBehavior', 'initialRoute');

  const switchRouter = SwitchRouter(routeConfigs, config);
  return switchRouter;
}
