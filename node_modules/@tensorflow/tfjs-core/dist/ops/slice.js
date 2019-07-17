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
var slice_util = require("./slice_util");
/**
 * Extracts a 1D slice from 1D array starting at coordinates `begin` and is
 * of length `size`. See `slice` for details.
 */
function slice1d_(x, begin, size) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'slice1d');
    util.assert($x.rank === 1, function () {
        return "slice1d expects a rank-1 tensor, but got a rank-" + $x.rank + " tensor";
    });
    return exports.slice($x, [begin], [size]);
}
/**
 * Extracts a 2D slice from a 2D array starting at coordinates `begin` and
 * is of size `size`. See `slice` for details.
 */
function slice2d_(x, begin, size) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'slice2d');
    util.assert($x.rank === 2, function () {
        return "slice2d expects a rank-2 tensor, but got a rank-" + $x.rank + " tensor";
    });
    return exports.slice($x, begin, size);
}
/**
 * Extracts a 3D slice from a 3D array starting at coordinates `begin` and
 * is of size `size`. See `slice` for details.
 */
function slice3d_(x, begin, size) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'slice3d');
    util.assert($x.rank === 3, function () {
        return "slice3d expects a rank-3 tensor, but got a rank-" + $x.rank + " tensor";
    });
    return exports.slice($x, begin, size);
}
/**
 * Extracts a 4D slice from a 4D array starting at coordinates `begin` and
 * is of size `size`. See `slice` for details.
 */
function slice4d_(x, begin, size) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'slice4d');
    util.assert($x.rank === 4, function () {
        return "slice4d expects a rank-4 tensor, but got a rank-" + $x.rank + " tensor";
    });
    return exports.slice($x, begin, size);
}
/**
 * Extracts a slice from a `tf.Tensor` starting at coordinates `begin`
 * and is of size `size`.
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that `x` is of the given rank:
 *   - `tf.slice1d`
 *   - `tf.slice2d`
 *   - `tf.slice3d`
 *   - `tf.slice4d`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 *
 * x.slice([1], [2]).print();
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * x.slice([1, 0], [1, 2]).print();
 * ```
 * @param x The input `tf.Tensor` to slice from.
 * @param begin The coordinates to start the slice from. The length can be
 *     less than the rank of x - the rest of the axes will have implicit 0 as
 *     start. Can also be a single number, in which case it specifies the
 *     first axis.
 * @param size The size of the slice. The length can be less than the rank of
 *     x - the rest of the axes will have implicit -1. A value of -1 requests
 *     the rest of the dimensions in the axis. Can also be a single number,
 *     in which case it specifies the size of the first axis.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function slice_(x, begin, size) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'slice');
    if ($x.rank === 0) {
        throw new Error('Slicing scalar is not possible');
    }
    // The following logic allows for more ergonomic calls.
    var begin_;
    if (typeof begin === 'number') {
        begin_ = [begin].concat(new Array($x.rank - 1).fill(0));
    }
    else if (begin.length < $x.rank) {
        begin_ = begin.concat(new Array($x.rank - begin.length).fill(0));
    }
    else {
        begin_ = begin.slice();
    }
    var size_;
    if (size == null) {
        size_ = new Array($x.rank).fill(-1);
    }
    else if (typeof size === 'number') {
        size_ = [size].concat(new Array($x.rank - 1).fill(-1));
    }
    else if (size.length < $x.rank) {
        size_ = size.concat(new Array($x.rank - size.length).fill(-1));
    }
    else {
        size_ = size;
    }
    size_ = size_.map(function (d, i) {
        if (d >= 0) {
            return d;
        }
        else {
            util.assert(d === -1, function () { return 'Bad value in size'; });
            return $x.shape[i] - begin_[i];
        }
    });
    slice_util.assertParamsValid($x, begin_, size_);
    var inputShape = $x.shape;
    var grad = function (dy) {
        // Create an Nx2 padding where the first column represents how many
        // zeros are prepended (at start) for each dimension, and the second
        // column indicates how many zeros are appended (at end).
        // The number of zeros to append is the shape of the input
        // elementwise-subtracted by both the begin vector and sizes vector.
        var paddings = [];
        for (var i = 0; i < dy.rank; i++) {
            paddings.push([begin_[i], inputShape[i] - begin_[i] - size_[i]]);
        }
        return { $x: function () { return dy.pad(paddings); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.slice($x, begin_, size_); }, { $x: $x }, grad);
}
exports.slice = operation_1.op({ slice_: slice_ });
exports.slice1d = operation_1.op({ slice1d_: slice1d_ });
exports.slice2d = operation_1.op({ slice2d_: slice2d_ });
exports.slice3d = operation_1.op({ slice3d_: slice3d_ });
exports.slice4d = operation_1.op({ slice4d_: slice4d_ });
//# sourceMappingURL=slice.js.map