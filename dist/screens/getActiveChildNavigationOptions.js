"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getActiveChildNavigationOptions(navigation, screenProps) {
    const { state, router, getChildNavigation } = navigation;
    const activeRoute = state.routes[state.index];
    const activeNavigation = getChildNavigation(activeRoute.key);
    return activeNavigation && router.getScreenOptions(activeNavigation, screenProps);
}
exports.default = getActiveChildNavigationOptions;
;
//# sourceMappingURL=getActiveChildNavigationOptions.js.map