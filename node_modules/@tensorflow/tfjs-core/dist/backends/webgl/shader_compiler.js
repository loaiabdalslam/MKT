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
var broadcast_util_1 = require("../../ops/broadcast_util");
var util = require("../../util");
var glsl_version_1 = require("./glsl_version");
var shader_util = require("./shader_compiler_util");
function makeShader(inputsInfo, outputShape, userCode, usesPackedTextures) {
    var prefixSnippets = [];
    inputsInfo.forEach(function (x) {
        var size = util.sizeFromShape(x.shapeInfo.logicalShape);
        // Snippet when we decided to upload the values as uniform.
        if (x.shapeInfo.isUniform) {
            prefixSnippets.push("uniform float " + x.name + (size > 1 ? "[" + size + "]" : '') + ";");
        }
        else {
            prefixSnippets.push("uniform sampler2D " + x.name + ";");
            prefixSnippets.push("uniform int offset" + x.name + ";");
        }
    });
    var inputPrefixSnippet = prefixSnippets.join('\n');
    var inputSamplingSnippet = inputsInfo
        .map(function (x) { return getInputSamplingSnippet(x, outputShape, usesPackedTextures); })
        .join('\n');
    var outTexShape = outputShape.texShape;
    var glsl = glsl_version_1.getGlslDifferences();
    var floatTextureSampleSnippet = getFloatTextureSampleSnippet(glsl);
    var outputSamplingSnippet;
    var floatTextureSetOutputSnippet;
    var shaderPrefix = getShaderPrefix(glsl);
    if (outputShape.isPacked) {
        outputSamplingSnippet =
            getPackedOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
        floatTextureSetOutputSnippet = getFloatTextureSetRGBASnippet(glsl);
    }
    else {
        outputSamplingSnippet =
            getOutputSamplingSnippet(outputShape.logicalShape, outTexShape);
        floatTextureSetOutputSnippet = getFloatTextureSetRSnippet(glsl);
    }
    if (usesPackedTextures) {
        shaderPrefix += SHADER_PACKED_PREFIX;
    }
    var source = [
        shaderPrefix, floatTextureSampleSnippet, floatTextureSetOutputSnippet,
        inputPrefixSnippet, outputSamplingSnippet, inputSamplingSnippet, userCode
    ].join('\n');
    return source;
}
exports.makeShader = makeShader;
function getSamplerFromInInfo(inInfo) {
    var shape = inInfo.shapeInfo.logicalShape;
    switch (shape.length) {
        case 0:
            return getSamplerScalar(inInfo);
        case 1:
            return getSampler1D(inInfo);
        case 2:
            return getSampler2D(inInfo);
        case 3:
            return getSampler3D(inInfo);
        case 4:
            return getSampler4D(inInfo);
        case 5:
            return getSampler5D(inInfo);
        case 6:
            return getSampler6D(inInfo);
        default:
            throw new Error(shape.length + "-D input sampling" +
                " is not yet supported");
    }
}
function getPackedSamplerFromInInfo(inInfo) {
    var shape = inInfo.shapeInfo.logicalShape;
    switch (shape.length) {
        case 0:
            return getPackedSamplerScalar(inInfo);
        case 1:
            return getPackedSampler1D(inInfo);
        case 2:
            return getPackedSampler2D(inInfo);
        case 3:
            return getPackedSampler3D(inInfo);
        default:
            return getPackedSamplerND(inInfo);
    }
}
function getInputSamplingSnippet(inInfo, outShapeInfo, usesPackedTextures) {
    if (usesPackedTextures === void 0) { usesPackedTextures = false; }
    var res = '';
    if (usesPackedTextures) {
        res += getPackedSamplerFromInInfo(inInfo);
    }
    else {
        res += getSamplerFromInInfo(inInfo);
    }
    var inShape = inInfo.shapeInfo.logicalShape;
    var outShape = outShapeInfo.logicalShape;
    if (inShape.length <= outShape.length) {
        if (usesPackedTextures) {
            res += getPackedSamplerAtOutputCoords(inInfo, outShapeInfo);
        }
        else {
            res += getSamplerAtOutputCoords(inInfo, outShapeInfo);
        }
    }
    return res;
}
function getPackedOutputSamplingSnippet(outShape, outTexShape) {
    switch (outShape.length) {
        case 0:
            return getOutputScalarCoords();
        case 1:
            return getOutputPacked1DCoords(outShape, outTexShape);
        case 2:
            return getOutputPacked2DCoords(outShape, outTexShape);
        case 3:
            return getOutputPacked3DCoords(outShape, outTexShape);
        default:
            return getOutputPackedNDCoords(outShape, outTexShape);
    }
}
function getOutputSamplingSnippet(outShape, outTexShape) {
    switch (outShape.length) {
        case 0:
            return getOutputScalarCoords();
        case 1:
            return getOutput1DCoords(outShape, outTexShape);
        case 2:
            return getOutput2DCoords(outShape, outTexShape);
        case 3:
            return getOutput3DCoords(outShape, outTexShape);
        case 4:
            return getOutput4DCoords(outShape, outTexShape);
        case 5:
            return getOutput5DCoords(outShape, outTexShape);
        case 6:
            return getOutput6DCoords(outShape, outTexShape);
        default:
            throw new Error(outShape.length + "-D output sampling is not yet supported");
    }
}
function getFloatTextureSampleSnippet(glsl) {
    return "\n    float sampleTexture(sampler2D textureSampler, vec2 uv) {\n      return " + glsl.texture2D + "(textureSampler, uv).r;\n    }\n  ";
}
function getFloatTextureSetRSnippet(glsl) {
    return "\n    void setOutput(float val) {\n      " + glsl.output + " = vec4(val, 0, 0, 0);\n    }\n  ";
}
function getFloatTextureSetRGBASnippet(glsl) {
    return "\n    void setOutput(vec4 val) {\n      " + glsl.output + " = val;\n    }\n  ";
}
function getShaderPrefix(glsl) {
    var SHADER_PREFIX = glsl.version + "\n    precision highp float;\n    precision highp int;\n    precision highp sampler2D;\n    " + glsl.varyingFs + " vec2 resultUV;\n    " + glsl.defineOutput + "\n    const vec2 halfCR = vec2(0.5, 0.5);\n\n    struct ivec5\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n    };\n\n    struct ivec6\n    {\n      int x;\n      int y;\n      int z;\n      int w;\n      int u;\n      int v;\n    };\n\n    uniform float NAN;\n    #define isnan(value) isnan_custom(value)\n    " + glsl.defineSpecialNaN + "\n    bvec4 isnan_custom(vec4 val) {\n      return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));\n    }\n\n    " + glsl.defineSpecialInf + "\n    " + glsl.defineRound + "\n\n    int imod(int x, int y) {\n      return x - y * (x / y);\n    }\n\n    int idiv(int a, int b, float sign) {\n      int res = a / b;\n      int mod = imod(a, b);\n      if (sign < 0. && mod != 0) {\n        res -= 1;\n      }\n      return res;\n    }\n\n    //Based on the work of Dave Hoskins\n    //https://www.shadertoy.com/view/4djSRW\n    #define HASHSCALE1 443.8975\n    float random(float seed){\n      vec2 p = resultUV * seed;\n      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);\n      p3 += dot(p3, p3.yzx + 19.19);\n      return fract((p3.x + p3.y) * p3.z);\n    }\n\n    " + SAMPLE_1D_SNIPPET + "\n    " + SAMPLE_2D_SNIPPET + "\n    " + SAMPLE_3D_SNIPPET + "\n  ";
    return SHADER_PREFIX;
}
var SAMPLE_1D_SNIPPET = "\nvec2 uvFromFlat(int texNumR, int texNumC, int index) {\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\nvec2 packedUVfrom1D(int texNumR, int texNumC, int index) {\n  int texelIndex = index / 2;\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_2D_SNIPPET = "\nvec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,\n  int texNumC, int row, int col) {\n  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = texelIndex / texNumC;\n  int texC = texelIndex - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SAMPLE_3D_SNIPPET = "\nvec2 packedUVfrom3D(int texNumR, int texNumC,\n    int texelsInBatch, int texelsInLogicalRow, int b,\n    int row, int col) {\n  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);\n  int texR = index / texNumC;\n  int texC = index - texR * texNumC;\n  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);\n}\n";
var SHADER_PACKED_PREFIX = "\n  float getChannel(vec4 frag, vec2 innerDims) {\n    vec2 modCoord = mod(innerDims, 2.);\n    return modCoord.x == 0. ?\n      (modCoord.y == 0. ? frag.r : frag.g) :\n      (modCoord.y == 0. ? frag.b : frag.a);\n  }\n  float getChannel(vec4 frag, int dim) {\n    float modCoord = mod(float(dim), 2.);\n    return modCoord == 0. ? frag.r : frag.g;\n  }\n";
function getOutputScalarCoords() {
    return "\n    int getOutputCoords() {\n      return 0;\n    }\n  ";
}
function getOutputPacked1DCoords(shape, texShape) {
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    if (packedTexShape[0] === 1) {
        return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.x * " + packedTexShape[1] + ".0);\n      }\n    ";
    }
    if (packedTexShape[1] === 1) {
        return "\n      int getOutputCoords() {\n        return 2 * int(resultUV.y * " + packedTexShape[0] + ".0);\n      }\n    ";
    }
    return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      return 2 * (resTexRC.x * " + packedTexShape[1] + " + resTexRC.y);\n    }\n  ";
}
function getOutput1DCoords(shape, texShape) {
    if (texShape[0] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.x * " + texShape[1] + ".0);\n      }\n    ";
    }
    if (texShape[1] === 1) {
        return "\n      int getOutputCoords() {\n        return int(resultUV.y * " + texShape[0] + ".0);\n      }\n    ";
    }
    return "\n    int getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      return resTexRC.x * " + texShape[1] + " + resTexRC.y;\n    }\n  ";
}
function getOutputPacked3DCoords(shape, texShape) {
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    var texelsInLogicalRow = Math.ceil(shape[2] / 2);
    var texelsInBatch = texelsInLogicalRow * Math.ceil(shape[1] / 2);
    return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n\n      int b = index / " + texelsInBatch + ";\n      index -= b * " + texelsInBatch + ";\n\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec3(b, r, c);\n    }\n  ";
}
function getOutput3DCoords(shape, texShape) {
    var coordsFromIndexSnippet = shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd'], shape);
    return "\n    ivec3 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      " + coordsFromIndexSnippet + "\n      return ivec3(r, c, d);\n    }\n  ";
}
function getOutputPackedNDCoords(shape, texShape) {
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    var texelsInLogicalRow = Math.ceil(shape[shape.length - 1] / 2);
    var texelsInBatch = texelsInLogicalRow * Math.ceil(shape[shape.length - 2] / 2);
    var texelsInBatchN = texelsInBatch;
    var batches = "";
    var coords = 'b, r, c';
    for (var b = 2; b < shape.length - 1; b++) {
        texelsInBatchN *= shape[shape.length - b - 1];
        batches = "\n      int b" + b + " = index / " + texelsInBatchN + ";\n      index -= b" + b + " * " + texelsInBatchN + ";\n    " + batches;
        coords = "b" + b + ", " + coords;
    }
    return "\n    ivec" + shape.length + " getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n\n      " + batches + "\n\n      int b = index / " + texelsInBatch + ";\n      index -= b * " + texelsInBatch + ";\n\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec" + shape.length + "(" + coords + ");\n    }\n  ";
}
function getOutput4DCoords(shape, texShape) {
    var coordsFromIndexSnippet = shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd', 'd2'], shape);
    return "\n    ivec4 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      " + coordsFromIndexSnippet + "\n      return ivec4(r, c, d, d2);\n    }\n  ";
}
function getOutput5DCoords(shape, texShape) {
    var coordsFromIndexSnippet = shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd', 'd2', 'd3'], shape);
    return "\n    ivec5 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx * vec2(" + texShape[0] + ",\n                             " + texShape[1] + "));\n\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n\n      " + coordsFromIndexSnippet + "\n\n      ivec5 outShape = ivec5(r, c, d, d2, d3);\n      return outShape;\n    }\n  ";
}
function getOutput6DCoords(shape, texShape) {
    var coordsFromIndexSnippet = shader_util.getLogicalCoordinatesFromFlatIndex(['r', 'c', 'd', 'd2', 'd3', 'd4'], shape);
    return "\n    ivec6 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n        vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n\n      " + coordsFromIndexSnippet + "\n\n      ivec6 result = ivec6(r, c, d, d2, d3, d4);\n      return result;\n    }\n  ";
}
function getOutputPacked2DCoords(shape, texShape) {
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    if (util.arraysEqual(shape, texShape)) {
        return "\n      ivec2 getOutputCoords() {\n        return 2 * ivec2(resultUV.yx * vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n      }\n    ";
    }
    // texels needed to accommodate a logical row
    var texelsInLogicalRow = Math.ceil(shape[1] / 2);
    /**
     * getOutputCoords
     *
     * resTexRC: The rows and columns of the texels. If you move over one
     * texel to the right in the packed texture, you are moving over one column
     * (not two).
     *
     * index: The texel index
     */
    return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + packedTexShape[0] + ", " + packedTexShape[1] + "));\n\n      int index = resTexRC.x * " + packedTexShape[1] + " + resTexRC.y;\n      int r = 2 * (index / " + texelsInLogicalRow + ");\n      int c = imod(index, " + texelsInLogicalRow + ") * 2;\n\n      return ivec2(r, c);\n    }\n  ";
}
function getOutput2DCoords(shape, texShape) {
    if (util.arraysEqual(shape, texShape)) {
        return "\n      ivec2 getOutputCoords() {\n        return ivec2(resultUV.yx * vec2(" + texShape[0] + ", " + texShape[1] + "));\n      }\n    ";
    }
    if (shape[1] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(index, 0);\n      }\n    ";
    }
    if (shape[0] === 1) {
        return "\n      ivec2 getOutputCoords() {\n        ivec2 resTexRC = ivec2(resultUV.yx *\n                               vec2(" + texShape[0] + ", " + texShape[1] + "));\n        int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n        return ivec2(0, index);\n      }\n    ";
    }
    return "\n    ivec2 getOutputCoords() {\n      ivec2 resTexRC = ivec2(resultUV.yx *\n                             vec2(" + texShape[0] + ", " + texShape[1] + "));\n      int index = resTexRC.x * " + texShape[1] + " + resTexRC.y;\n      int r = index / " + shape[1] + ";\n      int c = index - r * " + shape[1] + ";\n      return ivec2(r, c);\n    }\n  ";
}
function getFlatOffsetUniformName(texName) {
    return "offset" + texName;
}
function getPackedSamplerScalar(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var glsl = glsl_version_1.getGlslDifferences();
    return "\n    vec4 " + funcName + "() {\n      return " + glsl.texture2D + "(" + texName + ", halfCR);\n    }\n  ";
}
function getSamplerScalar(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    if (inputInfo.shapeInfo.isUniform) {
        return "float " + funcName + "() {return " + texName + ";}";
    }
    var _a = inputInfo.shapeInfo.texShape, texNumR = _a[0], texNumC = _a[1];
    if (texNumR === 1 && texNumC === 1) {
        return "\n      float " + funcName + "() {\n        return sampleTexture(" + texName + ", halfCR);\n      }\n    ";
    }
    var _b = inputInfo.shapeInfo.texShape, tNumR = _b[0], tNumC = _b[1];
    var offset = getFlatOffsetUniformName(texName);
    return "\n    float " + funcName + "() {\n      vec2 uv = uvFromFlat(" + tNumR + ", " + tNumC + ", " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
}
function getPackedSampler1D(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texShape = inputInfo.shapeInfo.texShape;
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    var glsl = glsl_version_1.getGlslDifferences();
    return "\n    vec4 " + funcName + "(int index) {\n      vec2 uv = packedUVfrom1D(\n        " + packedTexShape[0] + ", " + packedTexShape[1] + ", index);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
}
function getSampler1D(inputInfo) {
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int index) {\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var texShape = inputInfo.shapeInfo.texShape;
    var tNumR = texShape[0];
    var tNumC = texShape[1];
    if (tNumC === 1 && tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        return sampleTexture(" + texName + ", halfCR);\n      }\n    ";
    }
    var offset = getFlatOffsetUniformName(texName);
    if (tNumC === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2(0.5, (float(index + " + offset + ") + 0.5) / " + tNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    if (tNumR === 1) {
        return "\n      float " + funcName + "(int index) {\n        vec2 uv = vec2((float(index + " + offset + ") + 0.5) / " + tNumC + ".0, 0.5);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    return "\n    float " + funcName + "(int index) {\n      vec2 uv = uvFromFlat(" + tNumR + ", " + tNumC + ", index + " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
}
function getPackedSampler2D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texShape = inputInfo.shapeInfo.texShape;
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var glsl = glsl_version_1.getGlslDifferences();
    if (texShape != null && util.arraysEqual(shape, texShape)) {
        return "\n      vec4 " + funcName + "(int row, int col) {\n        vec2 uv = (vec2(col, row) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n\n        return " + glsl.texture2D + "(" + texName + ", uv);\n      }\n    ";
    }
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    var valuesPerRow = Math.ceil(shape[1] / 2);
    return "\n    vec4 " + funcName + "(int row, int col) {\n      vec2 uv = packedUVfrom2D(" + valuesPerRow + ", " + packedTexShape[0] + ", " + packedTexShape[1] + ", row, col);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
}
function getSampler2D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texShape = inputInfo.shapeInfo.texShape;
    if (texShape != null && util.arraysEqual(shape, texShape)) {
        var texNumR_1 = texShape[0];
        var texNumC_1 = texShape[1];
        return "\n    float " + funcName + "(int row, int col) {\n      vec2 uv = (vec2(col, row) + halfCR) / vec2(" + texNumC_1 + ".0, " + texNumR_1 + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
    }
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    var squeezedShape = newShape;
    if (squeezedShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
        var params = ['row', 'col'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col) {\n        int index = round(dot(vec2(row, col), vec2(" + shape[1] + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var offset = getFlatOffsetUniformName(texName);
    if (texNumC === 1) {
        // index is used directly as physical (no risk of float16 overflow).
        return "\n    float " + funcName + "(int row, int col) {\n      float index = dot(vec3(row, col, " + offset + "), vec3(" + shape[1] + ", 1, 1));\n      vec2 uv = vec2(0.5, (index + 0.5) / " + texNumR + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
    }
    if (texNumR === 1) {
        // index is used directly as physical (no risk of float16 overflow).
        return "\n    float " + funcName + "(int row, int col) {\n      float index = dot(vec3(row, col, " + offset + "), vec3(" + shape[1] + ", 1, 1));\n      vec2 uv = vec2((index + 0.5) / " + texNumC + ".0, 0.5);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
    }
    return "\n  float " + funcName + "(int row, int col) {\n    // Explicitly use integer operations as dot() only works on floats.\n    int index = row * " + shape[1] + " + col + " + offset + ";\n    vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n    return sampleTexture(" + texName + ", uv);\n  }\n";
}
function getPackedSampler3D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texShape = inputInfo.shapeInfo.texShape;
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    if (shape[0] === 1) {
        var squeezedShape = shape.slice(1);
        var keptDims = [1, 2];
        var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
        var params = ['b', 'row', 'col'];
        return "\n        " + getPackedSamplerFromInInfo(newInputInfo) + "\n        vec4 " + funcName + "(int b, int row, int col) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
    }
    var texNumR = packedTexShape[0];
    var texNumC = packedTexShape[1];
    var valuesPerRow = Math.ceil(shape[2] / 2);
    var texelsInBatch = valuesPerRow * Math.ceil(shape[1] / 2);
    var glsl = glsl_version_1.getGlslDifferences();
    return "\n    vec4 " + funcName + "(int b, int row, int col) {\n      vec2 uv = packedUVfrom3D(\n        " + texNumR + ", " + texNumC + ", " + texelsInBatch + ", " + valuesPerRow + ", b, row, col);\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
}
function getSampler3D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var stride0 = shape[1] * shape[2];
    var stride1 = shape[2];
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    var squeezedShape = newShape;
    if (squeezedShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, squeezedShape);
        var params = ['row', 'col', 'depth'];
        return "\n        " + getSamplerFromInInfo(newInputInfo) + "\n        float " + funcName + "(int row, int col, int depth) {\n          return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n        }\n      ";
    }
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth) {\n        int index = round(dot(vec3(row, col, depth),\n                          vec3(" + stride0 + ", " + stride1 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var texShape = inputInfo.shapeInfo.texShape;
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    var flatOffset = inputInfo.shapeInfo.flatOffset;
    if (texNumC === stride0 && flatOffset == null) {
        // texC is used directly as physical (no risk of float16 overflow).
        return "\n        float " + funcName + "(int row, int col, int depth) {\n          float texR = float(row);\n          float texC = dot(vec2(col, depth), vec2(" + stride1 + ", 1));\n          vec2 uv = (vec2(texC, texR) + halfCR) /\n                     vec2(" + texNumC + ".0, " + texNumR + ".0);\n          return sampleTexture(" + texName + ", uv);\n        }\n      ";
    }
    if (texNumC === stride1 && flatOffset == null) {
        // texR is used directly as physical (no risk of float16 overflow).
        return "\n    float " + funcName + "(int row, int col, int depth) {\n      float texR = dot(vec2(row, col), vec2(" + shape[1] + ", 1));\n      float texC = float(depth);\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ".0, " + texNumR + ".0);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
    }
    var offset = getFlatOffsetUniformName(texName);
    return "\n      float " + funcName + "(int row, int col, int depth) {\n        // Explicitly use integer operations as dot() only works on floats.\n        int index = row * " + stride0 + " + col * " + stride1 + " + depth + " + offset + ";\n        vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n        return sampleTexture(" + texName + ", uv);\n      }\n  ";
}
function getPackedSamplerND(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var rank = shape.length;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var texShape = inputInfo.shapeInfo.texShape;
    var packedTexShape = [Math.ceil(texShape[0] / 2), Math.ceil(texShape[1] / 2)];
    var texNumR = packedTexShape[0];
    var texNumC = packedTexShape[1];
    var valuesPerRow = Math.ceil(shape[rank - 1] / 2);
    var texelsInBatch = valuesPerRow * Math.ceil(shape[rank - 2] / 2);
    var params = "int b, int row, int col";
    var index = "b * " + texelsInBatch + " + (row / 2) * " + valuesPerRow + " + (col / 2)";
    for (var b = 2; b < rank - 1; b++) {
        params = "int b" + b + ", " + params;
        texelsInBatch *= shape[rank - b - 1];
        index = "b" + b + " * " + texelsInBatch + " + " + index;
    }
    var glsl = glsl_version_1.getGlslDifferences();
    return "\n    vec4 " + funcName + "(" + params + ") {\n      int index = " + index + ";\n      int texR = index / " + texNumC + ";\n      int texC = index - texR * " + texNumC + ";\n      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(" + texNumC + ", " + texNumR + ");\n      return " + glsl.texture2D + "(" + texName + ", uv);\n    }\n  ";
}
function getSampler4D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var stride2 = shape[3];
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    if (newShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, newShape);
        var params = ['row', 'col', 'depth', 'depth2'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        int index = round(dot(vec4(row, col, depth, depth2),\n                          vec4(" + stride0 + ", " + stride1 + ", " + stride2 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var flatOffset = inputInfo.shapeInfo.flatOffset;
    var texShape = inputInfo.shapeInfo.texShape;
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    if (texNumC === stride0 && flatOffset == null) {
        // texC is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        float texR = float(row);\n        float texC =\n            dot(vec3(col, depth, depth2),\n                vec3(" + stride1 + ", " + stride2 + ", 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    if (texNumC === stride2 && flatOffset == null) {
        // texR is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2) {\n        float texR = dot(vec3(row, col, depth),\n                         vec3(" + shape[1] * shape[2] + ", " + shape[2] + ", 1));\n        float texC = float(depth2);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    var offset = getFlatOffsetUniformName(texName);
    return "\n    float " + funcName + "(int row, int col, int depth, int depth2) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * " + stride0 + " + col * " + stride1 + " +\n          depth * " + stride2 + " + depth2;\n      vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index + " + offset + ");\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
}
function getSampler5D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var stride3 = shape[4];
    var stride2 = shape[3] * stride3;
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    if (newShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, newShape);
        var params = ['row', 'col', 'depth', 'depth2', 'depth3'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth, int depth2, int depth3) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2, int depth3) {\n        float index = dot(\n          vec4(row, col, depth, depth2),\n          vec4(" + stride0 + ", " + stride1 + ", " + stride2 + ", " + stride3 + ")) +\n          depth3;\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var flatOffset = inputInfo.shapeInfo.flatOffset;
    var texShape = inputInfo.shapeInfo.texShape;
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    if (texNumC === stride0 && flatOffset == null) {
        // texC is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2, int depth3) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n                         vec4(" + stride1 + ", " + stride2 + ", " + stride3 + ", 1));\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    if (texNumC === stride3 && flatOffset == null) {
        // texR is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth, int depth2, int depth3) {\n        float texR = dot(\n          vec4(row, col, depth, depth2),\n          vec4(" + shape[1] * shape[2] * shape[3] + ",\n               " + shape[2] * shape[3] + ", " + shape[3] + ", 1));\n        int texC = depth3;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    var offset = getFlatOffsetUniformName(texName);
    return "\n    float " + funcName + "(int row, int col, int depth, int depth2, int depth3) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * " + stride0 + " + col * " + stride1 + " + depth * " + stride2 + " +\n          depth2 * " + stride3 + " + depth3 + " + offset + ";\n      vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
}
function getSampler6D(inputInfo) {
    var shape = inputInfo.shapeInfo.logicalShape;
    var texName = inputInfo.name;
    var funcName = 'get' + texName.charAt(0).toUpperCase() + texName.slice(1);
    var _a = util.squeezeShape(shape), newShape = _a.newShape, keptDims = _a.keptDims;
    if (newShape.length < shape.length) {
        var newInputInfo = squeezeInputInfo(inputInfo, newShape);
        var params = ['row', 'col', 'depth', 'depth2', 'depth3', 'depth4'];
        return "\n      " + getSamplerFromInInfo(newInputInfo) + "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        return " + funcName + "(" + getSqueezedParams(params, keptDims) + ");\n      }\n    ";
    }
    var stride4 = shape[5];
    var stride3 = shape[4] * stride4;
    var stride2 = shape[3] * stride3;
    var stride1 = shape[2] * stride2;
    var stride0 = shape[1] * stride1;
    if (inputInfo.shapeInfo.isUniform) {
        // Uniform arrays will be less than 65505 (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n        int index = round(dot(\n          vec4(row, col, depth, depth2),\n          vec4(" + stride0 + ", " + stride1 + ", " + stride2 + ", " + stride3 + ")) +\n          dot(\n            vec2(depth3, depth4),\n            vec2(" + stride4 + ", 1)));\n        " + getUniformSampler(inputInfo) + "\n      }\n    ";
    }
    var flatOffset = inputInfo.shapeInfo.flatOffset;
    var texShape = inputInfo.shapeInfo.texShape;
    var texNumR = texShape[0];
    var texNumC = texShape[1];
    if (texNumC === stride0 && flatOffset == null) {
        // texC is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        int texR = row;\n        float texC = dot(vec4(col, depth, depth2, depth3),\n          vec4(" + stride1 + ", " + stride2 + ", " + stride3 + ", " + stride4 + ")) +\n               float(depth4);\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                   vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    if (texNumC === stride4 && flatOffset == null) {
        // texR is used directly as physical (no risk of float16 overflow).
        return "\n      float " + funcName + "(int row, int col, int depth,\n                    int depth2, int depth3, int depth4) {\n        float texR = dot(vec4(row, col, depth, depth2),\n          vec4(" + shape[1] * shape[2] * shape[3] * shape[4] + ",\n               " + shape[2] * shape[3] * shape[4] + ",\n               " + shape[3] * shape[4] + ",\n               " + shape[4] + ")) + float(depth3);\n        int texC = depth4;\n        vec2 uv = (vec2(texC, texR) + halfCR) /\n                  vec2(" + texNumC + ".0, " + texNumR + ".0);\n        return sampleTexture(" + texName + ", uv);\n      }\n    ";
    }
    var offset = getFlatOffsetUniformName(texName);
    return "\n    float " + funcName + "(int row, int col, int depth,\n                  int depth2, int depth3, int depth4) {\n      // Explicitly use integer operations as dot() only works on floats.\n      int index = row * " + stride0 + " + col * " + stride1 + " + depth * " + stride2 + " +\n          depth2 * " + stride3 + " + depth3 * " + stride4 + " + depth4 + " + offset + ";\n      vec2 uv = uvFromFlat(" + texNumR + ", " + texNumC + ", index);\n      return sampleTexture(" + texName + ", uv);\n    }\n  ";
}
function getUniformSampler(inputInfo) {
    var texName = inputInfo.name;
    var inSize = util.sizeFromShape(inputInfo.shapeInfo.logicalShape);
    if (inSize < 2) {
        return "return " + texName + ";";
    }
    return "\n    for (int i = 0; i < " + inSize + "; i++) {\n      if (i == index) {\n        return " + texName + "[i];\n      }\n    }\n  ";
}
function getPackedSamplerAtOutputCoords(inputInfo, outShapeInfo) {
    var texName = inputInfo.name;
    var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
    var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    var broadcastDims = broadcast_util_1.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var type = getCoordsDataType(outRank);
    var rankDiff = outRank - inRank;
    var coordsSnippet;
    var fields = ['x', 'y', 'z', 'w', 'u', 'v'];
    if (inRank === 0) {
        coordsSnippet = '';
    }
    else if (outRank < 2 && broadcastDims.length >= 1) {
        coordsSnippet = 'coords = 0;';
    }
    else {
        coordsSnippet =
            broadcastDims.map(function (d) { return "coords." + fields[d + rankDiff] + " = 0;"; })
                .join('\n');
    }
    var unpackedCoordsSnippet = '';
    if (outRank < 2 && inRank > 0) {
        unpackedCoordsSnippet = 'coords';
    }
    else {
        unpackedCoordsSnippet = inputInfo.shapeInfo.logicalShape
            .map(function (s, i) { return "coords." + fields[i + rankDiff]; })
            .join(', ');
    }
    var output = "return outputValue;";
    var inSize = util.sizeFromShape(inputInfo.shapeInfo.logicalShape);
    var isInputScalar = inSize === 1;
    var outSize = util.sizeFromShape(outShapeInfo.logicalShape);
    var isOutputScalar = outSize === 1;
    if (inRank === 1 && !isInputScalar && !isOutputScalar) {
        output = "\n      return vec4(outputValue.xy, outputValue.xy);\n    ";
    }
    else if (isInputScalar && !isOutputScalar) {
        if (outRank === 1) {
            output = "\n        return vec4(outputValue.x, outputValue.x, 0., 0.);\n      ";
        }
        else {
            output = "\n        return vec4(outputValue.x);\n      ";
        }
    }
    else if (broadcastDims.length) {
        var rows = inRank - 2;
        var cols = inRank - 1;
        if (broadcastDims.indexOf(rows) > -1 && broadcastDims.indexOf(cols) > -1) {
            output = "return vec4(outputValue.x);";
        }
        else if (broadcastDims.indexOf(rows) > -1) {
            output = "return vec4(outputValue.x, outputValue.y, " +
                "outputValue.x, outputValue.y);";
        }
        else if (broadcastDims.indexOf(cols) > -1) {
            output = "return vec4(outputValue.xx, outputValue.zz);";
        }
    }
    return "\n    vec4 " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      vec4 outputValue = get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n      " + output + "\n    }\n  ";
}
function getSamplerAtOutputCoords(inputInfo, outShapeInfo) {
    var texName = inputInfo.name;
    var texFuncSnippet = texName.charAt(0).toUpperCase() + texName.slice(1);
    var funcName = 'get' + texFuncSnippet + 'AtOutCoords';
    var outTexShape = outShapeInfo.texShape;
    var inTexShape = inputInfo.shapeInfo.texShape;
    var inRank = inputInfo.shapeInfo.logicalShape.length;
    var outRank = outShapeInfo.logicalShape.length;
    if (!inputInfo.shapeInfo.isUniform && inRank === outRank &&
        inputInfo.shapeInfo.flatOffset == null &&
        util.arraysEqual(inTexShape, outTexShape)) {
        return "\n      float " + funcName + "() {\n        return sampleTexture(" + texName + ", resultUV);\n      }\n    ";
    }
    var type = getCoordsDataType(outRank);
    var broadcastDims = broadcast_util_1.getBroadcastDims(inputInfo.shapeInfo.logicalShape, outShapeInfo.logicalShape);
    var rankDiff = outRank - inRank;
    var coordsSnippet;
    var fields = ['x', 'y', 'z', 'w', 'u', 'v'];
    if (inRank === 0) {
        coordsSnippet = '';
    }
    else if (outRank < 2 && broadcastDims.length >= 1) {
        coordsSnippet = 'coords = 0;';
    }
    else {
        coordsSnippet =
            broadcastDims.map(function (d) { return "coords." + fields[d + rankDiff] + " = 0;"; })
                .join('\n');
    }
    var unpackedCoordsSnippet = '';
    if (outRank < 2 && inRank > 0) {
        unpackedCoordsSnippet = 'coords';
    }
    else {
        unpackedCoordsSnippet = inputInfo.shapeInfo.logicalShape
            .map(function (s, i) { return "coords." + fields[i + rankDiff]; })
            .join(', ');
    }
    return "\n    float " + funcName + "() {\n      " + type + " coords = getOutputCoords();\n      " + coordsSnippet + "\n      return get" + texFuncSnippet + "(" + unpackedCoordsSnippet + ");\n    }\n  ";
}
function getCoordsDataType(rank) {
    if (rank <= 1) {
        return 'int';
    }
    else if (rank === 2) {
        return 'ivec2';
    }
    else if (rank === 3) {
        return 'ivec3';
    }
    else if (rank === 4) {
        return 'ivec4';
    }
    else if (rank === 5) {
        return 'ivec5';
    }
    else if (rank === 6) {
        return 'ivec6';
    }
    else {
        throw Error("GPU for rank " + rank + " is not yet supported");
    }
}
exports.getCoordsDataType = getCoordsDataType;
/** Returns a new input info (a copy) that has a squeezed logical shape. */
function squeezeInputInfo(inInfo, squeezedShape) {
    // Deep copy.
    var newInputInfo = JSON.parse(JSON.stringify(inInfo));
    newInputInfo.shapeInfo.logicalShape = squeezedShape;
    return newInputInfo;
}
function getSqueezedParams(params, keptDims) {
    return keptDims.map(function (d) { return params[d]; }).join(', ');
}
//# sourceMappingURL=shader_compiler.js.map