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
var broadcast_util = require("../../ops/broadcast_util");
var util_1 = require("../../util");
var packing_util_1 = require("../packing_util");
var shader_compiler_1 = require("./shader_compiler");
var CHECK_NAN_SNIPPET = "\n  result.r = isNaN.r > 0. ? NAN : result.r;\n  result.g = isNaN.g > 0. ? NAN : result.g;\n  result.b = isNaN.b > 0. ? NAN : result.b;\n  result.a = isNaN.a > 0. ? NAN : result.a;\n";
// We do the same as in ./binaryop_gpu, with vec4 and ivec4.
// On Linux, the vectorized implementation produces NaNs when a and b are 0.
exports.DIV = "\n  // vec4 one = vec4(equal(a, b));\n  // return one + (vec4(1.0) - one) * a / b;\n  vec4 result = a / b;\n  if(b.x == 0.0) {\n    result.x = NAN;\n  } else if(a.x == b.x) {\n    result.x = 1.;\n  }\n  if(b.y == 0.0) {\n    result.y = NAN;\n  } else if(a.y == b.y) {\n    result.y = 1.;\n  }\n  if(b.z == 0.0) {\n    result.z = NAN;\n  } else if(a.z == b.z) {\n    result.z = 1.;\n  }\n  if(b.w == 0.0) {\n    result.w = NAN;\n  } else if(a.w == b.w) {\n    result.w = 1.;\n  }\n  \n  return result;\n";
exports.INT_DIV = "\n  ivec4 ia = round(a);\n  ivec4 ib = round(b);\n  bvec4 cond = notEqual(ib, ivec4(0));\n  ivec4 result = ivec4(0);\n  vec4 s = sign(a) * sign(b);\n\n  // Windows (D3D) wants guaranteed non-zero int division at compile-time.\n  if (cond[0]) {\n    result[0] = idiv(ia[0], ib[0], s[0]);\n  }\n  if (cond[1]) {\n    result[1] = idiv(ia[1], ib[1], s[1]);\n  }\n  if (cond[2]) {\n    result[2] = idiv(ia[2], ib[2], s[2]);\n  }\n  if (cond[3]) {\n    result[3] = idiv(ia[3], ib[3], s[3]);\n  }\n  return vec4(result);\n";
exports.POW = "\n  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.\n  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));\n  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);\n  vec4 result = multiplier * pow(abs(a), b);\n\n  vec4 isNaN = vec4(lessThan(a, vec4(0.0))) * vec4(lessThan(floor(b), b));\n  " +
    CHECK_NAN_SNIPPET + "\n  return result;\n";
exports.PRELU = "\n  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));\n  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);\n";
exports.ELU_DER = "\n  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));\n  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));\n";
exports.ATAN2 = "\n  vec4 result = atan(a, b);\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  " +
    CHECK_NAN_SNIPPET + "\n  return result;\n";
exports.EQUAL = "\n  return vec4(equal(a, b));\n";
exports.NOT_EQUAL = "\n  return vec4(notEqual(a, b));\n";
exports.LESS = "\n  return vec4(lessThan(a, b));\n";
exports.LESS_EQUAL = "\n  return vec4(lessThanEqual(a, b));\n";
exports.GREATER = "\n  return vec4(greaterThan(a, b));\n";
exports.GREATER_EQUAL = "\n  return vec4(greaterThanEqual(a, b));\n";
exports.LOGICAL_AND = "\n  return vec4(\n    vec4(greaterThanEqual(a, vec4(1.0))) *\n    vec4(greaterThanEqual(b, vec4(1.0))));\n";
exports.LOGICAL_OR = "\n  return min(\n    vec4(greaterThanEqual(a, vec4(1.0))) +\n    vec4(greaterThanEqual(b, vec4(1.0))),\n    vec4(1.0));\n";
exports.MAX = "\n  vec4 result = vec4(max(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  " +
    CHECK_NAN_SNIPPET + "\n  return result;\n";
exports.MIN = "\n  vec4 result = vec4(min(a, b));\n  vec4 isNaN = min(vec4(isnan(a)) + vec4(isnan(b)), vec4(1.0));\n  " +
    CHECK_NAN_SNIPPET + "\n  return result;\n";
exports.MOD = "\n  vec4 result = mod(a, b);\n  vec4 isNaN = vec4(equal(b, vec4(0.0)));\n  " +
    CHECK_NAN_SNIPPET + "\n  return result;\n";
var BinaryOpPackedProgram = /** @class */ (function () {
    function BinaryOpPackedProgram(op, aShape, bShape, checkOutOfBounds) {
        if (checkOutOfBounds === void 0) { checkOutOfBounds = false; }
        this.variableNames = ['A', 'B'];
        this.supportsBroadcasting = true;
        this.usesPackedTextures = true;
        this.outputShape =
            broadcast_util.assertAndGetBroadcastShape(aShape, bShape);
        var rank = this.outputShape.length;
        var checkOutOfBoundsString = '';
        if (checkOutOfBounds) {
            if (rank === 0 || util_1.sizeFromShape(this.outputShape) === 1) {
                checkOutOfBoundsString = "\n          result.y = 0.;\n          result.z = 0.;\n          result.w = 0.;\n        ";
            }
            else {
                var dtype = shader_compiler_1.getCoordsDataType(rank);
                checkOutOfBoundsString = "\n          " + dtype + " coords = getOutputCoords();\n        ";
                if (rank === 1) {
                    checkOutOfBoundsString += "\n            result.y = (coords + 1) >= " + this.outputShape[0] + " ? 0. : result.y;\n            result.z = 0.;\n            result.w = 0.;\n          ";
                }
                else {
                    var channels = packing_util_1.getChannels('coords', rank);
                    checkOutOfBoundsString += "\n            bool nextRowOutOfBounds =\n              (" + channels[rank - 2] + " + 1) >= " + this.outputShape[rank - 2] + ";\n            bool nextColOutOfBounds =\n              (" + channels[rank - 1] + " + 1) >= " + this.outputShape[rank - 1] + ";\n            result.y = nextColOutOfBounds ? 0. : result.y;\n            result.z = nextRowOutOfBounds ? 0. : result.z;\n            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;\n          ";
                }
            }
        }
        this.userCode = "\n      vec4 binaryOperation(vec4 a, vec4 b) {\n        " + op + "\n      }\n\n      void main() {\n        vec4 a = getAAtOutCoords();\n        vec4 b = getBAtOutCoords();\n\n        vec4 result = binaryOperation(a, b);\n        " + checkOutOfBoundsString + "\n\n        setOutput(result);\n      }\n    ";
    }
    return BinaryOpPackedProgram;
}());
exports.BinaryOpPackedProgram = BinaryOpPackedProgram;
//# sourceMappingURL=binaryop_packed_gpu.js.map