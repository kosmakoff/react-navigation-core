"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const routers_1 = require("../routers");
/* tslint:disable:no-parameter-reassignment */
function TabRouter(routeConfigs, config = {}) {
    config = Object.assign({}, config);
    config = utils_1.withDefaultValue(config, 'resetOnBlur', false);
    config = utils_1.withDefaultValue(config, 'backBehavior', 'initialRoute');
    const switchRouter = routers_1.SwitchRouter(routeConfigs, config);
    return switchRouter;
}
exports.TabRouter = TabRouter;
;
//# sourceMappingURL=TabRouter.js.map