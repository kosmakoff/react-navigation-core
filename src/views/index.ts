import { ViewProps } from 'react-native';
import { NavigationEventTypeProps } from './events';
import { NavigationEventCallback } from '../types';
import {
  NavigationScreenProp,
  NavigationComponentScreenProps,
  NavigationComponentProps
} from '../screens';

export interface NavigationSceneViewProps<State> {
  navigation: NavigationScreenProp<State>;
  screenProps: NavigationComponentScreenProps;
  component: React.ComponentType<NavigationComponentProps<State>>;
};

export type NavigationEventsProps<State> =
  ViewProps
  & {
    navigation: NavigationScreenProp<State>;
  }
  & {
    [K in NavigationEventTypeProps]?: NavigationEventCallback;
  };

export interface NavigationInjectedProps<State> {
  navigation?: NavigationScreenProp<State>;
};

export interface NavigationFocusInjectedProps<State>
 extends NavigationInjectedProps<State> {
  isFocused: boolean;
};

export type NavigationOnRefInjectedProps<P, T> = {
  onRef?: T extends React.ComponentClass<P> ? React.Ref<InstanceType<T>> : {};
};

export * from './events';
export { default as SceneView } from './SceneView';
export { default as SwitchView } from './SwitchView/SwitchView';
export { default as NavigationEvents } from './NavigationEvents';
export { default as withNavigation } from './withNavigation';
export { default as withNavigationFocus } from './withNavigationFocus';
