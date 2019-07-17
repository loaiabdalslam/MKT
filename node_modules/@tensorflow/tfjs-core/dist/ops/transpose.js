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
var axis_util = require("./axis_util");
var operation_1 = require("./operation");
/**
 * Transposes the `tf.Tensor`. Permutes the dimensions according to `perm`.
 *
 * The returned `tf.Tensor`'s dimension `i` will correspond to the input
 * dimension `perm[i]`. If `perm` is not given, it is set to `[n-1...0]`,
 * where `n` is the rank of the input `tf.Tensor`. Hence by default, this
 * operation performs a regular matrix transpose on 2-D input `tf.Tensor`s.
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
 *
 * a.transpose().print();  // or tf.transpose(a)
 * ```
 *
 * @param x The tensor to transpose.
 * @param perm The permutation of the dimensions of a.
 */
/** @doc {heading: 'Operations', subheading: 'Matrices'} */
function transpose_(x, perm) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'transpose');
    if (perm == null) {
        perm = $x.shape.map(function (s, i) { return i; }).reverse();
    }
    util.assert($x.rank === perm.length, function () { return "Error in transpose: rank of input " + $x.rank + " " +
        ("must match length of perm " + perm + "."); });
    perm.forEach(function (axis) {
        util.assert(axis >= 0 && axis < $x.rank, function () { return "All entries in 'perm' must be between 0 and " + ($x.rank - 1) +
            (" but got " + perm); });
    });
    if ($x.rank <= 1) {
        return $x.clone();
    }
    var der = function (dy) {
        var undoPerm = axis_util.getUndoAxesPermutation(perm);
        return { $x: function () { return dy.transpose(undoPerm); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.transpose($x, perm); }, { $x: $x }, der);
}
exports.transpose = operation_1.op({ transpose_: transpose_ });
//# sourceMappingURL=transpose.js.map