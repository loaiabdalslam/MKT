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
var optimizer_1 = require("./optimizer");
var sgd_optimizer_1 = require("./sgd_optimizer");
jasmine_util_1.describeWithFlags('optimizer', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, optimizer, x, bias, strayVariable, numTensors, f, cost, expectedX1, expectedBias1, _a, _b, _c, _d, expectedX2, expectedBias2, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    learningRate = .1;
                    optimizer = tf.train.sgd(learningRate);
                    x = tf.scalar(4).variable();
                    bias = tf.scalar(1).variable();
                    strayVariable = tf.scalar(-1).variable();
                    numTensors = tf.memory().numTensors;
                    f = function () { return x.square().addStrict(bias); };
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // Cost should be the only additional arrays.
                    expect(tf.memory().numTensors).toBe(numTensors + 1);
                    expectedX1 = -2 * 4 * learningRate + 4;
                    expectedBias1 = -1 * learningRate + 1;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_h.sent(), [expectedX1]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 2:
                    _b.apply(void 0, [_h.sent(), [expectedBias1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 3:
                    _c.apply(void 0, [_h.sent(), [Math.pow(4, 2) + 1]]);
                    // The stray variable should remain unchanged.
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 4:
                    // The stray variable should remain unchanged.
                    _d.apply(void 0, [_h.sent(), [-1]]);
                    cost.dispose();
                    numTensors = tf.memory().numTensors;
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // There should be no new additional Tensors.
                    expect(tf.memory().numTensors).toBe(numTensors);
                    expectedX2 = -2 * expectedX1 * learningRate + expectedX1;
                    expectedBias2 = -learningRate + expectedBias1;
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 5:
                    _e.apply(void 0, [_h.sent(), [expectedX2]]);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 6:
                    _f.apply(void 0, [_h.sent(), [expectedBias2]]);
                    expect(cost).toBe(null);
                    // The stray variable should remain unchanged.
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 7:
                    // The stray variable should remain unchanged.
                    _g.apply(void 0, [_h.sent(), [-1]]);
                    optimizer.dispose();
                    x.dispose();
                    bias.dispose();
                    strayVariable.dispose();
                    // The only tensors remaining are the arguments to variable().
                    expect(tf.memory().numTensors).toBe(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('varList array of all variables', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, optimizer, x, bias, strayVariable, varList, f, cost, expectedX1, expectedBias1, _a, _b, _c, _d, expectedX2, expectedBias2, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    learningRate = .1;
                    optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
                    x = tf.scalar(4).variable();
                    bias = tf.scalar(1).variable();
                    strayVariable = tf.scalar(-1).variable();
                    varList = [x, bias];
                    f = function () { return x.square().addStrict(bias); };
                    cost = optimizer.minimize(f, /* returnCost */ true, varList);
                    expectedX1 = -2 * 4 * learningRate + 4;
                    expectedBias1 = -1 * learningRate + 1;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_h.sent(), [expectedX1]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 2:
                    _b.apply(void 0, [_h.sent(), [expectedBias1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 3:
                    _c.apply(void 0, [_h.sent(), [Math.pow(4, 2) + 1]]);
                    // The stray variable should remain unchanged.
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 4:
                    // The stray variable should remain unchanged.
                    _d.apply(void 0, [_h.sent(), [-1]]);
                    cost = optimizer.minimize(f, /* returnCost */ false, varList);
                    expectedX2 = -2 * expectedX1 * learningRate + expectedX1;
                    expectedBias2 = -learningRate + expectedBias1;
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 5:
                    _e.apply(void 0, [_h.sent(), [expectedX2]]);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 6:
                    _f.apply(void 0, [_h.sent(), [expectedBias2]]);
                    // The stray variable should remain unchanged.
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 7:
                    // The stray variable should remain unchanged.
                    _g.apply(void 0, [_h.sent(), [-1]]);
                    expect(cost).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('varList empty array of variables throws error', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.scalar(4).variable();
        var bias = tf.scalar(1).variable();
        // Stray variable.
        tf.scalar(-1).variable();
        var varList = [];
        var f = function () { return x.square().addStrict(bias); };
        expect(function () { return optimizer.minimize(f, /* returnCost */ true, varList); })
            .toThrowError();
    });
    it('varList subset of variables update', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, optimizer, x, bias, strayVariable, varList, f, cost, expectedValue1, _a, _b, _c, _d, expectedValue2, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    learningRate = .1;
                    optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
                    x = tf.scalar(4).variable();
                    bias = tf.scalar(1).variable();
                    strayVariable = tf.scalar(-1).variable();
                    varList = [x];
                    f = function () { return x.square().addStrict(bias); };
                    cost = optimizer.minimize(f, /* returnCost */ true, varList);
                    expectedValue1 = -2 * 4 * learningRate + 4;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_h.sent(), [expectedValue1]]);
                    // bias should remain unchanged.
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 2:
                    // bias should remain unchanged.
                    _b.apply(void 0, [_h.sent(), [1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 3:
                    _c.apply(void 0, [_h.sent(), [Math.pow(4, 2) + 1]]);
                    // The stray variable should remain unchanged.
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 4:
                    // The stray variable should remain unchanged.
                    _d.apply(void 0, [_h.sent(), [-1]]);
                    cost = optimizer.minimize(f, /* returnCost */ false, varList);
                    expectedValue2 = -2 * expectedValue1 * learningRate + expectedValue1;
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 5:
                    _e.apply(void 0, [_h.sent(), [expectedValue2]]);
                    // Bias still should remain unchanged.
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 6:
                    // Bias still should remain unchanged.
                    _f.apply(void 0, [_h.sent(), [1]]);
                    expect(cost).toBe(null);
                    // The stray variable should remain unchanged.
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 7:
                    // The stray variable should remain unchanged.
                    _g.apply(void 0, [_h.sent(), [-1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('only bias trainable', function () { return __awaiter(_this, void 0, void 0, function () {
        var learningRate, optimizer, trainable, x, bias, strayVariable, f, cost, _a, expectedBias1, _b, _c, _d, _e, expectedBias2, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    learningRate = .1;
                    optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
                    trainable = false;
                    x = tf.scalar(4).variable(trainable);
                    bias = tf.scalar(1).variable();
                    strayVariable = tf.scalar(-1).variable();
                    f = function () { return x.square().addStrict(bias); };
                    cost = optimizer.minimize(f, /* returnCost */ true);
                    // x should not have been updated.
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 1:
                    // x should not have been updated.
                    _a.apply(void 0, [_h.sent(), [4]]);
                    expectedBias1 = -1 * learningRate + 1;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 2:
                    _b.apply(void 0, [_h.sent(), [expectedBias1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, cost.data()];
                case 3:
                    _c.apply(void 0, [_h.sent(), [Math.pow(4, 2) + 1]]);
                    // The stray variable should remain unchanged.
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 4:
                    // The stray variable should remain unchanged.
                    _d.apply(void 0, [_h.sent(), [-1]]);
                    cost = optimizer.minimize(f, /* returnCost */ false);
                    // x should not have been updated.
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, x.data()];
                case 5:
                    // x should not have been updated.
                    _e.apply(void 0, [_h.sent(), [4]]);
                    expectedBias2 = -learningRate + expectedBias1;
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bias.data()];
                case 6:
                    _f.apply(void 0, [_h.sent(), [expectedBias2]]);
                    expect(cost).toBe(null);
                    // The stray variable should remain unchanged.
                    _g = test_util_1.expectArraysClose;
                    return [4 /*yield*/, strayVariable.data()];
                case 7:
                    // The stray variable should remain unchanged.
                    _g.apply(void 0, [_h.sent(), [-1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('only bias trainable, only x in varList throws error', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var trainable = false;
        var x = tf.scalar(4).variable(trainable);
        var bias = tf.scalar(1).variable();
        // stray variable.
        tf.scalar(-1).variable();
        var varList = [x];
        var f = function () { return x.square().addStrict(bias); };
        expect(function () { return optimizer.minimize(f, /* returnCost */ true, varList); })
            .toThrowError();
    });
    it('instanceof Optimizer', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        expect(optimizer instanceof optimizer_1.Optimizer).toBe(true);
    });
    it('throws error when f returns a non-scalar', function () {
        var learningRate = .1;
        var optimizer = new sgd_optimizer_1.SGDOptimizer(learningRate);
        var x = tf.tensor1d([1, 2]).variable();
        var f = function () { return x.square(); };
        // tslint:disable-next-line:no-any
        expect(function () { return optimizer.minimize(f); }).toThrowError();
    });
});
//# sourceMappingURL=optimizer_test.js.map