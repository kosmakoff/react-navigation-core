import { NavigationEventSubscriber, NavigationAddListenerEventCallback } from './types';
import { NavigationEventType } from './views/events';
export default function getChildEventSubscriber(addListener: NavigationAddListenerEventCallback, key: string, initialLastFocusEvent?: NavigationEventType): NavigationEventSubscriber;
