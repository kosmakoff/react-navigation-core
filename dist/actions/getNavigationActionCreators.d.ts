import { NavigationParams, NavigationRoute } from '../types';
import { NavigationActionCreators } from '../actions';
export declare function getNavigationActionCreators<Params = NavigationParams>(route: NavigationRoute): NavigationActionCreators<Params>;
