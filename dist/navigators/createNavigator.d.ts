import { NavigationRouter } from '../routers';
import { NavigationView } from '../navigators';
import { NavigationState } from '../types';
import { NavigationConfig, NavigationScreenOptions, NavigationNavigator, NavigationNavigatorProps } from '../screens';
/**
 * Create Navigator
 */
export declare function createNavigator<Props extends NavigationNavigatorProps<State, Options>, State extends NavigationState, Options = NavigationScreenOptions, Actions = {}>(NavigationView: NavigationView<State, Options>, router: NavigationRouter<State, Options, Actions>, navigationConfig?: NavigationConfig<State, Options>): NavigationNavigator<State, Options, Props>;
