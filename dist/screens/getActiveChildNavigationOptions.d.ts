declare type NavigationState = import('../types').NavigationState;
export default function getActiveChildNavigationOptions<State extends NavigationState>(navigation: import('../screens').NavigationScreenProp<State>, screenProps: import('../screens').NavigationComponentScreenProps): import('../screens').NavigationScreenOptions | null | undefined;
export {};
