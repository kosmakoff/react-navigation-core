type NavigationState = import('../types').NavigationState;

export default function getActiveChildNavigationOptions<State extends NavigationState>(
  navigation: import('../screens').NavigationScreenProp<State>,
  screenProps: import('../screens').NavigationComponentScreenProps
): import('../screens').NavigationScreenOptions | null | undefined {
  const { state, router, getChildNavigation } = navigation;
  const activeRoute = state.routes[state.index];
  const activeNavigation = getChildNavigation(activeRoute.key);
  return activeNavigation && router.getScreenOptions(activeNavigation, screenProps);
};
