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
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var binary_ops_1 = require("./binary_ops");
var broadcast_util_1 = require("./broadcast_util");
var logical_ops_1 = require("./logical_ops");
var operation_1 = require("./operation");
var selu_util_1 = require("./selu_util");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Computes rectified linear element-wise: `max(x, 0)`.
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.relu().print();  // or tf.relu(x)
 * ```
 * @param x The input tensor. If the dtype is `bool`, the output dtype will be
 *     `int32'.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function relu_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'relu');
    if ($x.dtype === 'bool') {
        return $x.toInt();
    }
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mulStrict($x.step().toFloat()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.relu($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes exponential linear element-wise: `x > 0 ? e ^ x - 1 : 0`.
 *
 * ```js
 * const x = tf.tensor1d([-1, 1, -3, 2]);
 *
 * x.elu().print();  // or tf.elu(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function elu_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'elu');
    var grad = function (dy, saved) {
        var y = saved[0];
        return {
            $x: function () { return engine_1.ENGINE.runKernel(function (backend) { return backend.eluDer(dy, y); }, { dy: dy, y: y }); }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.elu($x);
        save([y]);
        return y;
    }, { $x: $x }, grad);
}
/**
 * Computes scaled exponential linear element-wise.
 *
 * `x < 0 ? scale * alpha * (exp(x) - 1) : x`
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.selu().print();  // or tf.selu(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function selu_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'selu');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () {
                var mask = $x.greater(tensor_ops_1.scalar(0));
                var scaleAlpha = tensor_ops_1.scalar(selu_util_1.SELU_SCALEALPHA);
                var scale = tensor_ops_1.scalar(selu_util_1.SELU_SCALE);
                var greaterThanZeroDer = dy.mul(scale);
                var lessEqualZeroDer = dy.mul(scaleAlpha).mul($x.toFloat().exp());
                return logical_ops_1.where(mask, greaterThanZeroDer, lessEqualZeroDer);
            }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.selu($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes leaky rectified linear element-wise.
 *
 * See
 * [http://web.stanford.edu/~awni/papers/relu_hybrid_icml2013_final.pdf](
 *     http://web.stanford.edu/~awni/papers/relu_hybrid_icml2013_final.pdf)
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.leakyRelu(0.1).print();  // or tf.leakyRelu(x, 0.1)
 * ```
 * @param x The input tensor.
 * @param alpha The scaling factor for negative values, defaults to 0.2.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function leakyRelu_(x, alpha) {
    if (alpha === void 0) { alpha = 0.2; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'leakyRelu');
    return binary_ops_1.maximum(tensor_ops_1.scalar(alpha).mul($x), $x);
}
/**
 * Computes leaky rectified linear element-wise with parametric alphas.
 *
 * `x < 0 ? alpha * x : f(x) = x`
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 * const alpha = tf.scalar(0.1);
 *
 * x.prelu(alpha).print();  // or tf.prelu(x, alpha)
 * ```
 * @param x The input tensor.
 * @param alpha Scaling factor for negative values.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function prelu_(x, alpha) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'prelu');
    var $alpha = tensor_util_env_1.convertToTensor(alpha, 'alpha', 'prelu');
    var grad = function (dy, saved) {
        var $x = saved[0], $alpha = saved[1];
        var mask = $x.greater(0);
        return {
            $x: function () { return logical_ops_1.where(mask, dy, dy.mul($alpha)); },
            $alpha: function () {
                var res = logical_ops_1.where(mask, tensor_ops_1.zerosLike(dy), dy.mul($x));
                var reduceAxes = broadcast_util_1.getReductionAxes($alpha.shape, dy.shape);
                if (reduceAxes.length > 0) {
                    res = res.sum(reduceAxes);
                }
                return res.reshape($alpha.shape);
            }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.prelu($x, $alpha);
        save([$x, $alpha]);
        return res;
    }, { $x: $x, $alpha: $alpha }, grad);
}
exports.elu = operation_1.op({ elu_: elu_ });
exports.leakyRelu = operation_1.op({ leakyRelu_: leakyRelu_ });
exports.prelu = operation_1.op({ prelu_: prelu_ });
exports.relu = operation_1.op({ relu_: relu_ });
exports.selu = operation_1.op({ selu_: selu_ });
//# sourceMappingURL=relu_ops.js.map