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
var SlicePackedProgram = /** @class */ (function () {
    function SlicePackedProgram(destSize) {
        this.variableNames = ['source'];
        this.usesPackedTextures = true;
        this.outputShape = destSize;
        this.rank = destSize.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var coords = packing_util_1.getChannels('coords', this.rank);
        var sourceLoc = packing_util_1.getChannels('sourceLoc', this.rank);
        var innerDims = this.rank === 1 ? 'sourceLoc' : "vec2(" + sourceLoc.slice(-2).join() + ")";
        var getChannel = "getChannel(getSource(" + sourceLoc.join() + "), " + innerDims + ")";
        var upperRow = "\n      result.x = " + getChannel + ";\n      if (++" + coords[this.rank - 1] + " < " + destSize[this.rank - 1] + ") {\n        ++" + sourceLoc[this.rank - 1] + ";\n        result.y = " + getChannel + ";\n        --" + sourceLoc[this.rank - 1] + ";\n      }\n    ";
        var lowerRow = this.rank === 1 ? '' : "\n      --" + coords[this.rank - 1] + ";\n      if (++" + coords[this.rank - 2] + " < " + destSize[this.rank - 2] + ") {\n        ++" + sourceLoc[this.rank - 2] + ";\n        result.z = " + getChannel + ";\n        if (++" + coords[this.rank - 1] + " < " + destSize[this.rank - 1] + ") {\n          ++" + sourceLoc[this.rank - 1] + ";\n          result.w = " + getChannel + ";\n        }\n      }\n    ";
        var sourceLocSetup = this.rank <= 4 ?
            "sourceLoc = coords +\n            " + dtype + "(" + destSize.map(function (_, i) { return "start[" + i + "]"; }).join() + ");" :
            destSize.map(function (_, i) { return sourceLoc[i] + " = " + coords[i] + " + start[" + i + "];"; })
                .join('\n');
        this.userCode = "\n      uniform int start[" + this.rank + "];\n      void main() {\n        " + dtype + " coords = getOutputCoords();\n        " + dtype + " sourceLoc;\n        " + sourceLocSetup + " \n        vec4 result = vec4(0.);\n        " + upperRow + "\n        " + lowerRow + "\n        setOutput(result);\n      }\n    ";
    }
    SlicePackedProgram.prototype.getCustomSetupFunc = function (start) {
        var _this = this;
        if (start.length !== this.rank) {
            throw Error("The rank (" + this.rank + ") of the program must match the " +
                ("length of start (" + start.length + ")"));
        }
        return function (gpgpu, webGLProgram) {
            if (_this.startLoc == null) {
                _this.startLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'start');
                if (_this.startLoc == null) {
                    // This means the compiler has optimized and realized it doesn't need
                    // the uniform.
                    return;
                }
            }
            gpgpu.gl.uniform1iv(_this.startLoc, start);
        };
    };
    return SlicePackedProgram;
}());
exports.SlicePackedProgram = SlicePackedProgram;
//# sourceMappingURL=slice_packed_gpu.js.map