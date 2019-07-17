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
var Conv2DDerFilterProgram = /** @class */ (function () {
    function Conv2DDerFilterProgram(convInfo) {
        this.variableNames = ['x', 'dy'];
        this.outputShape = convInfo.filterShape;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.userCode = "\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int wR = coords.x;\n        int wC = coords.y;\n        int d1 = coords.z;\n        int d2 = coords.w;\n\n        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n\n        for (int b = 0; b < " + convInfo.batchSize + "; b++) {\n          for (int yR = 0; yR < " + convInfo.outHeight + "; yR++) {\n            int xR = wR + yR * " + strideHeight + " - " + padTop + ";\n\n            if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n              continue;\n            }\n\n            for (int yC = 0; yC < " + convInfo.outWidth + "; yC++) {\n              int xC = wC + yC * " + strideWidth + " - " + padLeft + ";\n\n              if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                continue;\n              }\n\n              float dyValue = getDy(b, yR, yC, d2);\n              float xValue = getX(b, xR, xC, d1);\n              dotProd += (xValue * dyValue);\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerFilterProgram;
}());
exports.Conv2DDerFilterProgram = Conv2DDerFilterProgram;
var Conv2DDerInputProgram = /** @class */ (function () {
    function Conv2DDerInputProgram(convInfo) {
        this.variableNames = ['dy', 'W'];
        this.outputShape = convInfo.inShape;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        this.userCode = "\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec4 coords = getOutputCoords();\n        int batch = coords[0];\n        int d1 = coords[3];\n\n        ivec2 dyCorner = coords.yz - pads;\n        int dyRCorner = dyCorner.x;\n        int dyCCorner = dyCorner.y;\n\n        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).\n        // ? = to be determined. : = across all values in that axis.\n        float dotProd = 0.0;\n        for (int wR = 0; wR < " + filterHeight + "; wR++) {\n          float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n          if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 || fract(dyR) > 0.0) {\n            continue;\n          }\n          int idyR = int(dyR);\n\n          int wRPerm = " + filterHeight + " - 1 - wR;\n\n          for (int wC = 0; wC < " + filterWidth + "; wC++) {\n            float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n            if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                fract(dyC) > 0.0) {\n              continue;\n            }\n            int idyC = int(dyC);\n\n            int wCPerm = " + filterWidth + " - 1 - wC;\n\n            for (int d2 = 0; d2 < " + convInfo.outChannels + "; d2++) {\n              float xValue = getDy(batch, idyR, idyC, d2);\n              float wValue = getW(wRPerm, wCPerm, d1, d2);\n              dotProd += xValue * wValue;\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv2DDerInputProgram;
}());
exports.Conv2DDerInputProgram = Conv2DDerInputProgram;
var Conv3DDerFilterProgram = /** @class */ (function () {
    function Conv3DDerFilterProgram(convInfo) {
        this.variableNames = ['x', 'dy'];
        this.outputShape = convInfo.filterShape;
        var strideDepth = convInfo.strideDepth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padFront = convInfo.padInfo.front;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        this.userCode = "\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int wF = coords.x;\n        int wR = coords.y;\n        int wC = coords.z;\n        int d1 = coords.w;\n        int d2 = coords.u;\n\n        float dotProd = 0.0;\n\n        for (int b = 0; b < " + convInfo.batchSize + "; b++) {\n          for (int yF = 0; yF < " + convInfo.outDepth + "; yF++) {\n            int xF = wF + yF * " + strideDepth + " - " + padFront + ";\n\n            if (xF < 0 || xF >= " + convInfo.inDepth + ") {\n              continue;\n            }\n\n            for (int yR = 0; yR < " + convInfo.outHeight + "; yR++) {\n              int xR = wR + yR * " + strideHeight + " - " + padTop + ";\n\n              if (xR < 0 || xR >= " + convInfo.inHeight + ") {\n                continue;\n              }\n\n              for (int yC = 0; yC < " + convInfo.outWidth + "; yC++) {\n                int xC = wC + yC * " + strideWidth + " - " + padLeft + ";\n\n                if (xC < 0 || xC >= " + convInfo.inWidth + ") {\n                  continue;\n                }\n\n                float dyValue = getDy(b, yF, yR, yC, d2);\n                float xValue = getX(b, xF, xR, xC, d1);\n                dotProd += (xValue * dyValue);\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv3DDerFilterProgram;
}());
exports.Conv3DDerFilterProgram = Conv3DDerFilterProgram;
var Conv3DDerInputProgram = /** @class */ (function () {
    function Conv3DDerInputProgram(convInfo) {
        this.variableNames = ['dy', 'W'];
        this.outputShape = convInfo.inShape;
        var filterDepth = convInfo.filterDepth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var strideDepth = convInfo.strideDepth;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var padFront = filterDepth - 1 - convInfo.padInfo.front;
        var padTop = filterHeight - 1 - convInfo.padInfo.top;
        var padLeft = filterWidth - 1 - convInfo.padInfo.left;
        this.userCode = "\n      const ivec3 pads = ivec3(" + padFront + ", " + padTop + ", " + padLeft + ");\n\n      void main() {\n        ivec5 coords = getOutputCoords();\n        int batch = coords.x;\n        int d1 = coords.u;\n\n\n        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;\n        int dyFCorner = dyCorner.x;\n        int dyRCorner = dyCorner.y;\n        int dyCCorner = dyCorner.z;\n\n        float dotProd = 0.0;\n        for (int wF = 0; wF < " + filterDepth + "; wF++) {\n          float dyF = float(dyFCorner + wF) / " + strideDepth + ".0;\n\n          if (dyF < 0.0 || dyF >= " + convInfo.outDepth + ".0 || fract(dyF) > 0.0) {\n            continue;\n          }\n          int idyF = int(dyF);\n\n          int wFPerm = " + filterDepth + " - 1 - wF;\n\n          for (int wR = 0; wR < " + filterHeight + "; wR++) {\n            float dyR = float(dyRCorner + wR) / " + strideHeight + ".0;\n\n            if (dyR < 0.0 || dyR >= " + convInfo.outHeight + ".0 ||\n              fract(dyR) > 0.0) {\n              continue;\n            }\n            int idyR = int(dyR);\n\n            int wRPerm = " + filterHeight + " - 1 - wR;\n\n            for (int wC = 0; wC < " + filterWidth + "; wC++) {\n              float dyC = float(dyCCorner + wC) / " + strideWidth + ".0;\n\n              if (dyC < 0.0 || dyC >= " + convInfo.outWidth + ".0 ||\n                  fract(dyC) > 0.0) {\n                continue;\n              }\n              int idyC = int(dyC);\n\n              int wCPerm = " + filterWidth + " - 1 - wC;\n\n              for (int d2 = 0; d2 < " + convInfo.outChannels + "; d2++) {\n                float xValue = getDy(batch, idyF, idyR, idyC, d2);\n                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);\n                dotProd += xValue * wValue;\n              }\n            }\n          }\n        }\n        setOutput(dotProd);\n      }\n    ";
    }
    return Conv3DDerInputProgram;
}());
exports.Conv3DDerInputProgram = Conv3DDerInputProgram;
//# sourceMappingURL=conv_backprop_gpu.js.map