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
var MatMulPackedProgram = /** @class */ (function () {
    function MatMulPackedProgram(aShape, outputShape, transposeA, transposeB, addBias, activation) {
        if (transposeA === void 0) { transposeA = false; }
        if (transposeB === void 0) { transposeB = false; }
        if (addBias === void 0) { addBias = false; }
        if (activation === void 0) { activation = null; }
        this.variableNames = ['matrixA', 'matrixB'];
        this.usesPackedTextures = true;
        this.outputShape = outputShape;
        var sharedDim = transposeA ? aShape[1] : aShape[2];
        var sharedDimensionPacked = Math.ceil(sharedDim / 2);
        var aSample = transposeA ? 'i * 2, rc.y' : 'rc.y, i * 2';
        var bSample = transposeB ? 'rc.z, i * 2' : 'i * 2, rc.z';
        var aSwizzle = transposeA ? ['a.xxyy', 'a.zzww'] : ['a.xxzz', 'a.yyww'];
        var bSwizzle = transposeB ? ['b.xzxz', 'b.ywyw'] : ['b.xyxy', 'b.zwzw'];
        var activationSnippet = '', applyActivationSnippet = '';
        if (activation) {
            activationSnippet = "vec4 activation(vec4 x) {\n        " + activation + "\n      }";
            applyActivationSnippet = "result = activation(result);";
        }
        var addBiasSnippet = addBias ? 'result += getBiasAtOutCoords();' : '';
        if (addBias) {
            this.variableNames.push('bias');
        }
        this.userCode = "\n      " + activationSnippet + "\n\n      const float sharedDimension = " + sharedDimensionPacked + ".0;\n\n      vec4 dot2x2ARowBCol(ivec3 rc) {\n        vec4 result = vec4(0);\n        for (int i = 0; i < " + sharedDimensionPacked + "; i++) {\n          vec4 a = getMatrixA(rc.x, " + aSample + ");\n          vec4 b = getMatrixB(rc.x, " + bSample + ");\n\n          result += (" + aSwizzle[0] + " * " + bSwizzle[0] + ") + (" + aSwizzle[1] + " * " + bSwizzle[1] + ");\n        }\n        return result;\n      }\n\n      void main() {\n        ivec3 rc = getOutputCoords();\n        vec4 result = dot2x2ARowBCol(rc);\n\n        " + addBiasSnippet + "\n\n        " + applyActivationSnippet + "\n\n        setOutput(result);\n      }\n    ";
    }
    return MatMulPackedProgram;
}());
exports.MatMulPackedProgram = MatMulPackedProgram;
//# sourceMappingURL=mulmat_packed_gpu.js.map