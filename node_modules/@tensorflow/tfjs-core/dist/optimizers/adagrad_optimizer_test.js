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
jasmine_util_1.describeWithFlags('AdagradOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, initialAccumulatorValue, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = .1;
                    initialAccumulatorValue = .1;
                    optimizer = tf.train.adagrad(learningRate, initialAccumulatorValue);
                    x = tf.tensor1d([1, 2]).variable();
                    f = function () { return x.square().sum(); };
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost & accumulator should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 2);
                    // epsilon = 1-e8
                    // newAccumulatedGrad = accumulatedGrad + grad^2
                    // x -= (learningRate * grad) / sqrt(newAccumulatedGrad + eps)
                    // de/dx = [2, 4]
                    // accumulatedGrad = [0.1, 0.1]
                    // newAccumulatedGrad = [4.1, 16.1]
                    // x = [0.9012270405, 1.900311042]
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // epsilon = 1-e8
                    // newAccumulatedGrad = accumulatedGrad + grad^2
                    // x -= (learningRate * grad) / sqrt(newAccumulatedGrad + eps)
                    // de/dx = [2, 4]
                    // accumulatedGrad = [0.1, 0.1]
                    // newAccumulatedGrad = [4.1, 16.1]
                    // x = [0.9012270405, 1.900311042]
                    _a.apply(void 0, [_c.sent(), [0.9012270405, 1.9003110428]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // de/dx = [1.802454081, 3.9501555214]
                    // accumulatedGrad = [4.1, 16.1]
                    // newAccumulatedGrad = [7.3488407141, 31.7037286432]
                    // x = [0.8347372764, 1.83015597828]
                    // TODO: Fix numerical precision.
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // de/dx = [1.802454081, 3.9501555214]
                    // accumulatedGrad = [4.1, 16.1]
                    // newAccumulatedGrad = [7.3488407141, 31.7037286432]
                    // x = [0.8347372764, 1.83015597828]
                    // TODO: Fix numerical precision.
                    _b.apply(void 0, [_c.sent(), [0.8347372764, 1.83015597828], 1e-2]);
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
    it('Continue training after loading weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, initialAccumulatorValue, optimizer1, x, f, cost, _a, weights, optimizer2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = .1;
                    initialAccumulatorValue = .1;
                    optimizer1 = tf.train.adagrad(learningRate, initialAccumulatorValue);
                    x = tf.tensor1d([2, 4]).variable();
                    f = function () { return x.square().sum(); };
                    cost = optimizer1.minimize(f, /* returnCost */ true);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), 20]);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 2:
                    weights = _c.sent();
                    expect(weights.length).toEqual(2);
                    expect(weights[0].name).toEqual('iter');
                    expect(weights[1].name).toEqual(x.name + "/accumulator");
                    optimizer2 = tf.train.adam(learningRate, initialAccumulatorValue);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 3:
                    _c.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 4:
                    _b.apply(void 0, [_c.sent(), 18.82179]);
                    expect(optimizer2.iterations).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('serialization round-trip', function () {
        var originalOpt = tf.train.adagrad(0.1, 0.2);
        var reserialized = tf.AdagradOptimizer.fromConfig(tf.AdagradOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=adagrad_optimizer_test.js.map