import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import withNavigation from './withNavigation';

type NavigationFocusInjectedProps<S> =
  import('../views').NavigationFocusInjectedProps<S>;

type NavigationOnRefInjectedProps<P, T> =
  import('../views').NavigationOnRefInjectedProps<P, T>;

const subscriptions = Symbol();

export default function withNavigationFocus<P extends NavigationFocusInjectedProps<any>>(
  Component: React.ComponentType<P>
): React.ComponentClass<P & NavigationOnRefInjectedProps<P, typeof Component>> {

  interface StateHOC {
    isFocused: boolean;
  };
  type Props = P & NavigationOnRefInjectedProps<P, typeof Component>

  class ComponentWithNavigationFocus extends React.Component<Props, StateHOC> {
    constructor(props: Props) {
      super(props);

      this.state = {
        isFocused: props.navigation ? props.navigation.isFocused() : false,
      };
    }

    static displayName = `withNavigationFocus(${Component.displayName ||
      Component.name})`;

    [subscriptions]: Array<import('../types').NavigationEventSubscription>;

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

  return hoistNonReactStatics(withNavigation(ComponentWithNavigationFocus), Component);
}
