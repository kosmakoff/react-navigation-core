import * as React from 'react';
import { NavigationInjectedProps, NavigationOnRefInjectedProps } from '../views';
export default function withNavigation<P extends NavigationInjectedProps<any>>(Component: React.ComponentType<P>): React.ComponentType<P & NavigationOnRefInjectedProps<P, typeof Component>>;
