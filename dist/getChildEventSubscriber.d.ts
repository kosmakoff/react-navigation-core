import { NavigationEventSubscriber, NavigationAddListenerEventCallback } from './types';
declare type NavigationEventType = import('./views/events').NavigationEventType;
export default function getChildEventSubscriber(addListener: NavigationAddListenerEventCallback, key: string, initialLastFocusEvent?: NavigationEventType): NavigationEventSubscriber;
export {};
