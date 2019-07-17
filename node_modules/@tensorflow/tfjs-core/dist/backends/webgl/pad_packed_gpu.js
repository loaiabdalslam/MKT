"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var packing_util_1 = require("../packing_util");
var PadPackedProgram = /** @class */ (function () {
    function PadPackedProgram(xShape, paddings, constantValue) {
        this.variableNames = ['x'];
        this.usesPackedTextures = true;
        this.outputShape = paddings.map(function (p, i) { return p[0] /* beforePad */ + xShape[i] + p[1]; } /* afterPad */);
        var rank = xShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(rank);
        var start = paddings.map(function (p) { return p[0]; }).join(',');
        var end = paddings.map(function (p, i) { return p[0] + xShape[i]; }).join(',');
        var coords = packing_util_1.getChannels('rc', rank);
        var source = packing_util_1.getChannels('source', rank);
        var cLimit = coords[rank - 1] + " < " + this.outputShape[rank - 1];
        var innerDims = rank === 1 ? 'source' : "vec2(" + source.slice(-2).join() + ")";
        var componentSetup = [
            dtype + " rc = outputLoc;",
            coords[rank - 1] + " += 1;\n       if(" + cLimit + ") {\n      ",
            rank === 1 ? '' :
                "}\n       rc = outputLoc;\n       " + coords[rank - 2] + " += 1;\n       if(" + coords[rank - 2] + " < " + this.outputShape[rank - 2] + ") {",
            rank === 1 ? '' :
                "  " + coords[rank - 1] + " += 1;\n         if(" + cLimit + ") {"
        ];
        var paddingArea = rank === 1 ?
            'rc < start || rc >= end' :
            'any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))';
        var mainLoop = '';
        for (var i = 0, j = rank === 1 ? 2 : 4; i < j; i++) {
            mainLoop += "\n        " + componentSetup[i] + "\n        if (" + paddingArea + ") {\n          result[" + i + "] = float(" + constantValue + ");\n        } else {\n          " + dtype + " source = rc - start;\n          result[" + i + "] = getChannel(getX(" + source.join() + "), " + innerDims + ");\n        }\n      ";
        }
        mainLoop += (rank === 1 ? "} " : "}}");
        this.userCode = "\n      const " + dtype + " start = " + dtype + "(" + start + ");\n      const " + dtype + " end = " + dtype + "(" + end + ");\n\n      void main() {\n        " + dtype + " outputLoc = getOutputCoords();\n        vec4 result = vec4(0.);\n        " + mainLoop + "\n        setOutput(result);\n      }\n    ";
    }
    return PadPackedProgram;
}());
exports.PadPackedProgram = PadPackedProgram;
//# sourceMappingURL=pad_packed_gpu.js.map