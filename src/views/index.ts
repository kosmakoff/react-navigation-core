import { NavigationScreenProp } from '../screens';

export type NavigationInjectedProps<State> = {
  navigation: NavigationScreenProp<State>;
};

export type NavigationFocusInjectedProps<State> =
  NavigationInjectedProps<State>
  & {
    isFocused: boolean;
  };

export type NavigationOnRefInjectedProps<P, T> = {
  onRef?: T extends React.ComponentClass<P> ? React.Ref<InstanceType<T>> : undefined;
};

export * from './events';
export { default as SceneView } from './SceneView';
export { default as SwitchView } from './SwitchView/SwitchView';
export { default as NavigationEvents } from './NavigationEvents';
export { default as withNavigation } from './withNavigation';
export { default as withNavigationFocus } from './withNavigationFocus';
