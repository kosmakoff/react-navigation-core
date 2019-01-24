import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import withNavigation from './withNavigation';

// types
import {
  Omit,
  InferProps,
  NavigationEventSubscription
} from '../types';
import {
  NavigationFocusInjectedProps,
  NavigationOnRefInjectedProps
} from '../views';

const subscriptions = Symbol('subscriptions');

export default function withNavigationFocus<P extends NavigationFocusInjectedProps<any>>(
  Component: React.ComponentType<P>
) {

  type StateHOC = {
    isFocused: boolean;
  };

  type PropsHOC = P & NavigationOnRefInjectedProps<P, typeof Component>;

  class ComponentWithNavigationFocus extends React.Component<PropsHOC, StateHOC> {
    constructor(props: PropsHOC) {
      super(props);

      this.state = {
        isFocused: props.navigation ? props.navigation.isFocused() : false,
      };
    }

    static displayName = `withNavigationFocus(${Component.displayName ||
      Component.name})`;

    [subscriptions]: NavigationEventSubscription[];

    componentDidMount() {
      const { navigation } = this.props;
      if (!navigation) { /* tslint:disable-next-line:max-line-length */
        invariant(false, 'withNavigationFocus can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
      }

      this[subscriptions] = [
        navigation.addListener('didFocus', () =>
          this.setState({ isFocused: true })
        ),
        navigation.addListener('willBlur', () =>
          this.setState({ isFocused: false })
        ),
      ];
    }

    componentWillUnmount() {
      this[subscriptions].forEach(sub => sub.remove());
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

  const hoistStatics = hoistNonReactStatics(
    withNavigation(ComponentWithNavigationFocus),
    Component
  );

  type Infer = InferProps<typeof hoistStatics>;
  type Props = Omit<Infer, 'navigation'> & Partial<Infer>;

  return hoistStatics as React.ComponentClass<Props>;
}
