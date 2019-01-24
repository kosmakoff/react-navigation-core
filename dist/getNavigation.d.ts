import { NavigationRouter } from './routers';
import { NavigationScreenPropRoot } from './screens';
import { NavigationParams, NavigationDispatch, NavigationEventCallback } from './types';
export declare function getNavigation<State = {}, Params = NavigationParams, Actions = {}>(router: NavigationRouter<State, Params, Actions>, state: State, dispatch: NavigationDispatch, actionSubscribers: Set<NavigationEventCallback>, getScreenProps: () => {}, getCurrentNavigation: () => NavigationScreenPropRoot<any, Params, Actions>): NavigationScreenPropRoot<State, Params, Actions>;
