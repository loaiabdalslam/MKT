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
var packing_util_1 = require("../packing_util");
var shader_compiler_1 = require("./shader_compiler");
var UnpackProgram = /** @class */ (function () {
    function UnpackProgram(outputShape) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        this.outputShape = outputShape;
        var rank = outputShape.length;
        var channels = packing_util_1.getChannels('rc', rank);
        var dtype = shader_compiler_1.getCoordsDataType(rank);
        var sourceCoords = packing_util_1.getSourceCoords(rank, channels);
        var innerDims = channels.slice(-2);
        var coords = rank <= 1 ? 'rc' : "vec2(" + innerDims.join(',') + ")";
        this.userCode = "\n      void main() {\n        " + dtype + " rc = getOutputCoords();\n        vec4 packedInput = getA(" + sourceCoords + ");\n\n        setOutput(getChannel(packedInput, " + coords + "));\n      }\n    ";
    }
    return UnpackProgram;
}());
exports.UnpackProgram = UnpackProgram;
//# sourceMappingURL=unpack_gpu.js.map