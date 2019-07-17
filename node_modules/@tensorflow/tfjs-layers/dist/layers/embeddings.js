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
/**
 * TensorFlow.js Layers: Embedding Layer.
 *
 * Original source: keras/constraints.py
 */
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var K = require("../backend/tfjs_backend");
var constraints_1 = require("../constraints");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var initializers_1 = require("../initializers");
var regularizers_1 = require("../regularizers");
var generic_utils = require("../utils/generic_utils");
var types_utils_1 = require("../utils/types_utils");
var Embedding = /** @class */ (function (_super) {
    __extends(Embedding, _super);
    function Embedding(args) {
        var _this = _super.call(this, args) || this;
        _this.embeddings = null;
        _this.DEFAULT_EMBEDDINGS_INITIALIZER = 'randomUniform';
        if (args.batchInputShape == null && args.inputShape == null) {
            // Porting Note: This logic is copied from Layer's constructor, since we
            // can't do exactly what the Python constructor does for Embedding().
            // Specifically, the super constructor can not be called after the
            // mutation of the `config` argument.
            var batchSize = null;
            if (args.batchSize != null) {
                batchSize = args.batchSize;
            }
            if (args.inputLength == null) {
                // Fix super-constructor to what it would have done if
                // 'config.inputShape' were (None, )
                _this.batchInputShape = [batchSize, null];
            }
            else {
                // Fix super-constructor to what it would have done if
                // 'config.inputShape' were (config.inputLength, )
                _this.batchInputShape =
                    [batchSize].concat(generic_utils.toList(args.inputLength));
            }
        }
        _this.inputDim = args.inputDim;
        generic_utils.assertPositiveInteger(_this.inputDim, 'inputDim');
        _this.outputDim = args.outputDim;
        generic_utils.assertPositiveInteger(_this.outputDim, 'outputDim');
        _this.embeddingsInitializer = initializers_1.getInitializer(args.embeddingsInitializer || _this.DEFAULT_EMBEDDINGS_INITIALIZER);
        _this.embeddingsRegularizer = regularizers_1.getRegularizer(args.embeddingsRegularizer);
        _this.activityRegularizer = regularizers_1.getRegularizer(args.activityRegularizer);
        _this.embeddingsConstraint = constraints_1.getConstraint(args.embeddingsConstraint);
        _this.maskZero = args.maskZero;
        _this.supportsMasking = args.maskZero;
        _this.inputLength = args.inputLength;
        return _this;
    }
    Embedding.prototype.build = function (inputShape) {
        this.embeddings = this.addWeight('embeddings', [this.inputDim, this.outputDim], this.dtype, this.embeddingsInitializer, this.embeddingsRegularizer, true, this.embeddingsConstraint);
        this.built = true;
    };
    // Override warnOnIncompatibleInputShape because an embedding layer allows
    // the input to have varying ranks.
    Embedding.prototype.warnOnIncompatibleInputShape = function (inputShape) { };
    Embedding.prototype.computeMask = function (inputs, mask) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            if (!_this.maskZero) {
                return null;
            }
            else {
                inputs = types_utils_1.getExactlyOneTensor(inputs);
                return tfjs_core_1.notEqual(inputs, tfjs_core_1.zerosLike(inputs));
            }
        });
    };
    Embedding.prototype.computeOutputShape = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        if (this.inputLength == null) {
            return inputShape.concat([this.outputDim]);
        }
        // inputLength can be an array if input is 3D or higher.
        var inLens = generic_utils.toList(this.inputLength);
        if (inLens.length !== inputShape.length - 1) {
            throw new errors_1.ValueError("\"inputLength\" is " + this.inputLength + ", but received " +
                ("input shape has shape " + inputShape));
        }
        else {
            var i = 0;
            for (var k = 0; k < inLens.length; ++k) {
                var s1 = inLens[k];
                var s2 = inputShape[k + 1];
                if ((s1 != null) && (s2 != null) && (s1 !== s2)) {
                    throw new errors_1.ValueError("\"inputLength\" is " + this.inputLength + ", but received " +
                        ("input shape has shape " + inputShape));
                }
                else if (s1 == null) {
                    inLens[i] = s2;
                }
                i++;
            }
        }
        return [inputShape[0]].concat(inLens, [this.outputDim]);
    };
    Embedding.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            _this.invokeCallHook(inputs, kwargs);
            // Embedding layer accepts only a single input.
            var input = types_utils_1.getExactlyOneTensor(inputs);
            if (input.dtype !== 'int32') {
                input = K.cast(input, 'int32');
            }
            var output = K.gather(_this.embeddings.read(), input.as1D());
            return output.reshape(types_utils_1.getExactlyOneShape(_this.computeOutputShape(input.shape)));
        });
    };
    Embedding.prototype.getConfig = function () {
        var config = {
            inputDim: this.inputDim,
            outputDim: this.outputDim,
            embeddingsInitializer: initializers_1.serializeInitializer(this.embeddingsInitializer),
            embeddingsRegularizer: regularizers_1.serializeRegularizer(this.embeddingsRegularizer),
            activityRegularizer: regularizers_1.serializeRegularizer(this.activityRegularizer),
            embeddingsConstraint: constraints_1.serializeConstraint(this.embeddingsConstraint),
            maskZero: this.maskZero,
            inputLength: this.inputLength
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    Embedding.className = 'Embedding';
    return Embedding;
}(topology_1.Layer));
exports.Embedding = Embedding;
tfjs_core_1.serialization.registerClass(Embedding);
//# sourceMappingURL=embeddings.js.map