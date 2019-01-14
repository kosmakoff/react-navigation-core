"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const createNavigator_1 = require("./createNavigator");
const SwitchView_1 = tslib_1.__importDefault(require("../views/SwitchView/SwitchView"));
const routers_1 = require("../routers");
function createSwitchNavigator(routeConfigMap, switchConfig = {}) {
    const router = routers_1.SwitchRouter(routeConfigMap, switchConfig);
    return createNavigator_1.createNavigator(SwitchView_1.default, router, switchConfig);
}
exports.createSwitchNavigator = createSwitchNavigator;
//# sourceMappingURL=createSwitchNavigator.js.map