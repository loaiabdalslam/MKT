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
jasmine_util_1.describeWithFlags('computeWeightedLoss', jasmine_util_1.ALL_ENVS, function () {
    it('1D - no weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    y = tf.losses.computeWeightedLoss(losses);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 + 2 + 3) / 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - no weights - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - no weights - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 + 2 + 3) / 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - no weights - Reduction.SUM', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.SUM);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 + 2 + 3)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    weights = tf.tensor1d([0.1, 0, 0.3]);
                    y = tf.losses.computeWeightedLoss(losses, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 * 0.1 + 2 * 0 + 3 * 0.3) / 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights - broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    y = tf.losses.computeWeightedLoss(losses, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.06666667]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weights - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 * 0.1, 2 * 0.2, 3 * 0.3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weights - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 * 0.1 + 2 * 0.2 + 3 * 0.3) / 0.6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weights - Reduction.SUM', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor1d([1, 2, 3]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.SUM);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 * 0.1 + 2 * 0.2 + 3 * 0.3)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - no weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (4 + 8 + 12 + 8 + 1 + 3) / 6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6) / 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - no weights - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (4 + 8 + 12 + 8 + 1 + 3) / 6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6) / 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights - broadcast - MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (0.3 + 0.1 + 0.2) / (3 * 0.6)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - no weights - Reduction.SUM', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.SUM);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (4 + 8 + 12 + 8 + 1 + 3)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights - Reduction.SUM', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.SUM);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (4 * 1 + 8 * 0 + 12 * 2 + (8 * -5) + 1 * 0 + 3 * 6)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - no weights - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 8, 12, 8, 1, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weights - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);
                    y = tf.losses.computeWeightedLoss(losses, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4 * 1, 8 * 0, 12 * 2, (8 * -5), 1 * 0, 3 * 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed losses as a non-tensor', function () {
        var weights = tf.tensor2d([1, 0, 2, -5, 0, 6], [2, 3]);
        var e = /Argument 'losses' passed to 'computeWeightedLoss' must be a Tensor/;
        expect(function () { return tf.losses.computeWeightedLoss({}, weights, tf.Reduction.NONE); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var losses = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var e = /Argument 'weights' passed to 'computeWeightedLoss' must be a Tensor/;
        expect(function () { return tf.losses.computeWeightedLoss(losses, {}, tf.Reduction.NONE); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var losses, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    losses = [1, 2, 3];
                    weights = [0.1, 0, 0.3];
                    y = tf.losses.computeWeightedLoss(losses, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 * 0.1 + 2 * 0 + 3 * 0.3) / 2]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('absoluteDifference', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.absoluteDifference(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(1 - 0.3) + Math.abs(2 - (-0.6)) + Math.abs(3 - (-0.1))) / 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(1 - 0.3) * 0.1 + Math.abs(2 - (-0.6)) * 0.2 +
                            Math.abs(3 - (-0.1)) * 0.3) /
                            3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.abs(1 - 0.3) * 0.1, Math.abs(2 - (-0.6)) * 0.2,
                            Math.abs(3 - (-0.1)) * 0.3
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.absoluteDifference(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(1 - 0.3) + Math.abs(2 - (-0.6)) + Math.abs(3 - (-0.1))) / 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((Math.abs(1 - 0.3) * 0.1) + (Math.abs(2 - (-0.6)) * 0.2) +
                            (Math.abs(3 - (-0.1)) * 0.3)) /
                            0.6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.absoluteDifference(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(4 - 1) + Math.abs(8 - 9) + Math.abs(12 - 2) +
                            Math.abs(8 - (-5)) + Math.abs(1 - (-2)) + Math.abs(3 - 6)) /
                            6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(4 - 1) * 3 + Math.abs(8 - 9) * 0 + Math.abs(12 - 2) * 5 +
                            Math.abs(8 - (-5)) * 0 + Math.abs(1 - (-2)) * 4 +
                            Math.abs(3 - 6) * 2) /
                            4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.abs(4 - 1) * 3, Math.abs(8 - 9) * 6, Math.abs(12 - 2) * 5,
                            Math.abs(8 - (-5)) * 0, Math.abs(1 - (-2)) * 4, Math.abs(3 - 6) * 2
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.absoluteDifference(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(4 - 1) + Math.abs(8 - 9) + Math.abs(12 - 2) +
                            Math.abs(8 - (-5)) + Math.abs(1 - (-2)) + Math.abs(3 - 6)) /
                            6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.absoluteDifference(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (Math.abs(4 - 1) * 3 + Math.abs(8 - 9) * 6 + Math.abs(12 - 2) * 5 +
                            Math.abs(8 - (-5)) * 0 + Math.abs(1 - (-2)) * 4 +
                            Math.abs(3 - 6) * 2) /
                            20]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = /Argument 'labels' passed to 'absoluteDifference' must be a Tensor/;
        expect(function () { return tf.losses.absoluteDifference({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'absoluteDifference\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.absoluteDifference(label, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var e = /Argument 'weights' passed to 'absoluteDifference' must be a Tensor/;
        expect(function () { return tf.losses.absoluteDifference(label, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = [1, 2, 3];
                    label = [0.3, -0.6, -0.1];
                    weights = [0.1, 0.2, 0.3];
                    y = tf.losses.absoluteDifference(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.abs(1 - 0.3) * 0.1, Math.abs(2 - (-0.6)) * 0.2,
                            Math.abs(3 - (-0.1)) * 0.3
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('meanSquaredError', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.meanSquaredError(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - 0.3) * (1 - 0.3) + (2 - (-0.6)) * (2 - (-0.6)) +
                            (3 - (-0.1)) * (3 - (-0.1))) /
                            3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - 0.3) * (1 - 0.3) * 0.1 + (2 - (-0.6)) * (2 - (-0.6)) * 0.2 +
                            (3 - (-0.1)) * (3 - (-0.1)) * 0.3) /
                            3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            (1 - 0.3) * (1 - 0.3) * 0.1, (2 - (-0.6)) * (2 - (-0.6)) * 0.2,
                            (3 - (-0.1)) * (3 - (-0.1)) * 0.3
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.meanSquaredError(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - 0.3) * (1 - 0.3) + (2 - (-0.6)) * (2 - (-0.6)) +
                            (3 - (-0.1)) * (3 - (-0.1))) /
                            3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        (((1 - 0.3) * (1 - 0.3) * 0.1) + ((2 - (-0.6)) * (2 - (-0.6)) * 0.2) +
                            ((3 - (-0.1)) * (3 - (-0.1)) * 0.3)) /
                            0.6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.meanSquaredError(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((4 - 1) * (4 - 1) + (8 - 9) * (8 - 9) + (12 - 2) * (12 - 2) +
                            (8 - (-5)) * (8 - (-5)) + (1 - (-2)) * (1 - (-2)) +
                            (3 - 6) * (3 - 6)) /
                            6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((4 - 1) * (4 - 1) * 3 + (8 - 9) * (8 - 9) * 0 +
                            (12 - 2) * (12 - 2) * 5 + (8 - (-5)) * (8 - (-5)) * 0 +
                            (1 - (-2)) * (1 - (-2)) * 4 + (3 - 6) * (3 - 6) * 2) /
                            4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            (4 - 1) * (4 - 1) * 3, (8 - 9) * (8 - 9) * 6, (12 - 2) * (12 - 2) * 5,
                            (8 - (-5)) * (8 - (-5)) * 0, (1 - (-2)) * (1 - (-2)) * 4,
                            (3 - 6) * (3 - 6) * 2
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.meanSquaredError(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((4 - 1) * (4 - 1) + (8 - 9) * (8 - 9) + (12 - 2) * (12 - 2) +
                            (8 - (-5)) * (8 - (-5)) + (1 - (-2)) * (1 - (-2)) +
                            (3 - 6) * (3 - 6)) /
                            6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.meanSquaredError(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((4 - 1) * (4 - 1) * 3 + (8 - 9) * (8 - 9) * 6 +
                            (12 - 2) * (12 - 2) * 5 + (8 - (-5)) * (8 - (-5)) * 0 +
                            (1 - (-2)) * (1 - (-2)) * 4 + (3 - 6) * (3 - 6) * 2) /
                            20]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = /Argument 'labels' passed to 'meanSquaredError' must be a Tensor/;
        expect(function () { return tf.losses.meanSquaredError({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'meanSquaredError\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.meanSquaredError(label, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var e = /Argument 'weights' passed to 'meanSquaredError' must be a Tensor/;
        expect(function () { return tf.losses.meanSquaredError(label, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = [1, 2, 3];
                    label = [0.3, -0.6, -0.1];
                    weights = [0.1, 0.2, 0.3];
                    y = tf.losses.meanSquaredError(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            (1 - 0.3) * (1 - 0.3) * 0.1, (2 - (-0.6)) * (2 - (-0.6)) * 0.2,
                            (3 - (-0.1)) * (3 - (-0.1)) * 0.3
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('cosineDistance', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.cosineDistance(label, predictions, 0);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1)]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.scalar(0.1);
                    y = tf.losses.cosineDistance(label, predictions, 0, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1)) * 0.1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.scalar(0.1);
                    y = tf.losses.cosineDistance(label, predictions, 0, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1)) * 0.1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.cosineDistance(label, predictions, 0, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), (1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1))]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([1, 2, 3]);
                    label = tf.tensor1d([0.3, -0.6, -0.1]);
                    weights = tf.scalar(0.1);
                    y = tf.losses.cosineDistance(label, predictions, 0, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), ((1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1)) * 0.1) / 0.1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.cosineDistance(label, predictions, 1);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - (4 * 1 + 8 * 9 + 12 * 2)) + (1 - (8 * -5 + 1 * -2 + 3 * 6))) / 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 0], [2, 1]);
                    y = tf.losses.cosineDistance(label, predictions, 1, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - (4 * 1 + 8 * 9 + 12 * 2)) * 3 +
                            (1 - (8 * -5 + 1 * -2 + 3 * 6)) * 0) /
                            1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 0], [2, 1]);
                    y = tf.losses.cosineDistance(label, predictions, 1, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            (1 - (4 * 1 + 8 * 9 + 12 * 2)) * 3, (1 - (8 * -5 + 1 * -2 + 3 * 6)) * 0
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    y = tf.losses.cosineDistance(label, predictions, 1, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - (4 * 1 + 8 * 9 + 12 * 2)) + (1 - (8 * -5 + 1 * -2 + 3 * 6))) / 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
                    label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
                    weights = tf.tensor2d([3, 0], [2, 1]);
                    y = tf.losses.cosineDistance(label, predictions, 1, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        ((1 - (4 * 1 + 8 * 9 + 12 * 2)) * 3 +
                            (1 - (8 * -5 + 1 * -2 + 3 * 6)) * 0) /
                            3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = /Argument 'labels' passed to 'cosineDistance' must be a Tensor/;
        expect(function () { return tf.losses.cosineDistance({}, predictions, 0, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'cosineDistance\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.cosineDistance(label, {}, 0, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var predictions = tf.tensor2d([4, 8, 12, 8, 1, 3], [2, 3]);
        var label = tf.tensor2d([1, 9, 2, -5, -2, 6], [2, 3]);
        var e = /Argument 'weights' passed to 'cosineDistance' must be a Tensor/;
        expect(function () { return tf.losses.cosineDistance(label, predictions, 0, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = [1, 2, 3];
                    label = [0.3, -0.6, -0.1];
                    weights = 0.1;
                    y = tf.losses.cosineDistance(label, predictions, 0, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(1 - (1 * 0.3 + 2 * -0.6 + 3 * -0.1)) * 0.1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('hingeLoss', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([0, 0, 1, 1]);
                    label = tf.tensor1d([0, 1, 0, 1]);
                    y = tf.losses.hingeLoss(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([0, 0, 1, 1]);
                    label = tf.tensor1d([0, 1, 0, 1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3, 0.4]);
                    y = tf.losses.hingeLoss(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.225]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([0, 0, 1, 1]);
                    label = tf.tensor1d([0, 1, 0, 1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3, 0.4]);
                    y = tf.losses.hingeLoss(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.6, 0.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([0, 0, 1, 1]);
                    label = tf.tensor1d([0, 1, 0, 1]);
                    y = tf.losses.hingeLoss(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor1d([0, 0, 1, 1]);
                    label = tf.tensor1d([0, 1, 0, 1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3, 0.4]);
                    y = tf.losses.hingeLoss(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.9]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([0, 0, 0, 1, 1, 1], [2, 3]);
                    label = tf.tensor2d([0, 1, 0, 1, 0, 1], [2, 3]);
                    y = tf.losses.hingeLoss(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.8333333]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([0, 0, 0, 1, 1, 1], [2, 3]);
                    label = tf.tensor2d([0, 1, 0, 1, 0, 1], [2, 3]);
                    weights = tf.tensor2d([0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [2, 3]);
                    y = tf.losses.hingeLoss(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.26666668]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([0, 0, 0, 1, 1, 1], [2, 3]);
                    label = tf.tensor2d([0, 1, 0, 1, 0, 1], [2, 3]);
                    weights = tf.tensor2d([0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [2, 3]);
                    y = tf.losses.hingeLoss(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.3, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([0, 0, 0, 1, 1, 1], [2, 3]);
                    label = tf.tensor2d([0, 1, 0, 1, 0, 1], [2, 3]);
                    y = tf.losses.hingeLoss(label, predictions, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.8333333]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = tf.tensor2d([0, 0, 0, 1, 1, 1], [2, 3]);
                    label = tf.tensor2d([0, 1, 0, 1, 0, 1], [2, 3]);
                    weights = tf.tensor2d([0.1, 0.2, 0.3, 0.4, 0.5, 0.6], [2, 3]);
                    y = tf.losses.hingeLoss(label, predictions, weights, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.76190484]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var weights = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var e = /Argument 'labels' passed to 'hingeLoss' must be a Tensor/;
        expect(function () { return tf.losses.hingeLoss({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var label = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var weights = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'hingeLoss\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.hingeLoss(label, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var predictions = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var label = tf.tensor2d([1, 0, 1, 0, 1, 0], [2, 3]);
        var e = /Argument 'weights' passed to 'hingeLoss' must be a Tensor/;
        expect(function () { return tf.losses.hingeLoss(label, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var predictions, label, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    predictions = [0, 0, 1, 1];
                    label = [0, 1, 0, 1];
                    weights = [0.1, 0.2, 0.3, 0.4];
                    y = tf.losses.hingeLoss(label, predictions, weights, tf.Reduction.NONE);
                    expect(y.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.6, 0.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('logLoss', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    y = tf.losses.logLoss(labels, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2.668788]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Check for negative values', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, -0.6, -0.1]);
                    y = tf.losses.logLoss(labels, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.logLoss(labels, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.7168596]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.logLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.12039725, 0.02107204, 2.0091095]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    y = tf.losses.logLoss(labels, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2.668788]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.logLoss(labels, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3.5842977]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    y = tf.losses.logLoss(labels, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.60019904]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.logLoss(labels, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.8866577]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.logLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.9527497, 0., 1.8451363, 0., 1.3829476, 1.3657978]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    y = tf.losses.logLoss(labels, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.60019904]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.logLoss(labels, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.53904504]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = /Argument 'labels' passed to 'logLoss' must be a Tensor/;
        expect(function () { return tf.losses.logLoss({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'logLoss\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.logLoss(labels, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
        var predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
        var e = /Argument 'weights' passed to 'logLoss' must be a Tensor/;
        expect(function () { return tf.losses.logLoss(labels, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = [1, 2, 3];
                    predictions = [0.3, 0.6, 0.1];
                    weights = [0.1, 0.2, 0.3];
                    y = tf.losses.logLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.12039725, 0.02107204, 2.0091095]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('huberLoss', jasmine_util_1.ALL_ENVS, function () {
    it('1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    y = tf.losses.huberLoss(labels, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.1816667]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - delta', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, delta, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    delta = 0.4;
                    y = tf.losses.huberLoss(labels, predictions, undefined, delta);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.58666664]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.huberLoss(labels, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.30816665]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.huberLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.0245, 0.17999999, 0.72]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    y = tf.losses.huberLoss(labels, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.1816667]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([1, 2, 3]);
                    predictions = tf.tensor1d([0.3, 0.6, 0.1]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.huberLoss(labels, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.5408332]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    y = tf.losses.huberLoss(labels, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.01795]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.huberLoss(labels, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.040875003]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.huberLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.135, 0., 0.001, 0., 0.005, 0.0225]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    y = tf.losses.huberLoss(labels, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.01795]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D - weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
                    predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
                    weights = tf.tensor2d([3, 0, 5, 0, 4, 2], [2, 3]);
                    y = tf.losses.huberLoss(labels, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0.011678572]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed label as a non-tensor', function () {
        var predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = /Argument 'labels' passed to 'huberLoss' must be a Tensor/;
        expect(function () { return tf.losses.huberLoss({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed label as a non-tensor', function () {
        var labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
        var weights = tf.tensor2d([3, 6, 5, 0, 4, 2], [2, 3]);
        var e = new RegExp('Argument \'predictions\' passed to \'huberLoss\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.huberLoss(labels, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var labels = tf.tensor2d([0.4, 0.8, 0.12, 0.8, 0.1, 0.3], [2, 3]);
        var predictions = tf.tensor2d([0.1, 0.7, 0.1, 0.5, 0.05, 0.15], [2, 3]);
        var e = /Argument 'weights' passed to 'huberLoss' must be a Tensor/;
        expect(function () { return tf.losses.huberLoss(labels, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = [1, 2, 3];
                    predictions = [0.3, 0.6, 0.1];
                    weights = [0.1, 0.2, 0.3];
                    y = tf.losses.huberLoss(labels, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.0245, 0.17999999, 0.72]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('sigmoidCrossEntropy', jasmine_util_1.ALL_ENVS, function () {
    it('All wrong', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 6.6667123]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('All right', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[1, 0, 0], [0, 1, 0], [0, 0, 1]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1.3333424]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1.0000046, 9.0797803e-06, 3.0000138e+00, 1.0000046e+00, 2.0000093e+00,
                            1.3619671e-05, 4.5398901e-06, 2.0000093e+00, 3.0000138e+00
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 6.6667123]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    y = tf.losses.sigmoidCrossEntropy(label, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        6.666712284088135]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Label Smoothing - Weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, labelSmoothing, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    labelSmoothing = 0.3;
                    y = tf.losses.sigmoidCrossEntropy(label, predictions, weights, labelSmoothing, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 6.1667128]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when multiClassLabels and logits are of different shapes', function () {
        var multiClassLabels = tf.tensor2d([10, 10, 10, 10, 10, 10, 10, 10, 10], [3, 3]);
        var logits = tf.tensor2d([10, 10, 10, 10, 10, 10], [2, 3]);
        var e = new RegExp('Error in sigmoidCrossEntropy:  Shapes 3,3 and 2,3 must match');
        expect(function () { return tf.losses.sigmoidCrossEntropy(multiClassLabels, logits); })
            .toThrowError(e);
    });
    it('throws when passed multiClassLabels as a non-tensor', function () {
        var predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
        var weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
        var e = new RegExp('Argument \'multiClassLabels\' passed to \'sigmoidCrossEntropy\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.sigmoidCrossEntropy({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed logits as a non-tensor', function () {
        var label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
        var weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
        var e = new RegExp('Argument \'logits\' passed to \'sigmoidCrossEntropy\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.sigmoidCrossEntropy(label, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
        var predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
        var e = /Argument 'weights' passed to 'sigmoidCrossEntropy' must be a Tensor/;
        expect(function () { return tf.losses.sigmoidCrossEntropy(label, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
});
jasmine_util_1.describeWithFlags('softmaxCrossEntropy', jasmine_util_1.ALL_ENVS, function () {
    it('All wrong', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 20]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('All right', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[1, 0, 0], [0, 1, 0], [0, 0, 1]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.SUM_BY_NONZERO_WEIGHTS', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.1, 0.2, 0.3]]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions, weights);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.NONE', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions, weights, undefined, tf.Reduction.NONE);
                    expect(y.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions, undefined, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 20]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor1d([0.1, 0.2, 0.3]);
                    y = tf.losses.softmaxCrossEntropy(label, predictions, weights, undefined, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        20]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Label Smoothing - Weighted - Reduction.MEAN', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, weights, labelSmoothing, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
                    predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
                    weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
                    labelSmoothing = 0.3;
                    y = tf.losses.softmaxCrossEntropy(label, predictions, weights, labelSmoothing, tf.Reduction.MEAN);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 18]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when multiClassLabels and logits are of different shapes', function () {
        var multiClassLabels = tf.tensor2d([10, 10, 10, 10, 10, 10, 10, 10, 10], [3, 3]);
        var logits = tf.tensor2d([10, 10, 10, 10, 10, 10], [2, 3]);
        var e = new RegExp('Error in softmaxCrossEntropy:  Shapes 3,3 and 2,3 must match');
        expect(function () { return tf.losses.softmaxCrossEntropy(multiClassLabels, logits); })
            .toThrowError(e);
    });
    it('throws when passed multiClassLabels as a non-tensor', function () {
        var predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
        var weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
        var e = new RegExp('Argument \'onehotLabels\' passed to \'softmaxCrossEntropy\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.softmaxCrossEntropy({}, predictions, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed logits as a non-tensor', function () {
        var label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
        var weights = tf.tensor2d([[0.1, 0.2, 0.3]]);
        var e = new RegExp('Argument \'logits\' passed to \'softmaxCrossEntropy\' ' +
            'must be a Tensor');
        expect(function () { return tf.losses.softmaxCrossEntropy(label, {}, weights, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('throws when passed weights as a non-tensor', function () {
        var label = tf.tensor2d([[0, 0, 1], [1, 0, 0], [0, 1, 0]], [3, 3]);
        var predictions = tf.tensor2d([[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]], [3, 3]);
        var e = /Argument 'weights' passed to 'softmaxCrossEntropy' must be a Tensor/;
        expect(function () { return tf.losses.softmaxCrossEntropy(label, predictions, {}, tf.Reduction.MEAN); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var label, predictions, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    label = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
                    predictions = [[10.0, -10.0, -10.0], [-10.0, 10.0, -10.0], [-10.0, -10.0, 10.0]];
                    y = tf.losses.softmaxCrossEntropy(label, predictions);
                    expect(y.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 20]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=loss_ops_test.js.map