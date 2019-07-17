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
var glsl_version_1 = require("./glsl_version");
var shader_util = require("./shader_compiler_util");
/*
This is how the shader encodes a tensor with shape = [2, 3, 5]
(indices are [batch, row, col]).

000|001   002|003   004|xxx   020|021   022|023   024|xxx
-------   -------   -------   -------   -------   -------
010|011   012|013   014|xxx   xxx|xxx   xxx|xxx   xxx|xxx

100|101   102|103   104|xxx   120|121   122|123   124|xxx
-------   -------   -------   -------   -------   -------
110|111   112|113   114|xxx   xxx|xxx   xxx|xxx   xxx|xxx

Single texels contain only values from the same batch, and from adjacent rows
and columns.
 */
var EncodeMatrixPackedProgram = /** @class */ (function () {
    function EncodeMatrixPackedProgram(outputShape, texShape, inputIsUnsignedByte) {
        if (inputIsUnsignedByte === void 0) { inputIsUnsignedByte = false; }
        this.variableNames = ['A'];
        var glsl = glsl_version_1.getGlslDifferences();
        var height = texShape[0], width = texShape[1];
        this.outputShape = outputShape;
        var mainLoop = '';
        var output = 'result';
        if (inputIsUnsignedByte) {
            output = 'floor(result * 255. + 0.5)';
        }
        for (var row = 0; row <= 1; row++) {
            for (var col = 0; col <= 1; col++) {
                var channel = row * 2 + col;
                mainLoop += "\n          localCoords = coords;\n          if(localCoords[2] + " + col + " < " + outputShape[2] + ") {\n            localCoords[2] += " + col + ";\n            if(localCoords[1] + " + row + " < " + outputShape[1] + ") {\n              localCoords[1] += " + row + ";\n\n              flatIndex = getFlatIndex(localCoords);\n              offset = imod(flatIndex, 4);\n    \n              flatIndex /= 4;\n              r = flatIndex / " + width + ";\n              c = imod(flatIndex, " + width + ");\n              uv = (vec2(c, r) + halfCR) / vec2(" + width + ".0, " + height + ".0);\n              values = " + glsl.texture2D + "(A, uv);\n\n              if(offset == 0) {\n                result[" + channel + "] = values[0];\n              } else if(offset == 1) {\n                result[" + channel + "] = values[1];\n              } else if(offset == 2) {\n                result[" + channel + "] = values[2];\n              } else {\n                result[" + channel + "] = values[3];\n              }\n            }\n          }\n        ";
            }
        }
        this.userCode = "\n      " + shader_util.getFlatIndexFrom3D(outputShape) + "\n\n      void main() {\n        ivec3 coords = getOutputCoords();\n\n        vec4 result = vec4(0.);\n        int flatIndex, r, c, offset;\n        ivec3 localCoords;\n        vec2 uv;\n        vec4 values;\n        \n        " + mainLoop + "\n\n        " + glsl.output + " = " + output + ";\n      }\n    ";
    }
    return EncodeMatrixPackedProgram;
}());
exports.EncodeMatrixPackedProgram = EncodeMatrixPackedProgram;
//# sourceMappingURL=encode_matrix_packed_gpu.js.map