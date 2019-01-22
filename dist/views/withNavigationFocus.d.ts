import * as React from 'react';
declare type NavigationFocusInjectedProps<S> = import('../views').NavigationFocusInjectedProps<S>;
declare type NavigationOnRefInjectedProps<P, T> = import('../views').NavigationOnRefInjectedProps<P, T>;
export default function withNavigationFocus<P extends NavigationFocusInjectedProps<any>>(Component: React.ComponentType<P>): React.ComponentClass<P & NavigationOnRefInjectedProps<P, typeof Component>>;
export {};
