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
// Layer activation functions
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var K = require("./backend/tfjs_backend");
var generic_utils_1 = require("./utils/generic_utils");
/**
 * Base class for Activations.
 *
 * Special note: due to cross-language compatibility reasons, the
 * static readonly className field in this family of classes must be set to
 * the initialLowerCamelCase name of the activation.
 */
var Activation = /** @class */ (function (_super) {
    __extends(Activation, _super);
    function Activation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Activation.prototype.getConfig = function () {
        return {};
    };
    return Activation;
}(tfjs_core_1.serialization.Serializable));
exports.Activation = Activation;
/**
 * Exponential linear unit (ELU).
 * Reference: https://arxiv.org/abs/1511.07289
 */
var Elu = /** @class */ (function (_super) {
    __extends(Elu, _super);
    function Elu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calculate the activation function.
     *
     * @param x: Input.
     * @param alpha: Scaling factor the negative section.
     * @return Output of the ELU activation.
     */
    Elu.prototype.apply = function (x, alpha) {
        if (alpha === void 0) { alpha = 1; }
        return K.elu(x, alpha);
    };
    /** @nocollapse */
    Elu.className = 'elu';
    return Elu;
}(Activation));
exports.Elu = Elu;
tfjs_core_1.serialization.registerClass(Elu);
/**
 * Scaled Exponential Linear Unit. (Klambauer et al., 2017).
 * Reference: Self-Normalizing Neural Networks, https://arxiv.org/abs/1706.02515
 * Notes:
 *   - To be used together with the initialization "lecunNormal".
 *   - To be used together with the dropout variant "AlphaDropout".
 */
var Selu = /** @class */ (function (_super) {
    __extends(Selu, _super);
    function Selu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selu.prototype.apply = function (x) {
        return tfc.selu(x);
    };
    /** @nocollapse */
    Selu.className = 'selu';
    return Selu;
}(Activation));
exports.Selu = Selu;
tfjs_core_1.serialization.registerClass(Selu);
/**
 *  Rectified linear unit
 */
var Relu = /** @class */ (function (_super) {
    __extends(Relu, _super);
    function Relu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Relu.prototype.apply = function (x) {
        return tfc.relu(x);
    };
    /** @nocollapse */
    Relu.className = 'relu';
    return Relu;
}(Activation));
exports.Relu = Relu;
tfjs_core_1.serialization.registerClass(Relu);
/**
 * Rectified linear unit activation maxing out at 6.0.
 */
var Relu6 = /** @class */ (function (_super) {
    __extends(Relu6, _super);
    function Relu6() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Relu6.prototype.apply = function (x) {
        return tfjs_core_1.tidy(function () { return tfc.minimum(6.0, tfc.relu(x)); });
    };
    /** @nocollapse */
    Relu6.className = 'relu6';
    return Relu6;
}(Activation));
exports.Relu6 = Relu6;
tfjs_core_1.serialization.registerClass(Relu6);
//* Linear activation (no-op) */
var Linear = /** @class */ (function (_super) {
    __extends(Linear, _super);
    function Linear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Linear.prototype.apply = function (x) {
        return x;
    };
    /** @nocollapse */
    Linear.className = 'linear';
    return Linear;
}(Activation));
exports.Linear = Linear;
tfjs_core_1.serialization.registerClass(Linear);
/**
 * Sigmoid activation function.
 */
var Sigmoid = /** @class */ (function (_super) {
    __extends(Sigmoid, _super);
    function Sigmoid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sigmoid.prototype.apply = function (x) {
        return tfc.sigmoid(x);
    };
    /** @nocollapse */
    Sigmoid.className = 'sigmoid';
    return Sigmoid;
}(Activation));
exports.Sigmoid = Sigmoid;
tfjs_core_1.serialization.registerClass(Sigmoid);
/**
 * Segment-wise linear approximation of sigmoid.
 */
var HardSigmoid = /** @class */ (function (_super) {
    __extends(HardSigmoid, _super);
    function HardSigmoid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HardSigmoid.prototype.apply = function (x) {
        return K.hardSigmoid(x);
    };
    /** @nocollapse */
    HardSigmoid.className = 'hardSigmoid';
    return HardSigmoid;
}(Activation));
exports.HardSigmoid = HardSigmoid;
tfjs_core_1.serialization.registerClass(HardSigmoid);
/**
 * Softplus activation function.
 */
var Softplus = /** @class */ (function (_super) {
    __extends(Softplus, _super);
    function Softplus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Softplus.prototype.apply = function (x) {
        return tfc.softplus(x);
    };
    /** @nocollapse */
    Softplus.className = 'softplus';
    return Softplus;
}(Activation));
exports.Softplus = Softplus;
tfjs_core_1.serialization.registerClass(Softplus);
/**
 * Softsign activation function.
 */
var Softsign = /** @class */ (function (_super) {
    __extends(Softsign, _super);
    function Softsign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Softsign.prototype.apply = function (x) {
        return K.softsign(x);
    };
    /** @nocollapse */
    Softsign.className = 'softsign';
    return Softsign;
}(Activation));
exports.Softsign = Softsign;
tfjs_core_1.serialization.registerClass(Softsign);
/**
 * Hyperbolic tangent function.
 */
var Tanh = /** @class */ (function (_super) {
    __extends(Tanh, _super);
    function Tanh() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tanh.prototype.apply = function (x) {
        return tfc.tanh(x);
    };
    /** @nocollapse */
    Tanh.className = 'tanh';
    return Tanh;
}(Activation));
exports.Tanh = Tanh;
tfjs_core_1.serialization.registerClass(Tanh);
/**
 * Softmax activation function
 */
var Softmax = /** @class */ (function (_super) {
    __extends(Softmax, _super);
    function Softmax() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calculate the activation function.
     *
     * @param x Tensor.
     * @param axis Integer, axis along which the softmax normalization is applied.
     * Invalid if < 2, as softmax across 1 (the batch dimension) is assumed to be
     * an error.
     *
     * @returns a Tensor of the same shape as x
     *
     * @throws ValueError: In case `dim(x) < 2`.
     */
    Softmax.prototype.apply = function (x, axis) {
        if (axis === void 0) { axis = (-1); }
        return tfc.softmax(x, axis);
    };
    /** @nocollapse */
    Softmax.className = 'softmax';
    return Softmax;
}(Activation));
exports.Softmax = Softmax;
tfjs_core_1.serialization.registerClass(Softmax);
/**
 * Log softmax activation function
 */
var LogSoftmax = /** @class */ (function (_super) {
    __extends(LogSoftmax, _super);
    function LogSoftmax() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Calculate the activation function of log softmax:
     * log( exp(x_i) / sum(exp(x)) )
     *
     * @param x Tensor.
     * @param axis Integer, axis along which the softmax normalization is applied.
     * Invalid if < 2, as softmax across 1 (the batch dimension) is assumed to be
     * an error.
     *
     * @returns a Tensor of the same shape as x
     *
     * @throws ValueError: In case `dim(x) < 2`.
     */
    LogSoftmax.prototype.apply = function (x, axis) {
        if (axis === void 0) { axis = (-1); }
        return tfc.logSoftmax(x, axis);
    };
    /** @nocollapse */
    LogSoftmax.className = 'logSoftmax';
    return LogSoftmax;
}(Activation));
exports.LogSoftmax = LogSoftmax;
tfjs_core_1.serialization.registerClass(LogSoftmax);
function serializeActivation(activation) {
    return activation.getClassName();
}
exports.serializeActivation = serializeActivation;
function deserializeActivation(config, customObjects) {
    if (customObjects === void 0) { customObjects = {}; }
    return generic_utils_1.deserializeKerasObject(config, tfjs_core_1.serialization.SerializationMap.getMap().classNameMap, customObjects, 'activation');
}
exports.deserializeActivation = deserializeActivation;
function getActivation(identifier) {
    if (identifier == null) {
        var config = {};
        config['className'] = 'linear';
        config['config'] = {};
        return deserializeActivation(config);
    }
    if (typeof identifier === 'string') {
        var config = {};
        config['className'] = identifier;
        config['config'] = {};
        return deserializeActivation(config);
    }
    else if (identifier instanceof Activation) {
        return identifier;
    }
    else {
        return deserializeActivation(identifier);
    }
}
exports.getActivation = getActivation;
//# sourceMappingURL=activations.js.map