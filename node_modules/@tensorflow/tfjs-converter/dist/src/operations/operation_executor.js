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
var node_value_impl_1 = require("./custom_op/node_value_impl");
var register_1 = require("./custom_op/register");
var arithmetic = require("./executors/arithmetic_executor");
var basicMath = require("./executors/basic_math_executor");
var control = require("./executors/control_executor");
var convolution = require("./executors/convolution_executor");
var creation = require("./executors/creation_executor");
var dynamic = require("./executors/dynamic_executor");
var evaluation = require("./executors/evaluation_executor");
var graph = require("./executors/graph_executor");
var image = require("./executors/image_executor");
var logical = require("./executors/logical_executor");
var matrices = require("./executors/matrices_executor");
var normalization = require("./executors/normalization_executor");
var reduction = require("./executors/reduction_executor");
var sliceJoin = require("./executors/slice_join_executor");
var spectral = require("./executors/spectral_executor");
var transformation = require("./executors/transformation_executor");
/**
 * Executes the op defined by the node object.
 * @param node
 * @param tensorMap contains tensors for executed nodes and weights
 */
function executeOp(node, tensorMap, context) {
    var value = (function (node, tensorMap, context) {
        switch (node.category) {
            case 'arithmetic':
                return arithmetic.executeOp(node, tensorMap, context);
            case 'basic_math':
                return basicMath.executeOp(node, tensorMap, context);
            case 'control':
                return control.executeOp(node, tensorMap, context);
            case 'convolution':
                return convolution.executeOp(node, tensorMap, context);
            case 'creation':
                return creation.executeOp(node, tensorMap, context);
            case 'dynamic':
                return dynamic.executeOp(node, tensorMap, context);
            case 'evaluation':
                return evaluation.executeOp(node, tensorMap, context);
            case 'image':
                return image.executeOp(node, tensorMap, context);
            case 'graph':
                return graph.executeOp(node, tensorMap, context);
            case 'logical':
                return logical.executeOp(node, tensorMap, context);
            case 'matrices':
                return matrices.executeOp(node, tensorMap, context);
            case 'normalization':
                return normalization.executeOp(node, tensorMap, context);
            case 'reduction':
                return reduction.executeOp(node, tensorMap, context);
            case 'slice_join':
                return sliceJoin.executeOp(node, tensorMap, context);
            case 'spectral':
                return spectral.executeOp(node, tensorMap, context);
            case 'transformation':
                return transformation.executeOp(node, tensorMap, context);
            case 'custom':
                var opMapper = register_1.getRegisteredOp(node.op);
                if (opMapper && opMapper.customExecutor) {
                    return opMapper.customExecutor(new node_value_impl_1.NodeValueImpl(node, tensorMap, context));
                }
                else {
                    throw TypeError("Custom op " + node.op + " is not registered.");
                }
            default:
                throw TypeError("Unknown op '" + node.op + "'. File an issue at " +
                    "https://github.com/tensorflow/tfjs/issues so we can add it" +
                    ", or register a custom execution with tf.registerOp()");
        }
    })(node, tensorMap, context);
    if (value instanceof Promise) {
        return value.then(function (data) { return [].concat(data); });
    }
    return [].concat(value);
}
exports.executeOp = executeOp;
//# sourceMappingURL=operation_executor.js.map