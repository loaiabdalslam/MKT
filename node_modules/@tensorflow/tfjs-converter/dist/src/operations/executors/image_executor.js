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
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'ResizeBilinear': {
            var images = utils_1.getParamValue('images', node, tensorMap, context);
            var size = utils_1.getParamValue('size', node, tensorMap, context);
            var alignCorners = utils_1.getParamValue('alignCorners', node, tensorMap, context);
            return [tfc.image.resizeBilinear(images, [size[0], size[1]], alignCorners)];
        }
        case 'ResizeNearestNeighbor': {
            var images = utils_1.getParamValue('images', node, tensorMap, context);
            var size = utils_1.getParamValue('size', node, tensorMap, context);
            var alignCorners = utils_1.getParamValue('alignCorners', node, tensorMap, context);
            return [tfc.image.resizeNearestNeighbor(images, [size[0], size[1]], alignCorners)];
        }
        case 'CropAndResize': {
            var image = utils_1.getParamValue('image', node, tensorMap, context);
            var boxes = utils_1.getParamValue('boxes', node, tensorMap, context);
            var boxInd = utils_1.getParamValue('boxInd', node, tensorMap, context);
            var cropSize = utils_1.getParamValue('cropSize', node, tensorMap, context);
            var method = utils_1.getParamValue('method', node, tensorMap, context);
            var extrapolationValue = utils_1.getParamValue('extrapolationValue', node, tensorMap, context);
            return [tfc.image.cropAndResize(image, boxes, boxInd, cropSize, method, extrapolationValue)];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'image';
//# sourceMappingURL=image_executor.js.map