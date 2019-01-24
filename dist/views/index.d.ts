/// <reference types="react" />
import { NavigationScreenProp } from '../screens';
export declare type NavigationInjectedProps<State> = {
    navigation: NavigationScreenProp<State>;
};
export declare type NavigationFocusInjectedProps<State> = NavigationInjectedProps<State> & {
    isFocused: boolean;
};
export declare type NavigationOnRefInjectedProps<P, T> = {
    onRef?: T extends React.ComponentClass<P> ? (instance: InstanceType<T> | null) => void : undefined;
};
export * from './events';
export { default as SceneView } from './SceneView';
export { default as SwitchView } from './SwitchView/SwitchView';
export { default as NavigationEvents } from './NavigationEvents';
export { default as withNavigation } from './withNavigation';
export { default as withNavigationFocus } from './withNavigationFocus';
