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
var engine_1 = require("../engine");
var complex_ops_1 = require("../ops/complex_ops");
var operation_1 = require("../ops/operation");
var util_1 = require("../util");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Fast Fourier transform.
 *
 * Computes the 1-dimensional discrete Fourier transform over the inner-most
 * dimension of input.
 *
 * ```js
 * const real = tf.tensor1d([1, 2, 3]);
 * const imag = tf.tensor1d([1, 2, 3]);
 * const x = tf.complex(real, imag);
 *
 * x.fft().print();  // tf.spectral.fft(x).print();
 * ```
 * @param input The complex input to compute an fft over.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Spectral', namespace: 'spectral'}
 */
function fft_(input) {
    util_1.assert(input.dtype === 'complex64', function () { return "The dtype for tf.spectral.fft() must be complex64 " +
        ("but got " + input.dtype + "."); });
    // Collapse all outer dimensions to a single batch dimension.
    var innerDimensionSize = input.shape[input.shape.length - 1];
    var batch = input.size / innerDimensionSize;
    var input2D = input.as2D(batch, innerDimensionSize);
    var ret = engine_1.ENGINE.runKernel(function (backend) { return backend.fft(input2D); }, { input: input });
    return ret.reshape(input.shape);
}
/**
 * Inverse fast Fourier transform.
 *
 * Computes the inverse 1-dimensional discrete Fourier transform over the
 * inner-most dimension of input.
 *
 * ```js
 * const real = tf.tensor1d([1, 2, 3]);
 * const imag = tf.tensor1d([1, 2, 3]);
 * const x = tf.complex(real, imag);
 *
 * x.ifft().print();  // tf.spectral.ifft(x).print();
 * ```
 * @param input The complex input to compute an ifft over.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Spectral', namespace: 'spectral'}
 */
function ifft_(input) {
    util_1.assert(input.dtype === 'complex64', function () { return "The dtype for tf.spectral.ifft() must be complex64 " +
        ("but got " + input.dtype + "."); });
    // Collapse all outer dimensions to a single batch dimension.
    var innerDimensionSize = input.shape[input.shape.length - 1];
    var batch = input.size / innerDimensionSize;
    var input2D = input.as2D(batch, innerDimensionSize);
    var ret = engine_1.ENGINE.runKernel(function (backend) { return backend.ifft(input2D); }, { input: input });
    return ret.reshape(input.shape);
}
/**
 * Real value input fast Fourier transform.
 *
 * Computes the 1-dimensional discrete Fourier transform over the
 * inner-most dimension of the real input.
 *
 * ```js
 * const real = tf.tensor1d([1, 2, 3]);
 *
 * real.rfft().print();
 * ```
 * @param input The real value input to compute an rfft over.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Spectral', namespace: 'spectral'}
 */
function rfft_(input, fftLength) {
    util_1.assert(input.dtype === 'float32', function () { return "The dtype for rfft() must be real value but got " + input.dtype; });
    var innerDimensionSize = input.shape[input.shape.length - 1];
    var batch = input.size / innerDimensionSize;
    var adjustedInput;
    if (fftLength != null && fftLength < innerDimensionSize) {
        // Need to crop
        var begin = input.shape.map(function (v) { return 0; });
        var size = input.shape.map(function (v) { return v; });
        size[input.shape.length - 1] = fftLength;
        adjustedInput = input.slice(begin, size);
        innerDimensionSize = fftLength;
    }
    else if (fftLength != null && fftLength > innerDimensionSize) {
        // Need to pad with zeros
        var zerosShape = input.shape.map(function (v) { return v; });
        zerosShape[input.shape.length - 1] = fftLength - innerDimensionSize;
        adjustedInput = input.concat(tensor_ops_1.zeros(zerosShape), input.shape.length - 1);
        innerDimensionSize = fftLength;
    }
    else {
        adjustedInput = input;
    }
    // Complement the input with zero imaginary numbers.
    var zerosInput = adjustedInput.zerosLike();
    var complexInput = complex_ops_1.complex(adjustedInput, zerosInput)
        .as2D(batch, innerDimensionSize);
    var ret = exports.fft(complexInput);
    // Exclude complex conjugations. These conjugations are put symmetrically.
    var half = Math.floor(innerDimensionSize / 2) + 1;
    var realValues = complex_ops_1.real(ret);
    var imagValues = complex_ops_1.imag(ret);
    var realComplexConjugate = realValues.split([half, innerDimensionSize - half], realValues.shape.length - 1);
    var imagComplexConjugate = imagValues.split([half, innerDimensionSize - half], imagValues.shape.length - 1);
    var outputShape = adjustedInput.shape.slice();
    outputShape[adjustedInput.shape.length - 1] = half;
    return complex_ops_1.complex(realComplexConjugate[0], imagComplexConjugate[0])
        .reshape(outputShape);
}
/**
 * Inversed real value input fast Fourier transform.
 *
 * Computes the 1-dimensional inversed discrete Fourier transform over the
 * inner-most dimension of the real input.
 *
 * ```js
 * const real = tf.tensor1d([1, 2, 3]);
 * const imag = tf.tensor1d([0, 0, 0]);
 * const x = tf.complex(real, imag);
 *
 * x.irfft().print();
 * ```
 * @param input The real value input to compute an irfft over.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Spectral', namespace: 'spectral'}
 */
function irfft_(input) {
    var innerDimensionSize = input.shape[input.shape.length - 1];
    var batch = input.size / innerDimensionSize;
    if (innerDimensionSize <= 2) {
        var complexInput = input.as2D(batch, innerDimensionSize);
        var ret = exports.ifft(complexInput);
        return complex_ops_1.real(ret);
    }
    else {
        // The length of unique components of the DFT of a real-valued signal
        // is 2 * (input_len - 1)
        var outputShape = [batch, 2 * (innerDimensionSize - 1)];
        var realInput = complex_ops_1.real(input).as2D(batch, innerDimensionSize);
        var imagInput = complex_ops_1.imag(input).as2D(batch, innerDimensionSize);
        var realConjugate = realInput.slice([0, 1], [batch, innerDimensionSize - 2]).reverse(1);
        var imagConjugate = imagInput.slice([0, 1], [batch, innerDimensionSize - 2])
            .reverse(1)
            .mul(tensor_ops_1.scalar(-1));
        var r = realInput.concat(realConjugate, 1);
        var i = imagInput.concat(imagConjugate, 1);
        var complexInput = complex_ops_1.complex(r, i).as2D(outputShape[0], outputShape[1]);
        var ret = exports.ifft(complexInput);
        return complex_ops_1.real(ret);
    }
}
exports.fft = operation_1.op({ fft_: fft_ });
exports.ifft = operation_1.op({ ifft_: ifft_ });
exports.rfft = operation_1.op({ rfft_: rfft_ });
exports.irfft = operation_1.op({ irfft_: irfft_ });
//# sourceMappingURL=spectral_ops.js.map