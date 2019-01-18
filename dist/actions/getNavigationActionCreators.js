"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("../actions");
function getNavigationActionCreators(route) {
    return {
        goBack: (key) => {
            let actualizedKey = key;
            if (key === undefined && 'key' in route) {
                if (typeof route.key !== 'string') {
                    throw new Error('key should be a string');
                }
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
            if (typeof navigateTo !== 'object') {
                throw new Error('Must navigateTo an object or a string');
            }
            if (params != null) {
                throw new Error('Params must not be provided to .navigate() when specifying an object');
            }
            if (action != null) {
                throw new Error('Child action must not be provided to .navigate() when specifying an object');
            }
            return actions_1.NavigationActions.navigate(navigateTo);
        },
        setParams: (params) => {
            if (typeof route.key !== 'string') {
                throw Error('setParams cannot be called by root navigator');
            }
            return actions_1.NavigationActions.setParams({ params, key: route.key });
        },
    };
}
exports.getNavigationActionCreators = getNavigationActionCreators;
;
//# sourceMappingURL=getNavigationActionCreators.js.map