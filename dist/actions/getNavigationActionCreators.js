"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const actions_1 = require("../actions");
function getNavigationActionCreators(route) {
    return {
        goBack: (key) => {
            let actualizedKey = key;
            if (key === undefined && 'key' in route) {
                utils_1.invariant(typeof route.key === 'string', 'key should be a string');
                actualizedKey = route.key;
            }
            return actions_1.NavigationActions.back({ key: actualizedKey });
        },
        navigate: (navigateTo, params, action) => {
            if (typeof navigateTo === 'string') {
                return actions_1.NavigationActions.navigate({
                    params,
                    action,
                    routeName: navigateTo,
                });
            }
            utils_1.invariant(typeof navigateTo === 'object', 'Must navigateTo an object or a string');
            utils_1.invariant(params == null, 'Params must not be provided to .navigate() when specifying an object');
            utils_1.invariant(action == null, 'Child action must not be provided to .navigate() when specifying an object');
            return actions_1.NavigationActions.navigate(navigateTo);
        },
        setParams: (params) => {
            utils_1.invariant('key' in route && typeof route.key === 'string', 'setParams cannot be called by root navigator');
            return actions_1.NavigationActions.setParams({ params, key: route.key });
        },
    };
}
exports.getNavigationActionCreators = getNavigationActionCreators;
;
//# sourceMappingURL=getNavigationActionCreators.js.map