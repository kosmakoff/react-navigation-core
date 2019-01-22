import * as React from 'react';
import { NavigationContext } from '../context';

type NavigationSceneViewProps<S, O> =
  import('../views').NavigationSceneViewProps<S, O>;

export default class SceneView extends React.PureComponent<NavigationSceneViewProps<any, any>> {
  render() {
    const { screenProps, component: Component, navigation } = this.props;
    return (
      <NavigationContext.Provider value={navigation}>
        <Component screenProps={screenProps} navigation={navigation} />
      </NavigationContext.Provider>
    );
  }
}
