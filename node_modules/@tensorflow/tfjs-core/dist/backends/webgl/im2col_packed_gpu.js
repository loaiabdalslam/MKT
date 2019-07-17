"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var glsl_version_1 = require("./glsl_version");
var Im2ColPackedProgram = /** @class */ (function () {
    function Im2ColPackedProgram(outputShape, inputShape, convInfo) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        this.outputShape = outputShape;
        var filterWidth = convInfo.filterWidth, inChannels = convInfo.inChannels, strideWidth = convInfo.strideWidth, strideHeight = convInfo.strideHeight, padInfo = convInfo.padInfo, outWidth = convInfo.outWidth, dilationWidth = convInfo.dilationWidth, dilationHeight = convInfo.dilationHeight;
        var left = padInfo.left, top = padInfo.top;
        var itemsPerBlockRow = inChannels * filterWidth;
        var glsl = glsl_version_1.getGlslDifferences();
        this.userCode = "\n      void main() {\n        ivec2 rc = getOutputCoords();\n\n        vec4 result = vec4(0);\n\n        for(int row=0; row<=1; row++) {\n          for(int col=0; col<=1; col++) {\n            int blockIndex = rc.y + col;\n            int pos = rc.x + row;\n\n            if(blockIndex >= " + outputShape[1] + " || pos >= " + outputShape[0] + ") continue;\n\n            int offsetY = int(blockIndex / (" + outWidth + ")) * " + strideHeight + " - " + top + ";\n            int d0 = offsetY + " + dilationHeight + " * (pos / " + itemsPerBlockRow + ");\n\n            if(d0 >= " + inputShape[0] + " || d0 < 0) continue;\n\n            int offsetX = int(mod(float(blockIndex), " + outWidth + ".) * " + strideWidth + ". - " + left + ".);\n            int d1 = offsetX + " + dilationWidth + " * (int(mod(float(pos), " + itemsPerBlockRow + ".) / " + inChannels + ".));\n\n            if(d1 >= " + inputShape[1] + " || d1 < 0) continue;\n\n            vec2 innerDims = vec2(d1, int(mod(float(pos), " + inChannels + ".)));\n            result[row * 2 + col] = getChannel(getA(d0, int(innerDims.x),\n                                              int(innerDims.y)), innerDims);\n          }\n        }\n\n        " + glsl.output + " = result;\n      }\n    ";
    }
    return Im2ColPackedProgram;
}());
exports.Im2ColPackedProgram = Im2ColPackedProgram;
//# sourceMappingURL=im2col_packed_gpu.js.map