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
var tensor_util_1 = require("../tensor_util");
var tensor_util_env_1 = require("../tensor_util_env");
var types_1 = require("../types");
var util = require("../util");
var broadcast_util = require("./broadcast_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
var unary_ops_1 = require("./unary_ops");
/**
 * Adds two `tf.Tensor`s element-wise, A + B. Supports broadcasting.
 *
 * We also expose `tf.addStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 *
 * ```js
 * // Broadcast add a with b.
 * const a = tf.scalar(5);
 * const b = tf.tensor1d([10, 20, 30, 40]);
 *
 * a.add(b).print();  // or tf.add(a, b)
 * ```
 * @param a The first `tf.Tensor` to add.
 * @param b The second `tf.Tensor` to add. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function add_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'add');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'add');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy) {
        var derA = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($a.shape);
        };
        var derB = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($b.shape);
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.add($a, $b); }, { $a: $a, $b: $b }, der);
}
/**
 * Adds a list of `tf.Tensor`s element-wise, each with the same shape and dtype.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 *
 * tf.addN([a, b, c]).print();
 * ```
 * @param tensors A list of tensors with the same shape and dtype.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function addN_(tensors) {
    util.assert(Array.isArray(tensors), function () { return 'The argument passed to tf.addN() must be a list of tensors'; });
    util.assert(tensors.length >= 1, function () { return "Must pass at least one tensor to tf.addN(), but got " +
        ("" + tensors.length); });
    var $tensors = tensors.map(function (t, i) { return tensor_util_env_1.convertToTensor(t, "tensors" + i, 'addN'); });
    var firstTensor = $tensors[0];
    $tensors.forEach(function (t) {
        if (t.dtype !== firstTensor.dtype) {
            throw new Error('All tensors passed to tf.addN() must have the same dtype');
        }
    });
    $tensors.forEach(function (t) {
        if (!util.arraysEqual(t.shape, firstTensor.shape)) {
            throw new Error('All tensors passed to tf.addN() must have the same shape');
        }
    });
    var der = function (dy) {
        var ders = {};
        $tensors.forEach(function (t, i) {
            ders[i] = function () { return dy.clone(); };
        });
        return ders;
    };
    var inputs = $tensors;
    return engine_1.ENGINE.runKernel(function (backend) { return backend.addN($tensors); }, inputs, der);
}
/**
 * Adds two `tf.Tensor`s element-wise, A + B.
 *
 * Inputs must be the same shape. For broadcasting support, use add() instead.
 *
 * @param a The first Tensor to add element-wise.
 * @param b The second Tensor to add element-wise.
 */
function addStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'addStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'addStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in addStrict: ');
    return $a.add($b);
}
/**
 * Subtracts two `tf.Tensor`s element-wise, A - B. Supports broadcasting.
 *
 * We also expose `tf.subStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([10, 20, 30, 40]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.sub(b).print();  // or tf.sub(a, b)
 * ```
 *
 * ```js
 * // Broadcast subtract a with b.
 * const a = tf.tensor1d([10, 20, 30, 40]);
 * const b = tf.scalar(5);
 *
 * a.sub(b).print();  // or tf.sub(a, b)
 * ```
 * @param a The first `tf.Tensor` to subtract from.
 * @param b The second `tf.Tensor` to be subtracted. Must have the same dtype as
 * `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function sub_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'sub');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'sub');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy) {
        var derA = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($a.shape);
        };
        var derB = function () {
            var res = dy;
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.neg().reshape($b.shape);
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.subtract($a, $b); }, { $a: $a, $b: $b }, der);
}
/**
 * Subtracts two `tf.Tensor`s element-wise, A - B. Inputs must
 * be the same shape.
 *
 * For broadcasting support, use `tf.sub` instead.
 *
 * @param a The first Tensor to subtract element-wise.
 * @param b The second Tensor to subtract element-wise.
 */
function subStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'subStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'subStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in subStrict: ');
    return $a.sub($b);
}
/**
 * Computes the power of one `tf.Tensor` to another. Supports broadcasting.
 *
 * Given a `tf.Tensor` x and a `tf.Tensor` y, this operation computes x^y for
 * corresponding elements in x and y. The result's dtype will be the upcasted
 * type of the `base` and `exp` dtypes.
 *
 * ```js
 * const a = tf.tensor([[2, 3], [4, 5]])
 * const b = tf.tensor([[1, 2], [3, 0]]).toInt();
 *
 * a.pow(b).print();  // or tf.pow(a, b)
 * ```
 *
 * ```js
 * const a = tf.tensor([[1, 2], [3, 4]])
 * const b = tf.tensor(2).toInt();
 *
 * a.pow(b).print();  // or tf.pow(a, b)
 * ```
 * We also expose `powStrict` which has the same signature as this op and
 * asserts that `base` and `exp` are the same shape (does not broadcast).
 *
 * @param base The base `tf.Tensor` to pow element-wise.
 * @param exp The exponent `tf.Tensor` to pow element-wise.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function pow_(base, exp) {
    var $base = tensor_util_env_1.convertToTensor(base, 'base', 'pow');
    var $exp = tensor_util_env_1.convertToTensor(exp, 'exp', 'pow');
    var outShape = broadcast_util.assertAndGetBroadcastShape($base.shape, $exp.shape);
    base = $base.cast(types_1.upcastType($base.dtype, $exp.dtype));
    exp = $exp.cast(types_1.upcastType($base.dtype, $exp.dtype));
    var grad = function (dy, saved) {
        var $base = saved[0], $exp = saved[1], y = saved[2];
        var derBase = function () {
            var expFloat = $exp.toFloat();
            var res = dy.mul(expFloat.mul($base.pow(expFloat.sub(tensor_ops_1.scalar(1)))));
            var reduceAxes = broadcast_util.getReductionAxes($base.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($base.shape);
        };
        var derExp = function () {
            var condition = $base.greater(0);
            var logBase = $base.log().where(condition, tensor_ops_1.zerosLike($base));
            var res = dy.mul(y.mul(logBase));
            var reduceAxes = broadcast_util.getReductionAxes($exp.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($exp.shape);
        };
        return { $base: derBase, $exp: derExp };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.pow($base, $exp);
        save([$base, $exp, y]);
        return y;
    }, { $base: $base, $exp: $exp }, grad);
}
/**
 * Computes the power of one `tf.Tensor` to another. Inputs must
 * be the same shape.
 *
 * For broadcasting support, use `tf.pow` instead.
 *
 * @param base The base tensor to pow element-wise.
 * @param exp The exponent tensor to pow element-wise.
 */
function powStrict_(base, exp) {
    util.assertShapesMatch(base.shape, exp.shape, 'Error in powStrict: ');
    return base.pow(exp);
}
/**
 * Multiplies two `tf.Tensor`s element-wise, A * B. Supports broadcasting.
 *
 * We also expose `tf.mulStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.tensor1d([2, 3, 4, 5]);
 *
 * a.mul(b).print();  // or tf.mul(a, b)
 * ```
 *
 * ```js
 * // Broadcast mul a with b.
 * const a = tf.tensor1d([1, 2, 3, 4]);
 * const b = tf.scalar(5);
 *
 * a.mul(b).print();  // or tf.mul(a, b)
 * ```
 * @param a The first tensor to multiply.
 * @param b The second tensor to multiply. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function mul_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'mul');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'mul');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () {
            var res = dy.mul($b.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                return res.sum(reduceAxes).reshape($a.shape);
            }
            return res;
        };
        var derB = function () {
            var res = dy.mul($a.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                return res.sum(reduceAxes).reshape($b.shape);
            }
            return res;
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.multiply($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Multiplies two `tf.Tensor`s element-wise, A * B.
 *
 * Inputs must be the same shape. For broadcasting support, use `tf.mul`.
 *
 * @param a The first tensor to multiply.
 * @param b The first tensor to multiply. Must have the same
 *    dtype as `a`.
 */
function mulStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'mul');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'mul');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in multiplyStrict: ');
    return $a.mul($b);
}
/**
 * Divides two `tf.Tensor`s element-wise, A / B. Supports broadcasting.
 *
 * We also expose `tf.divStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 9, 16]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * ```js
 * // Broadcast div a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(2);
 *
 * a.div(b).print();  // or tf.div(a, b)
 * ```
 *
 * @param a The first tensor as the numerator.
 * @param b The second tensor as the denominator. Must have the same dtype as
 * `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function div_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'div');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'div');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    if ($a.dtype === 'int32' && $b.dtype === 'int32') {
        return exports.floorDiv($a, $b);
    }
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () {
            var res = dy.div($b.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                return res.sum(reduceAxes).reshape($a.shape);
            }
            return res;
        };
        var derB = function () {
            var res = dy.mul($a.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes).reshape($b.shape);
            }
            var tmp = $b.square();
            return res.div(tmp.toFloat()).neg();
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.realDivide($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Divides two `tf.Tensor`s element-wise, A / B. Supports broadcasting.
 * The result is rounded with floor function.
 *
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 9, 16]);
 * const b = tf.tensor1d([1, 2, 3, 4]);
 *
 * a.floorDiv(b).print();  // or tf.div(a, b)
 * ```
 *
 * ```js
 * // Broadcast div a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(2);
 *
 * a.floorDiv(b).print();  // or tf.floorDiv(a, b)
 * ```
 *
 * @param a The first tensor as the numerator.
 * @param b The second tensor as the denominator. Must have the same dtype as
 * `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function floorDiv_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'floorDiv');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'floorDiv');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () {
            var res = dy.div($b.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                return res.sum(reduceAxes).reshape($a.shape);
            }
            return res;
        };
        var derB = function () {
            var res = dy.mul($a.toFloat());
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes).reshape($b.shape);
            }
            var tmp = $b.square();
            return res.div(tmp.toFloat()).neg();
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.floorDiv($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Divides two `tf.Tensor`s element-wise, A / B. Inputs must
 * be the same shape.
 *
 * @param a The first tensor as the numerator for element-wise division.
 * @param b The second tensor as the denominator for element-wise division.
 */
function divStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'div');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'div');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in divideStrict: ');
    return $a.div($b);
}
/**
 * Returns the mod of a and b element-wise.
 * `floor(x / y) * y + mod(x, y) = x`
 * Supports broadcasting.
 *
 * We also expose `tf.modStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 3, 16]);
 * const b = tf.tensor1d([1, 2, 9, 4]);
 *
 * a.mod(b).print();  // or tf.mod(a, b)
 * ```
 *
 * ```js
 * // Broadcast a mod b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(5);
 *
 * a.mod(b).print();  // or tf.mod(a, b)
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function mod_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'mod');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'mod');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () {
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                return dy.sum(reduceAxes).reshape($a.shape);
            }
            return dy;
        };
        var derB = function () {
            var res = dy.mul($a.div($b).floor().neg());
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                return res.sum(reduceAxes).reshape($b.shape);
            }
            return res;
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.mod($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Returns the mod of a and b (`a < b ? a : b`) element-wise. Inputs must
 * be the same shape. For broadcasting support, use mod().
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same dtype as `a`.
 */
function modStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'modStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'modStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in modStrict: ');
    return $a.mod($b);
}
/**
 * Returns the min of a and b (`a < b ? a : b`) element-wise.
 * Supports broadcasting.
 *
 * We also expose `minimumStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 3, 16]);
 * const b = tf.tensor1d([1, 2, 9, 4]);
 *
 * a.minimum(b).print();  // or tf.minimum(a, b)
 * ```
 *
 * ```js
 * // Broadcast minimum a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(5);
 *
 * a.minimum(b).print();  // or tf.minimum(a, b)
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function minimum_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'minimum');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'minimum');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    if ($a.dtype === 'bool') {
        $a = $a.toInt();
        $b = $b.toInt();
    }
    broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () { return dy.mul($a.lessEqual($b).toFloat()); };
        var derB = function () { return dy.mul($a.greater($b).toFloat()); };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.minimum($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Returns the min of a and b (`a < b ? a : b`) element-wise. Inputs must
 * be the same shape. For broadcasting support, use minimum().
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same dtype as `a`.
 */
function minimumStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'minimumStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'minimumStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in minimumStrict: ');
    return $a.minimum($b);
}
/**
 * Returns the max of a and b (`a > b ? a : b`) element-wise.
 * Supports broadcasting.
 *
 * We also expose `tf.maximumStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 3, 16]);
 * const b = tf.tensor1d([1, 2, 9, 4]);
 *
 * a.maximum(b).print();  // or tf.maximum(a, b)
 * ```
 *
 * ```js
 * // Broadcast maximum a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(5);
 *
 * a.maximum(b).print();  // or tf.maximum(a, b)
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function maximum_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'maximum');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'maximum');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    if ($a.dtype === 'bool') {
        $a = $a.toInt();
        $b = $b.toInt();
    }
    broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () { return dy.mul($a.greaterEqual($b).toFloat()); };
        var derB = function () { return dy.mul($a.less($b).toFloat()); };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.maximum($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Returns the max of a and b (`a > b ? a : b`) element-wise. Inputs must
 * be the same shape. For broadcasting support, use maximum().
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same dtype as `a`.
 */
function maximumStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'maximumStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'maximumStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in maximumStrict: ');
    return $a.maximum($b);
}
/**
 * Returns (a - b) * (a - b) element-wise.
 * Supports broadcasting.
 *
 * We also expose `tf.squaredDifferenceStrict` which has the same signature as
 * this op and asserts that `a` and `b` are the same shape (does not
 * broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 4, 3, 16]);
 * const b = tf.tensor1d([1, 2, 9, 4]);
 *
 * a.squaredDifference(b).print();  // or tf.squaredDifference(a, b)
 * ```
 *
 * ```js
 * // Broadcast squared difference  a with b.
 * const a = tf.tensor1d([2, 4, 6, 8]);
 * const b = tf.scalar(5);
 *
 * a.squaredDifference(b).print();  // or tf.squaredDifference(a, b)
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Arithmetic'} */
function squaredDifference_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'squaredDifference');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'squaredDifference');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var two = tensor_ops_1.scalar(2);
        var derA = function () { return dy.mul($a.sub($b).mul(two)); };
        var derB = function () { return dy.mul($b.sub($a).mul(two)); };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.squaredDifference($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
/**
 * Returns (a - b) * (a - b) element-wise.
 *
 * Inputs must be the same shape. For broadcasting support, use
 * `tf.squaredDifference` instead.
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same type as `a`.
 */
function squaredDifferenceStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'squaredDifferenceStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'squaredDifferenceStrict');
    util.assertShapesMatch($a.shape, $b.shape, 'Error in squaredDifferenceStrict: ');
    return $a.squaredDifference($b);
}
/**
 * Computes arctangent of `tf.Tensor`s a / b element-wise: `atan2(a, b)`.
 * Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([1.0, 1.0, -1.0, .7]);
 * const b = tf.tensor1d([2.0, 13.0, 3.5, .21]);
 *
 * tf.atan2(a, b).print()
 * ```
 *
 * @param a The first tensor.
 * @param b The second tensor. Must have the same dtype as `a`.
 *
 */
/** @doc {heading: 'Operations', subheading: 'Basic math'} */
function atan2_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'atan2');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'atan2');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    var outShape = broadcast_util.assertAndGetBroadcastShape($a.shape, $b.shape);
    var der = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        var derA = function () {
            var d = exports.add($a.square(), $b.square());
            var res = dy.mul($b.div(d));
            var reduceAxes = broadcast_util.getReductionAxes($a.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($a.shape);
        };
        var derB = function () {
            var d = exports.add($a.square(), $b.square());
            var res = unary_ops_1.neg(dy.mul($a.div(d)));
            var reduceAxes = broadcast_util.getReductionAxes($b.shape, outShape);
            if (reduceAxes.length > 0) {
                res = res.sum(reduceAxes);
            }
            return res.reshape($b.shape);
        };
        return { $a: derA, $b: derB };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.atan2($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, der);
}
exports.add = operation_1.op({ add_: add_ });
exports.addN = operation_1.op({ addN_: addN_ });
exports.addStrict = operation_1.op({ addStrict_: addStrict_ });
exports.atan2 = operation_1.op({ atan2_: atan2_ });
exports.div = operation_1.op({ div_: div_ });
exports.divStrict = operation_1.op({ divStrict_: divStrict_ });
exports.floorDiv = operation_1.op({ floorDiv_: floorDiv_ });
exports.maximum = operation_1.op({ maximum_: maximum_ });
exports.maximumStrict = operation_1.op({ maximumStrict_: maximumStrict_ });
exports.minimum = operation_1.op({ minimum_: minimum_ });
exports.minimumStrict = operation_1.op({ minimumStrict_: minimumStrict_ });
exports.mod = operation_1.op({ mod_: mod_ });
exports.modStrict = operation_1.op({ modStrict_: modStrict_ });
exports.mul = operation_1.op({ mul_: mul_ });
exports.mulStrict = operation_1.op({ mulStrict_: mulStrict_ });
exports.pow = operation_1.op({ pow_: pow_ });
exports.powStrict = operation_1.op({ powStrict_: powStrict_ });
exports.squaredDifference = operation_1.op({ squaredDifference_: squaredDifference_ });
exports.squaredDifferenceStrict = operation_1.op({ squaredDifferenceStrict_: squaredDifferenceStrict_ });
exports.sub = operation_1.op({ sub_: sub_ });
exports.subStrict = operation_1.op({ subStrict_: subStrict_ });
//# sourceMappingURL=binary_ops.js.map