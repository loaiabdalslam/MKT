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
/**
 * Returns the dimensions in the input shape that are broadcasted to
 * produce the provided output shape.
 *
 * The returned dimensions are 0-indexed and sorted. An example:
 * inShape = [4, 1, 3]
 * outShape = [5, 4, 3, 3]
 * result = [1]. Dimension 1 (2nd dimension of input) gets broadcasted 1 => 3.
 */
function getBroadcastDims(inShape, outShape) {
    var inRank = inShape.length;
    var dims = [];
    for (var i = 0; i < inRank; i++) {
        var dim = inRank - 1 - i;
        var a = inShape[dim] || 1;
        var b = outShape[outShape.length - 1 - i] || 1;
        if (b > 1 && a === 1) {
            dims.unshift(dim);
        }
    }
    return dims;
}
exports.getBroadcastDims = getBroadcastDims;
/**
 * Returns the axes in the output space that should be reduced to produce
 * the input space.
 */
function getReductionAxes(inShape, outShape) {
    var result = [];
    for (var i = 0; i < outShape.length; i++) {
        var inDim = inShape[inShape.length - i - 1];
        var outAxis = outShape.length - i - 1;
        var outDim = outShape[outAxis];
        if (inDim == null || (inDim === 1 && outDim > 1)) {
            result.unshift(outAxis);
        }
    }
    return result;
}
exports.getReductionAxes = getReductionAxes;
function assertAndGetBroadcastShape(shapeA, shapeB) {
    var result = [];
    var l = Math.max(shapeA.length, shapeB.length);
    for (var i = 0; i < l; i++) {
        var a = shapeA[shapeA.length - i - 1];
        if (a == null) {
            a = 1;
        }
        var b = shapeB[shapeB.length - i - 1];
        if (b == null) {
            b = 1;
        }
        if (a === 1) {
            result.unshift(b);
        }
        else if (b === 1) {
            result.unshift(a);
        }
        else if (a !== b) {
            var errMsg = "Operands could not be broadcast together with shapes " +
                (shapeA + " and " + shapeB + ".");
            throw Error(errMsg);
        }
        else {
            result.unshift(a);
        }
    }
    return result;
}
exports.assertAndGetBroadcastShape = assertAndGetBroadcastShape;
//# sourceMappingURL=broadcast_util.js.map