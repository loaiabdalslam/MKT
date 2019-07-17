"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
/**
 * Given graph inputs and desired outputs, find the minimal set of nodes
 * to execute in order to compute the outputs. In addition return other useful
 * info such:
 * - Missing inputs needed to compute the output.
 * - Whether the subgraph contains dynamic ops (control flow, dynamic shape).
 * - Alternative inputs in order to avoid async (dynamic op) execution.
 */
function getExecutionSubgraph(inputs, outputs, weightMap) {
    var usedNodes = new Set();
    var missingInputs = [];
    var dynamicNode = null;
    var syncInputs = null;
    // Start with the outputs, going backwards and find all the nodes that are
    // needed to compute those outputs.
    var seen = new Set();
    var frontier = outputs.slice();
    while (frontier.length > 0) {
        var node = frontier.pop();
        if (isControlFlow(node) || isDynamicShape(node)) {
            if (dynamicNode == null) {
                dynamicNode = node;
                syncInputs = dynamicNode.children.map(function (child) { return child.name; })
                    .filter(function (name) { return usedNodes.has(name); });
            }
        }
        usedNodes.add(node.name);
        // Weights are dead end since we already have their values.
        if (weightMap[node.name] != null) {
            continue;
        }
        // This node is a dead end since it's one of the user-provided inputs.
        if (inputs[node.name] != null) {
            continue;
        }
        if (node.inputs.length === 0) {
            missingInputs.push(node.name);
            continue;
        }
        node.inputs.forEach(function (input) {
            // Don't add to the frontier if it is already there.
            if (seen.has(input.name)) {
                return;
            }
            seen.add(input.name);
            frontier.push(input);
        });
    }
    return { inputs: inputs, outputs: outputs, usedNodes: usedNodes, missingInputs: missingInputs, dynamicNode: dynamicNode, syncInputs: syncInputs };
}
exports.getExecutionSubgraph = getExecutionSubgraph;
/**
 * Given the execution info, return a list of nodes in topological order that
 * need to be executed to compute the output.
 */
function getNodesInTopologicalOrder(graph, weightMap, executionInfo) {
    var usedNodes = executionInfo.usedNodes, inputs = executionInfo.inputs;
    var frontier = [];
    var inputNodes = Object.keys(inputs).map(function (name) { return graph.nodes[name]; });
    inputNodes.forEach(function (input) {
        if (usedNodes.has(input.name)) {
            frontier.push(input);
        }
    });
    graph.weights.forEach(function (weight) {
        if (usedNodes.has(weight.name)) {
            frontier.push(weight);
        }
    });
    var seen = new Set();
    var orderedNodes = [];
    while (frontier.length > 0) {
        var node = frontier.pop();
        seen.add(node.name);
        if (!weightMap[node.name]) {
            orderedNodes.push(node);
        }
        node.children.forEach(function (child) {
            if (!seen.has(child.name) && usedNodes.has(child.name) &&
                child.inputs.every(function (input) { return seen.has(input.name); })) {
                frontier.push(child);
            }
        });
    }
    return orderedNodes;
}
exports.getNodesInTopologicalOrder = getNodesInTopologicalOrder;
var CONTROL_FLOW_OPS = ['Switch', 'Merge', 'Enter', 'Exit', 'NextIteration'];
var DYNAMIC_SHAPE_OPS = ['NonMaxSuppressionV2', 'NonMaxSuppressionV3', 'Where'];
function isControlFlow(node) {
    return CONTROL_FLOW_OPS.indexOf(node.op) >= 0;
}
exports.isControlFlow = isControlFlow;
function isDynamicShape(node) {
    return DYNAMIC_SHAPE_OPS.indexOf(node.op) >= 0;
}
exports.isDynamicShape = isDynamicShape;
//# sourceMappingURL=model_analysis.js.map