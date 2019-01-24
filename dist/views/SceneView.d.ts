import * as React from 'react';
import { NavigationComponentProps, NavigationComponentScreenProps, NavigationScreenProp } from '../screens';
declare type Props<State, Options> = {
    navigation: NavigationScreenProp<State, Options>;
    screenProps?: NavigationComponentScreenProps;
    component: React.ComponentType<NavigationComponentProps<State, Options>>;
};
export default class SceneView extends React.PureComponent<Props<any, any>> {
    render(): JSX.Element;
}
export {};
