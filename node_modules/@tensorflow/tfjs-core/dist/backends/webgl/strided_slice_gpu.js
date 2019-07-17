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
var StridedSliceProgram = /** @class */ (function () {
    function StridedSliceProgram(begin, strides, size, shrinkAxis) {
        this.variableNames = ['x'];
        var shape = size.filter(function (v, index) { return shrinkAxis.indexOf(index) === -1; });
        this.outputShape = shape;
        var rank = size.length;
        var inputDtype = shader_compiler_1.getCoordsDataType(size.length);
        var dtype = shader_compiler_1.getCoordsDataType(shape.length);
        var newCoords = '';
        if (rank === 1) {
            newCoords = 'coords * strides + begin';
        }
        else {
            var outputAxis_1 = 0;
            newCoords =
                size.map(function (_, i) {
                    if (shrinkAxis.indexOf(i) === -1) {
                        outputAxis_1++;
                        return shape.length === 1 ?
                            "coords * strides[" + i + "] + begin[" + i + "]" :
                            "coords[" + (outputAxis_1 - 1) + "] * strides[" + i + "] + begin[" + i + "]";
                    }
                    else {
                        return "begin[" + i + "]";
                    }
                })
                    .join(',');
        }
        this.userCode = "\n      " + inputDtype + " begin = " + inputDtype + "(" + begin + ");\n      " + inputDtype + " strides = " + inputDtype + "(" + strides + ");\n\n      void main() {\n        " + dtype + " coords = getOutputCoords();\n        setOutput(getX(" + newCoords + "));\n      }\n    ";
    }
    return StridedSliceProgram;
}());
exports.StridedSliceProgram = StridedSliceProgram;
//# sourceMappingURL=strided_slice_gpu.js.map