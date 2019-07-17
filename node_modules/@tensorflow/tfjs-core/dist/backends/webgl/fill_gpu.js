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
var FillProgram = /** @class */ (function () {
    function FillProgram(shape, value) {
        this.outputShape = [];
        this.variableNames = ['x'];
        this.outputShape = shape;
        this.userCode = "\n      uniform float value;\n      void main() {\n        // Input can be obtained from uniform value.\n        setOutput(value);\n      }\n    ";
    }
    FillProgram.prototype.getCustomSetupFunc = function (value) {
        var _this = this;
        return function (gpgpu, webGLProgram) {
            if (_this.valueLoc == null) {
                _this.valueLoc = gpgpu.getUniformLocationNoThrow(webGLProgram, 'value');
            }
            gpgpu.gl.uniform1f(_this.valueLoc, value);
        };
    };
    return FillProgram;
}());
exports.FillProgram = FillProgram;
//# sourceMappingURL=fill_gpu.js.map