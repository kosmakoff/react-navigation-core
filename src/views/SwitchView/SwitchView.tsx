import * as React from 'react';
import SceneView from '../SceneView';
import { NavigationState } from '../../types';
import { NavigationSwitchViewProps } from '../'

export default class SwitchView extends React.Component<NavigationSwitchViewProps<NavigationState, any>> {
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
