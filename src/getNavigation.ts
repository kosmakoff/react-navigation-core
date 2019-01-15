import getChildNavigation from './getChildNavigation';
import getChildrenNavigationCache from './getChildrenNavigationCache';
import { NavigationRouter } from './routers';
import { getNavigationActionCreators } from './actions';
import { NavigationScreenPropRoot } from './screens';
import { NavigationEventType } from './views/events';
import {
  NavigationDispatch,
  NavigationEventCallback,
  NavigationParams
} from './types';

export function getNavigation<
  State = {},
  Params = NavigationParams,
  Actions = {}
>(
  router: NavigationRouter<State, Params, Actions>,
  state: State,
  dispatch: NavigationDispatch,
  actionSubscribers: Set<NavigationEventCallback>,
  getScreenProps: () => {},
  getCurrentNavigation: () => NavigationScreenPropRoot<any, Params, Actions>
): NavigationScreenPropRoot<State, Params, Actions> {

  const actionCreators: Actions = {
    ...router.getActionCreators(state as any, null),
    ...getNavigationActionCreators(state as any),
  };

  const actionHelpers = {};
  Object.keys(actionCreators).forEach(actionName => {
    actionHelpers[actionName] = (...args: any[]) =>
      dispatch(actionCreators[actionName](...args));
  });

  const navigation = {
    ...actionHelpers,
    state,
    router,
    actions: actionCreators,
    dispatch,
    getScreenProps,
    getChildNavigation: (childKey: string) =>
      getChildNavigation(navigation, childKey, getCurrentNavigation),
    isFocused: (childKey?: string) => {
      const { routes, index } = getCurrentNavigation().state;
      if (childKey == null || routes[index].key === childKey) {
        return true;
      }
      return false;
    },
    addListener: (eventName: NavigationEventType, handler: NavigationEventCallback) => {
      if (eventName !== 'action') {
        return { remove: () => {} };
      }
      actionSubscribers.add(handler);
      return {
        remove: () => {
          actionSubscribers.delete(handler);
        },
      };
    },
    dangerouslyGetParent: () => null,
    _childrenNavigation: getChildrenNavigationCache(getCurrentNavigation()),
  } as NavigationScreenPropRoot<State, Params, Actions>;

  return navigation;
}
