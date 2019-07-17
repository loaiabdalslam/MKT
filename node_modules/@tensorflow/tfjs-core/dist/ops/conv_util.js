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
function computePool2DInfo(inShape, filterSize, strides, dilations, pad, roundingMode, dataFormat) {
    if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
    var _a = parseTupleParam(filterSize), filterHeight = _a[0], filterWidth = _a[1];
    var filterShape;
    if (dataFormat === 'channelsLast') {
        filterShape = [filterHeight, filterWidth, inShape[3], inShape[3]];
    }
    else if (dataFormat === 'channelsFirst') {
        filterShape = [filterHeight, filterWidth, inShape[1], inShape[1]];
    }
    else {
        throw new Error("Unknown dataFormat " + dataFormat);
    }
    return computeConv2DInfo(inShape, filterShape, strides, dilations, pad, roundingMode, false, dataFormat);
}
exports.computePool2DInfo = computePool2DInfo;
/**
 * Computes the information for a forward pass of a convolution/pooling
 * operation.
 */
function computeConv2DInfo(inShape, filterShape, strides, dilations, pad, roundingMode, depthwise, dataFormat) {
    if (depthwise === void 0) { depthwise = false; }
    if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
    var _a = [-1, -1, -1, -1], batchSize = _a[0], inHeight = _a[1], inWidth = _a[2], inChannels = _a[3];
    if (dataFormat === 'channelsLast') {
        batchSize = inShape[0], inHeight = inShape[1], inWidth = inShape[2], inChannels = inShape[3];
    }
    else if (dataFormat === 'channelsFirst') {
        batchSize = inShape[0], inChannels = inShape[1], inHeight = inShape[2], inWidth = inShape[3];
    }
    else {
        throw new Error("Unknown dataFormat " + dataFormat);
    }
    var filterHeight = filterShape[0], filterWidth = filterShape[1], filterChannels = filterShape[3];
    var _b = parseTupleParam(strides), strideHeight = _b[0], strideWidth = _b[1];
    var _c = parseTupleParam(dilations), dilationHeight = _c[0], dilationWidth = _c[1];
    var effectiveFilterHeight = getEffectiveFilterSize(filterHeight, dilationHeight);
    var effectiveFilterWidth = getEffectiveFilterSize(filterWidth, dilationWidth);
    var _d = getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, effectiveFilterHeight, effectiveFilterWidth, roundingMode), padInfo = _d.padInfo, outHeight = _d.outHeight, outWidth = _d.outWidth;
    var outChannels = depthwise ? filterChannels * inChannels : filterChannels;
    var outShape;
    if (dataFormat === 'channelsFirst') {
        outShape = [batchSize, outChannels, outHeight, outWidth];
    }
    else if (dataFormat === 'channelsLast') {
        outShape = [batchSize, outHeight, outWidth, outChannels];
    }
    return {
        batchSize: batchSize,
        dataFormat: dataFormat,
        inHeight: inHeight,
        inWidth: inWidth,
        inChannels: inChannels,
        outHeight: outHeight,
        outWidth: outWidth,
        outChannels: outChannels,
        padInfo: padInfo,
        strideHeight: strideHeight,
        strideWidth: strideWidth,
        filterHeight: filterHeight,
        filterWidth: filterWidth,
        effectiveFilterHeight: effectiveFilterHeight,
        effectiveFilterWidth: effectiveFilterWidth,
        dilationHeight: dilationHeight,
        dilationWidth: dilationWidth,
        inShape: inShape,
        outShape: outShape,
        filterShape: filterShape
    };
}
exports.computeConv2DInfo = computeConv2DInfo;
/**
 * Computes the information for a forward pass of a 3D convolution/pooling
 * operation.
 */
function computeConv3DInfo(inShape, filterShape, strides, dilations, pad, depthwise, dataFormat) {
    if (depthwise === void 0) { depthwise = false; }
    if (dataFormat === void 0) { dataFormat = 'channelsLast'; }
    var _a = [-1, -1, -1, -1, -1], batchSize = _a[0], inDepth = _a[1], inHeight = _a[2], inWidth = _a[3], inChannels = _a[4];
    if (dataFormat === 'channelsLast') {
        batchSize = inShape[0], inDepth = inShape[1], inHeight = inShape[2], inWidth = inShape[3], inChannels = inShape[4];
    }
    else if (dataFormat === 'channelsFirst') {
        batchSize = inShape[0], inChannels = inShape[1], inDepth = inShape[2], inHeight = inShape[3], inWidth = inShape[4];
    }
    else {
        throw new Error("Unknown dataFormat " + dataFormat);
    }
    var filterDepth = filterShape[0], filterHeight = filterShape[1], filterWidth = filterShape[2], filterChannels = filterShape[4];
    var _b = parse3TupleParam(strides), strideDepth = _b[0], strideHeight = _b[1], strideWidth = _b[2];
    var _c = parse3TupleParam(dilations), dilationDepth = _c[0], dilationHeight = _c[1], dilationWidth = _c[2];
    var effectiveFilterDepth = getEffectiveFilterSize(filterDepth, dilationDepth);
    var effectiveFilterHeight = getEffectiveFilterSize(filterHeight, dilationHeight);
    var effectiveFilterWidth = getEffectiveFilterSize(filterWidth, dilationWidth);
    var _d = get3DPadAndOutInfo(pad, inDepth, inHeight, inWidth, strideDepth, strideHeight, strideWidth, effectiveFilterDepth, effectiveFilterHeight, effectiveFilterWidth), padInfo = _d.padInfo, outDepth = _d.outDepth, outHeight = _d.outHeight, outWidth = _d.outWidth;
    var outChannels = depthwise ? filterChannels * inChannels : filterChannels;
    var outShape;
    if (dataFormat === 'channelsFirst') {
        outShape = [batchSize, outChannels, outDepth, outHeight, outWidth];
    }
    else if (dataFormat === 'channelsLast') {
        outShape = [batchSize, outDepth, outHeight, outWidth, outChannels];
    }
    return {
        batchSize: batchSize,
        dataFormat: dataFormat,
        inDepth: inDepth,
        inHeight: inHeight,
        inWidth: inWidth,
        inChannels: inChannels,
        outDepth: outDepth,
        outHeight: outHeight,
        outWidth: outWidth,
        outChannels: outChannels,
        padInfo: padInfo,
        strideDepth: strideDepth,
        strideHeight: strideHeight,
        strideWidth: strideWidth,
        filterDepth: filterDepth,
        filterHeight: filterHeight,
        filterWidth: filterWidth,
        dilationDepth: dilationDepth,
        dilationHeight: dilationHeight,
        dilationWidth: dilationWidth,
        inShape: inShape,
        outShape: outShape,
        filterShape: filterShape
    };
}
exports.computeConv3DInfo = computeConv3DInfo;
function computeOutputShape2D(inShape, fieldSize, stride, zeroPad, roundingMode) {
    if (zeroPad == null) {
        zeroPad = computeDefaultPad(inShape, fieldSize, stride);
    }
    var inputRows = inShape[0];
    var inputCols = inShape[1];
    var outputRows = conditionalRound((inputRows - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
    util.assert(util.isInt(outputRows), function () { return "The output # of rows (" + outputRows + ") must be an integer. " +
        "Change the stride and/or zero pad parameters"; });
    var outputCols = conditionalRound((inputCols - fieldSize + 2 * zeroPad) / stride + 1, roundingMode);
    util.assert(util.isInt(outputCols), function () { return "The output # of columns (" + outputCols + ") must be an integer. " +
        "Change the stride and/or zero pad parameters"; });
    return [outputRows, outputCols];
}
function computeDefaultPad(inputShape, fieldSize, stride, dilation) {
    if (dilation === void 0) { dilation = 1; }
    var effectiveFieldSize = getEffectiveFilterSize(fieldSize, dilation);
    return Math.floor((inputShape[0] * (stride - 1) - stride + effectiveFieldSize) / 2);
}
exports.computeDefaultPad = computeDefaultPad;
function parseTupleParam(param) {
    return typeof param === 'number' ? [param, param] : param;
}
function parse3TupleParam(param) {
    return typeof param === 'number' ? [param, param, param] : param;
}
/* See https://www.tensorflow.org/api_docs/python/tf/nn/atrous_conv2d
 * Atrous convolution is equivalent to standard convolution with upsampled
 * filters with effective_filter_height =
 * filter_height + (filter_height - 1) * (dilation - 1)
 * and effective_filter_width =
 * filter_width + (filter_width - 1) * (dilation - 1),
 * produced by inserting dilation - 1 zeros along consecutive elements across
 * the filters' spatial dimensions.
 * When there is a dilation, this converts a filter dimension to the
 * effective filter dimension, so it can be used in a standard convolution.
 */
function getEffectiveFilterSize(filterSize, dilation) {
    if (dilation <= 1) {
        return filterSize;
    }
    return filterSize + (filterSize - 1) * (dilation - 1);
}
function getPadAndOutInfo(pad, inHeight, inWidth, strideHeight, strideWidth, filterHeight, filterWidth, roundingMode) {
    var padInfo;
    var outHeight;
    var outWidth;
    if (typeof pad === 'number') {
        var padType = (pad === 0) ? 'VALID' : 'NUMBER';
        padInfo = { top: pad, bottom: pad, left: pad, right: pad, type: padType };
        var outShape = computeOutputShape2D([inHeight, inWidth], filterHeight, strideHeight, pad, roundingMode);
        outHeight = outShape[0];
        outWidth = outShape[1];
    }
    else if (pad === 'same') {
        outHeight = Math.ceil(inHeight / strideHeight);
        outWidth = Math.ceil(inWidth / strideWidth);
        var padAlongHeight = Math.max(0, (outHeight - 1) * strideHeight + filterHeight - inHeight);
        var padAlongWidth = Math.max(0, (outWidth - 1) * strideWidth + filterWidth - inWidth);
        var top_1 = Math.floor(padAlongHeight / 2);
        var bottom = padAlongHeight - top_1;
        var left = Math.floor(padAlongWidth / 2);
        var right = padAlongWidth - left;
        padInfo = { top: top_1, bottom: bottom, left: left, right: right, type: 'SAME' };
    }
    else if (pad === 'valid') {
        padInfo = { top: 0, bottom: 0, left: 0, right: 0, type: 'VALID' };
        outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
        outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
    }
    else {
        throw Error("Unknown padding parameter: " + pad);
    }
    return { padInfo: padInfo, outHeight: outHeight, outWidth: outWidth };
}
function get3DPadAndOutInfo(pad, inDepth, inHeight, inWidth, strideDepth, strideHeight, strideWidth, filterDepth, filterHeight, filterWidth) {
    var padInfo;
    var outDepth;
    var outHeight;
    var outWidth;
    if (pad === 'same') {
        outDepth = Math.ceil(inDepth / strideDepth);
        outHeight = Math.ceil(inHeight / strideHeight);
        outWidth = Math.ceil(inWidth / strideWidth);
        var padAlongDepth = (outDepth - 1) * strideDepth + filterDepth - inDepth;
        var padAlongHeight = (outHeight - 1) * strideHeight + filterHeight - inHeight;
        var padAlongWidth = (outWidth - 1) * strideWidth + filterWidth - inWidth;
        var front = Math.floor(padAlongDepth / 2);
        var back = padAlongDepth - front;
        var top_2 = Math.floor(padAlongHeight / 2);
        var bottom = padAlongHeight - top_2;
        var left = Math.floor(padAlongWidth / 2);
        var right = padAlongWidth - left;
        padInfo = { top: top_2, bottom: bottom, left: left, right: right, front: front, back: back, type: 'SAME' };
    }
    else if (pad === 'valid') {
        padInfo = {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            front: 0,
            back: 0,
            type: 'VALID'
        };
        outDepth = Math.ceil((inDepth - filterDepth + 1) / strideDepth);
        outHeight = Math.ceil((inHeight - filterHeight + 1) / strideHeight);
        outWidth = Math.ceil((inWidth - filterWidth + 1) / strideWidth);
    }
    else {
        throw Error("Unknown padding parameter: " + pad);
    }
    return { padInfo: padInfo, outDepth: outDepth, outHeight: outHeight, outWidth: outWidth };
}
/**
 * Rounds a value depending on the rounding mode
 * @param value
 * @param roundingMode
 */
function conditionalRound(value, roundingMode) {
    if (!roundingMode) {
        return value;
    }
    switch (roundingMode) {
        case 'round':
            // used for Caffe Conv
            return Math.round(value);
        case 'ceil':
            // used for Caffe Pool
            return Math.ceil(value);
        case 'floor':
            return Math.floor(value);
        default:
            throw new Error("Unknown roundingMode " + roundingMode);
    }
}
function tupleValuesAreOne(param) {
    var _a = parseTupleParam(param), dimA = _a[0], dimB = _a[1];
    return dimA === 1 && dimB === 1;
}
exports.tupleValuesAreOne = tupleValuesAreOne;
function eitherStridesOrDilationsAreOne(strides, dilations) {
    return tupleValuesAreOne(strides) || tupleValuesAreOne(dilations);
}
exports.eitherStridesOrDilationsAreOne = eitherStridesOrDilationsAreOne;
//# sourceMappingURL=conv_util.js.map