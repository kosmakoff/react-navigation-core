/// <reference types="react" />
import { ViewProps } from 'react-native';
import { NavigationEventTypeProps } from './events';
import { NavigationViewProps } from '../navigators';
import { Omit, NavigationEventCallback } from '../types';
import { NavigationScreenProp, NavigationComponentProps, NavigationComponentScreenProps } from '../screens';
export interface NavigationSceneViewProps<State, Options> {
    navigation: NavigationScreenProp<State, Options>;
    screenProps?: NavigationComponentScreenProps;
    component: React.ComponentType<NavigationComponentProps<State, Options>>;
}
export declare type NavigationSwitchViewProps<State, Options> = Omit<NavigationViewProps<State, Options>, 'navigationConfig'>;
export declare type NavigationEventsProps<State, Options> = ViewProps & {
    navigation: NavigationScreenProp<State, Options>;
} & {
    [K in NavigationEventTypeProps]?: NavigationEventCallback;
};
export interface NavigationInjectedProps<State> {
    navigation?: NavigationScreenProp<State>;
}
export interface NavigationFocusInjectedProps<State> extends NavigationInjectedProps<State> {
    isFocused: boolean;
}
export interface NavigationOnRefInjectedProps<P, T> {
    onRef?: (ref: (T extends React.ComponentClass<P> ? React.Ref<InstanceType<T>> : undefined)) => any;
}
export * from './events';
export { default as SceneView } from './SceneView';
export { default as SwitchView } from './SwitchView/SwitchView';
export { default as NavigationEvents } from './NavigationEvents';
export { default as withNavigation } from './withNavigation';
export { default as withNavigationFocus } from './withNavigationFocus';
