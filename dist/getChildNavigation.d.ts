declare type NavigationScreenPropRoot<S, P, A> = import('./screens').NavigationScreenPropRoot<S, P, A>;
declare type NavigationScreenProp<S, P, A> = import('./screens').NavigationScreenProp<S, P, A>;
declare type NavigationParams = import('./types').NavigationParams;
declare type NavigationStateRoute = import('./types').NavigationStateRoute;
export default function getChildNavigation<State extends NavigationStateRoute, Params = NavigationParams, Actions = {}>(navigation: NavigationScreenPropRoot<State, Params, Actions>, childKey: string, getCurrentParentNavigation: () => NavigationScreenPropRoot<State, Params, Actions> | null): NavigationScreenProp<State, Params, Actions> | null;
export {};
