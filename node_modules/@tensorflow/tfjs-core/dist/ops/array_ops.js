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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("../engine");
var tensor_1 = require("../tensor");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var axis_util_1 = require("./axis_util");
var concat_split_1 = require("./concat_split");
var operation_1 = require("./operation");
var rand_1 = require("./rand");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Creates a new tensor with the same values and shape as the specified
 * tensor.
 *
 * ```js
 * const x = tf.tensor([1, 2]);
 *
 * x.clone().print();
 * ```
 *
 * @param x The tensor to clone.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function clone_(x) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'clone', null);
    var der = function (dy) {
        return { $x: function () { return dy.toFloat(); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) {
        return tensor_1.Tensor.make($x.shape, { dataId: $x.dataId }, $x.dtype);
    }, { $x: $x }, der);
}
/**
 * Create an identity matrix.
 *
 * @param numRows Number of rows.
 * @param numColumns Number of columns. Defaults to `numRows`.
 * @param batchShape If provided, will add the batch shape to the beginning
 *   of the shape of the returned `tf.Tensor` by repeating the identity
 *   matrix.
 * @param dtype Data type.
 * @returns Identity matrix of the specified size and data type, possibly
 *   with batch repetition if `batchShape` is specified.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function eye_(numRows, numColumns, batchShape, dtype) {
    if (dtype === void 0) { dtype = 'float32'; }
    if (numColumns == null) {
        numColumns = numRows;
    }
    var buff = buffer([numRows, numColumns], dtype);
    var n = numRows <= numColumns ? numRows : numColumns;
    for (var i = 0; i < n; ++i) {
        buff.set(1, i, i);
    }
    var out = buff.toTensor().as2D(numRows, numColumns);
    if (batchShape == null) {
        return out;
    }
    else {
        if (batchShape.length === 1) {
            return exports.tile(exports.expandDims(out, 0), [batchShape[0], 1, 1]);
        }
        else if (batchShape.length === 2) {
            return exports.tile(exports.expandDims(exports.expandDims(out, 0), 0), [batchShape[0], batchShape[1], 1, 1]);
        }
        else if (batchShape.length === 3) {
            return exports.tile(exports.expandDims(exports.expandDims(exports.expandDims(out, 0), 0), 0), [batchShape[0], batchShape[1], batchShape[2], 1, 1]);
        }
        else {
            throw new Error("eye() currently supports only 1D and 2D " +
                (
                // tslint:disable-next-line:no-any
                "batchShapes, but received " + batchShape.length + "D."));
        }
    }
}
/**
 * Creates a `tf.Tensor` with values sampled from a normal distribution.
 *
 * ```js
 * tf.randomNormal([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param mean The mean of the normal distribution.
 * @param stdDev The standard deviation of the normal distribution.
 * @param dtype The data type of the output.
 * @param seed The seed for the random number generator.
 */
/** @doc {heading: 'Tensors', subheading: 'Random'} */
function randomNormal_(shape, mean, stdDev, dtype, seed) {
    if (mean === void 0) { mean = 0; }
    if (stdDev === void 0) { stdDev = 1; }
    if (dtype != null && dtype === 'bool') {
        throw new Error("Unsupported data type " + dtype);
    }
    var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, false /* truncated */, seed);
    var res = buffer(shape, dtype);
    for (var i = 0; i < res.values.length; i++) {
        res.values[i] = randGauss.nextValue();
    }
    return res.toTensor();
}
/**
 * Creates a `tf.Tensor` with values sampled from a truncated normal
 * distribution.
 *
 * ```js
 * tf.truncatedNormal([2, 2]).print();
 * ```
 *
 * The generated values follow a normal distribution with specified mean and
 * standard deviation, except that values whose magnitude is more than 2
 * standard deviations from the mean are dropped and re-picked.
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param mean The mean of the normal distribution.
 * @param stdDev The standard deviation of the normal distribution.
 * @param dtype The data type of the output tensor.
 * @param seed The seed for the random number generator.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function truncatedNormal_(shape, mean, stdDev, dtype, seed) {
    if (mean === void 0) { mean = 0; }
    if (stdDev === void 0) { stdDev = 1; }
    if (dtype != null && dtype === 'bool') {
        throw new Error("Unsupported data type " + dtype);
    }
    var randGauss = new rand_1.MPRandGauss(mean, stdDev, dtype, true /* truncated */, seed);
    var res = buffer(shape, dtype);
    for (var i = 0; i < res.values.length; i++) {
        res.values[i] = randGauss.nextValue();
    }
    return res.toTensor();
}
/**
 * Creates a `tf.Tensor` with values sampled from a uniform distribution.
 *
 * The generated values follow a uniform distribution in the range [minval,
 * maxval). The lower bound minval is included in the range, while the upper
 * bound maxval is excluded.
 *
 * ```js
 * tf.randomUniform([2, 2]).print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param minval The lower bound on the range of random values to generate.
 *   Defaults to 0.
 * @param maxval The upper bound on the range of random values to generate.
 *   Defaults to 1.
 * @param dtype The data type of the output tensor. Defaults to 'float32'.
 */
/** @doc {heading: 'Tensors', subheading: 'Random'} */
function randomUniform_(shape, minval, maxval, dtype, seed) {
    if (minval === void 0) { minval = 0; }
    if (maxval === void 0) { maxval = 1; }
    if (dtype === void 0) { dtype = 'float32'; }
    var res = buffer(shape, dtype);
    var random = new rand_1.UniformRandom(minval, maxval, null, seed);
    for (var i = 0; i < res.values.length; i++) {
        res.values[i] = random.nextValue();
    }
    return res.toTensor();
}
/**
 * Creates a `tf.Tensor` with values sampled from a random number generator
 * function defined by the user.
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param randFunction A random number generator function which is called
 * for each element in the output tensor.
 * @param dtype The data type of the output tensor. Defaults to 'float32'.
 */
function rand_(shape, randFunction, dtype) {
    var size = util.sizeFromShape(shape);
    var values = null;
    if (dtype == null || dtype === 'float32') {
        values = new Float32Array(size);
    }
    else if (dtype === 'int32') {
        values = new Int32Array(size);
    }
    else if (dtype === 'bool') {
        values = new Uint8Array(size);
    }
    else {
        throw new Error("Unknown data type " + dtype);
    }
    for (var i = 0; i < size; i++) {
        values[i] = randFunction();
    }
    return tensor_1.Tensor.make(shape, { values: values }, dtype);
}
/**
 * Creates a `tf.Tensor` with values drawn from a multinomial distribution.
 *
 * ```js
 * const probs = tf.tensor([.75, .25]);
 * tf.multinomial(probs, 3).print();
 * ```
 *
 * @param logits 1D array with unnormalized log-probabilities, or
 *     2D array of shape `[batchSize, numOutcomes]`. See the `normalized`
 *     parameter.
 * @param numSamples Number of samples to draw for each row slice.
 * @param seed The seed number.
 * @param normalized Whether the provided `logits` are normalized true
 *     probabilities (sum to 1). Defaults to false.
 * @return 1D array of shape `[numSamples]`, or 2D array of shape
 *     `[batchSize, numSamples]`, depending on the rank of the input.
 */
/** @doc {heading: 'Tensors', subheading: 'Random'} */
function multinomial_(logits, numSamples, seed, normalized) {
    if (normalized === void 0) { normalized = false; }
    var $logits = tensor_util_env_1.convertToTensor(logits, 'logits', 'multinomial');
    var numOutcomes = $logits.size;
    var origRank = $logits.rank;
    if (numOutcomes < 2) {
        throw new Error("Error in multinomial: you need at least 2 outcomes, but got " +
            (numOutcomes + "."));
    }
    if (origRank > 2) {
        throw new Error("Rank of probabilities must be 1 or 2, but is " + origRank);
    }
    seed = seed || Math.random();
    var logits2D = origRank === 1 ? $logits.as2D(1, -1) : $logits;
    var res = engine_1.ENGINE.runKernel(function (backend) { return backend.multinomial(logits2D, normalized, numSamples, seed); }, { logits2D: logits2D });
    return origRank === 1 ? res.as1D() : res;
}
/**
 * Creates a one-hot `tf.Tensor`. The locations represented by `indices` take
 * value `onValue` (defaults to 1), while all other locations take value
 * `offValue` (defaults to 0). If `indices` is rank `R`, the output has rank
 * `R+1` with the last axis of size `depth`.
 *
 * ```js
 * tf.oneHot(tf.tensor1d([0, 1], 'int32'), 3).print();
 * ```
 *
 * @param indices `tf.Tensor` of indices with dtype `int32`.
 * @param depth The depth of the one hot dimension.
 * @param onValue A number used to fill in the output when the index matches
 * the location.
 * @param offValue A number used to fill in the output when the index does
 *     not match the location.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function oneHot_(indices, depth, onValue, offValue) {
    if (onValue === void 0) { onValue = 1; }
    if (offValue === void 0) { offValue = 0; }
    if (depth < 2) {
        throw new Error("Error in oneHot: depth must be >=2, but it is " + depth);
    }
    var $indices = tensor_util_env_1.convertToTensor(indices, 'indices', 'oneHot', 'int32');
    var outShape = $indices.shape.concat([depth]);
    $indices = $indices.flatten();
    var grad = function (dy) {
        return { $indices: function () { return tensor_ops_1.zeros($indices.shape, 'float32'); } };
    };
    var result = engine_1.ENGINE.runKernel(function (backend) { return backend.oneHot($indices, depth, onValue, offValue); }, { $indices: $indices }, grad);
    return result.reshape(outShape);
}
/**
 * Reshapes a `tf.Tensor` to a given shape.
 *
 * Given an input tensor, returns a new tensor with the same values as the
 * input tensor with shape `shape`.
 *
 * If one component of shape is the special value -1, the size of that
 * dimension is computed so that the total size remains constant. In
 * particular, a shape of [-1] flattens into 1-D. At most one component of
 * shape can be -1.
 *
 * If shape is 1-D or higher, then the operation returns a tensor with shape
 * shape filled with the values of tensor. In this case, the number of
 * elements implied by shape must be the same as the number of elements in
 * tensor.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * x.reshape([2, 2]).print();
 * ```
 *
 * @param x The input tensor to be reshaped.
 * @param shape An array of integers defining the output tensor shape.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function reshape_(x, shape) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'reshape', null);
    shape = util.inferFromImplicitShape(shape, $x.size);
    util.assert($x.size === util.sizeFromShape(shape), function () { return 'new shape and old shape must have the same number of elements.'; });
    var grad = function (dy) {
        return { $x: function () { return dy.reshape($x.shape); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.reshape($x, shape); }, { $x: $x }, grad);
}
/**
 * Removes dimensions of size 1 from the shape of a `tf.Tensor`.
 *
 * ```js
 * const x = tf.tensor([1, 2, 3, 4], [1, 1, 4]);
 * x.squeeze().print();
 * ```
 *
 * @param x The input tensor to be squeezed.
 * @param axis An optional list of numbers. If specified, only
 *     squeezes the dimensions listed. The dimension index starts at 0. It
 * is an error to squeeze a dimension that is not 1.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function squeeze_(x, axis) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'squeeze');
    return exports.reshape($x, util.squeezeShape($x.shape, axis).newShape);
}
/**
 * Casts a `tf.Tensor` to a new dtype.
 *
 * ```js
 * const x = tf.tensor1d([1.5, 2.5, 3]);
 * tf.cast(x, 'int32').print();
 * ```
 * @param x The input tensor to be casted.
 * @param dtype The dtype to cast the input tensor to.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function cast_(x, dtype) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'cast');
    // Sanity checks.
    if (!util.isValidDtype(dtype)) {
        throw new Error("Failed to cast to unknown dtype " + dtype);
    }
    if (dtype === 'string' && $x.dtype !== 'string' ||
        dtype !== 'string' && $x.dtype === 'string') {
        throw new Error('Only strings can be casted to strings');
    }
    var grad = function (dy) {
        return { $x: function () { return dy.clone(); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.cast($x, dtype); }, { $x: $x }, grad);
}
/**
 * Construct a tensor by repeating it the number of times given by reps.
 *
 * This operation creates a new tensor by replicating `input` `reps`
 * times. The output tensor's i'th dimension has `input.shape[i] *
 * reps[i]` elements, and the values of `input` are replicated
 * `reps[i]` times along the i'th dimension. For example, tiling
 * `[a, b, c, d]` by `[2]` produces `[a, b, c, d, a, b, c, d]`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 *
 * a.tile([2]).print();    // or a.tile([2])
 * ```
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * a.tile([1, 2]).print();  // or a.tile([1, 2])
 * ```
 * @param x The tensor to tile.
 * @param reps Determines the number of replications per dimension.
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function tile_(x, reps) {
    var parseAs = null;
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'tile', parseAs);
    util.assert($x.rank === reps.length, function () { return "Error in transpose: rank of input " + $x.rank + " " +
        ("must match length of reps " + reps + "."); });
    var grad = function (dy, saved) {
        var $x = saved[0];
        var derX = function () {
            var xGrad = tensor_ops_1.zerosLike($x);
            // TODO(cais): Maybe reduce memory footprint by avoiding repeated
            // slicing.
            if ($x.rank === 1) {
                for (var i = 0; i < reps[0]; ++i) {
                    xGrad = xGrad.add(dy.slice([i * $x.shape[0]], [$x.shape[0]]));
                }
            }
            else if ($x.rank === 2) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        xGrad = xGrad.add(dy.slice([i * $x.shape[0], j * $x.shape[1]], [$x.shape[0], $x.shape[1]]));
                    }
                }
            }
            else if ($x.rank === 3) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        for (var k = 0; k < reps[2]; ++k) {
                            xGrad = xGrad.add(dy.slice([i * $x.shape[0], j * $x.shape[1], k * $x.shape[2]], [$x.shape[0], $x.shape[1], $x.shape[2]]));
                        }
                    }
                }
            }
            else if ($x.rank === 4) {
                for (var i = 0; i < reps[0]; ++i) {
                    for (var j = 0; j < reps[1]; ++j) {
                        for (var k = 0; k < reps[2]; ++k) {
                            for (var l = 0; l < reps[3]; ++l) {
                                xGrad = xGrad.add(dy.slice([
                                    i * $x.shape[0], j * $x.shape[1], k * $x.shape[2],
                                    l * $x.shape[3]
                                ], [$x.shape[0], $x.shape[1], $x.shape[2], $x.shape[3]]));
                            }
                        }
                    }
                }
            }
            else {
                throw new Error("Gradient for tile operation is not implemented for rank-" +
                    ($x.rank + " tensors yet."));
            }
            return xGrad;
        };
        return { $x: derX };
    };
    return engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.tile($x, reps);
        save([$x]);
        return res;
    }, { $x: $x }, grad);
}
/**
 * Pads a `tf.Tensor1D` with a given value and paddings. See `pad` for details.
 */
function pad1d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util.assert(paddings.length === 2, function () { return 'Invalid number of paddings. Must be length of 2.'; });
    return exports.pad(x, [paddings], constantValue);
}
/**
 * Pads a `tf.Tensor2D` with a given value and paddings. See `pad` for details.
 */
function pad2d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util.assert(paddings.length === 2 && paddings[0].length === 2 &&
        paddings[1].length === 2, function () { return 'Invalid number of paddings. Must be length of 2 each.'; });
    return exports.pad(x, paddings, constantValue);
}
/**
 * Pads a `tf.Tensor3D` with a given value and paddings. See `pad` for details.
 */
function pad3d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util.assert(paddings.length === 3 && paddings[0].length === 2 &&
        paddings[1].length === 2 && paddings[2].length === 2, function () { return 'Invalid number of paddings. Must be length of 2 each.'; });
    return exports.pad(x, paddings, constantValue);
}
/**
 * Pads a `tf.Tensor4D` with a given value and paddings. See `pad` for details.
 */
function pad4d_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    util.assert(paddings.length === 4 && paddings[0].length === 2 &&
        paddings[1].length === 2 && paddings[2].length === 2 &&
        paddings[3].length === 2, function () { return 'Invalid number of paddings. Must be length of 2 each.'; });
    return exports.pad(x, paddings, constantValue);
}
/**
 * Pads a `tf.Tensor` with a given value and paddings.
 *
 * This operation currently only implements the `CONSTANT` mode.
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that `paddings` is of given length.
 *   - `tf.pad1d`
 *   - `tf.pad2d`
 *   - `tf.pad3d`
 *   - `tf.pad4d`
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * x.pad([[1, 2]]).print();
 * ```
 * @param x The tensor to pad.
 * @param paddings An array of length `R` (the rank of the tensor), where
 * each element is a length-2 tuple of ints `[padBefore, padAfter]`,
 * specifying how much to pad along each dimension of the tensor.
 * @param constantValue The pad value to use. Defaults to 0.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function pad_(x, paddings, constantValue) {
    if (constantValue === void 0) { constantValue = 0; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'pad');
    if ($x.rank === 0) {
        throw new Error('pad(scalar) is not defined. Pass non-scalar to pad');
    }
    // Pad introduces values around the original tensor, so the gradient
    // slices the original shape out of the gradient.
    var begin = paddings.map(function (p) { return p[0]; });
    var grad = function (dy) {
        return { $x: function () { return dy.slice(begin, $x.shape); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.pad($x, paddings, constantValue); }, { $x: $x }, grad);
}
/**
 * Stacks a list of rank-`R` `tf.Tensor`s into one rank-`(R+1)` `tf.Tensor`.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 * tf.stack([a, b, c]).print();
 * ```
 *
 * @param tensors A list of tensor objects with the same shape and dtype.
 * @param axis The axis to stack along. Defaults to 0 (the first dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function stack_(tensors, axis) {
    if (axis === void 0) { axis = 0; }
    var $tensors = tensor_util_env_1.convertToTensorArray(tensors, 'tensors', 'stack');
    util.assert($tensors.length >= 1, function () { return 'Pass at least one tensor to tf.stack'; });
    if ($tensors.length === 1) {
        return $tensors[0].expandDims(axis);
    }
    var rank = $tensors[0].rank;
    var shape = $tensors[0].shape;
    var dtype = $tensors[0].dtype;
    util.assert(axis <= rank, function () { return 'Axis must be <= rank of the tensor'; });
    $tensors.forEach(function (t) {
        util.assertShapesMatch(shape, t.shape, 'All tensors passed to stack must have matching shapes');
    });
    $tensors.forEach(function (t) {
        util.assert(dtype === t.dtype, function () { return 'All tensors passed to stack must have matching dtypes'; });
    });
    var expandedTensors = $tensors.map(function (t) { return t.expandDims(axis); });
    return concat_split_1.concat(expandedTensors, axis);
}
/**
 * This operation reshapes the "batch" dimension 0 into `M + 1` dimensions of
 * shape `blockShape + [batch]`, interleaves these blocks back into the grid
 * defined by the spatial dimensions `[1, ..., M]`, to obtain a result with
 * the same rank as the input. The spatial dimensions of this intermediate
 * result are then optionally cropped according to `crops` to produce the
 * output. This is the reverse of `tf.spaceToBatchND`. See below for a precise
 * description.
 *
 * ```js
 * const x = tf.tensor4d([1, 2, 3, 4], [4, 1, 1, 1]);
 * const blockShape = [2, 2];
 * const crops = [[0, 0], [0, 0]];
 *
 * x.batchToSpaceND(blockShape, crops).print();
 * ```
 *
 * @param x A `tf.Tensor`. N-D with `x.shape` = `[batch] + spatialShape +
 * remainingShape`, where spatialShape has `M` dimensions.
 * @param blockShape A 1-D array. Must have shape `[M]`, all values must
 * be >= 1.
 * @param crops A 2-D array.  Must have shape `[M, 2]`, all values must be >= 0.
 * `crops[i] = [cropStart, cropEnd]` specifies the amount to crop from input
 * dimension `i + 1`, which corresponds to spatial dimension `i`. It is required
 * that `cropStart[i] + cropEnd[i] <= blockShape[i] * inputShape[i + 1]`
 *
 * This operation is equivalent to the following steps:
 *
 * 1. Reshape `x` to `reshaped` of shape: `[blockShape[0], ...,
 * blockShape[M-1], batch / prod(blockShape), x.shape[1], ...,
 * x.shape[N-1]]`
 *
 * 2. Permute dimensions of `reshaped`to produce `permuted` of shape `[batch /
 * prod(blockShape),x.shape[1], blockShape[0], ..., x.shape[M],
 * blockShape[M-1],x.shape[M+1], ..., x.shape[N-1]]`
 *
 * 3. Reshape `permuted` to produce `reshapedPermuted` of shape `[batch /
 * prod(blockShape),x.shape[1] * blockShape[0], ..., x.shape[M] *
 * blockShape[M-1],x.shape[M+1], ..., x.shape[N-1]]`
 *
 * 4. Crop the start and end of dimensions `[1, ..., M]` of `reshapedPermuted`
 * according to `crops` to produce the output of shape: `[batch /
 * prod(blockShape),x.shape[1] * blockShape[0] - crops[0,0] - crops[0,1],
 * ..., x.shape[M] * blockShape[M-1] - crops[M-1,0] -
 * crops[M-1,1],x.shape[M+1], ..., x.shape[N-1]]`
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function batchToSpaceND_(x, blockShape, crops) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchToSpaceND');
    var prod = blockShape.reduce(function (a, b) { return a * b; });
    util.assert($x.rank >= 1 + blockShape.length, function () { return "input rank is " + $x.rank + " but should be > than blockShape.length " + blockShape.length; });
    util.assert(crops.length === blockShape.length, function () { return "crops.length is " + crops.length + " but should be equal to blockShape.length  " + blockShape.length; });
    util.assert($x.shape[0] % prod === 0, function () { return "input tensor batch is " + $x.shape[0] + " but is not divisible by the product of " +
        ("the elements of blockShape " + blockShape.join(' * ') + " === " + prod); });
    var grad = function (dy) {
        return { $x: function () { return dy.spaceToBatchND(blockShape, crops); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.batchToSpaceND($x, blockShape, crops); }, { $x: $x }, grad);
}
/**
 * This operation divides "spatial" dimensions `[1, ..., M]` of the input into
 * a grid of blocks of shape `blockShape`, and interleaves these blocks with
 * the "batch" dimension (0) such that in the output, the spatial
 * dimensions `[1, ..., M]` correspond to the position within the grid,
 * and the batch dimension combines both the position within a spatial block
 * and the original batch position. Prior to division into blocks,
 * the spatial dimensions of the input are optionally zero padded
 * according to `paddings`. See below for a precise description.
 *
 * ```js
 * const x = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
 * const blockShape = [2, 2];
 * const paddings = [[0, 0], [0, 0]];
 *
 * x.spaceToBatchND(blockShape, paddings).print();
 * ```
 *
 * @param x A `tf.Tensor`. N-D with `x.shape` = `[batch] + spatialShape +
 * remainingShape`, where spatialShape has `M` dimensions.
 * @param blockShape A 1-D array. Must have shape `[M]`, all values must
 * be >= 1.
 * @param paddings A 2-D array. Must have shape `[M, 2]`, all values must be >=
 *     0. `paddings[i] = [padStart, padEnd]` specifies the amount to zero-pad
 * from input dimension `i + 1`, which corresponds to spatial dimension `i`. It
 * is required that
 * `(inputShape[i + 1] + padStart + padEnd) % blockShape[i] === 0`
 *
 * This operation is equivalent to the following steps:
 *
 * 1. Zero-pad the start and end of dimensions `[1, ..., M]` of the input
 * according to `paddings` to produce `padded` of shape paddedShape.
 *
 * 2. Reshape `padded` to `reshapedPadded` of shape:
 * `[batch] + [paddedShape[1] / blockShape[0], blockShape[0], ...,
 * paddedShape[M] / blockShape[M-1], blockShape[M-1]] + remainingShape`
 *
 * 3. Permute dimensions of `reshapedPadded` to produce `permutedReshapedPadded`
 * of shape: `blockShape + [batch] + [paddedShape[1] / blockShape[0], ...,
 * paddedShape[M] / blockShape[M-1]] + remainingShape`
 *
 * 4. Reshape `permutedReshapedPadded` to flatten `blockShape` into the
 * batch dimension, producing an output tensor of shape:
 * `[batch * prod(blockShape)] + [paddedShape[1] / blockShape[0], ...,
 * paddedShape[M] / blockShape[M-1]] + remainingShape`
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function spaceToBatchND_(x, blockShape, paddings) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'spaceToBatchND');
    util.assert($x.rank >= 1 + blockShape.length, function () { return "input rank " + $x.rank + " should be > than [blockShape] " + blockShape.length; });
    util.assert(paddings.length === blockShape.length, function () { return "paddings.shape[0] " + paddings.length + " must be equal to [blockShape] " + blockShape.length; });
    util.assert($x.shape.reduce(function (a, b, i) {
        if (i > 0 && i <= blockShape.length) {
            return a &&
                ((b + paddings[i - 1][0] + paddings[i - 1][1]) %
                    blockShape[i - 1] ===
                    0);
        }
        return a;
    }, true), function () { return "input spatial dimensions " + $x.shape.slice(1) + " with paddings " + paddings.toString() + " must be divisible by blockShapes " + blockShape.toString(); });
    var grad = function (dy) {
        return { $x: function () { return dy.batchToSpaceND(blockShape, paddings); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.spaceToBatchND($x, blockShape, paddings); }, { $x: $x }, grad);
}
/**
 * Unstacks a `tf.Tensor` of rank-`R` into a list of rank-`(R-1)` `tf.Tensor`s.
 *
 * ```js
 * const a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 *
 * tf.unstack(a).forEach(tensor => tensor.print());
 * ```
 *
 * @param x A tensor object.
 * @param axis The axis to unstack along. Defaults to 0 (the first dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
function unstack_(x, axis) {
    if (axis === void 0) { axis = 0; }
    axis = axis || 0;
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'unstack');
    util.assert(axis >= -$x.shape.length && axis < $x.shape.length, function () {
        return "Axis = " + axis + " is not in [-" + $x.shape.length + ", " + $x.shape.length + ")";
    });
    if (axis < 0) {
        axis += $x.shape.length;
    }
    var grad = function (dy) {
        return { $x: function () { return exports.stack(dy, axis); } };
    };
    return engine_1.ENGINE.runKernel(function (backend) { return backend.unstack($x, axis); }, { $x: $x }, grad);
}
/**
 * Computes the cumulative sum of a `tf.Tensor` along `axis`.
 *
 * ```js
 * const x = tf.tensor([1, 2, 3, 4]);
 * x.cumsum().print();
 * ```
 * ```js
 * const x = tf.tensor([[1, 2], [3, 4]]);
 * x.cumsum().print();
 * ```
 *
 * @param x The input tensor to be summed.
 * @param axis The axis along which to sum. Optional. Defaults to 0.
 * @param exclusive Whether to perform exclusive cumulative sum. Optional.
 *     Defaults to false. If set to true then the sum of each tensor entry
 *     does not include its own value, but only the values previous to it
 *     along the specified axis.
 * @param reverse Whether to sum in the opposite direction. Optional.
 *     Defaults to false.
 */
/** @doc {heading: 'Operations', subheading: 'Scan'} */
function cumsum_(x, axis, exclusive, reverse) {
    if (axis === void 0) { axis = 0; }
    if (exclusive === void 0) { exclusive = false; }
    if (reverse === void 0) { reverse = false; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'cumsum');
    axis = axis | 0;
    var permutation = axis_util_1.getAxesPermutation([axis], $x.rank);
    var permutedX = $x;
    if (permutation != null) {
        permutedX = $x.transpose(permutation);
    }
    var permutedAxis = axis_util_1.getInnerMostAxes(1, $x.rank)[0];
    var grad = function (dy) {
        return { permutedX: function () { return dy.cumsum(axis, exclusive, !reverse); } };
    };
    var value = engine_1.ENGINE.runKernel(function (backend) { return backend.cumsum(permutedX, permutedAxis, exclusive, reverse); }, { permutedX: permutedX }, grad);
    if (permutation != null) {
        value = value.transpose(permutation);
    }
    return value;
}
/**
 * Returns a `tf.Tensor` that has expanded rank, by inserting a dimension
 * into the tensor's shape.
 *
 * ```js
 * const x = tf.tensor1d([1, 2, 3, 4]);
 * const axis = 1;
 * x.expandDims(axis).print();
 * ```
 *
 * @param x The input tensor whose dimensions to be expanded.
 * @param axis The dimension index at which to insert shape of `1`. Defaults
 *     to 0 (the first dimension).
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function expandDims_(x, axis) {
    if (axis === void 0) { axis = 0; }
    var parseAs = null;
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'expandDims', parseAs);
    util.assert(axis <= $x.rank, function () { return 'Axis must be <= rank of the tensor'; });
    var newShape = $x.shape.slice();
    if (axis < 0) {
        // Negative value is counted from the tail of rank.
        util.assert(-($x.rank + 1) <= axis, function () { return "Axis must be in the interval [" + -($x.rank + 1) + ", " + $x.rank + "]"; });
        axis = $x.rank + axis + 1;
    }
    newShape.splice(axis, 0, 1);
    return exports.reshape($x, newShape);
}
/**
 * Rearranges data from depth into blocks of spatial data. More specifically,
 * this op outputs a copy of the input tensor where values from the `depth`
 * dimension are moved in spatial blocks to the `height` and `width` dimensions.
 * The attr `blockSize` indicates the input block size and how the data is
 * moved.
 *
 *  - Chunks of data of size `blockSize * blockSize` from depth are rearranged
 * into non-overlapping blocks of size `blockSize x blockSize`
 *
 *  - The width the output tensor is `inputWidth * blockSize`, whereas the
 * height is `inputHeight * blockSize`
 *
 *  - The Y, X coordinates within each block of the output image are determined
 * by the high order component of the input channel index
 *
 *  - The depth of the input tensor must be divisible by `blockSize *
 * blockSize`
 *
 * The `dataFormat` attr specifies the layout of the input and output tensors
 * with the following options: "NHWC": [ `batch, height, width, channels` ]
 * "NCHW": [ `batch, channels, height, width` ]
 *
 * ```js
 * const x = tf.tensor4d([1, 2, 3, 4], [1, 1, 1, 4]);
 * const blockSize = 2;
 * const dataFormat = "NHWC";
 *
 * tf.depthToSpace(x, blockSize, dataFormat).print();
 * ```
 *
 * @param x The input tensor of rank 4
 * @param blockSIze  An `int` that is `>= 2`. The size of the spatial block
 * @param dataFormat An optional string from: "NHWC", "NCHW". Defaults to "NHWC"
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function depthToSpace_(x, blockSize, dataFormat) {
    if (dataFormat === void 0) { dataFormat = 'NHWC'; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'depthToSpace');
    var inputHeight = (dataFormat === 'NHWC') ? $x.shape[1] : $x.shape[2];
    var inputWidth = (dataFormat === 'NHWC') ? $x.shape[2] : $x.shape[3];
    var inputDepth = (dataFormat === 'NHWC') ? $x.shape[3] : $x.shape[1];
    util.assert(inputHeight * blockSize >= 0, function () { return "Negative dimension size caused by overflow when multiplying\n      " + inputHeight + " and " + blockSize + "  for depthToSpace with input shape\n      " + $x.shape; });
    util.assert(inputWidth * blockSize >= 0, function () { return "Negative dimension size caused by overflow when multiplying\n      " + inputWidth + " and " + blockSize + " for depthToSpace with input shape\n          " + $x.shape; });
    util.assert((inputDepth % (blockSize * blockSize) === 0), function () { return "Dimension size must be evenly divisible by " + blockSize * blockSize + " but is " + inputDepth + " for depthToSpace with input shape " + $x.shape; });
    return engine_1.ENGINE.runKernel(function (backend) { return backend.depthToSpace($x, blockSize, dataFormat); }, { $x: $x });
}
/**
 * Computes the difference between two lists of numbers.
 *
 * Given a Tensor `x` and a Tensor `y`, this operation returns a Tensor `out`
 * that represents all values that are in `x` but not in `y`. The returned
 * Tensor `out` is sorted in the same order that the numbers appear in `x`
 * (duplicates are preserved). This operation also returns a Tensor indices that
 * represents the position of each out element in `x`. In other words:
 *
 * `out[i] = x[idx[i]] for i in [0, 1, ..., out.length - 1]`
 *
 * ```js
 * const x = [1, 2, 3, 4, 5, 6];
 * const y = [1, 3, 5];
 *
 * const [out, indices] = await tf.setdiff1dAsync(x, y);
 * out.print(); // [2, 4, 6]
 * indices.print(); // [1, 3, 5]
 * ```
 *
 * @param x 1-D Tensor. Values to keep.
 * @param y 1-D Tensor. Must have the same type as x. Values to exclude in the
 *     output.
 * @returns Promise of Tensor tuple [out, indices].
 *  out: Tensor with the same type as x.
 *  indices: A Tensor of type int32.
 */
/** @doc {heading: 'Tensors', subheading: 'Transformations'} */
function setdiff1dAsync_(x, y) {
    return __awaiter(this, void 0, void 0, function () {
        var $x, $y, xVals, yVals, ySet, outputSize, i, buffer, indices, i, p;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    $x = tensor_util_env_1.convertToTensor(x, 'x', 'setdiff1d');
                    $y = tensor_util_env_1.convertToTensor(y, 'y', 'setdiff1d');
                    util.assert($x.dtype === $y.dtype, function () { return "x and y should have the same dtype, but got x (" + $x.dtype + ") and y (" + $y.dtype + ")."; });
                    util.assert($x.rank === 1, function () { return "x should be 1D tensor, but got x (" + $x.shape + ")."; });
                    util.assert($y.rank === 1, function () { return "y should be 1D tensor, but got y (" + $y.shape + ")."; });
                    return [4 /*yield*/, $x.data()];
                case 1:
                    xVals = _a.sent();
                    return [4 /*yield*/, $y.data()];
                case 2:
                    yVals = _a.sent();
                    ySet = new Set(yVals);
                    outputSize = 0;
                    for (i = 0; i < xVals.length; i++) {
                        if (!ySet.has(xVals[i])) {
                            outputSize++;
                        }
                    }
                    buffer = new tensor_1.TensorBuffer([outputSize], $x.dtype);
                    indices = new tensor_1.TensorBuffer([outputSize], 'int32');
                    for (i = 0, p = 0; i < xVals.length; i++) {
                        if (!ySet.has(xVals[i])) {
                            buffer.values[p] = xVals[i];
                            indices.values[p] = i;
                            p++;
                        }
                    }
                    return [2 /*return*/, [buffer.toTensor(), indices.toTensor()]];
            }
        });
    });
}
/**
 * Creates an empty `tf.TensorBuffer` with the specified `shape` and `dtype`.
 *
 * The values are stored in CPU as `TypedArray`. Fill the buffer using
 * `buffer.set()`, or by modifying directly `buffer.values`.
 *
 * When done, call `buffer.toTensor()` to get an immutable `tf.Tensor` with
 * those values.
 *
 * ```js
 * // Create a buffer and set values at particular indices.
 * const buffer = tf.buffer([2, 2]);
 * buffer.set(3, 0, 0);
 * buffer.set(5, 1, 0);
 *
 * // Convert the buffer back to a tensor.
 * buffer.toTensor().print();
 * ```
 *
 * @param shape An array of integers defining the output tensor shape.
 * @param dtype The dtype of the buffer. Defaults to 'float32'.
 * @param values The values of the buffer as `TypedArray`. Defaults to
 * zeros.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function buffer(shape, dtype, values) {
    if (dtype === void 0) { dtype = 'float32'; }
    dtype = dtype || 'float32';
    util.assertNonNegativeIntegerDimensions(shape);
    return new tensor_1.TensorBuffer(shape, dtype, values);
}
exports.buffer = buffer;
/**
 * Prints information about the `tf.Tensor` including its data.
 *
 * ```js
 * const verbose = true;
 * tf.tensor2d([1, 2, 3, 4], [2, 2]).print(verbose);
 * ```
 * @param x The tensor to be printed.
 * @param verbose Whether to print verbose information about the ` Tensor`,
 * including dtype and size.
 */
/** @doc {heading: 'Tensors', subheading: 'Creation'} */
function print(x, verbose) {
    if (verbose === void 0) { verbose = false; }
    console.log(x.toString(verbose));
}
exports.print = print;
exports.batchToSpaceND = operation_1.op({ batchToSpaceND_: batchToSpaceND_ });
exports.cast = operation_1.op({ cast_: cast_ });
exports.clone = operation_1.op({ clone_: clone_ });
exports.cumsum = operation_1.op({ cumsum_: cumsum_ });
exports.depthToSpace = operation_1.op({ depthToSpace_: depthToSpace_ });
exports.expandDims = operation_1.op({ expandDims_: expandDims_ });
exports.eye = operation_1.op({ eye_: eye_ });
exports.multinomial = operation_1.op({ multinomial_: multinomial_ });
exports.oneHot = operation_1.op({ oneHot_: oneHot_ });
exports.pad = operation_1.op({ pad_: pad_ });
exports.pad1d = operation_1.op({ pad1d_: pad1d_ });
exports.pad2d = operation_1.op({ pad2d_: pad2d_ });
exports.pad3d = operation_1.op({ pad3d_: pad3d_ });
exports.pad4d = operation_1.op({ pad4d_: pad4d_ });
exports.rand = operation_1.op({ rand_: rand_ });
exports.randomNormal = operation_1.op({ randomNormal_: randomNormal_ });
exports.randomUniform = operation_1.op({ randomUniform_: randomUniform_ });
exports.reshape = operation_1.op({ reshape_: reshape_ });
exports.spaceToBatchND = operation_1.op({ spaceToBatchND_: spaceToBatchND_ });
exports.squeeze = operation_1.op({ squeeze_: squeeze_ });
exports.stack = operation_1.op({ stack_: stack_ });
exports.tile = operation_1.op({ tile_: tile_ });
exports.truncatedNormal = operation_1.op({ truncatedNormal_: truncatedNormal_ });
exports.unstack = operation_1.op({ unstack_: unstack_ });
exports.setdiff1dAsync = setdiff1dAsync_;
//# sourceMappingURL=array_ops.js.map