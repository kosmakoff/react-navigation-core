import { NavigationScreenProp, NavigationScreenPropRoot } from './screens';
import { NavigationParams, NavigationStateRoute } from './types';
export default function getChildNavigation<State extends NavigationStateRoute, Params = NavigationParams, Actions = {}>(navigation: NavigationScreenPropRoot<State, Params, Actions>, childKey: string, getCurrentParentNavigation: () => NavigationScreenPropRoot<State, Params, Actions> | null): NavigationScreenProp<State, Params, Actions> | null;
