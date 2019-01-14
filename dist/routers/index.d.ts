import * as pathUtils from './pathUtils';
import { NavigationParams, NavigationRoute } from '../types';
import { NavigationConfig, NavigationComponent, NavigationScreenOptions, NavigationScreenOptionsGetter } from '../screens';
import { NavigationAction, NavigationBackAction, NavigationNavigateAction, NavigationPopAction, NavigationPopToTopAction, NavigationPushAction, NavigationResetAction, NavigationPopActionPayload, NavigationPopToTopActionPayload, NavigationReplaceAction } from '../actions';
export interface NavigationRouter<State, Options = NavigationScreenOptions, Actions = {}> {
    getActionCreators: NavigationRouterActionCreatorsCallback<Actions>;
    /**
     * The reducer that outputs the new navigation state for a given action, with
     * an optional previous state. When the action is considered handled but the
     * state is unchanged, the output state is null.
     */
    getStateForAction: (action: NavigationAction, lastState?: State) => State | null;
    /**
     * Maps a URI-like string to an action. This can be mapped to a state
     * using `getStateForAction`.
     */
    getActionForPathAndParams: (path: string, params?: NavigationParams) => NavigationAction | null;
    getPathAndParamsForState: (state: State) => {
        path: string;
        params?: NavigationParams;
    };
    getComponentForRouteName: (routeName: string) => NavigationComponent;
    getComponentForState: (state: State) => NavigationComponent;
    /**
     * Gets the screen navigation options for a given screen.
     *
     * For example, we could get the config for the 'Foo' screen when the
     * `navigation.state` is:
     *
     *  {routeName: 'Foo', key: '123'}
     */
    getScreenOptions: NavigationScreenOptionsGetter<State, Options>;
    /**
     * Nested routers
     */
    childRouters?: NavigationChildRouters<any>;
}
export interface NavigationChildRouters<State> {
    [routeName: string]: NavigationRouter<State, any, any> | null | undefined;
}
export declare type NavigationRouterActionCreatorsCallback<Actions = {}> = (state?: NavigationRoute | null, stateKey?: string | null) => Actions;
export interface NavigationRouterConfig<State, Options = NavigationScreenOptions, Params = NavigationParams, Actions = {}> extends NavigationConfig<State, Options> {
    initialRouteName?: string;
    initialRouteParams?: Params;
    paths?: {
        [routeName: string]: string;
    };
    disableRouteNamePaths?: boolean;
    defaultNavigationOptions?: Options;
    getCustomActionCreators?: NavigationRouterActionCreatorsCallback<Actions>;
}
export interface NavigationSwitchRouterConfig<State, Options = NavigationScreenOptions, Params = NavigationParams, Actions = {}> extends NavigationRouterConfig<State, Options, Params, Actions> {
    order?: string[];
    backBehavior?: 'none' | 'initialRoute';
    resetOnBlur?: boolean;
}
export interface NavigationStackRouterConfig<State, Options = NavigationScreenOptions, Params = NavigationParams, Actions = {}> extends NavigationRouterConfig<State, Options, Params, Actions> {
    initialRouteKey?: string;
}
export interface NavigationTabRouterConfig<State, Options = NavigationScreenOptions, Params = NavigationParams, Actions = {}> extends NavigationSwitchRouterConfig<State, Options, Params, Actions> {
    resetOnBlur?: boolean;
    backBehavior?: 'none' | 'initialRoute';
}
export declare type NavigationSwitchRouterActionCreators = {};
export interface NavigationStackRouterActionCreators<Params = NavigationParams> {
    pop: (n?: number, params?: NavigationPopActionPayload) => NavigationPopAction;
    popToTop: (params?: NavigationPopToTopActionPayload) => NavigationPopToTopAction;
    push: (routeName: string, params?: Params, action?: NavigationNavigateAction) => NavigationPushAction;
    replace: (replaceWith: string, params?: Params, action?: NavigationNavigateAction, newKey?: string) => NavigationReplaceAction;
    reset: (actions: NavigationNavigateAction[], index?: number) => NavigationResetAction;
    dismiss: () => NavigationBackAction;
}
export { pathUtils };
export * from './KeyGenerator';
export * from './TabRouter';
export * from './StackRouter';
export * from './SwitchRouter';
export { default as validateRouteConfigMap } from './validateRouteConfigMap';
