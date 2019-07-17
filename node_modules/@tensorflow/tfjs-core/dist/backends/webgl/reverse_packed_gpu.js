"use strict";
/**
 * @license
 * Copyright 2019 Google LLC All Rights Reserved.
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
var ReversePackedProgram = /** @class */ (function () {
    function ReversePackedProgram(xShape, axis) {
        this.variableNames = ['x'];
        this.usesPackedTextures = true;
        var rank = xShape.length;
        if (rank > 4) {
            throw new Error("WebGL backend: Reverse of rank-" + rank + " tensor is not yet supported");
        }
        this.outputShape = xShape;
        var channels = packing_util_1.getChannels('rc', rank);
        var nextColumn = channels[rank - 1] + " + 1 < " + this.outputShape[rank - 1];
        var nextRow = channels[rank - 2] + " + 1 < " + this.outputShape[rank - 2];
        var type = shader_compiler_1.getCoordsDataType(rank);
        if (rank === 1) {
            this.userCode = "\n        void main(){\n          int rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = getChannel(getX(" + xShape[0] + " - rc - 1),\n            " + xShape[0] + " - rc - 1);\n          if(" + nextColumn + "){\n              result.g = getChannel(getX(" + xShape[0] + " - (rc  + 1) - 1),\n                " + xShape[0] + " - (rc  + 1) - 1);\n          }\n          setOutput(result);\n        }\n      ";
        }
        else {
            this.userCode = "\n        void main() {\n          " + type + " rc = getOutputCoords();\n          vec4 result = vec4(0.);\n          result.r = " + getR(channels.slice()) + ";\n          if(" + nextColumn + "){\n            result.g = " + getG(channels.slice()) + ";\n          }\n          if(" + nextRow + ") {\n            result.b = " + getB(channels.slice()) + ";\n            if(" + nextColumn + ") {\n              result.a = " + getA(channels.slice()) + ";\n            }\n          }\n          setOutput(result);\n        }\n    ";
        }
        function getR(channels) {
            return getChannel(channels);
        }
        function getG(channels) {
            channels[rank - 1] = '(' + channels[rank - 1] + " + 1)";
            return getChannel(channels);
        }
        function getB(channels) {
            channels[rank - 2] = '(' + channels[rank - 2] + " + 1)";
            return getChannel(channels);
        }
        function getA(channels) {
            channels[rank - 1] = '(' + channels[rank - 1] + " + 1)";
            channels[rank - 2] = '(' + channels[rank - 2] + " + 1)";
            return getChannel(channels);
        }
        function getChannel(channels) {
            var inCoordsArray = xShape.map(function (_, i) { return getInCoord(i, channels); });
            var inCoords = inCoordsArray.join(',');
            var innerDims = inCoordsArray.slice(-2).join(',');
            return "getChannel(getX(" + inCoords + "), vec2(" + innerDims + "))";
        }
        function getInCoord(i, channels1) {
            if (axis.indexOf(i) !== -1 && xShape[i] !== 1) {
                return xShape[i] + " - " + channels1[i] + " - 1";
            }
            else {
                return "" + channels1[i];
            }
        }
    }
    return ReversePackedProgram;
}());
exports.ReversePackedProgram = ReversePackedProgram;
//# sourceMappingURL=reverse_packed_gpu.js.map