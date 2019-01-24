// types
import {
  NavigationScreenProp,
  NavigationScreenPropRoot
} from './screens';
import {
  NavigationState,
  NavigationParams,
} from './types';

export default function getChildrenNavigationCache<
  State extends NavigationState,
  Params = NavigationParams,
  Actions = {}
>(
  navigation?: NavigationScreenPropRoot<State, Params, Actions>
): {
  [child: string]: NavigationScreenProp<State, Params, Actions>;
} {
  if (!navigation) {
    return {};
  }

  const childrenNavigationCache =
    navigation._childrenNavigation || (navigation._childrenNavigation = {});
  const childKeys = navigation.state.routes.map(route => route.key);
  Object.keys(childrenNavigationCache).forEach(cacheKey => {
    if (!childKeys.includes(cacheKey) && !navigation.state.isTransitioning) {
      delete childrenNavigationCache[cacheKey];
    }
  });

  return navigation._childrenNavigation;
}
