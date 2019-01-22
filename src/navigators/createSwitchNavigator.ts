import { createNavigator } from './createNavigator';
import SwitchView from '../views/SwitchView/SwitchView';
import { SwitchRouter } from '../routers';

type NavigationState = import('../types').NavigationState;

export function createSwitchNavigator<State extends NavigationState>(
  routeConfigMap: import('../types').NavigationRouteConfigMap,
  switchConfig: import('../routers').NavigationSwitchRouterConfig<NavigationState> = {}
) {
  const router = SwitchRouter(routeConfigMap, switchConfig);
  return createNavigator(SwitchView, router, switchConfig);
}
