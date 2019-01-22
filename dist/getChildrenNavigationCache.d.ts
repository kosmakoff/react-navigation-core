declare type NavigationParams = import('./types').NavigationParams;
declare type NavigationState = import('./types').NavigationState;
export default function getChildrenNavigationCache<State extends NavigationState, Params = NavigationParams, Actions = {}>(navigation?: import('./screens').NavigationScreenPropRoot<State, Params, Actions>): {
    [child: string]: import('./screens').NavigationScreenProp<State, Params, Actions>;
};
export {};
