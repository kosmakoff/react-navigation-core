import { NavigationScreenProp } from './screens';
import { NavigationParams, NavigationState } from './types';
export default function getChildrenNavigationCache<State extends NavigationState, Params = NavigationParams, Actions = {}>(navigation?: NavigationScreenProp<State, Params, Actions>): {};
