import { NavigationState } from '../types';
import { NavigationScreenProp, NavigationScreenOptions, NavigationComponentScreenProps } from '../screens';
export default function getActiveChildNavigationOptions<State extends NavigationState>(navigation: NavigationScreenProp<State>, screenProps: NavigationComponentScreenProps): NavigationScreenOptions | null | undefined;
