"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utilities related to persistent state in the backend.
 */
/**
 * An ID to track `tf.SymbolicTensor`s and derived classes.
 * Required in different places in engine/topology.ts to identify unique
 * tensors.
 */
var _nextUniqueTensorId = 0;
function getNextUniqueTensorId() {
    return _nextUniqueTensorId++;
}
exports.getNextUniqueTensorId = getNextUniqueTensorId;
var _uidPrefixes = {};
/**
 * Provides a unique UID given a string prefix.
 *
 * @param prefix
 */
function getUid(prefix) {
    if (prefix === void 0) { prefix = ''; }
    if (!(prefix in _uidPrefixes)) {
        _uidPrefixes[prefix] = 0;
    }
    _uidPrefixes[prefix] += 1;
    return prefix + _uidPrefixes[prefix].toString();
}
exports.getUid = getUid;
//# sourceMappingURL=state.js.map