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
export interface RandomBase {
    nextValue(): number;
}
export interface RandNormalDataTypes {
    float32: Float32Array;
    int32: Int32Array;
}
export declare class MPRandGauss implements RandomBase {
    private mean;
    private stdDev;
    private nextVal;
    private dtype?;
    private truncated?;
    private upper?;
    private lower?;
    private random;
    constructor(mean: number, stdDeviation: number, dtype?: keyof RandNormalDataTypes, truncated?: boolean, seed?: number);
    /** Returns next sample from a gaussian distribution. */
    nextValue(): number;
    /** Handles proper rounding for non floating point numbers. */
    private convertValue;
    /** Returns true if less than 2-standard-deviations from the mean. */
    private isValidTruncated;
}
export declare class UniformRandom implements RandomBase {
    private min;
    private range;
    private random;
    private dtype?;
    constructor(min?: number, max?: number, dtype?: keyof RandNormalDataTypes, seed?: string | number);
    /** Handles proper rounding for non floating point numbers. */
    private canReturnFloat;
    private convertValue;
    nextValue(): number;
}
