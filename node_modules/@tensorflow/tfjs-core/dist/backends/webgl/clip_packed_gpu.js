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
var ClipPackedProgram = /** @class */ (function () {
    function ClipPackedProgram(aShape) {
        this.variableNames = ['A'];
        this.usesPackedTextures = true;
        this.outputShape = aShape;
        this.userCode = "\n      uniform float min;\n      uniform float max;\n\n      void main() {\n        vec4 value = getAAtOutCoords();\n\n        if (any(isnan(value))) {\n          setOutput(value);\n          return;\n        }\n\n        setOutput(clamp(value, vec4(min), vec4(max)));\n      }\n    ";
    }
    ClipPackedProgram.prototype.getCustomSetupFunc = function (min, max) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.minLoc == null) {
                _this.minLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'min');
                _this.maxLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'max');
            }
            gpgpu.gl.uniform1f(_this.minLoc, min);
            gpgpu.gl.uniform1f(_this.maxLoc, max);
        };
    };
    return ClipPackedProgram;
}());
exports.ClipPackedProgram = ClipPackedProgram;
//# sourceMappingURL=clip_packed_gpu.js.map