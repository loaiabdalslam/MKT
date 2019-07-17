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
var util_1 = require("../util");
var broadcast_util_1 = require("./broadcast_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Returns the truth value of (a != b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.notEqualStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([0, 2, 3]);
 *
 * a.notEqual(b).print();
 * ```
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function notEqual_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'notEqual');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'notEqual');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.notEqual($a, $b); }, { $a: $a, $b: $b });
}
/**
 * Strict version of `tf.notEqual` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
function notEqualStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'notEqualStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'notEqualStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in notEqualStrict: ');
    return $a.notEqual($b);
}
/**
 * Returns the truth value of (a < b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.lessStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.less(b).print();
 * ```
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function less_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'less');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'less');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.less($a, $b); }, { $a: $a, $b: $b });
}
/**
 * Strict version of `tf.less` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
function lessStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'lessStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'lessStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in lessStrict: ');
    return $a.less($b);
}
/**
 * Returns the truth value of (a == b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.equalStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.equal(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function equal_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'equal');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'equal');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.equal($a, $b); }, { $a: $a, $b: $b });
}
function equalStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'equalStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'equalStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in equalStrict: ');
    return $a.equal($b);
}
/**
 * Returns the truth value of (a <= b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.lessEqualStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.lessEqual(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function lessEqual_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'lessEqual');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'lessEqual');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.lessEqual($a, $b); }, { $a: $a, $b: $b });
}
function lessEqualStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'lessEqualStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'lessEqualStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in lessEqualStrict: ');
    return $a.lessEqual($b);
}
/**
 * Returns the truth value of (a > b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.greaterStrict` which has the same signature as this
 * op and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.greater(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function greater_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'greater');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'greater');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.greater($a, $b); }, { $a: $a, $b: $b });
}
function greaterStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'greaterStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'greaterStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in greaterStrict: ');
    return $a.greater($b);
}
/**
 * Returns the truth value of (a >= b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.greaterEqualStrict` which has the same signature as this
 * op and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.greaterEqual(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function greaterEqual_(a, b) {
    var _a;
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'greaterEqual');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'greaterEqual');
    _a = tensor_util_1.makeTypesMatch($a, $b), $a = _a[0], $b = _a[1];
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    var grad = function (dy, saved) {
        var $a = saved[0], $b = saved[1];
        return { $a: function () { return tensor_ops_1.zerosLike($a); }, $b: function () { return tensor_ops_1.zerosLike($b); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.greaterEqual($a, $b);
        save([$a, $b]);
        return res;
    }, { $a: $a, $b: $b }, grad);
}
function greaterEqualStrict_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'greaterEqualStrict');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'greaterEqualStrict');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in greaterEqualStrict: ');
    return $a.greaterEqual($b);
}
exports.equal = operation_1.op({ equal_: equal_ });
exports.equalStrict = operation_1.op({ equalStrict_: equalStrict_ });
exports.greater = operation_1.op({ greater_: greater_ });
exports.greaterEqual = operation_1.op({ greaterEqual_: greaterEqual_ });
exports.greaterEqualStrict = operation_1.op({ greaterEqualStrict_: greaterEqualStrict_ });
exports.greaterStrict = operation_1.op({ greaterStrict_: greaterStrict_ });
exports.less = operation_1.op({ less_: less_ });
exports.lessEqual = operation_1.op({ lessEqual_: lessEqual_ });
exports.lessEqualStrict = operation_1.op({ lessEqualStrict_: lessEqualStrict_ });
exports.lessStrict = operation_1.op({ lessStrict_: lessStrict_ });
exports.notEqual = operation_1.op({ notEqual_: notEqual_ });
exports.notEqualStrict = operation_1.op({ notEqualStrict_: notEqualStrict_ });
//# sourceMappingURL=compare.js.map