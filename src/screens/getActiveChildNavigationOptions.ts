import { NavigationState } from '../types';
import {
  NavigationScreenProp,
  NavigationScreenOptions,
  NavigationComponentScreenProps
} from '../screens';

export default function getActiveChildNavigationOptions<State extends NavigationState>(
  navigation: NavigationScreenProp<State>,
  screenProps: NavigationComponentScreenProps
): NavigationScreenOptions | null | undefined {
  const { state, router, getChildNavigation } = navigation;
  const activeRoute = state.routes[state.index];
  const activeNavigation = getChildNavigation(activeRoute.key);
  return activeNavigation && router.getScreenOptions(activeNavigation, screenProps);
};
