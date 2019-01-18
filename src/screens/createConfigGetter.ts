import validateScreenOptions from './validateScreenOptions';
import { NavigationRouteConfigMap } from '../types';
import {
  getScreenForRouteName,
  NavigationScreenConfig,
  NavigationScreenConfigParams,
  NavigationScreenOptions,
  NavigationScreenOptionsGetter,
  NavigationScreenPropBase,
  NavigationComponentScreenProps
} from '../screens';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

function applyConfig<Options extends NavigationScreenOptions>(
  configurer: NavigationScreenConfig<any, Options> | null | undefined,
  navigationOptions: Options,
  configProps: Omit<NavigationScreenConfigParams<any, Options>, 'navigationOptions'>
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
  routeConfigs: NavigationRouteConfigMap,
  navigatorScreenConfig?: NavigationScreenConfig<any, Options>
): NavigationScreenOptionsGetter<any, Options> {
  return (
    navigation: NavigationScreenPropBase<any>,
    screenProps?: NavigationComponentScreenProps
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
