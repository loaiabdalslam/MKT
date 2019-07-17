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
var environment_1 = require("../../environment");
var glsl_version_1 = require("./glsl_version");
var tex_util = require("./tex_util");
var webgl_util = require("./webgl_util");
function createVertexShader(gl, debug) {
    var glsl = glsl_version_1.getGlslDifferences();
    var vertexShaderSource = glsl.version + "\n    precision highp float;\n    " + glsl.attribute + " vec3 clipSpacePos;\n    " + glsl.attribute + " vec2 uv;\n    " + glsl.varyingVs + " vec2 resultUV;\n\n    void main() {\n      gl_Position = vec4(clipSpacePos, 1);\n      resultUV = uv;\n    }";
    return webgl_util.createVertexShader(gl, debug, vertexShaderSource);
}
exports.createVertexShader = createVertexShader;
function createVertexBuffer(gl, debug) {
    // [x y z u v] * [upper-left, lower-left, upper-right, lower-right]
    var vertexArray = new Float32Array([-1, 1, 0, 0, 1, -1, -1, 0, 0, 0, 1, 1, 0, 1, 1, 1, -1, 0, 1, 0]);
    return webgl_util.createStaticVertexBuffer(gl, debug, vertexArray);
}
exports.createVertexBuffer = createVertexBuffer;
function createIndexBuffer(gl, debug) {
    // OpenGL (and WebGL) have "CCW == front" winding
    var triangleVertexIndices = new Uint16Array([0, 1, 2, 2, 1, 3]);
    return webgl_util.createStaticIndexBuffer(gl, debug, triangleVertexIndices);
}
exports.createIndexBuffer = createIndexBuffer;
function getTextureConfig(
// tslint:disable-next-line:no-any
gl, textureHalfFloatExtension) {
    // tslint:disable-next-line:no-any
    var glany = gl;
    var internalFormatFloat;
    var internalFormatHalfFloat;
    var internalFormatPackedHalfFloat;
    var internalFormatPackedFloat;
    var textureFormatFloat;
    var downloadTextureFormat;
    var downloadUnpackNumChannels;
    var defaultNumChannels;
    var textureTypeHalfFloat;
    if (environment_1.ENV.getNumber('WEBGL_VERSION') === 2) {
        internalFormatFloat = glany.R32F;
        internalFormatHalfFloat = glany.R16F;
        internalFormatPackedHalfFloat = glany.RGBA16F;
        internalFormatPackedFloat = glany.RGBA32F;
        textureFormatFloat = glany.RED;
        downloadUnpackNumChannels = 4;
        defaultNumChannels = 1;
        textureTypeHalfFloat = glany.HALF_FLOAT;
    }
    else {
        internalFormatFloat = gl.RGBA;
        internalFormatHalfFloat = gl.RGBA;
        internalFormatPackedHalfFloat = gl.RGBA;
        internalFormatPackedFloat = glany.RGBA;
        textureFormatFloat = gl.RGBA;
        downloadUnpackNumChannels = 4;
        defaultNumChannels = 4;
        textureTypeHalfFloat = textureHalfFloatExtension != null ?
            textureHalfFloatExtension.HALF_FLOAT_OES :
            null;
    }
    downloadTextureFormat = gl.RGBA;
    return {
        internalFormatFloat: internalFormatFloat,
        internalFormatHalfFloat: internalFormatHalfFloat,
        internalFormatPackedHalfFloat: internalFormatPackedHalfFloat,
        internalFormatPackedFloat: internalFormatPackedFloat,
        textureFormatFloat: textureFormatFloat,
        downloadTextureFormat: downloadTextureFormat,
        downloadUnpackNumChannels: downloadUnpackNumChannels,
        defaultNumChannels: defaultNumChannels,
        textureTypeHalfFloat: textureTypeHalfFloat
    };
}
exports.getTextureConfig = getTextureConfig;
function createAndConfigureTexture(gl, debug, width, height, internalFormat, textureFormat, textureType) {
    webgl_util.validateTextureSize(width, height);
    var texture = webgl_util.createTexture(gl, debug);
    var tex2d = gl.TEXTURE_2D;
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(tex2d, texture); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.texParameteri(tex2d, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MIN_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.texParameteri(tex2d, gl.TEXTURE_MAG_FILTER, gl.NEAREST); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.texImage2D(tex2d, 0, internalFormat, width, height, 0, textureFormat, textureType, null); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
    return texture;
}
function createFloat32MatrixTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    return createAndConfigureTexture(gl, debug, width, height, textureConfig.internalFormatFloat, textureConfig.textureFormatFloat, gl.FLOAT);
}
exports.createFloat32MatrixTexture = createFloat32MatrixTexture;
function createFloat16MatrixTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    return createAndConfigureTexture(gl, debug, width, height, textureConfig.internalFormatHalfFloat, textureConfig.textureFormatFloat, textureConfig.textureTypeHalfFloat);
}
exports.createFloat16MatrixTexture = createFloat16MatrixTexture;
function createUnsignedBytesMatrixTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    return createAndConfigureTexture(gl, debug, width, height, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE);
}
exports.createUnsignedBytesMatrixTexture = createUnsignedBytesMatrixTexture;
function createPackedMatrixTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    return createAndConfigureTexture(gl, debug, width, height, textureConfig.internalFormatPackedFloat, gl.RGBA, gl.FLOAT);
}
exports.createPackedMatrixTexture = createPackedMatrixTexture;
function createFloat16PackedMatrixTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getPackedMatrixTextureShapeWidthHeight(rows, columns), width = _a[0], height = _a[1];
    return createAndConfigureTexture(gl, debug, width, height, textureConfig.internalFormatPackedHalfFloat, gl.RGBA, textureConfig.textureTypeHalfFloat);
}
exports.createFloat16PackedMatrixTexture = createFloat16PackedMatrixTexture;
function bindVertexProgramAttributeStreams(gl, debug, program, vertexBuffer) {
    var posOffset = 0; // x is the first buffer element
    var uvOffset = 3 * 4; // uv comes after [x y z]
    var stride = (3 * 4) + (2 * 4); // xyz + uv, each entry is 4-byte float.
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); });
    var success = webgl_util.bindVertexBufferToProgramAttribute(gl, debug, program, 'clipSpacePos', vertexBuffer, 3, stride, posOffset);
    return success &&
        webgl_util.bindVertexBufferToProgramAttribute(gl, debug, program, 'uv', vertexBuffer, 2, stride, uvOffset);
}
exports.bindVertexProgramAttributeStreams = bindVertexProgramAttributeStreams;
function uploadDenseMatrixToTexture(gl, debug, texture, width, height, data, textureConfig) {
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    var dataForUpload, texelDataType, internalFormat;
    if (data instanceof Uint8Array) {
        dataForUpload = new Uint8Array(width * height * 4);
        texelDataType = gl.UNSIGNED_BYTE;
        internalFormat = gl.RGBA;
    }
    else {
        dataForUpload = new Float32Array(width * height * 4);
        texelDataType = gl.FLOAT;
        internalFormat = textureConfig.internalFormatPackedFloat;
    }
    dataForUpload.set(data);
    webgl_util.callAndCheck(gl, debug, function () { return gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, gl.RGBA, texelDataType, dataForUpload); });
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.uploadDenseMatrixToTexture = uploadDenseMatrixToTexture;
function uploadPixelDataToTexture(gl, debug, texture, pixels) {
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, texture); });
    if (pixels.data instanceof Uint8Array) {
        webgl_util.callAndCheck(gl, debug, function () { return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, pixels.width, pixels.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels.data); });
    }
    else {
        webgl_util.callAndCheck(gl, debug, function () { return gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, pixels); });
    }
    webgl_util.callAndCheck(gl, debug, function () { return gl.bindTexture(gl.TEXTURE_2D, null); });
}
exports.uploadPixelDataToTexture = uploadPixelDataToTexture;
function createBufferFromOutputTexture(gl2, debug, rows, columns, textureConfig) {
    // Create and bind the buffer.
    var buffer = gl2.createBuffer();
    webgl_util.callAndCheck(gl2, debug, function () { return gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer); });
    // Initialize the buffer to the size of the texture in bytes.
    var bytesPerFloat = 4;
    var valuesPerTexel = 4;
    var bufferSizeBytes = bytesPerFloat * valuesPerTexel * rows * columns;
    webgl_util.callAndCheck(gl2, debug, function () { return gl2.bufferData(gl2.PIXEL_PACK_BUFFER, bufferSizeBytes, gl2.STREAM_READ); });
    // Enqueue a command on the GPU command queue to copy of texture into the
    // buffer.
    webgl_util.callAndCheck(gl2, debug, function () { return gl2.readPixels(0, 0, columns, rows, gl2.RGBA, gl2.FLOAT, 0); });
    webgl_util.callAndCheck(gl2, debug, function () { return gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null); });
    return buffer;
}
exports.createBufferFromOutputTexture = createBufferFromOutputTexture;
function downloadFloat32MatrixFromBuffer(gl, buffer, size) {
    var gl2 = gl;
    var downloadTarget = new Float32Array(size);
    gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer);
    gl2.getBufferSubData(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget);
    gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null);
    return downloadTarget;
}
exports.downloadFloat32MatrixFromBuffer = downloadFloat32MatrixFromBuffer;
function downloadByteEncodedFloatMatrixFromOutputTexture(gl, debug, rows, columns, textureConfig) {
    var _a = tex_util.getUnpackedMatrixTextureShapeWidthHeight(rows, columns), w = _a[0], h = _a[1];
    var numChannels = 4;
    var downloadTarget = new Uint8Array(tex_util.getUnpackedArraySizeFromMatrixSize(rows * columns, numChannels));
    webgl_util.callAndCheck(gl, debug, function () { return gl.readPixels(0, 0, w, h, textureConfig.downloadTextureFormat, gl.UNSIGNED_BYTE, downloadTarget); });
    // By wrapping the buffer in a Float32Array, we use native browser IEEE 754
    // decoding of the 4 bytes that back each 32 bit float.
    return new Float32Array(downloadTarget.buffer);
}
exports.downloadByteEncodedFloatMatrixFromOutputTexture = downloadByteEncodedFloatMatrixFromOutputTexture;
function downloadPackedMatrixFromBuffer(gl, buffer, batch, rows, cols, physicalRows, physicalCols, textureConfig) {
    var gl2 = gl;
    var downloadTarget = new Float32Array(tex_util.getPackedRGBAArraySizeFromMatrixShape(physicalRows, physicalCols));
    gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, buffer);
    gl2.getBufferSubData(gl2.PIXEL_PACK_BUFFER, 0, downloadTarget);
    gl2.bindBuffer(gl2.PIXEL_PACK_BUFFER, null);
    return downloadTarget;
}
exports.downloadPackedMatrixFromBuffer = downloadPackedMatrixFromBuffer;
function downloadMatrixFromPackedOutputTexture(gl, debug, physicalRows, physicalCols) {
    var packedRGBA = new Float32Array(physicalRows * physicalCols * 4);
    webgl_util.callAndCheck(gl, debug, function () { return gl.readPixels(0, 0, physicalCols, physicalRows, gl.RGBA, gl.FLOAT, packedRGBA); });
    return packedRGBA;
}
exports.downloadMatrixFromPackedOutputTexture = downloadMatrixFromPackedOutputTexture;
//# sourceMappingURL=gpgpu_util.js.map