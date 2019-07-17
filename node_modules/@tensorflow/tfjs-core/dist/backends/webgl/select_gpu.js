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
var shader_compiler_1 = require("./shader_compiler");
var SelectProgram = /** @class */ (function () {
    function SelectProgram(cRank, shape, rank) {
        this.variableNames = ['c', 'a', 'b'];
        this.outputShape = shape;
        var cCoords;
        var abCoords;
        if (rank > 4) {
            throw Error("Where for rank " + rank + " is not yet supported");
        }
        if (rank === 1) {
            abCoords = "resRC";
            cCoords = "resRC";
        }
        else {
            var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
            var cCoordVars = [];
            var abCoordVars = [];
            for (var i = 0; i < shape.length; i++) {
                abCoordVars.push("" + currentCoords[i]);
                if (i < cRank) {
                    cCoordVars.push("" + currentCoords[i]);
                }
            }
            cCoords = cCoordVars.join();
            abCoords = abCoordVars.join();
        }
        var dtype = shader_compiler_1.getCoordsDataType(rank);
        this.userCode = "\n      void main() {\n        " + dtype + " resRC = getOutputCoords();\n        float cVal = getC(" + cCoords + ");\n        if (cVal >= 1.0) {\n          setOutput(getA(" + abCoords + "));\n        } else {\n          setOutput(getB(" + abCoords + "));\n        }\n      }\n    ";
    }
    return SelectProgram;
}());
exports.SelectProgram = SelectProgram;
//# sourceMappingURL=select_gpu.js.map