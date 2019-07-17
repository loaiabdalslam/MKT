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
var gradients_1 = require("../gradients");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var axis_util = require("./axis_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Computes the log(sum(exp(elements across the reduction dimensions)).
 *
 * Reduces the input along the dimensions given in `axis`. Unless `keepDims`
 * is true, the rank of the array is reduced by 1 for each entry in `axis`.
 * If `keepDims` is true, the reduced dimensions are retained with length 1.
 * If `axis` has no entries, all dimensions are reduced, and an array with a
 * single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.logSumExp().print();  // or tf.logSumExp(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.logSumExp(axis).print();  // or tf.logSumExp(a, axis)
 * ```
 * @param x The input tensor.
 * @param axis The dimension(s) to reduce. If null (the default),
 *     reduces all dimensions.
 * @param keepDims If true, retains reduced dimensions with length
 *     of 1. Defaults to false.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function logSumExp_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'logSumExp');
    var axes = util.parseAxisParam(axis, $x.shape);
    var xMax = $x.max(axes, true /* keepDims */);
    var a = $x.sub(xMax);
    var b = a.exp();
    var c = b.sum(axes);
    var d = c.log();
    var res = xMax.reshape(d.shape).add(d);
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(res.shape, axes);
        return res.reshape(newShape);
    }
    return res;
}
/**
 * Computes the sum of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the `tf.Tensor` is reduced by 1 for each entry in
 * `axes`. If `keepDims` is true, the reduced dimensions are retained with
 * length 1. If axes has no entries, all dimensions are reduced, and a
 * `tf.Tensor` with a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.sum().print();  // or tf.sum(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.sum(axis).print();  // or tf.sum(x, axis)
 * ```
 *
 * @param x The input tensor to compute the sum over. If the dtype is `bool`
 *   it will be converted to `int32` and the output dtype will be `int32`.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function sum_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'sum');
    if ($x.dtype === 'bool') {
        $x = $x.toInt();
    }
    var axes = util.parseAxisParam(axis, $x.shape);
    // Use a custom gradient to bypass 2 gradient backprops since sum is used
    // extremely often.
    var customOp = gradients_1.customGrad(function (x) {
        var permutation = axis_util.getAxesPermutation(axes, x.rank);
        var reductionAxes = axes;
        var permutedX = x;
        if (permutation != null) {
            permutedX = x.transpose(permutation);
            reductionAxes = axis_util.getInnerMostAxes(reductionAxes.length, x.rank);
        }
        var value = engine_1.ENGINE.runKernel(function (backend) { return backend.sum(permutedX, reductionAxes); }, { permutedX: permutedX });
        if (keepDims) {
            var newShape = axis_util.expandShapeToKeepDim(value.shape, axes);
            value = value.reshape(newShape);
        }
        var gradFunc = function (dy) {
            var expandedDyShape = x.shape.slice();
            axes.forEach(function (axis) {
                expandedDyShape[axis] = 1;
            });
            var expandedDy = dy.reshape(expandedDyShape);
            var derX = expandedDy.mul(tensor_ops_1.ones(x.shape, 'float32'));
            return derX;
        };
        return { value: value, gradFunc: gradFunc };
    });
    return customOp($x);
}
/**
 * Computes the product of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the `tf.Tensor` is reduced by 1 for each entry in
 * `axes`. If `keepDims` is true, the reduced dimensions are retained with
 * length 1. If `axes` has no entries, all dimensions are reduced, and a
 * `tf.Tensor` with a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.prod().print();  // or tf.prod(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.prod(axis).print();  // or tf.prod(x, axis)
 * ```
 *
 * @param x The input tensor to compute the product over. If the dtype is `bool`
 *   it will be converted to `int32` and the output dtype will be `int32`.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function prod_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'prod');
    if ($x.dtype === 'bool') {
        $x = $x.toInt();
    }
    var axes = util.parseAxisParam(axis, $x.shape);
    var permutation = axis_util.getAxesPermutation(axes, $x.rank);
    var reductionAxes = axes;
    var permutedX = $x;
    if (permutation != null) {
        permutedX = $x.transpose(permutation);
        reductionAxes = axis_util.getInnerMostAxes(reductionAxes.length, $x.rank);
    }
    var value = engine_1.ENGINE.runKernel(function (backend) { return backend.prod(permutedX, reductionAxes); }, { permutedX: permutedX });
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(value.shape, axes);
        value = value.reshape(newShape);
    }
    return value;
}
/**
 * Computes the mean of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces `x` along the dimensions given in `axis`. Unless `keepDims` is
 * true, the rank of the `tf.Tensor` is reduced by 1 for each entry in `axis`.
 * If `keepDims` is true, the reduced dimensions are retained with length 1.
 * If `axis` has no entries, all dimensions are reduced, and a `tf.Tensor` with
 * a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.mean().print();  // or tf.mean(a)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.mean(axis).print();  // or tf.mean(x, axis)
 * ```
 *
 * @param x The input tensor.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function mean_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'mean');
    var axes = util.parseAxisParam(axis, $x.shape);
    var shapes = axis_util.computeOutAndReduceShapes($x.shape, axes);
    var reduceShape = shapes[1];
    var reduceSize = util.sizeFromShape(reduceShape);
    // Use a custom gradient to bypass 2 gradient backprops since mean is used
    // extremely often.
    var customOp = gradients_1.customGrad(function (x) {
        var reduceSizeScalar = tensor_ops_1.scalar(reduceSize);
        // Cast if needed.
        var xReduce = reduceSizeScalar.dtype === x.dtype ? x : x.cast(reduceSizeScalar.dtype);
        var res = xReduce.div(reduceSizeScalar);
        var value = res.sum(axis, keepDims);
        var gradFunc = function (dy) {
            var expandedDyShape = x.shape.slice();
            axes.forEach(function (axis) {
                expandedDyShape[axis] = 1;
            });
            var expandedDy = dy.reshape(expandedDyShape);
            var derX = expandedDy.mul(tensor_ops_1.ones(x.shape, 'float32')).div(reduceSize);
            return derX;
        };
        return { value: value, gradFunc: gradFunc };
    });
    return customOp($x);
}
/**
 * Gradient helper function for the min and max operations.
 */
function gradForMinAndMax(dy, y, xOrig, origAxes, permutedAxes) {
    if (y.rank < xOrig.rank) {
        y = y.reshape(axis_util.expandShapeToKeepDim(y.shape, origAxes));
    }
    if (dy.rank < xOrig.rank) {
        dy = dy.reshape(axis_util.expandShapeToKeepDim(dy.shape, origAxes));
    }
    return {
        $x: function () {
            var dx = dy.mul(xOrig.equal(y).cast(dy.dtype));
            return permutedAxes == null ? dx : dx.transpose(permutedAxes);
        }
    };
}
/**
 * Computes the minimum value from the input.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the array is reduced by 1 for each entry in `axes`.
 * If `keepDims` is true, the reduced dimensions are retained with length 1.
 * If `axes` has no entries, all dimensions are reduced, and an array with a
 * single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.min().print();  // or tf.min(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.min(axis).print();  // or tf.min(x, axis)
 * ```
 *
 * @param x The input Tensor.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function min_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'min');
    var xOrig = $x;
    var origAxes = util.parseAxisParam(axis, $x.shape);
    var axes = origAxes;
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var grad = function (dy, saved) {
        return gradForMinAndMax(dy, saved[1], saved[0], origAxes, permutedAxes);
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.min($x, axes);
        save([xOrig, y]);
        return y;
    }, { $x: $x }, grad);
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
        res = res.reshape(newShape);
    }
    return res;
}
/**
 * Computes the maximum of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the `tf.Tensor` is reduced by 1 for each entry in
 * `axes`. If `keepDims` is true, the reduced dimensions are retained with
 * length 1. If `axes` has no entries, all dimensions are reduced, and an
 * `tf.Tensor` with a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.max().print();  // or tf.max(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * const axis = 1;
 * x.max(axis).print();  // or tf.max(x, axis)
 * ```
 *
 * @param x The input tensor.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function max_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'max');
    var xOrig = $x;
    var origAxes = util.parseAxisParam(axis, $x.shape);
    var axes = origAxes;
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var grad = function (dy, saved) {
        return gradForMinAndMax(dy, saved[1], saved[0], origAxes, permutedAxes);
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.max($x, axes);
        save([xOrig, y]);
        return y;
    }, { $x: $x }, grad);
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
        res = res.reshape(newShape);
    }
    return res;
}
/**
 * Returns the indices of the minimum values along an `axis`.
 *
 * The result has the same shape as `input` with the dimension along `axis`
 * removed.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.argMin().print();  // or tf.argMin(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 4, 3], [2, 2]);
 *
 * const axis = 1;
 * x.argMin(axis).print();  // or tf.argMin(x, axis)
 * ```
 *
 * @param x The input tensor.
 * @param axis The dimension to reduce. Defaults to 0 (outer-most dimension).
 *
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function argMin_(x, axis) {
    if (axis === void 0) { axis = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'argMin');
    if (axis == null) {
        axis = 0;
    }
    var axes = util.parseAxisParam(axis, $x.shape);
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return tensor_ops_1.zerosLike($x); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.argMin($x, axes[0]);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Returns the indices of the maximum values along an `axis`.
 *
 * The result has the same shape as `input` with the dimension along `axis`
 * removed.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3]);
 *
 * x.argMax().print();  // or tf.argMax(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 4, 3], [2, 2]);
 *
 * const axis = 1;
 * x.argMax(axis).print();  // or tf.argMax(x, axis)
 * ```
 *
 * @param x The input tensor.
 * @param axis The dimension to reduce. Defaults to 0 (outer-most dimension).
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function argMax_(x, axis) {
    if (axis === void 0) { axis = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'argMax');
    if (axis == null) {
        axis = 0;
    }
    var axes = util.parseAxisParam(axis, $x.shape);
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var grad = function (dy, saved) {
        var $x = saved[0];
        return { $x: function () { return tensor_ops_1.zerosLike($x); } };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.argMax($x, axes[0]);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Computes the logical and of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the `tf.Tensor` is reduced by 1 for each entry in
 * `axes`. If `keepDims` is true, the reduced dimensions are retained with
 * length 1. If `axes` has no entries, all dimensions are reduced, and an
 * `tf.Tensor` with a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 1, 1], 'bool');
 *
 * x.all().print();  // or tf.all(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
 *
 * const axis = 1;
 * x.all(axis).print();  // or tf.all(x, axis)
 * ```
 *
 * @param x The input tensor. Must be of dtype bool.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function all_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'all', 'bool');
    var origAxes = util.parseAxisParam(axis, $x.shape);
    var axes = origAxes;
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.all($x, axes); }, { $x: $x });
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
        return res.reshape(newShape);
    }
    return res;
}
/**
 * Computes the logical or of elements across dimensions of a `tf.Tensor`.
 *
 * Reduces the input along the dimensions given in `axes`. Unless `keepDims`
 * is true, the rank of the `tf.Tensor` is reduced by 1 for each entry in
 * `axes`. If `keepDims` is true, the reduced dimensions are retained with
 * length 1. If `axes` has no entries, all dimensions are reduced, and an
 * `tf.Tensor` with a single element is returned.
 *
 * ```js
 * const x = tf.tensor1d([1, 1, 1], 'bool');
 *
 * x.any().print();  // or tf.any(x)
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
 *
 * const axis = 1;
 * x.any(axis).print();  // or tf.any(x, axis)
 * ```
 *
 * @param x The input tensor. Must be of dtype bool.
 * @param axis The dimension(s) to reduce. By default it reduces
 *     all dimensions.
 * @param keepDims If true, retains reduced dimensions with size 1.
 */
/** @doc {heading: 'Operations', subheading: 'Reduction'} */
function any_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'any', 'bool');
    var origAxes = util.parseAxisParam(axis, $x.shape);
    var axes = origAxes;
    var permutedAxes = axis_util.getAxesPermutation(axes, $x.rank);
    if (permutedAxes != null) {
        $x = $x.transpose(permutedAxes);
        axes = axis_util.getInnerMostAxes(axes.length, $x.rank);
    }
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.any($x, axes); }, { $x: $x });
    if (keepDims) {
        var newShape = axis_util.expandShapeToKeepDim(res.shape, origAxes);
        return res.reshape(newShape);
    }
    return res;
}
/**
 * Calculates the mean and variance of `x`. The mean and variance are
 * calculated by aggregating the contents of `x` across `axes`. If `x` is
 * 1-D and `axes = [0]` this is just the mean and variance of a vector.
 *
 * @param x The input tensor.
 * @param axis The dimension(s) along with to compute mean and
 *     variance. By default it reduces all dimensions.
 * @param keepDims If true, the moments have the same dimensionality as the
 *     input.
 * @return An object with two keys: `mean` and `variance`.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
function moments_(x, axis, keepDims) {
    if (axis === void 0) { axis = null; }
    if (keepDims === void 0) { keepDims = false; }
    x = tensor_util_env_1.convertToTensor(x, 'x', 'moments');
    var axes = util.parseAxisParam(axis, x.shape);
    var mean = x.mean(axes, keepDims);
    var keepDimsShape = mean.shape;
    if (!keepDims) {
        keepDimsShape = axis_util.expandShapeToKeepDim(mean.shape, axes);
    }
    var devSquared = x.toFloat().sub(mean.reshape(keepDimsShape)).square();
    var variance = devSquared.mean(axes, keepDims);
    return { mean: mean, variance: variance };
}
exports.all = operation_1.op({ all_: all_ });
// tslint:disable-next-line:variable-name
exports.any = operation_1.op({ any_: any_ });
exports.argMax = operation_1.op({ argMax_: argMax_ });
exports.argMin = operation_1.op({ argMin_: argMin_ });
exports.logSumExp = operation_1.op({ logSumExp_: logSumExp_ });
exports.max = operation_1.op({ max_: max_ });
exports.mean = operation_1.op({ mean_: mean_ });
exports.min = operation_1.op({ min_: min_ });
exports.moments = operation_1.op({ moments_: moments_ });
exports.sum = operation_1.op({ sum_: sum_ });
exports.prod = operation_1.op({ prod_: prod_ });
//# sourceMappingURL=reduction_ops.js.map