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
import { Tensor1D, Tensor2D, Tensor3D, Tensor4D } from '../tensor';
import { TensorLike } from '../types';
/**
 * Bilinear resize a batch of 3D images to a new shape.
 *
 * @param images The images, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param size The new shape `[newHeight, newWidth]` to resize the
 *     images to. Each channel is resized individually.
 * @param alignCorners Defaults to False. If true, rescale
 *     input by `(new_height - 1) / (height - 1)`, which exactly aligns the 4
 *     corners of images and resized images. If false, rescale by
 *     `new_height / height`. Treat similarly the width dimension.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
declare function resizeBilinear_<T extends Tensor3D | Tensor4D>(images: T | TensorLike, size: [number, number], alignCorners?: boolean): T;
/**
 * NearestNeighbor resize a batch of 3D images to a new shape.
 *
 * @param images The images, of rank 4 or rank 3, of shape
 *     `[batch, height, width, inChannels]`. If rank 3, batch of 1 is assumed.
 * @param size The new shape `[newHeight, newWidth]` to resize the
 *     images to. Each channel is resized individually.
 * @param alignCorners Defaults to False. If true, rescale
 *     input by `(new_height - 1) / (height - 1)`, which exactly aligns the 4
 *     corners of images and resized images. If false, rescale by
 *     `new_height / height`. Treat similarly the width dimension.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
declare function resizeNearestNeighbor_<T extends Tensor3D | Tensor4D>(images: T | TensorLike, size: [number, number], alignCorners?: boolean): T;
/**
 * Performs non maximum suppression of bounding boxes based on
 * iou (intersection over union)
 *
 * @param boxes a 2d tensor of shape `[numBoxes, 4]`. Each entry is
 *     `[y1, x1, y2, x2]`, where `(y1, x1)` and `(y2, x2)` are the corners of
 *     the bounding box.
 * @param scores a 1d tensor providing the box scores of shape `[numBoxes]`.
 * @param maxOutputSize The maximum number of boxes to be selected.
 * @param iouThreshold A float representing the threshold for deciding whether
 *     boxes overlap too much with respect to IOU. Must be between [0, 1].
 *     Defaults to 0.5 (50% box overlap).
 * @param scoreThreshold A threshold for deciding when to remove boxes based
 *     on score. Defaults to -inf, which means any score is accepted.
 * @return A 1D tensor with the selected box indices.
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
declare function nonMaxSuppression_(boxes: Tensor2D | TensorLike, scores: Tensor1D | TensorLike, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number): Tensor1D;
/** This is the async version of `nonMaxSuppression` */
declare function nonMaxSuppressionAsync_(boxes: Tensor2D | TensorLike, scores: Tensor1D | TensorLike, maxOutputSize: number, iouThreshold?: number, scoreThreshold?: number): Promise<Tensor1D>;
/**
 * Extracts crops from the input image tensor and resizes them using bilinear
 * sampling or nearest neighbor sampling (possibly with aspect ratio change)
 * to a common output size specified by crop_size.
 *
 * @param image 4d tensor of shape `[batch,imageHeight,imageWidth, depth]`,
 *     where imageHeight and imageWidth must be positive, specifying the
 *     batch of images from which to take crops
 * @param boxes 2d float32 tensor of shape `[numBoxes, 4]`. Each entry is
 *     `[y1, x1, y2, x2]`, where `(y1, x1)` and `(y2, x2)` are the normalized
 *     coordinates of the box in the boxInd[i]'th image in the batch
 * @param boxInd 1d int32 tensor of shape `[numBoxes]` with values in range
 *     `[0, batch)` that specifies the image that the `i`-th box refers to.
 * @param cropSize 1d int32 tensor of 2 elements `[cropHeigh, cropWidth]`
 *     specifying the size to which all crops are resized to.
 * @param method Optional string from `'bilinear' | 'nearest'`,
 *     defaults to bilinear, which specifies the sampling method for resizing
 * @param extrapolationValue A threshold for deciding when to remove boxes based
 *     on score. Defaults to 0.
 * @return A 4D tensor of the shape `[numBoxes,cropHeight,cropWidth,depth]`
 */
/** @doc {heading: 'Operations', subheading: 'Images', namespace: 'image'} */
declare function cropAndResize_(image: Tensor4D | TensorLike, boxes: Tensor2D | TensorLike, boxInd: Tensor1D | TensorLike, cropSize: [number, number], method?: 'bilinear' | 'nearest', extrapolationValue?: number): Tensor4D;
export declare const resizeBilinear: typeof resizeBilinear_;
export declare const resizeNearestNeighbor: typeof resizeNearestNeighbor_;
export declare const nonMaxSuppression: typeof nonMaxSuppression_;
export declare const nonMaxSuppressionAsync: typeof nonMaxSuppressionAsync_;
export declare const cropAndResize: typeof cropAndResize_;
export {};
