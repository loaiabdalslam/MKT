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
var array_ops_1 = require("./array_ops");
var axis_util_1 = require("./axis_util");
var binary_ops_1 = require("./binary_ops");
var compare_1 = require("./compare");
var logical_ops_1 = require("./logical_ops");
var operation_1 = require("./operation");
var segment_util_1 = require("./segment_util");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Computes the sum along segments of a `tf.Tensor`.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * const segmentIds = tf.tensor1d([1, 2, 0, 1], 'int32');
 * const numSegments = 3;
 *
 * x.unsortedSegmentSum(segmentIds, numSegments).print()
 * //or tf.unsortedSegmentSum(x, segmentIds, numSegments)
 * ```
 * @param x The `tf.Tensor` that will be summed along its segments.
 * @param segmentIds A `tf.Tensor1D` whose rank is equal to the rank of `x`'s
 * dimension along the `axis`.  Maps each element of `x` to a segment.
 * @param numSegments The number of distinct `segmentIds`.
 */
/** @doc {heading: 'Operations', subheading: 'Segment'} */
function unsortedSegmentSum_(x, segmentIds, numSegments) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'unsortedSegmentSum');
    var $segmentIds = tensor_util_env_1.convertToTensor(segmentIds, 'segmentIds', 'unsortedSegmentSum', 'int32');
    util_1.assert(util_1.isInt(numSegments), function () { return 'numSegments must be of dtype int'; });
    var gradFunc = function (dy, saved) {
        var $segmentIds = saved[0];
        var derX = function () {
            return gatherDropNegatives(dy, $segmentIds);
        };
        return { $x: derX };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.unsortedSegmentSum($x, $segmentIds, numSegments);
        save([$segmentIds]);
        return res;
    }, { $x: $x }, gradFunc);
}
/**
 * Gather slices from tensor `x`'s axis `axis` according to `indices`.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * const indices = tf.tensor1d([1, 3, 3], 'int32');
 *
 * x.gather(indices).print();
 * ```
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 * const indices = tf.tensor1d([1, 1, 0], 'int32');
 *
 * x.gather(indices).print();
 * ```
 * @param x The input tensor whose slices to be gathered.
 * @param indices The indices of the values to extract.
 * @param axis The axis over which to select values. Defaults to 0.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function gather_(x, indices, axis) {
    if (axis === void 0) { axis = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'gather');
    var $indices = tensor_util_env_1.convertToTensor(indices, 'indices', 'gather', 'int32');
    axis = util_1.parseAxisParam(axis, $x.shape)[0];
    var shapeInfo = segment_util_1.collectGatherOpShapeInfo($x, $indices, axis);
    var grad = function (dy, saved) {
        var $indices = saved[0];
        var derX = function () {
            var paramsShape = $x.shape;
            var indicesSize = $indices.size;
            var outerShape = paramsShape.slice(0, axis);
            var outerDims = outerShape.length;
            var innerShape = paramsShape.slice(axis, paramsShape.length).slice(1);
            var innerDims = innerShape.length;
            var outerAxesIndices = arrayRange(0, outerDims);
            var innerAxesIndices = arrayRange(outerDims + 1, outerDims + 1 + innerDims);
            var valuesShape = arrayConcat([outerShape, [indicesSize], innerShape]);
            var values = dy.reshape(valuesShape);
            var reshapedIndices = $indices.reshape([indicesSize]);
            var transposeDims = arrayConcat([[outerDims], outerAxesIndices, innerAxesIndices]);
            var valuesTranspose = values.transpose(transposeDims);
            var paramsGrad = exports.unsortedSegmentSum(valuesTranspose, reshapedIndices, $x.shape[axis]);
            var invertTransposeDims = axis_util_1.getUndoAxesPermutation(transposeDims);
            paramsGrad = paramsGrad.transpose(invertTransposeDims);
            return paramsGrad;
        };
        return { $x: derX };
    };
    return (engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.gather($x, $indices.flatten(), axis);
        save([$indices]);
        return res;
    }, { $x: $x }, grad)).reshape(shapeInfo.outputShape);
}
function arrayRange(start, stop) {
    var result = [];
    for (var i = start; i < stop; ++i) {
        result.push(i);
    }
    return result;
}
function arrayConcat(arrays) {
    var result = [];
    for (var i = 0; i < arrays.length; ++i) {
        for (var j = 0; j < arrays[i].length; ++j) {
            result.push(arrays[i][j]);
        }
    }
    return result;
}
function gatherDropNegatives(x, indices) {
    // Helper function for unsorted segment ops. Gathers params for
    // positive segment ids and gathers 0 for inputs with negative segment id.
    // Mirrors _GatherDropNegatives from tensorflow/python/ops/math_grad.py
    var zeroClippedIndices = binary_ops_1.maximum(indices, tensor_ops_1.zerosLike(indices));
    var gathered = exports.gather(x, zeroClippedIndices);
    var isPositive = compare_1.greaterEqual(indices, tensor_ops_1.scalar(0, 'int32'));
    var numIters = gathered.rank - isPositive.rank;
    for (var i = 0; i < numIters; ++i) {
        isPositive = array_ops_1.expandDims(isPositive, i + 1);
    }
    isPositive = logical_ops_1.logicalAnd(isPositive, tensor_ops_1.ones(gathered.shape, 'bool'));
    var zeroSlice = tensor_ops_1.zerosLike(gathered);
    return logical_ops_1.where(isPositive, gathered, zeroSlice);
}
exports.gather = operation_1.op({ gather_: gather_ });
exports.unsortedSegmentSum = operation_1.op({ unsortedSegmentSum_: unsortedSegmentSum_ });
//# sourceMappingURL=segment_ops.js.map