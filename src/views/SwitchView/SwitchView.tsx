import * as React from 'react';
import SceneView from '../SceneView';

type NavigationState = import('../../types').NavigationState;
type NavigationSwitchViewProps<S, O> =
  import('../').NavigationSwitchViewProps<S, O>;

export default class SwitchView
  extends React.Component<NavigationSwitchViewProps<NavigationState, any>> {
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
