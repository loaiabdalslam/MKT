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
import { DataId, Tensor } from '../../tensor';
import { BackendValues, DataType } from '../../types';
export declare enum TextureUsage {
    RENDER = 0,
    UPLOAD = 1,
    PIXELS = 2,
    DOWNLOAD = 3
}
export declare enum PhysicalTextureType {
    UNPACKED_FLOAT16 = 0,
    UNPACKED_FLOAT32 = 1,
    PACKED_4X1_UNSIGNED_BYTE = 2,
    PACKED_2X2_FLOAT32 = 3,
    PACKED_2X2_FLOAT16 = 4
}
export interface TextureData {
    shape: number[];
    dtype: DataType;
    values?: BackendValues;
    texture?: WebGLTexture;
    complexTensors?: {
        real: Tensor;
        imag: Tensor;
    };
    /** [rows, columns] shape of the texture. */
    texShape?: [number, number];
    usage?: TextureUsage;
    isPacked?: boolean;
    slice?: {
        flatOffset: number;
        origDataId: DataId;
    };
}
export declare function getUnpackedMatrixTextureShapeWidthHeight(rows: number, columns: number): [number, number];
export declare function getUnpackedArraySizeFromMatrixSize(matrixSize: number, channelsPerTexture: number): number;
export declare function getColorMatrixTextureShapeWidthHeight(rows: number, columns: number): [number, number];
/**
 * Get shape for densely packed RGBA texture.
 */
export declare function getDenseTexShape(shape: number[]): [number, number];
export declare function getMatrixSizeFromUnpackedArraySize(unpackedSize: number, channelsPerTexture: number): number;
export declare function decodeMatrixFromUnpackedColorRGBAArray(unpackedArray: Float32Array, matrix: Float32Array, channels: number): void;
export declare function getPackedMatrixTextureShapeWidthHeight(rows: number, columns: number): [number, number];
export declare function getPackedRGBAArraySizeFromMatrixShape(rows: number, columns: number): number;
