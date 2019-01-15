/// <reference types="react" />
import { NavigationActionCreators } from '../actions';
import { NavigationRouter } from '../routers';
import { NavigationDispatch, NavigationParams, NavigationEmitEvent, NavigationState, NavigationAddListenerEventCallback } from '../types';
export interface NavigationScreenOptions {
    title?: string;
}
export interface NavigationComponentScreenProps {
    [prop: string]: any;
}
export interface NavigationScreenPropBase<State> {
    state: State;
    dispatch: NavigationDispatch;
    addListener: NavigationAddListenerEventCallback;
}
interface NavigationScreenPropInterface<State, Params, Actions> extends NavigationScreenPropBase<State> {
    actions: NavigationActionCreators<Params> & Actions;
    router: NavigationRouter<State, any, Actions>;
    getScreenProps: () => {};
    getChildNavigation: (childKey: string) => NavigationScreenProp<State, Params, Actions> | null;
    dangerouslyGetParent: () => NavigationScreenPropRoot<State, Params, Actions> | null | undefined;
    isFocused: (childKey?: string) => boolean;
    _childrenNavigation?: {
        [cacheKey: string]: NavigationScreenProp<State, any, any>;
    };
}
export declare type NavigationScreenPropRoot<State = NavigationState, Params = NavigationParams, Actions = {}> = NavigationScreenPropInterface<State, Params, Actions> & Dispatched<NavigationActionCreators<Params>> & Dispatched<Actions>;
export declare type NavigationScreenProp<State = NavigationState, P = NavigationParams, Actions = {}> = NavigationScreenPropRoot<State, P, Actions> & {
    emit?: NavigationEmitEvent;
    getParam<T extends keyof P>(param: T, fallback: NonNullable<P[T]>): NonNullable<P[T]>;
    getParam<T extends keyof P>(param: T): P[T];
};
export declare type NavigationScreenOptionsGetter<State, Options = NavigationScreenOptions> = (navigation: NavigationScreenPropBase<State>, screenProps?: NavigationComponentScreenProps) => Options | null | undefined;
export declare type NavigationRouteConfig = NavigationComponent | NavigationScreenRouteConfig;
export declare type NavigationComponent<State = any> = NavigationScreenComponent<State> | NavigationNavigator<State>;
export declare type NavigationScreenRouteConfig<Params = NavigationParams, Options = NavigationScreenOptions> = ({
    screen: NavigationComponent;
} | {
    getScreen: () => NavigationComponent;
}) & {
    navigationOptions?: Options;
    path?: string | null;
    params?: Params;
};
export declare type NavigationScreenComponent<State, Options = NavigationScreenOptions, Props = {}> = React.ComponentType<NavigationScreenProps<State, Options> & Props> & {
    navigationOptions?: NavigationScreenConfig<State, Options>;
};
export declare type NavigationNavigator<State = NavigationState, Options = NavigationScreenOptions, Props = {}> = React.ComponentType<NavigationNavigatorProps<State, Options> & Props> & {
    router: NavigationRouter<State, Options, any>;
    navigationOptions?: NavigationScreenConfig<State, Options>;
};
export interface NavigationScreenProps<State, Options = NavigationScreenOptions> {
    navigation?: NavigationScreenPropBase<State>;
    screenProps?: NavigationComponentScreenProps;
    navigationOptions?: NavigationScreenConfig<State, Options>;
}
export interface NavigationNavigatorProps<State, Options = NavigationScreenOptions> {
    navigation: NavigationScreenProp<State>;
    screenProps: NavigationComponentScreenProps;
    navigationOptions?: NavigationScreenConfig<State, Options>;
}
export interface NavigationComponentProps<State> {
    navigation: NavigationScreenPropBase<State>;
    screenProps: NavigationComponentScreenProps;
}
export interface NavigationScreenConfigParams<State, Options = NavigationScreenOptions> {
    navigation: NavigationScreenPropBase<State>;
    screenProps: NavigationComponentScreenProps;
    navigationOptions: Options;
}
export declare type NavigationScreenConfig<State, Options = NavigationScreenOptions> = Options | ((navigationOptionsContainer: NavigationScreenConfigParams<State, Options>) => Options);
export interface NavigationConfig<State, Options = NavigationScreenOptions> {
    navigationOptions?: NavigationScreenConfig<State, Options>;
}
declare type Dispatched<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? (...args: Parameters<T[K]>) => boolean : never;
};
export { default as getScreenForRouteName } from './getScreenForRouteName';
export { default as createConfigGetter } from './createConfigGetter';
export { default as validateScreenOptions } from './validateScreenOptions';
export { default as getActiveChildNavigationOptions } from './getActiveChildNavigationOptions';
