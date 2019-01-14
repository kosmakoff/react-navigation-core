"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let uniqueBaseId = `id-${Date.now()}`;
let uuidCount = 0;
function _TESTING_ONLY_normalize_keys() {
    uniqueBaseId = 'id';
    uuidCount = 0;
}
exports._TESTING_ONLY_normalize_keys = _TESTING_ONLY_normalize_keys;
function generateKey() {
    return `${uniqueBaseId}-${uuidCount++}`;
}
exports.generateKey = generateKey;
//# sourceMappingURL=KeyGenerator.js.map