"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getChildRouter(router, routeName) {
    if (router.childRouters && router.childRouters[routeName]) {
        return router.childRouters[routeName];
    }
    const Component = router.getComponentForRouteName(routeName);
    return 'router' in Component ? Component.router : undefined;
}
exports.default = getChildRouter;
;
//# sourceMappingURL=getChildRouter.js.map