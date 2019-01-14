import { NavigationScreenProp, NavigationScreenPropChild } from './screens';
import { NavigationParams, NavigationState } from './types';
export default function getChildNavigation<State extends NavigationState, Params = NavigationParams, Actions = {}>(navigation: NavigationScreenProp<State, Params, Actions>, childKey: string, getCurrentParentNavigation: () => NavigationScreenProp<State, Params, Actions> | null): NavigationScreenPropChild<State, Params, Actions> | null;
