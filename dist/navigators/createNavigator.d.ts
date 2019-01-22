declare type NavigationState = import('../types').NavigationState;
declare type NavigationScreenOptions = import('../screens').NavigationScreenOptions;
declare type NavigationNavigatorProps<S, O> = import('../screens').NavigationNavigatorProps<S, O>;
/**
 * Create Navigator
 */
export declare function createNavigator<Props extends NavigationNavigatorProps<State, Options>, State extends NavigationState, Options = NavigationScreenOptions, Actions = {}>(NavigationView: import('../navigators').NavigationView<State, Options>, router: import('../routers').NavigationRouter<State, Options, Actions>, navigationConfig?: import('../screens').NavigationConfig<State, Options>): import('../screens').NavigationNavigator<State, Options, Props>;
export {};
