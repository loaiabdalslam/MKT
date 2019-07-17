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
var shader_util = require("./shader_compiler_util");
var DecodeMatrixPackedProgram = /** @class */ (function () {
    function DecodeMatrixPackedProgram(outputShape, texShape) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        var glsl = glsl_version_1.getGlslDifferences();
        this.outputShape = outputShape;
        this.userCode = "\n      ivec3 outCoordsFromFlatIndex(int index) {\n        " + shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd'], outputShape) + "\n        return ivec3(r, c, d);\n      }\n\n      void main() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n          vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = 4 * (resTexRC.x * " + texShape[1] + " + resTexRC.y);\n\n        vec4 result = vec4(0.);\n\n        for (int i=0; i<4; i++) {\n          int flatIndex = index + i;\n          ivec3 rc = outCoordsFromFlatIndex(flatIndex);\n          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));\n        }\n\n        " + glsl.output + " = result;\n      }\n    ";
    }
    return DecodeMatrixPackedProgram;
}());
exports.DecodeMatrixPackedProgram = DecodeMatrixPackedProgram;
//# sourceMappingURL=decode_matrix_packed_gpu.js.map