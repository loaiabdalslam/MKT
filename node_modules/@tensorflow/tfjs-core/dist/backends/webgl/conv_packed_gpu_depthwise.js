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
var util = require("../../util");
var DepthwiseConvPacked2DProgram = /** @class */ (function () {
    function DepthwiseConvPacked2DProgram(convInfo) {
        this.variableNames = ['x', 'W'];
        this.usesPackedTextures = true;
        this.outputShape = convInfo.outShape;
        var xNumRows = convInfo.inHeight;
        var xNumCols = convInfo.inWidth;
        var padTop = convInfo.padInfo.top;
        var padLeft = convInfo.padInfo.left;
        var strideHeight = convInfo.strideHeight;
        var strideWidth = convInfo.strideWidth;
        var dilationHeight = convInfo.dilationHeight;
        var dilationWidth = convInfo.dilationWidth;
        var filterHeight = convInfo.filterHeight;
        var filterWidth = convInfo.filterWidth;
        var texelsAcross = filterWidth;
        var mainLoop = "int xR; int xC; int xCOffset;";
        for (var r = 0; r < filterHeight; r++) {
            for (var c = 0; c < filterWidth; c++) {
                mainLoop += "\n          vec4 xTexelR" + r + "C" + c * 2 + " = vec4(0.);\n          vec4 wR" + r + "C" + c + " = vec4(0.);\n          vec4 xR" + r + "C" + c + " = vec4(0.);";
            }
        }
        /**
         * This vectorized implementation works by gathering the values needed for
         * each output channel's dot product into vec4's and then multiplying them
         * all together (this happens in the final double for-loop below). Most of
         * the main loop consists of constructing these vec4's with the minimum
         * number of texture2D calls, which means making use of all four returned
         * values from a texture2D call at once.
         */
        for (var r = 0; r < filterHeight; r++) {
            for (var texelC = 0; texelC < texelsAcross; texelC++) {
                var c = texelC * 2;
                mainLoop += "\n          xR = xRCorner + " + r * dilationHeight + ";\n          xC = xCCorner + " + c * dilationWidth + ";\n        ";
                if (strideWidth === 1) {
                    if (c < filterWidth) {
                        // If padding is odd, the outer texels have to be composed.
                        if (padLeft % 2 === 1) {
                            // TODO: Ensure vec4 previous does not result in redundant sample,
                            // and avoid setting xTexelRC's that exceed the boundary in the
                            // first place rather than resetting them to vec4(0)).
                            // To compute xCOffset:
                            // - If padding is odd, we must add 1 to ensure we ask for an
                            // even-numbered row.
                            // - We subtract 2 to access the previous texel.
                            mainLoop += "\n                xCOffset = xC + 1;\n                if(xR >= 0 && xR < " + xNumRows + " && xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                  xTexelR" + r + "C" + c + " = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR" + r + "C" + c + " = vec4(0.);\n                }\n\n                xCOffset = xC + 1 - 2;\n                if(xR >= 0 && xR < " + xNumRows + " && xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                  vec4 previous = getX(batch, xR, xCOffset, d1);\n                  xR" + r + "C" + c + " = vec4(previous.zw, xTexelR" + r + "C" + c + ".xy);\n                } else {\n                  xR" + r + "C" + c + " = vec4(0, 0, xTexelR" + r + "C" + c + ".xy);\n                }\n              ";
                        }
                        else {
                            // Padding is even, so xRC corresponds to a single texel.
                            mainLoop += "\n                if(xR >= 0 && xR < " + xNumRows + " && xC >= 0 && xC < " + xNumCols + ") {\n                  xTexelR" + r + "C" + c + " = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR" + r + "C" + c + " = vec4(0.);\n                }\n\n                xR" + r + "C" + c + " = xTexelR" + r + "C" + c + ";\n              ";
                        }
                        if (c + 1 < filterWidth) {
                            // If dilation is even, the second entry should match the first
                            // (either both are composed or both are single samples). But if
                            // dilation is odd, then the second entry should be the opposite
                            // of the first (if the first is composed, the second is a single
                            // sample, and vice versa.)
                            var nextTexelOffset = padLeft % 2 === 0 ?
                                util.nearestLargerEven(dilationWidth) :
                                dilationWidth;
                            if ((dilationWidth % 2 === 0 && padLeft % 2 === 1) ||
                                (dilationWidth % 2 !== 0 && padLeft % 2 !== 1)) {
                                mainLoop += "\n                  xCOffset = xC + " + padLeft % 2 + " + " + nextTexelOffset + ";\n\n                  if(xR >= 0 && xR < " + xNumRows + " &&\n                    xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                    xTexelR" + r + "C" + (c + 2) + " = getX(batch, xR, xCOffset, d1);\n                  }\n                ";
                                // If dilation > 1 then the xRC's will not be able to share any
                                // values, so each xRC will require two unique calls to getX.
                                if (dilationWidth > 1) {
                                    mainLoop += "\n                    xCOffset -= 2;\n                    if(xR >= 0 && xR < " + xNumRows + " &&\n                      xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                      xTexelR" + r + "C" + c + " = getX(batch, xR, xCOffset, d1);\n                    } else {\n                      xTexelR" + r + "C" + c + " = vec4(0.);\n                    }\n                  ";
                                }
                                mainLoop += "\n                  xR" + r + "C" + (c + 1) + " = vec4(\n                    xTexelR" + r + "C" + c + ".zw, xTexelR" + r + "C" + (c + 2) + ".xy);\n                ";
                            }
                            else {
                                mainLoop += "\n                  xCOffset = xC + " + nextTexelOffset + ";\n\n                  if(xR >= 0 && xR < " + xNumRows + " &&\n                    xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                    xTexelR" + r + "C" + (c + 2) + " = getX(batch, xR, xCOffset, d1);\n                  }\n\n                  xR" + r + "C" + (c + 1) + " = xTexelR" + r + "C" + (c + 2) + ";\n                ";
                            }
                        }
                    }
                }
                else { // stride > 1
                    if (c < filterWidth) {
                        mainLoop += "\n              if(xR >= 0 && xR < " + xNumRows + ") {\n            ";
                        // Depending on whether padLeft is even or odd, we want either the
                        // xy or zw channels from X texels for xR${r}C${c}. If padLeft is
                        // even, xR${r}C${c + 1} is simply the zw channels of texels we've
                        // already sampled. But if padLeft is odd, xR${r}C{$c + 1}.zw will
                        // need to come from the xy channels of a new texel, hence the `vec4
                        // final` initialized below.
                        if (padLeft % 2 === 1) {
                            mainLoop += "\n                xCOffset = xC + 1 - " + strideWidth + ";\n                if(xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                  xTexelR" + r + "C" + c + " = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR" + r + "C" + c + " = vec4(0.);\n                }\n\n                if(xC + 1 >= 0 && xC + 1 < " + xNumCols + ") {\n                  xTexelR" + r + "C" + (c + 2) + " = getX(batch, xR, xC + 1, d1);\n                } else {\n                  xTexelR" + r + "C" + (c + 2) + " = vec4(0.);\n                }\n\n                xR" + r + "C" + c + " = vec4(\n                  xTexelR" + r + "C" + c + ".zw, xTexelR" + r + "C" + (c + 2) + ".zw);\n              ";
                            if (c + 1 < filterWidth) {
                                mainLoop += "\n                  vec4 final = vec4(0.);\n                  xCOffset = xC + 1 + " + strideWidth + ";\n                  if(xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                    final = getX(batch, xR, xCOffset, d1);\n                  }\n                  xR" + r + "C" + (c + 1) + " = vec4(xTexelR" + r + "C" + (c + 2) + ".xy, final.xy);\n                ";
                            }
                        }
                        else {
                            mainLoop += "\n                if(xC >= 0 && xC < " + xNumCols + ") {\n                  xTexelR" + r + "C" + c + " = getX(batch, xR, xC, d1);\n                } else {\n                  xTexelR" + r + "C" + c + " = vec4(0.);\n                }\n\n                xCOffset = xC + " + strideWidth + ";\n                if(xCOffset >= 0 && xCOffset < " + xNumCols + ") {\n                  xTexelR" + r + "C" + (c + 2) + " = getX(batch, xR, xCOffset, d1);\n                } else {\n                  xTexelR" + r + "C" + (c + 2) + " = vec4(0.);\n                }\n\n                xR" + r + "C" + c + " = vec4(\n                  xTexelR" + r + "C" + c + ".xy, xTexelR" + r + "C" + (c + 2) + ".xy);\n              ";
                            if (c + 1 < filterWidth) {
                                mainLoop += "\n                  xR" + r + "C" + (c + 1) + " = vec4(\n                    xTexelR" + r + "C" + c + ".zw, xTexelR" + r + "C" + (c + 2) + ".zw);\n                ";
                            }
                        }
                        mainLoop += "}";
                    }
                }
                if (c < filterWidth) {
                    mainLoop += "\n            vec4 wTexelR" + r + "C" + c + " = getW(" + r + ", " + c + ", d1, q);\n            wR" + r + "C" + c + " = vec4(wTexelR" + r + "C" + c + ".xz, wTexelR" + r + "C" + c + ".xz);\n          ";
                    if (c + 1 < filterWidth) {
                        mainLoop += "\n              vec4 wTexelR" + r + "C" + (c + 1) + " = getW(" + r + ", " + (c + 1) + ", d1, q);\n              wR" + r + "C" + (c + 1) + " =\n                vec4(wTexelR" + r + "C" + (c + 1) + ".xz, wTexelR" + r + "C" + (c + 1) + ".xz);";
                    }
                }
            }
        }
        for (var r = 0; r < filterHeight; r++) {
            for (var c = 0; c < filterWidth; c++) {
                mainLoop += "result += xR" + r + "C" + c + " * wR" + r + "C" + c + ";";
            }
        }
        this.userCode = "\n      const ivec2 strides = ivec2(" + strideHeight + ", " + strideWidth + ");\n      const ivec2 pads = ivec2(" + padTop + ", " + padLeft + ");\n\n      void main() {\n\n        ivec4 coords = getOutputCoords();\n        int batch = coords.x;\n        ivec2 xRCCorner = coords.yz * strides - pads;\n        int d2 = coords.w;\n        int d1 = d2;\n        int q = 0;\n        int xRCorner = xRCCorner.x;\n        int xCCorner = xRCCorner.y;\n\n        vec4 result = vec4(0.);\n\n        " + mainLoop + "\n\n        setOutput(result);\n      }\n    ";
    }
    return DepthwiseConvPacked2DProgram;
}());
exports.DepthwiseConvPacked2DProgram = DepthwiseConvPacked2DProgram;
//# sourceMappingURL=conv_packed_gpu_depthwise.js.map