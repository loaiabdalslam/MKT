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
exports.COMPLEX_FFT = {
    REAL: 'return real * expR - imag * expI;',
    IMAG: 'return real * expI + imag * expR;'
};
var FFTProgram = /** @class */ (function () {
    function FFTProgram(op, inputShape, inverse) {
        this.variableNames = ['real', 'imag'];
        var innerDim = inputShape[1];
        this.outputShape = inputShape;
        var exponentMultiplierSnippet = inverse ? "2.0 * " + Math.PI : "-2.0 * " + Math.PI;
        var resultDenominator = inverse ? innerDim + ".0" : '1.0';
        this.userCode = "\n      const float exponentMultiplier = " + exponentMultiplierSnippet + ";\n\n      float unaryOpComplex(float real, float expR, float imag, float expI) {\n        " + op + "\n      }\n\n      float mulMatDFT(int batch, int index) {\n        float indexRatio = float(index) / float(" + innerDim + ");\n        float exponentMultiplierTimesIndexRatio =\n            exponentMultiplier * indexRatio;\n\n        float result = 0.0;\n\n        for (int i = 0; i < " + innerDim + "; i++) {\n          // x = (-2|2 * PI / N) * index * i;\n          float x = exponentMultiplierTimesIndexRatio * float(i);\n          float expR = cos(x);\n          float expI = sin(x);\n          float real = getReal(batch, i);\n          float imag = getImag(batch, i);\n\n          result +=\n              unaryOpComplex(real, expR, imag, expI) / " + resultDenominator + ";\n        }\n\n        return result;\n      }\n\n      void main() {\n        ivec2 coords = getOutputCoords();\n        setOutput(mulMatDFT(coords[0], coords[1]));\n      }\n    ";
    }
    return FFTProgram;
}());
exports.FFTProgram = FFTProgram;
//# sourceMappingURL=fft_gpu.js.map