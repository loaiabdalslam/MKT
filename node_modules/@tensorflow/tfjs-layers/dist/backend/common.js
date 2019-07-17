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
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var _epsilon;
/**
 * Returns the value of the fuzz factor used in numeric expressions.
 */
function epsilon() {
    if (_epsilon == null) {
        _epsilon = tfjs_core_1.backend().epsilon();
    }
    return _epsilon;
}
exports.epsilon = epsilon;
/**
 * Sets the value of the fuzz factor used in numeric expressions.
 * @param e New value of epsilon.
 */
function setEpsilon(e) {
    _epsilon = e;
}
exports.setEpsilon = setEpsilon;
/**
 * Returns the default image data format convention.
 */
function imageDataFormat() {
    return 'channelsLast';
}
exports.imageDataFormat = imageDataFormat;
//# sourceMappingURL=common.js.map