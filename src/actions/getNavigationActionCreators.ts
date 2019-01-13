import { invariant } from '../utils';
import { NavigationParams, NavigationRoute } from '../types';
import {
  NavigationActions,
  NavigationNavigateAction,
  NavigationActionCreators
} from '../actions';

export function getNavigationActionCreators<Params = NavigationParams>(
  route: NavigationRoute
): NavigationActionCreators<Params> {
  return {
    goBack: (key?: string) => {
      let actualizedKey = key;
      if (key === undefined && 'key' in route) {
        invariant(typeof route.key === 'string', 'key should be a string');
        actualizedKey = route.key;
      }
      return NavigationActions.back({ key: actualizedKey });
    },
    navigate: (navigateTo: string, params?: Params, action?: NavigationNavigateAction) => {
      if (typeof navigateTo === 'string') {
        return NavigationActions.navigate({
          params,
          action,
          routeName: navigateTo,
        });
      }
      invariant(
        typeof navigateTo === 'object',
        'Must navigateTo an object or a string'
      );
      invariant(
        params == null,
        'Params must not be provided to .navigate() when specifying an object'
      );
      invariant(
        action == null,
        'Child action must not be provided to .navigate() when specifying an object'
      );
      return NavigationActions.navigate(navigateTo);
    },
    setParams: (params?: Params) => {
      invariant(
        'key' in route && typeof route.key === 'string',
        'setParams cannot be called by root navigator'
      );
      return NavigationActions.setParams({ params, key: route.key });
    },
  };
};
