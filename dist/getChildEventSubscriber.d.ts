declare type NavigationEventType = import('./views/events').NavigationEventType;
export default function getChildEventSubscriber(addListener: import('./types').NavigationAddListenerEventCallback, key: string, initialLastFocusEvent?: NavigationEventType): import('./types').NavigationEventSubscriber;
export {};
