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
var SliceProgram = /** @class */ (function () {
    function SliceProgram(destSize) {
        this.variableNames = ['source'];
        this.outputShape = destSize;
        this.rank = destSize.length;
        var dtype = shader_compiler_1.getCoordsDataType(this.rank);
        var uniformPart = "uniform int start[" + this.rank + "];";
        var sourceCoords = getCoords(this.rank);
        var body;
        var coordSum = destSize.map(function (_, i) {
            return "sourceLoc." + coords[i] + " = start[" + i + "] + coords." + coords[i] + ";";
        });
        body = "\n        " + dtype + " sourceLoc;\n        " + dtype + " coords = getOutputCoords();\n        " + coordSum.join('\n') + "\n      ";
        this.userCode = "\n      " + uniformPart + "\n      void main() {\n        " + body + "\n        setOutput(getSource(" + sourceCoords + "));\n      }\n    ";
    }
    SliceProgram.prototype.getCustomSetupFunc = function (start) {
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
    return SliceProgram;
}());
exports.SliceProgram = SliceProgram;
var coords = ['x', 'y', 'z', 'w', 'u', 'v'];
function getCoords(rank) {
    if (rank === 1) {
        return 'sourceLoc';
    }
    else if (rank <= 6) {
        return coords.slice(0, rank).map(function (x) { return 'sourceLoc.' + x; }).join(',');
    }
    else {
        throw Error("Slicing for rank " + rank + " is not yet supported");
    }
}
//# sourceMappingURL=slice_gpu.js.map