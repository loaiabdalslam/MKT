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
var ResizeNearestNeighborProgram = /** @class */ (function () {
    function ResizeNearestNeighborProgram(inputShape, newHeight, newWidth, alignCorners) {
        this.variableNames = ['A'];
        this.outputShape = [];
        var batch = inputShape[0], oldHeight = inputShape[1], oldWidth = inputShape[2], depth = inputShape[3];
        this.outputShape = [batch, newHeight, newWidth, depth];
        var effectiveInSize = [
            (alignCorners && newHeight > 1) ? oldHeight - 1 : oldHeight,
            (alignCorners && newWidth > 1) ? oldWidth - 1 : oldWidth
        ];
        var effectiveOutSize = [
            (alignCorners && newHeight > 1) ? newHeight - 1 : newHeight,
            (alignCorners && newWidth > 1) ? newWidth - 1 : newWidth
        ];
        // When align corners is false, we rounds the value with floor.
        var roundBase = alignCorners ? '0.5' : '0.0';
        this.userCode = "\n      const vec2 effectiveInputOverOutputRatioRC = vec2(\n          " + effectiveInSize[0] / effectiveOutSize[0] + ",\n          " + effectiveInSize[1] / effectiveOutSize[1] + ");\n      const vec2 inputShapeRC = vec2(" + oldHeight + ".0, " + oldWidth + ".0);\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int d = coords[3];\n        ivec2 yRC = coords.yz;\n\n        // Fractional source index.\n        vec2 sourceFracIndexRC = vec2(yRC) * effectiveInputOverOutputRatioRC;\n\n        // Compute the coordinators of nearest neighbor point.\n        ivec2 sourceNearestRC = ivec2(\n          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + " + roundBase + ")));\n\n        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);\n\n        setOutput(newValue);\n      }\n    ";
    }
    return ResizeNearestNeighborProgram;
}());
exports.ResizeNearestNeighborProgram = ResizeNearestNeighborProgram;
//# sourceMappingURL=resize_nearest_neighbor_gpu.js.map