import { NavigationParams } from '../types';
import { NavigationNavigateAction } from '../actions';

const BACK = 'Navigation/BACK' as 'Navigation/BACK';
const INIT = 'Navigation/INIT' as 'Navigation/INIT';
const NAVIGATE = 'Navigation/NAVIGATE' as 'Navigation/NAVIGATE';
const SET_PARAMS = 'Navigation/SET_PARAMS' as 'Navigation/SET_PARAMS';

export interface NavigationBackActionPayload {
  key?: string | null;
  immediate?: boolean;
}

export interface NavigationBackAction extends NavigationBackActionPayload {
  type: 'Navigation/BACK'
}

export interface NavigationInitActionPayload {
  params?: NavigationParams;
}

export interface NavigationInitAction extends NavigationInitActionPayload {
  type: 'Navigation/INIT';
}

export interface NavigationNavigateActionPayload {
  routeName: string;
  params?: NavigationParams;
  // The action to run inside the sub-router
  action?: NavigationNavigateAction | null;
  key?: string;
  immediate?: boolean;
}

export interface NavigationNavigateAction
  extends NavigationNavigateActionPayload {
  type: 'Navigation/NAVIGATE';
}

export interface NavigationSetParamsActionPayload {
  // The key of the route where the params should be set
  key: string;
  // The new params to merge into the existing route params
  params?: NavigationParams;
}

export interface NavigationSetParamsAction
  extends NavigationSetParamsActionPayload {
  type: 'Navigation/SET_PARAMS';
}

const back = (payload: NavigationBackActionPayload = {}): NavigationBackAction => ({
  type: BACK,
  key: payload.key,
  immediate: payload.immediate,
});

const init = (payload: NavigationInitActionPayload = {}): NavigationInitAction => {
  const action: NavigationInitAction = {
    type: INIT,
  };
  if (payload.params) {
    action.params = payload.params;
  }
  return action;
};

const navigate = (payload: NavigationNavigateActionPayload): NavigationNavigateAction => {
  const action: NavigationNavigateAction = {
    type: NAVIGATE,
    routeName: payload.routeName,
  };
  if (payload.params) {
    action.params = payload.params;
  }
  if (payload.action) {
    action.action = payload.action;
  }
  if (payload.key) {
    action.key = payload.key;
  }
  if (typeof payload.immediate === 'boolean') {
    action.immediate = payload.immediate;
  }
  return action;
};

const setParams = (payload: NavigationSetParamsActionPayload): NavigationSetParamsAction => ({
  type: SET_PARAMS,
  key: payload.key,
  params: payload.params,
});

export const NavigationActions = {
  // Action creators
  back,
  init,
  navigate,
  setParams,

  // Action constants
  BACK,
  INIT,
  NAVIGATE,
  SET_PARAMS,
};
