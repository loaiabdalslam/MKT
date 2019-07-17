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
var engine_1 = require("../engine");
var environment_1 = require("../environment");
var tensor_1 = require("../tensor");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var complex_ops_1 = require("./complex_ops");
var operation_1 = require("./operation");
/**
 * Creates a `tf.Tensor` with the provided values, shape and dtype.
 *
 * ```js
 * // Pass an array of values to create a vector.
 * tf.tensor([1, 2, 3, 4]).print();
 * ```
 *
 * ```js
 * // Pass a nested array of values to make a matrix or a higher
 * // dimensional tensor.
 * tf.tensor([[1, 2], [3, 4]]).print();
 * ```
 *
 * ```js
 * // Pass a flat array and specify a shape yourself.
 * tf.tensor([1, 2, 3, 4], [2, 2]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`. If the values are strings,
 *     they will be encoded as utf-8 and kept as `Uint8Array[]`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor(values, shape, dtype) {
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor = tensor;
/** This is shared code across all tensor creation methods. */
function makeTensor(values, shape, inferredShape, dtype) {
    if (dtype == null) {
        dtype = util_1.inferDtype(values);
    }
    if (dtype === 'complex64') {
        throw new Error("Cannot construct a complex64 tensor directly. " +
            "Please use tf.complex(real, imag).");
    }
    if (!util_1.isTypedArray(values) && !Array.isArray(values) &&
        typeof values !== 'number' && typeof values !== 'boolean' &&
        typeof values !== 'string') {
        throw new Error('values passed to tensor(values) must be a number/boolean/string or ' +
            'an array of numbers/booleans/strings, or a TypedArray');
    }
    if (shape != null) {
        util_1.assertNonNegativeIntegerDimensions(shape);
        var providedSize_1 = util_1.sizeFromShape(shape);
        var inferredSize_1 = util_1.sizeFromShape(inferredShape);
        util_1.assert(providedSize_1 === inferredSize_1, function () {
            return "Based on the provided shape, [" + shape + "], the tensor should have " +
                (providedSize_1 + " values but has " + inferredSize_1);
        });
        for (var i = 0; i < inferredShape.length; ++i) {
            var inferred = inferredShape[i];
            var flatDimsDontMatch = i === inferredShape.length - 1 ?
                inferred !== util_1.sizeFromShape(shape.slice(i)) :
                true;
            util_1.assert(inferredShape[i] === shape[i] || !flatDimsDontMatch, function () { return "Error creating a new Tensor. Inferred shape " +
                ("(" + inferredShape + ") does not match the provided ") +
                ("shape (" + shape + "). "); });
        }
    }
    if (!util_1.isTypedArray(values) && !Array.isArray(values)) {
        values = [values];
    }
    shape = shape || inferredShape;
    values = dtype !== 'string' ?
        util_1.toTypedArray(values, dtype, environment_1.ENV.getBool('DEBUG')) :
        util_1.flatten(values, [], true);
    return tensor_1.Tensor.make(shape, { values: values }, dtype);
}
/**
 * Creates rank-0 `tf.Tensor` (scalar) with the provided value and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.scalar` as it makes the code more readable.
 *
 * ```js
 * tf.scalar(3.14).print();
 * ```
 *
 * @param value The value of the scalar.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function scalar(value, dtype) {
    if (((util_1.isTypedArray(value) && dtype !== 'string') || Array.isArray(value)) &&
        dtype !== 'complex64') {
        throw new Error('Error creating a new Scalar: value must be a primitive ' +
            '(number|boolean|string)');
    }
    if (dtype === 'string' && util_1.isTypedArray(value) &&
        !(value instanceof Uint8Array)) {
        throw new Error('When making a scalar from encoded string, ' +
            'the value must be `Uint8Array`.');
    }
    var shape = [];
    var inferredShape = [];
    return makeTensor(value, shape, inferredShape, dtype);
}
exports.scalar = scalar;
/**
 * Creates rank-1 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor1d` as it makes the code more readable.
 *
 * ```js
 * tf.tensor1d([1, 2, 3]).print();
 * ```
 *
 * @param values The values of the tensor. Can be array of numbers,
 *     or a `TypedArray`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor1d(values, dtype) {
    util_1.assertNonNull(values);
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 1) {
        throw new Error('tensor1d() requires values to be a flat/TypedArray');
    }
    var shape = null;
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor1d = tensor1d;
/**
 * Creates rank-2 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor2d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor2d([[1, 2], [3, 4]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor2d([1, 2, 3, 4], [2, 2]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. If not provided, it is inferred from
 *     `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor2d(values, shape, dtype) {
    util_1.assertNonNull(values);
    if (shape != null && shape.length !== 2) {
        throw new Error('tensor2d() requires shape to have two numbers');
    }
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 2 && inferredShape.length !== 1) {
        throw new Error('tensor2d() requires values to be number[][] or flat/TypedArray');
    }
    if (inferredShape.length === 1 && shape == null) {
        throw new Error('tensor2d() requires shape to be provided when `values` ' +
            'are a flat/TypedArray');
    }
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor2d = tensor2d;
/**
 * Creates rank-3 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor3d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor3d([[[1], [2]], [[3], [4]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor3d([1, 2, 3, 4], [2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. If not provided,  it is inferred from
 *     `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor3d(values, shape, dtype) {
    util_1.assertNonNull(values);
    if (shape != null && shape.length !== 3) {
        throw new Error('tensor3d() requires shape to have three numbers');
    }
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 3 && inferredShape.length !== 1) {
        throw new Error('tensor3d() requires values to be number[][][] or flat/TypedArray');
    }
    if (inferredShape.length === 1 && shape == null) {
        throw new Error('tensor3d() requires shape to be provided when `values` ' +
            'are a flat array');
    }
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor3d = tensor3d;
/**
 * Creates rank-4 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor4d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor4d([[[[1], [2]], [[3], [4]]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor4d(values, shape, dtype) {
    util_1.assertNonNull(values);
    if (shape != null && shape.length !== 4) {
        throw new Error('tensor4d() requires shape to have four numbers');
    }
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 4 && inferredShape.length !== 1) {
        throw new Error('tensor4d() requires values to be number[][][][] or flat/TypedArray');
    }
    if (inferredShape.length === 1 && shape == null) {
        throw new Error('tensor4d() requires shape to be provided when `values` ' +
            'are a flat array');
    }
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor4d = tensor4d;
/**
 * Creates rank-5 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor5d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor5d([[[[[1], [2]], [[3], [4]]]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor5d([1, 2, 3, 4, 5, 6, 7, 8], [1, 2, 2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor5d(values, shape, dtype) {
    util_1.assertNonNull(values);
    if (shape != null && shape.length !== 5) {
        throw new Error('tensor5d() requires shape to have five numbers');
    }
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 5 && inferredShape.length !== 1) {
        throw new Error('tensor5d() requires values to be ' +
            'number[][][][][] or flat/TypedArray');
    }
    if (inferredShape.length === 1 && shape == null) {
        throw new Error('tensor5d() requires shape to be provided when `values` ' +
            'are a flat array');
    }
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor5d = tensor5d;
/**
 * Creates rank-6 `tf.Tensor` with the provided values, shape and dtype.
 *
 * The same functionality can be achieved with `tf.tensor`, but in general
 * we recommend using `tf.tensor6d` as it makes the code more readable.
 *
 *  ```js
 * // Pass a nested array.
 * tf.tensor6d([[[[[[1],[2]],[[3],[4]]],[[[5],[6]],[[7],[8]]]]]]).print();
 * ```
 * ```js
 * // Pass a flat array and specify a shape.
 * tf.tensor6d([1, 2, 3, 4, 5, 6, 7, 8], [1, 1, 2, 2, 2, 1]).print();
 * ```
 *
 * @param values The values of the tensor. Can be nested array of numbers,
 *     or a flat array, or a `TypedArray`.
 * @param shape The shape of the tensor. Optional. If not provided,
 *   it is inferred from `values`.
 * @param dtype The data type.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function tensor6d(values, shape, dtype) {
    util_1.assertNonNull(values);
    if (shape != null && shape.length !== 6) {
        throw new Error('tensor6d() requires shape to have six numbers');
    }
    var inferredShape = tensor_util_env_1.inferShape(values, dtype);
    if (inferredShape.length !== 6 && inferredShape.length !== 1) {
        throw new Error('tensor6d() requires values to be number[][][][][][] or ' +
            'flat/TypedArray');
    }
    if (inferredShape.length === 1 && shape == null) {
        throw new Error('tensor6d() requires shape to be provided when `values` ' +
            'are a flat array');
    }
    shape = shape ||
        inferredShape;
    return makeTensor(values, shape, inferredShape, dtype);
}
exports.tensor6d = tensor6d;
/**
 * Creates a `tf.Tensor` with all elements set to 1.
 *
 * ```js
 * tf.ones([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param dtype The type of an element in the resulting tensor. Defaults to
 *     'float'.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function ones(shape, dtype) {
    if (dtype === void 0) { dtype = 'float32'; }
    if (dtype === 'complex64') {
        var real_1 = ones(shape, 'float32');
        var imag_1 = zeros(shape, 'float32');
        return complex_ops_1.complex(real_1, imag_1);
    }
    var values = util_1.makeOnesTypedArray(util_1.sizeFromShape(shape), dtype);
    return tensor_1.Tensor.make(shape, { values: values }, dtype);
}
exports.ones = ones;
/**
 * Creates a `tf.Tensor` with all elements set to 0.
 *
 * ```js
 * tf.zeros([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param dtype The type of an element in the resulting tensor. Can
 *     be 'float32', 'int32' or 'bool'. Defaults to 'float'.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function zeros(shape, dtype) {
    if (dtype === void 0) { dtype = 'float32'; }
    if (dtype === 'complex64') {
        var real_2 = zeros(shape, 'float32');
        var imag_2 = zeros(shape, 'float32');
        return complex_ops_1.complex(real_2, imag_2);
    }
    var values = util_1.makeZerosTypedArray(util_1.sizeFromShape(shape), dtype);
    return tensor_1.Tensor.make(shape, { values: values }, dtype);
}
exports.zeros = zeros;
/**
 * Creates a `tf.Tensor` filled with a scalar value.
 *
 * ```js
 * tf.fill([2, 2], 4).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param value The scalar value to fill the tensor with.
 * @param dtype The type of an element in the resulting tensor. Defaults to
 * 'float'.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function fill(shape, value, dtype) {
    return engine_1.ENGINE.runKernel(function (backend) { return backend.fill(shape, value, dtype); }, {});
}
exports.fill = fill;
/**
 * Creates a `tf.Tensor` with all elements set to 1 with the same shape as the
 * given tensor.
 *
 * ```js
 * const x = tf.tensor([1, 2]);
 * tf.onesLike(x).print();
 * ```
 * @param x A tensor.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function onesLike_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'onesLike');
    if ($x.dtype === 'complex64') {
        var r = exports.onesLike(complex_ops_1.real($x));
        var i = exports.zerosLike(complex_ops_1.imag($x));
        return complex_ops_1.complex(r, i);
    }
    var der = function (dy, saved) { return ({ $x: function () { return exports.zerosLike(dy); } }); };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.onesLike($x); }, { $x: $x }, der);
}
/**
 * Creates a `tf.Tensor` with all elements set to 0 with the same shape as the
 * given tensor.
 *
 * ```js
 * const x = tf.tensor([1, 2]);
 * tf.zerosLike(x).print();
 * ```
 *
 * @param x The tensor of required shape.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function zerosLike_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'zerosLike');
    var der = function (dy, saved) { return ({ $x: function () { return exports.zerosLike(dy); } }); };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.zerosLike($x); }, { $x: $x }, der);
}
/**
 * Return an evenly spaced sequence of numbers over the given interval.
 *
 * ```js
 * tf.linspace(0, 9, 10).print();
 * ```
 * @param start The start value of the sequence.
 * @param stop The end value of the sequence.
 * @param num The number of values to generate.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function linspace(start, stop, num) {
    if (num <= 0) {
        throw new Error('The number of values should be positive.');
    }
    return engine_1.ENGINE.runKernel(function (backend) { return backend.linspace(start, stop, num); }, {});
}
exports.linspace = linspace;
/**
 * Creates a new `tf.Tensor1D` filled with the numbers in the range provided.
 *
 * The tensor is a is half-open interval meaning it includes start, but
 * excludes stop. Decrementing ranges and negative step values are also
 * supported.
 *
 * ```js
 * tf.range(0, 9, 2).print();
 * ```
 *
 * @param start An integer start value
 * @param stop An integer stop value
 * @param step An integer increment (will default to 1 or -1)
 * @param dtype The data type of the output tensor. Defaults to 'float32'.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function range(start, stop, step, dtype) {
    if (step === void 0) { step = 1; }
    if (dtype === void 0) { dtype = 'float32'; }
    if (step === 0) {
        throw new Error('Cannot have a step of zero');
    }
    var sameStartStop = start === stop;
    var increasingRangeNegativeStep = start < stop && step < 0;
    var decreasingRangePositiveStep = stop < start && step > 1;
    if (sameStartStop || increasingRangeNegativeStep ||
        decreasingRangePositiveStep) {
        return zeros([0], dtype);
    }
    var numElements = Math.abs(Math.ceil((stop - start) / step));
    var values = util_1.makeZerosTypedArray(numElements, dtype);
    if (stop < start && step === 1) {
        // Auto adjust the step's sign if it hasn't been set
        // (or was set to 1)
        step = -1;
    }
    values[0] = start;
    for (var i = 1; i < values.length; i++) {
        values[i] = values[i - 1] + step;
    }
    return tensor1d(values, dtype);
}
exports.range = range;
exports.onesLike = operation_1.op({ onesLike_: onesLike_ });
exports.zerosLike = operation_1.op({ zerosLike_: zerosLike_ });
//# sourceMappingURL=tensor_ops.js.map