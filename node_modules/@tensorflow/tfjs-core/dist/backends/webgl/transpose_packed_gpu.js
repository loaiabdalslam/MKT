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
Object.defineProperty(exports, "__esModule", { value: true });
var shader_compiler_1 = require("./shader_compiler");
var packing_util_1 = require("../packing_util");
var TransposePackedProgram = /** @class */ (function () {
    function TransposePackedProgram(aShape, newDim) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        var outputShape = new Array(aShape.length);
        for (var i = 0; i < outputShape.length; i++) {
            outputShape[i] = aShape[newDim[i]];
        }
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        if (this.rank > 6) {
            throw Error("Packed transpose for rank " + this.rank + " is not yet supported.");
        }
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var outputOrder = packing_util_1.getVecChannels('rc', this.rank);
        var switchedOrder = new Array(this.rank);
        for (var i = 0; i < newDim.length; i++) {
            switchedOrder[newDim[i]] = outputOrder[i];
        }
        var innerDims = "vec2(" + switchedOrder.slice(-2).join() + ")";
        var nextColumn = "++" + outputOrder[this.rank - 1] + " < " + outputShape[this.rank - 1];
        var getc = "getChannel(getA(" + switchedOrder.join() + "), " + innerDims + ")";
        this.userCode = "\n    void main() {\n      " + dtype + " rc = getOutputCoords();\n      vec4 result = vec4(0.);\n      result[0] = " + getc + ";\n      if(" + nextColumn + ") {\n        result[1] = " + getc + ";\n      }\n      --" + outputOrder[this.rank - 1] + ";\n      if(++" + outputOrder[this.rank - 2] + " < " + outputShape[this.rank - 2] + ") {\n        result[2] = " + getc + ";\n        if(" + nextColumn + ") {\n          result[3] = " + getc + ";\n        }\n      }  \n      setOutput(result);\n    }\n    ";
    }
    return TransposePackedProgram;
}());
exports.TransposePackedProgram = TransposePackedProgram;
//# sourceMappingURL=transpose_packed_gpu.js.map