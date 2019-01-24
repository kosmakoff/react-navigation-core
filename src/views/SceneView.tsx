import * as React from 'react';
import { NavigationContext } from '../context';

// types
import {
  NavigationComponentProps,
  NavigationComponentScreenProps,
  NavigationScreenProp
} from '../screens';

type Props<State, Options> = {
  navigation: NavigationScreenProp<State, Options>;
  screenProps?: NavigationComponentScreenProps;
  component: React.ComponentType<NavigationComponentProps<State, Options>>;
};

export default class SceneView extends React.PureComponent<Props<any, any>> {
  render() {
    const { screenProps, component: Component, navigation } = this.props;
    return (
      <NavigationContext.Provider value={navigation}>
        <Component screenProps={screenProps} navigation={navigation} />
      </NavigationContext.Provider>
    );
  }
}
