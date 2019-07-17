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
/**
 * Executor: Evaluates SymbolicTensor based on feeds.
 */
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var errors_1 = require("../errors");
var generic_utils_1 = require("../utils/generic_utils");
var input_layer_1 = require("./input_layer");
var topology_1 = require("./topology");
/**
 * Helper function to check the dtype and shape compatibility of a feed value.
 */
function assertFeedCompatibility(key, val) {
    // Check dtype compatibility.
    if (key.dtype == null || key.dtype === val.dtype) {
        //  a.  If types match, return val tensor as is.
        return val;
    }
    try {
        //  b. Attempt to convert to expected type.
        return tfjs_core_1.cast(val, key.dtype);
    }
    catch (err) {
        //  c. If conversion fails, return helpful error.
        throw new errors_1.ValueError("The dtype of the feed (" + val.dtype + ") can not be cast to the dtype " +
            ("of the key '" + key.name + "' (" + key.dtype + ")."));
    }
}
/**
 * FeedDict: A mapping from unique SymbolicTensors to feed values for them.
 * A feed value is a concrete value represented as an `Tensor`.
 */
var FeedDict = /** @class */ (function () {
    /**
     * Constructor, optionally does copy-construction.
     * @param feeds An Array of `Feed`s, or another `FeedDict`, in which case
     *   copy-construction will be performed.
     */
    function FeedDict(feeds) {
        this.id2Value = {};
        this.id2Mask = {};
        this.name2Id = {};
        if (feeds instanceof FeedDict) {
            for (var id in feeds.id2Value) {
                this.id2Value[id] = feeds.id2Value[id];
                if (id in feeds.id2Mask) {
                    this.id2Mask[id] = feeds.id2Mask[id];
                }
            }
        }
        else {
            if (feeds == null) {
                return;
            }
            for (var _i = 0, feeds_1 = feeds; _i < feeds_1.length; _i++) {
                var feed = feeds_1[_i];
                this.add(feed.key, feed.value);
            }
        }
    }
    /**
     * Add a key-value pair to the FeedDict.
     *
     * @param key The key of the feed.
     * @param value The value of the tensor feed.
     * @param mask The value of the mask feed (optional).
     * @returns This `FeedDict`.
     * @throws ValueError: If the key `SymbolicTensor` already exists in the
     *   `FeedDict`.
     */
    FeedDict.prototype.add = function (key, value, mask) {
        if (this.id2Value[key.id] == null) {
            this.id2Value[key.id] = assertFeedCompatibility(key, value);
            this.name2Id[key.name] = key.id;
            if (mask != null) {
                this.id2Mask[key.id] = mask;
            }
        }
        else {
            throw new errors_1.ValueError("Duplicate key: name=" + key.name + ", id=" + key.id);
        }
        return this;
    };
    /**
     * Add a Feed to the FeedDict.
     * @param feed The new `Feed` to add.
     * @returns This `FeedDict`.
     */
    FeedDict.prototype.addFeed = function (feed) {
        this.add(feed.key, feed.value);
    };
    /**
     * Probe whether a key already exists in the FeedDict.
     * @param key
     */
    FeedDict.prototype.hasKey = function (key) {
        return this.id2Value[key.id] != null;
    };
    /**
     * Get all the SymbolicTensor available in this FeedDict.
     */
    FeedDict.prototype.names = function () {
        return Object.keys(this.name2Id);
    };
    /**
     * Get the feed value for given key.
     * @param key The SymbolicTensor, or its name (as a string), of which the
     *     value is sought.
     * @returns If `key` exists, the corresponding feed value.
     * @throws ValueError: If `key` does not exist in this `FeedDict`.
     */
    FeedDict.prototype.getValue = function (key) {
        if (key instanceof topology_1.SymbolicTensor) {
            if (this.id2Value[key.id] == null) {
                throw new errors_1.ValueError("Nonexistent key: " + key.name);
            }
            else {
                return this.id2Value[key.id];
            }
        }
        else {
            var id = this.name2Id[key];
            if (id == null) {
                throw new errors_1.ValueError("Feed dict has no SymbolicTensor name: " + key);
            }
            return this.id2Value[id];
        }
    };
    /**
     * Get the feed mask for given key.
     * @param key The SymbolicTensor, or its name (as a string), of which the
     *     value is sought.
     * @returns If `key` exists, the corresponding feed mask.
     * @throws ValueError: If `key` does not exist in this `FeedDict`.
     */
    FeedDict.prototype.getMask = function (key) {
        if (key instanceof topology_1.SymbolicTensor) {
            if (this.id2Value[key.id] == null) {
                throw new errors_1.ValueError("Nonexistent key: " + key.name);
            }
            else {
                return this.id2Mask[key.id];
            }
        }
        else {
            var id = this.name2Id[key];
            if (id == null) {
                throw new errors_1.ValueError("Feed dict has no SymbolicTensor name: " + key);
            }
            return this.id2Mask[id];
        }
    };
    /** Dispose all mask Tensors held by this object. */
    FeedDict.prototype.disposeMasks = function () {
        if (this.id2Mask != null) {
            tfjs_core_1.dispose(this.id2Mask);
        }
    };
    return FeedDict;
}());
exports.FeedDict = FeedDict;
// Cache for topologically sorted SymbolicTensors for given execution
// targets (i.e., fetches).
var cachedSorted = {};
// Cache for recipient count maps for given execution targets (i.e., fetches).
var cachedRecipientCounts = {};
/**
 * Execute a SymbolicTensor by using concrete feed values.
 *
 * A `SymbolicTensor` object is a node in a computation graph of TF.js
 * Layers. The object is backed by a source layer and input
 * `SymbolicTensor`s to the source layer. This method evaluates
 * the `call()` method of the source layer, using concrete values of the
 * inputs obtained from either
 * * `feedDict`, if the input key exists in `feedDict`, or else,
 * * a recursive call to `execute()` itself.
 *
 * @param x: The `SymbolicTensor` to execute.
 * @param feedDict: The feed values, as base condition of the recursion.
 *   execution.
 * @param kwargs: Optional keyword arguments.
 * @param probe: A probe object (of interface `ExecutionProbe`) used for
 *   testing memory footprint of `execute` calls.
 * @returns Result of the execution.
 * @throws ValueError: If any `SymbolicTensor`s from `InputLayer`s
 *   encountered during the execution lacks a feed value in `feedDict`.
 */
function execute(fetches, feedDict, kwargs, probe) {
    var training = kwargs == null ? false : kwargs['training'];
    var arrayFetches = Array.isArray(fetches);
    var fetchArray = arrayFetches ? fetches : [fetches];
    var outputNames = fetchArray.map(function (t) { return t.name; });
    var finalOutputs = [];
    var feedNames = feedDict.names();
    for (var _i = 0, outputNames_1 = outputNames; _i < outputNames_1.length; _i++) {
        var outputName = outputNames_1[_i];
        if (feedNames.indexOf(outputName) !== -1) {
            finalOutputs.push(feedDict.getValue(outputName));
        }
        else {
            finalOutputs.push(null);
        }
    }
    if (probe != null) {
        // For optional probing of memory footprint during execution.
        probe.maxNumTensors = -Infinity;
        probe.minNumTensors = Infinity;
    }
    // Check cache.
    var fetchAndFeedKey = outputNames.join(',') + '|' + feedDict.names().join(',');
    var sorted;
    var recipientCounts;
    if (cachedSorted[fetchAndFeedKey] == null) {
        // Cache doesn't contain the desired combination of fetches. Compute
        // topological sort for the combination for the first time.
        var out = getTopologicalSortAndRecipientCounts(fetchArray, feedDict);
        sorted = out.sorted;
        recipientCounts = out.recipientCounts;
        // Store results in cache for future use.
        cachedSorted[fetchAndFeedKey] = sorted;
        cachedRecipientCounts[fetchAndFeedKey] = recipientCounts;
    }
    sorted = cachedSorted[fetchAndFeedKey];
    recipientCounts = {};
    if (!training) {
        Object.assign(recipientCounts, cachedRecipientCounts[fetchAndFeedKey]);
    }
    var internalFeedDict = new FeedDict(feedDict);
    // Start iterative execution on the topologically-sorted SymbolicTensors.
    for (var i = 0; i < sorted.length; ++i) {
        if (probe != null) {
            // For optional probing of memory usage during execution.
            var numTensors = tfjs_core_1.memory().numTensors;
            if (numTensors > probe.maxNumTensors) {
                probe.maxNumTensors = numTensors;
            }
            if (numTensors < probe.minNumTensors) {
                probe.minNumTensors = numTensors;
            }
        }
        var symbolic = sorted[i];
        var srcLayer = symbolic.sourceLayer;
        if (srcLayer instanceof input_layer_1.InputLayer) {
            continue;
        }
        var inputValues = [];
        var inputMasks = [];
        var tensorsToDispose = [];
        var maskExists = false;
        for (var _a = 0, _b = symbolic.inputs; _a < _b.length; _a++) {
            var input = _b[_a];
            var value = internalFeedDict.getValue(input);
            var mask = internalFeedDict.getMask(input);
            inputValues.push(value);
            inputMasks.push(mask);
            if (mask != null) {
                maskExists = true;
            }
            if (!training) {
                recipientCounts[input.name]--;
                if (recipientCounts[input.name] === 0 && !feedDict.hasKey(input) &&
                    outputNames.indexOf(input.name) === -1 && !value.isDisposed &&
                    input.sourceLayer.stateful !== true) {
                    tensorsToDispose.push(value);
                }
            }
        }
        if (maskExists) {
            kwargs = kwargs || {};
            kwargs['mask'] = inputMasks[0];
        }
        var outputTensors = generic_utils_1.toList(srcLayer.apply(inputValues, kwargs));
        var outputMask = null;
        if (srcLayer.supportsMasking) {
            outputMask = srcLayer.computeMask(inputValues, inputMasks);
        }
        var layerOutputs = getNodeOutputs(symbolic);
        var outputSymbolicTensors = Array.isArray(layerOutputs) ? layerOutputs : [layerOutputs];
        for (var i_1 = 0; i_1 < outputSymbolicTensors.length; ++i_1) {
            if (!internalFeedDict.hasKey(outputSymbolicTensors[i_1])) {
                internalFeedDict.add(outputSymbolicTensors[i_1], outputTensors[i_1], Array.isArray(outputMask) ? outputMask[0] : outputMask);
            }
            var index = outputNames.indexOf(outputSymbolicTensors[i_1].name);
            if (index !== -1) {
                finalOutputs[index] = outputTensors[i_1];
            }
        }
        if (!training) {
            // Clean up Tensors that are no longer needed.
            tfjs_core_1.dispose(tensorsToDispose);
        }
    }
    // NOTE(cais): Unlike intermediate tensors, we don't discard mask
    // tensors as we go, because these tensors are sometimes passed over a
    // series of mutliple layers, i.e., not obeying the immediate input
    // relations in the graph. If this becomes a memory-usage concern,
    // we can improve this in the future.
    internalFeedDict.disposeMasks();
    return arrayFetches ? finalOutputs : finalOutputs[0];
}
exports.execute = execute;
/**
 * Sort the `SymbolicTensor`s topologically, for an array of fetches.
 *
 * This function calls getTopologicalSortAndRecipientCountsForOneFetch and
 * merges their results.
 *
 * @param fetch The array of fetches requested. Must be a non-empty array.
 * @param feedDict The dictionary of fed values.
 * @returns sorted: Topologically-sorted array of SymbolicTensors.
 *   recipientCounts: Recipient counts for all SymbolicTensors in `sorted`.
 */
function getTopologicalSortAndRecipientCounts(fetches, feedDict) {
    tfjs_core_1.util.assert(fetches != null && fetches.length > 0, function () { return "Expected at least one fetch, got none"; });
    var finalSorted = [];
    var finalRecipientMap = {};
    if (fetches.length === 1) {
        // Special-casing 1 fetch for efficiency.
        var out = getTopologicalSortAndRecipientCountsForOneFetch(fetches[0], feedDict);
        finalSorted = out.sorted;
        finalRecipientMap = out.recipientMap;
    }
    else {
        var visited = new Set();
        for (var _i = 0, fetches_1 = fetches; _i < fetches_1.length; _i++) {
            var fetch_1 = fetches_1[_i];
            var _a = getTopologicalSortAndRecipientCountsForOneFetch(fetch_1, feedDict), sorted = _a.sorted, recipientMap = _a.recipientMap;
            // Merge sorted SymbolicTensor Arrays.
            for (var _b = 0, sorted_1 = sorted; _b < sorted_1.length; _b++) {
                var symbolicTensor = sorted_1[_b];
                if (!visited.has(symbolicTensor.name)) {
                    finalSorted.push(symbolicTensor);
                    visited.add(symbolicTensor.name);
                }
            }
            var _loop_1 = function (name_1) {
                if (finalRecipientMap[name_1] == null) {
                    finalRecipientMap[name_1] = new Set();
                }
                recipientMap[name_1].forEach(function (recipient) { return finalRecipientMap[name_1].add(recipient); });
            };
            // Merge recipient maps.
            for (var name_1 in recipientMap) {
                _loop_1(name_1);
            }
        }
    }
    return {
        sorted: finalSorted,
        recipientCounts: recipientMap2Counts(finalRecipientMap)
    };
}
function recipientMap2Counts(recipientMap) {
    var recipientCounts = {};
    for (var name_2 in recipientMap) {
        recipientCounts[name_2] = recipientMap[name_2].size;
    }
    return recipientCounts;
}
/**
 * Sort the `SymbolicTensor`s topologically, for a single fetch.
 *
 * This helper function processes the upstream SymbolicTensors of a single
 * fetch.
 *
 * @param fetch The single fetch requested.
 * @param feedDict The dictionary of fed values.
 * @returns sorted: Topologically-sorted array of SymbolicTensors.
 *   recipientMap: Recipient names for all SymbolicTensors in `sorted`.
 */
function getTopologicalSortAndRecipientCountsForOneFetch(fetch, feedDict) {
    var visited = new Set();
    var sorted = [];
    var recipientMap = {};
    // Put keys of the feedDict into visited first, so they don't have to be
    // walked. This is needed in case where there are feeds for intermediate
    // SymbolicTensors of the graph.
    for (var _i = 0, _a = feedDict.names(); _i < _a.length; _i++) {
        var key = _a[_i];
        visited.add(key);
    }
    var stack = [];
    var marks = [];
    // Initial population of stack and marks.
    stack.push(fetch);
    while (stack.length > 0) {
        var top_1 = stack[stack.length - 1];
        if (visited.has(top_1.name)) {
            stack.pop();
            continue;
        }
        var topIsMarked = marks[marks.length - 1] === stack.length - 1;
        if (top_1.inputs.length === 0 || topIsMarked) {
            // Input SymbolicTensor or all children have been visited.
            stack.pop();
            sorted.push(top_1);
            visited.add(top_1.name);
            if (topIsMarked) {
                marks.pop();
            }
        }
        else {
            // A non-input SymbolicTensor whose upstream SymbolicTensors haven't
            // been visited yet. Push them onto the stack.
            marks.push(stack.length - 1);
            for (var _b = 0, _c = top_1.inputs; _b < _c.length; _b++) {
                var input = _c[_b];
                // Increment the recipient count. Note that this needs to happen
                // regardless of whether the SymbolicTensor has been visited before.
                if (recipientMap[input.name] == null) {
                    recipientMap[input.name] = new Set();
                }
                recipientMap[input.name].add(top_1.name);
                if (visited.has(input.name)) {
                    continue; // Avoid repeated visits to the same SymbolicTensor.
                }
                stack.push(input);
            }
        }
    }
    return { sorted: sorted, recipientMap: recipientMap };
}
exports.getTopologicalSortAndRecipientCountsForOneFetch = getTopologicalSortAndRecipientCountsForOneFetch;
/**
 * Get the symbolic output tensors of the node to which a given fetch belongs.
 * @param fetch The fetched symbolic tensor.
 * @returns The Array of symbolic tensors output by the node to which `fetch`
 *   belongs.
 */
function getNodeOutputs(fetch) {
    var layerOutputs;
    if (fetch.sourceLayer.inboundNodes.length === 1) {
        layerOutputs = fetch.sourceLayer.output;
    }
    else {
        var nodeIndex = null;
        for (var i = 0; i < fetch.sourceLayer.inboundNodes.length; ++i) {
            for (var _i = 0, _a = fetch.sourceLayer.inboundNodes[i]
                .outputTensors; _i < _a.length; _i++) {
                var outputTensor = _a[_i];
                if (outputTensor.id === fetch.id) {
                    nodeIndex = i;
                    break;
                }
            }
        }
        layerOutputs = fetch.sourceLayer.getOutputAt(nodeIndex);
    }
    return layerOutputs;
}
//# sourceMappingURL=executor.js.map