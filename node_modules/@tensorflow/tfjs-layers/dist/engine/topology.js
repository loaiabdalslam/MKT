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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/* Original source: keras/engine/topology.py */
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("../backend/state");
var common_1 = require("../common");
var errors_1 = require("../errors");
var initializers_1 = require("../initializers");
var generic_utils = require("../utils/generic_utils");
var types_utils = require("../utils/types_utils");
var variable_utils = require("../utils/variable_utils");
var variables_1 = require("../variables");
/**
 * Specifies the ndim, dtype and shape of every input to a layer.
 *
 * Every layer should expose (if appropriate) an `inputSpec` attribute:
 * a list of instances of InputSpec (one per input tensor).
 *
 * A null entry in a shape is compatible with any dimension,
 * a null shape is compatible with any shape.
 */
var InputSpec = /** @class */ (function () {
    function InputSpec(args) {
        this.dtype = args.dtype;
        this.shape = args.shape;
        /*
          TODO(michaelterry): Could throw error if ndim and shape are both defined
            (then backport).
        */
        if (args.shape != null) {
            this.ndim = args.shape.length;
        }
        else {
            this.ndim = args.ndim;
        }
        this.maxNDim = args.maxNDim;
        this.minNDim = args.minNDim;
        this.axes = args.axes || {};
    }
    return InputSpec;
}());
exports.InputSpec = InputSpec;
/**
 * `tf.SymbolicTensor` is a placeholder for a Tensor without any concrete value.
 *
 * They are most often encountered when building a graph of `Layer`s for a
 * a `tf.LayersModel` and the input data's shape, but not values are known.
 */
/** @doc {heading: 'Models', 'subheading': 'Classes'} */
var SymbolicTensor = /** @class */ (function () {
    /**
     *
     * @param dtype
     * @param shape
     * @param sourceLayer The Layer that produced this symbolic tensor.
     * @param inputs The inputs passed to sourceLayer's __call__() method.
     * @param nodeIndex
     * @param tensorIndex
     * @param callArgs The keyword arguments passed to the __call__() method.
     * @param name
     * @param outputTensorIndex The index of this tensor in the list of outputs
     *   returned by apply().
     */
    function SymbolicTensor(dtype, shape, sourceLayer, inputs, callArgs, name, outputTensorIndex) {
        this.dtype = dtype;
        this.shape = shape;
        this.sourceLayer = sourceLayer;
        this.inputs = inputs;
        this.callArgs = callArgs;
        this.outputTensorIndex = outputTensorIndex;
        this.id = state_1.getNextUniqueTensorId();
        if (name != null) {
            this.originalName = common_1.getScopedTensorName(name);
            this.name = common_1.getUniqueTensorName(this.originalName);
        }
        this.rank = shape.length;
    }
    return SymbolicTensor;
}());
exports.SymbolicTensor = SymbolicTensor;
var _nextNodeID = 0;
/**
 * A `Node` describes the connectivity between two layers.
 *
 * Each time a layer is connected to some new input,
 * a node is added to `layer.inboundNodes`.
 *
 * Each time the output of a layer is used by another layer,
 * a node is added to `layer.outboundNodes`.
 *
 * `nodeIndices` and `tensorIndices` are basically fine-grained coordinates
 * describing the origin of the `inputTensors`, verifying the following:
 *
 * `inputTensors[i] ==
 * inboundLayers[i].inboundNodes[nodeIndices[i]].outputTensors[
 *   tensorIndices[i]]`
 *
 * A node from layer A to layer B is added to:
 *     A.outboundNodes
 *     B.inboundNodes
 */
var Node = /** @class */ (function () {
    function Node(args, 
    // TODO(michaelterry): Define actual type for this.
    callArgs) {
        this.callArgs = callArgs;
        this.id = _nextNodeID++;
        /*
          Layer instance (NOT a list).
          this is the layer that takes a list of input tensors
          and turns them into a list of output tensors.
          the current node will be added to
          the inboundNodes of outboundLayer.
        */
        this.outboundLayer = args.outboundLayer;
        /*
            The following 3 properties describe where
            the input tensors come from: which layers,
            and for each layer, which node and which
            tensor output of each node.
        */
        // List of layer instances.
        this.inboundLayers = args.inboundLayers;
        // List of integers, 1:1 mapping with inboundLayers.
        this.nodeIndices = args.nodeIndices;
        // List of integers, 1:1 mapping with inboundLayers.
        this.tensorIndices = args.tensorIndices;
        /*
            Following 2 properties:
            tensor inputs and outputs of outboundLayer.
        */
        // List of tensors. 1:1 mapping with inboundLayers.
        this.inputTensors = args.inputTensors;
        // List of tensors, created by outboundLayer.call().
        this.outputTensors = args.outputTensors;
        /*
            Following 2 properties: input and output masks.
            List of tensors, 1:1 mapping with inputTensor.
        */
        this.inputMasks = args.inputMasks;
        // List of tensors, created by outboundLayer.computeMask().
        this.outputMasks = args.outputMasks;
        // Following 2 properties: input and output shapes.
        // List of shape tuples, shapes of inputTensors.
        this.inputShapes = args.inputShapes;
        // List of shape tuples, shapes of outputTensors.
        this.outputShapes = args.outputShapes;
        // Add nodes to all layers involved.
        for (var _i = 0, _a = args.inboundLayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer != null) {
                layer.outboundNodes.push(this);
            }
        }
        args.outboundLayer.inboundNodes.push(this);
    }
    Node.prototype.getConfig = function () {
        var inboundNames = [];
        for (var _i = 0, _a = this.inboundLayers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer != null) {
                inboundNames.push(layer.name);
            }
            else {
                inboundNames.push(null);
            }
        }
        return {
            outboundLayer: this.outboundLayer ? this.outboundLayer.name : null,
            inboundLayers: inboundNames,
            nodeIndices: this.nodeIndices,
            tensorIndices: this.tensorIndices
        };
    };
    return Node;
}());
exports.Node = Node;
var _nextLayerID = 0;
/**
 * A layer is a grouping of operations and weights that can be composed to
 * create a `tf.LayersModel`.
 *
 * Layers are constructed by using the functions under the
 * [tf.layers](#Layers-Basic) namespace.
 */
/** @doc {heading: 'Layers', subheading: 'Classes', namespace: 'layers'} */
var Layer = /** @class */ (function (_super) {
    __extends(Layer, _super);
    function Layer(args) {
        var _this = _super.call(this) || this;
        _this._callHook = null;
        _this._addedWeightNames = [];
        // Porting Notes: PyKeras does not have this property in this base Layer
        //   class. Instead lets Layer subclass set it dynamically and checks the
        //   value with `hasattr`. In tfjs-layers, we let this be a member of this
        //   base class.
        _this._stateful = false;
        _this.id = _nextLayerID++;
        _this.activityRegularizer = null;
        _this.inputSpec = null;
        _this.supportsMasking = false;
        // These properties will be set upon call of this.build()
        _this._trainableWeights = [];
        _this._nonTrainableWeights = [];
        _this._losses = [];
        _this._updates = [];
        _this._built = false;
        /*
          These lists will be filled via successive calls
          to this.addInboundNode().
         */
        _this.inboundNodes = [];
        _this.outboundNodes = [];
        var name = args.name;
        if (!name) {
            var prefix = _this.getClassName();
            name = generic_utils.toSnakeCase(prefix) + '_' + state_1.getUid(prefix);
        }
        _this.name = name;
        _this.trainable_ = args.trainable == null ? true : args.trainable;
        if (args.inputShape != null || args.batchInputShape != null) {
            /*
              In this case we will later create an input layer
              to insert before the current layer
             */
            var batchInputShape = void 0;
            if (args.batchInputShape != null) {
                batchInputShape = args.batchInputShape;
            }
            else if (args.inputShape != null) {
                var batchSize = null;
                if (args.batchSize != null) {
                    batchSize = args.batchSize;
                }
                batchInputShape = [batchSize].concat(args.inputShape);
            }
            _this.batchInputShape = batchInputShape;
            // Set dtype.
            var dtype = args.dtype;
            if (dtype == null) {
                dtype = args.inputDType;
            }
            if (dtype == null) {
                dtype = 'float32';
            }
            _this.dtype = dtype;
        }
        if (args.weights != null) {
            _this.initialWeights = args.weights;
        }
        else {
            _this.initialWeights = null;
        }
        // The value of `_refCount` is initialized to null. When the layer is used
        // in a symbolic way for the first time, it will be set to 1.
        _this._refCount = null;
        _this.fastWeightInitDuringBuild = false;
        return _this;
    }
    /**
     * Converts a layer and its index to a unique (immutable type) name.
     * This function is used internally with `this.containerNodes`.
     * @param layer The layer.
     * @param nodeIndex The layer's position (e.g. via enumerate) in a list of
     *   nodes.
     *
     * @returns The unique name.
     */
    Layer.nodeKey = function (layer, nodeIndex) {
        return layer.name + '_ib-' + nodeIndex.toString();
    };
    /**
     * Returns this.inboundNode at index nodeIndex.
     *
     * Porting note: This is a replacement for _get_node_attribute_at_index()
     * @param nodeIndex
     * @param attrName The name of the attribute related to request for this node.
     */
    Layer.prototype.getNodeAtIndex = function (nodeIndex, attrName) {
        if (this.inboundNodes.length === 0) {
            throw new errors_1.RuntimeError('The layer has never been called ' +
                ("and thus has no defined " + attrName + "."));
        }
        if (this.inboundNodes.length <= nodeIndex) {
            throw new errors_1.ValueError("Asked to get " + attrName + " at node " + nodeIndex + ", " +
                ("but the layer has only " + this.inboundNodes.length + " inbound nodes."));
        }
        return this.inboundNodes[nodeIndex];
    };
    /**
     * Retrieves the input tensor(s) of a layer at a given node.
     *
     * @param nodeIndex Integer, index of the node from which to retrieve the
     *   attribute. E.g. `nodeIndex=0` will correspond to the first time the layer
     *   was called.
     *
     * @return A tensor (or list of tensors if the layer has multiple inputs).
     */
    Layer.prototype.getInputAt = function (nodeIndex) {
        return generic_utils.singletonOrArray(this.getNodeAtIndex(nodeIndex, 'input').inputTensors);
    };
    /**
     * Retrieves the output tensor(s) of a layer at a given node.
     *
     * @param nodeIndex Integer, index of the node from which to retrieve the
     *   attribute. E.g. `nodeIndex=0` will correspond to the first time the layer
     *   was called.
     *
     * @return A tensor (or list of tensors if the layer has multiple outputs).
     */
    Layer.prototype.getOutputAt = function (nodeIndex) {
        return generic_utils.singletonOrArray(this.getNodeAtIndex(nodeIndex, 'output').outputTensors);
    };
    Object.defineProperty(Layer.prototype, "input", {
        // Properties
        /**
         * Retrieves the input tensor(s) of a layer.
         *
         * Only applicable if the layer has exactly one inbound node,
         * i.e. if it is connected to one incoming layer.
         *
         * @return Input tensor or list of input tensors.
         *
         * @exception AttributeError if the layer is connected to more than one
         *   incoming layers.
         */
        get: function () {
            if (this.inboundNodes.length > 1) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has multiple inbound nodes, ' +
                    'hence the notion of "layer input" ' +
                    'is ill-defined. ' +
                    'Use `getInputAt(nodeIndex)` instead.');
            }
            else if (this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' is not connected, no input to return.');
            }
            return generic_utils.singletonOrArray(this.getNodeAtIndex(0, 'input').inputTensors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "output", {
        /**
         * Retrieves the output tensor(s) of a layer.
         *
         * Only applicable if the layer has exactly one inbound node,
         * i.e. if it is connected to one incoming layer.
         *
         * @return Output tensor or list of output tensors.
         *
         * @exception AttributeError if the layer is connected to more than one
         *   incoming layers.
         */
        get: function () {
            if (this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has no inbound nodes.');
            }
            if (this.inboundNodes.length > 1) {
                throw new errors_1.AttributeError("Layer " + this.name +
                    ' has multiple inbound nodes, ' +
                    'hence the notion of "layer output" ' +
                    'is ill-defined. ' +
                    'Use `getOutputAt(nodeIndex)` instead.');
            }
            return generic_utils.singletonOrArray(this.getNodeAtIndex(0, 'output').outputTensors);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "losses", {
        get: function () {
            return this._losses;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Retrieves the Layer's current loss values.
     *
     * Used for regularizers during training.
     */
    Layer.prototype.calculateLosses = function () {
        // Porting Node: This is an augmentation to Layer.loss in PyKeras.
        //   In PyKeras, Layer.loss returns symbolic tensors. Here a concrete
        //   Tensor (specifically Scalar) values are returned. This is due to the
        //   imperative backend.
        return this.losses.map(function (lossFn) { return lossFn(); });
    };
    Object.defineProperty(Layer.prototype, "updates", {
        get: function () {
            return this._updates;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "built", {
        get: function () {
            return this._built;
        },
        set: function (built) {
            this._built = built;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "trainable", {
        get: function () {
            return this.trainable_;
        },
        set: function (trainable) {
            this._trainableWeights.forEach(function (w) { return w.trainable = trainable; });
            this.trainable_ = trainable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "trainableWeights", {
        get: function () {
            if (this.trainable_) {
                return this._trainableWeights.filter(function (w) { return w.trainable; });
            }
            else {
                return [];
            }
        },
        set: function (weights) {
            this._trainableWeights = weights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "nonTrainableWeights", {
        get: function () {
            if (this.trainable) {
                return this._trainableWeights.filter(function (w) { return !w.trainable; })
                    .concat(this._nonTrainableWeights);
            }
            else {
                return this._trainableWeights.concat(this._nonTrainableWeights);
            }
        },
        set: function (weights) {
            this._nonTrainableWeights = weights;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "weights", {
        /**
         * The concatenation of the lists trainableWeights and nonTrainableWeights
         * (in this order).
         */
        get: function () {
            return this.trainableWeights.concat(this.nonTrainableWeights);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Layer.prototype, "stateful", {
        get: function () {
            return this._stateful;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Reset the states of the layer.
     *
     * This method of the base Layer class is essentially a no-op.
     * Subclasses that are stateful (e.g., stateful RNNs) should override this
     * method.
     */
    Layer.prototype.resetStates = function () {
        if (!this.stateful) {
            throw new Error('Cannot call the resetStates() method of a non-stateful Layer ' +
                'object.');
        }
    };
    /**
     * Checks compatibility between the layer and provided inputs.
     *
     * This checks that the tensor(s) `input`
     * verify the input assumptions of the layer
     * (if any). If not, exceptions are raised.
     *
     * @param inputs Input tensor or list of input tensors.
     *
     * @exception ValueError in case of mismatch between
     *   the provided inputs and the expectations of the layer.
     */
    Layer.prototype.assertInputCompatibility = function (inputs) {
        inputs = generic_utils.toList(inputs);
        if (this.inputSpec == null || this.inputSpec.length === 0) {
            return;
        }
        var inputSpec = generic_utils.toList(this.inputSpec);
        if (inputs.length !== inputSpec.length) {
            throw new errors_1.ValueError("Layer " + this.name + " expects " + inputSpec.length + " inputs, " +
                ("but it received " + inputs.length + " input tensors. ") +
                ("Input received: " + inputs));
        }
        for (var inputIndex = 0; inputIndex < inputs.length; inputIndex++) {
            var x = inputs[inputIndex];
            var spec = inputSpec[inputIndex];
            if (spec == null) {
                continue;
            }
            // Check ndim.
            var ndim = x.rank;
            if (spec.ndim != null) {
                if (ndim !== spec.ndim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + ": " +
                        ("expected ndim=" + spec.ndim + ", found ndim=" + ndim));
                }
            }
            if (spec.maxNDim != null) {
                if (ndim > spec.maxNDim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                        (": expected max_ndim=" + spec.maxNDim + ", found ndim=" + ndim));
                }
            }
            if (spec.minNDim != null) {
                if (ndim < spec.minNDim) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name +
                        (": expected min_ndim=" + spec.minNDim + ", found ndim=" + ndim + "."));
                }
            }
            // Check dtype.
            if (spec.dtype != null) {
                if (x.dtype !== spec.dtype) {
                    throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " + this.name + " " +
                        (": expected dtype=" + spec.dtype + ", found dtype=" + x.dtype + "."));
                }
            }
            // Check specific shape axes.
            if (spec.axes) {
                var xShape = x.shape;
                for (var key in spec.axes) {
                    var axis = Number(key);
                    var value = spec.axes[key];
                    // Perform Python-style slicing in case axis < 0;
                    // TODO(cais): Use https://github.com/alvivi/typescript-underscore to
                    // ensure type safety through Underscore calls.
                    var xShapeAtAxis = axis >= 0 ? xShape[axis] : xShape[xShape.length + axis];
                    if (value != null && [value, null].indexOf(xShapeAtAxis) === -1) {
                        throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " +
                            (this.name + ": expected axis " + axis + " of input shape to ") +
                            ("have value " + value + " but got shape " + xShape + "."));
                    }
                }
            }
            // Check shape.
            if (spec.shape != null) {
                for (var i = 0; i < spec.shape.length; ++i) {
                    var specDim = spec.shape[i];
                    var dim = x.shape[i];
                    if (specDim != null && dim != null) {
                        if (specDim !== dim) {
                            throw new errors_1.ValueError("Input " + inputIndex + " is incompatible with layer " +
                                (this.name + ": expected shape=" + spec.shape + ", ") +
                                ("found shape=" + x.shape + "."));
                        }
                    }
                }
            }
        }
    };
    /**
     * This is where the layer's logic lives.
     *
     * @param inputs Input tensor, or list/tuple of input tensors.
     * @param kwargs Additional keyword arguments.
     *
     * @return A tensor or list/tuple of tensors.
     */
    Layer.prototype.call = function (inputs, kwargs) {
        return inputs;
    };
    Layer.prototype.invokeCallHook = function (inputs, kwargs) {
        if (this._callHook != null) {
            this._callHook(inputs, kwargs);
        }
    };
    /**
     * Set call hook.
     * This is currently used for testing only.
     * @param callHook
     */
    Layer.prototype.setCallHook = function (callHook) {
        this._callHook = callHook;
    };
    /**
     * Clear call hook.
     * This is currently used for testing only.
     */
    Layer.prototype.clearCallHook = function () {
        this._callHook = null;
    };
    /**
     * Builds or executes a `Layer's logic.
     *
     * When called with `tf.Tensor`(s), execute the `Layer`s computation and
     * return Tensor(s). For example:
     *
     * ```js
     * const denseLayer = tf.layers.dense({
     *   units: 1,
     *   kernelInitializer: 'zeros',
     *   useBias: false
     * });
     *
     * // Invoke the layer's apply() method with a `tf.Tensor` (with concrete
     * // numeric values).
     * const input = tf.ones([2, 2]);
     * const output = denseLayer.apply(input);
     *
     * // The output's value is expected to be [[0], [0]], due to the fact that
     * // the dense layer has a kernel initialized to all-zeros and does not have
     * // a bias.
     * output.print();
     * ```
     *
     * When called with `tf.SymbolicTensor`(s), this will prepare the layer for
     * future execution.  This entails internal book-keeping on shapes of
     * expected Tensors, wiring layers together, and initializing weights.
     *
     * Calling `apply` with `tf.SymbolicTensor`s are typically used during the
     * building of non-`tf.Sequential` models. For example:
     *
     * ```js
     * const flattenLayer = tf.layers.flatten();
     * const denseLayer = tf.layers.dense({units: 1});
     *
     * // Use tf.layers.input() to obtain a SymbolicTensor as input to apply().
     * const input = tf.input({shape: [2, 2]});
     * const output1 = flattenLayer.apply(input);
     *
     * // output1.shape is [null, 4]. The first dimension is the undetermined
     * // batch size. The second dimension comes from flattening the [2, 2]
     * // shape.
     * console.log(JSON.stringify(output1.shape));
     *
     * // The output SymbolicTensor of the flatten layer can be used to call
     * // the apply() of the dense layer:
     * const output2 = denseLayer.apply(output1);
     *
     * // output2.shape is [null, 1]. The first dimension is the undetermined
     * // batch size. The second dimension matches the number of units of the
     * // dense layer.
     * console.log(JSON.stringify(output2.shape));
     *
     * // The input and output and be used to construct a model that consists
     * // of the flatten and dense layers.
     * const model = tf.model({inputs: input, outputs: output2});
     * ```
     *
     * @param inputs a `tf.Tensor` or `tf.SymbolicTensor` or an Array of them.
     * @param kwargs Additional keyword arguments to be passed to `call()`.
     *
     * @return Output of the layer's `call` method.
     *
     * @exception ValueError error in case the layer is missing shape information
     *   for its `build` call.
     */
    // Porting Note: This is a replacement for __call__() in Python.
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.apply = function (inputs, kwargs) {
        var _this = this;
        kwargs = kwargs || {};
        this.assertNotDisposed();
        // Ensure inputs are all the same type.
        var inputsList = generic_utils.toList(inputs);
        var allAreSymbolic = true;
        for (var _i = 0, inputsList_1 = inputsList; _i < inputsList_1.length; _i++) {
            var input = inputsList_1[_i];
            if (!(input instanceof SymbolicTensor)) {
                allAreSymbolic = false;
                break;
            }
        }
        var noneAreSymbolic = true;
        for (var _a = 0, inputsList_2 = inputsList; _a < inputsList_2.length; _a++) {
            var input = inputsList_2[_a];
            if (input instanceof SymbolicTensor) {
                noneAreSymbolic = false;
                break;
            }
        }
        if (allAreSymbolic === noneAreSymbolic) {
            throw new errors_1.ValueError('Arguments to apply() must be all ' +
                'SymbolicTensors or all Tensors');
        }
        // TODO(michaelterry): nameScope() may not be necessary.
        return common_1.nameScope(this.name, function () {
            // Handle laying building (weight creating, input spec locking).
            if (!_this.built) {
                /*
                  Throw exceptions in case the input is not compatible
                  with the inputSpec specified in the layer constructor.
                 */
                _this.assertInputCompatibility(inputs);
                // Collect input shapes to build layer.
                var inputShapes = [];
                for (var _i = 0, _a = generic_utils.toList(inputs); _i < _a.length; _i++) {
                    var xElem = _a[_i];
                    inputShapes.push(xElem.shape);
                }
                _this.build(generic_utils.singletonOrArray(inputShapes));
                _this.built = true;
                // Load weights that were specified at layer instantiation.
                if (_this.initialWeights) {
                    _this.setWeights(_this.initialWeights);
                }
                if (_this._refCount === null && noneAreSymbolic) {
                    // The first use of this layer is a non-symbolic call, set ref count
                    // to 1 so the Layer can be properly disposed if its dispose() method
                    // is called.
                    _this._refCount = 1;
                }
            }
            /*
              Throw exceptions in case the input is not compatible
              with the inputSpec set at build time.
            */
            _this.assertInputCompatibility(inputs);
            // Handle mask propagation.
            // TODO(michaelterry): Mask propagation not currently implemented.
            // Actually call the layer, collecting output(s), mask(s), and shape(s).
            if (noneAreSymbolic) {
                var output = _this.call(inputs, kwargs);
                // TODO(michaelterry): Compute the outputMask
                // If the layer returns tensors from its inputs, unmodified,
                // we copy them to avoid loss of tensor metadata.
                var outputList = generic_utils.toList(output);
                var outputListCopy = [];
                // TODO(michaelterry): This copying may not be necessary given our eager
                // backend.
                for (var _b = 0, outputList_1 = outputList; _b < outputList_1.length; _b++) {
                    var x = outputList_1[_b];
                    if (inputsList.indexOf(x) !== -1) {
                        x = x.clone();
                    }
                    outputListCopy.push(x);
                }
                output = generic_utils.singletonOrArray(outputListCopy);
                if (_this.activityRegularizer != null) {
                    throw new errors_1.NotImplementedError('Layer invocation in the presence of activity ' +
                        'regularizer(s) is not supported yet.');
                }
                // TODO(michaelterry): Call addInboundNode()?
                return output;
            }
            else {
                var inputShape = collectInputShape(inputs);
                var outputShape = _this.computeOutputShape(inputShape);
                var output = void 0;
                var outputDType_1 = guessOutputDType(inputs);
                _this.warnOnIncompatibleInputShape(Array.isArray(inputs) ? inputShape[0] :
                    inputShape);
                if (outputShape != null && outputShape.length > 0 &&
                    Array.isArray(outputShape[0])) {
                    // We have multiple output shapes. Create multiple output tensors.
                    output = outputShape
                        .map(function (shape, index) { return new SymbolicTensor(outputDType_1, shape, _this, generic_utils.toList(inputs), kwargs, _this.name, index); });
                }
                else {
                    output = new SymbolicTensor(outputDType_1, outputShape, _this, generic_utils.toList(inputs), kwargs, _this.name);
                }
                /*
                  Add an inbound node to the layer, so that it keeps track
                  of the call and of all new variables created during the call.
                  This also updates the layer history of the output tensor(s).
                  If the input tensor(s) had no previous history,
                  this does nothing.
                */
                _this.addInboundNode(inputs, output, null, null, inputShape, outputShape, kwargs);
                _this._refCount++;
                if (_this.activityRegularizer != null) {
                    throw new errors_1.NotImplementedError('Layer invocation in the presence of activity ' +
                        'regularizer(s) is not supported yet.');
                }
                return output;
            }
        });
    };
    /**
     * Check compatibility between input shape and this layer's batchInputShape.
     *
     * Print warning if any incompatibility is found.
     *
     * @param inputShape Input shape to be checked.
     */
    Layer.prototype.warnOnIncompatibleInputShape = function (inputShape) {
        if (this.batchInputShape == null) {
            return;
        }
        else if (inputShape.length !== this.batchInputShape.length) {
            console.warn("The rank of the input tensor provided (shape: " +
                (JSON.stringify(inputShape) + ") does not match that of the ") +
                ("batchInputShape (" + JSON.stringify(this.batchInputShape) + ") ") +
                ("of the layer " + this.name));
        }
        else {
            var dimMismatch_1 = false;
            this.batchInputShape.forEach(function (dimension, i) {
                if (dimension != null && inputShape[i] != null &&
                    inputShape[i] !== dimension) {
                    dimMismatch_1 = true;
                }
            });
            if (dimMismatch_1) {
                console.warn("The shape of the input tensor " +
                    ("(" + JSON.stringify(inputShape) + ") does not ") +
                    ("match the expectation of layer " + this.name + ": ") +
                    ("" + JSON.stringify(this.batchInputShape)));
            }
        }
    };
    Object.defineProperty(Layer.prototype, "outputShape", {
        /**
         * Retrieves the output shape(s) of a layer.
         *
         * Only applicable if the layer has only one inbound node, or if all inbound
         * nodes have the same output shape.
         *
         * @returns Output shape or shapes.
         * @throws AttributeError: if the layer is connected to more than one incoming
         *   nodes.
         */
        /** @doc {heading: 'Models', 'subheading': 'Classes'} */
        get: function () {
            if (this.inboundNodes == null || this.inboundNodes.length === 0) {
                throw new errors_1.AttributeError("The layer " + this.name + " has never been called and thus has no " +
                    "defined output shape.");
            }
            var allOutputShapes = [];
            for (var _i = 0, _a = this.inboundNodes; _i < _a.length; _i++) {
                var node = _a[_i];
                var shapeString = JSON.stringify(node.outputShapes);
                if (allOutputShapes.indexOf(shapeString) === -1) {
                    allOutputShapes.push(shapeString);
                }
            }
            if (allOutputShapes.length === 1) {
                var outputShapes = this.inboundNodes[0].outputShapes;
                if (Array.isArray(outputShapes) && Array.isArray(outputShapes[0]) &&
                    outputShapes.length === 1) {
                    return outputShapes[0];
                }
                else {
                    return outputShapes;
                }
            }
            else {
                throw new errors_1.AttributeError("The layer " + this.name + " has multiple inbound nodes with different " +
                    "output shapes. Hence the notion of \"outut shape\" is ill-defined " +
                    "for the layer.");
                // TODO(cais): Implement getOutputShapeAt().
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Counts the total number of numbers (e.g., float32, int32) in the
     * weights.
     *
     * @returns An integer count.
     * @throws RuntimeError: If the layer is not built yet (in which case its
     *   weights are not defined yet.)
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.countParams = function () {
        if (!this.built) {
            throw new errors_1.RuntimeError("You tried to call countParams() on " + this.name + ", " +
                "but the layer is not built yet. Build it first by calling " +
                "build(batchInputShape).");
        }
        return variable_utils.countParamsInWeights(this.weights);
    };
    /**
     * Creates the layer weights.
     *
     * Must be implemented on all layers that have weights.
     *
     * Called when apply() is called to construct the weights.
     *
     * @param inputShape A `Shape` or array of `Shape` (unused).
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.build = function (inputShape) {
        this.built = true;
    };
    /**
     * Returns the current values of the weights of the layer.
     *
     * @param trainableOnly Whether to get the values of only trainable weights.
     * @returns Weight values as an `Array` of `tf.Tensor`s.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.getWeights = function (trainableOnly) {
        if (trainableOnly === void 0) { trainableOnly = false; }
        return variables_1.batchGetValue(trainableOnly ? this.trainableWeights : this.weights);
    };
    /**
     * Sets the weights of the layer, from Tensors.
     *
     * @param weights a list of Tensors. The number of arrays and their shape
     *   must match number of the dimensions of the weights of the layer (i.e.
     *   it should match the output of `getWeights`).
     *
     * @exception ValueError If the provided weights list does not match the
     *   layer's specifications.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.setWeights = function (weights) {
        var _this = this;
        tfjs_core_1.tidy(function () {
            var params = _this.weights;
            if (params.length !== weights.length) {
                // TODO(cais): Restore the following and use `providedWeights`, instead
                // of `weights` in the error message, once the deeplearn.js bug is
                // fixed: https://github.com/PAIR-code/deeplearnjs/issues/498 const
                // providedWeights = JSON.stringify(weights).substr(0, 50);
                throw new errors_1.ValueError("You called setWeights(weights) on layer \"" + _this.name + "\" " +
                    ("with a weight list of length " + weights.length + ", ") +
                    ("but the layer was expecting " + params.length + " weights. ") +
                    ("Provided weights: " + weights + "..."));
            }
            if (params.length === 0) {
                return;
            }
            var weightValueTuples = [];
            var paramValues = variables_1.batchGetValue(params);
            for (var i = 0; i < paramValues.length; ++i) {
                var pv = paramValues[i];
                var p = params[i];
                var w = weights[i];
                if (!tfjs_core_1.util.arraysEqual(pv.shape, w.shape)) {
                    throw new errors_1.ValueError("Layer weight shape " + pv.shape + " " +
                        ("not compatible with provided weight shape " + w.shape));
                }
                weightValueTuples.push([p, w]);
            }
            variables_1.batchSetValue(weightValueTuples);
        });
    };
    /**
     * Adds a weight variable to the layer.
     *
     * @param name Name of the new weight variable.
     * @param shape The shape of the weight.
     * @param dtype The dtype of the weight.
     * @param initializer An initializer instance.
     * @param regularizer A regularizer instance.
     * @param trainable Whether the weight should be trained via backprop or not
     *   (assuming that the layer itself is also trainable).
     * @param constraint An optional trainable.
     * @return The created weight variable.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.addWeight = function (name, shape, dtype, initializer, regularizer, trainable, constraint) {
        // Reject duplicate weight names.
        if (this._addedWeightNames.indexOf(name) !== -1) {
            throw new errors_1.ValueError("Duplicate weight name " + name + " for layer " + this.name);
        }
        this._addedWeightNames.push(name);
        if (dtype == null) {
            dtype = 'float32';
        }
        if (this.fastWeightInitDuringBuild) {
            initializer = initializers_1.getInitializer('zeros');
        }
        var initValue = initializer.apply(shape, dtype);
        var weight = new variables_1.LayerVariable(initValue, dtype, name, trainable, constraint);
        initValue.dispose();
        // Request backend not to dispose the weights of the model on scope() exit.
        if (regularizer != null) {
            this.addLoss(function () { return regularizer.apply(weight.read()); });
        }
        if (trainable == null) {
            trainable = true;
        }
        if (trainable) {
            this._trainableWeights.push(weight);
        }
        else {
            this._nonTrainableWeights.push(weight);
        }
        return weight;
    };
    /**
     * Set the fast-weight-initialization flag.
     *
     * In cases where the initialized weight values will be immediately
     * overwritten by loaded weight values during model loading, setting
     * the flag to `true` saves unnecessary calls to potentially expensive
     * initializers and speeds up the loading process.
     *
     * @param value Target value of the flag.
     */
    Layer.prototype.setFastWeightInitDuringBuild = function (value) {
        this.fastWeightInitDuringBuild = value;
    };
    /**
     * Add losses to the layer.
     *
     * The loss may potentionally be conditional on some inputs tensors,
     * for instance activity losses are conditional on the layer's inputs.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.addLoss = function (losses) {
        var _a;
        if (losses == null || Array.isArray(losses) && losses.length === 0) {
            return;
        }
        // Update this.losses
        losses = generic_utils.toList(losses);
        if (this._losses !== undefined && this._losses !== null) {
            (_a = this.losses).push.apply(_a, losses);
        }
    };
    /**
     * Computes the output shape of the layer.
     *
     * Assumes that the layer will be built to match that input shape provided.
     *
     * @param inputShape A shape (tuple of integers) or a list of shape tuples
     *   (one per output tensor of the layer). Shape tuples can include null for
     *   free dimensions, instead of an integer.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    /**
     * Computes an output mask tensor.
     *
     * @param inputs Tensor or list of tensors.
     * @param mask Tensor or list of tensors.
     *
     * @return null or a tensor (or list of tensors, one per output tensor of the
     * layer).
     */
    Layer.prototype.computeMask = function (inputs, mask) {
        var _this = this;
        if (!this.supportsMasking) {
            if (mask != null) {
                if (Array.isArray(mask)) {
                    mask.forEach(function (maskElement) {
                        if (maskElement != null) {
                            throw new TypeError("Layer " + _this.name + " does not support masking, " +
                                'but was passed an inputMask.');
                        }
                    });
                }
                else {
                    throw new TypeError("Layer " + this.name + " does not support masking, " +
                        'but was passed an inputMask.');
                }
            }
            // masking not explicitly supported: return null as mask
            return null;
        }
        // if masking is explictly supported, by default
        // carry over the input mask
        return mask;
    };
    /**
     * Internal method to create an inbound node for the layer.
     *
     * @param inputTensors List of input tensors.
     * @param outputTensors List of output tensors.
     * @param inputMasks List of input masks (a mask can be a tensor, or null).
     * @param outputMasks List of output masks (a mask can be a tensor, or null).
     * @param inputShapes List of input shape tuples.
     * @param outputShapes List of output shape tuples.
     * @param kwargs Dictionary of keyword arguments that were passed to the
     *   `call` method of the layer at the call that created the node.
     */
    Layer.prototype.addInboundNode = function (inputTensors, outputTensors, inputMasks, outputMasks, inputShapes, outputShapes, kwargs) {
        if (kwargs === void 0) { kwargs = null; }
        var inputTensorList = generic_utils.toList(inputTensors);
        outputTensors = generic_utils.toList(outputTensors);
        inputMasks = generic_utils.toList(inputMasks);
        outputMasks = generic_utils.toList(outputMasks);
        inputShapes = types_utils.normalizeShapeList(inputShapes);
        outputShapes = types_utils.normalizeShapeList(outputShapes);
        // Collect input tensor(s) coordinates.
        var inboundLayers = [];
        var nodeIndices = [];
        var tensorIndices = [];
        for (var _i = 0, inputTensorList_1 = inputTensorList; _i < inputTensorList_1.length; _i++) {
            var x = inputTensorList_1[_i];
            /*
             * TODO(michaelterry): Keras adds this value to tensors; it's not
             * clear whether we'll use this or not.
             */
            inboundLayers.push(x.sourceLayer);
            nodeIndices.push(x.nodeIndex);
            tensorIndices.push(x.tensorIndex);
        }
        // Create node, add it to inbound nodes.
        // (This call has side effects.)
        // tslint:disable-next-line:no-unused-expression
        new Node({
            outboundLayer: this,
            inboundLayers: inboundLayers,
            nodeIndices: nodeIndices,
            tensorIndices: tensorIndices,
            inputTensors: inputTensorList,
            outputTensors: outputTensors,
            inputMasks: inputMasks,
            outputMasks: outputMasks,
            inputShapes: inputShapes,
            outputShapes: outputShapes
        }, kwargs);
        // Update tensor history
        for (var i = 0; i < outputTensors.length; i++) {
            // TODO(michaelterry: _uses_learning_phase not tracked.
            outputTensors[i].sourceLayer = this;
            outputTensors[i].nodeIndex = this.inboundNodes.length - 1;
            outputTensors[i].tensorIndex = i;
        }
    };
    /**
     * Returns the config of the layer.
     *
     * A layer config is a TS dictionary (serializable)
     * containing the configuration of a layer.
     * The same layer can be reinstantiated later
     * (without its trained weights) from this configuration.
     *
     * The config of a layer does not include connectivity
     * information, nor the layer class name.  These are handled
     * by 'Container' (one layer of abstraction above).
     *
     * Porting Note: The TS dictionary follows TS naming standrds for
     * keys, and uses tfjs-layers type-safe Enums.  Serialization methods
     * should use a helper function to convert to the pythonic storage
     * standard. (see serialization_utils.convertTsToPythonic)
     *
     * @returns TS dictionary of configuration.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.getConfig = function () {
        var config = { name: this.name, trainable: this.trainable };
        if (this.batchInputShape != null) {
            config['batchInputShape'] = this.batchInputShape;
        }
        if (this.dtype != null) {
            config['dtype'] = this.dtype;
        }
        return config;
    };
    /**
     * Dispose the weight variables that this Layer instance holds.
     *
     * @returns {number} Number of disposed variables.
     */
    Layer.prototype.disposeWeights = function () {
        this.weights.forEach(function (weight) { return weight.dispose(); });
        return this.weights.length;
    };
    Layer.prototype.assertNotDisposed = function () {
        if (this._refCount === 0) {
            throw new Error("Layer '" + this.name + "' is already disposed.");
        }
    };
    /**
     * Attempt to dispose layer's weights.
     *
     * This method decrease the reference count of the Layer object by 1.
     *
     * A Layer is reference-counted. Its reference count is incremented by 1
     * the first item its `apply()` method is called and when it becomes a part
     * of a new `Node` (through calling the `apply()`) method on a
     * `tf.SymbolicTensor`).
     *
     * If the reference count of a Layer becomes 0, all the weights will be
     * disposed and the underlying memory (e.g., the textures allocated in WebGL)
     * will be freed.
     *
     * Note: If the reference count is greater than 0 after the decrement, the
     * weights of the Layer will *not* be disposed.
     *
     * After a Layer is disposed, it cannot be used in calls such as `apply()`,
     * `getWeights()` or `setWeights()` anymore.
     *
     * @returns A DisposeResult Object with the following fields:
     *   - refCountAfterDispose: The reference count of the Container after this
     *     `dispose()` call.
     *   - numDisposedVariables: Number of `tf.Variable`s (i.e., weights) disposed
     *     during this `dispose()` call.
     * @throws {Error} If the layer is not built yet, or if the layer has already
     *   been disposed.
     */
    /** @doc {heading: 'Models', 'subheading': 'Classes'} */
    Layer.prototype.dispose = function () {
        if (!this.built) {
            throw new Error("Cannot dispose Layer " + this.name + " because it has not been " +
                "built yet.");
        }
        if (this._refCount === null) {
            throw new Error("Cannot dispose Layer " + this.name + " because it has not been used " +
                "yet.");
        }
        this.assertNotDisposed();
        var numDisposedVariables = 0;
        if (--this._refCount === 0) {
            numDisposedVariables = this.disposeWeights();
        }
        return { refCountAfterDispose: this._refCount, numDisposedVariables: numDisposedVariables };
    };
    return Layer;
}(tfjs_core_1.serialization.Serializable));
exports.Layer = Layer;
/**
 * Collects the input shape(s) of a list of `tf.Tensor`s or
 * `tf.SymbolicTensor`s.
 *
 * TODO(michaelterry): Update PyKeras docs (backport).
 *
 * @param inputTensors List of input tensors (or single input tensor).
 *
 * @return List of shape tuples (or single tuple), one tuple per input.
 */
function collectInputShape(inputTensors) {
    inputTensors =
        generic_utils.toList(inputTensors);
    var shapes = [];
    for (var _i = 0, inputTensors_1 = inputTensors; _i < inputTensors_1.length; _i++) {
        var x = inputTensors_1[_i];
        shapes.push(x.shape);
    }
    return generic_utils.singletonOrArray(shapes);
}
/**
 * Guesses output dtype based on inputs.
 *
 * At present, just returns 'float32' for any input.
 *
 * @param inputTensors List of input tensors (or single input tensor).
 *
 * @return The guessed DType. At present, always returns 'float32'.
 */
function guessOutputDType(inputTensors) {
    return 'float32';
}
/**
 * Returns the list of input tensors necessary to compute `tensor`.
 *
 * Output will always be a list of tensors (potentially with 1 element).
 *
 * @param tensor The tensor to start from.
 * @param layer Origin layer of the tensor.
 * @param nodeIndex Origin node index of the tensor.
 *
 * @return Array of input tensors.
 */
function getSourceInputs(tensor, layer, nodeIndex) {
    if (layer == null || (nodeIndex != null && nodeIndex > 0)) {
        layer = tensor.sourceLayer;
        nodeIndex = tensor.nodeIndex;
    }
    if (layer.inboundNodes.length === 0) {
        return [tensor];
    }
    else {
        var node = layer.inboundNodes[nodeIndex];
        if (node.inboundLayers.length === 0) {
            return node.inputTensors;
        }
        else {
            var sourceTensors = [];
            for (var i = 0; i < node.inboundLayers.length; i++) {
                var x = node.inputTensors[i];
                var layer_1 = node.inboundLayers[i];
                var nodeIndex_1 = node.nodeIndices[i];
                var previousSources = getSourceInputs(x, layer_1, nodeIndex_1);
                // Avoid input redundancy.
                for (var _i = 0, previousSources_1 = previousSources; _i < previousSources_1.length; _i++) {
                    var x_1 = previousSources_1[_i];
                    if (sourceTensors.indexOf(x_1) === -1) {
                        sourceTensors.push(x_1);
                    }
                }
            }
            return sourceTensors;
        }
    }
}
exports.getSourceInputs = getSourceInputs;
//# sourceMappingURL=topology.js.map