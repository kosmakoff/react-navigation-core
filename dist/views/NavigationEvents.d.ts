import * as React from 'react';
import { NavigationScreenProp } from '../screens';
import { NavigationEventCallback } from '../types';
declare type NavigationEventTypeProps = import('./events').NavigationEventTypeProps;
declare type Props<State, Options> = import('react-native').ViewProps & {
    navigation: NavigationScreenProp<State, Options>;
} & Partial<Record<NavigationEventTypeProps, NavigationEventCallback>>;
declare const _default: React.ComponentClass<Pick<import("react-native").ViewProps & {
    navigation: NavigationScreenProp<any, any, {}>;
} & Partial<Record<import("./events").NavigationEventTypeProps, NavigationEventCallback>> & import(".").NavigationOnRefInjectedProps<Props<any, any>, React.ComponentType<Props<any, any>>>, "style" | "onRef" | "onWillFocus" | "onDidFocus" | "onWillBlur" | "onDidBlur" | "hitSlop" | "onLayout" | "pointerEvents" | "removeClippedSubviews" | "testID" | "nativeID" | "collapsable" | "needsOffscreenAlphaCompositing" | "renderToHardwareTextureAndroid" | "accessibilityViewIsModal" | "accessibilityActions" | "onAccessibilityAction" | "shouldRasterizeIOS" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "accessible" | "accessibilityLabel" | "accessibilityRole" | "accessibilityStates" | "accessibilityHint" | "accessibilityComponentType" | "accessibilityLiveRegion" | "importantForAccessibility" | "accessibilityElementsHidden" | "accessibilityTraits" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors"> & Partial<import("react-native").ViewProps & {
    navigation: NavigationScreenProp<any, any, {}>;
} & Partial<Record<import("./events").NavigationEventTypeProps, NavigationEventCallback>> & import(".").NavigationOnRefInjectedProps<Props<any, any>, React.ComponentType<Props<any, any>>>>, any>;
export default _default;
