"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POP = 'Navigation/POP';
const POP_TO_TOP = 'Navigation/POP_TO_TOP';
const PUSH = 'Navigation/PUSH';
const RESET = 'Navigation/RESET';
const REPLACE = 'Navigation/REPLACE';
const COMPLETE_TRANSITION = 'Navigation/COMPLETE_TRANSITION';
const pop = (payload = {}) => (Object.assign({ type: POP }, payload));
const popToTop = (payload = {}) => (Object.assign({ type: POP_TO_TOP }, payload));
const push = (payload) => (Object.assign({ type: PUSH }, payload));
const reset = (payload) => (Object.assign({ type: RESET }, payload));
const replace = (payload) => (Object.assign({ type: REPLACE }, payload));
const completeTransition = (payload) => (Object.assign({ type: 'Navigation/COMPLETE_TRANSITION' }, payload));
exports.StackActions = Object.freeze({
    // Action creators
    pop,
    popToTop,
    push,
    reset,
    replace,
    completeTransition,
    // Action constants
    POP,
    POP_TO_TOP,
    PUSH,
    RESET,
    REPLACE,
    COMPLETE_TRANSITION,
});
//# sourceMappingURL=StackActions.js.map