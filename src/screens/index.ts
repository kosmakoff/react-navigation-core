import { NavigationActionCreators } from '../actions';
import { NavigationRouter } from '../routers';
import {
  NavigationDispatch,
  NavigationParams,
  NavigationEmitEvent,
  NavigationState,
  NavigationAddListenerEventCallback
} from '../types';

export interface NavigationScreenOptions {
  title?: string;
};

/*
export type NavigationScreenOptions =
  NavigationStackScreenOptions &
  NavigationTabScreenOptions &
  NavigationDrawerScreenOptions;
*/

export interface NavigationComponentScreenProps {
  [prop: string]: any;
};

export interface NavigationScreenPropBase<State> {
  state: State;
  dispatch: NavigationDispatch;
  addListener: NavigationAddListenerEventCallback;
};

interface NavigationScreenPropInterface<State, Params, Actions>
 extends NavigationScreenPropBase<State> {
  actions: NavigationActionCreators<Params> & Actions;
  router: NavigationRouter<State, any, Actions>;
  getScreenProps: () => {};
  getChildNavigation: (childKey: string) =>
    NavigationScreenPropChild<State, Params, Actions> | null;
  dangerouslyGetParent: () => NavigationScreenProp<State, Params, Actions> | null | undefined;
  isFocused: (childKey?: string) => boolean;
  _childrenNavigation?: {
    [cacheKey: string ]: NavigationScreenProp<State, any, any>
  };
}

export type NavigationScreenProp<
  State = NavigationState,
  Params = NavigationParams,
  Actions = {}
> =
  NavigationScreenPropInterface<State, Params, Actions>
  & Dispatched<NavigationActionCreators<Params>>
  & Dispatched<Actions>;

export type NavigationScreenPropChild<
  State = NavigationState,
  Params = NavigationParams,
  Actions = {}
> =
  NavigationScreenProp<State, Params, Actions>
  & {
    emit?: NavigationEmitEvent;
  }
  & NavigationGetParam<Params>;

interface NavigationGetParam<P> {
  getParam<T extends keyof P>(param: T, fallback: NonNullable<P[T]>): NonNullable<P[T]>;
  getParam<T extends keyof P>(param: T): P[T];
};

export type NavigationScreenOptionsGetter<
  State,
  Options = NavigationScreenOptions
> = (
  navigation: NavigationScreenPropBase<State>,
  screenProps?: NavigationComponentScreenProps
) => Options | null | undefined;

// Route Config
export type NavigationRouteConfig =
  | NavigationComponent
  | NavigationScreenRouteConfig;

export type NavigationComponent<State = any> =
  | NavigationScreenComponent<State>
  | NavigationNavigator<State>;

export type NavigationScreenRouteConfig<
  Params = NavigationParams,
  Options = NavigationScreenOptions
> =
  (| { screen: NavigationComponent }
   | { getScreen: () => NavigationComponent }
  ) & {
    navigationOptions?: Options;
    path?: string | null;
    params?: Params;
  };

export type NavigationScreenComponent<
  State,
  Options = NavigationScreenOptions,
  Props = {}
> =
  React.ComponentType<NavigationScreenProps<State, Options> & Props> & {
    navigationOptions?: NavigationScreenConfig<State, Options>;
  };

export type NavigationNavigator<
  State = NavigationState,
  Options = NavigationScreenOptions,
  Props = {}
> =
  React.ComponentType<NavigationNavigatorProps<State, Options> & Props> & {
    router: NavigationRouter<State, Options, any>;
    navigationOptions?: NavigationScreenConfig<State, Options>;
  };

export interface NavigationScreenProps<
  State,
  Options = NavigationScreenOptions
> {
  navigation?: NavigationScreenPropBase<State>;
  screenProps?: NavigationComponentScreenProps;
  navigationOptions?: NavigationScreenConfig<State, Options>;
};

export interface NavigationNavigatorProps<
  State,
  Options = NavigationScreenOptions
> {
  navigation: NavigationScreenPropChild<State>;
  screenProps: NavigationComponentScreenProps;
  navigationOptions?: NavigationScreenConfig<State, Options>;
};

export interface NavigationComponentProps<State> {
  navigation: NavigationScreenPropBase<State>;
  screenProps: NavigationComponentScreenProps;
};

export interface NavigationScreenConfigParams<
  State,
  Options = NavigationScreenOptions
> {
  navigation: NavigationScreenPropBase<State> ;
  screenProps: NavigationComponentScreenProps;
  navigationOptions: Options;
};

export type NavigationScreenConfig<
  State,
  Options = NavigationScreenOptions
> =
  | Options
  | ((navigationOptionsContainer: NavigationScreenConfigParams<State, Options>) => Options);

export interface NavigationConfig<
  State,
  Options = NavigationScreenOptions
> {
  navigationOptions?: NavigationScreenConfig<State, Options>;
};

type Dispatched<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? (...args: Parameters<T[K]>) => boolean
    : never;
};

export { default as getScreenForRouteName } from './getScreenForRouteName';
export { default as createConfigGetter } from './createConfigGetter';
export { default as validateScreenOptions } from './validateScreenOptions';
export { default as getActiveChildNavigationOptions } from './getActiveChildNavigationOptions';
