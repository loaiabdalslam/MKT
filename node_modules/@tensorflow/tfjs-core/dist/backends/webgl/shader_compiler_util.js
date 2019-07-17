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
var util = require("../../util");
/**
 * Produces GLSL code that derives logical coordinates from a flat
 * index. The code performs integer division with each stride and decrements
 * the index until the index equals the final dimension coordinate.
 */
function getLogicalCoordinatesFromFlatIndex(coords, shape, index) {
    if (index === void 0) { index = 'index'; }
    var strides = util.computeStrides(shape);
    return strides
        .map(function (stride, i) {
        var line1 = "int " + coords[i] + " = " + index + " / " + stride;
        var line2 = i === strides.length - 1 ?
            "int " + coords[i + 1] + " = " + index + " - " + coords[i] + " * " + stride :
            "index -= " + coords[i] + " * " + stride;
        return line1 + "; " + line2 + ";";
    })
        .join('');
}
exports.getLogicalCoordinatesFromFlatIndex = getLogicalCoordinatesFromFlatIndex;
function buildVec(x) {
    if (x.length === 1) {
        return "" + x[0];
    }
    return "vec" + x.length + "(" + x.join(',') + ")";
}
/**
 * Produces GLSL code that computes the dot product of the input x and y
 * vectors. Handles splitting inputs into increments of vec4s when necessary.
 */
function dotify(x, y) {
    if (x.length !== y.length) {
        throw new Error("Vectors to be dotted must be of the same length -" +
            ("got " + x.length + " and " + y.length));
    }
    var slices = [];
    var nearestVec4 = Math.floor(x.length / 4);
    var nearestVec4Remainder = x.length % 4;
    for (var i = 0; i < nearestVec4; i++) {
        var xSlice = x.slice(i * 4, i * 4 + 4);
        var ySlice = y.slice(i * 4, i * 4 + 4);
        slices.push(buildVec(xSlice) + ", " + buildVec(ySlice));
    }
    if (nearestVec4Remainder !== 0) {
        var xSlice = x.slice(nearestVec4 * 4);
        var ySlice = y.slice(nearestVec4 * 4);
        if (xSlice.length === 1) {
            xSlice = xSlice.map(function (d) { return "float(" + d + ")"; });
            ySlice = ySlice.map(function (d) { return "float(" + d + ")"; });
        }
        slices.push(buildVec(xSlice) + ", " + buildVec(ySlice));
    }
    return slices.map(function (d, i) { return "dot(" + d + ")"; }).join('+');
}
exports.dotify = dotify;
/**
 * Produces GLSL that computes the flat index from 3D coordinates.
 */
function getFlatIndexFrom3D(shape) {
    var strides = util.computeStrides(shape).map(function (d) { return d.toString(); });
    return "\n  int getFlatIndex(ivec3 coords) {\n    return coords.x * " + strides[0] + " + coords.y * " + strides[1] + " + coords.z;\n  }\n";
}
exports.getFlatIndexFrom3D = getFlatIndexFrom3D;
exports.ENCODE_FLOAT_SNIPPET = "\n  const float FLOAT_MAX = 1.70141184e38;\n  const float FLOAT_MIN = 1.17549435e-38;\n\n  lowp vec4 encode_float(highp float v) {\n    if (isnan(v)) {\n      return vec4(255, 255, 255, 255);\n    }\n\n    highp float av = abs(v);\n\n    if(av < FLOAT_MIN) {\n      return vec4(0.0, 0.0, 0.0, 0.0);\n    } else if(v > FLOAT_MAX) {\n      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;\n    } else if(v < -FLOAT_MAX) {\n      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;\n    }\n\n    highp vec4 c = vec4(0,0,0,0);\n\n    highp float e = floor(log2(av));\n    highp float m = exp2(fract(log2(av))) - 1.0;\n\n    c[2] = floor(128.0 * m);\n    m -= c[2] / 128.0;\n    c[1] = floor(32768.0 * m);\n    m -= c[1] / 32768.0;\n    c[0] = floor(8388608.0 * m);\n\n    highp float ebias = e + 127.0;\n    c[3] = floor(ebias / 2.0);\n    ebias -= c[3] * 2.0;\n    c[2] += floor(ebias) * 128.0;\n\n    c[3] += 128.0 * step(0.0, -v);\n\n    return c / 255.0;\n  }\n";
//# sourceMappingURL=shader_compiler_util.js.map