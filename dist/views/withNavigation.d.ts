import * as React from 'react';
import { NavigationInjectedProps, NavigationOnRefInjectedProps } from '../views';
export default function withNavigation<P extends NavigationInjectedProps<any>>(Component: React.ComponentType<P>): React.ComponentClass<Pick<P & NavigationOnRefInjectedProps<P, React.ComponentType<P>>, "onRef" | Exclude<keyof P, "navigation">> & Partial<P & NavigationOnRefInjectedProps<P, React.ComponentType<P>>>, any>;
