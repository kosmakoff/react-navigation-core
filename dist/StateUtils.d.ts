import { NavigationRoute, NavigationState } from './types';
/**
 * Utilities to perform atomic operation with navigate state and routes.
 *
 * ```javascript
 * const state1 = {key: 'screen 1'};
 * const state2 = NavigationStateUtils.push(state1, {key: 'screen 2'});
 * ```
 */
declare const StateUtils: {
    /**
     * Gets a route by key. If the route isn't found, returns `null`.
     */
    get(state: NavigationState, key: string): import("./types").NavigationLeafRoute<import("./types").NavigationParams> | import("./types").NavigationStateRoute<import("./types").NavigationParams> | null;
    /**
     * Returns the first index at which a given route's key can be found in the
     * routes of the navigation state, or -1 if it is not present.
     */
    indexOf(state: NavigationState, key: string): number;
    /**
     * Returns `true` at which a given route's key can be found in the
     * routes of the navigation state.
     */
    has(state: NavigationState, key: string): boolean;
    /**
     * Pushes a new route into the navigation state.
     * Note that this moves the index to the position to where the last route in the
     * stack is at.
     */
    push(state: NavigationState, route: NavigationRoute<import("./types").NavigationParams>): NavigationState;
    /**
     * Pops out a route from the navigation state.
     * Note that this moves the index to the position to where the last route in the
     * stack is at.
     */
    pop(state: NavigationState): NavigationState;
    /**
     * Sets the focused route of the navigation state by index.
     */
    jumpToIndex(state: NavigationState, index: number): NavigationState;
    /**
     * Sets the focused route of the navigation state by key.
     */
    jumpTo(state: NavigationState, key: string): NavigationState;
    /**
     * Sets the focused route to the previous route.
     */
    back(state: NavigationState): NavigationState;
    /**
     * Sets the focused route to the next route.
     */
    forward(state: NavigationState): NavigationState;
    /**
     * Replace a route by a key.
     * Note that this moves the index to the position to where the new route in the
     * stack is at and updates the routes array accordingly.
     */
    replaceAndPrune(state: NavigationState, key: string, route: NavigationRoute<import("./types").NavigationParams>): NavigationState;
    /**
     * Replace a route by a key.
     * Note that this moves the index to the position to where the new route in the
     * stack is at. Does not prune the routes.
     * If preserveIndex is true then replacing the route does not cause the index
     * to change to the index of that route.
     */
    replaceAt(state: NavigationState, key: string, route: NavigationRoute<import("./types").NavigationParams>, preserveIndex?: boolean): NavigationState;
    /**
     * Replace a route by a index.
     * Note that this moves the index to the position to where the new route in the
     * stack is at.
     */
    replaceAtIndex(state: NavigationState, index: number, route: NavigationRoute<import("./types").NavigationParams>): NavigationState;
    /**
     * Resets all routes.
     * Note that this moves the index to the position to where the last route in the
     * stack is at if the param `index` isn't provided.
     */
    reset(state: NavigationState, routes: NavigationRoute<import("./types").NavigationParams>[], index?: number | undefined): NavigationState;
};
export default StateUtils;
