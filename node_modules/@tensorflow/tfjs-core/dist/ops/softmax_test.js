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
jasmine_util_1.describeWithFlags('softmax', jasmine_util_1.ALL_ENVS, function () {
    it('regular test', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    y = tf.softmax(tf.tensor1d([2, 1, 3]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0.24472847, 0.09003057, 0.66524095]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.sum().data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('overflow', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.softmax(tf.tensor1d([100, 100]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('underflow', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.softmax(tf.tensor1d([-100, -100]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Huge difference between probabilities', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.softmax(tf.tensor1d([-1000, +1000]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 1, NaN]);
                    y = tf.softmax(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, dim=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.softmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]), 1);
                    expected = [
                        0.24472847, 0.09003057, 0.66524095, 0.09003057, 0.66524095, 0.24472847
                    ];
                    expect(y.rank).toBe(2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, implicit dim=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.softmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]));
                    expected = [
                        0.24472847, 0.09003057, 0.66524095, 0.09003057, 0.66524095, 0.24472847
                    ];
                    expect(y.rank).toBe(2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, dim=0 throws error', function () {
        var f = function () {
            tf.softmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]), 0);
        };
        expect(f).toThrowError();
    });
    it('1D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, y, dy, dx, totalSum, dyVals, sumVals, yVals, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([10, 0, -1]);
                    y = tf.softmax(x);
                    dy = tf.tensor1d([1, 2, 3]);
                    dx = tf.grad(function (x) { return x.softmax(); })(x, dy);
                    totalSum = tf.sum(tf.mul(dy, y));
                    return [4 /*yield*/, dy.array()];
                case 1:
                    dyVals = _b.sent();
                    return [4 /*yield*/, totalSum.array()];
                case 2:
                    sumVals = _b.sent();
                    return [4 /*yield*/, y.array()];
                case 3:
                    yVals = _b.sent();
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 4:
                    _a.apply(void 0, [_b.sent(), [
                            (dyVals[0] - sumVals) * yVals[0],
                            (dyVals[1] - sumVals) * yVals[1],
                            (dyVals[2] - sumVals) * yVals[2],
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var x = tf.tensor1d([10, 0, -1]);
        var dx = tf.grad(function (x) { return x.clone().softmax().clone(); })(x);
        expect(dx.shape).toEqual(x.shape);
        expect(dx.dtype).toBe('float32');
    });
    it('2D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, y, dy, dx, axis, totalSum, dyVals, sumVals, yVals, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([10, 0, -1, 5, 4, 3], [2, 3]);
                    y = tf.softmax(x);
                    dy = tf.tensor2d([3, 2, 1, 1, 2, 3], [2, 3]);
                    dx = tf.grad(function (x) { return x.softmax(); })(x, dy);
                    axis = -1;
                    totalSum = tf.sum(tf.mulStrict(dy, y), axis);
                    return [4 /*yield*/, dy.array()];
                case 1:
                    dyVals = _b.sent();
                    return [4 /*yield*/, totalSum.array()];
                case 2:
                    sumVals = _b.sent();
                    return [4 /*yield*/, y.array()];
                case 3:
                    yVals = _b.sent();
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 4:
                    _a.apply(void 0, [_b.sent(), [
                            (dyVals[0][0] - sumVals[0]) * yVals[0][0],
                            (dyVals[0][1] - sumVals[0]) * yVals[0][1],
                            (dyVals[0][2] - sumVals[0]) * yVals[0][2],
                            (dyVals[1][0] - sumVals[1]) * yVals[1][0],
                            (dyVals[1][1] - sumVals[1]) * yVals[1][1],
                            (dyVals[1][2] - sumVals[1]) * yVals[1][2]
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.softmax({}); })
            .toThrowError(/Argument 'logits' passed to 'softmax' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    y = tf.softmax([2, 1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0.24472847, 0.09003057, 0.66524095]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.sum().data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('logSoftmax', jasmine_util_1.ALL_ENVS, function () {
    it('regular test', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.logSoftmax(tf.tensor1d([2, 1, 3]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1.407606, -2.4076061, -0.407606]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Huge difference', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.logSoftmax(tf.tensor1d([-1000, +1000]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-2000, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 1, NaN]);
                    y = tf.logSoftmax(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.logSoftmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]), 1);
                    expected = [-1.407606, -2.4076061, -0.407606, -2.4076061, -0.4076061, -1.4076061];
                    expect(y.rank).toBe(2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, implicit axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.logSoftmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]));
                    expected = [-1.407606, -2.4076061, -0.407606, -2.4076061, -0.4076061, -1.4076061];
                    expect(y.rank).toBe(2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 2, 10]);
                    dy = tf.tensor1d([1, 2, 3]);
                    dx = tf.grad(function (x) { return x.logSoftmax(); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.9992599, 1.9979881, -2.9972477]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0 throws error', function () {
        var f = function () {
            tf.logSoftmax(tf.tensor2d([[2, 1, 3], [1, 3, 2]], [2, 3]), 0);
        };
        expect(f).toThrowError();
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.logSoftmax({}); })
            .toThrowError(/Argument 'logits' passed to 'logSoftmax' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    y = tf.logSoftmax([2, 1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1.407606, -2.4076061, -0.407606]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=softmax_test.js.map