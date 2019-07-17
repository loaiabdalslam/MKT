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
import { Tensor, Tensor1D, Tensor2D, Tensor3D, Tensor4D } from '../tensor';
import { TensorLike } from '../types';
/**
 * Concatenates a list of`tf.Tensor1D`s along an axis. See `concat` for details.
 *
 * For example, if:
 * A: shape(3) = |r1, g1, b1|
 * B: shape(2) = |r2, g2|
 * C = tf.concat1d([A, B]) == |r1, g1, b1, r2, g2|
 *
 * @param tensors A list of`tf.Tensor`s to concatenate.
 * @return The concatenated array.
 */
declare function concat1d_(tensors: Array<Tensor1D | TensorLike>): Tensor1D;
/**
 * Concatenates a list of`tf.Tensor2D`s along an axis. See `concat` for details.
 *
 * For example, if:
 * A: shape(2, 3) = | r1, g1, b1 |
 *                  | r2, g2, b2 |
 *
 * B: shape(2, 3) = | r3, g3, b3 |
 *                  | r4, g4, b4 |
 *
 * C = tf.concat2d([A, B], axis)
 *
 * if axis = 0:
 * C: shape(4, 3) = | r1, g1, b1 |
 *                  | r2, g2, b2 |
 *                  | r3, g3, b3 |
 *                  | r4, g4, b4 |
 *
 * if axis = 1:
 * C = shape(2, 6) = | r1, g1, b1, r3, g3, b3 |
 *                   | r2, g2, b2, r4, g4, b4 |
 *
 *
 * @param tensors A list of `tf.Tensor`s to concatenate.
 * @param axis The axis to concatenate along.
 * @return The concatenated array.
 */
declare function concat2d_(tensors: Array<Tensor2D | TensorLike>, axis: number): Tensor2D;
/**
 * Concatenates a list of `tf.Tensor3D`s along an axis.
 * See `concat` for details.
 *
 * For example, if:
 * A: shape(2, 1, 3) = | r1, g1, b1 |
 *                     | r2, g2, b2 |
 *
 * B: shape(2, 1, 3) = | r3, g3, b3 |
 *                     | r4, g4, b4 |
 *
 * C = tf.concat3d([A, B], axis)
 *
 * if axis = 0:
 * C: shape(4, 1, 3) = | r1, g1, b1 |
 *                     | r2, g2, b2 |
 *                     | r3, g3, b3 |
 *                     | r4, g4, b4 |
 *
 * if axis = 1:
 * C: shape(2, 2, 3) = | r1, g1, b1, r3, g3, b3 |
 *                     | r2, g2, b2, r4, g4, b4 |
 *
 * if axis = 2:
 * C = shape(2, 1, 6) = | r1, g1, b1, r3, g3, b3 |
 *                      | r2, g2, b2, r4, g4, b4 |
 *
 * @param tensors A list of`tf.Tensor`s to concatenate.
 * @param axis The axis to concate along.
 * @return The concatenated array.
 */
declare function concat3d_(tensors: Array<Tensor3D | TensorLike>, axis: number): Tensor3D;
/**
 * Concatenates a list of `tf.Tensor4D`s along an axis.
 * See `concat` for details.
 *
 * @param tensors A list of `tf.Tensor`s to concatenate.
 * @param axis The axis to concate along.
 * @return The concatenated array.
 */
declare function concat4d_(tensors: Array<Tensor4D | TensorLike>, axis: number): Tensor4D;
/**
 * Concatenates a list of `tf.Tensor`s along a given axis.
 *
 * The tensors ranks and types must match, and their sizes must match in all
 * dimensions except `axis`.
 *
 * Also available are stricter rank-specific methods that assert that
 * `tensors` are of the given rank:
 *   - `tf.concat1d`
 *   - `tf.concat2d`
 *   - `tf.concat3d`
 *   - `tf.concat4d`
 *
 * Except `tf.concat1d` (which does not have axis param), all methods have
 * same signature as this method.
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * a.concat(b).print();  // or a.concat(b)
 * ```
 *
 * ```js
 * const a = tf.tensor1d([1, 2]);
 * const b = tf.tensor1d([3, 4]);
 * const c = tf.tensor1d([5, 6]);
 * tf.concat([a, b, c]).print();
 * ```
 *
 * ```js
 * const a = tf.tensor2d([[1, 2], [10, 20]]);
 * const b = tf.tensor2d([[3, 4], [30, 40]]);
 * const axis = 1;
 * tf.concat([a, b], axis).print();
 * ```
 * @param tensors A list of tensors to concatenate.
 * @param axis The axis to concate along. Defaults to 0 (the first dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
declare function concat_<T extends Tensor>(tensors: Array<T | TensorLike>, axis?: number): T;
/**
 * Splits a `tf.Tensor` into sub tensors.
 *
 * If `numOrSizeSplits` is a number, splits `x` along dimension `axis`
 * into `numOrSizeSplits` smaller tensors.
 * Requires that `numOrSizeSplits` evenly divides `x.shape[axis]`.
 *
 * If `numOrSizeSplits` is a number array, splits `x` into
 * `numOrSizeSplits.length` pieces. The shape of the `i`-th piece has the
 * same size as `x` except along dimension `axis` where the size is
 * `numOrSizeSplits[i]`.
 *
 * ```js
 * const x = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8], [2, 4]);
 * const [a, b] = tf.split(x, 2, 1);
 * a.print();
 * b.print();
 *
 * const [c, d, e] = tf.split(x, [1, 2, 1], 1);
 * c.print();
 * d.print();
 * e.print();
 * ```
 *
 * @param x The input tensor to split.
 * @param numOrSizeSplits Either an integer indicating the number of
 * splits along the axis or an array of integers containing the sizes of
 * each output tensor along the axis. If a number then it must evenly divide
 * `x.shape[axis]`; otherwise the sum of sizes must match `x.shape[axis]`.
 * @param axis The dimension along which to split. Defaults to 0 (the first
 * dim).
 */
/** @doc {heading: 'Tensors', subheading: 'Slicing and Joining'} */
declare function split_<T extends Tensor>(x: T | TensorLike, numOrSizeSplits: number[] | number, axis?: number): T[];
export declare const concat: typeof concat_;
export declare const concat1d: typeof concat1d_;
export declare const concat2d: typeof concat2d_;
export declare const concat3d: typeof concat3d_;
export declare const concat4d: typeof concat4d_;
export declare const split: typeof split_;
export {};
