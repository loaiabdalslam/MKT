"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Math utility functions.
 *
 * This file contains some frequently used math function that operates on
 * number[] or Float32Array and return a number. Many of these functions are
 * not-so-thick wrappers around TF.js Core functions. But they offer the
 * convenience of
 * 1) not having to convert the inputs into Tensors,
 * 2) not having to convert the returned Tensors to numbers.
 */
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var errors_1 = require("../errors");
/**
 * Determine if a number is an integer.
 */
function isInteger(x) {
    return x === parseInt(x.toString(), 10);
}
exports.isInteger = isInteger;
/**
 * Calculate the product of an array of numbers.
 * @param array The array to calculate the product over.
 * @param begin Beginning index, inclusive.
 * @param end Ending index, exclusive.
 * @return The product.
 */
function arrayProd(array, begin, end) {
    if (begin == null) {
        begin = 0;
    }
    if (end == null) {
        end = array.length;
    }
    var prod = 1;
    for (var i = begin; i < end; ++i) {
        prod *= array[i];
    }
    return prod;
}
exports.arrayProd = arrayProd;
/**
 * A helper function transforms the two input types to an instance of Tensor1D,
 * so the return value can be fed directly into various TF.js Core functions.
 * @param array
 */
function toArray1D(array) {
    array = Array.isArray(array) ? new Float32Array(array) : array;
    return tfjs_core_1.tensor1d(array);
}
/**
 * Compute minimum value.
 * @param array
 * @return minimum value.
 */
function min(array) {
    return tfc.min(toArray1D(array)).dataSync()[0];
}
exports.min = min;
/**
 * Compute maximum value.
 * @param array
 * @return maximum value
 */
function max(array) {
    return tfc.max(toArray1D(array)).dataSync()[0];
}
exports.max = max;
/**
 * Compute sum of array.
 * @param array
 * @return The sum.
 */
function sum(array) {
    return tfc.sum(toArray1D(array)).dataSync()[0];
}
exports.sum = sum;
/**
 * Compute mean of array.
 * @param array
 * @return The mean.
 */
function mean(array) {
    return sum(array) / array.length;
}
exports.mean = mean;
/**
 * Compute variance of array.
 * @param array
 * @return The variance.
 */
function variance(array) {
    var demeaned = tfc.sub(toArray1D(array), tfjs_core_1.scalar(mean(array)));
    var sumSquare = tfc.sum(tfc.mulStrict(demeaned, demeaned)).dataSync()[0];
    return sumSquare / array.length;
}
exports.variance = variance;
/**
 * Compute median of array.
 * @param array
 * @return The median value.
 */
function median(array) {
    var arraySorted = array.slice().sort(function (a, b) { return a - b; });
    var lowIdx = Math.floor((arraySorted.length - 1) / 2);
    var highIdx = Math.ceil((arraySorted.length - 1) / 2);
    if (lowIdx === highIdx) {
        return arraySorted[lowIdx];
    }
    return (arraySorted[lowIdx] + arraySorted[highIdx]) / 2;
}
exports.median = median;
/**
 * Generate an array of integers in [begin, end).
 * @param begin Beginning integer, inclusive.
 * @param end Ending integer, exclusive.
 * @returns Range array.
 * @throws ValueError, iff `end` < `begin`.
 */
function range(begin, end) {
    if (end < begin) {
        throw new errors_1.ValueError("end (" + end + ") < begin (" + begin + ") is forbidden.");
    }
    var out = [];
    for (var i = begin; i < end; ++i) {
        out.push(i);
    }
    return out;
}
exports.range = range;
//# sourceMappingURL=math_utils.js.map