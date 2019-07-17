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
var broadcast_util = require("../../ops/broadcast_util");
var CHECK_NAN_SNIPPET = "\n  if (isnan(a)) return a;\n  if (isnan(b)) return b;\n";
exports.ADD = 'return a + b;';
exports.SUB = 'return a - b;';
exports.MUL = 'return a * b;';
// Without the equality check div produces 0.9999 for a = b, which when
// floored can cause errors.
exports.DIV = "\nif (b == 0.0) {\n  return NAN;\n} \nif (a == b) {\n  return 1.0;\n};\nreturn a / b;";
// We use native integer division to deal with floating point imprecision. Since
// we implement floor division and glsl implements truncated division, we
// correct for this by subtracting 1 from result when the result is negative and
// there is a remainder.
exports.INT_DIV = "\n  float s = sign(a) * sign(b);\n  int ia = round(a);\n  int ib = round(b);\n  if (ib != 0) {\n    // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n    return float(idiv(ia, ib, s));\n  } else {\n    return NAN;\n  }\n";
exports.POW = "\nif(a < 0.0 && floor(b) < b){\n  return NAN;\n}\nreturn (round(mod(b, 2.0)) != 1) ?\n    pow(abs(a), b) : sign(a) * pow(abs(a), b);\n";
exports.SQUARED_DIFFERENCE = 'return (a - b) * (a - b);';
exports.EQUAL = "return float(a == b);";
exports.NOT_EQUAL = "return float(a != b);";
exports.LESS = "return float(a < b);";
exports.LESS_EQUAL = "return float(a <= b);";
exports.GREATER = "return float(a > b);";
exports.GREATER_EQUAL = "return float(a >= b);";
exports.LOGICAL_AND = "return float(a >= 1.0 && b >= 1.0);";
exports.LOGICAL_OR = "return float(a >= 1.0 || b >= 1.0);";
exports.MAX = CHECK_NAN_SNIPPET + "\n  return max(a, b);\n";
exports.MIN = CHECK_NAN_SNIPPET + "\n  return min(a, b);\n";
exports.MOD = "if (b == 0.0) return NAN;\n  return mod(a, b);";
exports.ATAN2 = CHECK_NAN_SNIPPET + "\n  return atan(a, b);\n";
exports.ELU_DER = "return (b >= 1.0) ? a : a * (b + 1.0);";
exports.PRELU = "return (a < 0.) ? b * a : a;";
var BinaryOpProgram = /** @class */ (function () {
    function BinaryOpProgram(op, aShape, bShape) {
        this.variableNames = ['A', 'B'];
        this.outputShape =
            broadcast_util.assertAndGetBroadcastShape(aShape, bShape);
        this.userCode = "\n      float binaryOperation(float a, float b) {\n        " + op + "\n      }\n\n      void main() {\n        float a = getAAtOutCoords();\n        float b = getBAtOutCoords();\n        setOutput(binaryOperation(a, b));\n      }\n    ";
    }
    return BinaryOpProgram;
}());
exports.BinaryOpProgram = BinaryOpProgram;
//# sourceMappingURL=binaryop_gpu.js.map