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
        case 'Cast': {
            return [tfc.cast(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('dtype', node, tensorMap, context))];
        }
        case 'ExpandDims': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            return [tfc.expandDims(utils_1.getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Squeeze': {
            var axis = utils_1.getParamValue('axis', node, tensorMap, context);
            return [tfc.squeeze(utils_1.getParamValue('x', node, tensorMap, context), axis)];
        }
        case 'Reshape': {
            return [tfc.reshape(utils_1.getParamValue('x', node, tensorMap, context), utils_1.getParamValue('shape', node, tensorMap, context))];
        }
        case 'PadV2':
        case 'Pad': {
            return [tfc.pad(utils_1.getParamValue('x', node, tensorMap, context), utils_1.split(utils_1.getParamValue('padding', node, tensorMap, context), 2), utils_1.getParamValue('constantValue', node, tensorMap, context))];
        }
        case 'SpaceToBatchND': {
            var blockShape = utils_1.getParamValue('blockShape', node, tensorMap, context);
            var paddings = utils_1.split(utils_1.getParamValue('paddings', node, tensorMap, context), 2);
            return [tfc.spaceToBatchND(utils_1.getParamValue('x', node, tensorMap, context), blockShape, paddings)];
        }
        case 'BatchToSpaceND': {
            var blockShape = utils_1.getParamValue('blockShape', node, tensorMap, context);
            var crops = utils_1.split(utils_1.getParamValue('crops', node, tensorMap, context), 2);
            return [tfc.batchToSpaceND(utils_1.getParamValue('x', node, tensorMap, context), blockShape, crops)];
        }
        case 'DepthToSpace': {
            var blockSize = utils_1.getParamValue('blockSize', node, tensorMap, context);
            var dataFormat = utils_1.getParamValue('dataFormat', node, tensorMap, context).toUpperCase();
            return [tfc.depthToSpace(utils_1.getParamValue('x', node, tensorMap, context), blockSize, dataFormat)];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'transformation';
//# sourceMappingURL=transformation_executor.js.map