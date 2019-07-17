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
import { Tensor } from '../tensor';
import { TensorLike } from '../types';
/**
 * Returns the truth value of (a != b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.notEqualStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([0, 2, 3]);
 *
 * a.notEqual(b).print();
 * ```
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function notEqual_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
/**
 * Strict version of `tf.notEqual` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
declare function notEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * Returns the truth value of (a < b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.lessStrict` which has the same signature as this op and
 * asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.less(b).print();
 * ```
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function less_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
/**
 * Strict version of `tf.less` that forces `a` and `b` to be of the same
 * shape.
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same shape and dtype as
 *     `a`.
 */
declare function lessStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * Returns the truth value of (a == b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.equalStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.equal(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function equal_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function equalStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * Returns the truth value of (a <= b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.lessEqualStrict` which has the same signature as this op
 * and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.lessEqual(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function lessEqual_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function lessEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * Returns the truth value of (a > b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.greaterStrict` which has the same signature as this
 * op and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.greater(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function greater_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function greaterStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
/**
 * Returns the truth value of (a >= b) element-wise. Supports broadcasting.
 *
 * We also expose `tf.greaterEqualStrict` which has the same signature as this
 * op and asserts that `a` and `b` are the same shape (does not broadcast).
 *
 * ```js
 * const a = tf.tensor1d([1, 2, 3]);
 * const b = tf.tensor1d([2, 2, 2]);
 *
 * a.greaterEqual(b).print();
 * ```
 *
 * @param a The first input tensor.
 * @param b The second input tensor. Must have the same dtype as `a`.
 */
/** @doc {heading: 'Operations', subheading: 'Logical'} */
declare function greaterEqual_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function greaterEqualStrict_<T extends Tensor>(a: T | TensorLike, b: T | TensorLike): T;
export declare const equal: typeof equal_;
export declare const equalStrict: typeof equalStrict_;
export declare const greater: typeof greater_;
export declare const greaterEqual: typeof greaterEqual_;
export declare const greaterEqualStrict: typeof greaterEqualStrict_;
export declare const greaterStrict: typeof greaterStrict_;
export declare const less: typeof less_;
export declare const lessEqual: typeof lessEqual_;
export declare const lessEqualStrict: typeof lessEqualStrict_;
export declare const lessStrict: typeof lessStrict_;
export declare const notEqual: typeof notEqual_;
export declare const notEqualStrict: typeof notEqualStrict_;
export {};
