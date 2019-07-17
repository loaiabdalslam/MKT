"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var variable_utils_1 = require("./variable_utils");
/**
 * Print the summary of a LayersModel object.
 *
 * @param model tf.LayersModel instance.
 * @param lineLength Total length of printed lines. Set this to adapt to the
 *   display to different terminal or console sizes.
 * @param positions Relative or absolute positions of log elements in each
 *   line. Each number corresponds to right-most (i.e., ending) position of a
 *   column.
 *   If not provided, defaults to `[0.45, 0.85, 1]` for sequential-like
 *   models and `[0.33, 0.55, 0.67, 1]` for non-sequential like models.
 * @param printFn Print function to use.
 *   It will be called on each line of the summary. You can provide a custom
 *   function in order to capture the string summary. Defaults to `console.log`.
 */
function printSummary(model, lineLength, positions, 
// tslint:disable-next-line:no-any
printFn) {
    if (printFn === void 0) { printFn = console.log; }
    var sequentialLike = isModelSequentialLike(model);
    // Header names for different log elements.
    var toDisplay = ['Layer (type)', 'Output shape', 'Param #'];
    if (sequentialLike) {
        lineLength = lineLength || 65;
        positions = positions || [0.45, 0.85, 1];
    }
    else {
        lineLength = lineLength || 98;
        positions = positions || [0.33, 0.55, 0.67, 1];
        // Header names for different log elements.
    }
    if (positions[positions.length - 1] <= 1) {
        // `positions` is relative. Convert it to absolute positioning.
        positions = positions.map(function (p) { return Math.floor(lineLength * p); });
    }
    var relevantNodes;
    if (!sequentialLike) {
        toDisplay.push('Receives inputs');
        relevantNodes = [];
        for (var depth in model.nodesByDepth) {
            relevantNodes.push.apply(relevantNodes, model.nodesByDepth[depth]);
        }
    }
    printFn('_'.repeat(lineLength));
    printRow(toDisplay, positions, printFn);
    printFn('='.repeat(lineLength));
    var layers = model.layers;
    for (var i = 0; i < layers.length; ++i) {
        if (sequentialLike) {
            printLayerSummary(layers[i], positions, printFn);
        }
        else {
            printLayerSummaryWithConnections(layers[i], positions, relevantNodes, printFn);
        }
        printFn((i === layers.length - 1 ? '=' : '_').repeat(lineLength));
    }
    // tslint:disable-next-line:no-any
    model.checkTrainableWeightsConsistency();
    var trainableCount = countTrainableParams(model);
    var nonTrainableCount = variable_utils_1.countParamsInWeights(model.nonTrainableWeights);
    printFn("Total params: " + (trainableCount + nonTrainableCount));
    printFn("Trainable params: " + trainableCount);
    printFn("Non-trainable params: " + nonTrainableCount);
    printFn('_'.repeat(lineLength));
}
exports.printSummary = printSummary;
function countTrainableParams(model) {
    var trainableCount;
    // tslint:disable:no-any
    if (model.collectedTrainableWeights != null) {
        trainableCount =
            variable_utils_1.countParamsInWeights(model.collectedTrainableWeights);
    }
    else {
        trainableCount = variable_utils_1.countParamsInWeights(model.trainableWeights);
    }
    // tslint:enable:no-any
    return trainableCount;
}
function isModelSequentialLike(model) {
    var sequentialLike = true;
    var nodesByDepth = [];
    var nodes = [];
    for (var depth in model.nodesByDepth) {
        nodesByDepth.push(model.nodesByDepth[depth]);
    }
    for (var _i = 0, nodesByDepth_1 = nodesByDepth; _i < nodesByDepth_1.length; _i++) {
        var depthNodes = nodesByDepth_1[_i];
        if (depthNodes.length > 1 ||
            depthNodes.length === 1 && depthNodes[0].inboundLayers.length > 1) {
            sequentialLike = false;
            break;
        }
        nodes.push.apply(nodes, depthNodes);
    }
    if (sequentialLike) {
        // Search for shared layers.
        for (var _a = 0, _b = model.layers; _a < _b.length; _a++) {
            var layer = _b[_a];
            var flag = false;
            for (var _c = 0, _d = layer.inboundNodes; _c < _d.length; _c++) {
                var node = _d[_c];
                if (nodes.indexOf(node) !== -1) {
                    if (flag) {
                        sequentialLike = false;
                        break;
                    }
                    else {
                        flag = true;
                    }
                }
            }
            if (!sequentialLike) {
                break;
            }
        }
    }
    return sequentialLike;
}
function printRow(fields, positions, 
// tslint:disable-next-line:no-any
printFn) {
    if (printFn === void 0) { printFn = console.log; }
    var line = '';
    for (var i = 0; i < fields.length; ++i) {
        if (i > 0) {
            line = line.slice(0, line.length - 1) + ' ';
        }
        line += fields[i];
        line = line.slice(0, positions[i]);
        line += ' '.repeat(positions[i] - line.length);
    }
    printFn(line);
}
/**
 * Prints a summary for a single Layer, without connectivity information.
 *
 * @param layer: Layer instance to print.
 */
function printLayerSummary(layer, positions, 
// tslint:disable-next-line:no-any
printFn) {
    var outputShape;
    try {
        outputShape = JSON.stringify(layer.outputShape);
    }
    catch (err) {
        outputShape = 'multiple';
    }
    var name = layer.name;
    var className = layer.getClassName();
    var fields = [name + " (" + className + ")", outputShape, layer.countParams().toString()];
    printRow(fields, positions, printFn);
}
/**
 * Prints a summary for a single Layer, with connectivity information.
 */
function printLayerSummaryWithConnections(layer, positions, relevantNodes, 
// tslint:disable-next-line:no-any
printFn) {
    var outputShape;
    try {
        outputShape = JSON.stringify(layer.outputShape);
    }
    catch (err) {
        outputShape = 'multiple';
    }
    var connections = [];
    for (var _i = 0, _a = layer.inboundNodes; _i < _a.length; _i++) {
        var node = _a[_i];
        if (relevantNodes != null && relevantNodes.length > 0 &&
            relevantNodes.indexOf(node) === -1) {
            continue;
        }
        for (var i = 0; i < node.inboundLayers.length; ++i) {
            var inboundLayer = node.inboundLayers[i].name;
            var inboundLayerIndex = node.nodeIndices[i];
            var inboundTensorIndex = node.tensorIndices[i];
            connections.push(inboundLayer + "[" + inboundLayerIndex + "][" + inboundTensorIndex + "]");
        }
    }
    var name = layer.name;
    var className = layer.getClassName();
    var firstConnection = connections.length === 0 ? '' : connections[0];
    var fields = [
        name + " (" + className + ")", outputShape, layer.countParams().toString(),
        firstConnection
    ];
    printRow(fields, positions, printFn);
    for (var i = 1; i < connections.length; ++i) {
        printRow(['', '', '', connections[i]], positions, printFn);
    }
}
//# sourceMappingURL=layer_utils.js.map