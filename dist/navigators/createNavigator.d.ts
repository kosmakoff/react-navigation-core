import { NavigationRouter } from '../routers';
import { NavigationState } from '../types';
import { NavigationConfig, NavigationScreenOptions, NavigationNavigator, NavigationNavigatorProps } from '../screens';
import { NavigationView } from '../navigators';
/**
 * Create Navigator
 */
export declare function createNavigator<Props extends object & NavigationNavigatorProps<State, Options>, State extends NavigationState, Options = NavigationScreenOptions, Actions = {}>(NavigationView: NavigationView<State, Options, Props>, router: NavigationRouter<State, Options, Actions>, navigationConfig?: NavigationConfig<State, Options>): NavigationNavigator<State, Options, Props>;
