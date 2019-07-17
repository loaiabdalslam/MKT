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
        case 'Max': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.max(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Mean': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.mean(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Min': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.min(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Sum': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.sum(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'All': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.all(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'Any': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.any(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        case 'ArgMax': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            return [tfc.argMax(utils_1.getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'ArgMin': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            return [tfc.argMin(utils_1.getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Prod': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            var keepDims = utils_1.getParamValue('keepDims', node, tensorMap, context);
            return [tfc.prod(utils_1.getParamValue('x', node, tensorMap, context), axis, keepDims)];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'reduction';
//# sourceMappingURL=reduction_executor.js.map