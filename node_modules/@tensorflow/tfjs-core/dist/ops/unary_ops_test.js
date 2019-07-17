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
var util = require("../util");
var selu_util = require("./selu_util");
jasmine_util_1.describeWithFlags('relu', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 0, 3, -0.1]);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 3, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([1, -2, 5, -3], [1, 2, 2, 1, 1]);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 5, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([1, -2, 5, -3, -1, 4, 7, 8], [1, 2, 2, 2, 1, 1]);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 5, 0, 0, 4, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does nothing to positive values', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sets negative values to 0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-1);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('preserves zero values', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0);
                    result = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs, float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 0, 3, -0.1, NaN]);
                    result = tf.relu(a);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 3, 0, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: positive scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, grad, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    dy = tf.scalar(5);
                    grad = tf.grad(function (a) { return tf.relu(a); });
                    da = grad(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, grad, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    dy = tf.scalar(5);
                    grad = tf.grad(function (a) { return tf.relu(a.clone()).clone(); });
                    da = grad(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: negative scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, grad, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-3);
                    dy = tf.scalar(5);
                    grad = tf.grad(function (a) { return tf.relu(a); });
                    da = grad(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, grad, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, -1, 0, .1], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grad = tf.grad(function (a) { return tf.relu(a); });
                    da = grad(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.relu({}); })
            .toThrowError(/Argument 'x' passed to 'relu' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.relu([1, -2, 0, 3, -0.1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 3, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.relu('q'); })
            .toThrowError(/Argument 'x' passed to 'relu' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('abs', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 0, 3, -0.1]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3, 0.1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([1, -2, 0, -3], [1, 2, 2, 1, 1]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([1, -2, 5, -3, -1, 4, 7, 8], [1, 2, 2, 2, 1, 1]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 5, 3, 1, 4, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex64 rank-1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.complex([-2, -1, 0, 1, 2], [1, 2, 3, 0, -1]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.sqrt(-2 * -2 + 1 * 1), Math.sqrt(-1 * -1 + 2 * 2),
                            Math.sqrt(0 * 0 + 3 * 3), Math.sqrt(1 * 1 + 0 * 0),
                            Math.sqrt(2 * 2 + -1 * -1)
                        ]]);
                    expect(result.shape).toEqual([5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex64 rank-2', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.complex([[-3, -2, -1], [0, 1, 2]], [[4, 1, 2], [3, 0, -1]]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.sqrt(-3 * -3 + 4 * 4), Math.sqrt(-2 * -2 + 1 * 1),
                            Math.sqrt(-1 * -1 + 2 * 2), Math.sqrt(0 * 0 + 3 * 3),
                            Math.sqrt(1 * 1 + 0 * 0), Math.sqrt(2 * 2 + -1 * -1)
                        ]]);
                    expect(result.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex64 rank-3', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.complex([[[-3, -2], [-1, 0]], [[1, 2], [3, 4]]], [[[4, 1], [2, 3]], [[0, -1], [-3, -4]]]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.sqrt(-3 * -3 + 4 * 4), Math.sqrt(-2 * -2 + 1 * 1),
                            Math.sqrt(-1 * -1 + 2 * 2), Math.sqrt(0 * 0 + 3 * 3),
                            Math.sqrt(1 * 1 + 0 * 0), Math.sqrt(2 * 2 + -1 * -1),
                            Math.sqrt(3 * 3 + -3 * -3), Math.sqrt(4 * 4 + -4 * -4)
                        ]]);
                    expect(result.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('is underflow-safe for complex64', function () { return __awaiter(_this, void 0, void 0, function () {
        var floatBits, small, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    floatBits = tf.backend().floatPrecision();
                    switch (floatBits) {
                        case 32:
                            small = 1e-30;
                            break;
                        case 16:
                            small = 1e-4;
                            break;
                        default:
                            throw new Error("Test not implemented for ENV.engine.floatPrecision()=" + floatBits + ".");
                    }
                    a = tf.complex([small, 0, small, 0], [small, small, 0, 0]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            Math.hypot(small, small), Math.hypot(0, small), Math.hypot(small, 0),
                            Math.hypot(0, 0)
                        ],
                        /*tolerance=*/ small / 100]);
                    expect(result.shape).toEqual([4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 0, 3, -0.1, NaN]);
                    result = tf.abs(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3, 0.1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.abs(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var a = tf.scalar(4);
        var dy = tf.scalar(8);
        var da = tf.grad(function (a) { return a.clone().abs().clone(); })(a, dy);
        expect(da.shape).toEqual(a.shape);
        expect(da.dtype).toEqual('float32');
    });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    da = tf.grad(function (a) { return tf.abs(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 * 1, 2 * 1, 3 * -1, 4 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, -2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    da = tf.grad(function (a) { return tf.abs(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 * 1, 2 * -1, 3 * -1, 4 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.abs({}); })
            .toThrowError(/Argument 'x' passed to 'abs' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.abs([1, -2, 0, 3, -0.1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3, 0.1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.abs('q'); })
            .toThrowError(/Argument 'x' passed to 'abs' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('step', jasmine_util_1.ALL_ENVS, function () {
    it('with 1d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, -.01, 3, -0.1]);
                    result = tf.step(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('with 1d tensor and alpha', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, -.01, 3, NaN]);
                    result = tf.step(a, 0.1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0.1, 0.1, 1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('with 2d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, -5, -3, 4], [2, 2]);
                    result = tf.step(a);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, -.01, 3, NaN]);
                    result = tf.step(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-4);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.step(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-4);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.step(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.step(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, -2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.step(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.step({}); })
            .toThrowError(/Argument 'x' passed to 'step' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.step([1, -2, -.01, 3, -0.1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.step('q'); })
            .toThrowError(/Argument 'x' passed to 'step' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('neg', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -3, 2, 7, -4]);
                    result = tf.neg(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, 3, -2, -7, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagate NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -3, 2, 7, NaN]);
                    result = tf.neg(a);
                    expected = [-1, 3, -2, -7, NaN];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.neg(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.neg(a.clone()).clone(); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    da = tf.grad(function (a) { return tf.neg(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 * -1, 2 * -1, 3 * -1, 4 * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, -2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    da = tf.grad(function (a) { return tf.neg(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 * -1, 2 * -1, 3 * -1, 4 * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.neg({}); })
            .toThrowError(/Argument 'x' passed to 'neg' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.neg([1, -3, 2, 7, -4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, 3, -2, -7, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.neg('q'); })
            .toThrowError(/Argument 'x' passed to 'neg' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('sigmoid', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.sigmoid(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = 1 / (1 + Math.exp(-values[i]));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.ones([2, 2, 2, 2, 2, 2]);
                    result = tf.sigmoid(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = 1 / (1 + Math.exp(-1.0));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, NaN]);
                    res = tf.sigmoid(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / (1 + Math.exp(-3)), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, aVals, dyVals, expected, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    da = tf.grad(function (a) { return tf.sigmoid(a); })(a, dy);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVals = _b.sent();
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVals = _b.sent();
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(-aVals[i]));
                        expected[i] = dyVals[i] * y * (1 - y);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, aVals, dyVals, expected, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    da = tf.grad(function (a) { return tf.sigmoid(a.clone()).clone(); })(a, dy);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVals = _b.sent();
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVals = _b.sent();
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(-aVals[i]));
                        expected[i] = dyVals[i] * y * (1 - y);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sigmoid({}); })
            .toThrowError(/Argument 'x' passed to 'sigmoid' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.sigmoid(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = 1 / (1 + Math.exp(-values[i]));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.sigmoid('q'); })
            .toThrowError(/Argument 'x' passed to 'sigmoid' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('logSigmoid', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.logSigmoid(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.log(1 / (1 + Math.exp(-values[i])));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-2);
                    result = tf.logSigmoid(a);
                    expected = [Math.log(1 / (1 + Math.exp(2)))];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, 2, -3, 5];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.logSigmoid(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.log(1 / (1 + Math.exp(-values[i])));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('larger magnitude negative inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [-100, -200, -3000];
                    a = tf.tensor1d(values);
                    result = tf.logSigmoid(a);
                    expected = [-100, -200, -3000];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('larger magnitude positive inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [100, 200, 3000, 50000];
                    a = tf.tensor1d(values);
                    result = tf.logSigmoid(a);
                    expected = [0, 0, 0, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, NaN]);
                    res = tf.logSigmoid(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log(1 / (1 + Math.exp(-3))), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, dyVal, da, aVal, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    dy = tf.scalar(4);
                    return [4 /*yield*/, dy.array()];
                case 1:
                    dyVal = _b.sent();
                    da = tf.grad(function (a) { return tf.logSigmoid(a); })(a, dy);
                    return [4 /*yield*/, a.array()];
                case 2:
                    aVal = _b.sent();
                    y = 1 / (1 + Math.exp(aVal));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), [dyVal * y]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, aVals, dy, dyVals, da, expected, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVals = _b.sent();
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVals = _b.sent();
                    da = tf.grad(function (a) { return tf.logSigmoid(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(aVals[i]));
                        expected[i] = dyVals[i] * y;
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, aVals, dy, dyVals, da, expected, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVals = _b.sent();
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVals = _b.sent();
                    da = tf.grad(function (a) { return tf.logSigmoid(a.clone()).clone(); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(aVals[i]));
                        expected[i] = dyVals[i] * y;
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, expected, aVals, dyVals, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 5], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    da = tf.grad(function (a) { return tf.logSigmoid(a); })(a, dy);
                    expected = [];
                    return [4 /*yield*/, a.data()];
                case 1:
                    aVals = _b.sent();
                    return [4 /*yield*/, dy.data()];
                case 2:
                    dyVals = _b.sent();
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(aVals[i]));
                        expected[i] = dyVals[i] * y;
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.logSigmoid({}); })
            .toThrowError(/Argument 'x' passed to 'logSigmoid' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.logSigmoid(-2);
                    expected = [Math.log(1 / (1 + Math.exp(2)))];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.logSigmoid('q'); })
            .toThrowError(/Argument 'x' passed to 'logSigmoid' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('softplus', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.softplus(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.log((1 + Math.exp(values[i])));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-2);
                    result = tf.softplus(a);
                    expected = [Math.log((1 + Math.exp(-2)))];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, 2, -3, 5];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.softplus(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.log((1 + Math.exp(values[i])));
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('larger magnitude negative inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [-100, -200, -3000, -50000];
                    a = tf.tensor1d(values);
                    result = tf.softplus(a);
                    expected = [0, 0, 0, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('larger magnitude positive inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [100, 200, 3000];
                    a = tf.tensor1d(values);
                    result = tf.softplus(a);
                    expected = [100, 200, 3000];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, NaN]);
                    res = tf.softplus(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log((1 + Math.exp(3))), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, aVal, dyVal, da, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    dy = tf.scalar(4);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVal = _b.sent();
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVal = _b.sent();
                    da = tf.grad(function (a) { return tf.softplus(a); })(a, dy);
                    y = 1 / (1 + Math.exp(-aVal));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), [dyVal * y]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, aVal, dyVal, da, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    dy = tf.scalar(4);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVal = _b.sent();
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVal = _b.sent();
                    da = tf.grad(function (a) { return tf.softplus(a.clone()).clone(); })(a, dy);
                    y = 1 / (1 + Math.exp(-aVal));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), [dyVal * y]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, aVals, dy, dyVals, da, expected, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3, 5]);
                    return [4 /*yield*/, a.array()];
                case 1:
                    aVals = _b.sent();
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    return [4 /*yield*/, dy.array()];
                case 2:
                    dyVals = _b.sent();
                    da = tf.grad(function (a) { return tf.softplus(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(-aVals[i]));
                        expected[i] = dyVals[i] * y;
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, expected, aVals, dyVals, i, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 5], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    da = tf.grad(function (a) { return tf.softplus(a); })(a, dy);
                    expected = [];
                    return [4 /*yield*/, a.data()];
                case 1:
                    aVals = _b.sent();
                    return [4 /*yield*/, dy.data()];
                case 2:
                    dyVals = _b.sent();
                    for (i = 0; i < a.size; i++) {
                        y = 1 / (1 + Math.exp(-aVals[i]));
                        expected[i] = dyVals[i] * y;
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 3:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.softplus({}); })
            .toThrowError(/Argument 'x' passed to 'softplus' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.softplus(-2);
                    expected = [Math.log((1 + Math.exp(-2)))];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.softplus('q'); })
            .toThrowError(/Argument 'x' passed to 'softplus' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('sqrt', jasmine_util_1.ALL_ENVS, function () {
    it('sqrt', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 4]);
                    r = tf.sqrt(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.sqrt(2), Math.sqrt(4)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sqrt propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    r = tf.sqrt(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.sqrt(1), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.sqrt(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (2 * Math.sqrt(4))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.sqrt(a.clone()).clone(); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (2 * Math.sqrt(4))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.sqrt(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            1 / (2 * Math.sqrt(1)), 2 / (2 * Math.sqrt(2)),
                            3 / (2 * Math.sqrt(3)), 4 / (2 * Math.sqrt(5))
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.sqrt(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            1 / (2 * Math.sqrt(3)), 2 / (2 * Math.sqrt(1)),
                            3 / (2 * Math.sqrt(2)), 4 / (2 * Math.sqrt(3))
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sqrt({}); })
            .toThrowError(/Argument 'x' passed to 'sqrt' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.sqrt([2, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.sqrt(2), Math.sqrt(4)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.sqrt('q'); })
            .toThrowError(/Argument 'x' passed to 'sqrt' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('rsqrt', jasmine_util_1.ALL_ENVS, function () {
    it('rsqrt', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 4]);
                    r = tf.rsqrt(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / Math.sqrt(2), 1 / Math.sqrt(4)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('rsqrt propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    r = tf.rsqrt(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / Math.sqrt(1), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.rsqrt(a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(-1 * 8) / (2 * Math.pow(4, 1.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(4);
                    dy = tf.scalar(8);
                    da = tf.grad(function (a) { return tf.rsqrt(a.clone()).clone(); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(-1 * 8) / (2 * Math.pow(4, 1.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.rsqrt(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            -1 * 1 / (2 * Math.pow(1, 1.5)), -1 * 2 / (2 * Math.pow(2, 1.5)),
                            -1 * 3 / (2 * Math.pow(3, 1.5)), -1 * 4 / (2 * Math.pow(5, 1.5))
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.rsqrt(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            -1 * 1 / (2 * Math.pow(3, 1.5)), -1 * 2 / (2 * Math.pow(1, 1.5)),
                            -1 * 3 / (2 * Math.pow(2, 1.5)), -1 * 4 / (2 * Math.pow(3, 1.5))
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.rsqrt({}); })
            .toThrowError(/Argument 'x' passed to 'rsqrt' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.rsqrt([2, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / Math.sqrt(2), 1 / Math.sqrt(4)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.rsqrt('q'); })
            .toThrowError(/Argument 'x' passed to 'rsqrt' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('square', jasmine_util_1.ALL_ENVS, function () {
    it('1D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 4, Math.sqrt(2)]);
                    r = tf.square(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 16, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, Math.sqrt(2), Math.sqrt(3)], [2, 2]);
                    r = tf.square(a);
                    expect(r.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([1, 2, Math.sqrt(2), Math.sqrt(3)], [1, 1, 2, 2, 1]);
                    r = tf.square(a);
                    expect(r.shape).toEqual([1, 1, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([1, 2, Math.sqrt(2), Math.sqrt(3), 3, 4, Math.sqrt(7), Math.sqrt(13)], [1, 1, 2, 2, 2, 1]);
                    r = tf.square(a);
                    expect(r.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 2, 3, 9, 16, 7, 13]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('square propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN]);
                    r = tf.square(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.25, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.square(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2 * 5 * 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.square(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2 * 5 * 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.square(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-2, 4 * 2, 6 * 3, -10 * 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.square(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-6 * 1, 2 * 2, 4 * 3, 6 * 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor5D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor5d([-3, 1, 2, 3], [1, 1, 1, 2, 2]);
                    dy = tf.tensor5d([1, 2, 3, 4], [1, 1, 1, 2, 2]);
                    gradients = tf.grad(function (a) { return tf.square(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-6 * 1, 2 * 2, 4 * 3, 6 * 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([-3, 1, 2, 3, -4, 5, 12, 3], [1, 1, 1, 2, 2, 2]);
                    dy = tf.tensor6d([1, 2, 3, 4, 5, 6, 7, 8], [1, 1, 1, 2, 2, 2]);
                    gradients = tf.grad(function (a) { return tf.square(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [-6 * 1, 2 * 2, 4 * 3, 6 * 4, -8 * 5, 10 * 6, 24 * 7, 6 * 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.square({}); })
            .toThrowError(/Argument 'x' passed to 'square' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.square([2, 4, Math.sqrt(2)]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 16, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.square('q'); })
            .toThrowError(/Argument 'x' passed to 'square' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('reciprocal', jasmine_util_1.ALL_ENVS, function () {
    it('1D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 3, 0, NaN]);
                    r = tf.reciprocal(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 2, 1 / 3, Infinity, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, Infinity, 0, NaN], [2, 2]);
                    r = tf.reciprocal(a);
                    expect(r.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 1, 0, Infinity, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reciprocal propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN]);
                    r = tf.reciprocal(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 1.5, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.reciprocal(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1 * 8 * (1 / (5 * 5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.reciprocal(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1 * 8 * (1 / (5 * 5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.reciprocal(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -1 * 1 * (1 / (-1 * -1)), -1 * 2 * (1 / (2 * 2)), -1 * 3 * (1 / (3 * 3)),
                            -1 * 4 * (1 / (-5 * -5))
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-1, 2, 3, -5], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.reciprocal(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -1 * 1 * (1 / (-1 * -1)), -1 * 2 * (1 / (2 * 2)), -1 * 3 * (1 / (3 * 3)),
                            -1 * 4 * (1 / (-5 * -5))
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.reciprocal({}); })
            .toThrowError(/Argument 'x' passed to 'reciprocal' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.reciprocal([2, 3, 0, NaN]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 2, 1 / 3, Infinity, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.reciprocal('q'); })
            .toThrowError(/Argument 'x' passed to 'reciprocal' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('log', jasmine_util_1.ALL_ENVS, function () {
    it('log', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2]);
                    r = tf.log(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log(1), Math.log(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('log 6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, expectedResult, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(1, 65).reshape([2, 2, 2, 2, 2, 2]);
                    r = tf.log(a);
                    expectedResult = [];
                    for (i = 1; i < 65; i++) {
                        expectedResult[i - 1] = Math.log(i);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('log propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    r = tf.log(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log(1), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.log(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 / 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.log(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 / 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.log(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / -1, 2 / 2, 3 / 3, 4 / -5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.log(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / -3, 2 / 1, 3 / 2, 4 / 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.log({}); })
            .toThrowError(/Argument 'x' passed to 'log' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.log([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log(1), Math.log(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.log('q'); })
            .toThrowError(/Argument 'x' passed to 'log' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('log1p', jasmine_util_1.ALL_ENVS, function () {
    it('log1p', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2]);
                    r = tf.log1p(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log1p(1), Math.log1p(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('log1p propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    r = tf.log1p(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log1p(1), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.log1p(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 / (1 + 5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var a = tf.scalar(5);
        var gradients = tf.grad(function (a) { return a.clone().log1p().clone(); })(a);
        expect(gradients.shape).toEqual(a.shape);
        expect(gradients.dtype).toEqual('float32');
    });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.log1p(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [Infinity, 2 / (1 + 2), 3 / (1 + 3), 4 / (1 + -5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.log1p(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 / (1 + -3), 2 / (1 + 1), 3 / (1 + 2), 4 / (1 + 3)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.log1p({}); })
            .toThrowError(/Argument 'x' passed to 'log1p' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.log1p([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.log1p(1), Math.log1p(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.log1p('q'); })
            .toThrowError(/Argument 'x' passed to 'log1p' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('ceil', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, 2.1, -1.4]);
                    r = tf.ceil(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN, -1.4]);
                    r = tf.ceil(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, NaN, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.ceil(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.ceil(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1.1, 2.6, 3, -5.9]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.ceil(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2.2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.ceil(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.ceil({}); })
            .toThrowError(/Argument 'x' passed to 'ceil' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.ceil([1.5, 2.1, -1.4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.ceil('q'); })
            .toThrowError(/Argument 'x' passed to 'ceil' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('floor', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, 2.1, -1.4]);
                    r = tf.floor(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN, -1.4]);
                    r = tf.floor(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, NaN, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.floor(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.floor(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1.1, 2.6, 3, -5.9]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.floor(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2.2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.floor(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.floor({}); })
            .toThrowError(/Argument 'x' passed to 'floor' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.floor([1.5, 2.1, -1.4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.floor('q'); })
            .toThrowError(/Argument 'x' passed to 'floor' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('sign', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, 0, NaN, -1.4]);
                    r = tf.sign(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN, -1.4]);
                    r = tf.sign(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.sign(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.sign(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1.1, 2.6, 3, -5.9]);
                    dy = tf.tensor1d([-1, 1, 1, -1]);
                    gradients = tf.grad(function (a) { return tf.sign(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2.2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.sign(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sign({}); })
            .toThrowError(/Argument 'x' passed to 'sign' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.sign([1.5, 0, NaN, -1.4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.sign('q'); })
            .toThrowError(/Argument 'x' passed to 'sign' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('isNaN', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    r = tf.isNaN(a);
                    expect(r.dtype).toEqual('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(NaN);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.isNaN(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    dy = tf.tensor1d([1, 1, 1, 1, 1]);
                    gradients = tf.grad(function (a) { return tf.isNaN(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([NaN, Infinity, -Infinity, 0], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.isNaN(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.isNaN({}); })
            .toThrowError(/Argument 'x' passed to 'isNaN' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.isNaN([NaN, Infinity, -Infinity, 0, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.isNaN('q'); })
            .toThrowError(/Argument 'x' passed to 'isNaN' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('isInf', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    r = tf.isInf(a);
                    expect(r.dtype).toEqual('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(NaN);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.isInf(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    dy = tf.tensor1d([1, 1, 1, 1, 1]);
                    gradients = tf.grad(function (a) { return tf.isInf(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([NaN, Infinity, -Infinity, 0], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.isInf(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.isInf({}); })
            .toThrowError(/Argument 'x' passed to 'isInf' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.isInf([NaN, Infinity, -Infinity, 0, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.isInf('q'); })
            .toThrowError(/Argument 'x' passed to 'isInf' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('isFinite', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    r = tf.isFinite(a);
                    expect(r.dtype).toEqual('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(NaN);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.isFinite(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([NaN, Infinity, -Infinity, 0, 1]);
                    dy = tf.tensor1d([1, 1, 1, 1, 1]);
                    gradients = tf.grad(function (a) { return tf.isFinite(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([NaN, Infinity, -Infinity, 0], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.isFinite(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.isFinite({}); })
            .toThrowError(/Argument 'x' passed to 'isFinite' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.isFinite([NaN, Infinity, -Infinity, 0, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.isFinite('q'); })
            .toThrowError(/Argument 'x' passed to 'isFinite' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('exp', jasmine_util_1.ALL_ENVS, function () {
    it('exp', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 0]);
                    r = tf.exp(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.exp(1), Math.exp(2), 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('exp propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 0]);
                    r = tf.exp(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.exp(1), NaN, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.exp(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 * Math.exp(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.exp(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 * Math.exp(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.exp(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.exp(-1), 2 * Math.exp(2), 3 * Math.exp(3), 4 * Math.exp(-5)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.exp(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.exp(-3), 2 * Math.exp(1), 3 * Math.exp(2), 4 * Math.exp(3)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.exp({}); })
            .toThrowError(/Argument 'x' passed to 'exp' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.exp([1, 2, 0]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.exp(1), Math.exp(2), 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.exp('q'); })
            .toThrowError(/Argument 'x' passed to 'exp' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('expm1', jasmine_util_1.ALL_ENVS, function () {
    it('expm1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 0]);
                    r = tf.expm1(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.expm1(1), Math.expm1(2), Math.expm1(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('expm1 propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 0]);
                    r = tf.expm1(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.expm1(1), NaN, Math.expm1(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.expm1(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 * Math.exp(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.expm1(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3 * Math.exp(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.expm1(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.exp(-1), 2 * Math.exp(2), 3 * Math.exp(3), 4 * Math.exp(-5)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.expm1(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.exp(-3), 2 * Math.exp(1), 3 * Math.exp(2), 4 * Math.exp(3)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.expm1({}); })
            .toThrowError(/Argument 'x' passed to 'expm1' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.expm1([1, 2, 0]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.expm1(1), Math.expm1(2), Math.expm1(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.expm1('q'); })
            .toThrowError(/Argument 'x' passed to 'expm1' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('sin', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.sin(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.sin(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.sin(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.sin(4), NaN, Math.sin(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.sin(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.cos(5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.sin(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.cos(5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.sin(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.cos(-1), 2 * Math.cos(2), 3 * Math.cos(3), 4 * Math.cos(-5)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.sin(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 * Math.cos(-3), 2 * Math.cos(1), 3 * Math.cos(2), 4 * Math.cos(3)],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sin({}); })
            .toThrowError(/Argument 'x' passed to 'sin' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.sin(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.sin(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.sin('q'); })
            .toThrowError(/Argument 'x' passed to 'sin' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('cos', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.cos(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.cos(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.cos(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.cos(4), NaN, Math.cos(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.cos(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.sin(5) * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.cos(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.sin(5) * -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1, 2, 3, -5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.cos(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            1 * Math.sin(-1) * -1, 2 * Math.sin(2) * -1, 3 * Math.sin(3) * -1,
                            4 * Math.sin(-5) * -1
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.cos(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [
                            1 * Math.sin(-3) * -1, 2 * Math.sin(1) * -1, 3 * Math.sin(2) * -1,
                            4 * Math.sin(3) * -1
                        ],
                        1e-1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.cos({}); })
            .toThrowError(/Argument 'x' passed to 'cos' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.cos(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.cos(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.cos('q'); })
            .toThrowError(/Argument 'x' passed to 'cos' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('tan', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.tan(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.tan(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.tan(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.tan(4), NaN, Math.tan(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.tan(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (Math.cos(0.5) * Math.cos(0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.tan(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (Math.cos(0.5) * Math.cos(0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-1, 2, 3, -5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.tan(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (Math.cos(aValues[i]) * Math.cos(aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    // The grad(tan(x)) which relies on 1/cos(x) is less precise on Windows.
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    // The grad(tan(x)) which relies on 1/cos(x) is less precise on Windows.
                    _a.apply(void 0, [_b.sent(), expected, test_util_1.TEST_EPSILON_FLOAT16]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-3, 1, 2, 3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.tan(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (Math.cos(aValues[i]) * Math.cos(aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.tan({}); })
            .toThrowError(/Argument 'x' passed to 'tan' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.tan(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.tan(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.tan('q'); })
            .toThrowError(/Argument 'x' passed to 'tan' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('asin', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [.1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.asin(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.asin(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.asin(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.asin(4), NaN, Math.asin(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.asin(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / Math.sqrt(1 - (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.asin(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / Math.sqrt(1 - (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.1, 0.2, 0.3, -0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.asin(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(1 - (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.3, 0.1, 0.2, 0.3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.asin(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(1 - (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.asin({}); })
            .toThrowError(/Argument 'x' passed to 'asin' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [.1, -3, 2, 7, -4];
                    result = tf.asin(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.asin(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.asin('q'); })
            .toThrowError(/Argument 'x' passed to 'asin' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('acos', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [.1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.acos(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.acos(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.acos(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.acos(4), NaN, Math.acos(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.acos(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(-1 * 8) / Math.sqrt(1 - (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.acos(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [(-1 * 8) / Math.sqrt(1 - (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.1, 0.2, 0.3, -0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.acos(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] =
                            (-1 * dyValues[i]) / Math.sqrt(1 - (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.3, 0.1, 0.2, 0.3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.acos(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] =
                            (-1 * dyValues[i]) / Math.sqrt(1 - (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.acos({}); })
            .toThrowError(/Argument 'x' passed to 'acos' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [.1, -3, 2, 7, -4];
                    result = tf.acos(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.acos(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.acos('q'); })
            .toThrowError(/Argument 'x' passed to 'acos' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('atan', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.atan(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atan(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D atan', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(1, 65).reshape([2, 2, 2, 2, 2, 2]);
                    result = tf.atan(a);
                    expected = [];
                    for (i = 1; i < 65; ++i) {
                        expected[i - 1] = Math.atan(i);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.atan(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.atan(4), NaN, Math.atan(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.atan(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (1 + (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.atan(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (1 + (0.5 * 0.5))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.1, 0.2, 0.3, -0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.atan(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (1 + (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.3, 0.1, 0.2, 0.3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.atan(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (1 + (aValues[i] * aValues[i]));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.atan({}); })
            .toThrowError(/Argument 'x' passed to 'atan' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.atan(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.atan(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.atan('q'); })
            .toThrowError(/Argument 'x' passed to 'atan' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('sinh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, -1, -4];
                    a = tf.tensor1d(values);
                    result = tf.sinh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.sinh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.sinh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.sinh(4), NaN, Math.sinh(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.sinh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.cosh(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.sinh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.cosh(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-1, 2, 3, -5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.sinh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * Math.cosh(aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-3, 1, 2, 3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.sinh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * Math.cosh(aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sinh({}); })
            .toThrowError(/Argument 'x' passed to 'sinh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, -1, -4];
                    result = tf.sinh(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.sinh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.sinh('q'); })
            .toThrowError(/Argument 'x' passed to 'sinh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('cosh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, -1, -4];
                    a = tf.tensor1d(values);
                    result = tf.cosh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.cosh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.cosh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.cosh(4), NaN, Math.cosh(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.cosh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.sinh(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.cosh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * Math.sinh(0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-1, 2, 3, -5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.cosh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * Math.sinh(aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-3, 1, 2, 3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.cosh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * Math.sinh(aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.cosh({}); })
            .toThrowError(/Argument 'x' passed to 'cosh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, -1, -4];
                    result = tf.cosh(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.cosh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.cosh('q'); })
            .toThrowError(/Argument 'x' passed to 'cosh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('tanh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.tanh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = util.tanh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.tanh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [util.tanh(4), NaN, util.tanh(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.tanh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * (1 - (Math.tanh(0.5) * Math.tanh(0.5)))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.tanh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * (1 - (Math.tanh(0.5) * Math.tanh(0.5)))]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-1, 2, 3, -5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.tanh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] =
                            dyValues[i] * (1 - (Math.tanh(aValues[i]) * Math.tanh(aValues[i])));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-3, 1, 2, 3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.tanh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] =
                            dyValues[i] * (1 - (Math.tanh(aValues[i]) * Math.tanh(aValues[i])));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.tanh({}); })
            .toThrowError(/Argument 'x' passed to 'tanh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.tanh(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = util.tanh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.tanh('q'); })
            .toThrowError(/Argument 'x' passed to 'tanh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('leakyRelu', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0, 1, -2]);
                    result = tf.leakyRelu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, -0.4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0, 1, NaN]);
                    result = tf.leakyRelu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, alpha, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-4);
                    dy = tf.scalar(8);
                    alpha = 0.1;
                    gradients = tf.grad(function (a) { return tf.leakyRelu(a, alpha); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * alpha]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, alpha, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-4);
                    dy = tf.scalar(8);
                    alpha = 0.1;
                    gradients = tf.grad(function (a) { return tf.leakyRelu(a.clone(), alpha).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 * alpha]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, alpha, a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1, -1, 0.1];
                    dyValues = [1, 2, 3];
                    alpha = 0.1;
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.leakyRelu(a, alpha); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2 * alpha, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, alpha, a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1, -1, 0.1, 0.5];
                    dyValues = [1, 2, 3, 4];
                    alpha = 0.1;
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.leakyRelu(a, alpha); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2 * alpha, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.leakyRelu({}); })
            .toThrowError(/Argument 'x' passed to 'leakyRelu' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.leakyRelu([0, 1, -2]);
                    expect(result.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, -0.4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.leakyRelu('q'); })
            .toThrowError(/Argument 'x' passed to 'leakyRelu' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('elu', jasmine_util_1.ALL_ENVS, function () {
    it('calculate elu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -1, 0]);
                    result = tf.elu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, -0.6321, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('elu propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    result = tf.elu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 3, -2]);
                    dy = tf.tensor1d([5, 50, 500]);
                    gradients = tf.grad(function (a) { return tf.elu(a); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 50, 500 * Math.exp(-2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 3, -2]);
                    dy = tf.tensor1d([5, 50, 500]);
                    gradients = tf.grad(function (a) { return tf.elu(a.clone()).clone(); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 50, 500 * Math.exp(-2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.elu({}); })
            .toThrowError(/Argument 'x' passed to 'elu' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.elu([1, -1, 0]);
                    expect(result.shape).toEqual(result.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, -0.6321, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.elu('q'); })
            .toThrowError(/Argument 'x' passed to 'elu' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('selu', jasmine_util_1.ALL_ENVS, function () {
    var scaleAlpha = selu_util.SELU_SCALEALPHA;
    var scale = selu_util.SELU_SCALE;
    it('calculate selu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -1, 0]);
                    result = tf.selu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.0507, -1.1113, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('selu propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN]);
                    result = tf.selu(a);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.0507, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValue, dyValue, a, dy, gradients, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    aValue = 1;
                    dyValue = 1;
                    a = tf.scalar(aValue);
                    dy = tf.scalar(dyValue);
                    gradients = tf.grad(function (a) { return tf.selu(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [dyValue * scale]]);
                    aValue = -1;
                    dyValue = 2;
                    a = tf.scalar(aValue);
                    dy = tf.scalar(dyValue);
                    gradients = tf.grad(function (a) { return tf.selu(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [dyValue * scaleAlpha * Math.exp(aValue)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValue, dyValue, a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValue = 1;
                    dyValue = 1;
                    a = tf.scalar(aValue);
                    dy = tf.scalar(dyValue);
                    gradients = tf.grad(function (a) { return tf.selu(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [dyValue * scale]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1, -1, 0];
                    dyValues = [1, 2, 3];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.selu(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        if (aValues[i] > 0) {
                            expected[i] = dyValues[i] * scale;
                        }
                        else {
                            expected[i] = dyValues[i] * scaleAlpha * Math.exp(aValues[i]);
                        }
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1, -1, 0, 0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.selu(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        if (aValues[i] > 0) {
                            expected[i] = dyValues[i] * scale;
                        }
                        else {
                            expected[i] = dyValues[i] * scaleAlpha * Math.exp(aValues[i]);
                        }
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.selu({}); })
            .toThrowError(/Argument 'x' passed to 'selu' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.selu([1, -1, 0]);
                    expect(result.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.0507, -1.1113, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.selu('q'); })
            .toThrowError(/Argument 'x' passed to 'selu' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('clip', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, min, max, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
                    min = -1;
                    max = 50;
                    result = tf.clipByValue(a, min, max);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -1, 0, 50, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, min, max, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2, NaN]);
                    min = -1;
                    max = 50;
                    result = tf.clipByValue(a, min, max);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -1, 0, 50, -1, 2, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min greater than max', function () {
        var a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
        var min = 1;
        var max = -1;
        var f = function () {
            tf.clipByValue(a, min, max);
        };
        expect(f).toThrowError();
    });
    it('derivative: 1D tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = tf.tensor1d([3, -2, 1]);
                    dy = tf.tensor1d([5, 50, 500]);
                    gradients = tf.grad(function (x) { return x.clipByValue(min, max); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 500]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative: 1D tensor with max or min value', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = tf.tensor1d([-1, 1, 2, 3]);
                    dy = tf.tensor1d([1, 10, 100, 1000]);
                    gradients = tf.grad(function (x) { return x.clipByValue(min, max); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 10, 100, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative: scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = tf.scalar(-10);
                    dy = tf.scalar(5);
                    gradients = tf.grad(function (x) { return x.clipByValue(min, max); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = tf.scalar(-10);
                    dy = tf.scalar(5);
                    gradients = tf.grad(function (x) { return x.clone().clipByValue(min, max).clone(); })(x, dy);
                    expect(gradients.shape).toEqual(x.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivate with primitive as input', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 2;
                    x = -10;
                    dy = tf.scalar(5);
                    gradients = tf.grad(function (x) { return x.clipByValue(min, max); })(x, dy);
                    expect(gradients.shape).toEqual([]);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.clipByValue({}, 0, 1); })
            .toThrowError(/Argument 'x' passed to 'clipByValue' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    min = -1;
                    max = 50;
                    result = tf.clipByValue([3, -1, 0, 100, -7, 2], min, max);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -1, 0, 50, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('clip(x, eps, 1-eps) never returns 0 or 1', function () { return __awaiter(_this, void 0, void 0, function () {
        var min, max, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    min = tf.backend().epsilon();
                    max = 0.5;
                    return [4 /*yield*/, tf.clipByValue([0, 1], min, max).data()];
                case 1:
                    res = _a.sent();
                    expect(res[0]).toBeGreaterThan(0);
                    expect(res[1]).toBeCloseTo(max);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.clipByValue('q', 0, 1); })
            .toThrowError(/Argument 'x' passed to 'clipByValue' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('round', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.9, 2.5, 2.3, 1.5, -4.5]);
                    r = a.round();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 2, 2, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.5, NaN, -1.4]);
                    r = tf.round(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, NaN, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.round(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(5.2);
                    dy = tf.scalar(3);
                    gradients = tf.grad(function (a) { return tf.round(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-1.1, 2.6, 3, -5.9]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    gradients = tf.grad(function (a) { return tf.round(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([-3, 1, 2.2, 3], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    gradients = tf.grad(function (a) { return tf.round(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.round({}); })
            .toThrowError(/Argument 'x' passed to 'round' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.round([0.9, 2.5, 2.3, 1.5, -4.5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 2, 2, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.round('q'); })
            .toThrowError(/Argument 'x' passed to 'round' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('asinh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    a = tf.tensor1d(values);
                    result = tf.asinh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.asinh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1);
                    result = tf.asinh(a);
                    expected = [Math.asinh(1)];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.asinh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.asinh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 0]);
                    res = tf.asinh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.asinh(4), NaN, Math.asinh(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.asinh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / Math.sqrt(1.0 + 0.5 * 0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.asinh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / Math.sqrt(1.0 + 0.5 * 0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-1, 2, 3, -5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.asinh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(1 + aValues[i] * aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-3, 1, 2, 3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.asinh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(1 + aValues[i] * aValues[i]);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.asinh({}); })
            .toThrowError(/Argument 'x' passed to 'asinh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [1, -3, 2, 7, -4];
                    result = tf.asinh(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.asinh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.asinh('q'); })
            .toThrowError(/Argument 'x' passed to 'asinh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('acosh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [2, 3, 4, 5, 6];
                    a = tf.tensor1d(values);
                    result = tf.acosh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.acosh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = 2;
                    a = tf.scalar(value);
                    result = tf.acosh(a);
                    expected = [Math.acosh(value)];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [2, 3, 4, 5];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.acosh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.acosh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, NaN, 2]);
                    res = tf.acosh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.acosh(4), NaN, Math.acosh(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaN outside function domain', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([4, -1, 2]);
                    res = tf.acosh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.acosh(4), NaN, Math.acosh(2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.acosh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8.0 / Math.sqrt(1.5 * 1.5 - 1.0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.acosh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8.0 / Math.sqrt(1.5 * 1.5 - 1.0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [2, 3, 5, 10];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.acosh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(Math.pow(aValues[i], 2) - 1.0);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [2, 3, 5, 7];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.acosh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / Math.sqrt(Math.pow(aValues[i], 2) - 1.0);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.acosh({}); })
            .toThrowError(/Argument 'x' passed to 'acosh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [2, 3, 4, 5, 6];
                    result = tf.acosh(values);
                    expected = [];
                    for (i = 0; i < values.length; i++) {
                        expected[i] = Math.acosh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.acosh('q'); })
            .toThrowError(/Argument 'x' passed to 'acosh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('atanh', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [-0.25, 0.25, 0.5, .75, -0.4];
                    a = tf.tensor1d(values);
                    result = tf.atanh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atanh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = 0.2;
                    a = tf.scalar(value);
                    result = tf.atanh(a);
                    expected = [Math.atanh(value)];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [0.2, 0.3, 0.4, 0.5];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.atanh(a);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atanh(values[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, NaN, 0]);
                    res = tf.atanh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.atanh(0.5), NaN, Math.atanh(0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaN outside function domain', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-2, 0, 2]);
                    res = tf.atanh(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, Math.atanh(0), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.atanh(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (1 - 0.5 * 0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.atanh(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8 / (1 - 0.5 * 0.5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.1, 0.2, 0.3, -0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.atanh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (1 - Math.pow(aValues[i], 2));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.3, 0.1, 0.2, 0.3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.atanh(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] / (1 - Math.pow(aValues[i], 2));
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.atanh({}); })
            .toThrowError(/Argument 'x' passed to 'atanh' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.atanh(0.2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.atanh(0.2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.atanh('q'); })
            .toThrowError(/Argument 'x' passed to 'atanh' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('erf', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [-0.25, 0.25, 0.5, .75, -0.4];
                    a = tf.tensor1d(values);
                    result = tf.erf(a);
                    expected = [-0.2763264, 0.2763264, 0.5204999, 0.7111556, -0.4283924];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1);
                    result = tf.erf(a);
                    expected = [0.8427008];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar in int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(1, 'int32');
                    result = tf.erf(a);
                    expected = [0.8427008];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var values, a, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    values = [0.2, 0.3, 0.4, 0.5];
                    a = tf.tensor2d(values, [2, 2]);
                    result = tf.erf(a);
                    expected = [0.2227026, 0.32862678, 0.42839235, 0.5204999];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, NaN, 0]);
                    res = tf.erf(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5204999, NaN, 0.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.erf(a); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [8 * 2 * Math.exp(-0.5 * 0.5) / Math.sqrt(Math.PI)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.5);
                    dy = tf.scalar(8);
                    gradients = tf.grad(function (a) { return tf.erf(a.clone()).clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [8 * 2 * Math.exp(-0.5 * 0.5) / Math.sqrt(Math.PI)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.1, 0.2, 0.3, -0.5];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor1d(aValues);
                    dy = tf.tensor1d(dyValues);
                    gradients = tf.grad(function (a) { return tf.erf(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * 2 * Math.exp(-aValues[i] * aValues[i]) /
                            Math.sqrt(Math.PI);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, dyValues, a, dy, gradients, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [-0.3, 0.1, 0.2, 0.3];
                    dyValues = [1, 2, 3, 4];
                    a = tf.tensor2d(aValues, [2, 2]);
                    dy = tf.tensor2d(dyValues, [2, 2]);
                    gradients = tf.grad(function (a) { return tf.erf(a); })(a, dy);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = dyValues[i] * 2 * Math.exp(-aValues[i] * aValues[i]) /
                            Math.sqrt(Math.PI);
                    }
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.erf({}); })
            .toThrowError(/Argument 'x' passed to 'erf' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.erf(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.8427008]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.erf('q'); })
            .toThrowError(/Argument 'x' passed to 'erf' must be numeric/);
    });
});
//# sourceMappingURL=unary_ops_test.js.map