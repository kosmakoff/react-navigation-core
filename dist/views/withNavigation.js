"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
const utils_1 = require("../utils");
const context_1 = require("../context");
function withNavigation(Component) {
    class ComponentWithNavigation extends React.Component {
        render() {
            const navigationProp = this.props.navigation;
            return (React.createElement(context_1.NavigationContext.Consumer, null, navigationContext => {
                const navigation = navigationProp || navigationContext;
                if (!navigation) { /* tslint:disable-next-line:max-line-length */
                    utils_1.invariant(false, 'withNavigation can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
                }
                return (React.createElement(Component, Object.assign({}, this.props, { navigation: navigation, ref: this.props.onRef })));
            }));
        }
    }
    ComponentWithNavigation.displayName = `withNavigation(${Component.displayName || Component.name})`;
    return hoist_non_react_statics_1.default(ComponentWithNavigation, Component);
}
exports.default = withNavigation;
//# sourceMappingURL=withNavigation.js.map