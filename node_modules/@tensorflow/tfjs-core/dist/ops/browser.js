"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var engine_1 = require("../engine");
var tensor_1 = require("../tensor");
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Creates a `tf.Tensor` from an image.
 *
 * ```js
 * const image = new ImageData(1, 1);
 * image.data[0] = 100;
 * image.data[1] = 150;
 * image.data[2] = 200;
 * image.data[3] = 255;
 *
 * tf.browser.fromPixels(image).print();
 * ```
 *
 * @param pixels The input image to construct the tensor from. The
 * supported image types are all 4-channel. You can also pass in an image
 * object with following attributes:
 * `{data: Uint8Array; width: number; height: number}`
 * @param numChannels The number of channels of the output tensor. A
 * numChannels value less than 4 allows you to ignore channels. Defaults to
 * 3 (ignores alpha channel of input image).
 */
/** @doc {heading: 'Browser', namespace: 'browser', ignoreCI: true} */
function fromPixels_(pixels, numChannels) {
    if (numChannels === void 0) { numChannels = 3; }
    if (numChannels > 4) {
        throw new Error('Cannot construct Tensor with more than 4 channels from pixels.');
    }
    return engine_1.ENGINE.fromPixels(pixels, numChannels);
}
/**
 * Draws a `tf.Tensor` of pixel values to a byte array or optionally a
 * canvas.
 *
 * When the dtype of the input is 'float32', we assume values in the range
 * [0-1]. Otherwise, when input is 'int32', we assume values in the range
 * [0-255].
 *
 * Returns a promise that resolves when the canvas has been drawn to.
 *
 * @param img A rank-2 or rank-3 tensor. If rank-2, draws grayscale. If
 *     rank-3, must have depth of 1, 3 or 4. When depth of 1, draws
 * grayscale. When depth of 3, we draw with the first three components of
 * the depth dimension corresponding to r, g, b and alpha = 1. When depth of
 * 4, all four components of the depth dimension correspond to r, g, b, a.
 * @param canvas The canvas to draw to.
 */
/** @doc {heading: 'Browser', namespace: 'browser'} */
function toPixels(img, canvas) {
    return __awaiter(this, void 0, void 0, function () {
        var $img, _a, height, width, depth, data, minTensor, maxTensor, _b, minVals, maxVals, min, max, multiplier, bytes, i, r, g, b, a, j, ctx, imageData;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    $img = tensor_util_env_1.convertToTensor(img, 'img', 'toPixels');
                    if (!(img instanceof tensor_1.Tensor)) {
                        // Assume int32 if user passed a native array.
                        $img = $img.toInt();
                    }
                    if ($img.rank !== 2 && $img.rank !== 3) {
                        throw new Error("toPixels only supports rank 2 or 3 tensors, got rank " + $img.rank + ".");
                    }
                    _a = $img.shape.slice(0, 2), height = _a[0], width = _a[1];
                    depth = $img.rank === 2 ? 1 : $img.shape[2];
                    if (depth > 4 || depth === 2) {
                        throw new Error("toPixels only supports depth of size " +
                            ("1, 3 or 4 but got " + depth));
                    }
                    return [4 /*yield*/, $img.data()];
                case 1:
                    data = _c.sent();
                    minTensor = $img.min();
                    maxTensor = $img.max();
                    return [4 /*yield*/, Promise.all([minTensor.data(), maxTensor.data()])];
                case 2:
                    _b = _c.sent(), minVals = _b[0], maxVals = _b[1];
                    min = minVals[0];
                    max = maxVals[0];
                    minTensor.dispose();
                    maxTensor.dispose();
                    if ($img.dtype === 'float32') {
                        if (min < 0 || max > 1) {
                            throw new Error("Tensor values for a float32 Tensor must be in the " +
                                ("range [0 - 1] but got range [" + min + " - " + max + "]."));
                        }
                    }
                    else if ($img.dtype === 'int32') {
                        if (min < 0 || max > 255) {
                            throw new Error("Tensor values for a int32 Tensor must be in the " +
                                ("range [0 - 255] but got range [" + min + " - " + max + "]."));
                        }
                    }
                    else {
                        throw new Error("Unsupported type for toPixels: " + $img.dtype + "." +
                            " Please use float32 or int32 tensors.");
                    }
                    multiplier = $img.dtype === 'float32' ? 255 : 1;
                    bytes = new Uint8ClampedArray(width * height * 4);
                    for (i = 0; i < height * width; ++i) {
                        r = void 0, g = void 0, b = void 0, a = void 0;
                        if (depth === 1) {
                            r = data[i] * multiplier;
                            g = data[i] * multiplier;
                            b = data[i] * multiplier;
                            a = 255;
                        }
                        else if (depth === 3) {
                            r = data[i * 3] * multiplier;
                            g = data[i * 3 + 1] * multiplier;
                            b = data[i * 3 + 2] * multiplier;
                            a = 255;
                        }
                        else if (depth === 4) {
                            r = data[i * 4] * multiplier;
                            g = data[i * 4 + 1] * multiplier;
                            b = data[i * 4 + 2] * multiplier;
                            a = data[i * 4 + 3] * multiplier;
                        }
                        j = i * 4;
                        bytes[j + 0] = Math.round(r);
                        bytes[j + 1] = Math.round(g);
                        bytes[j + 2] = Math.round(b);
                        bytes[j + 3] = Math.round(a);
                    }
                    if (canvas != null) {
                        canvas.width = width;
                        canvas.height = height;
                        ctx = canvas.getContext('2d');
                        imageData = new ImageData(bytes, width, height);
                        ctx.putImageData(imageData, 0, 0);
                    }
                    if ($img !== img) {
                        $img.dispose();
                    }
                    return [2 /*return*/, bytes];
            }
        });
    });
}
exports.toPixels = toPixels;
exports.fromPixels = operation_1.op({ fromPixels_: fromPixels_ });
//# sourceMappingURL=browser.js.map