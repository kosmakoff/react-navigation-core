"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const SceneView_1 = tslib_1.__importDefault(require("../SceneView"));
class SwitchView extends React.Component {
    render() {
        const { state } = this.props.navigation;
        const activeKey = state.routes[state.index].key;
        const descriptor = this.props.descriptors[activeKey];
        const ChildComponent = descriptor.getComponent();
        return (React.createElement(SceneView_1.default, { component: ChildComponent, navigation: descriptor.navigation, screenProps: this.props.screenProps }));
    }
}
exports.default = SwitchView;
//# sourceMappingURL=SwitchView.js.map