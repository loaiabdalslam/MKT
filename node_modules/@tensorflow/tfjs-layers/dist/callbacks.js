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
/* Original source: keras/callbacks.py */
var base_callbacks_1 = require("./base_callbacks");
var training_1 = require("./engine/training");
var errors_1 = require("./errors");
var logs_1 = require("./logs");
var Callback = /** @class */ (function (_super) {
    __extends(Callback, _super);
    function Callback() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Instance of `keras.models.Model`. Reference of the model being trained. */
        _this.model = null;
        return _this;
    }
    Callback.prototype.setModel = function (model) {
        if (!(model instanceof training_1.LayersModel)) {
            throw new Error('model must be a LayersModel, not some other Container');
        }
        this.model = model;
    };
    return Callback;
}(base_callbacks_1.BaseCallback));
exports.Callback = Callback;
function less(currVal, prevVal) {
    return currVal < prevVal;
}
function greater(currVal, prevVal) {
    return currVal > prevVal;
}
/**
 * A Callback that stops training when a monitored quantity has stopped
 * improving.
 */
var EarlyStopping = /** @class */ (function (_super) {
    __extends(EarlyStopping, _super);
    function EarlyStopping(args) {
        var _this = _super.call(this) || this;
        if (args == null) {
            args = {};
        }
        if (args.restoreBestWeights) {
            throw new errors_1.NotImplementedError('restoreBestWeights = True is not implemented in EarlyStopping yet.');
        }
        _this.monitor = args.monitor || 'val_loss';
        _this.minDelta = Math.abs(args.minDelta || 0);
        _this.patience = args.patience || 0;
        _this.verbose = args.verbose || 0;
        _this.mode = args.mode || 'auto';
        _this.baseline = args.baseline;
        if (['auto', 'min', 'max'].indexOf(_this.mode) === -1) {
            console.warn("EarlyStopping mode '" + _this.mode + "' is invalid. " +
                "Falling back to mode 'auto'.");
            _this.mode = 'auto';
        }
        if (_this.mode === 'min') {
            _this.monitorFunc = less;
        }
        else if (_this.mode === 'max') {
            _this.monitorFunc = greater;
        }
        else {
            // For mode === 'auto'.
            if (_this.monitor.indexOf('acc') !== -1) {
                _this.monitorFunc = greater;
            }
            else {
                _this.monitorFunc = less;
            }
        }
        if (_this.monitorFunc === less) {
            _this.minDelta *= -1;
        }
        return _this;
    }
    EarlyStopping.prototype.onTrainBegin = function (logs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.wait = 0;
                this.stoppedEpoch = 0;
                if (this.baseline != null) {
                    this.best = this.baseline;
                }
                else {
                    this.best = this.monitorFunc === less ? Infinity : -Infinity;
                }
                return [2 /*return*/];
            });
        });
    };
    EarlyStopping.prototype.onEpochEnd = function (epoch, logs) {
        return __awaiter(this, void 0, void 0, function () {
            var current;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, logs_1.resolveScalarsInLogs(logs)];
                    case 1:
                        _a.sent();
                        current = this.getMonitorValue(logs);
                        if (current == null) {
                            return [2 /*return*/];
                        }
                        if (this.monitorFunc(current - this.minDelta, this.best)) {
                            this.best = current;
                            this.wait = 0;
                            // TODO(cais): Logic for restoreBestWeights.
                        }
                        else {
                            this.wait++;
                            if (this.wait >= this.patience) {
                                this.stoppedEpoch = epoch;
                                this.model.stopTraining = true;
                            }
                            // TODO(cais): Logic for restoreBestWeights.
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    EarlyStopping.prototype.onTrainEnd = function (logs) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.stoppedEpoch > 0 && this.verbose) {
                    console.log("Epoch " + this.stoppedEpoch + ": early stopping.");
                }
                return [2 /*return*/];
            });
        });
    };
    EarlyStopping.prototype.getMonitorValue = function (logs) {
        if (logs == null) {
            logs = {};
        }
        var monitorValue = logs[this.monitor];
        if (monitorValue == null) {
            console.warn("Metric for EarlyStopping " + this.monitor + " is not available. " +
                ("Available metrics are: " + Object.keys(logs)));
        }
        return monitorValue;
    };
    return EarlyStopping;
}(Callback));
exports.EarlyStopping = EarlyStopping;
/**
 * Factory function for a Callback that stops training when a monitored
 * quantity has stopped improving.
 *
 * Early stopping is a type of regularization, and protects model against
 * overfitting.
 *
 * The following example based on fake data illustrates how this callback
 * can be used during `tf.LayersModel.fit()`:
 *
 * ```js
 * const model = tf.sequential();
 * model.add(tf.layers.dense({
 *   units: 3,
 *   activation: 'softmax',
 *   kernelInitializer: 'ones',
 *   inputShape: [2]
 * }));
 * const xs = tf.tensor2d([1, 2, 3, 4], [2, 2]);
 * const ys = tf.tensor2d([[1, 0, 0], [0, 1, 0]], [2, 3]);
 * const xsVal = tf.tensor2d([4, 3, 2, 1], [2, 2]);
 * const ysVal = tf.tensor2d([[0, 0, 1], [0, 1, 0]], [2, 3]);
 * model.compile(
 *     {loss: 'categoricalCrossentropy', optimizer: 'sgd', metrics: ['acc']});
 *
 * // Without the EarlyStopping callback, the val_acc value would be:
 * //   0.5, 0.5, 0.5, 0.5, ...
 * // With val_acc being monitored, training should stop after the 2nd epoch.
 * const history = await model.fit(xs, ys, {
 *   epochs: 10,
 *   validationData: [xsVal, ysVal],
 *   callbacks: tf.callbacks.earlyStopping({monitor: 'val_acc'})
 * });
 *
 * // Expect to see a length-2 array.
 * console.log(history.history.val_acc);
 * ```
 */
/**
 * @doc {
 *   heading: 'Callbacks',
 *   namespace: 'callbacks'
 * }
 */
function earlyStopping(args) {
    return new EarlyStopping(args);
}
exports.earlyStopping = earlyStopping;
exports.callbacks = { earlyStopping: earlyStopping };
//# sourceMappingURL=callbacks.js.map