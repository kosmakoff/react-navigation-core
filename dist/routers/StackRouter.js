"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const StateUtils_1 = tslib_1.__importDefault(require("../StateUtils"));
const KeyGenerator_1 = require("./KeyGenerator");
const pathUtils_1 = require("./pathUtils");
const routers_1 = require("../routers");
const actions_1 = require("../actions");
const screens_1 = require("../screens");
const defaultActionCreators = () => ({});
function behavesLikePushAction(action) {
    return (action.type === actions_1.NavigationActions.NAVIGATE ||
        action.type === actions_1.StackActions.PUSH);
}
function isResetToRootStack(action) {
    return action.type === actions_1.StackActions.RESET && action.key === null;
}
function StackRouter(routeConfigs, stackConfig = {}) {
    // Fail fast on invalid route definitions
    routers_1.validateRouteConfigMap(routeConfigs);
    const routeNames = Object.keys(routeConfigs);
    const childRouters = {};
    // Loop through routes and find child routers
    routeNames.forEach(routeName => {
        const screen = screens_1.getScreenForRouteName(routeConfigs, routeName);
        if ('router' in screen) {
            // If it has a router it's a navigator.
            childRouters[routeName] = screen.router;
        }
        else {
            // If it doesn't have router it's an ordinary React component.
            childRouters[routeName] = null;
        }
    });
    const { initialRouteParams } = stackConfig;
    const getCustomActionCreators = stackConfig.getCustomActionCreators || defaultActionCreators;
    const initialRouteName = stackConfig.initialRouteName || routeNames[0];
    const initialChildRouter = childRouters[initialRouteName];
    const { getPathAndParamsForRoute, getActionForPathAndParams, } = pathUtils_1.createPathParser(childRouters, routeConfigs, stackConfig);
    function getInitialState(action) {
        if (action.routeName) {
            const childRouter = childRouters[action.routeName];
            // This is a push-like action, and childRouter will be a router or null if we are responsible for this routeName
            if (behavesLikePushAction(action) && childRouter !== undefined) {
                let childState;
                // The router is null for normal leaf routes
                if (childRouter !== null) {
                    const childAction = action.action || actions_1.NavigationActions.init({ params: action.params });
                    childState = childRouter.getStateForAction(childAction);
                }
                return {
                    key: 'StackRouterRoot',
                    isTransitioning: false,
                    index: 0,
                    routes: [
                        Object.assign({ params: action.params }, childState, { key: action.key || KeyGenerator_1.generateKey(), routeName: action.routeName }),
                    ],
                };
            }
        }
        let route;
        if (initialChildRouter) {
            route = initialChildRouter.getStateForAction(actions_1.NavigationActions.navigate({
                routeName: initialRouteName,
                params: initialRouteParams,
            }));
        }
        route = route || {};
        const routeConfig = routeConfigs[initialRouteName];
        const params = (routeConfig.params ||
            route.params ||
            action.params ||
            initialRouteParams) && Object.assign({}, routeConfig.params, route.params, action.params, initialRouteParams);
        const { initialRouteKey } = stackConfig;
        route = Object.assign({}, route, { params }, { routeName: initialRouteName, key: action.key || (initialRouteKey || KeyGenerator_1.generateKey()) });
        return {
            key: 'StackRouterRoot',
            isTransitioning: false,
            index: 0,
            routes: [route],
        };
    }
    function getParamsForRouteAndAction(routeName, action) {
        const routeConfig = routeConfigs[routeName];
        if (routeConfig && 'params' in routeConfig) {
            return Object.assign({}, routeConfig.params, action.params);
        }
        return action.params;
    }
    return {
        childRouters,
        getComponentForState(state) {
            const activeChildRoute = state.routes[state.index];
            const { routeName } = activeChildRoute;
            const childRouter = childRouters[routeName];
            if (childRouter) {
                return childRouter.getComponentForState(activeChildRoute);
            }
            return screens_1.getScreenForRouteName(routeConfigs, routeName);
        },
        getComponentForRouteName(routeName) {
            return screens_1.getScreenForRouteName(routeConfigs, routeName);
        },
        getActionCreators(route, navStateKey) {
            return Object.assign({}, getCustomActionCreators(route, navStateKey), { pop: (n, params) => actions_1.StackActions.pop(Object.assign({ n }, params)), popToTop: (params) => actions_1.StackActions.popToTop(params), push: (routeName, params, action) => actions_1.StackActions.push({
                    routeName,
                    params,
                    action,
                }), replace: (replaceWith, params, action, newKey) => {
                    if (typeof replaceWith === 'string') {
                        return actions_1.StackActions.replace({
                            params,
                            action,
                            newKey,
                            key: route && route.key,
                            routeName: replaceWith,
                        });
                    }
                    if (typeof replaceWith !== 'object') {
                        throw new Error('Must replaceWith an object or a string');
                    }
                    if (params != null) {
                        throw new Error('Params must not be provided to .replace() when specifying an object');
                    }
                    if (action != null) {
                        throw new Error('Child action must not be provided to .replace() when specifying an object');
                    }
                    if (newKey != null) {
                        throw new Error('Child action must not be provided to .replace() when specifying an object');
                    }
                    return actions_1.StackActions.replace(replaceWith);
                }, reset: (actions, index) => actions_1.StackActions.reset({
                    actions,
                    index: index == null ? actions.length - 1 : index,
                    key: navStateKey,
                }), dismiss: () => actions_1.NavigationActions.back({
                    key: navStateKey,
                }) });
        },
        getStateForAction(action, state) {
            // Set up the initial state if needed
            if (!state) {
                return getInitialState(action);
            }
            const immediate = !!(action.immediate);
            const activeChildRoute = state.routes[state.index];
            if (!isResetToRootStack(action) &&
                action.type !== actions_1.NavigationActions.NAVIGATE) {
                // Let the active child router handle the action
                const activeChildRouter = childRouters[activeChildRoute.routeName];
                if (activeChildRouter) {
                    const route = activeChildRouter.getStateForAction(action, activeChildRoute);
                    if (route !== null && route !== activeChildRoute) {
                        return StateUtils_1.default.replaceAt(state, activeChildRoute.key, route, 
                        // the following tells replaceAt to NOT change the index to this route for the setParam action,
                        // because people don't expect param-setting actions to switch the active route
                        action.type === actions_1.NavigationActions.SET_PARAMS);
                    }
                }
            }
            else if (action.type === actions_1.NavigationActions.NAVIGATE) {
                // Traverse routes from the top of the stack to the bottom, so the
                // active route has the first opportunity, then the one before it, etc.
                for (const childRoute of state.routes.slice().reverse()) {
                    const childRouter = childRouters[childRoute.routeName];
                    const childAction = action.routeName === childRoute.routeName && action.action
                        ? action.action
                        : action;
                    if (childRouter) {
                        const nextRouteState = childRouter.getStateForAction(childAction, childRoute);
                        if (nextRouteState === null || nextRouteState !== childRoute) {
                            const newState = StateUtils_1.default.replaceAndPrune(state, nextRouteState ? nextRouteState.key : childRoute.key, nextRouteState ? nextRouteState : childRoute);
                            return Object.assign({}, newState, { isTransitioning: state.index !== newState.index
                                    ? !immediate
                                    : state.isTransitioning });
                        }
                    }
                }
            }
            // Handle push and navigate actions. This must happen after the focused
            // child router has had a chance to handle the action.
            if (behavesLikePushAction(action) &&
                'routeName' in action &&
                childRouters[action.routeName] !== undefined // undefined means it's not a childRouter or a screen
            ) {
                const childRouter = childRouters[action.routeName];
                if (action.type === actions_1.StackActions.PUSH && action.key != null) {
                    throw new Error('StackRouter does not support key on the push action');
                }
                // Before pushing a new route we first try to find one in the existing route stack
                // More information on this:
                // https://github.com/react-navigation/rfcs/blob/master/text/0004-less-pushy-navigate.md
                const lastRouteIndex = state.routes.findIndex(r => {
                    if ('key' in action) {
                        return r.key === action.key;
                    }
                    return r.routeName === action.routeName;
                });
                // An instance of this route exists already and we're dealing with a navigate action
                if (action.type !== actions_1.StackActions.PUSH && lastRouteIndex !== -1) {
                    // If index is unchanged and params are not being set, leave state identity intact
                    if (state.index === lastRouteIndex && !action.params) {
                        return null;
                    }
                    // Remove the now unused routes at the tail of the routes array
                    const routes = state.routes.slice(0, lastRouteIndex + 1);
                    // Apply params if provided, otherwise leave route identity intact
                    if (action.params) {
                        const route = state.routes[lastRouteIndex];
                        routes[lastRouteIndex] = Object.assign({}, route, { params: Object.assign({}, route.params, action.params) });
                    }
                    // Return state with new index. Change isTransitioning only if index has changed
                    return Object.assign({}, state, { isTransitioning: state.index !== lastRouteIndex
                            ? !immediate
                            : state.isTransitioning, index: lastRouteIndex, routes });
                }
                let route;
                if (childRouter) {
                    // Delegate to the child router with the given action, or init it
                    const childAction = action.action ||
                        actions_1.NavigationActions.init({
                            params: getParamsForRouteAndAction(action.routeName, action),
                        });
                    route = Object.assign({ params: getParamsForRouteAndAction(action.routeName, action) }, childRouter.getStateForAction(childAction), { routeName: action.routeName, key: action.key || KeyGenerator_1.generateKey() });
                }
                else {
                    // Create the route from scratch
                    route = {
                        params: getParamsForRouteAndAction(action.routeName, action),
                        routeName: action.routeName,
                        key: action.key || KeyGenerator_1.generateKey(),
                    };
                }
                return Object.assign({}, StateUtils_1.default.push(state, route), { isTransitioning: !immediate });
            }
            if (action.type === actions_1.StackActions.PUSH &&
                childRouters[action.routeName] === undefined) {
                // Return the state identity to bubble the action up
                return state;
            }
            // Handle navigation to other child routers that are not yet pushed
            if (behavesLikePushAction(action)) {
                const childRouterNames = Object.keys(childRouters);
                for (const childRouterName of childRouterNames) {
                    const childRouter = childRouters[childRouterName];
                    if (childRouter) {
                        // For each child router, start with a blank state
                        const initChildRoute = childRouter.getStateForAction(actions_1.NavigationActions.init());
                        // Then check to see if the router handles our navigate action
                        const navigatedChildRoute = childRouter.getStateForAction(action, initChildRoute || undefined);
                        let routeToPush;
                        if (navigatedChildRoute === null) {
                            // Push the route if the router has 'handled' the action and returned null
                            routeToPush = initChildRoute;
                        }
                        else if (navigatedChildRoute !== initChildRoute) {
                            // Push the route if the state has changed in response to this navigation
                            routeToPush = navigatedChildRoute;
                        }
                        if (routeToPush) {
                            const route = Object.assign({}, routeToPush, { routeName: childRouterName, key: action.key || KeyGenerator_1.generateKey() });
                            return Object.assign({}, StateUtils_1.default.push(state, route), { isTransitioning: !immediate });
                        }
                    }
                }
            }
            // Handle pop-to-top behavior. Make sure this happens after children have had a chance to handle the action,
            // so that the inner stack pops to top first.
            if (action.type === actions_1.StackActions.POP_TO_TOP) {
                // Refuse to handle pop to top if a key is given that doesn't correspond
                // to this router
                if (action.key && state.key !== action.key) {
                    return state;
                }
                // If we're already at the top, then we return the state with a new
                // identity so that the action is handled by this router.
                if (state.index > 0) {
                    return Object.assign({}, state, { isTransitioning: !immediate, index: 0, routes: [state.routes[0]] });
                }
                return state;
            }
            // Handle replace action
            if (action.type === actions_1.StackActions.REPLACE) {
                let routeIndex;
                // If the key param is undefined, set the index to the last route in the stack
                if (action.key === undefined && state.routes.length) {
                    routeIndex = state.routes.length - 1;
                }
                else {
                    routeIndex = state.routes.findIndex(r => r.key === action.key);
                }
                // Only replace if the key matches one of our routes
                if (routeIndex !== -1) {
                    const childRouter = childRouters[action.routeName];
                    let childState;
                    if (childRouter) {
                        const childAction = action.action ||
                            actions_1.NavigationActions.init({
                                params: getParamsForRouteAndAction(action.routeName, action),
                            });
                        childState = childRouter.getStateForAction(childAction);
                    }
                    const routes = [...state.routes];
                    routes[routeIndex] = Object.assign({ params: getParamsForRouteAndAction(action.routeName, action) }, childState, { routeName: action.routeName, key: action.newKey || KeyGenerator_1.generateKey() });
                    return Object.assign({}, state, { routes });
                }
            }
            // Update transitioning state
            if (action.type === actions_1.StackActions.COMPLETE_TRANSITION &&
                (action.key == null || action.key === state.key) &&
                action.toChildKey === state.routes[state.index].key &&
                state.isTransitioning) {
                return Object.assign({}, state, { isTransitioning: false });
            }
            if (action.type === actions_1.NavigationActions.SET_PARAMS) {
                const key = action.key;
                const lastRoute = state.routes.find(route => route.key === key);
                if (lastRoute) {
                    const params = Object.assign({}, lastRoute.params, action.params);
                    const routes = [...state.routes];
                    routes[state.routes.indexOf(lastRoute)] = Object.assign({}, lastRoute, { params });
                    return Object.assign({}, state, { routes });
                }
            }
            if (action.type === actions_1.StackActions.RESET) {
                // Only handle reset actions that are unspecified or match this state key
                if (action.key != null && action.key !== state.key) {
                    // Deliberately use != instead of !== so we can match null with
                    // undefined on either the state or the action
                    return state;
                }
                const newStackActions = action.actions;
                return Object.assign({}, state, { routes: newStackActions.map(newStackAction => {
                        const router = childRouters[newStackAction.routeName];
                        let childState;
                        if (router) {
                            const childAction = newStackAction.action ||
                                actions_1.NavigationActions.init({
                                    params: getParamsForRouteAndAction(newStackAction.routeName, newStackAction),
                                });
                            childState = router.getStateForAction(childAction);
                        }
                        return Object.assign({ params: getParamsForRouteAndAction(newStackAction.routeName, newStackAction) }, childState, { routeName: newStackAction.routeName, key: newStackAction.key || KeyGenerator_1.generateKey() });
                    }), index: action.index });
            }
            if (action.type === actions_1.NavigationActions.BACK ||
                action.type === actions_1.StackActions.POP) {
                const { key } = action;
                const { n } = action;
                let backRouteIndex = state.index;
                if (action.type === actions_1.StackActions.POP && n != null) {
                    // determine the index to go back *from*. In this case, n=1 means to go
                    // back from state.index, as if it were a normal "BACK" action
                    backRouteIndex = Math.max(1, state.index - n + 1);
                }
                else if (key) {
                    const backRoute = state.routes.find(route => route.key === key);
                    backRouteIndex = backRoute ? state.routes.indexOf(backRoute) : -1;
                }
                if (backRouteIndex > 0) {
                    return Object.assign({}, state, { routes: state.routes.slice(0, backRouteIndex), index: backRouteIndex - 1, isTransitioning: !immediate });
                }
            }
            // By this point in the router's state handling logic, we have handled the behavior of the active route,
            // and handled any stack actions.
            // If we haven't returned by now, we should allow non-active child routers to handle this action,
            // and switch to that index if the child state (route) does change..
            const actionKey = action.key;
            const keyIndex = actionKey ? StateUtils_1.default.indexOf(state, actionKey) : -1;
            // Traverse routes from the top of the stack to the bottom, so the
            // active route has the first opportunity, then the one before it, etc.
            for (const childRoute of state.routes.slice().reverse()) {
                if (childRoute.key === activeChildRoute.key) {
                    // skip over the active child because we let it attempt to handle the action earlier
                    continue;
                }
                // If a key is provided and in routes state then let's use that
                // knowledge to skip extra getStateForAction calls on other child
                // routers
                if (keyIndex >= 0 && childRoute.key !== actionKey) {
                    continue;
                }
                const childRouter = childRouters[childRoute.routeName];
                if (childRouter) {
                    const route = childRouter.getStateForAction(action, childRoute);
                    if (route === null) {
                        return state;
                    }
                    if (route !== childRoute) {
                        return StateUtils_1.default.replaceAt(state, childRoute.key, route, 
                        // the following tells replaceAt to NOT change the index to this route
                        // for the setParam action or complete transition action,
                        // because people don't expect these actions to switch the active route
                        action.type === actions_1.NavigationActions.SET_PARAMS ||
                            action.type === actions_1.StackActions.COMPLETE_TRANSITION ||
                            action.type.includes('DRAWER'));
                    }
                }
            }
            return state;
        },
        getPathAndParamsForState(state) {
            const route = state.routes[state.index];
            return getPathAndParamsForRoute(route);
        },
        getActionForPathAndParams(path, params) {
            return getActionForPathAndParams(path, params);
        },
        getScreenOptions: screens_1.createConfigGetter(routeConfigs, stackConfig.defaultNavigationOptions),
    };
}
exports.StackRouter = StackRouter;
;
//# sourceMappingURL=StackRouter.js.map