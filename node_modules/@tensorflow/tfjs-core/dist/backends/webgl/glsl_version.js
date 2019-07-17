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
var environment_1 = require("../../environment");
function getGlslDifferences() {
    var version;
    var attribute;
    var varyingVs;
    var varyingFs;
    var texture2D;
    var output;
    var defineOutput;
    var defineSpecialNaN;
    var defineSpecialInf;
    var defineRound;
    if (environment_1.ENV.getNumber('WEBGL_VERSION') === 2) {
        version = '#version 300 es';
        attribute = 'in';
        varyingVs = 'out';
        varyingFs = 'in';
        texture2D = 'texture';
        output = 'outputColor';
        defineOutput = 'out vec4 outputColor;';
        defineSpecialNaN = "\n      bool isnan_custom(float val) {\n        return (val > 0. || val < 0. || val == 0.) ? false : true;\n      }\n    ";
        defineSpecialInf = "\n      const float INFINITY = uintBitsToFloat(uint(0x7f800000));\n    ";
        defineRound = "\n      #define round(value) newRound(value)\n      int newRound(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 newRound(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    ";
    }
    else {
        version = '';
        attribute = 'attribute';
        varyingVs = 'varying';
        varyingFs = 'varying';
        texture2D = 'texture2D';
        output = 'gl_FragColor';
        defineOutput = '';
        defineSpecialNaN = "\n      bool isnan_custom(float val) {\n        return (val > 0. || val < 1. || val == 0.) ? false : true;\n      }\n    ";
        defineSpecialInf = "\n      uniform float INFINITY;\n\n      bool isinf(float val) {\n        return abs(val) == INFINITY;\n      }\n      bvec4 isinf(vec4 val) {\n        return equal(abs(val), vec4(INFINITY));\n      }\n    ";
        defineRound = "\n      int round(float value) {\n        return int(floor(value + 0.5));\n      }\n\n      ivec4 round(vec4 value) {\n        return ivec4(floor(value + vec4(0.5)));\n      }\n    ";
    }
    return {
        version: version,
        attribute: attribute,
        varyingVs: varyingVs,
        varyingFs: varyingFs,
        texture2D: texture2D,
        output: output,
        defineOutput: defineOutput,
        defineSpecialNaN: defineSpecialNaN,
        defineSpecialInf: defineSpecialInf,
        defineRound: defineRound
    };
}
exports.getGlslDifferences = getGlslDifferences;
//# sourceMappingURL=glsl_version.js.map