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
var util = require("../../util");
var TextureUsage;
(function (TextureUsage) {
    TextureUsage[TextureUsage["RENDER"] = 0] = "RENDER";
    TextureUsage[TextureUsage["UPLOAD"] = 1] = "UPLOAD";
    TextureUsage[TextureUsage["PIXELS"] = 2] = "PIXELS";
    TextureUsage[TextureUsage["DOWNLOAD"] = 3] = "DOWNLOAD";
})(TextureUsage = exports.TextureUsage || (exports.TextureUsage = {}));
var PhysicalTextureType;
(function (PhysicalTextureType) {
    PhysicalTextureType[PhysicalTextureType["UNPACKED_FLOAT16"] = 0] = "UNPACKED_FLOAT16";
    PhysicalTextureType[PhysicalTextureType["UNPACKED_FLOAT32"] = 1] = "UNPACKED_FLOAT32";
    PhysicalTextureType[PhysicalTextureType["PACKED_4X1_UNSIGNED_BYTE"] = 2] = "PACKED_4X1_UNSIGNED_BYTE";
    PhysicalTextureType[PhysicalTextureType["PACKED_2X2_FLOAT32"] = 3] = "PACKED_2X2_FLOAT32";
    PhysicalTextureType[PhysicalTextureType["PACKED_2X2_FLOAT16"] = 4] = "PACKED_2X2_FLOAT16";
})(PhysicalTextureType = exports.PhysicalTextureType || (exports.PhysicalTextureType = {}));
function getUnpackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns, rows];
}
exports.getUnpackedMatrixTextureShapeWidthHeight = getUnpackedMatrixTextureShapeWidthHeight;
function getUnpackedArraySizeFromMatrixSize(matrixSize, channelsPerTexture) {
    return matrixSize * channelsPerTexture;
}
exports.getUnpackedArraySizeFromMatrixSize = getUnpackedArraySizeFromMatrixSize;
function getColorMatrixTextureShapeWidthHeight(rows, columns) {
    return [columns * 4, rows];
}
exports.getColorMatrixTextureShapeWidthHeight = getColorMatrixTextureShapeWidthHeight;
/**
 * Get shape for densely packed RGBA texture.
 */
function getDenseTexShape(shape) {
    var size = util.sizeFromShape(shape);
    var texelsNeeded = Math.ceil(size / 4);
    return util.sizeToSquarishShape(texelsNeeded);
}
exports.getDenseTexShape = getDenseTexShape;
function getMatrixSizeFromUnpackedArraySize(unpackedSize, channelsPerTexture) {
    if (unpackedSize % channelsPerTexture !== 0) {
        throw new Error("unpackedSize (" + unpackedSize + ") must be a multiple of " +
            ("" + channelsPerTexture));
    }
    return unpackedSize / channelsPerTexture;
}
exports.getMatrixSizeFromUnpackedArraySize = getMatrixSizeFromUnpackedArraySize;
function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray, matrix, channels) {
    var requiredSize = unpackedArray.length * channels / 4;
    if (matrix.length < requiredSize) {
        throw new Error("matrix length (" + matrix.length + ") must be >= " + requiredSize);
    }
    var dst = 0;
    for (var src = 0; src < unpackedArray.length; src += 4) {
        for (var c = 0; c < channels; c++) {
            matrix[dst++] = unpackedArray[src + c];
        }
    }
}
exports.decodeMatrixFromUnpackedColorRGBAArray = decodeMatrixFromUnpackedColorRGBAArray;
function getPackedMatrixTextureShapeWidthHeight(rows, columns) {
    return [
        Math.max(1, Math.ceil(columns / 2)), Math.max(1, Math.ceil(rows / 2))
    ];
}
exports.getPackedMatrixTextureShapeWidthHeight = getPackedMatrixTextureShapeWidthHeight;
function getPackedRGBAArraySizeFromMatrixShape(rows, columns) {
    var _a = getPackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    return w * h * 4;
}
exports.getPackedRGBAArraySizeFromMatrixShape = getPackedRGBAArraySizeFromMatrixShape;
//# sourceMappingURL=tex_util.js.map