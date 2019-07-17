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
var util_1 = require("../../util");
var packing_util_1 = require("../packing_util");
var shader_compiler_1 = require("./shader_compiler");
var ArgMinMaxPackedProgram = /** @class */ (function () {
    function ArgMinMaxPackedProgram(shape, windowSize, op, firstPass) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        util_1.assert(shape.length > 2, function () { return "Packed arg" + (op.charAt(0).toUpperCase() +
            op.slice(1)) + " supports only inputs with rank above 2."; });
        var inSize = shape[shape.length - 1];
        var outSize = Math.ceil(inSize / windowSize);
        this.outputShape = shape.slice(0, -1);
        if (outSize > 1) {
            this.outputShape.push(outSize);
        }
        if (!firstPass) {
            this.variableNames.push('bestIndicesA');
        }
        var outShape = this.outputShape;
        var rank = outShape.length;
        var dtype = shader_compiler_1.getCoordsDataType(rank);
        var coords = packing_util_1.getChannels('coords', rank);
        var sourceLocSetup;
        var sourceRank;
        if (outSize === 1) {
            sourceRank = rank + 1;
            var sourceLocDType = shader_compiler_1.getCoordsDataType(sourceRank);
            sourceLocSetup = "\n        " + sourceLocDType + " sourceLocR = " + sourceLocDType + "(" + coords.join() + ", 0);\n        ++" + coords[rank - 1] + ";\n        " + sourceLocDType + " sourceLocG = " + sourceLocDType + "(" + coords.join() + ", 0);\n        ++" + coords[rank - 2] + ";\n        " + sourceLocDType + " sourceLocA = " + sourceLocDType + "(" + coords.join() + ", 0);\n        --" + coords[rank - 1] + ";\n        " + sourceLocDType + " sourceLocB = " + sourceLocDType + "(" + coords.join() + ", 0);\n        --" + coords[rank - 2] + ";";
        }
        else {
            sourceRank = rank;
            sourceLocSetup = "\n        " + dtype + " sourceLocR = coords;\n        ++" + coords[rank - 1] + ";\n        " + dtype + " sourceLocG = coords;\n        ++" + coords[rank - 2] + ";\n        " + dtype + " sourceLocA = coords;\n        --" + coords[rank - 1] + ";\n        " + dtype + " sourceLocB = coords;\n        --" + coords[rank - 2] + ";";
        }
        var channels = ['x', 'y', 'z', 'w', 'u', 'v'].slice(0, sourceRank);
        var inChannel = '.' + channels[sourceRank - 1]; // e.g. ".b" for rank 3.
        var intChannels = channels.map(function (x) { return 'int ' + x; });
        var srcRCoords = packing_util_1.getChannels('sourceLocR', sourceRank - 1).concat('inIdx.r');
        var srcGCoords = packing_util_1.getChannels('sourceLocG', sourceRank - 1).concat('inIdx.g');
        var srcBCoords = packing_util_1.getChannels('sourceLocB', sourceRank - 1).concat('inIdx.b');
        var srcACoords = packing_util_1.getChannels('sourceLocA', sourceRank - 1).concat('inIdx.a');
        var compOp = (op === 'max') ? 'greaterThan' : 'lessThan';
        var fetchCandidateIdx = firstPass ? '' : "\n          inIdx = round(vec4(getBestIndicesAChannel(" + srcRCoords.join() + "),\n                             getBestIndicesAChannel(" + srcGCoords.join() + "),\n                             getBestIndicesAChannel(" + srcBCoords.join() + "),\n                             getBestIndicesAChannel(" + srcACoords.join() + ")));";
        var fetchValue = "vec4(\n            getAChannel(" + srcRCoords.join() + "),\n            hasNextCol ? getAChannel(" + srcGCoords.join() + ") : 0.,\n            hasNextRow ? getAChannel(" + srcBCoords.join() + ") : 0.,\n            hasNextRow && hasNextCol ? getAChannel(" + srcACoords.join() + ") : 0.)";
        var getBestIndicesAChannelSnippet = firstPass ? '' : "\n      float getBestIndicesAChannel(" + intChannels.join() + ") {\n        return getChannel(getBestIndicesA(" + channels.join() + "),\n                                          vec2(" + channels.slice(-2).join() + "));\n      }";
        this.userCode = "\n      float getAChannel(" + intChannels.join() + ") {\n        return getChannel(getA(" + channels.join() + "),\n                               vec2(" + channels.slice(-2).join() + "));\n      }\n      " + getBestIndicesAChannelSnippet + "\n      void main() {\n        " + dtype + " coords = getOutputCoords();\n        bool hasNextCol = " + coords[rank - 1] + " < " + (outShape[rank - 1] - 1) + ";\n        bool hasNextRow = " + coords[rank - 2] + " < " + (outShape[rank - 2] - 1) + ";\n        " + sourceLocSetup + "\n        ivec4 srcIdx = ivec4(sourceLocR" + inChannel + ", sourceLocG" + inChannel + ",\n          sourceLocB" + inChannel + ", sourceLocA" + inChannel + ") * " + windowSize + ";\n        ivec4 inIdx = srcIdx;\n        vec4 bestIndex = vec4(inIdx);\n        vec4 bestValue = " + fetchValue + ";\n\n        for (int i = 0; i < " + windowSize + "; i++) {\n          inIdx = srcIdx;\n          " + fetchCandidateIdx + "\n          vec4 candidate = " + fetchValue + ";\n          bvec4 nan = isnan(candidate);\n          bvec4 replace = bvec4(\n            vec4(" + compOp + "(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));\n\n          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,\n                           replace.y  ? candidate.y : bestValue.y,\n                           replace.z  ? candidate.z : bestValue.z,\n                           replace.w  ? candidate.w : bestValue.w);\n          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));\n          srcIdx++;\n        }\n        setOutput(bestIndex);\n      }\n    ";
    }
    return ArgMinMaxPackedProgram;
}());
exports.ArgMinMaxPackedProgram = ArgMinMaxPackedProgram;
//# sourceMappingURL=argminmax_packed_gpu.js.map