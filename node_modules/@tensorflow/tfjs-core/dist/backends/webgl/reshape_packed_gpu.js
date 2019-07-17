"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var shader_util = require("./shader_compiler_util");
var ReshapePackedProgram = /** @class */ (function () {
    function ReshapePackedProgram(outputShape, inputShape) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        this.outputShape = outputShape;
        var mainLoop = "";
        for (var i = 0; i < 4; i++) {
            var thisRC = "thisRC = rc;";
            if (i % 2 === 1) {
                thisRC += "thisRC.z += 1;";
            }
            if (i > 1) {
                thisRC += "thisRC.y += 1;";
            }
            mainLoop += "\n        " + thisRC + "\n        " + (i > 0 ? "if(thisRC.y < rows && thisRC.z < cols){" : '') + "\n          int flatIndex = getFlatIndex(thisRC);\n\n          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);\n          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));\n\n          result[" + i + "] =\n            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);\n        " + (i > 0 ? '}' : '') + "\n      ";
        }
        this.userCode = "\n      " + getReshapedInputCoords(inputShape) + "\n      " + shader_util.getFlatIndexFrom3D(outputShape) + "\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n\n        vec4 result = vec4(0.);\n\n        ivec3 thisRC;\n        int rows = " + outputShape[1] + ";\n        int cols = " + outputShape[2] + ";\n\n        " + mainLoop + "\n\n        setOutput(result);\n      }\n    ";
    }
    return ReshapePackedProgram;
}());
exports.ReshapePackedProgram = ReshapePackedProgram;
function getReshapedInputCoords(shape) {
    var coordsFromIndexSnippet = shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd'], shape);
    return "\n    ivec3 inputCoordsFromReshapedOutCoords(int index) {\n      " + coordsFromIndexSnippet + "\n      return ivec3(r, c, d);\n    }\n  ";
}
//# sourceMappingURL=reshape_packed_gpu.js.map