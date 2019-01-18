"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const withDefaultValue_1 = tslib_1.__importDefault(require("../utils/withDefaultValue"));
const routers_1 = require("../routers");
/* tslint:disable:no-parameter-reassignment */
function TabRouter(routeConfigs, config = {}) {
    config = Object.assign({}, config);
    config = withDefaultValue_1.default(config, 'resetOnBlur', false);
    config = withDefaultValue_1.default(config, 'backBehavior', 'initialRoute');
    const switchRouter = routers_1.SwitchRouter(routeConfigs, config);
    return switchRouter;
}
exports.TabRouter = TabRouter;
;
//# sourceMappingURL=TabRouter.js.map