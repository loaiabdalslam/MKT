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
jasmine_util_1.describeWithFlags('AdamOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, beta1, beta2, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = .1;
                    beta1 = .8;
                    beta2 = .9;
                    optimizer = tf.train.adam(learningRate, beta1, beta2);
                    x = tf.tensor1d([2, 4]).variable();
                    f = function () { return x.square().sum(); };
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost & 2 accumulators should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 3);
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [.8, 1.6]
                    // new_second_m = [
                    //    beta2 * old_second_m_w1 + (1-beta2) * grad_w1**2,
                    //    beta2 * old_second_m_w2 + (1-beta2) * grad_w2**2
                    // ] = [1.6, 6.4]
                    // m = [new_first_m/(1-acc_beta1)] = [4, 8]
                    // v = [new_second_m/(1-acc_beta2)] = [16, 64]
                    // x = [x - lr * m / sqrt(v)] = [1.9, 3.9]
                    //
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [.8, 1.6]
                    // new_second_m = [
                    //    beta2 * old_second_m_w1 + (1-beta2) * grad_w1**2,
                    //    beta2 * old_second_m_w2 + (1-beta2) * grad_w2**2
                    // ] = [1.6, 6.4]
                    // m = [new_first_m/(1-acc_beta1)] = [4, 8]
                    // v = [new_second_m/(1-acc_beta2)] = [16, 64]
                    // x = [x - lr * m / sqrt(v)] = [1.9, 3.9]
                    //
                    _a.apply(void 0, [_c.sent(), [1.9, 3.9]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [1.4, 2.84]
                    // new_second_m = [
                    //    beta2 * old_second_m_w1 + (1-beta2) * grad_w1**2,
                    //    beta2 * old_second_m_w2 + (1-beta2) * grad_w2**2
                    // ] = [2.884, 11.884]
                    // m = [new_first_m/(1-acc_beta1)] = [3.888888, 7.88889]
                    // v = [new_second_m/(1-acc_beta2)] = [15.1789, 62.5473]
                    // x = [x - lr * m / sqrt(v)] = [1.8000001, 3.8002]
                    //
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [1.4, 2.84]
                    // new_second_m = [
                    //    beta2 * old_second_m_w1 + (1-beta2) * grad_w1**2,
                    //    beta2 * old_second_m_w2 + (1-beta2) * grad_w2**2
                    // ] = [2.884, 11.884]
                    // m = [new_first_m/(1-acc_beta1)] = [3.888888, 7.88889]
                    // v = [new_second_m/(1-acc_beta2)] = [15.1789, 62.5473]
                    // x = [x - lr * m / sqrt(v)] = [1.8000001, 3.8002]
                    //
                    _b.apply(void 0, [_c.sent(), [1.8000001, 3.8002]]);
                    // There should be no new additional Tensors.
                    expect(tf.memory().numTensors).toBe(numTensors);
                    expect(cost).toBe(null);
                    x.dispose();
                    optimizer.dispose();
                    // The only tensor remaining should be the argument to variable().
                    expect(tf.memory().numTensors).toBe(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Continue training after loading weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, beta1, beta2, optimizer1, x, f, cost, _a, weights, optimizer2, _b, optimizer3, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    learningRate = .1;
                    beta1 = .8;
                    beta2 = .9;
                    optimizer1 = tf.train.adam(learningRate, beta1, beta2);
                    x = tf.tensor1d([2, 4]).variable();
                    f = function () { return x.square().sum(); };
                    cost = optimizer1.minimize(f, /* returnCost */ true);
                    expect(optimizer1.iterations).toEqual(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), 20]);
                    return [4 /*yield*/, optimizer1.getWeights()];
                case 2:
                    weights = _f.sent();
                    expect(weights.length).toEqual(3);
                    expect(weights[0].name).toEqual('iter');
                    expect(weights[1].name).toEqual(x.name + "/m");
                    expect(weights[2].name).toEqual(x.name + "/v");
                    optimizer2 = tf.train.adam(learningRate, beta1, beta2);
                    return [4 /*yield*/, optimizer2.setWeights(weights)];
                case 3:
                    _f.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 4:
                    _b.apply(void 0, [_f.sent(), 18.82]);
                    expect(optimizer2.iterations).toEqual(2);
                    optimizer3 = tf.train.adam(learningRate, beta1, beta2);
                    _d = (_c = optimizer3).setWeights;
                    return [4 /*yield*/, optimizer2.getWeights()];
                case 5: return [4 /*yield*/, _d.apply(_c, [_f.sent()])];
                case 6:
                    _f.sent();
                    cost = optimizer2.minimize(f, /* returnCost */ true);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 7:
                    _e.apply(void 0, [_f.sent(), 17.681284]);
                    expect(optimizer3.iterations).toEqual(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('serialization round-trip', function () {
        var originalOpt = tf.train.adam(0.1, 0.2, 0.3, 2e-8);
        var reserialized = tf.AdamOptimizer.fromConfig(tf.AdamOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=adam_optimizer_test.js.map