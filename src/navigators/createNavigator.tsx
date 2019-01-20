import * as React from 'react';
import { polyfill } from 'react-lifecycles-compat';
import invariant from 'invariant';
import { NavigationRouter } from '../routers';
import { NavigationView } from '../navigators';
import {
  Include,
  InferProps,
  NavigationState
} from '../types';
import {
  NavigationConfig,
  NavigationScreenOptions,
  NavigationNavigator,
  NavigationNavigatorProps
} from '../screens';

/**
 * Create Navigator
 */
export function createNavigator<
  Props extends NavigationNavigatorProps<State, Options>,
  State extends NavigationState,
  Options = NavigationScreenOptions,
  Actions = {}
>(
  NavigationView: NavigationView<State, Options>,
  router: NavigationRouter<State, Options, Actions>,
  navigationConfig: NavigationConfig<State, Options> = {}
): NavigationNavigator<State, Options, Props> {

  type StateHOC = Include<InferProps<typeof NavigationView>, 'descriptors' | 'screenProps'>;

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
