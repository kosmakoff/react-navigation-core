import { TabRouter as TabRouterTest } from '../TabRouter';
import { StackRouter as StackRouterTest } from '../StackRouter';
import { SwitchRouter as SwitchRouterTest } from '../SwitchRouter';

interface TestNavigationState {
  key?: string;
  index?: number;
  params?: any;
  routeName?: string;
  isTransitioning?: boolean;
  routes?: TestNavigationState[];
};

type Router = (
  routeConfigs: import('../../types').NavigationRouteConfigMap,
  config?: any
) => import('..').NavigationRouter<TestNavigationState>;

export const TabRouter = TabRouterTest as Router;
export const StackRouter = StackRouterTest as Router;
export const SwitchRouter = SwitchRouterTest as Router;
