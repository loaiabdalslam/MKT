"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var engine_1 = require("../engine");
var globals_1 = require("../globals");
var ops_1 = require("../ops/ops");
var serialization_1 = require("../serialization");
var optimizer_1 = require("./optimizer");
var AdamOptimizer = /** @class */ (function (_super) {
    __extends(AdamOptimizer, _super);
    function AdamOptimizer(learningRate, beta1, beta2, epsilon) {
        if (epsilon === void 0) { epsilon = null; }
        var _this = _super.call(this) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.epsilon = epsilon;
        _this.accumulatedFirstMoment = [];
        _this.accumulatedSecondMoment = [];
        globals_1.tidy(function () {
            // accB* will be updated by batch.
            _this.accBeta1 = ops_1.scalar(beta1).variable();
            _this.accBeta2 = ops_1.scalar(beta2).variable();
        });
        if (epsilon == null) {
            _this.epsilon = engine_1.ENGINE.backend.epsilon();
        }
        return _this;
    }
    AdamOptimizer.prototype.applyGradients = function (variableGradients) {
        var _this = this;
        var varNames = Array.isArray(variableGradients) ?
            variableGradients.map(function (v) { return v.name; }) :
            Object.keys(variableGradients);
        globals_1.tidy(function () {
            var oneMinusAccBeta1 = ops_1.sub(1, _this.accBeta1);
            var oneMinusAccBeta2 = ops_1.sub(1, _this.accBeta2);
            varNames.forEach(function (name, i) {
                var value = engine_1.ENGINE.registeredVariables[name];
                var trainable = false;
                if (_this.accumulatedFirstMoment[i] == null) {
                    _this.accumulatedFirstMoment[i] = {
                        originalName: name + "/m",
                        variable: globals_1.tidy(function () { return ops_1.zerosLike(value).variable(trainable); })
                    };
                }
                if (_this.accumulatedSecondMoment[i] == null) {
                    _this.accumulatedSecondMoment[i] = {
                        originalName: name + "/v",
                        variable: globals_1.tidy(function () { return ops_1.zerosLike(value).variable(trainable); })
                    };
                }
                var gradient = Array.isArray(variableGradients) ?
                    variableGradients[i].tensor :
                    variableGradients[name];
                if (gradient == null) {
                    return;
                }
                var firstMoment = _this.accumulatedFirstMoment[i].variable;
                var secondMoment = _this.accumulatedSecondMoment[i].variable;
                var newFirstMoment = firstMoment.mul(_this.beta1).add(gradient.mul(1 - _this.beta1));
                var newSecondMoment = secondMoment.mul(_this.beta2)
                    .add(gradient.square().mul(1 - _this.beta2));
                var biasCorrectedFirstMoment = newFirstMoment.div(oneMinusAccBeta1);
                var biasCorrectedSecondMoment = newSecondMoment.div(oneMinusAccBeta2);
                firstMoment.assign(newFirstMoment);
                secondMoment.assign(newSecondMoment);
                var newValue = biasCorrectedFirstMoment
                    .div(biasCorrectedSecondMoment.sqrt().add(_this.epsilon))
                    .mul(-_this.learningRate)
                    .add(value);
                value.assign(newValue);
            });
            _this.accBeta1.assign(_this.accBeta1.mul(_this.beta1));
            _this.accBeta2.assign(_this.accBeta2.mul(_this.beta2));
        });
        this.incrementIterations();
    };
    AdamOptimizer.prototype.dispose = function () {
        this.accBeta1.dispose();
        this.accBeta2.dispose();
        if (this.accumulatedFirstMoment != null) {
            globals_1.dispose(this.accumulatedFirstMoment.map(function (v) { return v.variable; }));
        }
        if (this.accumulatedSecondMoment != null) {
            globals_1.dispose(this.accumulatedSecondMoment.map(function (v) { return v.variable; }));
        }
    };
    AdamOptimizer.prototype.getWeights = function () {
        return __awaiter(this, void 0, void 0, function () {
            var variables;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        variables = this.accumulatedFirstMoment.concat(this.accumulatedSecondMoment);
                        return [4 /*yield*/, this.saveIterations()];
                    case 1: return [2 /*return*/, [_a.sent()].concat(variables.map(function (v) { return ({ name: v.originalName, tensor: v.variable }); }))];
                }
            });
        });
    };
    AdamOptimizer.prototype.setWeights = function (weightValues) {
        return __awaiter(this, void 0, void 0, function () {
            var variableCount, trainable;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.extractIterations(weightValues)];
                    case 1:
                        weightValues = _a.sent();
                        globals_1.tidy(function () {
                            _this.accBeta1.assign(ops_1.pow(_this.beta1, _this.iterations_ + 1));
                            _this.accBeta2.assign(ops_1.pow(_this.beta2, _this.iterations_ + 1));
                        });
                        variableCount = weightValues.length / 2;
                        trainable = false;
                        this.accumulatedFirstMoment =
                            weightValues.slice(0, variableCount).map(function (v) { return ({
                                originalName: v.name,
                                variable: v.tensor.variable(trainable)
                            }); });
                        this.accumulatedSecondMoment =
                            weightValues.slice(variableCount, variableCount * 2)
                                .map(function (v) { return ({
                                originalName: v.name,
                                variable: v.tensor.variable(trainable)
                            }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    AdamOptimizer.prototype.getConfig = function () {
        return {
            'learningRate': this.learningRate,
            'beta1': this.beta1,
            'beta2': this.beta2,
            'epsilon': this.epsilon,
        };
    };
    /** @nocollapse */
    AdamOptimizer.fromConfig = function (cls, config) {
        return new cls(config['learningRate'], config['beta1'], config['beta2'], config['epsilon']);
    };
    /** @nocollapse */
    AdamOptimizer.className = 'Adam'; // Note: Name matters for Python compatibility.
    return AdamOptimizer;
}(optimizer_1.Optimizer));
exports.AdamOptimizer = AdamOptimizer;
serialization_1.registerClass(AdamOptimizer);
//# sourceMappingURL=adam_optimizer.js.map