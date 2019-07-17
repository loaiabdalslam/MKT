"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'FusedBatchNorm':
        case 'FusedBatchNormV2': {
            return [tfc.batchNorm(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('mean', node, tensorMap, context), utils_1.getParamValue('variance', node, tensorMap, context), utils_1.getParamValue('offset', node, tensorMap, context), utils_1.getParamValue('scale', node, tensorMap, context), utils_1.getParamValue('epsilon', node, tensorMap, context))];
        }
        case 'FusedBatchNormV3': {
            return [tfc.batchNorm(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('mean', node, tensorMap, context), utils_1.getParamValue('variance', node, tensorMap, context), utils_1.getParamValue('offset', node, tensorMap, context), utils_1.getParamValue('scale', node, tensorMap, context), utils_1.getParamValue('epsilon', node, tensorMap, context))];
        }
        case 'LRN': {
            return [tfc.localResponseNormalization(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('radius', node, tensorMap, context), utils_1.getParamValue('bias', node, tensorMap, context), utils_1.getParamValue('alpha', node, tensorMap, context), utils_1.getParamValue('beta', node, tensorMap, context))];
        }
        case 'Softmax': {
            return [tfc.softmax(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        case 'LogSoftmax': {
            return [tfc.logSoftmax(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        case 'SparseToDense': {
            return [tfc.sparseToDense(utils_1.getParamValue('sparseIndices', node, tensorMap, context), utils_1.getParamValue('outputShape', node, tensorMap, context), utils_1.getParamValue('sparseValues', node, tensorMap, context), utils_1.getParamValue('defaultValue', node, tensorMap, context))];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'normalization';
//# sourceMappingURL=normalization_executor.js.map