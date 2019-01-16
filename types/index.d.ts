// Workaround for @types/node vs @types/react-native definitions conflict:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16825
declare var process: any;

declare module 'react-lifecycles-compat' {
  import * as React from 'react';
  export function polyfill<T extends React.ComponentType<any>>(
    Comp: T
  ): T & { [K in keyof T]: T[K] };
}
