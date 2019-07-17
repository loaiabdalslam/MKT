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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('RMSPropOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, moment, rho, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = 0.1;
                    moment = 0.1;
                    rho = 0.95;
                    optimizer = tf.train.rmsprop(learningRate, rho, moment);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost & 2 accumulators should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 3);
                    // epsilon = 1e-8
                    // newAccumulatedMeanSquare =
                    //          rho * accumulatedMeanSquare + (1 - rho) * grad ^ 2 = (0.2)
                    // newAccumulatedMoments = momentum * accumulatedMoments +
                    //          learning_rate * gradient / sqrt(newAccumulatedMeanSquare +
                    //          epsilon) = 0.1 * 0 + ((0.1 * 2) / sqrt(0.2 + 1e-8)) = 0.44721
                    // x -= learningRate * newAccumulatedMoments
                    //
                    // de/dx = [2, 4]
                    // accumulatedMeanSquare = [0, 0]
                    // newAccumulatedMeanSquare = [.2, .8]
                    // accumulatedMoments = [0, 0]
                    // newAccumulatedMoments = [0.44721, 0.44721]
                    // x = [0.55279, 1.55279]
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // epsilon = 1e-8
                    // newAccumulatedMeanSquare =
                    //          rho * accumulatedMeanSquare + (1 - rho) * grad ^ 2 = (0.2)
                    // newAccumulatedMoments = momentum * accumulatedMoments +
                    //          learning_rate * gradient / sqrt(newAccumulatedMeanSquare +
                    //          epsilon) = 0.1 * 0 + ((0.1 * 2) / sqrt(0.2 + 1e-8)) = 0.44721
                    // x -= learningRate * newAccumulatedMoments
                    //
                    // de/dx = [2, 4]
                    // accumulatedMeanSquare = [0, 0]
                    // newAccumulatedMeanSquare = [.2, .8]
                    // accumulatedMoments = [0, 0]
                    // newAccumulatedMoments = [0.44721, 0.44721]
                    // x = [0.55279, 1.55279]
                    _a.apply(void 0, [_c.sent(), [0.55279, 1.55279]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // x = [0.55279, 1.55279]
                    // de/dx = [1.10558, 3.10558]
                    // accumulatedMeanSquare = [0.2, 0.8]
                    // newAccumulatedMeanSquare = [0.25105125, 1.242231]
                    // accumulatedMoments = [0.44721, 0.44721]
                    // newAccumulatedMoments = [0.26534, 0.32336]
                    // x = [0.28745, 1.22943]
                    // TODO: Fix numerical precision.
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // x = [0.55279, 1.55279]
                    // de/dx = [1.10558, 3.10558]
                    // accumulatedMeanSquare = [0.2, 0.8]
                    // newAccumulatedMeanSquare = [0.25105125, 1.242231]
                    // accumulatedMoments = [0.44721, 0.44721]
                    // newAccumulatedMoments = [0.26534, 0.32336]
                    // x = [0.28745, 1.22943]
                    // TODO: Fix numerical precision.
                    _b.apply(void 0, [_c.sent(), [0.28745, 1.222943], 1e-2]);
                    // There should be no new additional Tensors.
                    expect(tf.memory().numTensors).toBe(numTensors);
                    expect(cost).toBe(null);
                    x.dispose();
                    optimizer.dispose();
                    // The only tensor remaining is the argument to variable().
                    expect(tf.memory().numTensors).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with centered momentum', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, moment, rho, eps, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = 0.1;
                    moment = 0.1;
                    rho = 0.95;
                    eps = 1e-8;
                    optimizer = tf.train.rmsprop(learningRate, rho, moment, eps, true);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost & 3 accumulators should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 4);
                    // epsilon = 1e-8
                    // newAccumulatedMeanSquare =
                    //          rho * accumulatedMeanSquare + (1 - rho) * grad ^ 2 = [.2, .8]
                    // newAccumulatedMeanGrad =
                    //          rho * accumulatedMeanGrad + (1 - rho) * grad = [0.1, 0.2]
                    // newAccumulatedMoments = momentum * accumulatedMoments +
                    //          learning_rate * gradient / sqrt(newAccumulatedMeanSquare
                    //            - newAccumulatedMeanGrad * 2 +
                    //              epsilon) = 0.1 * 0 + ((0.1 * 2)
                    //                / sqrt(0.2 - 0.01 + 1e-8)) = 0.458831
                    // x -= learningRate * newAccumulatedMoments
                    //
                    // de/dx = [2, 4]
                    // accumulatedMeanSquare = [0, 0]
                    // newAccumulatedMeanSquare = [.2, .8]
                    // newAccumulatedMeanGrad = [.1, .2]
                    // accumulatedMoments = [0, 0]
                    // newAccumulatedMoments = [0.45883, 0.458831]
                    // x = [0.54117, 1.541169]
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // epsilon = 1e-8
                    // newAccumulatedMeanSquare =
                    //          rho * accumulatedMeanSquare + (1 - rho) * grad ^ 2 = [.2, .8]
                    // newAccumulatedMeanGrad =
                    //          rho * accumulatedMeanGrad + (1 - rho) * grad = [0.1, 0.2]
                    // newAccumulatedMoments = momentum * accumulatedMoments +
                    //          learning_rate * gradient / sqrt(newAccumulatedMeanSquare
                    //            - newAccumulatedMeanGrad * 2 +
                    //              epsilon) = 0.1 * 0 + ((0.1 * 2)
                    //                / sqrt(0.2 - 0.01 + 1e-8)) = 0.458831
                    // x -= learningRate * newAccumulatedMoments
                    //
                    // de/dx = [2, 4]
                    // accumulatedMeanSquare = [0, 0]
                    // newAccumulatedMeanSquare = [.2, .8]
                    // newAccumulatedMeanGrad = [.1, .2]
                    // accumulatedMoments = [0, 0]
                    // newAccumulatedMoments = [0.45883, 0.458831]
                    // x = [0.54117, 1.541169]
                    _a.apply(void 0, [_c.sent(), [0.54117, 1.541169]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // x = [0.54117, 1.541169]
                    // de/dx = [1.08234, 3.082338]
                    // accumulatedMeanSquare = [0.2, 0.8]
                    // accumulatedMeanGrad = [.1, .2]
                    // newAccumulatedMeanSquare = [0.248572, 1.235040]
                    // newAccumulatedMeanGrad = [0.149117, 0.3441169]
                    // accumulatedMoments = [0.45883, 0.458831]
                    // newAccumulatedMoments = [0.273385, 0.3375766]
                    // x = [0.267785, 1.2035924]
                    // TODO: Fix numerical precision.
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // x = [0.54117, 1.541169]
                    // de/dx = [1.08234, 3.082338]
                    // accumulatedMeanSquare = [0.2, 0.8]
                    // accumulatedMeanGrad = [.1, .2]
                    // newAccumulatedMeanSquare = [0.248572, 1.235040]
                    // newAccumulatedMeanGrad = [0.149117, 0.3441169]
                    // accumulatedMoments = [0.45883, 0.458831]
                    // newAccumulatedMoments = [0.273385, 0.3375766]
                    // x = [0.267785, 1.2035924]
                    // TODO: Fix numerical precision.
                    _b.apply(void 0, [_c.sent(), [0.267785, 1.2035924], 1e-2]);
                    // There should be no new additional Tensors.
                    expect(tf.memory().numTensors).toBe(numTensors);
                    expect(cost).toBe(null);
                    x.dispose();
                    optimizer.dispose();
                    // The only tensor remaining is the argument to variable().
                    expect(tf.memory().numTensors).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Save and load weigths: centered = false', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, moment, rho, optimizer1, x, f, cost, _a, _b, weights, optimizer2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    learningRate = 0.1;
                    moment = 0.1;
                    rho = 0.95;
                    optimizer1 = tf.train.rmsprop(learningRate, rho, moment);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    cost = optimizer1.minimize(f, /* returnCost */ true);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), 5]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), [0.5527865, 1.5527864]]);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 3:
                    weights = _e.sent();
                    // An iteration variable and two optimizer state variables.
                    expect(weights.length).toEqual(3);
                    optimizer2 = tf.train.rmsprop(learningRate, rho, moment);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 4:
                    _e.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 5:
                    _c.apply(void 0, [_e.sent(), 2.7167187]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 6:
                    _d.apply(void 0, [_e.sent(), [0.2874418, 1.2294267]]);
                    expect(optimizer2.iterations).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Save, load weigths and continue training: centered = true', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, moment, rho, epsilon, centered, optimizer1, x, f, cost, _a, _b, weights, optimizer2, _c, _d, optimizer3, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    learningRate = 0.1;
                    moment = 0.1;
                    rho = 0.95;
                    epsilon = undefined;
                    centered = true;
                    optimizer1 = tf.train.rmsprop(learningRate, rho, moment, epsilon, centered);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    cost = optimizer1.minimize(f, /* returnCost */ true);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 1:
                    _a.apply(void 0, [_h.sent(), 5]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    _b.apply(void 0, [_h.sent(), [0.5411684, 1.5411685]]);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 3:
                    weights = _h.sent();
                    // An iteration variable and three optimizer state variables.
                    expect(weights.length).toEqual(4);
                    optimizer2 = tf.train.rmsprop(learningRate, rho, moment, epsilon, centered);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 4:
                    _h.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 5:
                    _c.apply(void 0, [_h.sent(), 2.668063]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 6:
                    _d.apply(void 0, [_h.sent(), [0.2677834, 1.2035918]]);
                    expect(optimizer2.iterations).toEqual(2);
                    optimizer3 = tf.train.rmsprop(learningRate, rho, moment, epsilon, centered);
                    _f = (_e = optimizer3).setWeights;
                    return [4 /*yield*/, optimizer2.getWeights()];
                case 7: return [4 /*yield*/, _f.apply(_e, [_h.sent()])];
                case 8:
                    _h.sent();
                    cost = optimizer3.minimize(f, /* returnCost */ true);
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 9:
                    _g.apply(void 0, [_h.sent(), 1.520341]);
                    expect(optimizer3.iterations).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('serialization round-trip', function () {
        var originalOpt = tf.train.rmsprop(0.1, 0.5, 0.1, 1e-7, true);
        var reserialized = tf.RMSPropOptimizer.fromConfig(tf.RMSPropOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=rmsprop_optimizer_test.js.map