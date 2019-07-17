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
jasmine_util_1.describeWithFlags('maxPool', jasmine_util_1.ALL_ENVS, function () {
    it('x=[1,1,1] f=[1,1] s=1 [0] => [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0], [1, 1, 1]);
                    result = tf.maxPool(x, 1, 1, 0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,1] f=[2,2] s=1, p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    result = tf.maxPool(x, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 9, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,1] f=[2,2] s=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, resultData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    result = tf.maxPool(x, 2, 1, 'same');
                    return [4 /*yield*/, result.data()];
                case 1:
                    resultData = _a.sent();
                    tf.test_util.expectArraysClose(resultData, new Float32Array([5, 6, 6, 9, 9, 8, 9, 9, 8]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,3,3,1] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 9, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 3, 1]);
                    result = tf.maxPool(x, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 9, 9, 5, 6, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[x=[3,3,1] f=[2,2] s=1 ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, NaN, 9], [3, 3, 1]);
                    result = tf.maxPool(x, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 7, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,2] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 99, 2, 88, 3, 77, 4, 66, 5, 55, 6, 44, 7, 33, 9, 22, 8, 11], [3, 3, 2]);
                    result = tf.maxPool(x, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 99, 6, 88, 9, 66, 9, 55]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[4,4,1] f=[2,2] s=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
                    result = tf.maxPool(x, 2, 2, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 7, 13, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,1] f=[2,2] s=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, fSize, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    fSize = 2;
                    strides = 1;
                    result = tf.maxPool(x, fSize, strides, 'same');
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,3] f=[1,1] s=2 p=1 dimRoundingMode=floor', function () {
        // Feed forward.
        var x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 2, 3]);
        var result = tf.maxPool(x, 1, 2, 1, 'floor');
        expect(result.shape).toEqual([2, 2, 3]);
    });
    it('throws when x is not rank 3', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3]);
        expect(function () { return tf.maxPool(x, 2, 1, 0); }).toThrowError();
    });
    it('throws when dimRoundingMode is set and pad is not a number', function () {
        var x = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
        var pad = 'valid';
        var dimRoundingMode = 'round';
        expect(function () { return tf.maxPool(x, 2, 1, pad, dimRoundingMode); }).toThrowError();
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.maxPool({}, 2, 1, 'valid'); })
            .toThrowError(/Argument 'x' passed to 'maxPool' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[[0]]];
                    result = tf.maxPool(x, 1, 1, 0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('maxPoolBackprop', jasmine_util_1.ALL_ENVS, function () {
    it('gradients x=[3,3,1] f=[2,2] s=1 no dup max value, test #1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3, 1]);
                    expected = [0, 0, 0, 0, 1, 2, 0, 3, 4];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones x=[3,3,1] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3, 1]);
                    expected = [0, 0, 0, 0, 1, 2, 0, 3, 4];
                    dx = tf.grad(function (x) { return tf.maxPool(x.clone(), 2, 1, 0).clone(); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients x=[3,3,1] f=[2,2] s=1 no dup max value, test #2', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([9, 5, 6, 6, 8, 4, 9, 5, 10], [3, 3, 1]);
                    expected = [1, 0, 0, 0, 2, 0, 3, 0, 4];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients x=[2,3,3,1] f=[2,2] s=1 no duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor4d([1, 2, 3, 4, 1, 2, 3, 4], [2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 5, 6, 6, 8, 4, 9, 5, 10], [2, 3, 3, 1]);
                    expected = [0, 0, 0, 0, 1, 2, 0, 3, 4, 1, 0, 0, 0, 2, 0, 3, 0, 4];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[3,3,1] f=[2,2] s=1 dup max value, test 1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([0, 0, 0, 0, 5, 0, 0, 0, 0], [3, 3, 1]);
                    expected = [0, 0, 0, 0, 10, 0, 0, 0, 0];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[3,3,1] f=[2,2] s=1 dup max value, test 2', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 3, 2, 1, 2, 1, 1, 1, 5], [3, 3, 1]);
                    expected = [0, 3, 0, 0, 3, 0, 0, 0, 4];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2] s=1 dup max value in 2nd input', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2, 1]);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 9, 8], [2, 3, 3, 1]);
                    expected = new Float32Array([0, 0, 0, 0, 1, 2, 0, 3, 4, 0, 0, 0, 0, 5, 6, 0, 15, 0]);
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[4,4,1] f=[2,2] s=2 test #1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
                    expected = [0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 3, 0, 4];
                    dx = tf.grad(function (x) { return x.maxPool(2, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[4,4,1] f=[2,2] s=2 test #2', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1], [4, 4, 1]);
                    expected = [0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 0];
                    dx = tf.grad(function (x) { return x.maxPool(2, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[5,5,1] f=[3,3] s=2 no duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
                    ], [5, 5, 1]);
                    expected = [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                        0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 4
                    ];
                    dx = tf.grad(function (x) { return x.maxPool(3, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[5,5,1] f=[3,3] s=2 duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([
                        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 24,
                        13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 12
                    ], [5, 5, 1]);
                    expected = [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ];
                    dx = tf.grad(function (x) { return x.maxPool(3, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Max pool backprop depth > 1.
    it('gradient x=[3,3,2] f=[2,2] s=1, no duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 44, 2, 33, 3, 22, 4, 11], [2, 2, 2]);
                    x = tf.tensor3d([1, 99, 2, 55, 3, 66, 4, 66, 5, 88, 6, 44, 7, 99, 8, 55, 9, 100], [3, 3, 2]);
                    expected = [0, 44, 0, 0, 0, 0, 0, 0, 1, 33, 2, 0, 0, 22, 3, 0, 4, 11];
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[3,3,2] f=[2,2] s=1 duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 44, 2, 33, 3, 22, 4, 11], [2, 2, 2]);
                    x = tf.tensor3d([0, 1, 0, 3, 0, 2, 0, 1, 5, 2, 0, 1, 0, 1, 0, 1, 0, 5], [3, 3, 2]);
                    expected = new Float32Array([0, 0, 0, 77, 0, 0, 0, 0, 10, 22, 0, 0, 0, 0, 0, 0, 0, 11]);
                    dx = tf.grad(function (x) { return x.maxPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[4,4,2] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    x = tf.tensor3d([
                        0, 1, 1, 2, 2, 2, 3, 1, 4, 1, 5, 1, 6, 1, 7, 1,
                        8, 1, 9, 1, 10, 1, 11, 1, 12, 1, 13, 2, 14, 2, 15, 1
                    ], [4, 4, 2]);
                    expected = [
                        0, 0, 0, 11, 0, 22, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 33, 0, 44, 4, 0
                    ];
                    dx = tf.grad(function (x) { return x.maxPool(2, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=5x5x2, f=3, s=2 no duplicate max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    x = tf.tensor3d([
                        0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8,
                        8, 9, 9, 10, 10, 11, 11, 12, 24, 13, 13, 14, 14, 15, 15, 16, 16,
                        17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 12
                    ], [5, 5, 2]);
                    expected = [
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 1, 110, 0, 0, 2, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 4, 0
                    ];
                    dx = tf.grad(function (x) { return x.maxPool(3, 2, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('avgPool', jasmine_util_1.ALL_ENVS, function () {
    it('x=[1,1,1] f=[1,1] s=1 [0] => [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([0], [1, 1, 1]);
                    result = tf.avgPool(a, 1, 1, 0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,1] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    result = tf.avgPool(a, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 6.25, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input int32 throws error', function () {
        // Feed forward.
        var a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1], 'int32');
        expect(function () { return tf.avgPool(a, 2, 1, 0); }).toThrowError();
    });
    it('x=[2,3,3,1] f=[2,2], s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 9, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 3, 1]);
                    result = tf.avgPool(a, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 6.25, 7, 3, 4, 6, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,1] f=[2,2] s=1 propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, NaN, 8], [3, 3, 1]);
                    result = tf.avgPool(a, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,2] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 99, 2, 88, 3, 77, 4, 66, 5, 55, 6, 44, 7, 33, 9, 22, 8, 11], [3, 3, 2]);
                    result = tf.avgPool(a, 2, 1, 0);
                    expect(result.shape).toEqual([2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 77, 4, 66, 6.25, 44, 7, 33]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[4,4,1] f=[2,2] s=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
                    result = tf.avgPool(a, 2, 2, 0);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5, 4.5, 10.5, 12.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,1] f=[2,2] s=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, fSize, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    fSize = 2;
                    strides = 1;
                    result = tf.avgPool(a, fSize, strides, 'same');
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5, 3, 3.5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,3] f=[1,1] s=2 p=1 dimRoundingMode=floor', function () {
        // Feed forward.
        var x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 2, 3]);
        var result = tf.avgPool(x, 1, 2, 1, 'floor');
        expect(result.shape).toEqual([2, 2, 3]);
    });
    it('gradient x=[1,1,1] f=[1,1] s=1 [0] => [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0], [1, 1, 1]);
                    dy = tf.tensor3d([0], [1, 1, 1]);
                    dx = tf.grad(function (x) { return x.avgPool(1, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0], [1, 1, 1]);
                    dy = tf.tensor3d([0], [1, 1, 1]);
                    dx = tf.grad(function (x) { return tf.avgPool(x.clone(), 1, 1, 0).clone(); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[3,3,1] f=[2,2] s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, avgMultiplier, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    avgMultiplier = 1 / (2 * 2);
                    dx = tf.grad(function (x) { return x.avgPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1 * avgMultiplier, 3 * avgMultiplier, 2 * avgMultiplier,
                            4 * avgMultiplier, 10 * avgMultiplier, 6 * avgMultiplier,
                            3 * avgMultiplier, 7 * avgMultiplier, 4 * avgMultiplier
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2], s=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, avgMultiplier, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 9, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9], [2, 3, 3, 1]);
                    dy = tf.tensor4d([1, 2, 3, 4, 1, 2, 3, 4], [2, 2, 2, 1]);
                    avgMultiplier = 1 / (2 * 2);
                    dx = tf.grad(function (x) { return x.avgPool(2, 1, 0); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1 * avgMultiplier, 3 * avgMultiplier, 2 * avgMultiplier,
                            4 * avgMultiplier, 10 * avgMultiplier, 6 * avgMultiplier,
                            3 * avgMultiplier, 7 * avgMultiplier, 4 * avgMultiplier,
                            1 * avgMultiplier, 3 * avgMultiplier, 2 * avgMultiplier,
                            4 * avgMultiplier, 10 * avgMultiplier, 6 * avgMultiplier,
                            3 * avgMultiplier, 7 * avgMultiplier, 4 * avgMultiplier
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when dimRoundingMode is set and pad is not a number', function () {
        var x = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
        var pad = 'valid';
        var dimRoundingMode = 'round';
        expect(function () { return tf.avgPool(x, 2, 1, pad, dimRoundingMode); }).toThrowError();
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.avgPool({}, 2, 1, 'valid'); })
            .toThrowError(/Argument 'x' passed to 'avgPool' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[[0]]];
                    result = tf.avgPool(a, 1, 1, 0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('pool', jasmine_util_1.ALL_ENVS, function () {
    // First test that tf.pool calls are consistent with maxPool/avgPool by
    // duplicating some maxPool/avgPool tests. The implementation code is the
    // same, so we don't need the same level of thoroughness here.
    it('max x=[1,1,1] f=[1,1] s=1 d=1 [0] => [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0], [1, 1, 1]);
                    windowShape = 1;
                    padding = 0;
                    result = tf.pool(x, windowShape, 'max', padding);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max x=[3,3,1] f=[2,2] s=1 d=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = undefined;
                    strides = undefined;
                    result = tf.pool(x, windowShape, 'max', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 6, 9, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max x=[4,4,1] f=[2,2] s=2 d=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = undefined;
                    strides = 2;
                    result = tf.pool(x, windowShape, 'max', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 7, 13, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max x=[2,2,1] f=[2,2] s=1 d=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    windowShape = 2;
                    padding = 'same';
                    dilationRate = undefined;
                    strides = 1;
                    result = tf.pool(x, windowShape, 'max', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg x=[1,1,1] f=[1,1] s=1 d=1 [0] => [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, windowShape, padding, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([0], [1, 1, 1]);
                    windowShape = 1;
                    padding = 0;
                    result = tf.pool(a, windowShape, 'avg', padding);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg x=[3,3,1] f=[2,2] s=1 d=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 9, 8], [3, 3, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = undefined;
                    strides = undefined;
                    result = tf.pool(a, windowShape, 'avg', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 6.25, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg x=[4,4,1] f=[2,2] s=2 d=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = undefined;
                    strides = 2;
                    result = tf.pool(a, windowShape, 'avg', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5, 4.5, 10.5, 12.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg x=[2,2,1] f=[2,2] s=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    windowShape = 2;
                    padding = 'same';
                    dilationRate = undefined;
                    strides = 1;
                    result = tf.pool(a, windowShape, 'avg', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5, 3, 3.5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // tf.pool supports dilation, unlike maxPool or avgPool
    it('max x=[4,3,1] f=[2,2] s=1 d=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [4, 4, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    result = tf.pool(x, windowShape, 'max', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 12, 15, 16]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max x=[2,4,4,1] f=[2,2] s=1 d=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11, 13, 14, 16, 15
                    ], [2, 4, 4, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    result = tf.pool(x, windowShape, 'max', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 12, 15, 16, 12, 11, 16, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg x=[4,4,1] f=[2,2] s=1 d=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, windowShape, padding, dilationRate, strides, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 3, 2, 4, 6, 5, 8, 7, 9, 10, 12, 11, 16, 15, 14, 13], [4, 4, 1]);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    result = tf.pool(a, windowShape, 'avg', padding, dilationRate, strides);
                    expect(result.shape).toEqual([2, 2, 1]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, 11, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max throws when neither s=1 nor d=1', function () {
        // Feed forward.
        var x = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
        var windowShape = 2;
        var padding = 0;
        var dilationRate = 2;
        var strides = 2;
        expect(function () { return tf.pool(x, windowShape, 'max', padding, dilationRate, strides); })
            .toThrowError();
    });
    it('avg throws when neither s=1 nor d=1', function () {
        // Feed forward.
        var x = tf.tensor3d([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [4, 4, 1]);
        var windowShape = 2;
        var padding = 0;
        var dilationRate = 2;
        var strides = 2;
        expect(function () { return tf.pool(x, windowShape, 'avg', padding, dilationRate, strides); })
            .toThrowError();
    });
});
jasmine_util_1.describeWithFlags('poolBackprop', jasmine_util_1.ALL_ENVS, function () {
    it('max gradients x=[3,3,1] f=[2,2] s=1 d=1 no dup max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, windowShape, padding, dilationRate, strides, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3, 1]);
                    expected = [0, 0, 0, 0, 1, 2, 0, 3, 4];
                    windowShape = 2;
                    padding = 0;
                    dilationRate = undefined;
                    strides = undefined;
                    dx = tf.grad(function (x) {
                        return x.pool(windowShape, 'max', padding, dilationRate, strides);
                    })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradients x=[3,3,1] f=[2,2] s=1 d=2 no dup max value, test #1', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, windowShape, padding, dilationRate, strides, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [4, 4, 1]);
                    expected = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 3, 4];
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    dx = tf.grad(function (x) { return x.pool(windowShape, 'max', padding, dilationRate, strides); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradients x=[3,3,1] f=[2,2] s=1 d=2 no dup max value, test #2', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, windowShape, padding, dilationRate, strides, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x = tf.tensor3d([9, 5, 8, 6, 3, 1, 2, 4, 7, 3, 6, 4, 11, 15, 10, 16], [4, 4, 1]);
                    expected = [1, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 4];
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    dx = tf.grad(function (x) { return x.pool(windowShape, 'max', padding, dilationRate, strides); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient x=[3,3,1] f=[2,2] s=1 d=2 dup max value', function () { return __awaiter(_this, void 0, void 0, function () {
        var dy, x, expected, windowShape, padding, dilationRate, strides, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dy = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3, 1]);
                    x = tf.tensor3d([
                        0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ], [5, 5, 1]);
                    expected = [
                        0, 0, 0, 0, 0, 0, 5, 10, 0, 0, 0, 10, 20,
                        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                    ];
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    dx = tf.grad(function (x) {
                        return x.pool(windowShape, 'max', padding, dilationRate, strides);
                    })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('avg gradient x=[4,4,1] f=[2,2] s=1 d=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, f, windowShape, padding, dilationRate, strides, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([
                        1, 3, 2, 4, 6, 5, 8, 7, 9, 10, 12, 11, 16,
                        15, 14, 13, 17, 18, 19, 20, 21, 22, 23, 24, 25
                    ], [5, 5, 1]);
                    dy = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], [3, 3, 1]);
                    f = 1 / (2 * 2);
                    windowShape = 2;
                    padding = 0;
                    dilationRate = 2;
                    strides = undefined;
                    dx = tf.grad(function (x) {
                        return x.pool(windowShape, 'avg', padding, dilationRate, strides);
                    })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1 * f, 2 * f, 4 * f, 2 * f, 3 * f, 4 * f, 5 * f, 10 * f, 5 * f,
                            6 * f, 8 * f, 10 * f, 20 * f, 10 * f, 12 * f, 4 * f, 5 * f, 10 * f,
                            5 * f, 6 * f, 7 * f, 8 * f, 16 * f, 8 * f, 9 * f
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=pool_test.js.map