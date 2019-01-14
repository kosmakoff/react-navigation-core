"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getChildrenNavigationCache(navigation) {
    if (!navigation) {
        return {};
    }
    const childrenNavigationCache = navigation._childrenNavigation || (navigation._childrenNavigation = {});
    const childKeys = navigation.state.routes.map(route => route.key);
    Object.keys(childrenNavigationCache).forEach(cacheKey => {
        if (!childKeys.includes(cacheKey) && !navigation.state.isTransitioning) {
            delete childrenNavigationCache[cacheKey];
        }
    });
    return navigation._childrenNavigation;
}
exports.default = getChildrenNavigationCache;
//# sourceMappingURL=getChildrenNavigationCache.js.map