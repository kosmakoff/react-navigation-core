import { createNavigator } from './createNavigator';
import SwitchView from '../views/SwitchView/SwitchView';
import {
  NavigationState,
  NavigationRouteConfigMap
} from '../types';
import {
  NavigationSwitchRouterConfig,
  SwitchRouter
} from '../routers';

export function createSwitchNavigator<State extends NavigationState>(
  routeConfigMap: NavigationRouteConfigMap,
  switchConfig: NavigationSwitchRouterConfig<NavigationState> = {}
) {
  const router = SwitchRouter(routeConfigMap, switchConfig);
  return createNavigator(SwitchView, router, switchConfig);
}
