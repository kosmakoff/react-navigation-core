import { NavigationRouter } from './routers';
import { NavigationScreenProp } from './screens';
import { NavigationDispatch, NavigationEventCallback, NavigationParams } from './types';
export default function getNavigation<State = {}, Params = NavigationParams, Actions = {}>(router: NavigationRouter<State, any, Actions>, state: State, dispatch: NavigationDispatch, actionSubscribers: Set<NavigationEventCallback>, getScreenProps: () => {}, getCurrentNavigation: () => NavigationScreenProp<any, Params, Actions>): NavigationScreenProp<State, Params, Actions>;
