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
import { Tensor } from '../tensor';
export declare function assertParamsValid(input: Tensor, begin: number[], size: number[]): void;
/**
 * Calculate the start index and output tensor shape for strided slice op.
 * @returns array of [startIndex, size, shrinkAxis]
 */
export declare function getStridedSlicedInfo(shape: number[], begin: number[], end: number[], strides: number[], beginMask?: number, endMask?: number, ellipsisMask?: number, newAxisMask?: number, shrinkAxisMask?: number): [number[], number[], number[]];
export declare function startForAxis(beginMask: number, startIndices: number[], strides: number[], inputShape: number[], axis: number): number;
export declare function stopForAxis(endMask: number, stopIndices: number[], strides: number[], inputShape: number[], axis: number): number;
/**
 * Returns true if the slice occupies a continous set of elements in the
 * 'flat' space.
 */
export declare function isSliceContinous(shape: number[], begin: number[], size: number[]): boolean;
export declare function computeFlatOffset(begin: number[], strides: number[]): number;
