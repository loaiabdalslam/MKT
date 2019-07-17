"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_ops_1 = require("../ops/tensor_ops");
var tensor_1 = require("../tensor");
var util_1 = require("../util");
// Utilities needed by backend consumers of tf-core.
__export(require("../ops/axis_util"));
__export(require("../ops/broadcast_util"));
__export(require("../ops/concat_util"));
__export(require("../ops/conv_util"));
var types_1 = require("../types");
exports.upcastType = types_1.upcastType;
function castTensor(x, dtype, backend) {
    if (dtype === 'complex64') {
        if (x.dtype === 'complex64') {
            return x.clone();
        }
        var zerosTensor = tensor_ops_1.zeros(x.shape);
        var floatX = x.toFloat();
        var result = backend.complex(floatX, zerosTensor);
        zerosTensor.dispose();
        floatX.dispose();
        return result;
    }
    if (!util_1.hasEncodingLoss(x.dtype, dtype)) {
        // We don't change the underlying data, since we cast to higher
        // precision.
        return tensor_1.Tensor.make(x.shape, { dataId: x.dataId }, dtype);
    }
    if (x.dtype === 'complex64') {
        var real = backend.real(x);
        var result = real.cast(dtype);
        real.dispose();
        return result;
    }
    if (dtype === 'int32') {
        return backend.int(x);
    }
    else if (dtype === 'bool') {
        var zero = tensor_ops_1.scalar(0, x.dtype);
        var result = backend.notEqual(x, zero);
        zero.dispose();
        return result;
    }
    else {
        throw new Error("Error in Cast: failed to cast " + x.dtype + " to " + dtype);
    }
}
exports.castTensor = castTensor;
function reshapeTensor(x, shape) {
    return tensor_1.Tensor.make(shape, { dataId: x.dataId }, x.dtype);
}
exports.reshapeTensor = reshapeTensor;
function linspaceImpl(start, stop, num) {
    var step = (stop - start) / (num - 1);
    var values = util_1.makeZerosTypedArray(num, 'float32');
    values[0] = start;
    for (var i = 1; i < values.length; i++) {
        values[i] = values[i - 1] + step;
    }
    return tensor_ops_1.tensor1d(values, 'float32');
}
exports.linspaceImpl = linspaceImpl;
//# sourceMappingURL=backend_util.js.map