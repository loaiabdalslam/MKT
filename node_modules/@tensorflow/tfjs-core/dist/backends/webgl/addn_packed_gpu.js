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
var AddNPackedProgram = /** @class */ (function () {
    function AddNPackedProgram(outputShape, shapes) {
        this.outputShape = [];
        this.usesPackedTextures = true;
        this.outputShape = outputShape;
        this.variableNames = shapes.map(function (_, i) { return "T" + i; });
        var snippets = [];
        // Get target elements from every input tensor.
        this.variableNames.forEach(function (variable) {
            snippets.push("vec4 v" + variable + " = get" + variable + "AtOutCoords();");
        });
        // Calculate the sum of all elements.
        var operation = this.variableNames.map(function (variable) {
            return "v" + variable;
        }).join(' + ');
        this.userCode = "\n      void main() {\n        " + snippets.join('\n        ') + "\n\n        vec4 result = " + operation + ";\n        setOutput(result);\n      }\n    ";
    }
    return AddNPackedProgram;
}());
exports.AddNPackedProgram = AddNPackedProgram;
//# sourceMappingURL=addn_packed_gpu.js.map