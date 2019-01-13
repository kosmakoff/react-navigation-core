import { NavigationParams, NavigationState } from './types';
import { NavigationScreenProp } from './screens';

export default function getChildrenNavigationCache<
  State extends NavigationState,
  Params = NavigationParams,
  Actions = {},
>(
  navigation?: NavigationScreenProp<State, Params, Actions>
) {
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
