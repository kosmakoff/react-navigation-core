type NavigationNavigateAction = import('../actions').NavigationNavigateAction;
type NavigationParams = import('../types').NavigationParams;

const POP = 'Navigation/POP' as 'Navigation/POP';
const POP_TO_TOP = 'Navigation/POP_TO_TOP' as 'Navigation/POP_TO_TOP';
const PUSH = 'Navigation/PUSH' as 'Navigation/PUSH';
const RESET = 'Navigation/RESET' as 'Navigation/RESET';
const REPLACE = 'Navigation/REPLACE' as 'Navigation/REPLACE';
const COMPLETE_TRANSITION = 'Navigation/COMPLETE_TRANSITION' as
  'Navigation/COMPLETE_TRANSITION';

export interface NavigationPopActionPayload {
  // n: the number of routes to pop of the stack
  n?: number;
  immediate?: boolean;
}

export interface NavigationPopAction extends NavigationPopActionPayload {
  type: 'Navigation/POP';
}

export interface NavigationPopToTopActionPayload {
  key?: string;
  immediate?: boolean;
}

export interface NavigationPopToTopAction extends NavigationPopToTopActionPayload {
  type: 'Navigation/POP_TO_TOP';
}

export interface NavigationPushActionPayload {
  routeName: string;
  params?: NavigationParams;
  action?: NavigationNavigateAction | null;
  key?: string;
}

export interface NavigationPushAction extends NavigationPushActionPayload {
  type: 'Navigation/PUSH';
}

export interface NavigationResetActionPayload {
  index: number;
  key?: string | null;
  actions: NavigationNavigateAction[];
}

export interface NavigationResetAction extends NavigationResetActionPayload {
  type: 'Navigation/RESET';
}

export interface NavigationReplaceActionPayload {
  key?: string | null;
  newKey?: string;
  routeName: string;
  params?: NavigationParams;
  action?: NavigationNavigateAction | null;
}

export interface NavigationReplaceAction extends NavigationReplaceActionPayload {
  type: 'Navigation/REPLACE';
}

export interface NavigationCompleteTransitionActionPayload {
  toChildKey: string,
  key?: string;
}

export interface NavigationCompleteTransitionAction extends NavigationCompleteTransitionActionPayload {
  type: 'Navigation/COMPLETE_TRANSITION';
}

const pop = (payload: NavigationPopActionPayload = {}): NavigationPopAction => ({
  type: POP,
  ...payload,
});

const popToTop = (payload: NavigationPopToTopActionPayload = {}): NavigationPopToTopAction => ({
  type: POP_TO_TOP,
  ...payload,
});

const push = (payload: NavigationPushActionPayload): NavigationPushAction => ({
  type: PUSH,
  ...payload,
});

const reset = (payload: NavigationResetActionPayload): NavigationResetAction => ({
  type: RESET,
  ...payload,
});

const replace = (payload: NavigationReplaceActionPayload): NavigationReplaceAction => ({
  type: REPLACE,
  ...payload,
});

const completeTransition = (
  payload: NavigationCompleteTransitionActionPayload
): NavigationCompleteTransitionAction => ({
  type: 'Navigation/COMPLETE_TRANSITION',
  ...payload,
});

export const StackActions = Object.freeze({
  // Action creators
  pop,
  popToTop,
  push,
  reset,
  replace,
  completeTransition,

  // Action constants
  POP,
  POP_TO_TOP,
  PUSH,
  RESET,
  REPLACE,
  COMPLETE_TRANSITION,
});
