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
        if (typeof route.key !== 'string') {
          throw new Error('key should be a string');
        }
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
      if (typeof navigateTo !== 'object') {
        throw new Error('Must navigateTo an object or a string');
      }
      if (params != null) {
        throw new Error('Params must not be provided to .navigate() when specifying an object');
      }
      if (action != null) {
        throw new Error('Child action must not be provided to .navigate() when specifying an object');
      }
      return NavigationActions.navigate(navigateTo);
    },
    setParams: (params?: Params) => {
      if (typeof route.key !== 'string') {
        throw Error('setParams cannot be called by root navigator');
      }
      return NavigationActions.setParams({ params, key: route.key });
    },
  };
};
