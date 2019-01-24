/// <reference types="react" />
import { NavigationState } from '../types';
import { NavigationRouter } from '../routers';
import { NavigationConfig, NavigationScreenOptions, NavigationScreenProp, NavigationComponentScreenProps, NavigationComponentProps } from '../screens';
export interface NavigationDescriptor<State = NavigationState, Options = NavigationScreenOptions, Actions = {}> {
    key: string;
    state: State;
    navigation: NavigationScreenProp<State, Options, Actions>;
    getComponent: () => React.ComponentType<NavigationComponentProps<State, Options>>;
    options?: Options;
}
export declare type NavigationViewProps<State, Options> = {
    navigation: NavigationScreenProp<State, Options>;
    screenProps: NavigationComponentScreenProps;
    navigationConfig?: NavigationConfig<State, Options>;
    descriptors: {
        [key: string]: NavigationDescriptor<State, Options>;
    };
};
export declare type NavigationNavigatorProps<State, Options> = Pick<NavigationViewProps<State, Options>, 'navigation' | 'screenProps'>;
export declare type NavigationNavigator<State, Options, Props extends NavigationNavigatorProps<State, Options> = NavigationNavigatorProps<State, Options>> = React.ComponentType<Props> & {
    router: NavigationRouter<State, Options, any>;
};
export * from './createNavigator';
export * from './createSwitchNavigator';
