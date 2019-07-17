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
var shader_compiler_1 = require("./shader_compiler");
var ScatterProgram = /** @class */ (function () {
    function ScatterProgram(updateSize, sliceDim, indicesRank, updatesRank, strides, shape, summingDupeIndex) {
        if (summingDupeIndex === void 0) { summingDupeIndex = true; }
        this.variableNames = ['updates', 'indices', 'defaultValue'];
        this.outputShape = shape;
        var stridesType = shader_compiler_1.getCoordsDataType(strides.length);
        var dtype = shader_compiler_1.getCoordsDataType(shape.length);
        var indicesString = '';
        if (indicesRank === 1) {
            indicesString = 'i';
        }
        else if (indicesRank === 2) {
            indicesString = 'i, j';
        }
        var indicesSnippet = "getIndices(" + indicesString + ")";
        var updatesString = '';
        if (updatesRank === 1) {
            updatesString = 'i';
        }
        else if (updatesRank === 2) {
            updatesString = 'i, coords[1]';
        }
        var updatesSnippet = "getUpdates(" + updatesString + ")";
        var strideString = sliceDim > 1 ? 'strides[j]' : 'strides';
        this.userCode = "\n        " + stridesType + " strides = " + stridesType + "(" + strides + ");\n\n        void main() {\n          " + dtype + " coords = getOutputCoords();\n          float sum = 0.0;\n          bool found = false;\n          for (int i = 0; i < " + updateSize + "; i++) {\n            int flattenedIndex = 0;\n            for (int j = 0; j < " + sliceDim + "; j++) {\n              int index = round(" + indicesSnippet + ");\n              flattenedIndex += index * " + strideString + ";\n            }\n            if (flattenedIndex == coords[0]) {\n              sum += " + updatesSnippet + ";\n              found = true;\n            }\n          }\n          setOutput(mix(getDefaultValue(), sum, float(found)));\n        }\n      ";
    }
    return ScatterProgram;
}());
exports.ScatterProgram = ScatterProgram;
//# sourceMappingURL=scatter_gpu.js.map