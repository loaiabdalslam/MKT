"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
var util = require("../util");
function assertParamsValid(input, begin, size) {
    util.assert(input.rank === begin.length, function () { return "Error in slice" + input.rank + "D: Length of begin " + begin + " must " +
        ("match the rank of the array (" + input.rank + ")."); });
    util.assert(input.rank === size.length, function () { return "Error in slice" + input.rank + "D: Length of size " + size + " must " +
        ("match the rank of the array (" + input.rank + ")."); });
    var _loop_1 = function (i) {
        util.assert(begin[i] + size[i] <= input.shape[i], function () { return "Error in slice" + input.rank + "D: begin[" + i + "] + size[" + i + "] " +
            ("(" + (begin[i] + size[i]) + ") would overflow input.shape[" + i + "] (" + input.shape[i] + ")"); });
    };
    for (var i = 0; i < input.rank; ++i) {
        _loop_1(i);
    }
}
exports.assertParamsValid = assertParamsValid;
/**
 * Calculate the start index and output tensor shape for strided slice op.
 * @returns array of [startIndex, size, shrinkAxis]
 */
function getStridedSlicedInfo(shape, begin, end, strides, beginMask, endMask, ellipsisMask, newAxisMask, shrinkAxisMask) {
    if (beginMask === void 0) { beginMask = 0; }
    if (endMask === void 0) { endMask = 0; }
    if (ellipsisMask === void 0) { ellipsisMask = 0; }
    if (newAxisMask === void 0) { newAxisMask = 0; }
    if (shrinkAxisMask === void 0) { shrinkAxisMask = 0; }
    if (ellipsisMask !== 0) {
        throw new Error('ellipsis mask is not yet supported');
    }
    if (newAxisMask !== 0) {
        throw new Error('new axis mask is not yet supported');
    }
    // Note that the axis orders are reversed for runtime ops, so the indices,
    // strides and masks must be as well too.
    var startIndex = [];
    var endIndex = [];
    var shrinkAxis = [];
    for (var i = 0; i < shape.length; i++) {
        startIndex[i] = startForAxis(beginMask, begin, strides, shape, i);
        endIndex[i] = stopForAxis(endMask, end, strides, shape, i);
        // When shrinking an axis, use startIndex + 1 for endIndex.
        // Check the axis bit from right of shrinkAxisMask
        if (shrinkAxisMask & 1 << i) {
            endIndex[i] = startIndex[i] + 1;
            shrinkAxis.push(i);
        }
    }
    var size = new Array(shape.length).fill(0);
    size = size.map(function (d, i) {
        var count = 0;
        var stride = strides[i] || 1;
        for (var start = startIndex[i]; !(stride > 0 ? start >= endIndex[i] : start <= endIndex[i]); start += stride) {
            count += 1;
        }
        return count;
    });
    return [startIndex, size, shrinkAxis];
}
exports.getStridedSlicedInfo = getStridedSlicedInfo;
function startForAxis(beginMask, startIndices, strides, inputShape, axis) {
    // Begin with the specified index
    var start = startIndices[axis];
    var stride = strides[axis] || 1;
    // Check the axis bit from right of beginMask or the begin index is not set
    // for the axis.
    if (beginMask & 1 << axis || start == null) {
        if (stride > 0) {
            // Forward iteration - use the first element. These values will get
            // clamped below (Note: We could have set them to 0 and axis_size-1, but
            // use lowest() and max() to maintain symmetry with StopForAxis())
            start = Number.MIN_SAFE_INTEGER;
        }
        else {
            // Backward iteration - use the last element.
            start = Number.MAX_SAFE_INTEGER;
        }
    }
    // Handle negative indices
    var axisSize = inputShape[axis];
    if (start < 0) {
        start += axisSize;
    }
    // Clamping
    start = util.clamp(0, start, axisSize - 1);
    return start;
}
exports.startForAxis = startForAxis;
function stopForAxis(endMask, stopIndices, strides, inputShape, axis) {
    // Begin with the specified index
    var stop = stopIndices[axis];
    var stride = strides[axis] || 1;
    // Check the axis bit from right of endMask or if the stop index is not set
    // for this axis.
    if (endMask & (1 << axis) || stop == null) {
        if (stride > 0) {
            // Forward iteration - use the last element. These values will get
            // clamped below
            stop = Number.MAX_SAFE_INTEGER;
        }
        else {
            // Backward iteration - use the first element.
            stop = Number.MIN_SAFE_INTEGER;
        }
    }
    // Handle negative indices
    var axisSize = inputShape[axis];
    if (stop < 0) {
        stop += axisSize;
    }
    // Clamping
    // Because the end index points one past the last element, we need slightly
    // different clamping ranges depending on the direction.
    if (stride > 0) {
        // Forward iteration
        stop = util.clamp(0, stop, axisSize);
    }
    else {
        // Backward iteration
        stop = util.clamp(-1, stop, axisSize - 1);
    }
    return stop;
}
exports.stopForAxis = stopForAxis;
/**
 * Returns true if the slice occupies a continous set of elements in the
 * 'flat' space.
 */
function isSliceContinous(shape, begin, size) {
    // Index of the first axis that has size > 1.
    var firstNonOneAxis = size.length;
    for (var i = 0; i < size.length; i++) {
        if (size[i] > 1) {
            firstNonOneAxis = i;
            break;
        }
    }
    for (var i = firstNonOneAxis + 1; i < size.length; i++) {
        if (begin[i] > 0 || size[i] !== shape[i]) {
            return false;
        }
    }
    return true;
}
exports.isSliceContinous = isSliceContinous;
function computeFlatOffset(begin, strides) {
    var flatOffset = begin.length > 0 ? begin[begin.length - 1] : 1;
    for (var i = 0; i < begin.length - 1; i++) {
        flatOffset += begin[i] * strides[i];
    }
    return flatOffset;
}
exports.computeFlatOffset = computeFlatOffset;
//# sourceMappingURL=slice_util.js.map