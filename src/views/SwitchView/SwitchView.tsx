import * as React from 'react';
import SceneView from '../SceneView';
import { NavigationViewProps } from '../../navigators';

export default class SwitchView extends React.Component<NavigationViewProps<any, any>> {
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
