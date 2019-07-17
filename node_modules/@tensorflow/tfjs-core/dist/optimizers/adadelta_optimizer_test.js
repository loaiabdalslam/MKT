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
jasmine_util_1.describeWithFlags('AdadeltaOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, rho, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = .1;
                    rho = .95;
                    optimizer = tf.train.adadelta(learningRate, rho);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost & 2 accumulators should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 3);
                    // epsilon = 1-e8
                    // newAccumulatedGrad = rho * accumulatedGrad + (1 - rho) * grad ^ 2
                    // updates = -grad * sqrt(accumulatedUpdate + epsilon) /
                    //     sqrt(accumulatedGrad + epsilon)
                    // newAccumulatedUpdate = rho * accumulatedUpdate + (1 - rho) * updates ^ 2
                    // x += learningRate * updates
                    //
                    // de/dx = [2, 4]
                    // accumulatedGrad = [0, 0]
                    // newAccumulatedGrad = [.2, .8]
                    // updates = [-2, -4]
                    // newAccumulatedUpdate = [.2, .8]
                    // x = [0.8, 1.6]
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // epsilon = 1-e8
                    // newAccumulatedGrad = rho * accumulatedGrad + (1 - rho) * grad ^ 2
                    // updates = -grad * sqrt(accumulatedUpdate + epsilon) /
                    //     sqrt(accumulatedGrad + epsilon)
                    // newAccumulatedUpdate = rho * accumulatedUpdate + (1 - rho) * updates ^ 2
                    // x += learningRate * updates
                    //
                    // de/dx = [2, 4]
                    // accumulatedGrad = [0, 0]
                    // newAccumulatedGrad = [.2, .8]
                    // updates = [-2, -4]
                    // newAccumulatedUpdate = [.2, .8]
                    // x = [0.8, 1.6]
                    _a.apply(void 0, [_c.sent(), [0.8, 1.6]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // de/dx = [1.6, 3.2]
                    // accumulatedGrad = [.2, .8]
                    // accumulatedUpdate = [.2, .8]
                    // newAccumulatedGrad = [0.318, 1.272]
                    // updates = [-1.6, -3.2]
                    // x = [0.64, 1.28]
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // de/dx = [1.6, 3.2]
                    // accumulatedGrad = [.2, .8]
                    // accumulatedUpdate = [.2, .8]
                    // newAccumulatedGrad = [0.318, 1.272]
                    // updates = [-1.6, -3.2]
                    // x = [0.64, 1.28]
                    _b.apply(void 0, [_c.sent(), [0.64, 1.28]]);
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
    it('Save, load weights and continue training', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, rho, optimizer1, x, f, cost, _a, _b, weights, optimizer2, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    learningRate = .1;
                    rho = .95;
                    optimizer1 = tf.train.adadelta(learningRate, rho);
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
                    _b.apply(void 0, [_e.sent(), [0.8, 1.6]]);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 3:
                    weights = _e.sent();
                    expect(weights.length).toEqual(3);
                    expect(weights[0].name).toEqual('iter');
                    optimizer2 = tf.train.adadelta(learningRate, rho);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 4:
                    _e.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 5:
                    _c.apply(void 0, [_e.sent(), 3.2]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 6:
                    _d.apply(void 0, [_e.sent(), [0.64, 1.28]]);
                    expect(optimizer2.iterations).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('serialization round-trip', function () {
        var originalOpt = tf.train.adadelta(0.1, 0.2, 2e-8);
        var reserialized = tf.AdadeltaOptimizer.fromConfig(tf.AdadeltaOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=adadelta_optimizer_test.js.map