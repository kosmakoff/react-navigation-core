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

export const NavigationViewEVENTNames: NavigationViewEventType[] = [
  'willFocus', 'didFocus', 'willBlur', 'didBlur',
];

export const NavigationEVENTNames: NavigationEventType[] = [
  'action', 'refocus', ...NavigationViewEVENTNames,
];
