"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
/** An implementation of the TopK kernel shared between webgl and cpu. */
var tensor_ops_1 = require("../ops/tensor_ops");
var util_1 = require("../util");
function topkImpl(x, xShape, xDtype, k, sorted) {
    // Reshape into a 2d tensor [batch, lastDim] and compute topk along lastDim.
    var lastDim = xShape[xShape.length - 1];
    var _a = [x.length / lastDim, lastDim], batch = _a[0], size = _a[1];
    var allTopKVals = util_1.getTypedArrayFromDType(xDtype, batch * k);
    var allTopKIndices = util_1.getTypedArrayFromDType('int32', batch * k);
    for (var b = 0; b < batch; b++) {
        var offset = b * size;
        var vals = x.subarray(offset, offset + size);
        var valAndInd = [];
        for (var i = 0; i < vals.length; i++) {
            valAndInd.push({ value: vals[i], index: i });
        }
        valAndInd.sort(function (a, b) { return b.value - a.value; });
        var outOffset = b * k;
        var topKVals = allTopKVals.subarray(outOffset, outOffset + k);
        var topKIndices = allTopKIndices.subarray(outOffset, outOffset + k);
        for (var i = 0; i < k; i++) {
            topKVals[i] = valAndInd[i].value;
            topKIndices[i] = valAndInd[i].index;
        }
    }
    // Reshape back to the original input shape, except that the last
    // dimension is k.
    var outputShape = xShape.slice();
    outputShape[outputShape.length - 1] = k;
    return [
        tensor_ops_1.tensor(allTopKVals, outputShape, xDtype),
        tensor_ops_1.tensor(allTopKIndices, outputShape, 'int32')
    ];
}
exports.topkImpl = topkImpl;
//# sourceMappingURL=topk_impl.js.map