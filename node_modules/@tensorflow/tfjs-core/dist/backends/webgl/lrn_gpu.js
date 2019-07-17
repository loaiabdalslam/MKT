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
var LRNProgram = /** @class */ (function () {
    function LRNProgram(xShape, radius, bias, alpha, beta) {
        this.variableNames = ['x'];
        this.outputShape = [];
        var rad = radius;
        var maxD = xShape[3] - 1;
        this.outputShape = xShape;
        // optimize pow(bias + alpha * sum, -beta)
        // src: https://github.com/tensorflow/tensorflow/..
        // blob/26033a1644a9c4a5fbe3170ab2e864b6a4ccd4ca/..
        // tensorflow/core/kernels/mkl_lrn_op.cc#L320
        var powOperator;
        var basis = "float(" + bias + ") + float(" + alpha + ") * sum";
        if (beta === 0.5) {
            powOperator = "inversesqrt(" + basis + ")";
        }
        else if (beta === 1.0) {
            powOperator = "1.0/(" + basis + ")";
        }
        else {
            powOperator = "exp(log(" + basis + ") * float(-" + beta + "));";
        }
        this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int b = coords[0];\n        int r = coords[1];\n        int c = coords[2];\n        int d = coords[3];\n        float x = getX(b, r, c, d);\n        float sum = 0.0;\n        for (int j = -" + rad + "; j <= " + rad + "; j++) {\n          int idx = d + j;\n          if (idx >= 0 && idx <=  " + maxD + ") {\n            float z = getX(b, r, c, idx);\n            sum += z * z;\n          }\n        }\n        float val = x * " + powOperator + ";\n        setOutput(val);\n      }\n    ";
    }
    return LRNProgram;
}());
exports.LRNProgram = LRNProgram;
//# sourceMappingURL=lrn_gpu.js.map