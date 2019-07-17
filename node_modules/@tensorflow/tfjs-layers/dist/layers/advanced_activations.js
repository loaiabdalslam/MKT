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
 *  Advanced activation layers.
 */
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var activations_1 = require("../activations");
var tfjs_backend_1 = require("../backend/tfjs_backend");
var constraints_1 = require("../constraints");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var initializers_1 = require("../initializers");
var regularizers_1 = require("../regularizers");
var types_utils_1 = require("../utils/types_utils");
var ReLU = /** @class */ (function (_super) {
    __extends(ReLU, _super);
    function ReLU(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.supportsMasking = true;
        if (args != null) {
            _this.maxValue = args.maxValue;
        }
        return _this;
    }
    ReLU.prototype.call = function (inputs, kwargs) {
        inputs = types_utils_1.getExactlyOneTensor(inputs);
        var output = tfjs_core_1.relu(inputs);
        if (this.maxValue != null) {
            output = tfjs_core_1.clipByValue(output, 0, this.maxValue);
        }
        return output;
    };
    ReLU.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    ReLU.prototype.getConfig = function () {
        var config = { maxValue: this.maxValue };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    ReLU.className = 'ReLU';
    return ReLU;
}(topology_1.Layer));
exports.ReLU = ReLU;
tfjs_core_1.serialization.registerClass(ReLU);
var LeakyReLU = /** @class */ (function (_super) {
    __extends(LeakyReLU, _super);
    function LeakyReLU(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.DEFAULT_ALPHA = 0.3;
        if (args == null) {
            args = {};
        }
        _this.alpha = args.alpha == null ? _this.DEFAULT_ALPHA : args.alpha;
        return _this;
    }
    LeakyReLU.prototype.call = function (inputs, kwargs) {
        var x = types_utils_1.getExactlyOneTensor(inputs);
        return tfjs_core_1.leakyRelu(x, this.alpha);
    };
    LeakyReLU.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    LeakyReLU.prototype.getConfig = function () {
        var config = { alpha: this.alpha };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    LeakyReLU.className = 'LeakyReLU';
    return LeakyReLU;
}(topology_1.Layer));
exports.LeakyReLU = LeakyReLU;
tfjs_core_1.serialization.registerClass(LeakyReLU);
var PReLU = /** @class */ (function (_super) {
    __extends(PReLU, _super);
    function PReLU(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.DEFAULT_ALPHA_INITIALIZER = 'zeros';
        if (args == null) {
            args = {};
        }
        _this.supportsMasking = true;
        _this.alphaInitializer =
            initializers_1.getInitializer(args.alphaInitializer || _this.DEFAULT_ALPHA_INITIALIZER);
        _this.alphaRegularizer = regularizers_1.getRegularizer(args.alphaRegularizer);
        _this.alphaConstraint = constraints_1.getConstraint(args.alphaConstraint);
        if (args.sharedAxes == null) {
            _this.sharedAxes = null;
        }
        else if (Array.isArray(args.sharedAxes)) {
            _this.sharedAxes = args.sharedAxes;
        }
        else if (typeof args.sharedAxes === 'number') {
            _this.sharedAxes = [args.sharedAxes];
        }
        else {
            throw new errors_1.ValueError("Expected sharedAxes to be a number or an array of numbers, " +
                ("but got " + args.sharedAxes));
        }
        return _this;
    }
    PReLU.prototype.build = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        var paramShape = inputShape.slice(1);
        if (this.sharedAxes != null) {
            for (var _i = 0, _a = this.sharedAxes; _i < _a.length; _i++) {
                var i = _a[_i];
                paramShape[i - 1] = 1;
            }
        }
        this.alpha = this.addWeight('alpha', paramShape, 'float32', this.alphaInitializer, this.alphaRegularizer, true, this.alphaConstraint);
        // Set input spec.
        var axes = {};
        if (this.sharedAxes != null) {
            for (var i = 1; i < inputShape.length; ++i) {
                axes[i] = inputShape[i];
            }
        }
        this.inputSpec = [new topology_1.InputSpec({
                ndim: inputShape.length,
                axes: axes,
            })];
        this.built = true;
    };
    PReLU.prototype.call = function (inputs, kwargs) {
        inputs = types_utils_1.getExactlyOneTensor(inputs);
        return tfjs_core_1.prelu(inputs, this.alpha.read());
    };
    PReLU.prototype.getConfig = function () {
        var config = {
            alphaInitializer: initializers_1.serializeInitializer(this.alphaInitializer),
            alphaRegularizer: regularizers_1.serializeRegularizer(this.alphaRegularizer),
            alphaConstraint: constraints_1.serializeConstraint(this.alphaConstraint),
            sharedAxes: this.sharedAxes
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    PReLU.className = 'PReLU';
    return PReLU;
}(topology_1.Layer));
exports.PReLU = PReLU;
tfjs_core_1.serialization.registerClass(PReLU);
var ELU = /** @class */ (function (_super) {
    __extends(ELU, _super);
    function ELU(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.DEFAULT_ALPHA = 1.0;
        if (args == null) {
            args = {};
        }
        if (args.alpha != null && args.alpha !== _this.DEFAULT_ALPHA) {
            throw new errors_1.NotImplementedError("Non-default alpha value (" + args.alpha + ") is not supported by the " +
                "ELU layer yet.");
        }
        _this.alpha = args.alpha == null ? _this.DEFAULT_ALPHA : args.alpha;
        return _this;
    }
    ELU.prototype.call = function (inputs, kwargs) {
        var x = types_utils_1.getExactlyOneTensor(inputs);
        return tfjs_core_1.elu(x);
    };
    ELU.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    ELU.prototype.getConfig = function () {
        var config = { alpha: this.alpha };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    ELU.className = 'ELU';
    return ELU;
}(topology_1.Layer));
exports.ELU = ELU;
tfjs_core_1.serialization.registerClass(ELU);
var ThresholdedReLU = /** @class */ (function (_super) {
    __extends(ThresholdedReLU, _super);
    function ThresholdedReLU(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.DEFAULT_THETA = 1.0;
        if (args == null) {
            args = {};
        }
        _this.theta = args.theta == null ? _this.DEFAULT_THETA : args.theta;
        return _this;
    }
    ThresholdedReLU.prototype.call = function (inputs, kwargs) {
        var x = types_utils_1.getExactlyOneTensor(inputs);
        return x.mul(tfjs_backend_1.cast(x.greater(this.theta), 'float32'));
    };
    ThresholdedReLU.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    ThresholdedReLU.prototype.getConfig = function () {
        var config = { theta: this.theta };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    ThresholdedReLU.className = 'ThresholdedReLU';
    return ThresholdedReLU;
}(topology_1.Layer));
exports.ThresholdedReLU = ThresholdedReLU;
tfjs_core_1.serialization.registerClass(ThresholdedReLU);
var Softmax = /** @class */ (function (_super) {
    __extends(Softmax, _super);
    function Softmax(args) {
        var _this = _super.call(this, args == null ? {} : args) || this;
        _this.DEFAULT_AXIS = 1.0;
        if (args == null) {
            args = {};
        }
        _this.softmax = new activations_1.Softmax().apply;
        _this.axis = args.axis == null ? _this.DEFAULT_AXIS : args.axis;
        return _this;
    }
    Softmax.prototype.call = function (inputs, kwargs) {
        var x = types_utils_1.getExactlyOneTensor(inputs);
        return this.softmax(x, this.axis);
    };
    Softmax.prototype.computeOutputShape = function (inputShape) {
        return inputShape;
    };
    Softmax.prototype.getConfig = function () {
        var config = { axis: this.axis };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    Softmax.className = 'Softmax';
    return Softmax;
}(topology_1.Layer));
exports.Softmax = Softmax;
tfjs_core_1.serialization.registerClass(Softmax);
//# sourceMappingURL=advanced_activations.js.map