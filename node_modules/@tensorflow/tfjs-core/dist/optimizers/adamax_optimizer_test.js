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
jasmine_util_1.describeWithFlags('AdamaxOptimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, beta1, beta2, decay, optimizer, x, f, numTensors, cost, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    learningRate = 0.1;
                    beta1 = 0.8;
                    beta2 = 0.9;
                    decay = 0.1;
                    optimizer = tf.train.adamax(learningRate, beta1, beta2, undefined, decay);
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
                    //
                    // ut_0 = beta2 * old_weighted_inf_norm = [0, 0]
                    // u1_1 = [
                    //    abs(grad_w1),
                    //    abs(grad_w2)
                    // ] = [4, 8]
                    // new_weighted_inf_norm = max(ut_0, ut_1) = [4, 8]
                    //
                    // coefficient = alpha / (1-beta1) = 0.5
                    // updates = coefficient * [
                    //    new_first_m1 / new_weighted_inf_norm1,
                    //    new_first_m2 / new_weighted_inf_norm2
                    // ] = [0.1, 0.1]
                    // w = [
                    //    w1_old - updates_1,
                    //    w2_old - updates_2
                    // ] = [1.9, 3.9]
                    //
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [.8, 1.6]
                    //
                    // ut_0 = beta2 * old_weighted_inf_norm = [0, 0]
                    // u1_1 = [
                    //    abs(grad_w1),
                    //    abs(grad_w2)
                    // ] = [4, 8]
                    // new_weighted_inf_norm = max(ut_0, ut_1) = [4, 8]
                    //
                    // coefficient = alpha / (1-beta1) = 0.5
                    // updates = coefficient * [
                    //    new_first_m1 / new_weighted_inf_norm1,
                    //    new_first_m2 / new_weighted_inf_norm2
                    // ] = [0.1, 0.1]
                    // w = [
                    //    w1_old - updates_1,
                    //    w2_old - updates_2
                    // ] = [1.9, 3.9]
                    //
                    _a.apply(void 0, [_c.sent(), [1.9, 3.9]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // gradient = [3.8, 7.8]
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [
                    //    0.8 * 0.8 + 0.2 * 3.8,
                    //    0.8 * 1.6 + 0.2 * 7.8
                    // ] = [1.4, 2.84]
                    //
                    // ut_0 = beta2 * old_weighted_inf_norm = [
                    //    0.9 * 4,
                    //    0.9 * 8
                    // ] = [3.6, 7.2]
                    // u1_1 = [
                    //    abs(grad_w1),
                    //    abs(grad_w2)
                    // ] = [3.8, 7.8]
                    // new_weighted_inf_norm = max(ut_0, ut_1) = [3.8, 7.8]
                    //
                    // alpha = 0.1 / (1 + 0.1 * 1) = 0.0909090909
                    //
                    // coefficient = alpha / (1 - beta1*beta1) = 0.25252525
                    // updates = coefficient * [
                    //    new_first_m1 / new_weighted_inf_norm1,
                    //    new_first_m2 / new_weighted_inf_norm2
                    // ] = [0.09303, 0.09194]
                    // w = [
                    //    w1_old - updates_1,
                    //    w2_old - updates_2
                    // ] = [1.80697, 3.8086]
                    //
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 2:
                    // gradient = [3.8, 7.8]
                    // new_first_m = [
                    //    beta1 * old_first_m_w1 + (1-beta1) * grad_w1,
                    //    beta1 * old_first_m_w2 + (1-beta1) * grad_w2
                    // ] = [
                    //    0.8 * 0.8 + 0.2 * 3.8,
                    //    0.8 * 1.6 + 0.2 * 7.8
                    // ] = [1.4, 2.84]
                    //
                    // ut_0 = beta2 * old_weighted_inf_norm = [
                    //    0.9 * 4,
                    //    0.9 * 8
                    // ] = [3.6, 7.2]
                    // u1_1 = [
                    //    abs(grad_w1),
                    //    abs(grad_w2)
                    // ] = [3.8, 7.8]
                    // new_weighted_inf_norm = max(ut_0, ut_1) = [3.8, 7.8]
                    //
                    // alpha = 0.1 / (1 + 0.1 * 1) = 0.0909090909
                    //
                    // coefficient = alpha / (1 - beta1*beta1) = 0.25252525
                    // updates = coefficient * [
                    //    new_first_m1 / new_weighted_inf_norm1,
                    //    new_first_m2 / new_weighted_inf_norm2
                    // ] = [0.09303, 0.09194]
                    // w = [
                    //    w1_old - updates_1,
                    //    w2_old - updates_2
                    // ] = [1.80697, 3.8086]
                    //
                    _b.apply(void 0, [_c.sent(), [1.80697, 3.8086]]);
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
    it('serialization round-trip', function () {
        var originalOpt = tf.train.adamax(0.1, 0.2, 0.3, 2e-8, 0.1);
        var reserialized = tf.AdamaxOptimizer.fromConfig(tf.AdamaxOptimizer, originalOpt.getConfig());
        expect(reserialized.getConfig()).toEqual(originalOpt.getConfig());
    });
});
//# sourceMappingURL=adamax_optimizer_test.js.map