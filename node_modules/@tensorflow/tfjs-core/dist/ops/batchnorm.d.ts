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
import { Rank, TensorLike } from '../types';
/**
 * Batch normalization, strictly for 2D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
declare function batchNorm2d_(x: Tensor2D | TensorLike, mean: Tensor2D | Tensor1D | TensorLike, variance: Tensor2D | Tensor1D | TensorLike, offset?: Tensor2D | Tensor1D | TensorLike, scale?: Tensor2D | Tensor1D | TensorLike, varianceEpsilon?: number): Tensor2D;
/**
 * Batch normalization, strictly for 3D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
declare function batchNorm3d_(x: Tensor3D | TensorLike, mean: Tensor3D | Tensor1D | TensorLike, variance: Tensor3D | Tensor1D | TensorLike, offset?: Tensor3D | Tensor1D | TensorLike, scale?: Tensor3D | Tensor1D | TensorLike, varianceEpsilon?: number): Tensor3D;
/**
 * Batch normalization, strictly for 4D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
declare function batchNorm4d_(x: Tensor4D | TensorLike, mean: Tensor4D | Tensor1D | TensorLike, variance: Tensor4D | Tensor1D | TensorLike, offset?: Tensor4D | Tensor1D | TensorLike, scale?: Tensor4D | Tensor1D | TensorLike, varianceEpsilon?: number): Tensor4D;
/**
 * @deprecated Please use `tf.batchNorm` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
declare function batchNormalization_<R extends Rank>(x: Tensor<R> | TensorLike, mean: Tensor<R> | Tensor1D | TensorLike, variance: Tensor<R> | Tensor1D | TensorLike, varianceEpsilon?: number, scale?: Tensor<R> | Tensor1D | TensorLike, offset?: Tensor<R> | Tensor1D | TensorLike): Tensor<R>;
/**
 * Batch normalization.
 *
 * As described in
 * [http://arxiv.org/abs/1502.03167](http://arxiv.org/abs/1502.03167).
 *
 * Mean, variance, scale, and offset can be of two shapes:
 *   - The same shape as the input.
 *   - In the common case, the depth dimension is the last dimension of x, so
 *     the values would be an `tf.Tensor1D` of shape [depth].
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that parameters passed are of given rank
 *   - `tf.batchNorm2d`
 *   - `tf.batchNorm3d`
 *   - `tf.batchNorm4d`
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
declare function batchNorm_<R extends Rank>(x: Tensor<R> | TensorLike, mean: Tensor<R> | Tensor1D | TensorLike, variance: Tensor<R> | Tensor1D | TensorLike, offset?: Tensor<R> | Tensor1D | TensorLike, scale?: Tensor<R> | Tensor1D | TensorLike, varianceEpsilon?: number): Tensor<R>;
/**
 * @deprecated Please use `tf.batchNorm2d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
declare function batchNormalization2d_(x: Tensor2D | TensorLike, mean: Tensor2D | Tensor1D | TensorLike, variance: Tensor2D | Tensor1D | TensorLike, varianceEpsilon?: number, scale?: Tensor2D | Tensor1D | TensorLike, offset?: Tensor2D | Tensor1D | TensorLike): Tensor2D;
/**
 * @deprecated Please use `tf.batchNorm3d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
declare function batchNormalization3d_(x: Tensor3D | TensorLike, mean: Tensor3D | Tensor1D | TensorLike, variance: Tensor3D | Tensor1D | TensorLike, varianceEpsilon?: number, scale?: Tensor3D | Tensor1D | TensorLike, offset?: Tensor3D | Tensor1D | TensorLike): Tensor3D;
/**
 * @deprecated Please use `tf.batchNorm4d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
declare function batchNormalization4d_(x: Tensor4D | TensorLike, mean: Tensor4D | Tensor1D | TensorLike, variance: Tensor4D | Tensor1D | TensorLike, varianceEpsilon?: number, scale?: Tensor4D | Tensor1D | TensorLike, offset?: Tensor4D | Tensor1D | TensorLike): Tensor4D;
export declare const batchNormalization2d: typeof batchNormalization2d_;
export declare const batchNormalization3d: typeof batchNormalization3d_;
export declare const batchNormalization4d: typeof batchNormalization4d_;
export declare const batchNormalization: typeof batchNormalization_;
export declare const batchNorm: typeof batchNorm_;
export declare const batchNorm2d: typeof batchNorm2d_;
export declare const batchNorm3d: typeof batchNorm3d_;
export declare const batchNorm4d: typeof batchNorm4d_;
export {};
