"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getChildEventSubscriber_1 = tslib_1.__importDefault(require("./getChildEventSubscriber"));
const getChildrenNavigationCache_1 = tslib_1.__importDefault(require("./getChildrenNavigationCache"));
const getChildRouter_1 = tslib_1.__importDefault(require("./getChildRouter"));
const actions_1 = require("./actions");
/*
const createParamGetter = <P extends NavigationParams>(route: NavigationRoute<P>) =>
  <T extends keyof P>(paramName: T, defaultValue: NonNullable<P[T]>): NonNullable<P[T]> => {
    const params = route.params;

    if (params && paramName in params) {
      return params[paramName];
    }

    return defaultValue;
  };
*/
const createParamGetter = (route) => (paramName, defaultValue) => {
    const params = route.params;
    if (params && paramName in params) {
        return params[paramName];
    }
    return defaultValue;
};
function getChildNavigation(navigation, childKey, getCurrentParentNavigation) {
    const children = getChildrenNavigationCache_1.default(navigation);
    const childRoute = navigation.state.routes.find(r => r.key === childKey);
    if (!childRoute) {
        return null;
    }
    if (children[childKey] && children[childKey].state === childRoute) {
        return children[childKey];
    }
    const childRouter = getChildRouter_1.default(navigation.router, childRoute.routeName);
    // If the route has children, we'll use this to pass in to the action creators
    // for the childRouter so that any action that depends on the active route will
    // behave as expected. We don't explicitly require that routers implement routes
    // and index properties, but if we did then we would put an invariant here to
    // ensure that a focusedGrandChildRoute exists if childRouter is defined.
    const focusedGrandChildRoute = 'routes' in childRoute ? childRoute.routes[childRoute.index] : null;
    const actionCreators = Object.assign({}, navigation.actions, navigation.router.getActionCreators(childRoute, navigation.state.key), (childRouter && childRouter.getActionCreators(focusedGrandChildRoute, childRoute.key)), actions_1.getNavigationActionCreators(childRoute));
    const actionHelpers = {};
    Object.keys(actionCreators).forEach(actionName => {
        actionHelpers[actionName] = (...args) => navigation.dispatch(actionCreators[actionName](...args));
    });
    if (children[childKey]) {
        children[childKey] = Object.assign({}, children[childKey], actionHelpers, { state: childRoute, router: childRouter, actions: actionCreators, getParam: createParamGetter(childRoute) });
        return children[childKey];
    }
    const childSubscriber = getChildEventSubscriber_1.default(navigation.addListener, childKey);
    children[childKey] = Object.assign({}, actionHelpers, { state: childRoute, router: childRouter, actions: actionCreators, getParam: createParamGetter(childRoute), getChildNavigation: (grandChildKey) => getChildNavigation(children[childKey], grandChildKey, () => {
            const nav = getCurrentParentNavigation();
            return nav && nav.getChildNavigation(childKey);
        }), isFocused: () => {
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
        }, dispatch: navigation.dispatch, getScreenProps: navigation.getScreenProps, dangerouslyGetParent: getCurrentParentNavigation, addListener: childSubscriber.addListener, emit: childSubscriber.emit });
    return children[childKey];
}
exports.default = getChildNavigation;
//# sourceMappingURL=getChildNavigation.js.map