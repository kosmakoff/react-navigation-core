"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const getChildNavigation_1 = tslib_1.__importDefault(require("./getChildNavigation"));
const getChildrenNavigationCache_1 = tslib_1.__importDefault(require("./getChildrenNavigationCache"));
const actions_1 = require("./actions");
function getNavigation(router, state, dispatch, actionSubscribers, getScreenProps, getCurrentNavigation) {
    const actionCreators = Object.assign({}, router.getActionCreators(state, null), actions_1.getNavigationActionCreators(state));
    const actionHelpers = {};
    Object.keys(actionCreators).forEach(actionName => {
        actionHelpers[actionName] = (...args) => dispatch(actionCreators[actionName](...args));
    });
    const navigation = Object.assign({}, actionHelpers, { state,
        router, actions: actionCreators, dispatch,
        getScreenProps, getChildNavigation: (childKey) => getChildNavigation_1.default(navigation, childKey, getCurrentNavigation), isFocused: (childKey) => {
            const { routes, index } = getCurrentNavigation().state;
            if (childKey == null || routes[index].key === childKey) {
                return true;
            }
            return false;
        }, addListener: (eventName, handler) => {
            if (eventName !== 'action') {
                return { remove: () => { } };
            }
            actionSubscribers.add(handler);
            return {
                remove: () => {
                    actionSubscribers.delete(handler);
                },
            };
        }, dangerouslyGetParent: () => null, _childrenNavigation: getChildrenNavigationCache_1.default(getCurrentNavigation()) });
    return navigation;
}
exports.getNavigation = getNavigation;
//# sourceMappingURL=getNavigation.js.map