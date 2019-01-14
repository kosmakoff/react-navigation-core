"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const context_1 = require("../context");
class SceneView extends React.PureComponent {
    render() {
        const { screenProps, component: Component, navigation } = this.props;
        return (React.createElement(context_1.NavigationContext.Provider, { value: navigation },
            React.createElement(Component, { screenProps: screenProps, navigation: navigation })));
    }
}
exports.default = SceneView;
//# sourceMappingURL=SceneView.js.map