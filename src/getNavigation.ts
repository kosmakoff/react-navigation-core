import getChildNavigation from './getChildNavigation';
import getChildrenNavigationCache from './getChildrenNavigationCache';
import { getNavigationActionCreators } from './actions';

type NavigationParams = import('./types').NavigationParams;
type NavigationScreenPropRoot<S, P, A> =
  import('./screens').NavigationScreenPropRoot<S, P, A>;

export function getNavigation<
  State = {},
  Params = NavigationParams,
  Actions = {}
>(
  router: import('./routers').NavigationRouter<State, Params, Actions>,
  state: State,
  dispatch: import('./types').NavigationDispatch,
  actionSubscribers: Set<import('./types').NavigationEventCallback>,
  getScreenProps: () => {},
  getCurrentNavigation:
    () => NavigationScreenPropRoot<any, Params, Actions>
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
    addListener: (
      eventName: import('./views/events').NavigationEventType,
      handler: import('./types').NavigationEventCallback
    ) => {
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
