"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_is_1 = require("react-is");
const invariant_1 = tslib_1.__importDefault(require("invariant"));
/**
 * Simple helper that gets a single screen (React component or navigator)
 * out of the navigator config.
 */
function getScreenForRouteName(routeConfigs, routeName) {
    const routeConfig = routeConfigs[routeName];
    if (!routeConfig) {
        invariant_1.default(false, `There is no route defined for key ${routeName}.\n` +
            `Must be one of: ${Object.keys(routeConfigs)
                .map(a => `'${a}'`)
                .join(',')}`);
    }
    if ('screen' in routeConfig) {
        return routeConfig.screen;
    }
    if ('getScreen' in routeConfig &&
        typeof routeConfig.getScreen === 'function') {
        const screen = routeConfig.getScreen();
        if (!react_is_1.isValidElementType(screen)) {
            invariant_1.default(false, `The getScreen defined for route '${routeName} didn't return a valid ` +
                'screen or navigator.\n\n' +
                'Please pass it like this:\n' +
                `${routeName}: {\n  getScreen: () => require('./MyScreen').default\n}`);
        }
        return screen;
    }
    return routeConfig;
}
exports.default = getScreenForRouteName;
//# sourceMappingURL=getScreenForRouteName.js.map