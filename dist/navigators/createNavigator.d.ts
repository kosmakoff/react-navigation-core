import { NavigationRouter } from '../routers';
import { NavigationState } from '../types';
import { NavigationConfig, NavigationScreenOptions, NavigationNavigator } from '../screens';
import { NavigationView } from '../navigators';
/**
 * Create Navigator
 */
export declare function createNavigator<State extends NavigationState, Options = NavigationScreenOptions, Actions = {}>(NavigationView: NavigationView<State, Options>, router: NavigationRouter<State, Options, Actions>, navigationConfig?: NavigationConfig<State, Options>): NavigationNavigator<State, Options, {}>;
