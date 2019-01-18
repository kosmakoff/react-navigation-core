import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import { NavigationRouter } from '../routers';
import { NavigationState } from '../types';
import {
  NavigationConfig,
  NavigationScreenOptions,
  NavigationNavigator,
  NavigationNavigatorProps,
  NavigationComponentScreenProps
} from '../screens';
import {
  NavigationView,
  NavigationDescriptor
} from '../navigators';

interface StateHOC {
  descriptors: { [key: string]: NavigationDescriptor };
  screenProps?: NavigationComponentScreenProps;
};

/**
 * Create Navigator
 */
export function createNavigator<
  Props extends object & NavigationNavigatorProps<State, Options>,
  State extends NavigationState,
  Options = NavigationScreenOptions,
  Actions = {}
>(
  NavigationView: NavigationView<State, Options, Props>,
  router: NavigationRouter<State, Options, Actions>,
  navigationConfig: NavigationConfig<State, Options> = {}
): NavigationNavigator<State, Options, Props> {
  class Navigator extends React.Component<Props, StateHOC> {
    static router = router;
    static navigationOptions = navigationConfig.navigationOptions;

    state = {
      descriptors: {},
      screenProps: this.props.screenProps,
    };

    static getDerivedStateFromProps(nextProps: Props, prevState: StateHOC) {
      const prevDescriptors = prevState.descriptors;
      const { navigation, screenProps } = nextProps;
      if (navigation == null) { /* tslint:disable-next-line:max-line-length */
        throw Error('The navigation prop is missing for this navigator. In react-navigation 3 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html');
      }

      const { state } = navigation;
      const { routes } = state;
      if (typeof routes === 'undefined') { /* tslint:disable-next-line:max-line-length */
        throw new TypeError('No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop');
      }

      const descriptors = {};

      routes.forEach(route => {
        if (
          prevDescriptors &&
          prevDescriptors[route.key] &&
          route === prevDescriptors[route.key].state &&
          screenProps === prevState.screenProps
        ) {
          descriptors[route.key] = prevDescriptors[route.key];
          return;
        }
        const getComponent = router.getComponentForRouteName.bind(
            null,
            route.routeName
        );
        const childNavigation = navigation.getChildNavigation(route.key);
        const options = router.getScreenOptions(childNavigation!, screenProps);
        descriptors[route.key] = {
          getComponent,
          options,
          key: route.key,
          state: route,
          navigation: childNavigation,
        };
      });

      return { descriptors, screenProps };
    }

    render() {
      return (
        <NavigationView
          {...this.props}
          screenProps={this.state.screenProps}
          navigation={this.props.navigation}
          navigationConfig={navigationConfig}
          descriptors={this.state.descriptors}
        />
      );
    }
  }

  return polyfill(Navigator);
}
