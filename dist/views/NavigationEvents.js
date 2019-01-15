"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const withNavigation_1 = tslib_1.__importDefault(require("./withNavigation"));
const events_1 = require("./events");
const EventNameToPropName = {
    willFocus: 'onWillFocus',
    didFocus: 'onDidFocus',
    willBlur: 'onWillBlur',
    didBlur: 'onDidBlur',
};
const subscriptions = Symbol();
class NavigationEvents extends React.Component {
    constructor() {
        super(...arguments);
        this.getPropListener = (eventName) => this.props[EventNameToPropName[eventName]];
    }
    componentDidMount() {
        this[subscriptions] = {};
        // We register all navigation listeners on mount to ensure listener stability across re-render
        // A former implementation was replacing (removing/adding) listeners on all update (if prop provided)
        // but there were issues (see https://github.com/react-navigation/react-navigation/issues/5058)
        events_1.NavigationViewEVENTNames.forEach(eventName => {
            this[subscriptions][eventName] = this.props.navigation.addListener(eventName, (...args) => {
                const propListener = this.getPropListener(eventName);
                return propListener && propListener(...args);
            });
        });
    }
    componentWillUnmount() {
        events_1.NavigationViewEVENTNames.forEach(eventName => {
            this[subscriptions][eventName].remove();
        });
    }
    render() {
        return null;
    }
}
exports.default = withNavigation_1.default(NavigationEvents);
//# sourceMappingURL=NavigationEvents.js.map