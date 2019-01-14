"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_lifecycles_compat_1 = require("react-lifecycles-compat");
const utils_1 = require("../utils");
;
/**
 * Create Navigator
 */
function createNavigator(NavigationView, router, navigationConfig = {}) {
    class Navigator extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                descriptors: {},
                screenProps: this.props.screenProps,
            };
        }
        static getDerivedStateFromProps(nextProps, prevState) {
            const prevDescriptors = prevState.descriptors;
            const { navigation, screenProps } = nextProps;
            utils_1.invariant(navigation != null, /* tslint:disable-next-line:max-line-length */ 'The navigation prop is missing for this navigator. In react-navigation 3 you must set up your app container directly. More info: https://reactnavigation.org/docs/en/app-containers.html');
            const { state } = navigation;
            const { routes } = state;
            if (typeof routes === 'undefined') {
                throw new TypeError(/* tslint:disable-next-line:max-line-length */ 'No "routes" found in navigation state. Did you try to pass the navigation prop of a React component to a Navigator child? See https://reactnavigation.org/docs/en/custom-navigators.html#navigator-navigation-prop');
            }
            const descriptors = {};
            routes.forEach(route => {
                if (prevDescriptors &&
                    prevDescriptors[route.key] &&
                    route === prevDescriptors[route.key].state &&
                    screenProps === prevState.screenProps) {
                    descriptors[route.key] = prevDescriptors[route.key];
                    return;
                }
                const getComponent = router.getComponentForRouteName.bind(null, route.routeName);
                const childNavigation = navigation.getChildNavigation(route.key);
                const options = router.getScreenOptions(childNavigation, screenProps);
                descriptors[route.key] = {
                    getComponent,
                    options,
                    key: route.key,
                    state: route,
                    navigation: childNavigation,
                };
            });
            return { descriptors, screenProps };
        }
        render() {
            return (React.createElement(NavigationView, Object.assign({}, this.props, { screenProps: this.state.screenProps, navigation: this.props.navigation, navigationConfig: navigationConfig, descriptors: this.state.descriptors })));
        }
    }
    Navigator.router = router;
    Navigator.navigationOptions = navigationConfig.navigationOptions;
    return react_lifecycles_compat_1.polyfill(Navigator);
}
exports.createNavigator = createNavigator;
//# sourceMappingURL=createNavigator.js.map