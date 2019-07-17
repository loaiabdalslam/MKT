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
var ReverseProgram = /** @class */ (function () {
    function ReverseProgram(xShape, axis) {
        this.variableNames = ['x'];
        var rank = xShape.length;
        if (rank > 4) {
            throw new Error("WebGL backend: Reverse of rank-" + rank + " tensor is not yet supported");
        }
        this.outputShape = xShape;
        if (rank === 1) {
            this.userCode = "\n        void main() {\n          int coord = getOutputCoords();\n          setOutput(getX(" + xShape[0] + " - coord - 1));\n        }\n      ";
            return;
        }
        var getInCoord = function (i) {
            if (axis.indexOf(i) !== -1 && xShape[i] !== 1) {
                return xShape[i] + " - coords[" + i + "] - 1";
            }
            return "coords[" + i + "]";
        };
        var inCoords = xShape.map(function (_, i) { return getInCoord(i); }).join(',');
        var type = shader_compiler_1.getCoordsDataType(rank);
        this.userCode = "\n      void main() {\n        " + type + " coords = getOutputCoords();\n        setOutput(getX(" + inCoords + "));\n      }\n    ";
    }
    return ReverseProgram;
}());
exports.ReverseProgram = ReverseProgram;
//# sourceMappingURL=reverse_gpu.js.map