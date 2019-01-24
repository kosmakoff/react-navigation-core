import { NavigationScreenProp, NavigationScreenPropRoot } from './screens';
import { NavigationState, NavigationParams } from './types';
export default function getChildrenNavigationCache<State extends NavigationState, Params = NavigationParams, Actions = {}>(navigation?: NavigationScreenPropRoot<State, Params, Actions>): {
    [child: string]: NavigationScreenProp<State, Params, Actions>;
};
