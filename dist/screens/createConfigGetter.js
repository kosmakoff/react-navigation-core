"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const validateScreenOptions_1 = tslib_1.__importDefault(require("./validateScreenOptions"));
const screens_1 = require("../screens");
function applyConfig(configurer, navigationOptions, configProps) {
    if (typeof configurer === 'function') {
        return Object.assign({}, navigationOptions, configurer(Object.assign({}, configProps, { navigationOptions })));
    }
    if (typeof configurer === 'object') {
        return Object.assign({}, navigationOptions, configurer);
    }
    return navigationOptions;
}
function createConfigGetter(routeConfigs, navigatorScreenConfig) {
    return (navigation, screenProps) => {
        const { state } = navigation;
        const route = state;
        if (!route.routeName || typeof route.routeName !== 'string') {
            throw new Error('Cannot get config because the route does not have a routeName.');
        }
        const Component = screens_1.getScreenForRouteName(routeConfigs, route.routeName);
        const routeConfig = routeConfigs[route.routeName];
        const routeScreenConfig = routeConfig === Component ? null : routeConfig.navigationOptions;
        const componentScreenConfig = Component.navigationOptions;
        const configOptions = { navigation, screenProps: screenProps || {} };
        let outputConfig = applyConfig(navigatorScreenConfig, {}, configOptions);
        outputConfig = applyConfig(componentScreenConfig, outputConfig, configOptions);
        outputConfig = applyConfig(routeScreenConfig, outputConfig, configOptions);
        validateScreenOptions_1.default(outputConfig, route);
        return outputConfig;
    };
}
exports.default = createConfigGetter;
//# sourceMappingURL=createConfigGetter.js.map