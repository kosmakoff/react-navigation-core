import * as React from 'react';
import { NavigationFocusInjectedProps, NavigationOnRefInjectedProps } from '../views';
export default function withNavigationFocus<P extends object & NavigationFocusInjectedProps<any>>(Component: React.ComponentType<P>): React.ComponentType<P & NavigationOnRefInjectedProps<P, typeof Component>>;
