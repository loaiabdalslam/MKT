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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var utils_1 = require("../operations/executors/utils");
var operation_executor_1 = require("../operations/operation_executor");
var execution_context_1 = require("./execution_context");
var model_analysis_1 = require("./model_analysis");
var GraphExecutor = /** @class */ (function () {
    function GraphExecutor(graph) {
        this.graph = graph;
        this.compiledMap = new Map();
        this._weightMap = {};
        this.SEPERATOR = ',';
        this.placeholders = graph.placeholders;
        this._outputs = graph.outputs;
    }
    Object.defineProperty(GraphExecutor.prototype, "weightMap", {
        get: function () {
            return this._weightMap;
        },
        set: function (weightMap) {
            var weightIds = Object.keys(weightMap).map(function (key) { return weightMap[key].map(function (tensor) { return tensor.id; }); });
            this.weightIds = [].concat.apply([], weightIds);
            this._weightMap = weightMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphExecutor.prototype, "inputs", {
        get: function () {
            return this.placeholders.map(function (node) {
                return {
                    name: node.name,
                    shape: node.attrParams['shape'] ?
                        node.attrParams['shape'].value :
                        undefined,
                    dtype: node.attrParams['dtype'] ?
                        node.attrParams['dtype'].value :
                        undefined
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphExecutor.prototype, "outputs", {
        get: function () {
            return this._outputs.map(function (node) {
                return {
                    name: node.name,
                    shape: node.attrParams['shape'] ?
                        node.attrParams['shape'].value :
                        undefined,
                    dtype: node.attrParams['dtype'] ?
                        node.attrParams['dtype'].value :
                        undefined
                };
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphExecutor.prototype, "inputNodes", {
        get: function () {
            return this.placeholders.map(function (node) { return node.name; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphExecutor.prototype, "outputNodes", {
        get: function () {
            return this.outputs.map(function (node) { return node.name; });
        },
        enumerable: true,
        configurable: true
    });
    GraphExecutor.prototype.getCompilationKey = function (inputs, outputs) {
        var sortedInputs = inputs.map(function (node) { return node.name; }).sort();
        var sortedOutputs = outputs.map(function (node) { return node.name; }).sort();
        return sortedInputs.join(this.SEPERATOR) + '--' +
            sortedOutputs.join(this.SEPERATOR);
    };
    /**
     * Compiles the inference graph and returns the minimal set of nodes that are
     * required for execution, in the correct execution order.
     */
    GraphExecutor.prototype.compile = function (inputs, outputs) {
        var executionInfo = model_analysis_1.getExecutionSubgraph(inputs, outputs, this.weightMap);
        var missingInputs = executionInfo.missingInputs, dynamicNode = executionInfo.dynamicNode, syncInputs = executionInfo.syncInputs;
        if (dynamicNode != null) {
            throw new Error("This execution contains the node '" + dynamicNode.name + "', which has " +
                ("the dynamic op '" + dynamicNode.op + "'. Please use ") +
                "model.executeAsync() instead. Alternatively, to avoid the " +
                ("dynamic ops, specify the inputs [" + syncInputs + "]"));
        }
        if (missingInputs.length > 0) {
            var outNames = outputs.map(function (n) { return n.name; });
            var inNames = Object.keys(inputs);
            throw new Error("Cannot compute the outputs [" + outNames + "] from the provided inputs " +
                ("[" + inNames + "]. Missing the following inputs: [" + missingInputs + "]"));
        }
        return model_analysis_1.getNodesInTopologicalOrder(this.graph, this.weightMap, executionInfo);
    };
    /**
     * Executes the inference for given input tensors.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     */
    GraphExecutor.prototype.execute = function (inputs, outputs) {
        var _this = this;
        var names = Object.keys(inputs).sort();
        this.checkInputs(inputs);
        this.checkInputShapeAndType(inputs);
        this.checkOutputs(outputs);
        var inputNodes = names.map(function (name) { return _this.graph.nodes[name]; });
        var outputNodes = outputs.map(function (name) { return _this.graph.nodes[utils_1.parseNodeName(name)[0]]; });
        var compilationKey = this.getCompilationKey(inputNodes, outputNodes);
        // Do nothing if the compiled graph cache contains the input.
        var orderedNodes = this.compiledMap.get(compilationKey);
        if (orderedNodes == null) {
            orderedNodes = this.compile(inputs, outputNodes);
            this.compiledMap.set(compilationKey, orderedNodes);
        }
        var tensorArrayMap = {};
        return tfjs_core_1.tidy(function () {
            var context = new execution_context_1.ExecutionContext(_this._weightMap, tensorArrayMap);
            var tensorsMap = __assign({}, _this.weightMap);
            Object.keys(inputs).forEach(function (name) {
                tensorsMap[name] = [inputs[name]];
            });
            var tensorsToKeep = _this.getFrozenTensorIds(tensorsMap);
            var intermediateTensorConsumerCount = {};
            for (var i = 0; i < orderedNodes.length; i++) {
                var node = orderedNodes[i];
                if (!tensorsMap[node.name]) {
                    var tensors = operation_executor_1.executeOp(node, tensorsMap, context);
                    if (tensors instanceof Promise) {
                        throw new Error("The execution of the op '" + node.op + "' returned a promise. " +
                            "Please use model.executeAsync() instead.");
                    }
                    tensorsMap[node.name] = tensors;
                    _this.checkTensorForDisposal(node.name, node, tensorsMap, context, tensorsToKeep, outputs, intermediateTensorConsumerCount);
                }
            }
            return outputs.map(function (name) { return utils_1.getTensor(name, tensorsMap, context); });
        });
    };
    GraphExecutor.prototype.getFrozenTensorIds = function (tensorMap) {
        var ids = [].concat.apply([], Object.keys(tensorMap)
            .map(function (key) { return tensorMap[key]; })
            .map(function (tensors) { return tensors.map(function (tensor) { return tensor.id; }); }));
        return new Set(ids);
    };
    GraphExecutor.prototype.checkTensorForDisposal = function (nodeName, node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount) {
        // Skip output nodes and any control flow nodes, since its dependency is
        // tricky to track correctly.
        if (node.category === 'control' || outputNames.indexOf(nodeName) !== -1) {
            return;
        }
        tensorMap[nodeName].forEach(function (tensor) {
            if (tensor != null) {
                intermediateTensorConsumerCount[tensor.id] =
                    (intermediateTensorConsumerCount[tensor.id] || 0) +
                        node.children.length;
            }
        });
        node.inputs.forEach(function (input) {
            // Skip any control flow nodes, since its dependency is tricky to track
            // correctly.
            if (input.category !== 'control') {
                var tensors = utils_1.getTensorsForCurrentContenxt(input.name, tensorMap, context);
                if (tensors != null) {
                    tensors.forEach(function (tensor) {
                        if (tensor && !tensorsToKeep.has(tensor.id)) {
                            var count = intermediateTensorConsumerCount[tensor.id];
                            if (count === 1) {
                                tensor.dispose();
                                delete intermediateTensorConsumerCount[tensor.id];
                            }
                            else if (count != null) {
                                // only intermediate nodes has count set, inputs and weights are
                                // not.
                                intermediateTensorConsumerCount[tensor.id]--;
                            }
                        }
                    });
                }
            }
        });
    };
    /**
     * Executes the inference for given input tensors in Async fashion.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     */
    GraphExecutor.prototype.executeAsync = function (inputs, outputs) {
        return __awaiter(this, void 0, void 0, function () {
            var tensorArrayMap, context, tensorMap, results, outputIds, inputIds;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkInputs(inputs);
                        this.checkInputShapeAndType(inputs);
                        this.checkOutputs(outputs);
                        tensorArrayMap = {};
                        context = new execution_context_1.ExecutionContext(this._weightMap, tensorArrayMap);
                        return [4 /*yield*/, this.executeWithControlFlow(inputs, context, outputs)];
                    case 1:
                        tensorMap = _a.sent();
                        results = outputs.map(function (name) { return utils_1.getTensor(name, tensorMap, context); });
                        outputIds = new Set(results.map(function (t) { return t.id; }));
                        inputIds = new Set(Object.keys(inputs).map(function (name) { return inputs[name].id; }));
                        Object.keys(tensorMap).forEach(function (key) {
                            var tensorArray = tensorMap[key];
                            tensorArray.forEach(function (tensor) {
                                if (tensor && !tensor.isDisposed && !outputIds.has(tensor.id) &&
                                    !inputIds.has(tensor.id) &&
                                    _this.weightIds.indexOf(tensor.id) === -1) {
                                    tensor.dispose();
                                }
                            });
                        });
                        return [2 /*return*/, results];
                }
            });
        });
    };
    /**
     * When there are control flow nodes in the graph, the graph execution use
     * ExecutionContext to keep track of the frames and loop iterators.
     * @param inputs placeholder tensors for the graph.
     * @param context the execution context object for current execution.
     */
    GraphExecutor.prototype.executeWithControlFlow = function (inputs, context, outputNames) {
        return __awaiter(this, void 0, void 0, function () {
            var names, inputNodes, outputNodes, _a, usedNodes, missingInputs, dynamicNode, syncInputs, stack, tensorsMap, intermediateTensorConsumerCount, tensorsToKeep, added, promises, missingOutputs, alternativeMsg;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        names = Object.keys(inputs);
                        inputNodes = names.map(function (name) { return _this.graph.nodes[name]; });
                        outputNodes = outputNames.map(function (name) { return _this.graph.nodes[utils_1.parseNodeName(name)[0]]; });
                        _a = model_analysis_1.getExecutionSubgraph(inputs, outputNodes, this.weightMap), usedNodes = _a.usedNodes, missingInputs = _a.missingInputs, dynamicNode = _a.dynamicNode, syncInputs = _a.syncInputs;
                        stack = inputNodes.concat(this.graph.weights).map(function (node) {
                            return { node: node, contexts: context.currentContext };
                        });
                        tensorsMap = __assign({}, this.weightMap);
                        Object.keys(inputs).forEach(function (name) {
                            tensorsMap[name] = [inputs[name]];
                        });
                        intermediateTensorConsumerCount = {};
                        tensorsToKeep = this.getFrozenTensorIds(tensorsMap);
                        added = {};
                        _b.label = 1;
                    case 1:
                        if (!(stack.length > 0)) return [3 /*break*/, 3];
                        promises = this.processStack(inputNodes, stack, context, tensorsMap, added, tensorsToKeep, outputNames, intermediateTensorConsumerCount, usedNodes);
                        return [4 /*yield*/, Promise.all(promises)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 1];
                    case 3:
                        if (dynamicNode == null) {
                            console.warn("This model execution did not contain any nodes with control flow " +
                                "or dynamic output shapes. You can use model.execute() instead.");
                        }
                        missingOutputs = outputNodes
                            .filter(function (node) { return !model_analysis_1.isControlFlow(node) &&
                            !utils_1.getTensor(node.name, tensorsMap, context); })
                            .map(function (node) { return node.name; });
                        if (missingOutputs.length > 0) {
                            alternativeMsg = '';
                            if (dynamicNode != null) {
                                alternativeMsg =
                                    "Alternatively, to avoid the dynamic ops, use model.execute() " +
                                        ("and specify the inputs [" + syncInputs + "]");
                            }
                            throw new Error("Cannot compute the outputs [" + missingOutputs + "] from the provided " +
                                ("inputs [" + names + "]. Consider providing the following inputs: ") +
                                ("[" + missingInputs + "]. " + alternativeMsg));
                        }
                        return [2 /*return*/, tensorsMap];
                }
            });
        });
    };
    GraphExecutor.prototype.processStack = function (inputNodes, stack, context, tensorMap, added, tensorsToKeep, outputNames, intermediateTensorConsumerCount, usedNodes) {
        var _this = this;
        var promises = [];
        var _loop_1 = function () {
            var item = stack.pop();
            context.currentContext = item.contexts;
            var nodeName = '';
            // The tensor of the Enter op with isConstant set should be set
            // in the parent scope, so it will be available as constant for the
            // whole loop.
            if (item.node.op === 'Enter' &&
                utils_1.getParamValue('isConstant', item.node, tensorMap, context)) {
                nodeName = utils_1.getNodeNameAndIndex(item.node.name, context)[0];
            }
            // only process nodes that are not provided as input nodes.
            if (inputNodes.indexOf(item.node) === -1) {
                var tensors = operation_executor_1.executeOp(item.node, tensorMap, context);
                if (!nodeName) {
                    nodeName = utils_1.getNodeNameAndIndex(item.node.name, context)[0];
                }
                var currentContext_1 = context.currentContext;
                if (tensors instanceof Promise) {
                    promises.push(tensors.then(function (t) {
                        tensorMap[nodeName] = t;
                        context.currentContext = currentContext_1;
                        _this.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
                        _this.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
                        return t;
                    }));
                }
                else {
                    tensorMap[nodeName] = tensors;
                    this_1.checkTensorForDisposal(nodeName, item.node, tensorMap, context, tensorsToKeep, outputNames, intermediateTensorConsumerCount);
                    this_1.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
                }
            }
            else {
                this_1.processChildNodes(item.node, stack, context, tensorMap, added, usedNodes);
            }
        };
        var this_1 = this;
        while (stack.length > 0) {
            _loop_1();
        }
        return promises;
    };
    GraphExecutor.prototype.processChildNodes = function (node, stack, context, tensorMap, added, usedNodes) {
        node.children.forEach(function (childNode) {
            var nodeName = utils_1.getNodeNameAndIndex(childNode.name, context)[0];
            if (added[nodeName] || !usedNodes.has(childNode.name)) {
                return;
            }
            // Merge op can be pushed if any of its inputs has value.
            if (childNode.op === 'Merge') {
                if (childNode.inputNames.some(function (name) {
                    return !!utils_1.getTensor(name, tensorMap, context);
                })) {
                    added[nodeName] = true;
                    stack.push({ contexts: context.currentContext, node: childNode });
                }
            }
            else // Otherwise all inputs must to have value.
             if (childNode.inputNames.every(function (name) {
                return !!utils_1.getTensor(name, tensorMap, context);
            })) {
                added[nodeName] = true;
                stack.push({ contexts: context.currentContext, node: childNode });
            }
        });
    };
    /**
     * Releases the memory used by the weight tensors.
     */
    GraphExecutor.prototype.dispose = function () {
        var _this = this;
        Object.keys(this.weightMap)
            .forEach(function (key) { return _this.weightMap[key].forEach(function (tensor) { return tensor.dispose(); }); });
    };
    GraphExecutor.prototype.checkInputShapeAndType = function (inputs) {
        var _this = this;
        Object.keys(inputs).forEach(function (name) {
            var input = inputs[name];
            var node = _this.graph.nodes[name];
            if (node.attrParams['shape'] && node.attrParams['shape'].value) {
                var shape_1 = node.attrParams['shape'].value;
                var match = shape_1.length === input.shape.length &&
                    input.shape.every(function (dim, index) { return shape_1[index] === -1 || shape_1[index] === dim; });
                tfjs_core_1.util.assert(match, function () { return "The shape of dict['" + node.name + "'] provided in " +
                    ("model.execute(dict) must be [" + shape_1 + "], but was ") +
                    ("[" + input.shape + "]"); });
            }
            if (node.attrParams['dtype'] && node.attrParams['dtype'].value) {
                tfjs_core_1.util.assert(input.dtype === node.attrParams['dtype'].value, function () { return "The dtype of dict['" + node.name + "'] provided in " +
                    "model.execute(dict) must be " +
                    (node.attrParams['dtype'].value + ", but was " + input.dtype); });
            }
        });
    };
    GraphExecutor.prototype.checkInputs = function (inputs) {
        var _this = this;
        var notInGraph = Object.keys(inputs).filter(function (name) { return !_this.graph.nodes[name]; });
        if (notInGraph.length > 0) {
            throw new Error("The dict provided in model.execute(dict) has " +
                ("keys: [" + notInGraph + "] that are not part of graph"));
        }
    };
    GraphExecutor.prototype.checkOutputs = function (outputs) {
        var _this = this;
        outputs.forEach(function (name) {
            var normalizedName = utils_1.parseNodeName(name)[0];
            if (!_this.graph.nodes[normalizedName]) {
                throw new Error("The output '" + name + "' is not found in the graph");
            }
        });
    };
    return GraphExecutor;
}());
exports.GraphExecutor = GraphExecutor;
//# sourceMappingURL=graph_executor.js.map