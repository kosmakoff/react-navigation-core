import * as React from 'react';
import withNavigation from './withNavigation';
import { NavigationEventsProps } from '.';
import { NavigationEventSubscription } from '../types';
import {
  NavigationEventTypeProps,
  NavigationViewEventType,
  NavigationViewEVENTNames as EventNames,
} from './events';

const EventNameToPropName: { [key in NavigationViewEventType]: NavigationEventTypeProps } = {
  willFocus: 'onWillFocus',
  didFocus: 'onDidFocus',
  willBlur: 'onWillBlur',
  didBlur: 'onDidBlur',
};

const subscriptions = Symbol();

class NavigationEvents extends React.Component<Partial<NavigationEventsProps<any>>> {
  [subscriptions]: {
    [event in NavigationViewEventType]: NavigationEventSubscription;
  }

  getPropListener = (eventName: NavigationViewEventType) =>
    this.props[EventNameToPropName[eventName]];

  componentDidMount() {
    this[subscriptions] = {} as any;

    // We register all navigation listeners on mount to ensure listener stability across re-render
    // A former implementation was replacing (removing/adding) listeners on all update (if prop provided)
    // but there were issues (see https://github.com/react-navigation/react-navigation/issues/5058)
    EventNames.forEach(eventName => {
      this[subscriptions][eventName] = this.props.navigation!.addListener(
        eventName,
        (...args: any[]) => {
          const propListener = this.getPropListener(eventName) as ((...args: any[]) => void) | undefined;
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
