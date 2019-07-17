"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
jasmine_util_1.describeWithFlags('multinomial', jasmine_util_1.ALL_ENVS, function () {
    var NUM_SAMPLES = 1000;
    // Allowed Variance in probability (in %).
    var EPSILON = 0.05;
    var SEED = 3.14;
    it('Flip a fair coin and check bounds', function () { return __awaiter(_this, void 0, void 0, function () {
        var probs, result, outcomeProbs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    probs = tf.tensor1d([1, 1]);
                    result = tf.multinomial(probs, NUM_SAMPLES, SEED);
                    expect(result.dtype).toBe('int32');
                    expect(result.shape).toEqual([NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [_b.sent(), 2]);
                    test_util_1.expectArraysClose(outcomeProbs, [0.5, 0.5], EPSILON);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Flip a two-sided coin with 100% of heads', function () { return __awaiter(_this, void 0, void 0, function () {
        var logits, result, outcomeProbs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logits = tf.tensor1d([1, -100]);
                    result = tf.multinomial(logits, NUM_SAMPLES, SEED);
                    expect(result.dtype).toBe('int32');
                    expect(result.shape).toEqual([NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [_b.sent(), 2]);
                    test_util_1.expectArraysClose(outcomeProbs, [1, 0], EPSILON);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Flip a two-sided coin with 100% of tails', function () { return __awaiter(_this, void 0, void 0, function () {
        var logits, result, outcomeProbs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    logits = tf.tensor1d([-100, 1]);
                    result = tf.multinomial(logits, NUM_SAMPLES, SEED);
                    expect(result.dtype).toBe('int32');
                    expect(result.shape).toEqual([NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [_b.sent(), 2]);
                    test_util_1.expectArraysClose(outcomeProbs, [0, 1], EPSILON);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Flip a single-sided coin throws error', function () {
        var probs = tf.tensor1d([1]);
        expect(function () { return tf.multinomial(probs, NUM_SAMPLES, SEED); }).toThrowError();
    });
    it('Flip a ten-sided coin and check bounds', function () { return __awaiter(_this, void 0, void 0, function () {
        var numOutcomes, logits, result, outcomeProbs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    numOutcomes = 10;
                    logits = tf.fill([numOutcomes], 1).as1D();
                    result = tf.multinomial(logits, NUM_SAMPLES, SEED);
                    expect(result.dtype).toBe('int32');
                    expect(result.shape).toEqual([NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [_b.sent(), numOutcomes]);
                    expect(outcomeProbs.length).toBeLessThanOrEqual(numOutcomes);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Flip 3 three-sided coins, each coin is 100% biases', function () { return __awaiter(_this, void 0, void 0, function () {
        var numOutcomes, logits, result, outcomeProbs, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    numOutcomes = 3;
                    logits = tf.tensor2d([[-100, -100, 1], [-100, 1, -100], [1, -100, -100]], [3, numOutcomes]);
                    result = tf.multinomial(logits, NUM_SAMPLES, SEED);
                    expect(result.dtype).toBe('int32');
                    expect(result.shape).toEqual([3, NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [(_d.sent()).slice(0, NUM_SAMPLES), numOutcomes]);
                    test_util_1.expectArraysClose(outcomeProbs, [0, 0, 1], EPSILON);
                    _b = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 2:
                    // Second coin always gets middle event.
                    outcomeProbs = _b.apply(void 0, [(_d.sent()).slice(NUM_SAMPLES, 2 * NUM_SAMPLES), numOutcomes]);
                    test_util_1.expectArraysClose(outcomeProbs, [0, 1, 0], EPSILON);
                    _c = computeProbs;
                    return [4 /*yield*/, result.data()];
                case 3:
                    // Third coin always gets first event
                    outcomeProbs =
                        _c.apply(void 0, [(_d.sent()).slice(2 * NUM_SAMPLES), numOutcomes]);
                    test_util_1.expectArraysClose(outcomeProbs, [1, 0, 0], EPSILON);
                    return [2 /*return*/];
            }
        });
    }); });
    it('passing Tensor3D throws error', function () {
        var probs = tf.zeros([3, 2, 2]);
        var normalized = true;
        expect(function () { return tf.multinomial(probs, 3, SEED, normalized); })
            .toThrowError();
    });
    it('throws when passed a non-tensor', function () {
        // tslint:disable-next-line:no-any
        expect(function () { return tf.multinomial({}, NUM_SAMPLES, SEED); })
            .toThrowError(/Argument 'logits' passed to 'multinomial' must be a Tensor/);
    });
    it('accepts a tensor-like object for logits (biased coin)', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, outcomeProbs, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.multinomial([-100, 1], NUM_SAMPLES, SEED);
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([NUM_SAMPLES]);
                    _a = computeProbs;
                    return [4 /*yield*/, res.data()];
                case 1:
                    outcomeProbs = _a.apply(void 0, [_b.sent(), 2]);
                    test_util_1.expectArraysClose(outcomeProbs, [0, 1], EPSILON);
                    return [2 /*return*/];
            }
        });
    }); });
    function computeProbs(events, numOutcomes) {
        var counts = [];
        for (var i = 0; i < numOutcomes; ++i) {
            counts[i] = 0;
        }
        var numSamples = events.length;
        for (var i = 0; i < events.length; ++i) {
            counts[events[i]]++;
        }
        // Normalize counts to be probabilities between [0, 1].
        for (var i = 0; i < counts.length; i++) {
            counts[i] /= numSamples;
        }
        return counts;
    }
});
//# sourceMappingURL=multinomial_test.js.map