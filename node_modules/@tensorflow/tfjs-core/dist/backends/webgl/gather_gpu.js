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
var GatherProgram = /** @class */ (function () {
    function GatherProgram(aShape, indicesLength, axis) {
        this.variableNames = ['A', 'indices'];
        var outputShape = aShape.slice();
        outputShape[axis] = indicesLength;
        this.outputShape = outputShape;
        this.rank = outputShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var sourceCoords = getSourceCoords(aShape, axis);
        this.userCode = "\n      void main() {\n        " + dtype + " resRC = getOutputCoords();\n        setOutput(getA(" + sourceCoords + "));\n      }\n    ";
    }
    return GatherProgram;
}());
exports.GatherProgram = GatherProgram;
function getSourceCoords(aShape, axis) {
    var rank = aShape.length;
    if (rank > 4) {
        throw Error("Gather for rank " + rank + " is not yet supported");
    }
    if (rank === 1) {
        return "int(getIndices(resRC))";
    }
    var currentCoords = ['resRC.x', 'resRC.y', 'resRC.z', 'resRC.w'];
    var sourceCoords = [];
    for (var i = 0; i < aShape.length; i++) {
        if (i === axis) {
            sourceCoords.push("int(getIndices(" + currentCoords[i] + "))");
        }
        else {
            sourceCoords.push("" + currentCoords[i]);
        }
    }
    return sourceCoords.join();
}
//# sourceMappingURL=gather_gpu.js.map