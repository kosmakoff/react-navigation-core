declare type NavigationParams = import('../types').NavigationParams;
export interface NavigationBackActionPayload {
    key?: string | null;
    immediate?: boolean;
}
export interface NavigationBackAction extends NavigationBackActionPayload {
    type: 'Navigation/BACK';
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
    action?: NavigationNavigateAction | null;
    key?: string;
    immediate?: boolean;
}
export interface NavigationNavigateAction extends NavigationNavigateActionPayload {
    type: 'Navigation/NAVIGATE';
}
export interface NavigationSetParamsActionPayload {
    key: string;
    params?: NavigationParams;
}
export interface NavigationSetParamsAction extends NavigationSetParamsActionPayload {
    type: 'Navigation/SET_PARAMS';
}
export declare const NavigationActions: Readonly<{
    back: (payload?: NavigationBackActionPayload) => NavigationBackAction;
    init: (payload?: NavigationInitActionPayload) => NavigationInitAction;
    navigate: (payload: NavigationNavigateActionPayload) => NavigationNavigateAction;
    setParams: (payload: NavigationSetParamsActionPayload) => NavigationSetParamsAction;
    BACK: "Navigation/BACK";
    INIT: "Navigation/INIT";
    NAVIGATE: "Navigation/NAVIGATE";
    SET_PARAMS: "Navigation/SET_PARAMS";
}>;
export {};
