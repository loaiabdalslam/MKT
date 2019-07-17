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
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var state_1 = require("../backend/state");
var errors_1 = require("../errors");
var topology_1 = require("./topology");
var InputLayer = /** @class */ (function (_super) {
    __extends(InputLayer, _super);
    function InputLayer(args) {
        var _this = _super.call(this, {
            dtype: args.dtype,
            name: args.name != null ? args.name : state_1.getUid('input').toString()
        }) || this;
        // Normalize config.batchSize and config.sparse
        if (args.batchSize == null) {
            args.batchSize = null;
        }
        if (args.sparse == null) {
            args.sparse = false;
        }
        _this.trainable = false;
        _this.built = true;
        _this.sparse = args.sparse;
        if (args.inputShape != null && args.batchInputShape != null) {
            throw new errors_1.ValueError('Only provide the inputShape OR ' +
                'batchInputShape argument to inputLayer, not both at the same time.');
        }
        var batchInputShape = args.batchInputShape;
        if (batchInputShape == null) {
            if (args.inputShape == null) {
                throw new errors_1.ValueError('An InputLayer should be passed either a ' +
                    '`batchInputShape` or an `inputShape`.');
            }
            else {
                batchInputShape = [args.batchSize].concat(args.inputShape);
            }
        }
        else {
            // TODO(michaelterry): Backport to PyKeras
            if (args.batchSize != null) {
                throw new errors_1.ValueError('Cannot specify batchSize if batchInputShape is ' +
                    'specified when creating an InputLayer.');
            }
        }
        var dtype = args.dtype || 'float32';
        _this.batchInputShape = batchInputShape;
        _this.dtype = dtype;
        // TODO(michaelterry): Backport this to PyKeras?
        _this.inputSpec = [{ shape: batchInputShape }];
        var inputTensor = new topology_1.SymbolicTensor(_this.dtype, _this.batchInputShape, _this, [], {}, _this.name);
        inputTensor.nodeIndex = 0;
        inputTensor.tensorIndex = 0;
        // Create an input node to add to this.outboundNode.
        // (This call has side effects.)
        // tslint:disable-next-line:no-unused-expression
        new topology_1.Node({
            outboundLayer: _this,
            inboundLayers: [],
            nodeIndices: [],
            tensorIndices: [],
            inputTensors: [inputTensor],
            outputTensors: [inputTensor],
            inputMasks: [null],
            outputMasks: [null],
            inputShapes: [batchInputShape],
            outputShapes: [batchInputShape]
        });
        return _this;
    }
    InputLayer.prototype.apply = function (inputs, kwargs) {
        throw new errors_1.ValueError('Cannot pass any input to an ' +
            ("InputLayer's apply() method. InputLayer name: " + this.name));
    };
    InputLayer.prototype.dispose = function () {
        // dispose() for InputLayer is overridden as no-op.
        return { refCountAfterDispose: this._refCount, numDisposedVariables: 0 };
    };
    InputLayer.prototype.getConfig = function () {
        return {
            batchInputShape: this.batchInputShape,
            dtype: this.dtype,
            sparse: this.sparse,
            name: this.name
        };
    };
    /** @nocollapse */
    InputLayer.className = 'InputLayer';
    return InputLayer;
}(topology_1.Layer));
exports.InputLayer = InputLayer;
tfjs_core_1.serialization.registerClass(InputLayer);
function Input(config) {
    if (config.batchShape == null && config.shape == null) {
        throw new Error('Please provide to Input either a `shape`' +
            ' or a `batchShape` argument. Note that ' +
            '`shape` does not include the batch ' +
            'dimension.');
    }
    if (config.batchShape != null && config.shape != null) {
        // TODO(michaelterry): Backport to PyKeras.
        throw new errors_1.ValueError('Please provide either a `shape` or `batchShape` ' +
            'argument to Input, but not both.');
    }
    var batchShape = config.batchShape;
    if (config.shape != null && batchShape == null) {
        batchShape = [null].concat(config.shape);
    }
    var dtype = config.dtype;
    if (dtype == null) {
        dtype = 'float32';
    }
    var inputLayer = new InputLayer({
        batchInputShape: batchShape,
        name: config.name,
        dtype: dtype,
        sparse: config.sparse
    });
    var outputs = inputLayer.inboundNodes[0].outputTensors;
    return outputs[0];
}
exports.Input = Input;
//# sourceMappingURL=input_layer.js.map