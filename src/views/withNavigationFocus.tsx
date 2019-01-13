import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { invariant } from '../utils';
import withNavigation from './withNavigation';
import { NavigationEventSubscription } from '../types';
import {
  NavigationFocusInjectedProps,
  NavigationOnRefInjectedProps
} from '../views';

interface StateHOC {
  isFocused: boolean;
};

const subscriptions = Symbol();

export default function withNavigationFocus<P extends NavigationFocusInjectedProps<any>>(
  Component: React.ComponentType<P>
): React.ComponentType<P & NavigationOnRefInjectedProps<P, typeof Component>> {
  class ComponentWithNavigationFocus extends React.Component<
    P & NavigationOnRefInjectedProps<P, typeof Component>, StateHOC
  > {
    static displayName = `withNavigationFocus(${Component.displayName ||
      Component.name})`;

    constructor(props: P & NavigationOnRefInjectedProps<P, typeof Component>) {
      super(props);

      this.state = {
        isFocused: props.navigation ? props.navigation.isFocused() : false,
      };
    }

    componentDidMount() {
      const { navigation } = this.props;
      invariant(
        !!navigation, /* tslint:disable-next-line:max-line-length */
        'withNavigationFocus can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.'
      );

      this[subscriptions] = [
        navigation!.addListener('didFocus', () =>
          this.setState({ isFocused: true })
        ),
        navigation!.addListener('willBlur', () =>
          this.setState({ isFocused: false })
        ),
      ];
    }

    componentWillUnmount() {
      this[subscriptions].forEach((sub: NavigationEventSubscription) => sub.remove());
    }

    render() {
      return (
        <Component
          {...this.props}
          isFocused={this.state.isFocused}
          ref={this.props.onRef}
        />
      );
    }
  }

  return hoistNonReactStatics(withNavigation(ComponentWithNavigationFocus), Component);
}
