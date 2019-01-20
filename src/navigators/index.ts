import { NavigationState } from '../types';
import {
  NavigationConfig,
  NavigationScreenOptions,
  NavigationScreenProp,
  NavigationComponentScreenProps,
  NavigationComponentProps
} from '../screens';

export interface NavigationDescriptor<
  State = NavigationState,
  Options = NavigationScreenOptions,
  Actions = {},
> {
  key: string;
  state: State;
  navigation: NavigationScreenProp<State, Options, Actions>;
  getComponent: () => React.ComponentType<NavigationComponentProps<State, Options>>;
  options?: Options;
};

export type NavigationView<
  State,
  Options,
  Props extends NavigationViewProps<State, Options> = NavigationViewProps<State, Options>
 > =
  React.ComponentType<{} & Props>;

export interface NavigationViewProps<State, Options> {
  navigation: NavigationScreenProp<State, Options>;
  screenProps?: NavigationComponentScreenProps;
  navigationConfig?: NavigationConfig<State, Options>;
  descriptors: { [key: string]: NavigationDescriptor<State, Options> };
};

export * from './createNavigator';
export * from './createSwitchNavigator';
