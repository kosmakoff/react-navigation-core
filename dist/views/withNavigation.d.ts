import * as React from 'react';
declare type NavigationInjectedProps<S> = import('../views').NavigationInjectedProps<S>;
declare type NavigationOnRefInjectedProps<P, T> = import('../views').NavigationOnRefInjectedProps<P, T>;
export default function withNavigation<P extends NavigationInjectedProps<any>>(Component: React.ComponentType<P>): React.ComponentClass<P & NavigationOnRefInjectedProps<P, typeof Component>>;
export {};
