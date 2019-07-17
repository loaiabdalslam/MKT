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
import { Scalar, Tensor } from '../tensor';
/**
 * Sets entries in `x` to zero at random, while scaling the entire tensor.
 * ```js
 * const x = tf.range(1, 21).reshape([10, 2]);
 * const rate = 0.5;
 * const seed = 23;
 * const noiseShape = null || x.shape;
 * const tensor = tf.dropout(x, rate, noiseShape, seed);
 * ```
 * @param x input tensor.
 * @param level fraction of the entries in the tensor that will be set to 0.
 * @param noiseShape shape of randomly generated keep/drop flags, must be
 *   broadcastable to the shape of `x`.
 * @param seed random seed to ensure determinism.
 * @returns Result of the dropout operation.
 */
declare function dropout_(x: Tensor, rate: Scalar | number, noiseShape?: number[], seed?: number): Tensor;
export declare const dropout: typeof dropout_;
export {};
