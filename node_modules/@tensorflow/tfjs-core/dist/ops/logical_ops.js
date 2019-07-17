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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var where_impl_1 = require("../backends/where_impl");
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var broadcast_util_1 = require("./broadcast_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Returns the truth value of `NOT x` element-wise.
 *
 * ```js
 * const a = tf.tensor1d([false, true], 'bool');
 *
 * a.logicalNot().print();
 * ```
 *
 * @param x The input tensor. Must be of dtype 'bool'.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function logicalNot_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'logicalNot', 'bool');
    return engine_1.ENGINE.runKernel(function (backend) { return backend.logicalNot($x); }, { $x: $x });
}
/**
 * Returns the truth value of `a AND b` element-wise. Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([false, false, true, true], 'bool');
 * const b = tf.tensor1d([false, true, false, true], 'bool');
 *
 * a.logicalAnd(b).print();
 * ```
 *
 * @param a The first input tensor. Must be of dtype bool.
 * @param b The second input tensor. Must be of dtype bool.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function logicalAnd_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'logicalAnd', 'bool');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'logicalAnd', 'bool');
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.logicalAnd($a, $b); }, { $a: $a, $b: $b });
}
/**
 * Returns the truth value of `a OR b` element-wise. Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([false, false, true, true], 'bool');
 * const b = tf.tensor1d([false, true, false, true], 'bool');
 *
 * a.logicalOr(b).print();
 * ```
 * @param a The first input tensor. Must be of dtype bool.
 * @param b The second input tensor. Must be of dtype bool.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function logicalOr_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'logicalOr', 'bool');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'logicalOr', 'bool');
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.logicalOr($a, $b); }, { $a: $a, $b: $b });
}
/**
 * Returns the truth value of `a XOR b` element-wise. Supports broadcasting.
 *
 * ```js
 * const a = tf.tensor1d([false, false, true, true], 'bool');
 * const b = tf.tensor1d([false, true, false, true], 'bool');
 *
 * a.logicalXor(b).print();
 * ```
 *
 * @param a The first input tensor. Must be of dtype bool.
 * @param b The second input tensor. Must be of dtype bool.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function logicalXor_(a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'logicalXor', 'bool');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'logicalXor', 'bool');
    broadcast_util_1.assertAndGetBroadcastShape($a.shape, $b.shape);
    // x ^ y = (x | y) & ~(x & y)
    return exports.logicalOr(a, b).logicalAnd(exports.logicalAnd(a, b).logicalNot());
}
/**
 * Returns the elements, either `a` or `b` depending on the `condition`.
 *
 * If the condition is true, select from `a`, otherwise select from `b`.
 *
 * ```js
 * const cond = tf.tensor1d([false, false, true], 'bool');
 * const a = tf.tensor1d([1 , 2, 3]);
 * const b = tf.tensor1d([-1, -2, -3]);
 *
 * a.where(cond, b).print();
 * ```
 *
 * @param condition The input condition. Must be of dtype bool.
 * @param a If `condition` is rank 1, `a` may have a higher rank but
 *     its first dimension must match the size of `condition`.
 * @param b A tensor with the same shape and type as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function where_(condition, a, b) {
    var $a = tensor_util_env_1.convertToTensor(a, 'a', 'where');
    var $b = tensor_util_env_1.convertToTensor(b, 'b', 'where');
    var $condition = tensor_util_env_1.convertToTensor(condition, 'condition', 'where', 'bool');
    util_1.assertShapesMatch($a.shape, $b.shape, 'Error in where: ');
    if ($condition.rank === 1) {
        // If condition rank is 1, then the first dimension must match the size of
        // condition.
        util_1.assert($condition.shape[0] === $a.shape[0], function () { return 'The first dimension of `a` must match the size of `condition`.'; });
    }
    else {
        // A must have the same shape as condition.
        util_1.assertShapesMatch($condition.shape, $b.shape, 'Error in where: ');
    }
    // TODO(julianoks): Return null for condition gradient
    // when backprop supports it.
    var grad = function (dy, saved) {
        var $condition = saved[0];
        return {
            $condition: function () { return tensor_ops_1.zerosLike($condition).toFloat(); },
            $a: function () { return dy.mul($condition.cast(dy.dtype)); },
            $b: function () { return dy.mul($condition.logicalNot().cast(dy.dtype)); }
        };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.select($condition, $a, $b);
        save([$condition]);
        return res;
    }, { $condition: $condition, $a: $a, $b: $b }, grad);
}
/**
 * Returns the coordinates of true elements of condition.
 *
 * The coordinates are returned in a 2-D tensor where the first dimension (rows)
 * represents the number of true elements, and the second dimension (columns)
 * represents the coordinates of the true elements. Keep in mind, the shape of
 * the output tensor can vary depending on how many true values there are in
 * input. Indices are output in row-major order. The resulting tensor has the
 * shape `[numTrueElems, condition.rank]`.
 *
 * This is analogous to calling the python `tf.where(cond)` without an x or y.
 *
 * ```js
 * const cond = tf.tensor1d([false, false, true], 'bool');
 * const result = await tf.whereAsync(cond);
 * result.print();
 * ```
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
function whereAsync_(condition) {
    return __awaiter(this, void 0, void 0, function () {
        var $condition, vals, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $condition = tensor_util_env_1.convertToTensor(condition, 'condition', 'whereAsync', 'bool');
                    return [4 /*yield*/, $condition.data()];
                case 1:
                    vals = _a.sent();
                    res = where_impl_1.whereImpl($condition.shape, vals);
                    if (condition !== $condition) {
                        $condition.dispose();
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.logicalAnd = operation_1.op({ logicalAnd_: logicalAnd_ });
exports.logicalNot = operation_1.op({ logicalNot_: logicalNot_ });
exports.logicalOr = operation_1.op({ logicalOr_: logicalOr_ });
exports.logicalXor = operation_1.op({ logicalXor_: logicalXor_ });
exports.where = operation_1.op({ where_: where_ });
exports.whereAsync = whereAsync_;
//# sourceMappingURL=logical_ops.js.map