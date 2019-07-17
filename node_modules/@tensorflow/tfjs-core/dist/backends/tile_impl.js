"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * An implementation of the tile kernel shared between webgl and cpu for string
 * tensors only.
 */
var array_ops_1 = require("../ops/array_ops");
function tile(xBuf, reps) {
    var newShape = new Array(xBuf.rank);
    for (var i = 0; i < newShape.length; i++) {
        newShape[i] = xBuf.shape[i] * reps[i];
    }
    var result = array_ops_1.buffer(newShape, xBuf.dtype);
    for (var i = 0; i < result.values.length; ++i) {
        var newLoc = result.indexToLoc(i);
        var originalLoc = new Array(xBuf.rank);
        for (var i_1 = 0; i_1 < originalLoc.length; i_1++) {
            originalLoc[i_1] = newLoc[i_1] % xBuf.shape[i_1];
        }
        var originalIndex = xBuf.locToIndex(originalLoc);
        result.values[i] = xBuf.values[originalIndex];
    }
    return result.toTensor();
}
exports.tile = tile;
//# sourceMappingURL=tile_impl.js.map