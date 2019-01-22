declare type NavigationNavigateAction = import('../actions').NavigationNavigateAction;
declare type NavigationParams = import('../types').NavigationParams;
export interface NavigationPopActionPayload {
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
    toChildKey: string;
    key?: string;
}
export interface NavigationCompleteTransitionAction extends NavigationCompleteTransitionActionPayload {
    type: 'Navigation/COMPLETE_TRANSITION';
}
export declare const StackActions: Readonly<{
    pop: (payload?: NavigationPopActionPayload) => NavigationPopAction;
    popToTop: (payload?: NavigationPopToTopActionPayload) => NavigationPopToTopAction;
    push: (payload: NavigationPushActionPayload) => NavigationPushAction;
    reset: (payload: NavigationResetActionPayload) => NavigationResetAction;
    replace: (payload: NavigationReplaceActionPayload) => NavigationReplaceAction;
    completeTransition: (payload: NavigationCompleteTransitionActionPayload) => NavigationCompleteTransitionAction;
    POP: "Navigation/POP";
    POP_TO_TOP: "Navigation/POP_TO_TOP";
    PUSH: "Navigation/PUSH";
    RESET: "Navigation/RESET";
    REPLACE: "Navigation/REPLACE";
    COMPLETE_TRANSITION: "Navigation/COMPLETE_TRANSITION";
}>;
export {};
