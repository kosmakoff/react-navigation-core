import { NavigationParams, NavigationState } from './types';
import { NavigationScreenProp, NavigationScreenPropRoot } from './screens';
export default function getChildrenNavigationCache<State extends NavigationState, Params = NavigationParams, Actions = {}>(navigation?: NavigationScreenPropRoot<State, Params, Actions>): {
    [child: string]: NavigationScreenProp<State, Params, Actions>;
};
