"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function withDefaultValue(obj, key, defaultValue) {
    if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined') {
        return obj;
    }
    obj[key] = defaultValue;
    return obj;
}
exports.withDefaultValue = withDefaultValue;
;
//# sourceMappingURL=withDefaultValue.js.map