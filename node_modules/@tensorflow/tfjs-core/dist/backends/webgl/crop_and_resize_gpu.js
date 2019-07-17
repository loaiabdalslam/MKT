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
var CropAndResizeProgram = /** @class */ (function () {
    function CropAndResizeProgram(imageShape, boxShape, cropSize, method, extrapolationValue) {
        this.variableNames = ['Image', 'Boxes', 'BoxInd'];
        this.outputShape = [];
        var batch = imageShape[0], imageHeight = imageShape[1], imageWidth = imageShape[2], depth = imageShape[3];
        var numBoxes = boxShape[0];
        var cropHeight = cropSize[0], cropWidth = cropSize[1];
        this.outputShape = [numBoxes, cropHeight, cropWidth, depth];
        var methodId = method === 'bilinear' ? 1 : 0;
        var _a = [imageHeight - 1 + ".0", imageWidth - 1 + ".0"], inputHeightFloat = _a[0], inputWidthFloat = _a[1];
        var _b = cropHeight > 1 ?
            [
                "" + (imageHeight - 1) / (cropHeight - 1),
                '(y2-y1) * height_ratio',
                "y1*" + inputHeightFloat + " + float(y)*(height_scale)",
            ] :
            [
                '0.0',
                '0.0',
                "0.5 * (y1+y2) * " + inputHeightFloat,
            ], heightRatio = _b[0], heightScale = _b[1], inY = _b[2];
        var _c = cropWidth > 1 ?
            [
                "" + (imageWidth - 1) / (cropWidth - 1),
                '(x2-x1) * width_ratio',
                "x1*" + inputWidthFloat + " + float(x)*(width_scale)",
            ] :
            [
                '0.0',
                '0.0',
                "0.5 * (x1+x2) * " + inputWidthFloat,
            ], widthRatio = _c[0], widthScale = _c[1], inX = _c[2];
        // Reference implementation
        // tslint:disable-next-line:max-line-length
        // https://github.com/tensorflow/tensorflow/blob/master/tensorflow/core/kernels/crop_and_resize_op_gpu.cu.cc
        this.userCode = "\n      const float height_ratio = float(" + heightRatio + ");\n      const float width_ratio = float(" + widthRatio + ");\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int y = coords[1];\n        int x = coords[2];\n        int d = coords[3];\n\n        // get box vals\n        float y1 = getBoxes(b,0);\n        float x1 = getBoxes(b,1);\n        float y2 = getBoxes(b,2);\n        float x2 = getBoxes(b,3);\n\n        // get image in batch index\n        int bInd = round(getBoxInd(b));\n        if(bInd < 0 || bInd >= " + batch + ") {\n          return;\n        }\n\n        float height_scale = " + heightScale + ";\n        float width_scale = " + widthScale + ";\n\n        float in_y = " + inY + ";\n        if( in_y < 0.0 || in_y > " + inputHeightFloat + " ) {\n          setOutput(float(" + extrapolationValue + "));\n          return;\n        }\n        float in_x = " + inX + ";\n        if( in_x < 0.0 || in_x > " + inputWidthFloat + " ) {\n          setOutput(float(" + extrapolationValue + "));\n          return;\n        }\n\n        vec2 sourceFracIndexCR = vec2(in_x,in_y);\n        if(" + methodId + " == 1) {\n          // Compute the four integer indices.\n          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);\n          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));\n\n          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);\n          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);\n          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);\n          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);\n\n          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);\n\n          float top = topLeft + (topRight - topLeft) * fracCR.x;\n          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;\n          float newValue = top + (bottom - top) * fracCR.y;\n          setOutput(newValue);\n        } else {\n          // Compute the coordinators of nearest neighbor point.\n          ivec2 sourceNearestCR = ivec2(floor(\n            sourceFracIndexCR + vec2(0.5,0.5)));\n          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);\n          setOutput(newValue);\n        }\n      }\n    ";
    }
    return CropAndResizeProgram;
}());
exports.CropAndResizeProgram = CropAndResizeProgram;
//# sourceMappingURL=crop_and_resize_gpu.js.map