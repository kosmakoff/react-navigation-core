// node vs react-native global conflicr workaround: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/16825
declare var process: any;

declare module 'react-lifecycles-compat' {
    import * as React from 'react';
    export function polyfill<P>(
      Comp: React.ComponentType<P>
    ): React.ComponentType<P>;
  }
