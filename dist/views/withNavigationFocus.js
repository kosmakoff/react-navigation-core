"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const hoist_non_react_statics_1 = tslib_1.__importDefault(require("hoist-non-react-statics"));
const utils_1 = require("../utils");
const withNavigation_1 = tslib_1.__importDefault(require("./withNavigation"));
;
const subscriptions = Symbol();
function withNavigationFocus(Component) {
    class ComponentWithNavigationFocus extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isFocused: props.navigation ? props.navigation.isFocused() : false,
            };
        }
        componentDidMount() {
            const { navigation } = this.props;
            if (!navigation) { /* tslint:disable-next-line:max-line-length */
                utils_1.invariant(false, 'withNavigationFocus can only be used on a view hierarchy of a navigator. The wrapped component is unable to get access to navigation from props or context.');
            }
            this[subscriptions] = [
                navigation.addListener('didFocus', () => this.setState({ isFocused: true })),
                navigation.addListener('willBlur', () => this.setState({ isFocused: false })),
            ];
        }
        componentWillUnmount() {
            this[subscriptions].forEach(sub => sub.remove());
        }
        render() {
            return (React.createElement(Component, Object.assign({}, this.props, { isFocused: this.state.isFocused, ref: this.props.onRef })));
        }
    }
    ComponentWithNavigationFocus.displayName = `withNavigationFocus(${Component.displayName ||
        Component.name})`;
    return hoist_non_react_statics_1.default(withNavigation_1.default(ComponentWithNavigationFocus), Component);
}
exports.default = withNavigationFocus;
//# sourceMappingURL=withNavigationFocus.js.map