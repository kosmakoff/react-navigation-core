import * as React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import invariant from 'invariant';
import { NavigationContext } from '../context';

// types
import { Omit, InferProps } from '../types';
import {
  NavigationInjectedProps,
  NavigationOnRefInjectedProps
} from '../views';

export default function withNavigation<P extends NavigationInjectedProps<any>>(
  Component: React.ComponentType<P>
) {
  class ComponentWithNavigation extends React.Component<
    P & NavigationOnRefInjectedProps<P, typeof Component>
  > {
    static displayName = `withNavigation(${Component.displayName || Component.name})`;

    render() {
      const navigationProp = this.props.navigation;
      return (
        <NavigationContext.Consumer>
          {navigationContext => {
            const navigation = navigationProp || navigationContext;
            if (!navigation) { /* tslint:disable-next-line:max-line-length */
              invariant(false, 'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
            }
            return (
              <Component
                {...this.props}
                navigation={navigation}
                ref={this.props.onRef}
              />
            );
          }}
        </NavigationContext.Consumer>
      );
    }
  }

  const hoistStatics = hoistNonReactStatics(ComponentWithNavigation, Component);

  type Infer = InferProps<typeof hoistStatics>;
  type Props = Omit<Infer, 'navigation'> & Partial<Infer>;

  return hoistStatics as React.ComponentClass<Props>;
}
