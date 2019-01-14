import { NavigationParams } from '../types';
import { NavigationBackAction, NavigationInitAction, NavigationNavigateAction, NavigationSetParamsAction } from './NavigationActions';
import { NavigationPopAction, NavigationPopToTopAction, NavigationPushAction, NavigationResetAction, NavigationReplaceAction, NavigationCompleteTransitionAction } from './StackActions';
export declare type NavigationAction = NavigationInitAction | NavigationStackAction;
export declare type NavigationStackAction = NavigationInitAction | NavigationNavigateAction | NavigationBackAction | NavigationSetParamsAction | NavigationResetAction | NavigationReplaceAction | NavigationPopAction | NavigationPushAction | NavigationPopToTopAction | NavigationCompleteTransitionAction;
export interface NavigationCustomActionPayload {
    [payload: string]: any;
}
export interface NavigationCustomAction extends NavigationCustomActionPayload {
    type: string;
}
export declare type NavigationActionCreatorCallback = (...args: any[]) => NavigationCustomAction;
export interface NavigationActionCreatorsBase {
    [action: string]: NavigationActionCreatorCallback;
}
export interface NavigationActionCreators<Params = NavigationParams> {
    goBack: (key?: string) => NavigationBackAction;
    navigate: (navigateTo: string, params?: Params, action?: NavigationNavigateAction) => NavigationNavigateAction;
    setParams: (params?: Params) => NavigationSetParamsAction;
}
export * from './StackActions';
export * from './NavigationActions';
export * from './getNavigationActionCreators';
