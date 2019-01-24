import * as React from 'react';
import { NavigationRouter } from '../routers';
import { NavigationScreenOptions } from '../screens';
import { NavigationState } from '../types';
import { NavigationViewProps, NavigationNavigator, NavigationNavigatorProps } from '.';
/**
 * Create Navigator
 */
export declare function createNavigator<P extends NavigationViewProps<State, Options>, State extends NavigationState, Options = NavigationScreenOptions, Actions = {}>(NavigationView: React.ComponentType<P>, router: NavigationRouter<State, Options, Actions>, navigationConfig?: P['navigationConfig']): NavigationNavigator<State, Options, NavigationNavigatorProps<State, Options>>;
