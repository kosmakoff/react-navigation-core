declare type NavigationScreenOptions = import('../screens').NavigationScreenOptions;
export default function createConfigGetter<Options extends NavigationScreenOptions = NavigationScreenOptions>(routeConfigs: import('../types').NavigationRouteConfigMap, navigatorScreenConfig?: import('../screens').NavigationScreenConfig<any, Options>): import('../screens').NavigationScreenOptionsGetter<any, Options>;
export {};
