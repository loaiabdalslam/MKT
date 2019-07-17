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
jasmine_util_1.describeWithFlags('slice1d', jasmine_util_1.ALL_ENVS, function () {
    it('slices 1x1 into 1x1 (effectively a copy)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([5]);
                    result = tf.slice1d(a, 0, 1);
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 5x1 into shape 2x1 starting at 3', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4, 5]);
                    result = tf.slice1d(a, 3, 2);
                    expect(result.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 5x1 into shape 3x1 starting at 1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4, 5]);
                    result = tf.slice1d(a, 1, 3);
                    expect(result.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4, 5]);
                    dy = tf.tensor1d([10, 100]);
                    da = tf.grad(function (a) { return tf.slice1d(a, 1, 2); })(a, dy);
                    expect(da.shape).toEqual([5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 10, 100, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4, 5]);
                    dy = tf.tensor1d([10, 100]);
                    da = tf.grad(function (a) { return tf.slice1d(a.clone(), 1, 2).clone(); })(a, dy);
                    expect(da.shape).toEqual([5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 10, 100, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [5];
                    result = tf.slice1d(a, 0, 1);
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 5]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice2d', jasmine_util_1.ALL_ENVS, function () {
    it('slicing a 1x1 from a 1x1 returns a 1x1', function () {
        var a = tf.tensor2d([0], [1, 1]);
        var b = tf.slice2d(a, [0, 0], [1, 1]);
        expect(b.shape).toEqual([1, 1]);
    });
    it('returns a tensor of slice size', function () {
        var a = tf.zeros([100, 100]);
        var b = tf.slice2d(a, [0, 0], [12, 34]);
        expect(b.shape).toEqual([12, 34]);
    });
    it('returns the upper-left submatrix when begin is [0, 0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, aValues, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.randomUniform([10, 10], -1, 1);
                    b = tf.slice2d(a, [0, 0], [2, 2]);
                    return [4 /*yield*/, a.data()];
                case 1:
                    aValues = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [aValues[0], aValues[1], aValues[10], aValues[11]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns the rectangle specified', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [4, 3]);
                    b = tf.slice2d(a, [1, 1], [3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 8, 9, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when requesting out of bounds slice', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [4, 3]);
        expect(function () { return tf.slice2d(a, [1, 1], [10, 10]); }).toThrowError();
    });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
                    dy = tf.tensor2d([[20], [50]]);
                    da = tf.grad(function (x) { return tf.slice2d(a, [0, 1], [2, 1]); })(a, dy);
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 20, 0, 0, 50, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () {
        var a = [[0]]; // 1x1
        var b = tf.slice2d(a, [0, 0], [1, 1]);
        expect(b.shape).toEqual([1, 1]);
    });
    it('slice an already sliced tensor, first was not continous', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1]);
                    c = tf.slice(b, [1, 1], [1, 1]);
                    expect(c.shape).toEqual([1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slice an already sliced tensor, first was continous', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [1, 0]);
                    c = tf.slice(b, [1, 0]);
                    expect(c.shape).toEqual([1, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slice an already sliced tensor and do async read', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1]);
                    c = tf.slice(b, [1, 1], [1, 1]);
                    expect(c.shape).toEqual([1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), new Float32Array([7])]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('square a sliced texture, followed by non-sliced texture of same shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, slicedInput, a, _a, b, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor([[1, 2, 3], [4, 5, 6]]).abs().as2D(3, 2);
                    slicedInput = tf.slice(input, [0, 0], [3, 2]);
                    a = slicedInput.square();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 4, 9, 16, 25, 36]]);
                    b = tf.square(input);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 4, 9, 16, 25, 36]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('square a non-sliced texture, followed by a sliced texture of same shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, slicedInput, a, _a, b, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor([[1, 2, 3], [4, 5, 6]]).abs().as2D(3, 2);
                    slicedInput = tf.slice(input, [0, 0], [3, 2]);
                    a = input.square();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 4, 9, 16, 25, 36]]);
                    b = tf.square(slicedInput);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 4, 9, 16, 25, 36]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slice a tensor and do async read', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, vals;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1], [3, 2]);
                    expect(b.shape).toEqual([3, 2]);
                    return [4 /*yield*/, b.data()];
                case 1:
                    vals = _a.sent();
                    test_util_1.expectArraysClose(vals, new Float32Array([2, 3, 6, 7, 10, 11]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('flatten a sliced tensor that was continous in memory', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [1, 0]).flatten();
                    expect(b.shape).toEqual([8]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 7, 8, 9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slice a tensor that was not continous in memory', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1]);
                    expect(b.shape).toEqual([3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4, 6, 7, 8, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('flatten a sliced tensor that was not continous in memory', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1]).flatten();
                    expect(b.shape).toEqual([9]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4, 6, 7, 8, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('flatten a sliced tensor not continous in memory and run program', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [
                        [1, 2, 3, 4],
                        [5, 6, 7, 8],
                        [9, 10, 11, 12],
                    ];
                    b = tf.slice(a, [0, 1]).flatten();
                    c = tf.square(b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 9, 16, 36, 49, 64, 100, 121, 144]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reshape a sliced 1d into a 2d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 2, 3, 4, 5];
                    b = tf.slice(a, 1).as2D(2, 2);
                    expect(b.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reshape a sliced 1d into a 2d tensor and run program', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 2, 3, 4, 5];
                    b = tf.slice(a, 1).as2D(2, 2).square();
                    expect(b.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 9, 16, 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast the original with the sliced tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[1, 2], [3, 4]];
                    b = tf.slice(a, [0, 1]);
                    c = tf.add(a, b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('zero-sized slice out of a non-zero sized tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.zeros([4, 2]);
                    res = tf.slice(a, [0, 0], [0, 2]);
                    expect(res.shape).toEqual([0, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('zero-sized slice out of a zero-sized tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.zeros([0, 4]);
                    res = tf.slice(a, [0, 1], [0, 3]);
                    expect(res.shape).toEqual([0, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice3d', jasmine_util_1.ALL_ENVS, function () {
    it('slices 1x1x1 into shape 1x1x1 (effectively a copy)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[5]]], [1, 1, 1]);
                    result = tf.slice3d(a, [0, 0, 0], [1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array into 1x2x2 starting at [1, 0, 0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = tf.slice3d(a, [1, 0, 0], [1, 2, 2]);
                    expect(result.shape).toEqual([1, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array into 2x1x1 starting at [0, 1, 1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = tf.slice3d(a, [0, 1, 1], [2, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[5]]];
                    result = tf.slice3d(a, [0, 0, 0], [1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice4d', jasmine_util_1.ALL_ENVS, function () {
    it('slices 1x1x1x1 into shape 1x1x1x1 (effectively a copy)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([[[[5]]]], [1, 1, 1, 1]);
                    result = tf.slice4d(a, [0, 0, 0, 0], [1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2 array into 1x2x2x2 starting at [1, 0, 0, 0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 11, 22, 33, 44, 55, 66, 77, 88], [2, 2, 2, 2]);
                    result = tf.slice4d(a, [1, 0, 0, 0], [1, 2, 2, 2]);
                    expect(result.shape).toEqual([1, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 22, 33, 44, 55, 66, 77, 88]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2 array into 2x1x1x1 starting at [0, 1, 1, 1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 11, 22, 33, 44, 55, 66, 77, 88], [2, 2, 2, 2]);
                    result = tf.slice4d(a, [0, 1, 1, 1], [2, 1, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8, 88]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[[5]]]];
                    result = tf.slice4d(a, [0, 0, 0, 0], [1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice5d', jasmine_util_1.ALL_ENVS, function () {
    it('slices 1x1x1x1x1 into shape 1x1x1x1x1 (effectively a copy)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([[[[[5]]]]], [1, 1, 1, 1, 1]);
                    result = tf.slice(a, [0, 0, 0, 0, 0], [1, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2x2 array into 1x2x2x2x2 starting at [1,0,0,0,0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 11, 22, 33, 44, 55, 66,
                        77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                    ], [2, 2, 2, 2, 2]);
                    result = tf.slice(a, [1, 0, 0, 0, 0], [1, 2, 2, 2, 2]);
                    expect(result.shape).toEqual([1, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            11, 22, 33, 44, 55, 66, 77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2x2 array into 2x1x1x1x1 starting at [0,1,1,1,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 11, 22, 33, 44, 55, 66,
                        77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                    ], [2, 2, 2, 2, 2]);
                    result = tf.slice(a, [0, 1, 1, 1, 1], [2, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [16, 888]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[[[5]]]]];
                    result = tf.slice(a, [0, 0, 0, 0, 0], [1, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice6d', jasmine_util_1.ALL_ENVS, function () {
    it('slices 1x1x1x1x1x1 into shape 1x1x1x1x1x1 (effectively a copy)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([[[[[[5]]]]]], [1, 1, 1, 1, 1, 1]);
                    result = tf.slice(a, [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2x2x2 array into 1x2x2x2x2x2 starting at [1,0,0,0,0,0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 310, 311,
                        312, 313, 314, 315, 316, 311, 322, 333, 344, 355, 366,
                        377, 388, 3111, 3222, 3333, 3444, 3555, 3666, 3777, 3888,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 11, 22, 33, 44, 55, 66,
                        77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                    ], [2, 2, 2, 2, 2, 2]);
                    result = tf.slice(a, [1, 0, 0, 0, 0, 0], [1, 2, 2, 2, 2, 2]);
                    expect(result.shape).toEqual([1, 2, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                            12, 13, 14, 15, 16, 11, 22, 33, 44, 55, 66,
                            77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2x2x2x2 array into 2x1x1x1x1x1 starting at [0,1,1,1,1,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 310, 311,
                        312, 313, 314, 315, 316, 311, 322, 333, 344, 355, 366,
                        377, 388, 3111, 3222, 3333, 3444, 3555, 3666, 3777, 3888,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                        12, 13, 14, 15, 16, 11, 22, 33, 44, 55, 66,
                        77, 88, 111, 222, 333, 444, 555, 666, 777, 888
                    ], [2, 2, 2, 2, 2, 2]);
                    result = tf.slice(a, [0, 1, 1, 1, 1, 1], [2, 1, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3888, 888]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[[[[5]]]]]];
                    result = tf.slice(a, [0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1]);
                    expect(result.shape).toEqual([1, 1, 1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('slice ergonomics', jasmine_util_1.ALL_ENVS, function () {
    it('slices 2x2x2 array into 2x1x1 no size', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = a.slice([0, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array into 1x2x2 with scalar begin no size', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = a.slice(1);
                    expect(result.shape).toEqual([1, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array using 2d size and 2d size', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = a.slice([0, 1]);
                    expect(result.shape).toEqual([2, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array using negative size', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = a.slice([0, 1], [-1, 1]);
                    expect(result.shape).toEqual([2, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('slices 2x2x2 array using 1d size', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    result = a.slice(0, 1);
                    expect(result.shape).toEqual([1, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.slice({}, 0, 0); })
            .toThrowError(/Argument 'x' passed to 'slice' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
                    result = tf.slice(a, [0, 1, 1]);
                    expect(result.shape).toEqual([2, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should match source tensor dtype', function () {
        var a = tf.tensor1d([1, 2, 3, 4, 5], 'int32');
        var b = a.asType('float32');
        expect(tf.slice(b, 0).dtype).toEqual('float32');
    });
});
jasmine_util_1.describeWithFlags('shallow slicing', jasmine_util_1.ALL_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('WEBGL_CPU_FORWARD', false);
    });
    it('shallow slice an input that was cast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor([[1, 2], [3, 4]], [2, 2], 'int32');
                    b = a.toFloat();
                    c = b.slice(1, 1);
                    expect(c.dtype).toBe('float32');
                    expect(c.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delayed async read of sliced tensor has no mem leak', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, nBefore, nAfter;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10]);
                    b = tf.slice(a, 0, 1);
                    nBefore = tf.memory().numTensors;
                    expect(nBefore).toBe(2);
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.sent();
                    nAfter = tf.memory().numTensors;
                    expect(nAfter).toBe(2);
                    tf.dispose([a, b]);
                    expect(tf.memory().numTensors).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('shallow slicing', jasmine_util_1.SYNC_BACKEND_ENVS, function () {
    it('delayed sync read of sliced tensor has no mem leak', function () {
        var a = tf.zeros([10]);
        var b = tf.slice(a, 0, 1);
        var nBefore = tf.memory().numTensors;
        expect(nBefore).toBe(2);
        b.dataSync();
        var nAfter = tf.memory().numTensors;
        expect(nAfter).toBe(2);
        tf.dispose([a, b]);
        expect(tf.memory().numTensors).toBe(0);
    });
});
//# sourceMappingURL=slice_test.js.map