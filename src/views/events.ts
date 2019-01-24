export type NavigationEventType =
  | 'action'
  | 'refocus'
  | NavigationViewEventType;

export type NavigationViewEventType =
  | 'willFocus'
  | 'didFocus'
  | 'willBlur'
  | 'didBlur';

export type NavigationEventTypeProps =
  | 'onWillFocus'
  | 'onDidFocus'
  | 'onWillBlur'
  | 'onDidBlur';

export const NavigationViewEVENTNames = Object.freeze<NavigationViewEventType>([
  'willFocus', 'didFocus', 'willBlur', 'didBlur',
]);

export const NavigationEVENTNames = Object.freeze<NavigationEventType>([
  'action', 'refocus', ...NavigationViewEVENTNames,
]);
