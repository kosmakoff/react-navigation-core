import * as React from 'react';
import { Omit, NavigationState } from '../../types';
import { NavigationViewProps } from '../../navigators';
declare type Props<State, Options> = Omit<NavigationViewProps<State, Options>, 'navigationConfig'>;
export default class SwitchView extends React.Component<Props<NavigationState, any>> {
    render(): JSX.Element;
}
export {};
