declare type NavigationParams = import('./types').NavigationParams;
declare type NavigationScreenPropRoot<S, P, A> = import('./screens').NavigationScreenPropRoot<S, P, A>;
export declare function getNavigation<State = {}, Params = NavigationParams, Actions = {}>(router: import('./routers').NavigationRouter<State, Params, Actions>, state: State, dispatch: import('./types').NavigationDispatch, actionSubscribers: Set<import('./types').NavigationEventCallback>, getScreenProps: () => {}, getCurrentNavigation: () => NavigationScreenPropRoot<any, Params, Actions>): NavigationScreenPropRoot<State, Params, Actions>;
export {};
