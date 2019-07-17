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
/**
 * Merges real and imaginary Float32Arrays into a single complex Float32Array.
 *
 * The memory layout is interleaved as follows:
 * real: [r0, r1, r2]
 * imag: [i0, i1, i2]
 * complex: [r0, i0, r1, i1, r2, i2]
 *
 * This is the inverse of splitRealAndImagArrays.
 *
 * @param real The real values of the complex tensor values.
 * @param imag The imag values of the complex tensor values.
 * @returns A complex tensor as a Float32Array with merged values.
 */
function mergeRealAndImagArrays(real, imag) {
    if (real.length !== imag.length) {
        throw new Error("Cannot merge real and imag arrays of different lengths. real:" +
            (real.length + ", imag: " + imag.length + "."));
    }
    var result = new Float32Array(real.length * 2);
    for (var i = 0; i < result.length; i += 2) {
        result[i] = real[i / 2];
        result[i + 1] = imag[i / 2];
    }
    return result;
}
exports.mergeRealAndImagArrays = mergeRealAndImagArrays;
/**
 * Splits a complex Float32Array into real and imag parts.
 *
 * The memory layout is interleaved as follows:
 * complex: [r0, i0, r1, i1, r2, i2]
 * real: [r0, r1, r2]
 * imag: [i0, i1, i2]
 *
 * This is the inverse of mergeRealAndImagArrays.
 *
 * @param complex The complex tensor values.
 * @returns An object with real and imag Float32Array components of the complex
 *     tensor.
 */
function splitRealAndImagArrays(complex) {
    var real = new Float32Array(complex.length / 2);
    var imag = new Float32Array(complex.length / 2);
    for (var i = 0; i < complex.length; i += 2) {
        real[i / 2] = complex[i];
        imag[i / 2] = complex[i + 1];
    }
    return { real: real, imag: imag };
}
exports.splitRealAndImagArrays = splitRealAndImagArrays;
/**
 * Extracts even indexed complex values in the given array.
 * @param complex The complex tensor values
 */
function complexWithEvenIndex(complex) {
    var len = Math.ceil(complex.length / 4);
    var real = new Float32Array(len);
    var imag = new Float32Array(len);
    for (var i = 0; i < complex.length; i += 4) {
        real[Math.floor(i / 4)] = complex[i];
        imag[Math.floor(i / 4)] = complex[i + 1];
    }
    return { real: real, imag: imag };
}
exports.complexWithEvenIndex = complexWithEvenIndex;
/**
 * Extracts odd indexed comple values in the given array.
 * @param complex The complex tensor values
 */
function complexWithOddIndex(complex) {
    var len = Math.floor(complex.length / 4);
    var real = new Float32Array(len);
    var imag = new Float32Array(len);
    for (var i = 2; i < complex.length; i += 4) {
        real[Math.floor(i / 4)] = complex[i];
        imag[Math.floor(i / 4)] = complex[i + 1];
    }
    return { real: real, imag: imag };
}
exports.complexWithOddIndex = complexWithOddIndex;
/**
 * Get the map representing a complex value in the given array.
 * @param complex The complex tensor values.
 * @param index An index of the target complex value.
 */
function getComplexWithIndex(complex, index) {
    var real = complex[index * 2];
    var imag = complex[index * 2 + 1];
    return { real: real, imag: imag };
}
exports.getComplexWithIndex = getComplexWithIndex;
/**
 * Insert a given complex value into the TypedArray.
 * @param data The array in which the complex value is inserted.
 * @param c The complex value to be inserted.
 * @param index An index of the target complex value.
 */
function assignToTypedArray(data, real, imag, index) {
    data[index * 2] = real;
    data[index * 2 + 1] = imag;
}
exports.assignToTypedArray = assignToTypedArray;
/**
 * Make the list of exponent terms used by FFT.
 */
function exponents(n, inverse) {
    var real = new Float32Array(n / 2);
    var imag = new Float32Array(n / 2);
    for (var i = 0; i < Math.ceil(n / 2); i++) {
        var x = (inverse ? 2 : -2) * Math.PI * (i / n);
        real[i] = Math.cos(x);
        imag[i] = Math.sin(x);
    }
    return { real: real, imag: imag };
}
exports.exponents = exponents;
/**
 * Make the exponent term used by FFT.
 */
function exponent(k, n, inverse) {
    var x = (inverse ? 2 : -2) * Math.PI * (k / n);
    var real = Math.cos(x);
    var imag = Math.sin(x);
    return { real: real, imag: imag };
}
exports.exponent = exponent;
//# sourceMappingURL=complex_util.js.map