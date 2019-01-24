import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import invariant from 'invariant';

// types
import { NavigationRouter } from '../routers';
import { NavigationScreenOptions } from '../screens';
import { NavigationState } from '../types';
import {
  NavigationViewProps,
  NavigationNavigator,
  NavigationNavigatorProps
} from '.';

/**
 * Create Navigator
 */
export function createNavigator<
  P extends NavigationViewProps<State, Options>,
  State extends NavigationState,
  Options = NavigationScreenOptions,
  Actions = {}
>(
  NavigationView: React.ComponentType<P>,
  router: NavigationRouter<State, Options, Actions>,
  navigationConfig: P['navigationConfig'] = {}
): NavigationNavigator<State, Options, NavigationNavigatorProps<State, Options>> {

  type StateHOC = Pick<P, 'descriptors' | 'screenProps'>;
  type PropsHOC = Readonly<Pick<P, 'navigation' | 'screenProps'>>;

  class Navigator extends React.Component<PropsHOC, StateHOC> {
    static router = router;
    static navigationOptions = navigationConfig.navigationOptions;

    state = {
      descriptors: {},
      screenProps: this.props.screenProps,
    };

    static getDerivedStateFromProps(nextProps: PropsHOC, prevState: StateHOC) {
      const prevDescriptors = prevState.descriptors;
      const { navigation, screenProps } = nextProps;
      if (!navigation) { /* tslint:disable-next-line:max-line-length */
        invariant(false, 'The navigation prop is missing for this navigator. In react-navigation 3 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html');
      }

      const { state } = navigation;
      const { routes } = state;
      if (typeof routes === undefined) { /* tslint:disable-next-line:max-line-length */
        invariant(false, 'No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop');
      }

      const descriptors = {};

      routes.forEach(route => {
        if (
          prevDescriptors &&
          prevDescriptors[route.key] &&
          (route as NavigationState) === prevDescriptors[route.key].state &&
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
          {...this.props as P}
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
