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
var test_util_1 = require("../test_util");
var jasmine_util_1 = require("../jasmine_util");
jasmine_util_1.describeWithFlags('equal', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 1]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 1]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5];
                    b = [2.2, 3.2, 5];
                    res = tf.equal(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 1]]);
                    res =
                        tf.equal(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1.1, 4.1, 5.1];
                    b = [2.2, 3.2, 5.1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = [2.2, 3.2, 5.1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.equal(b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.equal(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.equal(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar and 1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([1, 2, 3, 4, 5, 2]);
                    res = tf.equal(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 4.1, 5.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 1, 0, 0, 0]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D and 2D broadcast each with 1 dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5], [1, 3]);
                    b = tf.tensor2d([5, 1], [2, 1]);
                    res = tf.equal(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D and scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 2, 5, 6], [2, 3]);
                    b = tf.scalar(2);
                    res = tf.equal(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [12]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [12.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, -1], [2, 3, 1]);
                    b = tf.scalar(-1);
                    res = tf.equal(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 8], [2, 2, 1, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 0, 1]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 8.1], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 0, 1]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 1.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.equal({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'equal' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.equal(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'equal' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equal(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('equalStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 1]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 1]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 4.1, 5.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 1, 0, 0, 0]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor2D shapes - int32', function () {
        var a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
        var b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor2D shapes - float32', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [12]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [12.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor3D shapes - int32', function () {
        var a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
        var b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor3D shapes - float32', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 8], [2, 2, 1, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 0, 1]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 8.1], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 0, 1]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor4D shapes - int32', function () {
        var a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
        var b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor4D shapes - float32', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        var f = function () {
            tf.equalStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 1.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.equalStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('notEqual', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5];
                    b = [2.2, 3.2, 5];
                    res = tf.notEqual(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 0]]);
                    res =
                        tf.notEqual(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1.1, 4.1, 5.1];
                    b = [2.2, 3.2, 5.1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = [2.2, 3.2, 5.1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.notEqual(b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.notEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.notEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, 5, NaN]);
                    b = tf.tensor1d([4, 5, -1]);
                    res = tf.notEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar and 1D broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([1, 2, 3, 4, 5, 2]);
                    res = tf.notEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([6]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 4.1, 5.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 0, 1, 1, 1]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D and scalar broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 2, 5, 6], [2, 3]);
                    b = tf.scalar(2);
                    res = tf.notEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D and 2D broadcast each with 1 dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 5], [1, 3]);
                    b = tf.tensor2d([5, 1], [2, 1]);
                    res = tf.notEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [12]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [12.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 0]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 4, 5, -1], [2, 3, 1]);
                    b = tf.scalar(-1);
                    res = tf.notEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 8], [2, 2, 1, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 1, 0]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 8.1], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 1, 0]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 1.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.notEqual({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'notEqual' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.notEqual(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'notEqual' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqual(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('notEqualStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('strict version throws when x and y are different shape', function () {
        var a = tf.tensor1d([2]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.notEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.notEqualStrict(b, a); }).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 4.1, 5.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 0, 1, 1, 1]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor2D shapes - int32', function () {
        var a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
        var b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor2D shapes - float32', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [12]]], [2, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [12.1]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 0]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor3D shapes - int32', function () {
        var a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
        var b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor3D shapes - float32', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 8], [2, 2, 1, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 1, 0]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 8.1], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 1, 0]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatch Tensor4D shapes - int32', function () {
        var a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
        var b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatch Tensor4D shapes - float32', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        var f = function () {
            tf.notEqualStrict(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 1.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.notEqualStrict(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('less', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 0]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 0]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1.1, 4.1, 5.1];
                    b = [2.2, 3.2, 5.1];
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = [2.2, 3.2, 5.1];
                    res = a.less(b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5.2];
                    b = [2.2, 3.2, 5.1];
                    res = tf.less(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 0]]);
                    res =
                        tf.less(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.less(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.less(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 3.1, 6.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [0.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [11]]], [2, 3, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [11.1]]], [2, 3, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.0]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 7], [2, 2, 1, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1, 0]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 7.1], [2, 2, 1, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1, 0]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.less({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'less' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.less(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'less' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.less(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('lessStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor1d([2]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.lessStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessStrict(b, a); }).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        expect(function () { return tf.lessStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessStrict(b, a); }).toThrowError();
    });
    // Tensor3D:
    it('Tensor3D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        expect(function () { return tf.lessStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessStrict(b, a); }).toThrowError();
    });
    // Tensor4D:
    it('Tensor4D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        expect(function () { return tf.lessStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessStrict(b, a); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.lessStrict(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('lessEqual', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5];
                    b = [2.2, 3.2, 5];
                    res = tf.lessEqual(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1]]);
                    res =
                        tf.lessEqual(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1.1, 4.1, 5.1];
                    b = [2.2, 3.2, 5.1];
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = [2.2, 3.2, 5.1];
                    res = a.lessEqual(b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.lessEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.lessEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 3.1, 6.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [0.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [11]]], [2, 3, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [11.1]]], [2, 3, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.2]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 7], [2, 2, 1, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1, 0]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 7.1], [2, 2, 1, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 0, 1, 0]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 1, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 1, 1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.lessEqual({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'lessEqual' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.lessEqual(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'lessEqual' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.lessEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('lessEqualStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor1d([2]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.lessEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessEqualStrict(b, a); }).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        expect(function () { return tf.lessEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessEqualStrict(b, a); }).toThrowError();
    });
    // Tensor3D:
    it('Tensor3D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        expect(function () { return tf.lessEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessEqualStrict(b, a); }).toThrowError();
    });
    // Tensor4D:
    it('Tensor4D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        expect(function () { return tf.lessEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.lessEqualStrict(b, a); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.lessEqualStrict(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('greater', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([3, 3], 'int32');
                    b = tf.tensor1d([0, 0], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([3.123, 3.321], 'float32');
                    b = tf.tensor1d([0.45, 0.123], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5.2];
                    b = [2.2, 3.2, 5.1];
                    res = tf.greater(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 1]]);
                    res =
                        tf.greater(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1.1, 4.1, 5.1];
                    b = [2.2, 3.2, 5.1];
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = [2.2, 3.2, 5.1];
                    res = a.greater(b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.greater(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.greater(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 11]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 0]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 11.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 3.1, 6.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 0]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [0.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [11]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [11]]], [2, 3, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [11.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [11.1]]], [2, 3, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 0]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.2]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 8], [2, 2, 1, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 0]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 8.1], [2, 2, 1, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 0]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.greater({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'greater' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.greater(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'greater' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with 0 sized tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([], [0, 5]);
                    b = tf.tensor1d([1, 2, 3, 4, 5]);
                    res = tf.greater(a, b);
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([0, 5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('greaterStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor1d([2]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.greaterStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterStrict(b, a); }).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        expect(function () { return tf.greaterStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterStrict(b, a); }).toThrowError();
    });
    // Tensor3D:
    it('Tensor3D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        expect(function () { return tf.greaterStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterStrict(b, a); }).toThrowError();
    });
    // Tensor4D:
    it('Tensor4D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        expect(function () { return tf.greaterStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterStrict(b, a); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.greaterStrict(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('greaterEqual', jasmine_util_1.ALL_ENVS, function () {
    // Tensor1D:
    it('Tensor1D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 4, 5], 'int32');
                    b = tf.tensor1d([2, 3, 5], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 1]]);
                    a = tf.tensor1d([2, 2, 2], 'int32');
                    b = tf.tensor1d([2, 2, 2], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0, 0], 'int32');
                    b = tf.tensor1d([3, 3], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 4.1, 5.1], 'float32');
                    b = tf.tensor1d([2.2, 3.2, 5.1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 1]]);
                    a = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    b = tf.tensor1d([2.31, 2.31, 2.31], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([0.45, 0.123], 'float32');
                    b = tf.tensor1d([3.123, 3.321], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1.1, 4.1, 5];
                    b = [2.2, 3.2, 5];
                    res = tf.greaterEqual(tf.tensor(a, [3], 'float32'), tf.tensor(b, [3], 'int32'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 1]]);
                    res =
                        tf.greaterEqual(tf.tensor(a, [3], 'int32'), tf.tensor(b, [3], 'bool'));
                    expect(res.dtype).toBe('bool');
                    expect(res.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes - int32', function () {
        var a = tf.tensor1d([1, 2], 'int32');
        var b = tf.tensor1d([1, 2, 3], 'int32');
        var f = function () {
            tf.greaterEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('mismatched Tensor1D shapes - float32', function () {
        var a = tf.tensor1d([1.1, 2.1], 'float32');
        var b = tf.tensor1d([1.1, 2.1, 3.1], 'float32');
        var f = function () {
            tf.greaterEqual(a, b);
        };
        expect(f).toThrowError();
    });
    it('NaNs in Tensor1D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1.1, NaN, 2.1], 'float32');
                    b = tf.tensor1d([2.1, 3.1, NaN], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor2D:
    it('Tensor2D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 4, 5], [8, 9, 12]], [2, 3], 'int32');
                    b = tf.tensor2d([[2, 3, 6], [7, 10, 11]], [2, 3], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 1]]);
                    a = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    b = tf.tensor2d([[0, 0], [1, 1]], [2, 2], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1.1, 4.1, 5.1], [8.1, 9.1, 12.1]], [2, 3], 'float32');
                    b = tf.tensor2d([[2.1, 3.1, 6.1], [7.1, 10.1, 11.1]], [2, 3], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 1]]);
                    a = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.2, 0.2], [1.2, 1.2]], [2, 2], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[3], [7]], [2, 1], 'int32');
                    b = tf.tensor2d([[2, 3, 4], [7, 8, 9]], [2, 3], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
                    b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor2D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1.1, NaN], [0.1, NaN]], [2, 2], 'float32');
                    b = tf.tensor2d([[0.1, NaN], [1.1, NaN]], [2, 2], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [4], [5]], [[8], [9], [12]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[2], [3], [6]], [[7], [10], [11]]], [2, 3, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 1]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [4.1], [5.1]], [[8.1], [9.1], [12.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[2.1], [3.1], [6.1]], [[7.1], [10.1], [11.1]]], [2, 3, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 0, 1]]);
                    a = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.2]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [0.1]], [[1.1], [1.1], [1.1]]], [2, 3, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [2, 3], [4, 5]], [[6, 7], [9, 8], [10, 11]]], [2, 3, 2], 'int32');
                    b = tf.tensor3d([[[1], [2], [3]], [[7], [10], [9]]], [2, 3, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
                        [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
                    ], [2, 3, 2], 'float32');
                    b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor3D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1.1], [NaN], [1.1]], [[0.1], [0.1], [0.1]]], [2, 3, 1], 'float32');
                    b = tf.tensor3d([[[0.1], [0.1], [1.1]], [[1.1], [0.1], [NaN]]], [2, 3, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 4, 5, 8], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 3, 6, 7], [2, 2, 1, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 1]]);
                    a = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([0, 1, 2, 3], [2, 2, 1, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([2, 2, 2, 2], [2, 2, 1, 1], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1.1, 4.1, 5.1, 8.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([2.1, 3.1, 6.1, 7.1], [2, 2, 1, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 1]]);
                    a = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 2.2, 3.3], [2, 2, 1, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([0.1, 0.1, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([1.1, 1.1, 1.1, 1.1], [2, 2, 1, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 5, 9], [2, 2, 1, 1], 'int32');
                    b = tf.tensor4d([[[[1, 2]], [[3, 4]]], [[[5, 6]], [[7, 8]]]], [2, 2, 1, 2], 'int32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('NaNs in Tensor4D - float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1.1, NaN, 0.1, 0.1], [2, 2, 1, 1], 'float32');
                    b = tf.tensor4d([0.1, 1.1, 1.1, NaN], [2, 2, 1, 1], 'float32');
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.greaterEqual({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'greaterEqual' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.greaterEqual(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'greaterEqual' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.greaterEqual(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('has gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, 2, 5]);
                    b = tf.tensor1d([4, 1, 5]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (a) { return tf.greaterEqual(a, b); })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, 2, 5]);
                    b = tf.tensor1d([4, 1, 5]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (a) {
                        return tf.greaterEqual(a.clone(), b.clone()).clone();
                    })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('greaterEqualStrict', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor1d([2]);
        var b = tf.tensor1d([4, 2, -1]);
        expect(function () { return tf.greaterEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterEqualStrict(b, a); }).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor2d([[1.1], [7.1]], [2, 1], 'float32');
        var b = tf.tensor2d([[0.1, 1.1, 2.1], [7.1, 8.1, 9.1]], [2, 3], 'float32');
        expect(function () { return tf.greaterEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterEqualStrict(b, a); }).toThrowError();
    });
    // Tensor3D:
    it('Tensor3D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor3d([
            [[1.1, 0.1], [2.1, 3.1], [4.1, 5.1]],
            [[6.1, 7.1], [9.1, 8.1], [10.1, 11.1]]
        ], [2, 3, 2], 'float32');
        var b = tf.tensor3d([[[1.1], [2.1], [3.1]], [[7.1], [10.1], [9.1]]], [2, 3, 1], 'float32');
        expect(function () { return tf.greaterEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterEqualStrict(b, a); }).toThrowError();
    });
    // Tensor4D:
    it('Tensor4D - strict version throws when a and b are different shape', function () {
        var a = tf.tensor4d([1.1, 2.1, 5.1, 9.1], [2, 2, 1, 1], 'float32');
        var b = tf.tensor4d([[[[1.1, 2.1]], [[3.1, 4.1]]], [[[5.1, 6.1]], [[7.1, 8.1]]]], [2, 2, 1, 2], 'float32');
        expect(function () { return tf.greaterEqualStrict(a, b); }).toThrowError();
        expect(function () { return tf.greaterEqualStrict(b, a); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 4, 5];
                    b = [2, 3, 5];
                    res = tf.greaterEqualStrict(a, b);
                    expect(res.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=compare_ops_test.js.map