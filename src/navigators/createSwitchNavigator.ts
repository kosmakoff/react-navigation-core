import { createNavigator } from './createNavigator';
import SwitchView from '../views/SwitchView/SwitchView';
import { SwitchRouter } from '../routers';

// types
import { NavigationState, NavigationRouteConfigMap } from '../types';

type NavigationSwitchRouterConfig<S> =
  import('../routers').NavigationSwitchRouterConfig<S>;

export function createSwitchNavigator<State extends NavigationState>(
  routeConfigMap: NavigationRouteConfigMap,
  switchConfig: NavigationSwitchRouterConfig<NavigationState> = {}
) {
  const router = SwitchRouter(routeConfigMap, switchConfig);
  return createNavigator(SwitchView, router, switchConfig);
}
