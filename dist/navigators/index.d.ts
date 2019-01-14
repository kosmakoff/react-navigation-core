/// <reference types="react" />
import { NavigationState } from '../types';
import { NavigationConfig, NavigationScreenOptions, NavigationScreenPropChild, NavigationScreenPropBase, NavigationComponentScreenProps, NavigationComponentProps } from '../screens';
export interface NavigationDescriptor<State = NavigationState, Options = NavigationScreenOptions, Actions = {}> {
    key: string;
    state: State;
    navigation: NavigationScreenPropChild<State, Options, Actions>;
    getComponent: () => React.ComponentType<NavigationComponentProps<State>>;
    options?: Options;
}
export interface NavigationViewProps<State, Options> {
    navigation: NavigationScreenPropBase<State>;
    screenProps: NavigationComponentScreenProps;
    navigationConfig: NavigationConfig<State, Options>;
    descriptors: {
        [key: string]: NavigationDescriptor<State, Options>;
    };
}
export declare type NavigationView<State, Options> = React.ComponentType<NavigationViewProps<State, Options>>;
export * from './createNavigator';
export * from './createSwitchNavigator';
