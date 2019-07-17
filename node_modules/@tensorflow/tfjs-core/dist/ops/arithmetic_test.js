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
jasmine_util_1.describeWithFlags('div', jasmine_util_1.ALL_ENVS, function () {
    it('same shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    c = tf.tensor2d([1, 2, 3, 4, 2, 5], [2, 3]);
                    r = tf.div(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 1, 2.5, 6 / 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0, 1, -2, -4, 4, -4];
                    b = [0.15, 0.2, 0.25, 0.5, 0.7, 1.2];
                    result = tf.div(a, b);
                    expect(result.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, 5.0, -8.0, -8.0, 5.714285850524902, -3.3333332538604736]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0, 1, -2, -4, 4, -4]);
                    b = [0.15, 0.2, 0.25, 0.5, 0.7, 1.2];
                    result = a.div(b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, 5.0, -8.0, -8.0, 5.714285850524902, -3.3333332538604736]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('integer division implements floor divide', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-6, -6, -5, -4, -3, -3, 3, 3, 2], 'int32');
                    c = tf.tensor1d([-2, 2, 3, 2, -3, 3, 2, 3, 2], 'int32');
                    r = tf.div(a, c);
                    expect(r.dtype).toEqual('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -3, -2, -2, 1, -1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('integer division broadcasts', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-5, -4, 3, 2], 'int32');
                    c = tf.scalar(2, 'int32');
                    r = tf.div(a, c);
                    expect(r.dtype).toEqual('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-3, -2, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2], [2, 1]);
                    c = tf.tensor2d([3, NaN], [2, 1]);
                    r = tf.div(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 3, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    result = tf.div(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [1 / 2, 1, -1, -4 / 3];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    b = [2];
                    result = tf.div(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [0.5, 1, 1.5, 2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2]);
                    result = tf.div(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [1, 1, -3, -2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res = tf.div(tf.scalar(6, 'int32'), tf.scalar(3, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [2]]);
                    res = tf.div(tf.scalar(6, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed tensors of different shapes', function () {
        var a = tf.tensor2d([1, 2, -3, -4, 5, 6], [2, 3]);
        var b = tf.tensor2d([5, 3, 4, -7], [2, 2]);
        expect(function () { return tf.div(a, b); }).toThrowError();
        expect(function () { return tf.div(b, a); }).toThrowError();
    });
    it('scalar divided by array', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(2);
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    r = tf.div(c, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2 / 1, 2 / 2, 2 / 3, 2 / 4, 2 / 5, 2 / 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar divided by array propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(NaN);
                    a = tf.tensor2d([1, 2, 3], [1, 3]);
                    r = tf.div(c, a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array divided by scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    c = tf.scalar(2);
                    r = tf.div(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 2, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array divided by scalar propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, NaN], [1, 3]);
                    c = tf.scalar(2);
                    r = tf.div(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 2, 2 / 2, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, before, grads, _a, da, db, now, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2);
                    dy = tf.scalar(4);
                    before = tf.memory().numTensors;
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    now = tf.memory().numTensors;
                    expect(now).toBe(before + 2);
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4 / 2]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-4 * 5 / (2 * 2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    grads = tf.grads(function (a, b) { return tf.div(a.clone(), b.clone()).clone(); });
                    _a = grads([5, 2]), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual([]);
                    expect(db.shape).toEqual([]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 / 2]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-5 / 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 / 3, 10 / 4, 20 / 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1 * 1 / 9, -10 * 2 / 16, -20 * 3 / 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor1D with int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3], 'int32');
                    b = tf.tensor1d([3, 4, 5], 'int32');
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 / 3, 10 / 4, 20 / 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1 * 1 / 9, -10 * 2 / 16, -20 * 3 / 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: 1d<int32> with 1d<bool> ', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([true, false, true], 'bool');
                    b = tf.tensor1d([1, 2, 3], 'int32');
                    dy = tf.tensor1d([1, 19, 20]);
                    grads = tf.grads(function (a, b) { return tf.div(a.toInt(), b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1, 19 / 2, 20 / 3]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1 / 1, 0, -20 / 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 1, 2, 3], [2, 2]);
                    b = tf.tensor2d([1, 3, 4, 5], [2, 2]);
                    dy = tf.tensor2d([1, 10, 15, 20], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 / 1, 10 / 3, 15 / 4, 20 / 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1 * 3 / 1, -10 * 1 / 9, -15 * 2 / 16, -20 * 3 / 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar / Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([6, 7, 8]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 / 3 + 7 / 4 + 8 / 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-6 * 2 / 9, -7 * 2 / 16, -8 * 2 / 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    b = tf.scalar(2);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 / 2, 7 / 2, 8 / 2, 9 / 2]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-6 * 2 / 4 + -7 * 3 / 4 + -8 * 4 / 4 + -9 * 5 / 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / Tensor2D w/ broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 4], [2, 1]);
                    b = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.div(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 / 2 + 7 / 3, 8 / 4 + 9 / 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-6 * 3 / 4, -7 * 3 / 9, -8 * 4 / 16, -9 * 4 / 25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.div({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'div' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.div(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'div' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.div([[1, 2, 3], [4, 5, 6]], 2);
                    expect(r.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 / 2, 2 / 2, 3 / 2, 4 / 2, 5 / 2, 6 / 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('mul', jasmine_util_1.ALL_ENVS, function () {
    it('strict same-shaped tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([5, 3, 4, -7], [2, 2]);
                    expected = [5, 6, -12, 28];
                    result = tf.mulStrict(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('strict propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 3, 4, 0], [2, 2]);
                    b = tf.tensor2d([NaN, 3, NaN, 3], [2, 2]);
                    result = tf.mulStrict(a, b);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, 9, NaN, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('strict throws when passed tensors of different shapes', function () {
        var a = tf.tensor2d([1, 2, -3, -4, 5, 6], [2, 3]);
        var b = tf.tensor2d([5, 3, 4, -7], [2, 2]);
        expect(function () { return tf.mulStrict(a, b); }).toThrowError();
        expect(function () { return tf.mulStrict(b, a); }).toThrowError();
    });
    it('strict throws when dtypes do not match', function () {
        var a = tf.tensor2d([1, 2, -3, -4, 5, 6], [2, 3], 'float32');
        var b = tf.tensor2d([5, 3, 4, -7], [2, 2], 'int32');
        expect(function () { return tf.mulStrict(a, b); }).toThrowError();
        expect(function () { return tf.mulStrict(b, a); }).toThrowError();
    });
    it('strict int32 * int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2], 'int32');
                    b = tf.tensor2d([2, 1, 3, -4], [2, 2], 'int32');
                    res = tf.mulStrict(a, b);
                    expect(res.dtype).toBe('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, -9, 16]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('same-shaped tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([5, 3, 4, -7], [2, 2]);
                    expected = [5, 6, -12, 28];
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[1, 2], [-3, -4]];
                    b = [[5, 3], [4, -7]];
                    expected = [5, 6, -12, 28];
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = [[5, 3], [4, -7]];
                    expected = [5, 6, -12, 28];
                    result = a.mul(b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.scalar(2);
                    expected = [2, 4, -6, -8];
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [2, 4, -9, -12];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2]);
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [1, 4, -3, -8];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast 5D + 2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(1, 33).reshape([2, 2, 2, 2, 2]);
                    b = tf.tensor([2, 3], [2, 1]);
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2, 2, 2, 2]);
                    expected = [
                        2, 4, 9, 12, 10, 12, 21, 24, 18, 20, 33, 36, 26, 28, 45, 48,
                        34, 36, 57, 60, 42, 44, 69, 72, 50, 52, 81, 84, 58, 60, 93, 96
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast 6D + 2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(1, 65).reshape([2, 2, 2, 2, 2, 2]);
                    b = tf.tensor([2, 3], [2, 1]);
                    result = tf.mul(a, b);
                    expect(result.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    expected = [
                        2, 4, 9, 12, 10, 12, 21, 24, 18, 20, 33, 36, 26,
                        28, 45, 48, 34, 36, 57, 60, 42, 44, 69, 72, 50, 52,
                        81, 84, 58, 60, 93, 96, 66, 68, 105, 108, 74, 76, 117,
                        120, 82, 84, 129, 132, 90, 92, 141, 144, 98, 100, 153, 156,
                        106, 108, 165, 168, 114, 116, 177, 180, 122, 124, 189, 192
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2);
                    dy = tf.scalar(4);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, b.mul(dy).data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, a.mul(dy).data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    grads = tf.grads(function (a, b) { return tf.mul(a.clone(), b.clone()).clone(); });
                    _a = grads([4, 2]), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual([]);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), 2]);
                    expect(db.shape).toEqual([]);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 1, 4 * 10, 5 * 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 1, 2 * 10, 3 * 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor1D with dtype int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3], 'int32');
                    b = tf.tensor1d([3, 4, 5], 'int32');
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 1, 4 * 10, 5 * 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 1, 2 * 10, 3 * 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 1, 2, 3], [2, 2]);
                    b = tf.tensor2d([1, 3, 4, 5], [2, 2]);
                    dy = tf.tensor2d([1, 10, 15, 20], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1, 3 * 10, 4 * 15, 5 * 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 1, 1 * 10, 2 * 15, 3 * 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar * Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([6, 7, 8]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 6 + 4 * 7 + 5 * 8]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [2 * 6, 2 * 7, 2 * 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D * scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    b = tf.scalar(2);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2 * 6, 2 * 7, 2 * 8, 2 * 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [2 * 6 + 3 * 7 + 4 * 8 + 5 * 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D * Tensor2D w/ broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 4], [2, 1]);
                    b = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.mul(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2 * 6 + 3 * 7, 4 * 8 + 5 * 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [6 * 3, 7 * 3, 8 * 4, 9 * 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number multiplication', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([2]);
                    imag1 = tf.tensor1d([3]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([4]);
                    imag2 = tf.tensor1d([5]);
                    complex2 = tf.complex(real2, imag2);
                    result = complex1.mul(complex2);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2 * 4 - 3 * 5, 2 * 5 + 3 * 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number broadcasting multiplication', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    imag1 = tf.tensor2d([10, 20, -30, -40], [2, 2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([4]);
                    imag2 = tf.tensor1d([5]);
                    complex2 = tf.complex(real2, imag2);
                    result = tf.mul(complex1, complex2);
                    expect(result.dtype).toEqual('complex64');
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1 * 4 - 10 * 5, 1 * 5 + 10 * 4, 2 * 4 - 20 * 5, 2 * 5 + 20 * 4,
                            -3 * 4 + 30 * 5, -3 * 5 + -30 * 4, -4 * 4 + 40 * 5, -4 * 5 + -40 * 4
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.mul({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'mul' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.mul(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'mul' must be a Tensor/);
    });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    res = tf.mul(tf.scalar(2, 'int32'), tf.scalar(3, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [6]]);
                    res = tf.mul(tf.scalar(2, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [2]]);
                    res = tf.mul(tf.scalar(2, 'int32'), tf.scalar(false, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.mul([[1, 2], [-3, -4]], 2);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, -6, -8]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('pow', jasmine_util_1.ALL_ENVS, function () {
    it('same-shaped tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, -2, -3, 0, 7, 1], [2, 3]);
                    b = tf.tensor2d([5, 3, 4, 5, 2, -3], [2, 3], 'int32');
                    expected = [1, -8, 81, 0, 49, 1];
                    result = tf.pow(a, b);
                    expect(result.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected, 0.01]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, exp, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 2, 3];
                    exp = 2;
                    result = tf.pow(a, exp);
                    expect(result.shape).toEqual([3]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, exp, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    exp = 2;
                    result = a.pow(exp);
                    expect(result.shape).toEqual([3]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32^int32 returns int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, exp, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3], 'int32');
                    exp = tf.scalar(2, 'int32');
                    result = tf.pow(a, exp);
                    expect(result.shape).toEqual([3]);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('different-shaped tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, -2, -3, 0, 7, 1], [2, 3]);
                    b = tf.scalar(2, 'int32');
                    expected = [1, 4, 9, 0, 49, 1];
                    result = tf.pow(a, b);
                    expect(result.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected, 0.05]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([NaN, 3, NaN, 0], [2, 2]);
                    b = tf.tensor2d([1, 3, 2, 3], [2, 2], 'int32');
                    result = tf.pow(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, 27, NaN, 0], 0.05]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('handles non int32 exponent param', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 4]);
                    b = tf.tensor1d([.5, 1.2]);
                    result = tf.pow(a, b);
                    expected = [Math.pow(2, 0.5), Math.pow(4, 1.2)];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 1], [2, 1], 'int32');
                    result = tf.pow(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [1, 4, -3, -4];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2], 'int32');
                    result = tf.pow(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [1, 4, -3, 16];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('powStrict same-shaped tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, -2, -3, 0, 7, 1], [2, 3]);
                    b = tf.tensor2d([5, 3, 4, 5, 2, -3], [2, 3], 'int32');
                    expected = [1, -8, 81, 0, 49, 1];
                    result = tf.powStrict(a, b);
                    expect(result.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected, 0.01]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('powStrict throws when passed tensors of different shapes', function () {
        var a = tf.tensor2d([1, 2, -3, -4, 5, 6], [2, 3]);
        var b = tf.tensor2d([5, 3, 4, -7], [2, 2], 'int32');
        expect(function () { return tf.powStrict(a, b); }).toThrowError();
    });
    it('powStrict handles non int32 exponent param', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 4]);
                    b = tf.tensor1d([.5, 1.2]);
                    result = tf.powStrict(a, b);
                    expected = [Math.pow(2, 0.5), Math.pow(4, 1.2)];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar ^ Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2, 'int32');
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2 * 5 * 3]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * Math.pow(5, 2) * Math.log(5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2, 'int32');
                    grads = tf.grads(function (a, b) { return tf.pow(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b]), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2 * 5]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [Math.pow(5, 2) * Math.log(5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: x ^ 2 where x = 0', function () { return __awaiter(_this, void 0, void 0, function () {
        var f, g, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    f = function (x) { return x.pow(tf.scalar(2)).asScalar(); };
                    g = tf.grad(f)(tf.scalar(0));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, g.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar ^ Scalar fractional exponent', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(4.0);
                    b = tf.scalar(1.5);
                    dy = tf.scalar(3.0);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1.5 * Math.pow(4, 0.5) * 3]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3.0 * Math.pow(4, 1.5) * Math.log(4.0)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor ^ Tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([-1, .5, 2]);
                    b = tf.tensor1d([3, 2, -1], 'int32');
                    dy = tf.tensor1d([1, 5, 10]);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [
                            3 * Math.pow(-1, 2) * 1, 2 * Math.pow(.5, 1) * 5,
                            -1 * Math.pow(2, -2) * 10
                        ],
                        1e-1]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            0, 5 * Math.pow(.5, 2) * Math.log(.5), 10 * Math.pow(2, -1) * Math.log(2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient wrt exponent with negative base', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, db, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor1d([-1, -.5, -2.7]);
                    b = tf.tensor1d([3, 2, -1], 'int32');
                    dy = tf.tensor1d([1, 1, 1]);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), db = _a[1];
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 1:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar / Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([6, 7, 8]);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            6 * 3 * Math.pow(2, 2) + 7 * 4 * Math.pow(2, 3) + 8 * 5 * Math.pow(2, 4)
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            6 * Math.pow(2, 3) * Math.log(2), 7 * Math.pow(2, 4) * Math.log(2),
                            8 * Math.pow(2, 5) * Math.log(2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    b = tf.scalar(2);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            6 * 2 * Math.pow(2, 1), 7 * 2 * Math.pow(3, 1), 8 * 2 * Math.pow(4, 1),
                            9 * 2 * Math.pow(5, 1)
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [6 * Math.pow(2, 2) * Math.log(2) + 7 * Math.pow(3, 2) * Math.log(3) +
                                8 * Math.pow(4, 2) * Math.log(4) + 9 * Math.pow(5, 2) * Math.log(5)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / Tensor2D w/ broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 4], [2, 1]);
                    b = tf.tensor2d([[2, 3], [.4, .5]], [2, 2]);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.pow(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            6 * 2 * Math.pow(3, 1) + 7 * 3 * Math.pow(3, 2),
                            8 * .4 * Math.pow(4, .4 - 1) + 9 * .5 * Math.pow(4, .5 - 1)
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            6 * Math.pow(3, 2) * Math.log(3), 7 * Math.pow(3, 3) * Math.log(3),
                            8 * Math.pow(4, .4) * Math.log(4), 9 * Math.pow(4, .5) * Math.log(4)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed base as a non-tensor', function () {
        expect(function () { return tf.pow({}, tf.scalar(1)); })
            .toThrowError(/Argument 'base' passed to 'pow' must be a Tensor/);
    });
    it('throws when passed exp as a non-tensor', function () {
        expect(function () { return tf.pow(tf.scalar(1), {}); })
            .toThrowError(/Argument 'exp' passed to 'pow' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.pow([1, 2, 3], 2);
                    expect(result.shape).toEqual([3]);
                    expect(result.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('negative base and whole exponent not NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-2, -3, -4], 'float32');
                    b = tf.tensor1d([2, -3, 4], 'float32');
                    expected = [Math.pow(-2, 2), Math.pow(-3, -3), Math.pow(-4, 4)];
                    result = tf.pow(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('negative base and fract exponent NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([-2, -3, -4], 'float32');
                    b = tf.tensor1d([2.1, -3.01, 4.1], 'float32');
                    expected = [NaN, NaN, NaN];
                    result = tf.pow(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('add', jasmine_util_1.ALL_ENVS, function () {
    it('c + A', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(5);
                    a = tf.tensor1d([1, 2, 3]);
                    result = tf.add(c, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('c + A propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(NaN);
                    a = tf.tensor1d([1, 2, 3]);
                    res = tf.add(c, a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    result = tf.add(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [3, 4, 0, -1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2]);
                    result = tf.add(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [2, 4, -2, -2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = tf.tensor1d([4, 2, -1]);
                    result = tf.add(a, b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [2, 5, 1];
                    b = [4, 2, -1];
                    result = tf.add(a, b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = [4, 2, -1];
                    result = a.add(b);
                    expected = [6, 7, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, NaN]);
                    b = tf.tensor1d([4, 2, -1]);
                    res = tf.add(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A + B throws when passed tensors with different shape', function () {
        var a = tf.tensor1d([2, 5, 1, 5]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.add(a, b); }).toThrowError();
        expect(function () { return tf.add(b, a); }).toThrowError();
    });
    it('2D+scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.scalar(2);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar+1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([1, 2, 3, 4, 5, 6]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 5, 6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D+2D broadcast each with 1 dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5], [1, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8, 9, 12, 4, 5, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D+2D broadcast inner dim of b', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [8, 9, 12, 7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D+scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    b = tf.scalar(-1);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 2, 3, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D+scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, expectedResult, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(0, 64).reshape([2, 2, 2, 2, 2, 2]);
                    b = tf.scalar(-1);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    expectedResult = [
                        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                        31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
                        47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D+2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, expectedResult, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(0, 64).reshape([2, 2, 2, 2, 2, 2]);
                    b = tf.tensor2d([11, 13, 17, 19], [2, 2]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    expectedResult = [
                        11, 14, 19, 22, 15, 18, 23, 26, 19, 22, 27, 30, 23, 26, 31, 34,
                        27, 30, 35, 38, 31, 34, 39, 42, 35, 38, 43, 46, 39, 42, 47, 50,
                        43, 46, 51, 54, 47, 50, 55, 58, 51, 54, 59, 62, 55, 58, 63, 66,
                        59, 62, 67, 70, 63, 66, 71, 74, 67, 70, 75, 78, 71, 74, 79, 82
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add tensors with 0 in shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1]);
                    b = tf.tensor3d([], [0, 0, 5]);
                    res = tf.add(a, b);
                    expect(res.shape).toEqual([0, 0, 5]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar + 1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.add(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 + 8 + 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.add(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 + 8 + 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [7, 8, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: 2D + 2D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([2, 3], [2, 1]);
                    b = tf.tensor2d([4, 5, 6, 7], [2, 2]);
                    dy = tf.tensor2d([5, 4, 3, 2], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.add(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [5 + 4, 3 + 2]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [5, 4, 3, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([1]);
                    imag1 = tf.tensor1d([2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([3]);
                    imag2 = tf.tensor1d([4]);
                    complex2 = tf.complex(real2, imag2);
                    result = complex1.add(complex2);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number reshape and then addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, complex1Reshaped, complex2Reshaped, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([1]);
                    imag1 = tf.tensor1d([2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([3]);
                    imag2 = tf.tensor1d([4]);
                    complex2 = tf.complex(real2, imag2);
                    complex1Reshaped = complex1.reshape([1, 1, 1]);
                    complex2Reshaped = complex2.reshape([1, 1, 1]);
                    result = complex1Reshaped.add(complex2Reshaped);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number broadcasting addition', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    imag1 = tf.tensor2d([10, 20, -30, -40], [2, 2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([4]);
                    imag2 = tf.tensor1d([5]);
                    complex2 = tf.complex(real2, imag2);
                    result = tf.add(complex1, complex2);
                    expect(result.dtype).toEqual('complex64');
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 + 4, 10 + 5, 2 + 4, 20 + 5, -3 + 4, -30 + 5, -4 + 4, -40 + 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.add({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'add' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.add(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'add' must be a Tensor/);
    });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [2]]);
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [2]]);
                    res = tf.add(tf.scalar(1, 'int32'), tf.scalar(false, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [1]]);
                    res = tf.add(tf.complex(4, 7), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('complex64');
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [5, 7]]);
                    res = tf.add(tf.complex(4, 7), tf.scalar(1, 'int32'));
                    expect(res.dtype).toBe('complex64');
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [5, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.add(5, [1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 7, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('addN', jasmine_util_1.ALL_ENVS, function () {
    it('a single tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([tf.tensor1d([1, 2, 3])]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('two tensors, int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([
                        tf.tensor1d([1, 2, -1], 'int32'),
                        tf.tensor1d([5, 3, 2], 'int32'),
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 5, 1]]);
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('three tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([
                        tf.tensor1d([1, 2]),
                        tf.tensor1d([5, 3]),
                        tf.tensor1d([-5, -2]),
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([[1, 2], [3, 4]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('list of numbers gets treated as a list of scalars', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    res = tf.addN([1, 2, 3, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('errors if list is empty', function () {
        expect(function () { return tf.addN([]); })
            .toThrowError(/Must pass at least one tensor to tf.addN\(\), but got 0/);
    });
    it('errors if argument is not an array', function () {
        // tslint:disable-next-line:no-any
        expect(function () { return tf.addN(tf.scalar(3)); })
            .toThrowError(/The argument passed to tf.addN\(\) must be a list of tensors/);
    });
    it('errors if arguments not of same dtype', function () {
        expect(function () { return tf.addN([tf.scalar(1, 'int32'), tf.scalar(2, 'float32')]); })
            .toThrowError(/All tensors passed to tf.addN\(\) must have the same dtype/);
    });
    it('errors if arguments not of same shape', function () {
        expect(function () { return tf.addN([tf.scalar(1), tf.tensor1d([2])]); })
            .toThrowError(/All tensors passed to tf.addN\(\) must have the same shape/);
    });
});
jasmine_util_1.describeWithFlags('sub', jasmine_util_1.ALL_ENVS, function () {
    it('c - A', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(5);
                    a = tf.tensor1d([7, 2, 3]);
                    result = tf.sub(c, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-2, 3, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - c', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3]);
                    c = tf.scalar(5);
                    result = tf.sub(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-4, -3, -8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - c propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 3]);
                    c = tf.scalar(5);
                    res = tf.sub(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-4, NaN, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = tf.tensor1d([4, 2, -1]);
                    result = tf.sub(a, b);
                    expected = [-2, 3, 2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [2, 5, 1];
                    b = [4, 2, -1];
                    result = tf.sub(a, b);
                    expected = [-2, 3, 2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = [4, 2, -1];
                    result = a.sub(b);
                    expected = [-2, 3, 2];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - B propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, 1]);
                    b = tf.tensor1d([4, NaN, -1]);
                    res = tf.sub(a, b);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-2, NaN, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - B throws when passed tensors with different shape', function () {
        var a = tf.tensor1d([2, 5, 1, 5]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.sub(a, b); }).toThrowError();
        expect(function () { return tf.sub(b, a); }).toThrowError();
    });
    it('A - B broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    result = tf.sub(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [-1, 0, -6, -7];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A - B broadcast 2D + 1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    b = tf.tensor1d([1, 2]);
                    result = tf.sub(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [0, 0, -4, -6];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D-scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.scalar(2);
                    res = tf.sub(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, 0, 1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar-1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([1, 2, 3, 4, 5, 6]);
                    res = tf.sub(a, b);
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, -1, -2, -3, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D-2D broadcast each with 1 dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5], [1, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.sub(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-6, -5, -2, -2, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D-2D broadcast inner dim of b', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([7, 3], [2, 1]);
                    res = tf.sub(a, b);
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-6, -5, -2, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D-scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    b = tf.scalar(-1);
                    res = tf.sub(a, b);
                    expect(res.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 4, 5, 6, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: basic 1D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([3, 2, 1]);
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.sub(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1, 10, 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1, -10, -20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([3, 2, 1]);
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.sub(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1, 10, 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1, -10, -20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: basic 2D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([0, 1, 2, 3], [2, 2]);
                    b = tf.tensor2d([3, 2, 1, 0], [2, 2]);
                    dy = tf.tensor2d([1, 10, 15, 20], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.sub(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1, 10, 15, 20]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1, -10, -15, -20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: 1D - scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([3, 4, 5]);
                    b = tf.scalar(2);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.sub(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7, 8, 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-7 - 8 - 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar - 1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([7, 8, 9]);
                    grads = tf.grads(function (a, b) { return tf.sub(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 + 8 + 9]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-7, -8, -9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: 2D - 2D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([4, 5, 6, 7], [2, 2]);
                    b = tf.tensor2d([2, 3], [2, 1]);
                    dy = tf.tensor2d([5, 4, 3, 2], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.sub(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [5, 4, 3, 2]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-5 - 4, -3 - 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number subtraction', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor1d([3]);
                    imag1 = tf.tensor1d([5]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([1]);
                    imag2 = tf.tensor1d([0]);
                    complex2 = tf.complex(real2, imag2);
                    result = complex1.sub(complex2);
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('complex number broadcasting subtraction', function () { return __awaiter(_this, void 0, void 0, function () {
        var real1, imag1, complex1, real2, imag2, complex2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real1 = tf.tensor2d([1, 2, -3, -4], [2, 2]);
                    imag1 = tf.tensor2d([10, 20, -30, -40], [2, 2]);
                    complex1 = tf.complex(real1, imag1);
                    real2 = tf.tensor1d([4]);
                    imag2 = tf.tensor1d([5]);
                    complex2 = tf.complex(real2, imag2);
                    result = tf.sub(complex1, complex2);
                    expect(result.dtype).toEqual('complex64');
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1 - 4, 10 - 5, 2 - 4, 20 - 5, -3 - 4, -30 - 5, -4 - 4, -40 - 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.sub({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'sub' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.sub(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'sub' must be a Tensor/);
    });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    res = tf.sub(tf.scalar(1, 'int32'), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [0]]);
                    res = tf.sub(tf.scalar(1, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [0]]);
                    res = tf.sub(tf.scalar(1, 'int32'), tf.scalar(false, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [1]]);
                    res = tf.sub(tf.complex(4, 7), tf.scalar(1, 'float32'));
                    expect(res.dtype).toBe('complex64');
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [3, 7]]);
                    res = tf.sub(tf.complex(4, 7), tf.scalar(1, 'int32'));
                    expect(res.dtype).toBe('complex64');
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [3, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.sub(5, [7, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-2, 3, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=arithmetic_test.js.map