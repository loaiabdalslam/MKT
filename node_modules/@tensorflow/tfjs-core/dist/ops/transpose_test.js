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
jasmine_util_1.describeWithFlags('transpose', jasmine_util_1.ALL_ENVS, function () {
    it('of scalar is no-op', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(3);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.transpose(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('of 1D is no-op', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.transpose(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('of scalar with perm of incorrect rank throws error', function () {
        var a = tf.scalar(3);
        var perm = [0]; // Should be empty array.
        expect(function () { return tf.transpose(a, perm); }).toThrowError();
    });
    it('of 1d with perm out of bounds throws error', function () {
        var a = tf.tensor1d([1, 2, 3]);
        var perm = [1];
        expect(function () { return tf.transpose(a, perm); }).toThrowError();
    });
    it('of 1d with perm incorrect rank throws error', function () {
        var a = tf.tensor1d([1, 2, 3]);
        var perm = [0, 0]; // Should be of length 1.
        expect(function () { return tf.transpose(a, perm); }).toThrowError();
    });
    it('2D (no change)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    t = tf.tensor2d([1, 11, 2, 22, 3, 33, 4, 44], [2, 4]);
                    t2 = tf.transpose(t, [0, 1]);
                    expect(t2.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.array()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, t.array()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D (transpose)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor2d([1, 11, 2, 22, 3, 33, 4, 44], [2, 4]);
                    t2 = tf.transpose(t, [1, 0]);
                    expect(t2.shape).toEqual([4, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 11, 33, 2, 4, 22, 44]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D [r, c, d] => [d, r, c]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    t2 = tf.transpose(t, [2, 0, 1]);
                    expect(t2.shape).toEqual([2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 11, 22, 33, 44]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D [r, c, d] => [d, c, r]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    t2 = tf.transpose(t, [2, 1, 0]);
                    expect(t2.shape).toEqual([2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 2, 4, 11, 33, 22, 44]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D [r, c, d, e, f] => [r, c, d, f, e]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor5d(new Array(32).fill(0).map(function (x, i) { return i + 1; }), [2, 2, 2, 2, 2]);
                    t2 = tf.transpose(t, [0, 1, 2, 4, 3]);
                    expect(t2.shape).toEqual([2, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 3, 2, 4, 5, 7, 6, 8, 9, 11, 10, 12, 13, 15, 14, 16,
                            17, 19, 18, 20, 21, 23, 22, 24, 25, 27, 26, 28, 29, 31, 30, 32
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D [r, c, d, e, f] => [c, r, d, e, f]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor5d(new Array(32).fill(0).map(function (x, i) { return i + 1; }), [2, 2, 2, 2, 2]);
                    t2 = tf.transpose(t, [1, 0, 2, 3, 4]);
                    expect(t2.shape).toEqual([2, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24,
                            9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D [r, c, d, e, f] => [r, c, d, f, e]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor6d(new Array(64).fill(0).map(function (x, i) { return i + 1; }), [2, 2, 2, 2, 2, 2]);
                    t2 = tf.transpose(t, [0, 1, 2, 3, 5, 4]);
                    expect(t2.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 3, 2, 4, 5, 7, 6, 8, 9, 11, 10, 12, 13, 15, 14, 16,
                            17, 19, 18, 20, 21, 23, 22, 24, 25, 27, 26, 28, 29, 31, 30, 32,
                            33, 35, 34, 36, 37, 39, 38, 40, 41, 43, 42, 44, 45, 47, 46, 48,
                            49, 51, 50, 52, 53, 55, 54, 56, 57, 59, 58, 60, 61, 63, 62, 64
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D [r, c, d, e, f, g] => [c, r, d, e, f, g]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, t2, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor6d(new Array(64).fill(0).map(function (x, i) { return i + 1; }), [2, 2, 2, 2, 2, 2]);
                    t2 = tf.transpose(t, [1, 0, 2, 3, 4, 5]);
                    expect(t2.shape).toEqual([2, 2, 2, 2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t2.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
                            17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
                            49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient 3D [r, c, d] => [d, c, r]', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, perm, dy, dt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    perm = [2, 1, 0];
                    dy = tf.tensor3d([111, 211, 121, 221, 112, 212, 122, 222], [2, 2, 2]);
                    dt = tf.grad(function (t) { return t.transpose(perm); })(t, dy);
                    expect(dt.shape).toEqual(t.shape);
                    expect(dt.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dt.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [111, 112, 121, 122, 211, 212, 221, 222]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, perm, dy, dt, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    perm = [2, 1, 0];
                    dy = tf.tensor3d([111, 211, 121, 221, 112, 212, 122, 222], [2, 2, 2]);
                    dt = tf.grad(function (t) { return t.clone().transpose(perm).clone(); })(t, dy);
                    expect(dt.shape).toEqual(t.shape);
                    expect(dt.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dt.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [111, 112, 121, 122, 211, 212, 221, 222]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.transpose({}); })
            .toThrowError(/Argument 'x' passed to 'transpose' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = [[1, 11, 2, 22], [3, 33, 4, 44]];
                    res = tf.transpose(t, [1, 0]);
                    expect(res.shape).toEqual([4, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 11, 33, 2, 4, 22, 44]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=transpose_test.js.map