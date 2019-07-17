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
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var util_2 = require("../util");
var concat_util_1 = require("./concat_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Concatenates a list of`tf.Tensor1D`s along an axis. See `concat` for details.
 *
 * For example, if:
 * A: shape(3) = |r1, g1, b1|
 * B: shape(2) = |r2, g2|
 * C = tf.concat1d([A, B]) == |r1, g1, b1, r2, g2|
 *
 * @param tensors A list of`tf.Tensor`s to concatenate.
 * @return The concatenated array.
 */
function concat1d_(tensors) {
    return exports.concat(tensors, 0 /* axis */);
}
/**
 * Concatenates a list of`tf.Tensor2D`s along an axis. See `concat` for details.
 *
 * For example, if:
 * A: shape(2, 3) = | r1, g1, b1 |
 *                  | r2, g2, b2 |
 *
 * B: shape(2, 3) = | r3, g3, b3 |
 *                  | r4, g4, b4 |
 *
 * C = tf.concat2d([A, B], axis)
 *
 * if axis = 0:
 * C: shape(4, 3) = | r1, g1, b1 |
 *                  | r2, g2, b2 |
 *                  | r3, g3, b3 |
 *                  | r4, g4, b4 |
 *
 * if axis = 1:
 * C = shape(2, 6) = | r1, g1, b1, r3, g3, b3 |
 *                   | r2, g2, b2, r4, g4, b4 |
 *
 *
 * @param tensors A list of `tf.Tensor`s to concatenate.
 * @param axis The axis to concatenate along.
 * @return The concatenated array.
 */
function concat2d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
/**
 * Concatenates a list of `tf.Tensor3D`s along an axis.
 * See `concat` for details.
 *
 * For example, if:
 * A: shape(2, 1, 3) = | r1, g1, b1 |
 *                     | r2, g2, b2 |
 *
 * B: shape(2, 1, 3) = | r3, g3, b3 |
 *                     | r4, g4, b4 |
 *
 * C = tf.concat3d([A, B], axis)
 *
 * if axis = 0:
 * C: shape(4, 1, 3) = | r1, g1, b1 |
 *                     | r2, g2, b2 |
 *                     | r3, g3, b3 |
 *                     | r4, g4, b4 |
 *
 * if axis = 1:
 * C: shape(2, 2, 3) = | r1, g1, b1, r3, g3, b3 |
 *                     | r2, g2, b2, r4, g4, b4 |
 *
 * if axis = 2:
 * C = shape(2, 1, 6) = | r1, g1, b1, r3, g3, b3 |
 *                      | r2, g2, b2, r4, g4, b4 |
 *
 * @param tensors A list of`tf.Tensor`s to concatenate.
 * @param axis The axis to concate along.
 * @return The concatenated array.
 */
function concat3d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
/**
 * Concatenates a list of `tf.Tensor4D`s along an axis.
 * See `concat` for details.
 *
 * @param tensors A list of `tf.Tensor`s to concatenate.
 * @param axis The axis to concate along.
 * @return The concatenated array.
 */
function concat4d_(tensors, axis) {
    return exports.concat(tensors, axis);
}
/**
 * Concatenates a list of `tf.Tensor`s along a given axis.
 *
 * The tensors ranks and types must match, and their sizes must match in all
 * dimensions except `axis`.
 *
 * Also available are stricter rank-specific methods that assert that
 * `tensors` are of the given rank:
 *   - `tf.concat1d`
 *   - `tf.concat2d`
 *   - `tf.concat3d`
 *   - `tf.concat4d`
 *
 * Except `tf.concat1d` (which does not have axis param), all methods have
 * same signature as this method.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * a.concat(b).print();  // or a.concat(b)
 * ```
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 * tf.concat([a, b, c]).print();
 * ```
 *
 * ```js
 * const a = tf.tensor2d([[1, 2], [10, 20]]);
 * const b = tf.tensor2d([[3, 4], [30, 40]]);
 * const axis = 1;
 * tf.concat([a, b], axis).print();
 * ```
 * @param tensors A list of tensors to concatenate.
 * @param axis The axis to concate along. Defaults to 0 (the first dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function concat_(tensors, axis) {
    if (axis === void 0) { axis = 0; }
    util_1.assert(tensors.length >= 1, function () { return 'Pass at least one tensor to concat'; });
    var $tensors = tensor_util_env_1.convertToTensorArray(tensors, 'tensors', 'concat');
    axis = util_2.parseAxisParam(axis, $tensors[0].shape)[0];
    var outShape = concat_util_1.computeOutShape($tensors.map(function (t) { return t.shape; }), axis);
    if (util_1.sizeFromShape(outShape) === 0) {
        return tensor_ops_1.tensor([], outShape);
    }
    // Keep only non-empty tensors (ignore tensors with 0 in their shape).
    $tensors = $tensors.filter(function (t) { return t.size > 0; });
    if ($tensors.length === 1) {
        return $tensors[0];
    }
    var shapes = $tensors.map(function (t) { return t.shape; });
    concat_util_1.assertParamsConsistent(shapes, axis);
    var der = function (dy) {
        var sizeSplits = shapes.map(function (s) { return s[axis]; });
        var derTensors = exports.split(dy, sizeSplits, axis);
        return derTensors.map(function (t) { return function () { return t; }; });
    };
    var inputs = $tensors;
    return engine_1.ENGINE.runKernel(function (backend) { return backend.concat($tensors, axis); }, inputs, der);
}
/**
 * Splits a `tf.Tensor` into sub tensors.
 *
 * If `numOrSizeSplits` is a number, splits `x` along dimension `axis`
 * into `numOrSizeSplits` smaller tensors.
 * Requires that `numOrSizeSplits` evenly divides `x.shape[axis]`.
 *
 * If `numOrSizeSplits` is a number array, splits `x` into
 * `numOrSizeSplits.length` pieces. The shape of the `i`-th piece has the
 * same size as `x` except along dimension `axis` where the size is
 * `numOrSizeSplits[i]`.
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8], [2, 4]);
 * const [a, b] = tf.split(x, 2, 1);
 * a.print();
 * b.print();
 *
 * const [c, d, e] = tf.split(x, [1, 2, 1], 1);
 * c.print();
 * d.print();
 * e.print();
 * ```
 *
 * @param x The input tensor to split.
 * @param numOrSizeSplits Either an integer indicating the number of
 * splits along the axis or an array of integers containing the sizes of
 * each output tensor along the axis. If a number then it must evenly divide
 * `x.shape[axis]`; otherwise the sum of sizes must match `x.shape[axis]`.
 * @param axis The dimension along which to split. Defaults to 0 (the first
 * dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function split_(x, numOrSizeSplits, axis) {
    if (axis === void 0) { axis = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'split');
    axis = util_2.parseAxisParam(axis, $x.shape)[0];
    var splitSizes;
    if (typeof (numOrSizeSplits) === 'number') {
        util_1.assert($x.shape[axis] % numOrSizeSplits === 0, function () { return 'Number of splits must evenly divide the axis.'; });
        splitSizes =
            new Array(numOrSizeSplits).fill($x.shape[axis] / numOrSizeSplits);
    }
    else {
        util_1.assert($x.shape[axis] === numOrSizeSplits.reduce(function (a, b) { return a + b; }), function () { return 'The sum of sizes must match the size of the axis dimension.'; });
        splitSizes = numOrSizeSplits;
    }
    var der = function (dy) { return ({ $x: function () { return exports.concat(dy, axis); } }); };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.split($x, splitSizes, axis); }, { $x: $x }, der);
}
exports.concat = operation_1.op({ concat_: concat_ });
exports.concat1d = operation_1.op({ concat1d_: concat1d_ });
exports.concat2d = operation_1.op({ concat2d_: concat2d_ });
exports.concat3d = operation_1.op({ concat3d_: concat3d_ });
exports.concat4d = operation_1.op({ concat4d_: concat4d_ });
exports.split = operation_1.op({ split_: split_ });
//# sourceMappingURL=concat_split.js.map