/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

type IValidateFormat = (format?: string) => void;

interface InvariantError extends Error {
  framesToPop?: number
  name: string
}

let validateFormat: IValidateFormat = () => {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = format => {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

export function invariant(condition: boolean, format?: string, ...args: any[]) {
  validateFormat(format);

  if (!condition) {
    let error: InvariantError;
    if (format === undefined) {
      error = new Error( /* tslint:disable-next-line:max-line-length */
        'Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.'
      );
    } else {
      let argIndex = 0;
      error = new Error(
        format.replace(/%s/g, (): string => args[argIndex++])
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}
