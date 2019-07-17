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
var conv_util = require("./conv_util");
var operation_1 = require("./operation");
/**
 * Computes a 1D convolution over the input x.
 *
 * @param x The input tensor, of rank 3 or rank 2, of shape
 *     `[batch, width, inChannels]`. If rank 2, batch of 1 is assumed.
 * @param filter The filter, rank 3, of shape
 *     `[filterWidth, inDepth, outDepth]`.
 * @param stride The number of entries by which the filter is moved right at
 *     each step.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dataFormat An optional string from "NWC", "NCW". Defaults to "NWC",
 *     the data is stored in the order of [batch, in_width, in_channels]. Only
 *     "NWC" is currently supported.
 * @param dilation The dilation rate in which we sample input values in
 *     atrous convolution. Defaults to `1`. If it is greater than 1, then
 *     stride must be `1`.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function conv1d_(x, filter, stride, pad, dataFormat, dilation, dimRoundingMode) {
    if (dataFormat === void 0) { dataFormat = 'NWC'; }
    if (dilation === void 0) { dilation = 1; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'conv1d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'conv1d');
    var x3D = $x;
    var reshapedTo3D = false;
    if ($x.rank === 2) {
        reshapedTo3D = true;
        x3D = $x.as3D(1, $x.shape[0], $x.shape[1]);
    }
    util.assert(x3D.rank === 3, function () { return "Error in conv1d: input must be rank 3, but got rank " + x3D.rank + "."; });
    util.assert($filter.rank === 3, function () { return "Error in conv1d: filter must be rank 3, but got rank " +
        ($filter.rank + "."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in conv1d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    util.assert(x3D.shape[2] === $filter.shape[1], function () { return "Error in conv1d: depth of input (" + x3D.shape[2] + ") must match " +
        ("input depth for filter " + $filter.shape[1] + "."); });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(stride, dilation), function () { return 'Error in conv1D: Either stride or dilation must be 1. ' +
        ("Got stride " + stride + " and dilation '" + dilation + "'"); });
    util.assert(dataFormat === 'NWC', function () { return "Error in conv1d: got dataFormat of " + dataFormat + " but only NWC is currently supported."; });
    var filter4D = $filter.as4D(1, $filter.shape[0], $filter.shape[1], $filter.shape[2]);
    var input4D = x3D.as4D(x3D.shape[0], 1, x3D.shape[1], x3D.shape[2]);
    var strides = [1, stride];
    var dilations = [1, dilation];
    var conv2dDataFormat = 'NHWC';
    var res = exports.conv2d(input4D, filter4D, strides, pad, conv2dDataFormat, dilations, dimRoundingMode);
    if (reshapedTo3D) {
        return res.as2D(res.shape[2], res.shape[3]);
    }
    return res.as3D(res.shape[0], res.shape[2], res.shape[3]);
}
/**
 * Computes a 2D convolution over the input x.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter, rank 4, of shape
 *     `[filterHeight, filterWidth, inDepth, outDepth]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `dilations` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function conv2d_(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode) {
    if (dataFormat === void 0) { dataFormat = 'NHWC'; }
    if (dilations === void 0) { dilations = [1, 1]; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'conv2d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'conv2d');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in conv2d: input must be rank 4, but got rank " + x4D.rank + "."; });
    util.assert($filter.rank === 4, function () { return "Error in conv2d: filter must be rank 4, but got rank " +
        ($filter.rank + "."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in conv2d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    util.assert(x4D.shape[3] === $filter.shape[2], function () { return "Error in conv2d: depth of input (" + x4D.shape[3] + ") must match " +
        ("input depth for filter " + $filter.shape[2] + "."); });
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in conv2D: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    util.assert(dataFormat === 'NHWC', function () { return "Error in conv2d: got dataFormat of " + dataFormat + " but only NHWC is currently supported."; });
    var convInfo = conv_util.computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode);
    var grad = function (dy, saved) {
        var _a = saved, $filter = _a[0], x4D = _a[1];
        util.assert(conv_util.tupleValuesAreOne(dilations), function () { return 'Error in gradient of conv2D: dilation rates greater than 1 ' +
            ("are not yet supported in gradients. Got dilations '" + dilations + "'"); });
        return {
            x: function () { return conv2dDerInput_(x4D.shape, dy, $filter, strides, pad); },
            $filter: function () { return conv2dDerFilter_(x4D, dy, $filter.shape, strides, pad); }
        };
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.conv2d(x4D, $filter, convInfo);
        save([$filter, x4D]);
        return res;
    }, { x: x4D, $filter: $filter }, grad);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes the derivative of the input of a 2D convolution.
 *
 * @param xShape The shape of the input: [batch, height, width, inDepth].
 * If length of 3, batch of 1 is assumed.
 * @param dy The derivative of the output, of rank 4 or rank 3 of shape
 *   `[batch, outHeight, outWidth, outDepth]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter, rank 4, of shape
 *     `[filterHeight, filterWidth, inDepth, outDepth]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm used:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
function conv2dDerInput_(xShape, dy, filter, strides, pad, dimRoundingMode) {
    util.assert(xShape.length === dy.rank, function () { return "Length of inShape " +
        ("(" + xShape.length + ") and rank of dy (" + dy.rank + ") must match"); });
    var xShape4D = xShape;
    var dy4D = dy;
    var reshapedTo4D = false;
    if (dy.rank === 3) {
        reshapedTo4D = true;
        dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
        xShape4D = [1, xShape[0], xShape[1], xShape[2]];
    }
    var inDepth = xShape4D[3];
    var outDepth = dy4D.shape[3];
    util.assert(xShape4D.length === 4, function () {
        return "Error in conv2dDerInput: inShape must be length 4, but got length " +
            (xShape4D.length + ".");
    });
    util.assert(dy4D.rank === 4, function () { return "Error in conv2dDerInput: dy must be rank 4, but got " +
        ("rank " + dy4D.rank); });
    util.assert(filter.rank === 4, function () { return "Error in conv2dDerInput: filter must be rank 4, but got " +
        ("rank " + filter.rank); });
    util.assert(inDepth === filter.shape[2], function () { return "Error in conv2dDerInput: depth of input (" + inDepth + ") must " +
        ("match input depth for filter " + filter.shape[2] + "."); });
    util.assert(outDepth === filter.shape[3], function () { return "Error in conv2dDerInput: depth of output (" + outDepth + ") must " +
        ("match output depth for filter " + filter.shape[3] + "."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in conv2dDerInput: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var dilations = 1;
    var grad = function (ddx, saved) {
        var dataFormat = 'NHWC';
        var filter = saved[0], dy4D = saved[1];
        return {
            dy4D: function () { return exports.conv2d(ddx, filter, strides, pad, dataFormat, dilations, dimRoundingMode); },
            filter: function () { return exports.conv2dDerFilter(ddx, dy4D, filter.shape, strides, pad, dimRoundingMode); }
        };
    };
    var convInfo = conv_util.computeConv2DInfo(xShape4D, filter.shape, strides, dilations, pad, dimRoundingMode);
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.conv2dDerInput(dy4D, filter, convInfo);
        save([filter, dy4D]);
        return res;
    }, { dy4D: dy4D, filter: filter }, grad);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Computes the derivative of the filter of a 2D convolution.
 *
 * @param x The input tensor, of rank 4 or rank 3 of shape
 *     [batch, height, width, inChannels]. If rank 3, batch of 1 is assumed.
 * @param dy The dy image, of rank 4 or rank 3, of shape
 *     [batch, height, width, outDepth]. If rank 3, batch of 1 is assumed.
 * @param filterShape The shape of the filter, length 4,
 *     [filterHeight, filterWidth, inDepth, outDepth].
 * @param strides The strides of the convolution: [strideHeight,
 * strideWidth].
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 * @param dimRoundingMode A string from: 'ceil', 'round', 'floor'. The
 *     rounding mode used when computing output dimensions if pad is a
 *     number. If none is provided, it will not round and error if the output
 *     is of fractional size.
 */
function conv2dDerFilter_(x, dy, filterShape, strides, pad, dimRoundingMode) {
    var x4D = x;
    if (x.rank === 3) {
        x4D = x.as4D(1, x.shape[0], x.shape[1], x.shape[2]);
    }
    var dy4D = dy;
    if (dy4D.rank === 3) {
        dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in conv2dDerFilter: input must be rank 4, but got shape " +
        (x4D.shape + "."); });
    util.assert(dy4D.rank === 4, function () { return "Error in conv2dDerFilter: dy must be rank 4, but got shape " +
        (dy4D.shape + "."); });
    util.assert(filterShape.length === 4, function () { return "Error in conv2dDerFilter: filterShape must be length 4, but got " +
        (filterShape + "."); });
    util.assert(x4D.shape[3] === filterShape[2], function () { return "Error in conv2dDerFilter: depth of input " + x4D.shape[3] + ") must " +
        ("match input depth in filter (" + filterShape[2] + "."); });
    util.assert(dy4D.shape[3] === filterShape[3], function () { return "Error in conv2dDerFilter: depth of dy (" + dy4D.shape[3] + ") must " +
        ("match output depth for filter (" + filterShape[3] + ")."); });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in conv2dDerFilter: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var dilations = 1;
    var convInfo = conv_util.computeConv2DInfo(x4D.shape, filterShape, strides, dilations, pad, dimRoundingMode);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.conv2dDerFilter(x4D, dy4D, convInfo); }, { x4D: x4D, dy4D: dy4D });
}
/**
 * Computes the transposed 2D convolution of an image, also known as a
 * deconvolution.
 *
 * @param x The input image, of rank 4 or rank 3, of shape
 *   `[batch, height, width, inDepth]`. If rank 3, batch of 1 is assumed.
 * @param filter The filter, rank 4, of shape
 *     `[filterHeight, filterWidth, outDepth, inDepth]`.
 *     `inDepth` must match `inDepth` in `x`.
 * @param outputShape Output shape, of rank 4 or rank 3:
 *     `[batch, height, width, outDepth]`. If rank 3, batch of 1 is assumed.
 * @param strides The strides of the original convolution:
 *     `[strideHeight, strideWidth]`.
 * @param pad  The type of padding algorithm used in the non-transpose version
 *    of the op.
 * @param dimRoundingMode The rounding mode used when computing output
 *    dimensions if pad is a number. If none is provided, it will not round
 *    and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function conv2dTranspose_(x, filter, outputShape, strides, pad, dimRoundingMode) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'conv2dTranspose');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'conv2dTranspose');
    return conv2dDerInput_(outputShape, $x, $filter, strides, pad, dimRoundingMode);
}
/**
 * Depthwise 2D convolution.
 *
 * Given a 4D `input` array and a `filter` array of shape
 * `[filterHeight, filterWidth, inChannels, channelMultiplier]` containing
 * `inChannels` convolutional filters of depth 1, this op applies a
 * different filter to each input channel (expanding from 1 channel to
 * `channelMultiplier` channels for each), then concatenates the results
 * together. The output has `inChannels * channelMultiplier` channels.
 *
 * See
 * [https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d](
 *     https://www.tensorflow.org/api_docs/python/tf/nn/depthwise_conv2d)
 * for more details.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param filter The filter tensor, rank 4, of shape
 *     `[filterHeight, filterWidth, inChannels, channelMultiplier]`.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`. If strides is a single number, then `strideHeight ==
 * strideWidth`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `rate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 * @param dimRoundingMode The rounding mode used when computing output
 *     dimensions if pad is a number. If none is provided, it will not round
 *     and error if the output is of fractional size.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function depthwiseConv2d_(x, filter, strides, pad, dataFormat, dilations, dimRoundingMode) {
    if (dataFormat === void 0) { dataFormat = 'NHWC'; }
    if (dilations === void 0) { dilations = [1, 1]; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'depthwiseConv2d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'depthwiseConv2d');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    util.assert(x4D.rank === 4, function () { return "Error in depthwiseConv2d: input must be rank 4, but got " +
        ("rank " + x4D.rank + "."); });
    util.assert($filter.rank === 4, function () { return "Error in depthwiseConv2d: filter must be rank 4, but got rank " +
        ($filter.rank + "."); });
    util.assert(x4D.shape[3] === $filter.shape[2], function () { return "Error in depthwiseConv2d: number of input channels " +
        ("(" + x4D.shape[3] + ") must match the inChannels dimension in ") +
        ("filter " + $filter.shape[2] + "."); });
    if (dilations == null) {
        dilations = [1, 1];
    }
    util.assert(conv_util.eitherStridesOrDilationsAreOne(strides, dilations), function () {
        return 'Error in depthwiseConv2d: Either strides or dilations must be 1. ' +
            ("Got strides " + strides + " and dilations '" + dilations + "'");
    });
    if (dimRoundingMode != null) {
        util.assert(util.isInt(pad), function () { return "Error in depthwiseConv2d: pad must be an integer when using, " +
            ("dimRoundingMode " + dimRoundingMode + " but got pad " + pad + "."); });
    }
    var convInfo = conv_util.computeConv2DInfo(x4D.shape, $filter.shape, strides, dilations, pad, dimRoundingMode, true /* depthwise */);
    var grad = function (dy, saved) {
        util.assert(conv_util.tupleValuesAreOne(dilations), function () { return 'Error in gradient of depthwiseConv2d: dilation rates ' +
            "greater than 1 are not yet supported. Got dilations " +
            ("'" + dilations + "'"); });
        var x4D = saved[0], $filter = saved[1];
        return {
            x: function () { return depthwiseConv2dDerInput(x4D.shape, dy, $filter, convInfo); },
            $filter: function () { return depthwiseConv2dDerFilter(x4D, dy, $filter.shape, convInfo); },
        };
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.depthwiseConv2D(x4D, $filter, convInfo);
        save([x4D, $filter]);
        return res;
    }, { x: x4D, $filter: $filter }, grad);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * 2-D convolution with separable filters.
 *
 * Performs a depthwise convolution that acts separately on channels followed
 * by a pointwise convolution that mixes channels. Note that this is
 * separability between dimensions [1, 2] and 3, not spatial separability
 * between dimensions 1 and 2.
 *
 * See
 * [https://www.tensorflow.org/api_docs/python/tf/nn/separable_conv2d](
 *     https://www.tensorflow.org/api_docs/python/tf/nn/separable_conv2d)
 * for more details.
 *
 * @param x The input tensor, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is
 * assumed.
 * @param depthwiseFilter The depthwise filter tensor, rank 4, of shape
 *     `[filterHeight, filterWidth, inChannels, channelMultiplier]`. This is
 *     the filter used in the first step.
 * @param pointwiseFilter The pointwise filter tensor, rank 4, of shape
 *     `[1, 1, inChannels * channelMultiplier, outChannels]`. This is
 *     the filter used in the second step.
 * @param strides The strides of the convolution: `[strideHeight,
 * strideWidth]`. If strides is a single number, then `strideHeight ==
 * strideWidth`.
 * @param pad The type of padding algorithm.
 *   - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *   - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dilations The dilation rates: `[dilationHeight, dilationWidth]`
 *     in which we sample input values across the height and width dimensions
 *     in atrous convolution. Defaults to `[1, 1]`. If `rate` is a single
 *     number, then `dilationHeight == dilationWidth`. If it is greater than
 *     1, then all values of `strides` must be 1.
 * @param dataFormat: An optional string from: "NHWC", "NCHW". Defaults to
 *     "NHWC". Specify the data format of the input and output data. With the
 *     default format "NHWC", the data is stored in the order of: [batch,
 *     height, width, channels]. Only "NHWC" is currently supported.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function separableConv2d_(x, depthwiseFilter, pointwiseFilter, strides, pad, dilation, dataFormat) {
    if (dilation === void 0) { dilation = [1, 1]; }
    if (dataFormat === void 0) { dataFormat = 'NHWC'; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'separableConv2d');
    var $depthwiseFilter = tensor_util_env_1.convertToTensor(depthwiseFilter, 'depthwiseFilter', 'separableConv2d');
    var $pointwiseFilter = tensor_util_env_1.convertToTensor(pointwiseFilter, 'pointwiseFilter', 'separableConv2d');
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    if (dataFormat === 'NCHW') {
        throw new Error('separableConv2d currently does not support dataFormat NCHW; only ' +
            'NHWC is supported');
    }
    util.assert(x4D.rank === 4, function () { return "Error in separableConv2d: input must be rank 4, but got " +
        ("rank " + x4D.rank + "."); });
    util.assert($depthwiseFilter.rank === 4, function () { return "Error in separableConv2d: depthwise filter must be rank 4, but " +
        ("got rank " + $depthwiseFilter.rank + "."); });
    util.assert($pointwiseFilter.rank === 4, function () { return "Error in separableConv2d: pointwise filter must be rank 4, but " +
        ("got rank " + $depthwiseFilter.rank + "."); });
    util.assert($pointwiseFilter.shape[0] === 1, function () {
        return "Error in separableConv2d: the first dimension of pointwise filter " +
            (" must be 1, but got " + $pointwiseFilter.shape[0] + ".");
    });
    util.assert($pointwiseFilter.shape[1] === 1, function () { return "Error in separableConv2d: the second dimension of pointwise " +
        ("filter must be 1, but got " + $pointwiseFilter.shape[1] + "."); });
    var inChannels = $depthwiseFilter.shape[2];
    var channelMultiplier = $depthwiseFilter.shape[3];
    util.assert($pointwiseFilter.shape[2] === inChannels * channelMultiplier, function () {
        return "Error in separableConv2d: the third dimension of pointwise filter " +
            ("must be " + inChannels * channelMultiplier + ", ") +
            ("but got " + $pointwiseFilter.shape[2] + ".");
    });
    var depthwise = exports.depthwiseConv2d(x4D, $depthwiseFilter, strides, pad, dataFormat, dilation);
    var pointwiseStride = 1;
    var res = exports.conv2d(depthwise, $pointwiseFilter, pointwiseStride, 'valid', dataFormat);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
function parseTupleParam(param) {
    if (typeof param === 'number') {
        return [param, param, param];
    }
    if (param.length === 2) {
        return [param[0], param[1], 1];
    }
    return param;
}
function tupleValuesAreOne(param) {
    var _a = parseTupleParam(param), dimA = _a[0], dimB = _a[1], dimC = _a[2];
    return dimA === 1 && dimB === 1 && dimC === 1;
}
function eitherStridesOrDilationsAreOne(strides, dilations) {
    return tupleValuesAreOne(strides) || tupleValuesAreOne(dilations);
}
function depthwiseConv2dDerInput(xShape, dy, filter, convInfo) {
    var dy4D = dy;
    var reshapedTo4D = false;
    if (dy.rank === 3) {
        reshapedTo4D = true;
        dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
    }
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.depthwiseConv2DDerInput(dy4D, filter, convInfo); }, { dy4D: dy4D });
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
function depthwiseConv2dDerFilter(x, dy, filterShape, convInfo) {
    var x4D = x;
    if (x.rank === 3) {
        x4D = x.as4D(1, x.shape[0], x.shape[1], x.shape[2]);
    }
    var dy4D = dy;
    if (dy4D.rank === 3) {
        dy4D = dy.as4D(1, dy.shape[0], dy.shape[1], dy.shape[2]);
    }
    return engine_1.ENGINE.runKernel(function (backend) { return backend.depthwiseConv2DDerFilter(x4D, dy4D, convInfo); }, { x4D: x4D, dy4D: dy4D });
}
/**
 * Computes a 3D convolution over the input x.
 *
 * @param x The input tensor, of rank 5 or rank 4, of shape
 *     `[batch, depth, height, width, channels]`. If rank 4,
 * batch of 1 is assumed.
 * @param filter The filter, rank 5, of shape
 *     `[filterDepth, filterHeight, filterWidth, inChannels, outChannels]`.
 *      inChannels must match between input and filter.
 * @param strides The strides of the convolution: `[strideDepth, strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm.
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 *   - For more info, see this guide:
 *     [https://www.tensorflow.org/api_guides/python/nn#Convolution](
 *          https://www.tensorflow.org/api_guides/python/nn#Convolution)
 * @param dataFormat: An optional string from: "NDHWC", "NCDHW". Defaults to
 *     "NDHWC". Specify the data format of the input and output data. With the
 *     default format "NDHWC", the data is stored in the order of: [batch,
 *     depth, height, width, channels]. Only "NDHWC" is currently supported.
 * @param dilations The dilation rates: `[dilationDepth, dilationHeight,
 *     dilationWidth]` in which we sample input values across the height
 *     and width dimensions in atrous convolution. Defaults to `[1, 1, 1]`.
 *     If `dilations` is a single number, then
 *     `dilationDepth == dilationHeight == dilationWidth`. If it is greater
 *     than 1, then all values of `strides` must be 1.
 */
/** @doc {heading: 'Operations', subheading: 'Convolution'} */
function conv3d_(x, filter, strides, pad, dataFormat, dilations) {
    if (dataFormat === void 0) { dataFormat = 'NDHWC'; }
    if (dilations === void 0) { dilations = [1, 1, 1]; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'conv3d');
    var $filter = tensor_util_env_1.convertToTensor(filter, 'filter', 'conv3d');
    var x5D = $x;
    var reshapedTo5D = false;
    if ($x.rank === 4) {
        reshapedTo5D = true;
        x5D = $x.as5D(1, $x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]);
    }
    util.assert(x5D.rank === 5, function () { return "Error in conv3d: input must be rank 5, but got rank " + x5D.rank + "."; });
    util.assert($filter.rank === 5, function () { return "Error in conv3d: filter must be rank 5, but got rank " +
        ($filter.rank + "."); });
    util.assert(x5D.shape[4] === $filter.shape[3], function () { return "Error in conv3d: depth of input (" + x5D.shape[4] + ") must match " +
        ("input depth for filter " + $filter.shape[3] + "."); });
    util.assert(eitherStridesOrDilationsAreOne(strides, dilations), function () { return 'Error in conv3D: Either strides or dilations must be 1. ' +
        ("Got strides " + strides + " and dilations '" + dilations + "'"); });
    util.assert(dataFormat === 'NDHWC', function () { return "Error in conv3d: got dataFormat of " + dataFormat + " but only NDHWC is currently supported."; });
    var convInfo = conv_util.computeConv3DInfo(x5D.shape, $filter.shape, strides, dilations, pad);
    var grad = function (dy, saved) {
        util.assert(tupleValuesAreOne(dilations), function () {
            return 'Error in gradient of conv3D: dilation rates greater than 1 are ' +
                ("not yet supported in gradients. Got dilations '" + dilations + "'");
        });
        var x5D = saved[0], $filter = saved[1];
        return {
            x: function () { return conv3dDerInput_(x5D.shape, dy, $filter, strides, pad); },
            $filter: function () { return conv3dDerFilter_(x5D, dy, $filter.shape, strides, pad); }
        };
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.conv3d(x5D, $filter, convInfo);
        save([x5D, $filter]);
        return res;
    }, { x: x5D, $filter: $filter }, grad);
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the derivative of the input of a 3D convolution.
 *
 * @param xShape The shape of the input: [batch, depth, height, width,
 * in_channels]. If length of 4, batch of 1 is assumed.
 * @param dy The derivative of the output, of rank 5 or rank 4 of shape
 *   `[batch, outDepth, outHeight, outWidth, in_channels]`.
 * If rank 4, batch of 1 is assumed.
 * @param filter The filter, rank 5, of shape
 *     `[filterDepth, filterHeight, filterWidth, inDepth, outDepth]`.
 * @param strides The strides of the convolution: `[strideDepth, strideHeight,
 * strideWidth]`.
 * @param pad The type of padding algorithm used:
 *    - `same` and stride 1: output will be of same size as input,
 *       regardless of filter size.
 *    - `valid`: output will be smaller than input if filter is larger
 *       than 1x1.
 */
function conv3dDerInput_(xShape, dy, filter, strides, pad) {
    util.assert(xShape.length === dy.rank, function () { return "Length of inShape " +
        ("(" + xShape.length + ") and rank of dy (" + dy.rank + ") must match"); });
    var xShape5D = xShape;
    var dy5D = dy;
    var reshapedTo5D = false;
    if (dy.rank === 4) {
        reshapedTo5D = true;
        dy5D = dy.as5D(1, dy.shape[0], dy.shape[1], dy.shape[2], dy.shape[3]);
        xShape5D = [1, xShape[0], xShape[1], xShape[2], xShape[3]];
    }
    var inDepth = xShape5D[4];
    var outDepth = dy5D.shape[4];
    util.assert(xShape5D.length === 5, function () {
        return "Error in conv3dDerInput: inShape must be length 5, but got length " +
            (xShape5D.length + ".");
    });
    util.assert(dy5D.rank === 5, function () { return "Error in conv3dDerInput: dy must be rank 5, but got " +
        ("rank " + dy5D.rank); });
    util.assert(filter.rank === 5, function () { return "Error in conv3dDerInput: filter must be rank 5, but got " +
        ("rank " + filter.rank); });
    util.assert(inDepth === filter.shape[3], function () { return "Error in conv3dDerInput: depth of input (" + inDepth + ") must " +
        ("match input depth for filter " + filter.shape[3] + "."); });
    util.assert(outDepth === filter.shape[4], function () { return "Error in conv3dDerInput: depth of output (" + outDepth + ") must " +
        ("match output depth for filter " + filter.shape[4] + "."); });
    var dilations = 1;
    var convInfo = conv_util.computeConv3DInfo(xShape5D, filter.shape, strides, dilations, pad);
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.conv3dDerInput(dy5D, filter, convInfo); }, { dy5D: dy5D });
    if (reshapedTo5D) {
        return res.as4D(res.shape[1], res.shape[2], res.shape[3], res.shape[4]);
    }
    return res;
}
/**
 * Computes the derivative of the filter of a 3D convolution.
 *
 * @param x The input tensor, of rank 5 or rank 4 of shape
 *     [batch, depth, height, width, inChannels]. If rank 4, batch of 1 is
 *     assumed.
 * @param dy The dy image, of rank 5 or rank 4, of shape
 *     [batch, depth, height, width, outDepth]. If rank 4, batch of 1 is
 *     assumed.
 * @param filterShape The shape of the filter, length 5,
 *     [filterDepth, filterHeight, filterWidth, inDepth, outDepth].
 * @param strides The strides of the convolution: [strideDepth, strideHeight,
 * strideWidth].
 * @param pad A string from: 'same', 'valid'. The type of padding algorithm
 *     used in the forward prop of the op.
 */
function conv3dDerFilter_(x, dy, filterShape, strides, pad) {
    var x5D = x;
    if (x.rank === 4) {
        x5D = x.as5D(1, x.shape[0], x.shape[1], x.shape[2], x.shape[3]);
    }
    var dy5D = dy;
    if (dy5D.rank === 4) {
        dy5D = dy.as5D(1, dy.shape[0], dy.shape[1], dy.shape[2], dy.shape[3]);
    }
    util.assert(x5D.rank === 5, function () { return "Error in conv3dDerFilter: input must be rank 5, but got shape " +
        (x5D.shape + "."); });
    util.assert(dy5D.rank === 5, function () { return "Error in conv3dDerFilter: dy must be rank 5, but got shape " +
        (dy5D.shape + "."); });
    util.assert(filterShape.length === 5, function () { return "Error in conv3dDerFilter: filterShape must be length 5, but got " +
        (filterShape + "."); });
    util.assert(x5D.shape[4] === filterShape[3], function () { return "Error in conv3dDerFilter: depth of input " + x5D.shape[4] + ") must " +
        ("match input depth in filter (" + filterShape[3] + "."); });
    util.assert(dy5D.shape[4] === filterShape[4], function () { return "Error in conv3dDerFilter: depth of dy (" + dy5D.shape[4] + ") must " +
        ("match output depth for filter (" + filterShape[4] + ")."); });
    var dilations = 1;
    var convInfo = conv_util.computeConv3DInfo(x5D.shape, filterShape, strides, dilations, pad);
    return engine_1.ENGINE.runKernel(function (backend) { return backend.conv3dDerFilter(x5D, dy5D, convInfo); }, { x5D: x5D, dy5D: dy5D });
}
exports.conv1d = operation_1.op({ conv1d_: conv1d_ });
exports.conv2d = operation_1.op({ conv2d_: conv2d_ });
exports.conv3d = operation_1.op({ conv3d_: conv3d_ });
exports.conv2dDerFilter = operation_1.op({ conv2dDerFilter_: conv2dDerFilter_ });
exports.depthwiseConv2d = operation_1.op({ depthwiseConv2d_: depthwiseConv2d_ });
exports.separableConv2d = operation_1.op({ separableConv2d_: separableConv2d_ });
exports.conv2dTranspose = operation_1.op({ conv2dTranspose_: conv2dTranspose_ });
//# sourceMappingURL=conv.js.map