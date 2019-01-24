import * as React from 'react';
import withNavigation from './withNavigation';
import { NavigationViewEVENTNames as EventNames } from './events';

// types
import { NavigationScreenProp } from '../screens';
import {
  NavigationEventCallback,
  NavigationEventSubscription
} from '../types';

type NavigationViewEventType = import('./events').NavigationViewEventType;
type NavigationEventTypeProps = import('./events').NavigationEventTypeProps;

type Props<State, Options> =
  import('react-native').ViewProps
  & {
    navigation: NavigationScreenProp<State, Options>;
  }
  & Partial<Record<NavigationEventTypeProps, NavigationEventCallback>>;

const EventNameToPropName =
  Object.freeze<Record<NavigationViewEventType, NavigationEventTypeProps>>({
    willFocus: 'onWillFocus',
    didFocus: 'onDidFocus',
    willBlur: 'onWillBlur',
    didBlur: 'onDidBlur',
  });

const subscriptions = Symbol('subscriptions');

class NavigationEvents extends React.Component<Props<any, any>> {
  [subscriptions]: Record<NavigationViewEventType, NavigationEventSubscription>;

  getPropListener = (eventName: NavigationViewEventType) =>
    this.props[EventNameToPropName[eventName]];

  componentDidMount() {
    this[subscriptions] = {} as any;

    // We register all navigation listeners on mount to ensure listener stability across re-render
    // A former implementation was replacing (removing/adding) listeners on all update (if prop provided)
    // but there were issues (see https://github.com/react-navigation/react-navigation/issues/5058)
    EventNames.forEach(eventName => {
      this[subscriptions][eventName] = this.props.navigation.addListener(
        eventName,
        (...args: any[]) => {
          const propListener =
            this.getPropListener(eventName) as ((...args: any[]) => void) | undefined;
          return propListener && propListener(...args);
        }
      );
    });
  }

  componentWillUnmount() {
    EventNames.forEach(eventName => {
      this[subscriptions][eventName].remove();
    });
  }

  render() {
    return null;
  }
}

export default withNavigation(NavigationEvents);
