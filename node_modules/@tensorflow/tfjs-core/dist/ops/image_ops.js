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
var non_max_suppression_impl_1 = require("../backends/non_max_suppression_impl");
var engine_1 = require("../engine");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Bilinear resize a batch of 3D images to a new shape.
 *
 * @param images The images, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param size The new shape `[newHeight, newWidth]` to resize the
 *     images to. Each channel is resized individually.
 * @param alignCorners Defaults to False. If true, rescale
 *     input by `(new_height - 1) / (height - 1)`, which exactly aligns the 4
 *     corners of images and resized images. If false, rescale by
 *     `new_height / height`. Treat similarly the width dimension.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
function resizeBilinear_(images, size, alignCorners) {
    if (alignCorners === void 0) { alignCorners = false; }
    var $images = tensor_util_env_1.convertToTensor(images, 'images', 'resizeBilinear');
    util.assert($images.rank === 3 || $images.rank === 4, function () { return "Error in resizeBilinear: x must be rank 3 or 4, but got " +
        ("rank " + $images.rank + "."); });
    util.assert(size.length === 2, function () { return "Error in resizeBilinear: new shape must 2D, but got shape " +
        (size + "."); });
    var batchImages = $images;
    var reshapedTo4D = false;
    if ($images.rank === 3) {
        reshapedTo4D = true;
        batchImages =
            $images.as4D(1, $images.shape[0], $images.shape[1], $images.shape[2]);
    }
    var newHeight = size[0], newWidth = size[1];
    var forward = function (backend, save) {
        save([batchImages]);
        return backend.resizeBilinear(batchImages, newHeight, newWidth, alignCorners);
    };
    var backward = function (dy, saved) {
        return {
            batchImages: function () { return engine_1.ENGINE.runKernel(function (backend) { return backend.resizeBilinearBackprop(dy, saved[0], alignCorners); }, {}); }
        };
    };
    var res = engine_1.ENGINE.runKernel(forward, { batchImages: batchImages }, backward);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * NearestNeighbor resize a batch of 3D images to a new shape.
 *
 * @param images The images, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param size The new shape `[newHeight, newWidth]` to resize the
 *     images to. Each channel is resized individually.
 * @param alignCorners Defaults to False. If true, rescale
 *     input by `(new_height - 1) / (height - 1)`, which exactly aligns the 4
 *     corners of images and resized images. If false, rescale by
 *     `new_height / height`. Treat similarly the width dimension.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
function resizeNearestNeighbor_(images, size, alignCorners) {
    if (alignCorners === void 0) { alignCorners = false; }
    var $images = tensor_util_env_1.convertToTensor(images, 'images', 'resizeNearestNeighbor');
    util.assert($images.rank === 3 || $images.rank === 4, function () { return "Error in resizeNearestNeighbor: x must be rank 3 or 4, but got " +
        ("rank " + $images.rank + "."); });
    util.assert(size.length === 2, function () {
        return "Error in resizeNearestNeighbor: new shape must 2D, but got shape " +
            (size + ".");
    });
    util.assert($images.dtype === 'float32' || $images.dtype === 'int32', function () { return '`images` must have `int32` or `float32` as dtype'; });
    var batchImages = $images;
    var reshapedTo4D = false;
    if ($images.rank === 3) {
        reshapedTo4D = true;
        batchImages =
            $images.as4D(1, $images.shape[0], $images.shape[1], $images.shape[2]);
    }
    var newHeight = size[0], newWidth = size[1];
    var forward = function (backend, save) {
        save([batchImages]);
        return backend.resizeNearestNeighbor(batchImages, newHeight, newWidth, alignCorners);
    };
    var backward = function (dy, saved) {
        return {
            batchImages: function () { return engine_1.ENGINE.runKernel(function (backend) { return backend.resizeNearestNeighborBackprop(dy, saved[0], alignCorners); }, {}); }
        };
    };
    var res = engine_1.ENGINE.runKernel(forward, { batchImages: batchImages }, backward);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    return res;
}
/**
 * Performs non maximum suppression of bounding boxes based on
 * iou (intersection over union)
 *
 * @param boxes a 2d tensor of shape `[numBoxes, 4]`. Each entry is
 *     `[y1, x1, y2, x2]`, where `(y1, x1)` and `(y2, x2)` are the corners of
 *     the bounding box.
 * @param scores a 1d tensor providing the box scores of shape `[numBoxes]`.
 * @param maxOutputSize The maximum number of boxes to be selected.
 * @param iouThreshold A float representing the threshold for deciding whether
 *     boxes overlap too much with respect to IOU. Must be between [0, 1].
 *     Defaults to 0.5 (50% box overlap).
 * @param scoreThreshold A threshold for deciding when to remove boxes based
 *     on score. Defaults to -inf, which means any score is accepted.
 * @return A 1D tensor with the selected box indices.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
function nonMaxSuppression_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    if (iouThreshold === void 0) { iouThreshold = 0.5; }
    if (scoreThreshold === void 0) { scoreThreshold = Number.NEGATIVE_INFINITY; }
    var $boxes = tensor_util_env_1.convertToTensor(boxes, 'boxes', 'nonMaxSuppression');
    var $scores = tensor_util_env_1.convertToTensor(scores, 'scores', 'nonMaxSuppression');
    var inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
    maxOutputSize = inputs.maxOutputSize;
    iouThreshold = inputs.iouThreshold;
    scoreThreshold = inputs.scoreThreshold;
    return engine_1.ENGINE.runKernel(function (b) { return b.nonMaxSuppression($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold); }, { $boxes: $boxes });
}
/** This is the async version of `nonMaxSuppression` */
function nonMaxSuppressionAsync_(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    if (iouThreshold === void 0) { iouThreshold = 0.5; }
    if (scoreThreshold === void 0) { scoreThreshold = Number.NEGATIVE_INFINITY; }
    return __awaiter(this, void 0, void 0, function () {
        var $boxes, $scores, inputs, boxesVals, scoresVals, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $boxes = tensor_util_env_1.convertToTensor(boxes, 'boxes', 'nonMaxSuppressionAsync');
                    $scores = tensor_util_env_1.convertToTensor(scores, 'scores', 'nonMaxSuppressionAsync');
                    inputs = nonMaxSuppSanityCheck($boxes, $scores, maxOutputSize, iouThreshold, scoreThreshold);
                    maxOutputSize = inputs.maxOutputSize;
                    iouThreshold = inputs.iouThreshold;
                    scoreThreshold = inputs.scoreThreshold;
                    return [4 /*yield*/, $boxes.data()];
                case 1:
                    boxesVals = _a.sent();
                    return [4 /*yield*/, $scores.data()];
                case 2:
                    scoresVals = _a.sent();
                    res = non_max_suppression_impl_1.nonMaxSuppressionImpl(boxesVals, scoresVals, maxOutputSize, iouThreshold, scoreThreshold);
                    if ($boxes !== boxes) {
                        $boxes.dispose();
                    }
                    if ($scores !== scores) {
                        $scores.dispose();
                    }
                    return [2 /*return*/, res];
            }
        });
    });
}
function nonMaxSuppSanityCheck(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    if (iouThreshold == null) {
        iouThreshold = 0.5;
    }
    if (scoreThreshold == null) {
        scoreThreshold = Number.NEGATIVE_INFINITY;
    }
    var numBoxes = boxes.shape[0];
    maxOutputSize = Math.min(maxOutputSize, numBoxes);
    util.assert(0 <= iouThreshold && iouThreshold <= 1, function () { return "iouThreshold must be in [0, 1], but was '" + iouThreshold + "'"; });
    util.assert(boxes.rank === 2, function () { return "boxes must be a 2D tensor, but was of rank '" + boxes.rank + "'"; });
    util.assert(boxes.shape[1] === 4, function () {
        return "boxes must have 4 columns, but 2nd dimension was " + boxes.shape[1];
    });
    util.assert(scores.rank === 1, function () { return 'scores must be a 1D tensor'; });
    util.assert(scores.shape[0] === numBoxes, function () { return "scores has incompatible shape with boxes. Expected " + numBoxes + ", " +
        ("but was " + scores.shape[0]); });
    return { maxOutputSize: maxOutputSize, iouThreshold: iouThreshold, scoreThreshold: scoreThreshold };
}
/**
 * Extracts crops from the input image tensor and resizes them using bilinear
 * sampling or nearest neighbor sampling (possibly with aspect ratio change)
 * to a common output size specified by crop_size.
 *
 * @param image 4d tensor of shape `[batch,imageHeight,imageWidth, depth]`,
 *     where imageHeight and imageWidth must be positive, specifying the
 *     batch of images from which to take crops
 * @param boxes 2d float32 tensor of shape `[numBoxes, 4]`. Each entry is
 *     `[y1, x1, y2, x2]`, where `(y1, x1)` and `(y2, x2)` are the normalized
 *     coordinates of the box in the boxInd[i]'th image in the batch
 * @param boxInd 1d int32 tensor of shape `[numBoxes]` with values in range
 *     `[0, batch)` that specifies the image that the `i`-th box refers to.
 * @param cropSize 1d int32 tensor of 2 elements `[cropHeigh, cropWidth]`
 *     specifying the size to which all crops are resized to.
 * @param method Optional string from `'bilinear' | 'nearest'`,
 *     defaults to bilinear, which specifies the sampling method for resizing
 * @param extrapolationValue A threshold for deciding when to remove boxes based
 *     on score. Defaults to 0.
 * @return A 4D tensor of the shape `[numBoxes,cropHeight,cropWidth,depth]`
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
function cropAndResize_(image, boxes, boxInd, cropSize, method, extrapolationValue) {
    var $image = tensor_util_env_1.convertToTensor(image, 'image', 'cropAndResize', 'float32');
    var $boxes = tensor_util_env_1.convertToTensor(boxes, 'boxes', 'cropAndResize', 'float32');
    var $boxInd = tensor_util_env_1.convertToTensor(boxInd, 'boxInd', 'cropAndResize', 'int32');
    method = method || 'bilinear';
    extrapolationValue = extrapolationValue || 0;
    var numBoxes = $boxes.shape[0];
    util.assert($image.rank === 4, function () { return 'Error in cropAndResize: image must be rank 4,' +
        ("but got rank " + $image.rank + "."); });
    util.assert($boxes.rank === 2 && $boxes.shape[1] === 4, function () { return "Error in cropAndResize: boxes must be have size [" + numBoxes + ",4] " +
        ("but had shape " + $boxes.shape + "."); });
    util.assert($boxInd.rank === 1 && $boxInd.shape[0] === numBoxes, function () { return "Error in cropAndResize: boxInd must be have size [" + numBoxes + "] " +
        ("but had shape " + $boxes.shape + "."); });
    util.assert(cropSize.length === 2, function () { return "Error in cropAndResize: cropSize must be of length 2, but got " +
        ("length " + cropSize.length + "."); });
    util.assert(cropSize[0] >= 1 && cropSize[1] >= 1, function () { return "cropSize must be atleast [1,1], but was " + cropSize; });
    util.assert(method === 'bilinear' || method === 'nearest', function () { return "method must be bilinear or nearest, but was " + method; });
    var forward = function (backend, save) {
        return backend.cropAndResize($image, $boxes, $boxInd, cropSize, method, extrapolationValue);
    };
    var res = engine_1.ENGINE.runKernel(forward, { $image: $image, $boxes: $boxes });
    return res;
}
exports.resizeBilinear = operation_1.op({ resizeBilinear_: resizeBilinear_ });
exports.resizeNearestNeighbor = operation_1.op({ resizeNearestNeighbor_: resizeNearestNeighbor_ });
exports.nonMaxSuppression = operation_1.op({ nonMaxSuppression_: nonMaxSuppression_ });
exports.nonMaxSuppressionAsync = nonMaxSuppressionAsync_;
exports.cropAndResize = operation_1.op({ cropAndResize_: cropAndResize_ });
//# sourceMappingURL=image_ops.js.map