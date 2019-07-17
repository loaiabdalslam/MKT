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
var AdamaxOptimizer = /** @class */ (function (_super) {
    __extends(AdamaxOptimizer, _super);
    function AdamaxOptimizer(learningRate, beta1, beta2, epsilon, decay) {
        if (epsilon === void 0) { epsilon = null; }
        if (decay === void 0) { decay = 0.0; }
        var _this = _super.call(this) || this;
        _this.learningRate = learningRate;
        _this.beta1 = beta1;
        _this.beta2 = beta2;
        _this.epsilon = epsilon;
        _this.decay = decay;
        _this.accumulatedFirstMoment = [];
        _this.accumulatedWeightedInfNorm = [];
        globals_1.tidy(function () {
            _this.iteration = ops_1.scalar(0).variable();
            _this.accBeta1 = ops_1.scalar(beta1).variable();
        });
        if (epsilon == null) {
            _this.epsilon = engine_1.ENGINE.backend.epsilon();
        }
        return _this;
    }
    AdamaxOptimizer.prototype.applyGradients = function (variableGradients) {
        var _this = this;
        var variableNames = Array.isArray(variableGradients) ?
            variableGradients.map(function (item) { return item.name; }) :
            Object.keys(variableGradients);
        globals_1.tidy(function () {
            var oneMinusAccBeta1 = ops_1.sub(1, _this.accBeta1);
            var lr = ops_1.div(-_this.learningRate, _this.iteration.mul(_this.decay).add(1));
            variableNames.forEach(function (name, i) {
                var value = engine_1.ENGINE.registeredVariables[name];
                var trainable = false;
                if (_this.accumulatedFirstMoment[i] == null) {
                    _this.accumulatedFirstMoment[i] = {
                        originalName: name + "/m",
                        variable: ops_1.zerosLike(value).variable(trainable)
                    };
                }
                if (_this.accumulatedWeightedInfNorm[i] == null) {
                    _this.accumulatedWeightedInfNorm[i] = {
                        originalName: name + "/v",
                        variable: ops_1.zerosLike(value).variable(trainable)
                    };
                }
                var gradient = Array.isArray(variableGradients) ?
                    variableGradients[i].tensor :
                    variableGradients[name];
                if (gradient == null) {
                    return;
                }
                var firstMoment = _this.accumulatedFirstMoment[i].variable;
                var weightedInfNorm = _this.accumulatedWeightedInfNorm[i].variable;
                var newFirstMoment = firstMoment.mul(_this.beta1).add(gradient.mul(1 - _this.beta1));
                var ut0 = weightedInfNorm.mul(_this.beta2);
                var ut1 = gradient.abs();
                var newWeightedInfNorm = ut0.maximum(ut1);
                firstMoment.assign(newFirstMoment);
                weightedInfNorm.assign(newWeightedInfNorm);
                var newValue = lr.div(oneMinusAccBeta1)
                    .mul(newFirstMoment.div(newWeightedInfNorm.add(_this.epsilon)))
                    .add(value);
                value.assign(newValue);
            });
            _this.iteration.assign(_this.iteration.add(1));
            _this.accBeta1.assign(_this.accBeta1.mul(_this.beta1));
        });
        this.incrementIterations();
    };
    AdamaxOptimizer.prototype.dispose = function () {
        this.accBeta1.dispose();
        this.iteration.dispose();
        if (this.accumulatedFirstMoment != null) {
            globals_1.dispose(this.accumulatedFirstMoment.map(function (v) { return v.variable; }));
        }
        if (this.accumulatedWeightedInfNorm != null) {
            globals_1.dispose(this.accumulatedWeightedInfNorm.map(function (v) { return v.variable; }));
        }
    };
    AdamaxOptimizer.prototype.getWeights = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('getWeights() is not implemented for Adamax yet.');
            });
        });
    };
    AdamaxOptimizer.prototype.setWeights = function (weightValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('setWeights() is not implemented for Adamax yet.');
            });
        });
    };
    AdamaxOptimizer.prototype.getConfig = function () {
        return {
            'learningRate': this.learningRate,
            'beta1': this.beta1,
            'beta2': this.beta2,
            'epsilon': this.epsilon,
            'decay': this.decay
        };
    };
    /** @nocollapse */
    AdamaxOptimizer.fromConfig = function (cls, config) {
        return new cls(config['learningRate'], config['beta1'], config['beta2'], config['epsilon'], config['decay']);
    };
    /** @nocollapse */
    AdamaxOptimizer.className = 'Adamax'; // Note: Name matters for Python compatbility.
    return AdamaxOptimizer;
}(optimizer_1.Optimizer));
exports.AdamaxOptimizer = AdamaxOptimizer;
serialization_1.registerClass(AdamaxOptimizer);
//# sourceMappingURL=adamax_optimizer.js.map