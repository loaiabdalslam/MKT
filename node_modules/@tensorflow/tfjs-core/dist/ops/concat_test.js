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
jasmine_util_1.describeWithFlags('concat1d', jasmine_util_1.ALL_ENVS, function () {
    it('3 + 5', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3]);
                    b = tf.tensor1d([5]);
                    result = tf.concat1d([a, b]);
                    expected = [3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike 3 + 5', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [3];
                    b = [5];
                    result = tf.concat1d([a, b]);
                    expected = [3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained 3 + 5', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3]);
                    b = [5];
                    result = a.concat([b]);
                    expected = [3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 + [5,7]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3]);
                    b = tf.tensor1d([5, 7]);
                    result = tf.concat1d([a, b]);
                    expected = [3, 5, 7];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[3,5] + 7', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, 5]);
                    b = tf.tensor1d([7]);
                    result = tf.concat1d([a, b]);
                    expected = [3, 5, 7];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 + 5 + 7 + 9', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, d, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3]);
                    b = tf.tensor1d([5]);
                    c = tf.tensor1d([7]);
                    d = tf.tensor1d([9]);
                    result = tf.concat1d([a, b, c, d]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 5, 7, 9]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('single tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3]);
                    result = tf.concat1d([a]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [3];
                    b = [5];
                    result = tf.concat1d([a, b]);
                    expected = [3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('concat2d', jasmine_util_1.ALL_ENVS, function () {
    it('[[3]] + [[5]], axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = tf.tensor2d([3], [1, 1]);
                    b = tf.tensor2d([5], [1, 1]);
                    result = tf.concat2d([a, b], axis);
                    expected = [3, 5];
                    expect(result.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike [[3]] + [[5]], axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = [[3]];
                    b = [[5]];
                    result = tf.concat2d([a, b], axis);
                    expected = [3, 5];
                    expect(result.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained [[3]] + [[5]], axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = tf.tensor2d([3], [1, 1]);
                    b = [[5]];
                    result = a.concat([b], axis);
                    expected = [3, 5];
                    expect(result.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[[3]] + [[5]], axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 1;
                    a = tf.tensor2d([3], [1, 1]);
                    b = tf.tensor2d([5], [1, 1]);
                    result = tf.concat2d([a, b], axis);
                    expected = [3, 5];
                    expect(result.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[[1, 2], [3, 4]] + [[5, 6]], axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    b = tf.tensor2d([[5, 6]], [1, 2]);
                    result = tf.concat2d([a, b], axis);
                    expected = [1, 2, 3, 4, 5, 6];
                    expect(result.shape).toEqual([3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[[1, 2],[3, 4]] + [[5, 6]] + [[7, 8]], axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, c, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = tf.tensor2d([[1, 2], [3, 4]]);
                    b = tf.tensor2d([[5, 6]]);
                    c = tf.tensor2d([[7, 8]]);
                    result = tf.concat2d([a, b, c], axis);
                    expected = [1, 2, 3, 4, 5, 6, 7, 8];
                    expect(result.shape).toEqual([4, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[[1, 2], [3, 4]] + [[5, 6]], axis=1 throws error', function () {
        var axis = 1;
        var a = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
        var b = tf.tensor2d([[5, 6]], [1, 2]);
        expect(function () { return tf.concat2d([a, b], axis); }).toThrowError();
    });
    it('[[1, 2], [3, 4]] + [[5, 6], [7, 8]], axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 1;
                    a = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    b = tf.tensor2d([[5, 6], [7, 8]], [2, 2]);
                    result = tf.concat2d([a, b], axis);
                    expected = [1, 2, 5, 6, 3, 4, 7, 8];
                    expect(result.shape).toEqual([2, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[[1, 2],[3, 4]] + [[5, 6],[7, 8]] + [[9, 10],[11, 12]], axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, c, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 1;
                    a = tf.tensor2d([[1, 2], [3, 4]]);
                    b = tf.tensor2d([[5, 6], [7, 8]]);
                    c = tf.tensor2d([[9, 10], [11, 12]]);
                    result = tf.concat2d([a, b, c], axis);
                    expected = [1, 2, 5, 6, 9, 10, 3, 4, 7, 8, 11, 12];
                    expect(result.shape).toEqual([2, 6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = 0;
                    a = [[3]];
                    b = [[5]];
                    result = tf.concat2d([a, b], axis);
                    expected = [3, 5];
                    expect(result.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat zero-sized tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, res, _a, res2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([], [0, 5]);
                    b = tf.tensor2d([], [0, 5]);
                    c = tf.tensor2d([], [0, 5]);
                    res = tf.concat([a, b, c], /* axis */ 0);
                    expect(res.shape).toEqual([0, 5]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), []]);
                    res2 = tf.concat([a, b, c], /* axis */ 1);
                    expect(res2.shape).toEqual([0, 15]);
                    _b = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res2.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('concat3d', jasmine_util_1.ALL_ENVS, function () {
    it('shapes correct concat axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 2, 3], [1, 1, 3]);
                    tensor2 = tf.tensor3d([4, 5, 6], [1, 1, 3]);
                    values = tf.concat3d([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([2, 1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 11, 111, 2, 22, 222], [1, 2, 3]);
                    tensor2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
                    values = tf.concat3d([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([3, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 11, 111, 2, 22, 222, 5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike concat axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = [[[1, 11, 111], [2, 22, 222]]];
                    tensor2 = [[[5, 55, 555], [6, 66, 666]], [[7, 77, 777], [8, 88, 888]]];
                    values = tf.concat3d([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([3, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 11, 111, 2, 22, 222, 5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained concat axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 11, 111, 2, 22, 222], [1, 2, 3]);
                    tensor2 = [[[5, 55, 555], [6, 66, 666]], [[7, 77, 777], [8, 88, 888]]];
                    values = tensor1.concat([tensor2], 0);
                    expect(values.shape).toEqual([3, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 11, 111, 2, 22, 222, 5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shapes correct concat axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 2, 3], [1, 1, 3]);
                    tensor2 = tf.tensor3d([4, 5, 6], [1, 1, 3]);
                    values = tf.concat3d([tensor1, tensor2], 1);
                    expect(values.shape).toEqual([1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 11, 111, 3, 33, 333], [2, 1, 3]);
                    tensor2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
                    values = tf.concat3d([tensor1, tensor2], 1);
                    expect(values.shape).toEqual([2, 3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 11, 111, 5, 55, 555, 6, 66, 666, 3, 33, 333, 7, 77, 777, 8, 88, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shapes correct concat axis=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 2, 3], [1, 1, 3]);
                    tensor2 = tf.tensor3d([4, 5, 6], [1, 1, 3]);
                    values = tf.concat3d([tensor1, tensor2], 2);
                    expect(values.shape).toEqual([1, 1, 6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat a large number of tensors, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensors, expected, i, axis, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensors = [];
                    expected = [];
                    for (i = 0; i < 100; i++) {
                        tensors.push(tf.tensor([i], [1]));
                        expected.push(i);
                    }
                    axis = 0;
                    res = tf.concat(tensors, axis);
                    expect(res.shape).toEqual([100]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat a large number of tensors, axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensors, expected, i, axis, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensors = [];
                    expected = [];
                    for (i = 0; i < 100; i++) {
                        tensors.push(tf.tensor([i], [1, 1]));
                        expected.push(i);
                    }
                    axis = 1;
                    res = tf.concat(tensors, axis);
                    expect(res.shape).toEqual([1, 100]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat axis=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 11, 2, 22, 3, 33, 4, 44], [2, 2, 2]);
                    tensor2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
                    values = tf.concat3d([tensor1, tensor2], 2);
                    expect(values.shape).toEqual([2, 2, 5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1, 11, 5, 55, 555, 2, 22, 6, 66, 666,
                            3, 33, 7, 77, 777, 4, 44, 8, 88, 888
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat throws when invalid non-axis shapes, axis=0', function () {
        var axis = 0;
        var x1 = tf.tensor3d([1, 11, 111], [1, 1, 3]);
        var x2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
        expect(function () { return tf.concat3d([x1, x2], axis); }).toThrowError();
    });
    it('concat throws when invalid non-axis shapes, axis=1', function () {
        var axis = 1;
        var x1 = tf.tensor3d([1, 11, 111], [1, 1, 3]);
        var x2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
        expect(function () { return tf.concat3d([x1, x2], axis); }).toThrowError();
    });
    it('concat throws when invalid non-axis shapes, axis=2', function () {
        var axis = 2;
        var x1 = tf.tensor3d([1, 11, 2, 22], [1, 2, 2]);
        var x2 = tf.tensor3d([5, 55, 555, 6, 66, 666, 7, 77, 777, 8, 88, 888], [2, 2, 3]);
        expect(function () { return tf.concat3d([x1, x2], axis); }).toThrowError();
    });
    it('gradient concat axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var x1, x2, dy, axis, grads, _a, dx1, dx2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x1 = tf.tensor3d([1, 11, 2, 22], [1, 2, 2]);
                    x2 = tf.tensor3d([5, 55, 6, 66, 7, 77, 8, 88], [2, 2, 2]);
                    dy = tf.tensor3d([66, 6, 55, 5, 44, 4, 33, 3, 22, 2, 11, 1], [3, 2, 2]);
                    axis = 0;
                    grads = tf.grads(function (x1, x2) { return tf.concat3d([x1, x2], axis); });
                    _a = grads([x1, x2], dy), dx1 = _a[0], dx2 = _a[1];
                    expect(dx1.shape).toEqual(x1.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx1.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [66, 6, 55, 5]]);
                    expect(dx2.shape).toEqual(x2.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx2.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [44, 4, 33, 3, 22, 2, 11, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x1, x2, dy, axis, grads, _a, dx1, dx2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x1 = tf.tensor3d([1, 11, 2, 22], [1, 2, 2]);
                    x2 = tf.tensor3d([5, 55, 6, 66, 7, 77, 8, 88], [2, 2, 2]);
                    dy = tf.tensor3d([66, 6, 55, 5, 44, 4, 33, 3, 22, 2, 11, 1], [3, 2, 2]);
                    axis = 0;
                    grads = tf.grads(function (x1, x2) {
                        return tf.concat3d([x1.clone(), x2.clone()], axis).clone();
                    });
                    _a = grads([x1, x2], dy), dx1 = _a[0], dx2 = _a[1];
                    expect(dx1.shape).toEqual(x1.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx1.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [66, 6, 55, 5]]);
                    expect(dx2.shape).toEqual(x2.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx2.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [44, 4, 33, 3, 22, 2, 11, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient concat axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x1, x2, dy, axis, grads, _a, dx1, dx2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x1 = tf.tensor3d([1, 11, 2, 22], [2, 1, 2]);
                    x2 = tf.tensor3d([3, 33, 4, 44, 5, 55, 6, 66], [2, 2, 2]);
                    dy = tf.tensor3d([66, 6, 55, 5, 44, 4, 33, 3, 22, 2, 11, 1], [2, 3, 2]);
                    axis = 1;
                    grads = tf.grads(function (x1, x2) { return tf.concat3d([x1, x2], axis); });
                    _a = grads([x1, x2], dy), dx1 = _a[0], dx2 = _a[1];
                    expect(dx1.shape).toEqual(x1.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx1.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [66, 6, 33, 3]]);
                    expect(dx2.shape).toEqual(x2.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx2.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [55, 5, 44, 4, 22, 2, 11, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient concat axis=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x1, x2, dy, axis, grads, _a, dx1, dx2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x1 = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x2 = tf.tensor3d([5, 55, 6, 66, 7, 77, 8, 88], [2, 2, 2]);
                    dy = tf.tensor3d([4, 40, 400, 3, 30, 300, 2, 20, 200, 1, 10, 100], [2, 2, 3]);
                    axis = 2;
                    grads = tf.grads(function (x1, x2) { return tf.concat3d([x1, x2], axis); });
                    _a = grads([x1, x2], dy), dx1 = _a[0], dx2 = _a[1];
                    expect(dx1.shape).toEqual(x1.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx1.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4, 3, 2, 1]]);
                    expect(dx2.shape).toEqual(x2.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx2.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [40, 400, 30, 300, 20, 200, 10, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient concat axis=-1', function () { return __awaiter(_this, void 0, void 0, function () {
        var x1, x2, dy, axis, grads, _a, dx1, dx2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    x1 = tf.tensor3d([1, 2, 3, 4], [2, 2, 1]);
                    x2 = tf.tensor3d([5, 55, 6, 66, 7, 77, 8, 88], [2, 2, 2]);
                    dy = tf.tensor3d([4, 40, 400, 3, 30, 300, 2, 20, 200, 1, 10, 100], [2, 2, 3]);
                    axis = -1;
                    grads = tf.grads(function (x1, x2) { return tf.concat3d([x1, x2], axis); });
                    _a = grads([x1, x2], dy), dx1 = _a[0], dx2 = _a[1];
                    expect(dx1.shape).toEqual(x1.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx1.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4, 3, 2, 1]]);
                    expect(dx2.shape).toEqual(x2.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx2.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [40, 400, 30, 300, 20, 200, 10, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = [[[1, 2, 3]]];
                    tensor2 = [[[4, 5, 6]]];
                    values = tf.concat3d([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([2, 1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('concat tensors with 0 in their shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    tensor2 = tf.tensor3d([], [0, 3, 1]);
                    values = tf.concat3d([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('concat throws for non-tensors', jasmine_util_1.ALL_ENVS, function () {
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.concat([{}]); })
            .toThrowError(/Argument 'tensors\[0\]' passed to 'concat' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor1, tensor2, values, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor1 = [[[1, 2, 3, 4]]];
                    tensor2 = [[[4, 5, 6, 7]]];
                    values = tf.concat([tensor1, tensor2], 0);
                    expect(values.shape).toEqual([2, 1, 4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, values.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 4, 5, 6, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=concat_test.js.map