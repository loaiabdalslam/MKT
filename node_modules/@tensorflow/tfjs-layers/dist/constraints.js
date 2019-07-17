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
/* Original source: keras/contraints.py */
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var common_1 = require("./backend/common");
var generic_utils_1 = require("./utils/generic_utils");
/**
 * Helper function used by many of the Constraints to find the L2Norms.
 */
function calcL2Norms(w, axis) {
    return tfjs_core_1.tidy(function () { return tfc.sqrt(tfc.sum(tfc.mulStrict(w, w), axis, true)); });
}
/**
 * Base class for functions that impose constraints on weight values
 */
/**
 * @doc {
 *   heading: 'Constraints',
 *   subheading: 'Classes',
 *   namespace: 'constraints'
 * }
 */
var Constraint = /** @class */ (function (_super) {
    __extends(Constraint, _super);
    function Constraint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Constraint.prototype.getConfig = function () {
        return {};
    };
    return Constraint;
}(tfjs_core_1.serialization.Serializable));
exports.Constraint = Constraint;
var MaxNorm = /** @class */ (function (_super) {
    __extends(MaxNorm, _super);
    function MaxNorm(args) {
        var _this = _super.call(this) || this;
        _this.defaultMaxValue = 2;
        _this.defaultAxis = 0;
        _this.maxValue =
            args.maxValue != null ? args.maxValue : _this.defaultMaxValue;
        _this.axis = args.axis != null ? args.axis : _this.defaultAxis;
        return _this;
    }
    MaxNorm.prototype.apply = function (w) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            var norms = calcL2Norms(w, _this.axis);
            var desired = tfc.clipByValue(norms, 0, _this.maxValue);
            return tfc.mul(w, tfc.div(desired, tfc.add(common_1.epsilon(), norms)));
        });
    };
    MaxNorm.prototype.getConfig = function () {
        return { maxValue: this.maxValue, axis: this.axis };
    };
    /** @nocollapse */
    MaxNorm.className = 'MaxNorm';
    return MaxNorm;
}(Constraint));
exports.MaxNorm = MaxNorm;
tfjs_core_1.serialization.registerClass(MaxNorm);
var UnitNorm = /** @class */ (function (_super) {
    __extends(UnitNorm, _super);
    function UnitNorm(args) {
        var _this = _super.call(this) || this;
        _this.defaultAxis = 0;
        _this.axis = args.axis != null ? args.axis : _this.defaultAxis;
        return _this;
    }
    UnitNorm.prototype.apply = function (w) {
        var _this = this;
        return tfjs_core_1.tidy(function () { return tfc.div(w, tfc.add(common_1.epsilon(), calcL2Norms(w, _this.axis))); });
    };
    UnitNorm.prototype.getConfig = function () {
        return { axis: this.axis };
    };
    /** @nocollapse */
    UnitNorm.className = 'UnitNorm';
    return UnitNorm;
}(Constraint));
exports.UnitNorm = UnitNorm;
tfjs_core_1.serialization.registerClass(UnitNorm);
var NonNeg = /** @class */ (function (_super) {
    __extends(NonNeg, _super);
    function NonNeg() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NonNeg.prototype.apply = function (w) {
        return tfc.relu(w);
    };
    /** @nocollapse */
    NonNeg.className = 'NonNeg';
    return NonNeg;
}(Constraint));
exports.NonNeg = NonNeg;
tfjs_core_1.serialization.registerClass(NonNeg);
var MinMaxNorm = /** @class */ (function (_super) {
    __extends(MinMaxNorm, _super);
    function MinMaxNorm(args) {
        var _this = _super.call(this) || this;
        _this.defaultMinValue = 0.0;
        _this.defaultMaxValue = 1.0;
        _this.defaultRate = 1.0;
        _this.defaultAxis = 0;
        _this.minValue =
            args.minValue != null ? args.minValue : _this.defaultMinValue;
        _this.maxValue =
            args.maxValue != null ? args.maxValue : _this.defaultMaxValue;
        _this.rate = args.rate != null ? args.rate : _this.defaultRate;
        _this.axis = args.axis != null ? args.axis : _this.defaultAxis;
        return _this;
    }
    MinMaxNorm.prototype.apply = function (w) {
        var _this = this;
        return tfjs_core_1.tidy(function () {
            var norms = calcL2Norms(w, _this.axis);
            var desired = tfc.add(tfc.mul(_this.rate, tfc.clipByValue(norms, _this.minValue, _this.maxValue)), tfc.mul(1.0 - _this.rate, norms));
            return tfc.mul(w, tfc.div(desired, tfc.add(common_1.epsilon(), norms)));
        });
    };
    MinMaxNorm.prototype.getConfig = function () {
        return {
            minValue: this.minValue,
            maxValue: this.maxValue,
            rate: this.rate,
            axis: this.axis
        };
    };
    /** @nocollapse */
    MinMaxNorm.className = 'MinMaxNorm';
    return MinMaxNorm;
}(Constraint));
exports.MinMaxNorm = MinMaxNorm;
tfjs_core_1.serialization.registerClass(MinMaxNorm);
// Maps the JavaScript-like identifier keys to the corresponding registry
// symbols.
exports.CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP = {
    'maxNorm': 'MaxNorm',
    'minMaxNorm': 'MinMaxNorm',
    'nonNeg': 'NonNeg',
    'unitNorm': 'UnitNorm'
};
function serializeConstraint(constraint) {
    return generic_utils_1.serializeKerasObject(constraint);
}
exports.serializeConstraint = serializeConstraint;
function deserializeConstraint(config, customObjects) {
    if (customObjects === void 0) { customObjects = {}; }
    return generic_utils_1.deserializeKerasObject(config, tfjs_core_1.serialization.SerializationMap.getMap().classNameMap, customObjects, 'constraint');
}
exports.deserializeConstraint = deserializeConstraint;
function getConstraint(identifier) {
    if (identifier == null) {
        return null;
    }
    if (typeof identifier === 'string') {
        var className = identifier in exports.CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP ?
            exports.CONSTRAINT_IDENTIFIER_REGISTRY_SYMBOL_MAP[identifier] :
            identifier;
        var config = { className: className, config: {} };
        return deserializeConstraint(config);
    }
    else if (identifier instanceof Constraint) {
        return identifier;
    }
    else {
        return deserializeConstraint(identifier);
    }
}
exports.getConstraint = getConstraint;
//# sourceMappingURL=constraints.js.map