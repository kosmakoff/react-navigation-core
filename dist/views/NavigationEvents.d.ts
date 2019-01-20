import * as React from 'react';
import { NavigationEventsProps } from '.';
declare const _default: React.ComponentClass<import("react-native").ViewProps & {
    navigation: import("..").NavigationScreenProp<any, any, {}>;
} & {
    onWillFocus?: import("../types").NavigationEventCallback | undefined;
    onDidFocus?: import("../types").NavigationEventCallback | undefined;
    onWillBlur?: import("../types").NavigationEventCallback | undefined;
    onDidBlur?: import("../types").NavigationEventCallback | undefined;
} & import(".").NavigationOnRefInjectedProps<NavigationEventsProps<any, any>, React.ComponentType<NavigationEventsProps<any, any>>>, any>;
export default _default;
