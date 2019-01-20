/// <reference types="react" />
import { NavigationAction } from './actions';
import { NavigationRouteConfig } from './screens';
import { NavigationEventType } from './views/events';
export declare type NavigationDispatch = (action?: NavigationAction) => boolean;
export interface NavigationParams {
    [param: string]: any;
}
export interface NavigationRouteConfigMap {
    [routeName: string]: NavigationRouteConfig;
}
/**
 * NavigationState is a tree of routes for a single navigator, where each child
 * route may either be a Navigation Screen Route or a Navigation Router Route.
 * Navigation Screen Route represents a leaf screen, while the
 * Navigation Router Route represents the state of a child navigator.
 *
 * NOTE: NavigationState is a state tree local to a single navigator and
 * its child navigators (via the routes field).
 * If we're in navigator nested deep inside the app, the state will only be the
 * state for that navigator.
 * The state for the root navigator of our app represents the whole navigation
 * state for the whole app.
 */
export interface NavigationState {
    /**
     * Index refers to the active child route in the routes array or
     * represents the depth of the stack on composing navigators
     */
    index: number;
    /**
     * Array containing the navigator's routes
     */
    routes: NavigationRoute[];
    /**
     * Flag that indicates the transition state of the route
     */
    isTransitioning?: boolean;
    /**
     * React's key used by some navigators. No need to specify these manually,
     * they will be defined by the router.
     */
    key?: string;
}
export declare type NavigationRoute<Params = NavigationParams> = NavigationLeafRoute<Params> | NavigationStateRoute<Params>;
export declare type NavigationStateRoute<Params = NavigationParams> = NavigationLeafRoute<Params> & NavigationState;
export interface NavigationLeafRoute<Params = NavigationParams> {
    /**
     * React's key used by some navigators. No need to specify these manually,
     * they will be defined by the router.
     */
    key: string;
    /**
     * For example 'Home'.
     * This is used as a key in a route config when creating a navigator.
     */
    routeName: string;
    /**
     * Path is an advanced feature used for deep linking and on the web.
     */
    path?: string;
    /**
     * Params passed to this route when navigating to it,
     * e.g. `{ car_id: 123 }` in a route that displays a car.
     */
    params?: Params;
}
export declare type NavigationEventCallback = (payload: NavigationEventPayload) => void;
export interface NavigationEventPayload {
    type: NavigationEventType;
    action: NavigationAction;
    state: NavigationState;
    lastState?: NavigationState | null;
    context?: string;
}
export declare type NavigationAddListenerEventCallback = (eventName: NavigationEventType, callback: NavigationEventCallback) => NavigationEventSubscription;
export declare type NavigationEmitEvent = (eventName: NavigationEventType, payload: NavigationEventPayload) => void;
export interface NavigationEventSubscriber {
    addListener: NavigationAddListenerEventCallback;
    emit: NavigationEmitEvent;
}
export interface NavigationEventSubscription {
    remove: () => void;
}
export declare type InferProps<T extends React.ComponentType<any>> = T extends React.ComponentType<infer P> ? P : never;
export declare type Include<T, K extends keyof any> = Pick<T, Extract<keyof T, K>>;
export declare type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
