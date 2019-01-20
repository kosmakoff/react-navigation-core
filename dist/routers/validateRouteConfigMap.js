"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_is_1 = require("react-is");
const invariant_1 = tslib_1.__importDefault(require("invariant"));
/**
 * Make sure the config passed e.g. to StackRouter, TabRouter has
 * the correct format, and throw a clear error if it doesn't.
 */
function validateRouteConfigMap(routeConfigs) {
    const routeNames = Object.keys(routeConfigs);
    if (!routeNames.length) {
        throw new Error('Please specify at least one route when configuring a navigator.');
    }
    routeNames.forEach(routeName => {
        const routeConfig = routeConfigs[routeName];
        const screenComponent = getScreenComponent(routeConfig);
        if (!screenComponent ||
            (!react_is_1.isValidElementType(screenComponent) && !('getScreen' in routeConfig))) {
            invariant_1.default(false, [
                `The component for route '${routeName}' must be a React component. For example:`,
                '',
                `import MyScreen from './MyScreen';`,
                '...',
                `${routeName}: MyScreen,`,
                '}',
                '',
                'You can also use a navigator:',
                '',
                `import MyNavigator from './MyNavigator';`,
                '...',
                `${routeName}: MyNavigator,`,
                '}',
            ].join('\n'));
        }
        if ('screen' in routeConfig && 'getScreen' in routeConfig) {
            throw new Error(`Route '${routeName}' should declare a screen or a getScreen, not both.`);
        }
    });
}
exports.default = validateRouteConfigMap;
function getScreenComponent(routeConfig) {
    if (!routeConfig) {
        return null;
    }
    return 'screen' in routeConfig ? routeConfig.screen : routeConfig;
}
//# sourceMappingURL=validateRouteConfigMap.js.map