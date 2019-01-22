import validateScreenOptions from './validateScreenOptions';
import { getScreenForRouteName } from '../screens';

type NavigationScreenOptions = import('../screens').NavigationScreenOptions;

function applyConfig<Options extends NavigationScreenOptions>(
  configurer: import('../screens').NavigationScreenConfig<any, Options> | null | undefined,
  navigationOptions: Options,
  configProps: import('../types').Omit<
    import('../screens').NavigationScreenConfigParams<any, Options>,
    'navigationOptions'
  >
): NavigationScreenOptions {
  if (typeof configurer === 'function') {
    return {
      ...navigationOptions,
      ...configurer({
        ...configProps,
        navigationOptions,
      }),
    };
  }
  if (typeof configurer === 'object') {
    return {
      ...navigationOptions,
      ...configurer,
    };
  }
  return navigationOptions;
}

export default function createConfigGetter<Options extends NavigationScreenOptions = NavigationScreenOptions>(
  routeConfigs: import('../types').NavigationRouteConfigMap,
  navigatorScreenConfig?: import('../screens').NavigationScreenConfig<any, Options>
): import('../screens').NavigationScreenOptionsGetter<any, Options> {
  return (
    navigation: import('../screens').NavigationScreenPropBase<any>,
    screenProps?: import('../screens').NavigationComponentScreenProps
  ): Options => {
    const { state } = navigation;
    const route = state;

    if (!route.routeName || typeof route.routeName !== 'string') {
      throw new Error('Cannot get config because the route does not have a routeName.');
    }

    const Component = getScreenForRouteName(routeConfigs, route.routeName);
    const routeConfig = routeConfigs[route.routeName];
    const routeScreenConfig =
      routeConfig === Component ? null : routeConfig.navigationOptions;
    const componentScreenConfig = Component.navigationOptions;
    const configOptions = { navigation, screenProps: screenProps || {} };

    let outputConfig = applyConfig(navigatorScreenConfig, {} as Options, configOptions);
    outputConfig = applyConfig(
      componentScreenConfig,
      outputConfig,
      configOptions
    );
    outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions);

    validateScreenOptions(outputConfig, route);

    return outputConfig as Options;
  }
}
