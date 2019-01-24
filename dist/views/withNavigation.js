"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
const invariant_1 = tslib_1.__importDefault(require("invariant"));
const context_1 = require("../context");
function withNavigation(Component) {
    class ComponentWithNavigation extends React.Component {
        constructor() {
            super(...arguments);
            this._setNavigationContext = (navigationContext) => {
                const navigation = this.props.navigation || navigationContext;
                if (!navigation) { /* tslint:disable-next-line:max-line-length */
                    invariant_1.default(false, 'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
                }
                return (React.createElement(Component, Object.assign({}, this.props, { navigation: navigation, ref: this.props.onRef })));
            };
        }
        render() {
            return (React.createElement(context_1.NavigationContext.Consumer, null, this._setNavigationContext));
        }
    }
    ComponentWithNavigation.displayName = `withNavigation(${Component.displayName || Component.name})`;
    const hoistStatics = hoist_non_react_statics_1.default(ComponentWithNavigation, Component);
    return hoistStatics;
}
exports.default = withNavigation;
//# sourceMappingURL=withNavigation.js.map