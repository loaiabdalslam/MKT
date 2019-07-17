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
var tensor_ops_1 = require("./tensor_ops");
/**
 * Computes `-1 * x` element-wise.
 *
 * ```js
 * const x = tf.tensor2d([1, 2, -2, 0], [2, 2]);
 *
 * x.neg().print();  // or tf.neg(x)
 * ```
 *
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function neg_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'neg');
    var grad = function (dy) {
        return { $x: function () { return dy.neg(); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.neg($x); }, { $x: $x }, grad);
}
/**
 * Computes ceiling of input `tf.Tensor` element-wise: `ceil(x)`
 *
 * ```js
 * const x = tf.tensor1d([.6, 1.1, -3.3]);
 *
 * x.ceil().print();  // or tf.ceil(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function ceil_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'ceil');
    // TODO(manrajgrover): Return null for gradients when backprop supports it.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.ceil($x); }, { $x: $x }, grad);
}
/**
 * Computes floor of input `tf.Tensor` element-wise: `floor(x)`.
 *
 * ```js
 * const x = tf.tensor1d([.6, 1.1, -3.3]);
 *
 * x.floor().print();  // or tf.floor(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function floor_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'floor');
    // TODO(nsthorat): Let gradients be null for cases where we want to stop
    // backpropgation.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.floor($x); }, { $x: $x }, grad);
}
/**
 * Returns an element-wise indication of the sign of a number.
 *
 * ```js
 * const x = tf.tensor1d([.6, 1.1, -3.3, NaN, 0]);
 *
 * x.sign().print();  // or tf.sign(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function sign_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sign');
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.sign($x); }, { $x: $x }, grad);
}
/**
 * RReturns which elements of x are NaN.
 *
 * ```js
 * const x = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
 *
 * x.isNaN().print();  // or tf.isNaN(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function isNaN_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'isNaN');
    // TODO(nsthorat): Let gradients be null for cases where we want to stop
    // backpropgation.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.isNaN($x); }, { $x: $x }, grad);
}
/**
 * Returns which elements of x are Infinity or -Infinity.
 *
 * ```js
 * const x = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
 *
 * x.isInf().print();  // or tf.isNaN(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function isInf_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'isInf');
    // TODO(nsthorat): Let gradients be null for cases where we want to stop
    // backpropgation.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.isInf($x); }, { $x: $x }, grad);
}
/**
 * Returns which elements of x are finite.
 *
 * ```js
 * const x = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
 *
 * x.isFinite().print();  // or tf.isNaN(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function isFinite_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'isFinite');
    // TODO(nsthorat): Let gradients be null for cases where we want to stop
    // backpropgation.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.isFinite($x); }, { $x: $x }, grad);
}
/**
 * Computes round of input `tf.Tensor` element-wise: `round(x)`.
 * It implements banker's rounding.
 *
 * ```js
 * const x = tf.tensor1d([.6, 1.1, -3.3]);
 *
 * x.round().print();  // or tf.round(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function round_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'round');
    // TODO(nsthorat): Let gradients be null for cases where we want to stop
    // backpropgation.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.round($x); }, { $x: $x }, grad);
}
/**
 * Computes exponential of the input `tf.Tensor` element-wise. `e ^ x`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, -3]);
 *
 * x.exp().print();  // or tf.exp(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function exp_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'exp');
    var bck = function (dy, saved) {
        return { $x: function () { return dy.mulStrict(saved[0]); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.exp($x);
        save([y]);
        return y;
    }, { $x: $x }, bck);
}
/**
 * Computes exponential of the input `tf.Tensor` minus one element-wise.
 * `e ^ x - 1`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, -3]);
 *
 * x.expm1().print();  // or tf.expm1(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function expm1_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'expm1');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mul($x.exp()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.expm1($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes natural logarithm of the input `tf.Tensor` element-wise: `ln(x)`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, Math.E]);
 *
 * x.log().print();  // or tf.log(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function log_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'log');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.toFloat()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.log($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes natural logarithm of the input `tf.Tensor` plus one
 * element-wise: `ln(1 + x)`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, Math.E - 1]);
 *
 * x.log1p().print();  // or tf.log1p(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function log1p_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'log1p');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.add(1)); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.log1p($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes square root of the input `tf.Tensor` element-wise: `y = sqrt(x)`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 4, -1]);
 *
 * x.sqrt().print();  // or tf.sqrt(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function sqrt_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sqrt');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.toFloat().sqrt().mul(2)); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.sqrt($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes reciprocal of square root of the input `tf.Tensor` element-wise:
 * `y = 1 / sqrt(x)`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 4, -1]);
 *
 * x.rsqrt().print();  // or tf.rsqrt(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function rsqrt_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'rsqrt');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.pow(1.5).mul(2)).neg(); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.rsqrt($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes square of `x` element-wise: `x ^ 2`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, Math.sqrt(2), -1]);
 *
 * x.square().print();  // or tf.square(x)
 * ```
 * @param x The input Tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function square_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'square');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mul($x.toFloat().mul(2)); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        save([$x]);
        return backend.square($x);
    }, { $x: $x }, grad);
}
/**
 * Computes reciprocal of x element-wise: `1 / x`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, 2]);
 *
 * x.reciprocal().print();  // or tf.reciprocal(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function reciprocal_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reciprocal');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.square().neg()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.reciprocal($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes absolute value element-wise: `abs(x)`
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.abs().print();  // or tf.abs(x)
 * ```
 * @param x The input `tf.Tensor`.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function abs_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'abs');
    if ($x.dtype === 'complex64') {
        return engine_1.ENGINE.runKernel(function (backend) { return backend.complexAbs($x); }, { $x: $x });
    }
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mul($x.toFloat().step(-1)); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.abs($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Clips values element-wise. `max(min(x, clipValueMax), clipValueMin)`
 *
 * ```js
 * const x = tf.tensor1d([-1, 2, -3, 4]);
 *
 * x.clipByValue(-2, 3).print();  // or tf.clipByValue(x, -2, 3)
 * ```
 * @param x The input tensor.
 * @param clipValueMin Lower-bound of range to be clipped to.
 * @param clipValueMax Upper-bound of range to be clipped to.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function clipByValue_(x, clipValueMin, clipValueMax) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'clipByValue');
    util.assert((clipValueMin <= clipValueMax), function () { return "Error in clip: min (" + clipValueMin + ") must be " +
        ("less than or equal to max (" + clipValueMax + ")."); });
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () { return dy.where($x.greaterEqual(clipValueMin)
                .logicalAnd($x.lessEqual(clipValueMax)), tensor_ops_1.zerosLike(dy)); },
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.clip($x, clipValueMin, clipValueMax);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes sigmoid element-wise, `1 / (1 + exp(-x))`
 *
 * ```js
 * const x = tf.tensor1d([0, -1, 2, -3]);
 *
 * x.sigmoid().print();  // or tf.sigmoid(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function sigmoid_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sigmoid');
    var grad = function (dy, saved) {
        var y = saved[0];
        return { $x: function () { return dy.mul(y.mul(tensor_ops_1.scalar(1).sub(y))); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.sigmoid($x);
        save([y]);
        return y;
    }, { $x: $x }, grad);
}
/**
 * Computes log sigmoid of the input `tf.Tensor` element-wise:
 * `logSigmoid(x)`. For numerical stability, we use `-tf.softplus(-x)`.
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.logSigmoid().print();  // or tf.logSigmoid(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function logSigmoid_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'logSigmoid');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mul($x.neg().sigmoid()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.softplus($x.neg()).neg();
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes softplus of the input `tf.Tensor` element-wise: `log(exp(x) + 1)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.softplus().print();  // or tf.softplus(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function softplus_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'softplus');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.mul($x.sigmoid()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.softplus($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes sin of the input Tensor element-wise: `sin(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, Math.PI / 2, Math.PI * 3 / 4]);
 *
 * x.sin().print();  // or tf.sin(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function sin_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sin');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return $x.toFloat().cos().mul(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.sin($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes cos of the input `tf.Tensor` element-wise: `cos(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, Math.PI / 2, Math.PI * 3 / 4]);
 *
 * x.cos().print();  // or tf.cos(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function cos_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'cos');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return $x.toFloat().sin().neg().mul(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.cos($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes tan of the input `tf.Tensor` element-wise, `tan(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, Math.PI / 2, Math.PI * 3 / 4]);
 *
 * x.tan().print();  // or tf.tan(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function tan_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'tan');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.cos().square()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.tan($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes asin of the input `tf.Tensor` element-wise: `asin(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.asin().print();  // or tf.asin(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function asin_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'asin');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () { return dy.divStrict(tensor_ops_1.scalar(1).sub($x.toFloat().square()).sqrt()); }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.asin($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes acos of the input `tf.Tensor` element-wise: `acos(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.acos().print();  // or tf.acos(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function acos_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'acos');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () {
                return dy.divStrict(tensor_ops_1.scalar(1).sub($x.toFloat().square()).sqrt()).neg();
            }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.acos($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes atan of the input `tf.Tensor` element-wise: `atan(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.atan().print();  // or tf.atan(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function atan_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'atan');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div($x.toFloat().square().add(1)); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.atan($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes hyperbolic sin of the input `tf.Tensor` element-wise: `sinh(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.sinh().print();  // or tf.sinh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function sinh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sinh');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return $x.toFloat().cosh().mulStrict(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.sinh($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes hyperbolic cos of the input `tf.Tensor` element-wise: `cosh(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.cosh().print();  // or tf.cosh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function cosh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'cosh');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return $x.toFloat().sinh().mulStrict(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.cosh($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes hyperbolic tangent of the input `tf.Tensor` element-wise: `tanh(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, 70]);
 *
 * x.tanh().print();  // or tf.tanh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function tanh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'tanh');
    var grad = function (dy, saved) {
        var y = saved[0];
        return { $x: function () { return tensor_ops_1.scalar(1).sub(y.square()).mulStrict(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.tanh($x);
        save([y]);
        return y;
    }, { $x: $x }, grad);
}
/**
 * Computes inverse hyperbolic sin of the input `tf.Tensor` element-wise:
 * `asinh(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, 1, -1, .7]);
 *
 * x.asinh().print();  // or tf.asinh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function asinh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'asinh');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () { return dy.divStrict(tensor_ops_1.scalar(1).add($x.toFloat().square()).sqrt()); }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.asinh($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes the inverse hyperbolic cos of the input `tf.Tensor` element-wise:
 * `acosh(x)`
 *
 * ```js
 * const x = tf.tensor1d([10, 1, 3, 5.7]);
 *
 * x.acosh().print();  // or tf.acosh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function acosh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'acosh');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.divStrict($x.toFloat().square().sub(1).sqrt()); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.acosh($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes inverse hyperbolic tan of the input `tf.Tensor` element-wise:
 * `atanh(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, .1, -.1, .7]);
 *
 * x.atanh().print();  // or tf.atanh(x)
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function atanh_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'atanh');
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return dy.div(tensor_ops_1.scalar(1).sub($x.toFloat().square())); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.atanh($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes gause error function of the input `tf.Tensor` element-wise:
 * `erf(x)`
 *
 * ```js
 * const x = tf.tensor1d([0, .1, -.1, .7]);
 *
 * x.erf().print(); // or tf.erf(x);
 * ```
 * @param x The input tensor.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function erf_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'erf');
    util.assert($x.dtype === 'int32' || $x.dtype === 'float32', function () { return 'Input dtype must be `int32` or `float32`.'; });
    if ($x.dtype === 'int32') {
        $x = $x.toFloat();
    }
    var grad = function (dy, saved) {
        var $x = saved[0];
        return {
            $x: function () { return dy.mul($x.square().neg().exp().mul(2 / Math.sqrt(Math.PI))); }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.erf($x);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes step of the input `tf.Tensor` element-wise: `x > 0 ? 1 : alpha * x`
 *
 * ```js
 * const x = tf.tensor1d([0, 2, -1, -3]);
 *
 * x.step(.5).print();  // or tf.step(x, .5)
 * ```
 * @param x The input tensor.
 * @param alpha The gradient when input is negative.
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function step_(x, alpha) {
    if (alpha === void 0) { alpha = 0.0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'step');
    // TODO(manrajgrover): Return null for gradients when backprop supports
    // it.
    var grad = function (dy) {
        return { $x: function () { return tensor_ops_1.zerosLike(dy); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.step($x, alpha); }, { $x: $x }, grad);
}
exports.abs = operation_1.op({ abs_: abs_ });
exports.acos = operation_1.op({ acos_: acos_ });
exports.acosh = operation_1.op({ acosh_: acosh_ });
exports.asin = operation_1.op({ asin_: asin_ });
exports.asinh = operation_1.op({ asinh_: asinh_ });
exports.atan = operation_1.op({ atan_: atan_ });
exports.atanh = operation_1.op({ atanh_: atanh_ });
exports.ceil = operation_1.op({ ceil_: ceil_ });
exports.clipByValue = operation_1.op({ clipByValue_: clipByValue_ });
exports.cos = operation_1.op({ cos_: cos_ });
exports.cosh = operation_1.op({ cosh_: cosh_ });
exports.erf = operation_1.op({ erf_: erf_ });
exports.exp = operation_1.op({ exp_: exp_ });
exports.expm1 = operation_1.op({ expm1_: expm1_ });
exports.floor = operation_1.op({ floor_: floor_ });
exports.log = operation_1.op({ log_: log_ });
exports.log1p = operation_1.op({ log1p_: log1p_ });
exports.logSigmoid = operation_1.op({ logSigmoid_: logSigmoid_ });
exports.neg = operation_1.op({ neg_: neg_ });
exports.reciprocal = operation_1.op({ reciprocal_: reciprocal_ });
exports.round = operation_1.op({ round_: round_ });
exports.rsqrt = operation_1.op({ rsqrt_: rsqrt_ });
exports.sigmoid = operation_1.op({ sigmoid_: sigmoid_ });
exports.sign = operation_1.op({ sign_: sign_ });
exports.isNaN = operation_1.op({ isNaN_: isNaN_ });
exports.isInf = operation_1.op({ isInf_: isInf_ });
exports.isFinite = operation_1.op({ isFinite_: isFinite_ });
exports.sin = operation_1.op({ sin_: sin_ });
exports.sinh = operation_1.op({ sinh_: sinh_ });
exports.softplus = operation_1.op({ softplus_: softplus_ });
exports.sqrt = operation_1.op({ sqrt_: sqrt_ });
exports.square = operation_1.op({ square_: square_ });
exports.step = operation_1.op({ step_: step_ });
exports.tan = operation_1.op({ tan_: tan_ });
exports.tanh = operation_1.op({ tanh_: tanh_ });
//# sourceMappingURL=unary_ops.js.map