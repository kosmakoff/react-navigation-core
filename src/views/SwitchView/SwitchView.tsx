import * as React from 'react';
import SceneView from '../SceneView';

// types
import { Omit, NavigationState } from '../../types';
import { NavigationViewProps } from '../../navigators';

type Props<State, Options> = Omit<
  NavigationViewProps<State, Options>,
  'navigationConfig'
>;

export default class SwitchView extends React.Component<
  Props<NavigationState, any>
> {
  render() {
    const { state } = this.props.navigation;
    const activeKey = state.routes[state.index].key;
    const descriptor = this.props.descriptors[activeKey];
    const ChildComponent = descriptor.getComponent();

    return (
      <SceneView
        component={ChildComponent}
        navigation={descriptor.navigation}
        screenProps={this.props.screenProps}
      />
    );
  }
}
