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
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Reverses a `tf.Tensor1D`.
 *
 * @param x The input tensor.
 */
function reverse1d_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reverse');
    util.assert($x.rank === 1, function () { return "Error in reverse1D: x must be rank 1 but got rank " + $x.rank + "."; });
    return exports.reverse($x, 0);
}
/**
 * Reverses a `tf.Tensor2D` along a specified axis.
 *
 * @param x The input tensor.
 * @param axis The set of dimensions to reverse. Must be in the
 *     range [-rank(x), rank(x)). Defaults to all axes.
 */
function reverse2d_(x, axis) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reverse');
    util.assert($x.rank === 2, function () { return "Error in reverse2D: x must be rank 2 but got rank " + $x.rank + "."; });
    return exports.reverse($x, axis);
}
/**
 * Reverses a `tf.Tensor3D` along a specified axis.
 *
 * @param x The input tensor.
 * @param axis The set of dimensions to reverse. Must be in the
 *     range [-rank(x), rank(x)). Defaults to all axes.
 */
function reverse3d_(x, axis) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reverse');
    util.assert($x.rank === 3, function () { return "Error in reverse3D: x must be rank 3 but got rank " + $x.rank + "."; });
    return exports.reverse($x, axis);
}
/**
 * Reverses a `tf.Tensor4D` along a specified axis.
 *
 * @param x The input tensor.
 * @param axis The set of dimensions to reverse. Must be in the
 *     range [-rank(x), rank(x)). Defaults to all axes.
 */
function reverse4d_(x, axis) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reverse');
    util.assert($x.rank === 4, function () { return "Error in reverse4D: x must be rank 4 but got rank " + $x.rank + "."; });
    return exports.reverse($x, axis);
}
/**
 * Reverses a `tf.Tensor` along a specified axis.
 *
 * Also available are stricter rank-specific methods that assert that `x` is
 * of the given rank:
 *   - `tf.reverse1d`
 *   - `tf.reverse2d`
 *   - `tf.reverse3d`
 *   - `tf.reverse4d`
 *
 * Except `tf.reverse1d` (which does not have axis param), all methods have
 * same signature as this method.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 *
 * x.reverse().print();
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.reverse(axis).print();
 * ```
 * @param x The input tensor to be reversed.
 * @param axis The set of dimensions to reverse. Must be in the
 *     range [-rank(x), rank(x)). Defaults to all axes.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function reverse_(x, axis) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reverse');
    if ($x.rank === 0) {
        return $x.clone();
    }
    var axes = util.parseAxisParam(axis, $x.shape);
    var grad = function (dy) {
        return { $x: function () { return dy.reverse(axes); } };
    };
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.reverse($x, axes); }, { $x: $x }, grad);
    return res.reshapeAs($x);
}
exports.reverse = operation_1.op({ reverse_: reverse_ });
exports.reverse1d = operation_1.op({ reverse1d_: reverse1d_ });
exports.reverse2d = operation_1.op({ reverse2d_: reverse2d_ });
exports.reverse3d = operation_1.op({ reverse3d_: reverse3d_ });
exports.reverse4d = operation_1.op({ reverse4d_: reverse4d_ });
//# sourceMappingURL=reverse.js.map