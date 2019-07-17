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
import './engine';
import './flags';
import './backends/webgl/backend_webgl';
import './backends/cpu/backend_cpu';
import './platforms/platform_browser';
import './platforms/platform_node';
import * as backend_util from './backends/backend_util';
import * as environment from './environment';
import * as io from './io/io';
import * as math from './math';
import * as browser from './ops/browser';
import * as serialization from './serialization';
import * as tensor_util from './tensor_util';
import * as test_util from './test_util';
import * as util from './util';
import { version } from './version';
import * as webgl from './webgl';
export { InferenceModel, ModelPredictConfig } from './model_types';
export { AdadeltaOptimizer } from './optimizers/adadelta_optimizer';
export { AdagradOptimizer } from './optimizers/adagrad_optimizer';
export { AdamOptimizer } from './optimizers/adam_optimizer';
export { AdamaxOptimizer } from './optimizers/adamax_optimizer';
export { MomentumOptimizer } from './optimizers/momentum_optimizer';
export { Optimizer } from './optimizers/optimizer';
export { RMSPropOptimizer } from './optimizers/rmsprop_optimizer';
export { SGDOptimizer } from './optimizers/sgd_optimizer';
export { Scalar, Tensor, Tensor1D, Tensor2D, Tensor3D, Tensor4D, TensorBuffer, variable, Variable } from './tensor';
export { GradSaveFunc, NamedTensorMap, TensorContainer, TensorContainerArray, TensorContainerObject } from './tensor_types';
export { DataType, DataTypeMap, DataValues, Rank, ShapeMap, TensorLike } from './types';
export * from './ops/ops';
export { LSTMCellFunc } from './ops/lstm';
export { Reduction } from './ops/loss_ops';
export * from './train';
export * from './globals';
export { customGrad, grad, grads, valueAndGrad, valueAndGrads, variableGrads } from './gradients';
export { TimingInfo } from './engine';
export { ENV, Environment } from './environment';
export { Platform } from './platforms/platform';
export { version as version_core };
export { nextFrame } from './browser_util';
export { browser, environment, io, math, serialization, test_util, util, backend_util, webgl, tensor_util };
export { KernelBackend, BackendTimingInfo, DataMover, DataStorage } from './backends/backend';
