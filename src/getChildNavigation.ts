import getChildEventSubscriber from './getChildEventSubscriber';
import getChildrenNavigationCache from './getChildrenNavigationCache';
import getChildRouter from './getChildRouter';
import { getNavigationActionCreators } from './actions';
import {
  NavigationScreenProp,
  NavigationScreenPropChild
} from './screens';
import {
  NavigationParams,
  NavigationRoute,
  NavigationState
} from './types';

const createParamGetter = <P extends NavigationParams>(route: NavigationRoute<P>) =>
  <T extends keyof P>(paramName: T, defaultValue: NonNullable<P[T]>): NonNullable<P[T]> => {
    const params = route.params;

    if (params && paramName in params) {
      return params[paramName];
    }

    return defaultValue;
  };

export default function getChildNavigation<
  State extends NavigationState,
  Params = NavigationParams,
  Actions = {},
>(
  navigation: NavigationScreenProp<State, Params, Actions>,
  childKey: string,
  getCurrentParentNavigation: () => NavigationScreenProp<State, Params, Actions> | null
): NavigationScreenPropChild<State, Params, Actions> | null {

  const children = getChildrenNavigationCache(navigation);
  const childRoute = navigation.state.routes.find(r => r.key === childKey);

  if (!childRoute) {
    return null;
  }

  if (children[childKey] && children[childKey].state === childRoute) {
    return children[childKey];
  }

  const childRouter = getChildRouter(navigation.router as any, childRoute.routeName);

  // If the route has children, we'll use this to pass in to the action creators
  // for the childRouter so that any action that depends on the active route will
  // behave as expected. We don't explicitly require that routers implement routes
  // and index properties, but if we did then we would put an invariant here to
  // ensure that a focusedGrandChildRoute exists if childRouter is defined.
  const focusedGrandChildRoute =
    'routes' in childRoute ? childRoute.routes[childRoute.index] : null;

  const actionCreators: Actions = {
    ...navigation.actions,
    ...navigation.router.getActionCreators(childRoute, navigation.state.key),
    ...(childRouter && childRouter.getActionCreators(focusedGrandChildRoute, childRoute.key)),
    ...getNavigationActionCreators(childRoute),
  };

  const actionHelpers = {};
  Object.keys(actionCreators).forEach(actionName => {
    actionHelpers[actionName] = (...args: any[]) =>
      navigation.dispatch(actionCreators[actionName](...args));
  });

  if (children[childKey]) {
    children[childKey] = {
      ...children[childKey] as any,
      ...actionHelpers,
      state: childRoute as NavigationState,
      router: childRouter as any,
      actions: actionCreators,
      //getParam: createParamGetter(childRoute) as any, // TS overload method workaround
      getParam: createParamGetter(childRoute),
    } as NavigationScreenPropChild<State, Params, Actions>;

    return children[childKey];
  }
  const childSubscriber = getChildEventSubscriber(
    navigation.addListener,
    childKey
  );

  children[childKey] = {
    ...actionHelpers,

    state: childRoute as NavigationState,
    router: childRouter as any,
    actions: actionCreators,
    //getParam: createParamGetter(childRoute) as any,
    getParam: createParamGetter(childRoute),

    getChildNavigation: (grandChildKey: string) =>
      getChildNavigation(children[childKey], grandChildKey, () => {
        const nav = getCurrentParentNavigation();
        return nav && nav.getChildNavigation(childKey);
      }),

    isFocused: () => {
      const currentNavigation = getCurrentParentNavigation();
      if (!currentNavigation) {
        return false;
      }
      const { routes, index } = currentNavigation.state;
      if (!currentNavigation.isFocused()) {
        return false;
      }
      if (routes[index].key === childKey) {
        return true;
      }
      return false;
    },
    dispatch: navigation.dispatch,
    getScreenProps: navigation.getScreenProps,
    dangerouslyGetParent: getCurrentParentNavigation,
    addListener: childSubscriber.addListener,
    emit: childSubscriber.emit,
  } as NavigationScreenPropChild<State, Params, Actions>;

  return children[childKey];
}
