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
    get(state: import("./types").NavigationState, key: string): import("./types").NavigationLeafRoute<import("./types").NavigationParams> | import("./types").NavigationStateRoute<import("./types").NavigationParams> | null;
    /**
     * Returns the first index at which a given route's key can be found in the
     * routes of the navigation state, or -1 if it is not present.
     */
    indexOf(state: import("./types").NavigationState, key: string): number;
    /**
     * Returns `true` at which a given route's key can be found in the
     * routes of the navigation state.
     */
    has(state: import("./types").NavigationState, key: string): boolean;
    /**
     * Pushes a new route into the navigation state.
     * Note that this moves the index to the position to where the last route in the
     * stack is at.
     */
    push(state: import("./types").NavigationState, route: import("./types").NavigationRoute<import("./types").NavigationParams>): import("./types").NavigationState;
    /**
     * Pops out a route from the navigation state.
     * Note that this moves the index to the position to where the last route in the
     * stack is at.
     */
    pop(state: import("./types").NavigationState): import("./types").NavigationState;
    /**
     * Sets the focused route of the navigation state by index.
     */
    jumpToIndex(state: import("./types").NavigationState, index: number): import("./types").NavigationState;
    /**
     * Sets the focused route of the navigation state by key.
     */
    jumpTo(state: import("./types").NavigationState, key: string): import("./types").NavigationState;
    /**
     * Sets the focused route to the previous route.
     */
    back(state: import("./types").NavigationState): import("./types").NavigationState;
    /**
     * Sets the focused route to the next route.
     */
    forward(state: import("./types").NavigationState): import("./types").NavigationState;
    /**
     * Replace a route by a key.
     * Note that this moves the index to the position to where the new route in the
     * stack is at and updates the routes array accordingly.
     */
    replaceAndPrune(state: import("./types").NavigationState, key: string, route: import("./types").NavigationRoute<import("./types").NavigationParams>): import("./types").NavigationState;
    /**
     * Replace a route by a key.
     * Note that this moves the index to the position to where the new route in the
     * stack is at. Does not prune the routes.
     * If preserveIndex is true then replacing the route does not cause the index
     * to change to the index of that route.
     */
    replaceAt(state: import("./types").NavigationState, key: string, route: import("./types").NavigationRoute<import("./types").NavigationParams>, preserveIndex?: boolean): import("./types").NavigationState;
    /**
     * Replace a route by a index.
     * Note that this moves the index to the position to where the new route in the
     * stack is at.
     */
    replaceAtIndex(state: import("./types").NavigationState, index: number, route: import("./types").NavigationRoute<import("./types").NavigationParams>): import("./types").NavigationState;
    /**
     * Resets all routes.
     * Note that this moves the index to the position to where the last route in the
     * stack is at if the param `index` isn't provided.
     */
    reset(state: import("./types").NavigationState, routes: import("./types").NavigationRoute<import("./types").NavigationParams>[], index?: number | undefined): import("./types").NavigationState;
};
export default StateUtils;
