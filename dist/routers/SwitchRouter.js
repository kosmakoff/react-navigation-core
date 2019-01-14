"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const pathUtils_1 = require("./pathUtils");
const screens_1 = require("../screens");
const actions_1 = require("../actions");
const routers_1 = require("../routers");
const defaultActionCreators = () => ({});
// Todo: make SwitchRouter not depend on StackActions..
function childrenUpdateWithoutSwitchingIndex(action) {
    return (action.type === actions_1.NavigationActions.SET_PARAMS ||
        action.type === actions_1.StackActions.COMPLETE_TRANSITION);
}
function SwitchRouter(routeConfigs, config = {}) {
    // Fail fast on invalid route definitions
    routers_1.validateRouteConfigMap(routeConfigs);
    const order = config.order || Object.keys(routeConfigs);
    const initialRouteName = config.initialRouteName || order[0];
    const initialRouteIndex = order.indexOf(initialRouteName);
    if (initialRouteIndex === -1) {
        throw new Error(`Invalid initialRouteName '${initialRouteName}'.` +
            `Should be one of ${order.map(n => `"${n}"`).join(', ')}`);
    }
    const childRouters = {};
    // Loop through routes and find child routers
    order.forEach(routeName => {
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
    const { initialRouteParams } = config;
    const getCustomActionCreators = config.getCustomActionCreators || defaultActionCreators;
    const backBehavior = config.backBehavior || 'none';
    const shouldBackNavigateToInitialRoute = backBehavior === 'initialRoute';
    const resetOnBlur = config.hasOwnProperty('resetOnBlur')
        ? config.resetOnBlur
        : true;
    const { getPathAndParamsForRoute, getActionForPathAndParams, } = pathUtils_1.createPathParser(childRouters, routeConfigs, config);
    function getParamsForRoute(routeName, params) {
        const routeConfig = routeConfigs[routeName];
        if (routeConfig && 'params' in routeConfig) {
            return Object.assign({}, routeConfig.params, params);
        }
        return params;
    }
    function resetChildRoute(routeName) {
        const initialParams = routeName === initialRouteName ? initialRouteParams : undefined;
        // note(brentvatne): merging initialRouteParams *on top* of default params
        // on the route seems incorrect but it's consistent with existing behavior
        // in stackrouter
        const params = getParamsForRoute(routeName, initialParams);
        const childRouter = childRouters[routeName];
        if (childRouter) {
            const childAction = actions_1.NavigationActions.init();
            return Object.assign({}, childRouter.getStateForAction(childAction), { key: routeName, routeName,
                params });
        }
        return {
            params,
            routeName,
            key: routeName,
        };
    }
    function getNextState(prevState, possibleNextState) {
        if (!prevState) {
            return possibleNextState;
        }
        if (prevState.index !== possibleNextState.index && resetOnBlur) {
            const prevRouteName = prevState.routes[prevState.index].routeName;
            const nextRoutes = [...possibleNextState.routes];
            nextRoutes[prevState.index] = resetChildRoute(prevRouteName);
            return Object.assign({}, possibleNextState, { routes: nextRoutes });
        }
        return possibleNextState;
    }
    function getInitialState() {
        const routes = order.map(resetChildRoute);
        return {
            routes,
            index: initialRouteIndex,
            isTransitioning: false,
        };
    }
    return {
        childRouters,
        getActionCreators(route, stateKey) {
            return Object.assign({}, getCustomActionCreators(route, stateKey));
        },
        getStateForAction(action, inputState) {
            const prevState = inputState ? Object.assign({}, inputState) : inputState;
            const state = inputState || getInitialState();
            let activeChildIndex = state.index;
            if (action.type === actions_1.NavigationActions.INIT) {
                // NOTE(brentvatne): this seems weird... why are we merging these
                // params into child routes?
                // ---------------------------------------------------------------
                // Merge any params from the action into all the child routes
                const { params } = action;
                if (params) {
                    state.routes = state.routes.map(route => (Object.assign({}, route, { params: Object.assign({}, route.params, params, route.routeName === initialRouteName && initialRouteParams) })));
                }
            }
            // Let the current child handle it
            const activeChildLastState = state.routes[state.index];
            const activeChildRouter = childRouters[order[state.index]];
            if (activeChildRouter) {
                const activeChildState = activeChildRouter.getStateForAction(action, activeChildLastState);
                if (!activeChildState && inputState) {
                    return null;
                }
                if (activeChildState && activeChildState !== activeChildLastState) {
                    const routes = [...state.routes];
                    routes[state.index] = activeChildState;
                    return getNextState(prevState, Object.assign({}, state, { routes }));
                }
            }
            // Handle tab changing. Do this after letting the current tab try to
            // handle the action, to allow inner children to change first
            if (action.type === actions_1.NavigationActions.BACK) {
                const isBackEligible = action.key == null || action.key === activeChildLastState.key;
                if (isBackEligible && shouldBackNavigateToInitialRoute) {
                    activeChildIndex = initialRouteIndex;
                }
                else {
                    return state;
                }
            }
            let didNavigate = false;
            if (action.type === actions_1.NavigationActions.NAVIGATE) {
                didNavigate = !!order.find((childId, i) => {
                    if (childId === action.routeName) {
                        activeChildIndex = i;
                        return true;
                    }
                    return false;
                });
                if (didNavigate) {
                    const childState = state.routes[activeChildIndex];
                    const childRouter = childRouters[action.routeName];
                    let newChildState = childState;
                    if (action.action && childRouter) {
                        const childStateUpdate = childRouter.getStateForAction(action.action, childState);
                        if (childStateUpdate) {
                            newChildState = childStateUpdate;
                        }
                    }
                    if (action.params) {
                        newChildState = Object.assign({}, newChildState, { params: Object.assign({}, newChildState.params, action.params) });
                    }
                    if (newChildState !== childState) {
                        const routes = [...state.routes];
                        routes[activeChildIndex] = newChildState;
                        const nextState = Object.assign({}, state, { routes, index: activeChildIndex });
                        return getNextState(prevState, nextState);
                    }
                    if (newChildState === childState &&
                        state.index === activeChildIndex &&
                        prevState) {
                        return null;
                    }
                }
            }
            if (action.type === actions_1.NavigationActions.SET_PARAMS) {
                const key = action.key;
                const lastRoute = state.routes.find(route => route.key === key);
                if (lastRoute) {
                    const params = Object.assign({}, lastRoute.params, action.params);
                    const routes = [...state.routes];
                    routes[state.routes.indexOf(lastRoute)] = Object.assign({}, lastRoute, { params });
                    return getNextState(prevState, Object.assign({}, state, { routes }));
                }
            }
            if (activeChildIndex !== state.index) {
                return getNextState(prevState, Object.assign({}, state, { index: activeChildIndex }));
            }
            if (didNavigate && !inputState) {
                return state;
            }
            if (didNavigate) {
                return Object.assign({}, state);
            }
            // Let other children handle it and switch to the first child that returns a new state
            let index = state.index;
            let routes = state.routes;
            order.find((childId, i) => {
                const childRouter = childRouters[childId];
                if (i === index) {
                    return false;
                }
                let childState = routes[i];
                if (childRouter) {
                    childState = childRouter.getStateForAction(action, childState);
                }
                if (!childState) {
                    index = i;
                    return true;
                }
                if (childState !== routes[i]) {
                    routes = [...routes];
                    routes[i] = childState;
                    index = i;
                    return true;
                }
                return false;
            });
            // Nested routers can be updated after switching children with actions such as SET_PARAMS
            // and COMPLETE_TRANSITION.
            // NOTE: This may be problematic with custom routers because we whitelist the actions
            // that can be handled by child routers without automatically changing index.
            if (childrenUpdateWithoutSwitchingIndex(action)) {
                index = state.index;
            }
            if (index !== state.index || routes !== state.routes) {
                return getNextState(prevState, Object.assign({}, state, { index,
                    routes }));
            }
            return state;
        },
        getComponentForState(state) {
            const activeChildRoute = state.routes[state.index];
            const { routeName } = activeChildRoute;
            utils_1.invariant(!!routeName, `There is no route defined for index ${state.index}. Check that
        that you passed in a navigation state with a valid tab/screen index.`);
            const childRouter = childRouters[routeName];
            if (childRouter) {
                return childRouter.getComponentForState(activeChildRoute);
            }
            return screens_1.getScreenForRouteName(routeConfigs, routeName);
        },
        getComponentForRouteName(routeName) {
            return screens_1.getScreenForRouteName(routeConfigs, routeName);
        },
        getPathAndParamsForState(state) {
            const route = state.routes[state.index];
            return getPathAndParamsForRoute(route);
        },
        getActionForPathAndParams(path, params) {
            return getActionForPathAndParams(path, params);
        },
        getScreenOptions: screens_1.createConfigGetter(routeConfigs, config.defaultNavigationOptions),
    };
}
exports.SwitchRouter = SwitchRouter;
;
//# sourceMappingURL=SwitchRouter.js.map