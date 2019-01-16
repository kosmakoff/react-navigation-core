// Workaround for @types/node vs @types/react-native definitions conflict:
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16825
declare var process: any;

declare module 'react-lifecycles-compat' {
  import * as React from 'react';

  export function polyfill<P extends {}, T extends React.ComponentType<P> & {}>(
    Comp: T
  ): T;
/*
  export function polyfill<P>(
    Comp: React.ComponentType<P>
  ): React.ComponentType<P>;
*/

}
