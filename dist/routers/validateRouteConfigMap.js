"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_is_1 = require("react-is");
const utils_1 = require("../utils");
/**
 * Make sure the config passed e.g. to StackRouter, TabRouter has
 * the correct format, and throw a clear error if it doesn't.
 */
function validateRouteConfigMap(routeConfigs) {
    const routeNames = Object.keys(routeConfigs);
    utils_1.invariant(routeNames.length > 0, 'Please specify at least one route when configuring a navigator.');
    routeNames.forEach(routeName => {
        const routeConfig = routeConfigs[routeName];
        const screenComponent = getScreenComponent(routeConfig);
        if (!screenComponent ||
            (!react_is_1.isValidElementType(screenComponent) && !('getScreen' in routeConfig))) {
            throw new Error(`The component for route '${routeName}' must be a React component. For example:

import MyScreen from './MyScreen';
...
${routeName}: MyScreen,
}

You can also use a navigator:

import MyNavigator from './MyNavigator';
...
${routeName}: MyNavigator,
}`);
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