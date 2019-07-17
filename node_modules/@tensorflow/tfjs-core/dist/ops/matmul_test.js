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
var backend_webgl_1 = require("../backends/webgl/backend_webgl");
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('matmul', jasmine_util_1.ALL_ENVS, function () {
    it('A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('[8,4]x[4,8]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, cData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.tensor2d([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                        17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5, 6, 7, 8
                    ], [8, 4]);
                    b = tf.tensor2d([
                        0, 1, -3, 2, 1, -1, 0, 5, 6, 7, 8, 0, -2, -2, 1, 9,
                        11, 10, 0, 1, -3, 2, 1, -1, 1, 2, 3, 4, 5, 6, 7, 8
                    ], [4, 8]);
                    c = tf.matMul(a, b);
                    return [4 /*yield*/, c.data()];
                case 1:
                    cData = _a.sent();
                    expect(c.shape).toEqual([8, 8]);
                    test_util_1.expectArraysClose(cData, [
                        49, 53, 25, 21, 8, 25, 33, 52, 121, 133, 57, 49, 12,
                        45, 69, 136, 193, 213, 89, 77, 16, 65, 105, 220, 265, 293,
                        121, 105, 20, 85, 141, 304, 337, 373, 153, 133, 24, 105, 177,
                        388, 409, 453, 185, 161, 28, 125, 213, 472, 49, 53, 25, 21,
                        8, 25, 33, 52, 121, 133, 57, 49, 12, 45, 69, 136
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matmul followed by mul', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, f, d, dData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    c = tf.matMul(a, b);
                    f = tf.tensor2d([0, 1, 0.5, 0, 0.25, 2], [2, 3]);
                    d = tf.mul(c, f);
                    return [4 /*yield*/, d.data()];
                case 1:
                    dData = _a.sent();
                    expect(d.shape).toEqual([2, 3]);
                    test_util_1.expectArraysClose(dData, [0, 12, 7.5, 0, 6.5, 66]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [1, 2, 3, 4, 5, 6];
                    b = [0, 1, -3, 2, 2, 1];
                    c = tf.matMul(tf.tensor(a, [2, 3], 'float32'), tf.tensor(b, [3, 2], 'int32'));
                    expect(c.shape).toEqual([2, 2]);
                    expect(c.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 8, -3, 20]]);
                    c = tf.matMul(tf.tensor(a, [2, 3], 'int32'), tf.tensor(b, [3, 2], 'bool'));
                    expect(c.shape).toEqual([2, 2]);
                    expect(c.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [5, 6, 11, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = false;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [7, 10, 16, 31];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = true;
                    transposeB = false;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [17, 12, 2, 22, 15, 4, 27, 18, 6];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    b = tf.tensor2d([1, 0, 2, 4, 3, 0], [2, 3]);
                    transposeA = true;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expected = [11, 13, 14, 20];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B^t shapes do not match', function () {
        var a = tf.zeros([2, 3]);
        var b = tf.zeros([3, 2]);
        var f = function () {
            var transposeA = false;
            var transposeB = true;
            tf.matMul(a, b, transposeA, transposeB);
        };
        expect(f).toThrowError();
    });
    it('A^t x B shapes do not match', function () {
        var a = tf.zeros([2, 3]);
        var b = tf.zeros([3, 2]);
        var f = function () {
            var transposeA = true;
            var transposeB = false;
            tf.matMul(a, b, transposeA, transposeB);
        };
        expect(f).toThrowError();
    });
    it('A^t x B^t shapes do not match', function () {
        var a = tf.zeros([3, 2]);
        var b = tf.zeros([3, 2]);
        var f = function () {
            var transposeA = true;
            var transposeB = true;
            tf.matMul(a, b, transposeA, transposeB);
        };
        expect(f).toThrowError();
    });
    it('matmul throws when inner dimensions dont match', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1, 2, 2], [4, 2]);
        expect(function () { return tf.matMul(a, b); }).toThrowError();
    });
    it('matmul throws when passed non matrices', function () {
        // tslint:disable-next-line:no-any
        var a = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1, 2, 2], [4, 2]);
        expect(function () { return tf.matMul(a, b); }).toThrowError();
        expect(function () { return tf.matMul(b, a); }).toThrowError();
    });
    it('matmul throws when passed a vector', function () {
        // tslint:disable-next-line:no-any
        var v = tf.tensor1d([2, 3]);
        var matrix = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        expect(function () { return tf.matMul(matrix, v); }).toThrowError();
    });
    it('Vector times matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, matrix, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v = tf.tensor1d([2, 3]);
                    matrix = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    result = tf.dot(v, matrix);
                    expected = [11, 16];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Vector times matrix with implicit reshape', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, matrix, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v = tf.tensor1d([2, 3]);
                    matrix = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    result = tf.dot(v, matrix);
                    expected = [11, 16];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Matrix times vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var matrix, v, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    matrix = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    v = tf.tensor1d([2, 3]);
                    result = tf.dot(matrix, v);
                    expected = [8, 18];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with the matrices being vectors', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, 1, sharedDim]);
                    b = tf.tensor(values, [batch, sharedDim, 1]);
                    result = tf.matMul(a, b);
                    expect(result.shape).toEqual([batch, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with the matrices being vectors transposedA', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, sharedDim, 1]);
                    b = tf.tensor(values, [batch, sharedDim, 1]);
                    transposeA = true;
                    transposeB = false;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with the matrices being vectors transposedB', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, 1, sharedDim]);
                    b = tf.tensor(values, [batch, 1, sharedDim]);
                    transposeA = false;
                    transposeB = true;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with matrix x vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.ones([batch, 2, sharedDim]);
                    b = tf.tensor(values, [batch, sharedDim, 1]);
                    result = tf.matMul(a, b);
                    expect(result.shape).toEqual([batch, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with matrix x vector transposedA', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.ones([batch, sharedDim, 2]);
                    b = tf.tensor(values, [batch, sharedDim, 1]);
                    transposeA = true;
                    transposeB = false;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with matrix x vector transposedB', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.ones([batch, 2, sharedDim]);
                    b = tf.tensor(values, [batch, 1, sharedDim]);
                    transposeA = false;
                    transposeB = true;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with vector x matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, 1, sharedDim]);
                    b = tf.ones([batch, sharedDim, 2]);
                    result = tf.matMul(a, b);
                    expect(result.shape).toEqual([batch, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with vector x matrix transposedA', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, sharedDim, 1]);
                    b = tf.ones([batch, sharedDim, 2]);
                    transposeA = true;
                    transposeB = false;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batched matmul with vector x matrix transposedB', function () { return __awaiter(_this, void 0, void 0, function () {
        var batch, sharedDim, values, a, b, transposeA, transposeB, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    batch = 3;
                    sharedDim = backend_webgl_1.MATMUL_SHARED_DIM_THRESHOLD + 1;
                    values = new Float32Array(batch * sharedDim);
                    values[10] = 2;
                    a = tf.tensor(values, [batch, 1, sharedDim]);
                    b = tf.ones([batch, 2, sharedDim]);
                    transposeA = false;
                    transposeB = true;
                    result = tf.matMul(a, b, transposeA, transposeB);
                    expect(result.shape).toEqual([batch, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Matrix * vector propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var matrix, v, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    matrix = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    v = tf.tensor1d([2, NaN]);
                    result = tf.dot(matrix, v);
                    expected = [NaN, NaN];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix times vector throws when not passed a matrix', function () {
        var v = tf.tensor1d([2, 3]);
        // tslint:disable-next-line:no-any
        var matrix = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
        expect(function () { return tf.dot(matrix, v); }).toThrowError();
    });
    it('Dot product', function () { return __awaiter(_this, void 0, void 0, function () {
        var v1, v2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v1 = tf.tensor1d([2, 3]);
                    v2 = tf.tensor1d([2, 1]);
                    result = tf.dot(v1, v2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Dot product propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var v1, v2, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v1 = tf.tensor1d([2, NaN]);
                    v2 = tf.tensor1d([2, 1]);
                    result = tf.dot(v1, v2);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Dot product throws when vectors are different size', function () {
        var v1 = tf.tensor1d([2, 3, 3]);
        var v2 = tf.tensor1d([2, 1]);
        expect(function () { return tf.dot(v1, v2); }).toThrowError();
        expect(function () { return tf.dot(v2, v1); }).toThrowError();
    });
    it('Outer product', function () { return __awaiter(_this, void 0, void 0, function () {
        var v1, v2, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v1 = tf.tensor1d([2, 3]);
                    v2 = tf.tensor1d([2, 1]);
                    result = tf.outerProduct(v1, v2);
                    expected = [4, 2, 6, 3];
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('outer product accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var v1, v2, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v1 = [2, 3];
                    v2 = [2, 1];
                    result = tf.outerProduct(v1, v2);
                    expected = [4, 2, 6, 3];
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: A * B', function () { return __awaiter(_this, void 0, void 0, function () {
        var aT, bT, dyT, transposeA, transposeB, grads, _a, da, db, a, dy, b, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    aT = tf.tensor2d([1, 2, 3, 10, 20, 30], [2, 3]);
                    bT = tf.tensor2d([2, 3, 4, 1, 2, 3], [3, 2]);
                    dyT = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    transposeA = false;
                    transposeB = false;
                    grads = tf.grads(function (a, b) {
                        return tf.matMul(a, b, transposeA, transposeB);
                    });
                    _a = grads([aT, bT], dyT), da = _a[0], db = _a[1];
                    // da = dy * bT
                    expect(da.shape).toEqual(aT.shape);
                    return [4 /*yield*/, aT.buffer()];
                case 1:
                    a = _d.sent();
                    return [4 /*yield*/, dyT.buffer()];
                case 2:
                    dy = _d.sent();
                    return [4 /*yield*/, bT.buffer()];
                case 3:
                    b = _d.sent();
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 4:
                    _b.apply(void 0, [_d.sent(),
                        [
                            dy.get(0, 0) * b.get(0, 0) + dy.get(0, 1) * b.get(0, 1),
                            dy.get(0, 0) * b.get(1, 0) + dy.get(0, 1) * b.get(1, 1),
                            dy.get(0, 0) * b.get(2, 0) + dy.get(0, 1) * b.get(2, 1),
                            dy.get(1, 0) * b.get(0, 0) + dy.get(1, 1) * b.get(0, 1),
                            dy.get(1, 0) * b.get(1, 0) + dy.get(1, 1) * b.get(1, 1),
                            dy.get(1, 0) * b.get(2, 0) + dy.get(1, 1) * b.get(2, 1)
                        ],
                        1e-1]);
                    // db = aT * dy
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 5:
                    _c.apply(void 0, [_d.sent(), [
                            a.get(0, 0) * dy.get(0, 0) + a.get(1, 0) * dy.get(1, 0),
                            a.get(0, 0) * dy.get(0, 1) + a.get(1, 0) * dy.get(1, 1),
                            a.get(0, 1) * dy.get(0, 0) + a.get(1, 1) * dy.get(1, 0),
                            a.get(0, 1) * dy.get(0, 1) + a.get(1, 1) * dy.get(1, 1),
                            a.get(0, 2) * dy.get(0, 0) + a.get(1, 2) * dy.get(1, 0),
                            a.get(0, 2) * dy.get(0, 1) + a.get(1, 2) * dy.get(1, 1)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var a = tf.tensor2d([1, 2, 3, 10, 20, 30], [2, 3]);
        var b = tf.tensor2d([2, 3, 4, 1, 2, 3], [3, 2]);
        var grads = tf.grads(function (a, b) {
            return tf.matMul(a.clone(), b.clone()).clone();
        });
        var _a = grads([a, b]), da = _a[0], db = _a[1];
        expect(da.shape).toEqual(a.shape);
        expect(db.shape).toEqual(b.shape);
    });
    it('gradients: a * bT', function () { return __awaiter(_this, void 0, void 0, function () {
        var aT, bT, dyT, transposeA, transposeB, grads, _a, da, db, a, dy, b, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    aT = tf.tensor2d([1, 2, 3, 10, 20, 30], [3, 2]);
                    bT = tf.tensor2d([2, 3, 4, 1, 2, 3], [3, 2]);
                    dyT = tf.tensor2d([1, 10, 20, 30, 40, 50, 60, 70, 80], [3, 3]);
                    transposeA = false;
                    transposeB = true;
                    grads = tf.grads(function (a, b) {
                        return tf.matMul(a, b, transposeA, transposeB);
                    });
                    _a = grads([aT, bT], dyT), da = _a[0], db = _a[1];
                    // da = dy * b
                    expect(da.shape).toEqual(aT.shape);
                    return [4 /*yield*/, aT.buffer()];
                case 1:
                    a = _d.sent();
                    return [4 /*yield*/, dyT.buffer()];
                case 2:
                    dy = _d.sent();
                    return [4 /*yield*/, bT.buffer()];
                case 3:
                    b = _d.sent();
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 4:
                    _b.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * b.get(0, 0) + dy.get(0, 1) * b.get(1, 0) +
                                dy.get(0, 2) * b.get(2, 0),
                            dy.get(0, 0) * b.get(0, 1) + dy.get(0, 1) * b.get(1, 1) +
                                dy.get(0, 2) * b.get(2, 1),
                            dy.get(1, 0) * b.get(0, 0) + dy.get(1, 1) * b.get(1, 0) +
                                dy.get(1, 2) * b.get(2, 0),
                            dy.get(1, 0) * b.get(0, 1) + dy.get(1, 1) * b.get(1, 1) +
                                dy.get(1, 2) * b.get(2, 1),
                            dy.get(2, 0) * b.get(0, 0) + dy.get(2, 1) * b.get(1, 0) +
                                dy.get(2, 2) * b.get(2, 0),
                            dy.get(2, 0) * b.get(0, 1) + dy.get(2, 1) * b.get(1, 1) +
                                dy.get(2, 2) * b.get(2, 1)
                        ]]);
                    // db = dyT * a
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 5:
                    _c.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * a.get(0, 0) + dy.get(1, 0) * a.get(1, 0) +
                                dy.get(2, 0) * a.get(2, 0),
                            dy.get(0, 0) * a.get(0, 1) + dy.get(1, 0) * a.get(1, 1) +
                                dy.get(2, 0) * a.get(2, 1),
                            dy.get(0, 1) * a.get(0, 0) + dy.get(1, 1) * a.get(1, 0) +
                                dy.get(2, 1) * a.get(2, 0),
                            dy.get(0, 1) * a.get(0, 1) + dy.get(1, 1) * a.get(1, 1) +
                                dy.get(2, 1) * a.get(2, 1),
                            dy.get(0, 2) * a.get(0, 0) + dy.get(1, 2) * a.get(1, 0) +
                                dy.get(2, 2) * a.get(2, 0),
                            dy.get(0, 2) * a.get(0, 1) + dy.get(1, 2) * a.get(1, 1) +
                                dy.get(2, 2) * a.get(2, 1)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: aT * b', function () { return __awaiter(_this, void 0, void 0, function () {
        var aT, bT, dyT, transposeA, transposeB, grads, _a, da, db, a, dy, b, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    aT = tf.tensor2d([1, 2, 3, 10, 20, 30], [3, 2]);
                    bT = tf.tensor2d([2, 3, 4, 1, 2, 3], [3, 2]);
                    dyT = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    transposeA = true;
                    transposeB = false;
                    grads = tf.grads(function (a, b) {
                        return tf.matMul(a, b, transposeA, transposeB);
                    });
                    _a = grads([aT, bT], dyT), da = _a[0], db = _a[1];
                    // da = b * dyT
                    expect(da.shape).toEqual(aT.shape);
                    return [4 /*yield*/, aT.buffer()];
                case 1:
                    a = _d.sent();
                    return [4 /*yield*/, dyT.buffer()];
                case 2:
                    dy = _d.sent();
                    return [4 /*yield*/, bT.buffer()];
                case 3:
                    b = _d.sent();
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 4:
                    _b.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * b.get(0, 0) + dy.get(0, 1) * b.get(0, 1),
                            dy.get(1, 0) * b.get(0, 0) + dy.get(1, 1) * b.get(0, 1),
                            dy.get(0, 0) * b.get(1, 0) + dy.get(0, 1) * b.get(1, 1),
                            dy.get(1, 0) * b.get(1, 0) + dy.get(1, 1) * b.get(1, 1),
                            dy.get(0, 0) * b.get(2, 0) + dy.get(0, 1) * b.get(2, 1),
                            dy.get(1, 0) * b.get(2, 0) + dy.get(1, 1) * b.get(2, 1)
                        ]]);
                    // db = a * dy
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 5:
                    _c.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * a.get(0, 0) + dy.get(1, 0) * a.get(0, 1),
                            dy.get(0, 1) * a.get(0, 0) + dy.get(1, 1) * a.get(0, 1),
                            dy.get(0, 0) * a.get(1, 0) + dy.get(1, 0) * a.get(1, 1),
                            dy.get(0, 1) * a.get(1, 0) + dy.get(1, 1) * a.get(1, 1),
                            dy.get(0, 0) * a.get(2, 0) + dy.get(1, 0) * a.get(2, 1),
                            dy.get(0, 1) * a.get(2, 0) + dy.get(1, 1) * a.get(2, 1)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: aT * bT', function () { return __awaiter(_this, void 0, void 0, function () {
        var aT, bT, dyT, transposeA, transposeB, grads, _a, da, db, a, dy, b, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    aT = tf.tensor2d([1, 2, 3, 10, 20, 30], [3, 2]);
                    bT = tf.tensor2d([2, 3, 4, 1, 2, 3], [2, 3]);
                    dyT = tf.tensor2d([1, 10, 20, 30], [2, 2]);
                    transposeA = true;
                    transposeB = true;
                    grads = tf.grads(function (a, b) {
                        return tf.matMul(a, b, transposeA, transposeB);
                    });
                    _a = grads([aT, bT], dyT), da = _a[0], db = _a[1];
                    // da = bT * dyT
                    expect(da.shape).toEqual(aT.shape);
                    return [4 /*yield*/, aT.buffer()];
                case 1:
                    a = _d.sent();
                    return [4 /*yield*/, dyT.buffer()];
                case 2:
                    dy = _d.sent();
                    return [4 /*yield*/, bT.buffer()];
                case 3:
                    b = _d.sent();
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 4:
                    _b.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * b.get(0, 0) + dy.get(0, 1) * b.get(1, 0),
                            dy.get(1, 0) * b.get(0, 0) + dy.get(1, 1) * b.get(1, 0),
                            dy.get(0, 0) * b.get(0, 1) + dy.get(0, 1) * b.get(1, 1),
                            dy.get(1, 0) * b.get(0, 1) + dy.get(1, 1) * b.get(1, 1),
                            dy.get(0, 0) * b.get(0, 2) + dy.get(0, 1) * b.get(1, 2),
                            dy.get(1, 0) * b.get(0, 2) + dy.get(1, 1) * b.get(1, 2)
                        ]]);
                    // db = dyT * aT
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 5:
                    _c.apply(void 0, [_d.sent(), [
                            dy.get(0, 0) * a.get(0, 0) + dy.get(1, 0) * a.get(0, 1),
                            dy.get(0, 0) * a.get(1, 0) + dy.get(1, 0) * a.get(1, 1),
                            dy.get(0, 0) * a.get(2, 0) + dy.get(1, 0) * a.get(2, 1),
                            dy.get(0, 1) * a.get(0, 0) + dy.get(1, 1) * a.get(0, 1),
                            dy.get(0, 1) * a.get(1, 0) + dy.get(1, 1) * a.get(1, 1),
                            dy.get(0, 1) * a.get(2, 0) + dy.get(1, 1) * a.get(2, 1)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.matMul({}, tf.tensor2d([2], [1, 1])); })
            .toThrowError(/Argument 'a' passed to 'matMul' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.matMul(tf.tensor2d([2], [1, 1]), {}); })
            .toThrowError(/Argument 'b' passed to 'matMul' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[1, 2, 3], [4, 5, 6]];
                    b = [[0, 1], [-3, 2], [2, 1]];
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3]);
                    b = [[0, 1], [-3, 2], [2, 1]];
                    c = a.matMul(b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('a * b where a has zero in its shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([], [0, 3]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([0, 2]);
                    expect(c.rank).toBe(2);
                    expect(c.size).toBe(0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('(a * b) * c where a has zero in its shape, so a*b does also', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, ab, _a, c, res, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([], [0, 3]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6], [3, 2]);
                    ab = tf.matMul(a, b);
                    expect(ab.shape).toEqual([0, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ab.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), []]);
                    c = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    res = tf.matMul(ab, c);
                    expect(res.shape).toEqual([0, 3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.matMul([['a']], [['b']]); })
            .toThrowError(/Argument 'a' passed to 'matMul' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('matmulBatch', jasmine_util_1.ALL_ENVS, function () {
    it('A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 2, 3]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 3, 2]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([5, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            87, 20, -6, -32, -24, -50, -36, -5, 24, 98,
                            70, 33, -64, 47, -42, -28, -71, 24, 37, 5
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B in 4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([
                        -2, 3, 5, -5, 3, 9, -3, -5, 1, 1, -9, 9, -6, 6, -8,
                        -7, -1, 3, 9, -7, -7, 2, 10, -6, -8, -6, 9, -6, 4, -1,
                        9, -6, 10, 8, -9, 5, -8, -7, 0, 2, -5, -1, -9, -4, 3,
                        -2, 6, -4, 7, 1, -5, -4, 9, -8, -6, -8, 4, -1, 4, 3,
                        -7, 8, -7, 5, -3, -2, -4, 9, 2, -1, 1, -10, -3, 5, -4,
                        6, -8, -8, 9, -3, -5, 10, 3, -3, -3, 9, 3, -3, 2, -8,
                        10, 1, 9, -2, -2, -3, -4, 6, -10, -1, 8, -8, 7, 3, -2,
                        3, 6, -2, -2, -4, 1, -5, -4, 0, 5, 1, 9, -8, -2, -1
                    ], [4, 5, 2, 3]);
                    b = tf.tensor4d([
                        -4, -3, -2, -6, 6, -1, -4, -1, 7, -4, 8, -9, -9, 0, -1,
                        -4, -6, -7, -3, -4, -7, 6, -8, 1, -2, 1, -1, -3, 8, -5,
                        9, -2, 5, 9, -2, 2, -5, -5, -8, -1, -2, -3, -2, -10, 6,
                        -3, 0, 1, 6, 7, 1, 2, -4, -5, 2, -5, -7, 9, 3, -6,
                        6, 4, -4, 6, 10, -3, -2, 8, 10, -8, 10, -1, -9, -7, -8,
                        -3, 1, 1, -2, -9, -7, -6, -1, 0, 7, -9, -7, -5, 0, -4,
                        -4, -7, 2, 4, 6, 6, -4, -6, -8, 3, -8, -9, 6, 9, -4,
                        1, -1, 0, 8, 9, 0, -5, 3, -1, 5, 0, -10, 7, -2, 6
                    ], [4, 5, 3, 2]);
                    transposeA = false;
                    transposeB = false;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            32, -17, 68, -12, -15, 14, 5, -46, 96, 32, 46, -17, 78, -85,
                            -28, 46, 94, -35, 0, -13, 31, -52, 17, -87, 96, 47, 32, -2,
                            -6, 105, 40, -2, 63, 76, 17, 30, 56, -66, -21, 23, -144, 41,
                            22, 8, 118, -106, -88, -6, -17, 2, 2, -26, 8, -63, -38, -108,
                            -84, -30, -35, 49, 16, -12, -14, -12, 48, 132, 4, 102, 32, 66,
                            -4, 33, -13, 1, -40, -25, -3, 61, -18, -20
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 2, 3]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 2, 3]);
                    transposeA = false;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    expect(c.shape).toEqual([5, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            66, 35, -48, 14, -45, -33, -12, 7, -76, 64,
                            3, 66, -119, -9, -64, -60, -76, 48, 33, -16
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 2, 3]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 2, 3]);
                    transposeA = true;
                    transposeB = false;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            40, -36, 5, 40, 34, 5, 48, 80, 6, -6, 21, -48, -23, -20, -50,
                            -12, -21, -12, -58, 15, -96, 23, 6, 39, 20, 109, 42, -67, 45, -40,
                            76, -52, 40, -15, 1, -60, -58, -3, 36, 40, -6, -24, 51, -33, -28
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B in 4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([
                        -2, 3, 5, -5, 3, 9, -3, -5, 1, 1, -9, 9, -6, 6, -8,
                        -7, -1, 3, 9, -7, -7, 2, 10, -6, -8, -6, 9, -6, 4, -1,
                        9, -6, 10, 8, -9, 5, -8, -7, 0, 2, -5, -1, -9, -4, 3,
                        -2, 6, -4, 7, 1, -5, -4, 9, -8, -6, -8, 4, -1, 4, 3,
                        -7, 8, -7, 5, -3, -2, -4, 9, 2, -1, 1, -10, -3, 5, -4,
                        6, -8, -8, 9, -3, -5, 10, 3, -3, -3, 9, 3, -3, 2, -8,
                        10, 1, 9, -2, -2, -3, -4, 6, -10, -1, 8, -8, 7, 3, -2,
                        3, 6, -2, -2, -4, 1, -5, -4, 0, 5, 1, 9, -8, -2, -1
                    ], [4, 5, 2, 3]);
                    b = tf.tensor4d([
                        -4, -3, -2, -6, 6, -1, -4, -1, 7, -4, 8, -9, -9, 0, -1,
                        -4, -6, -7, -3, -4, -7, 6, -8, 1, -2, 1, -1, -3, 8, -5,
                        9, -2, 5, 9, -2, 2, -5, -5, -8, -1, -2, -3, -2, -10, 6,
                        -3, 0, 1, 6, 7, 1, 2, -4, -5, 2, -5, -7, 9, 3, -6,
                        6, 4, -4, 6, 10, -3, -2, 8, 10, -8, 10, -1, -9, -7, -8,
                        -3, 1, 1, -2, -9, -7, -6, -1, 0, 7, -9, -7, -5, 0, -4,
                        -4, -7, 2, 4, 6, 6, -4, -6, -8, 3, -8, -9, 6, 9, -4,
                        1, -1, 0, 8, 9, 0, -5, 3, -1, 5, 0, -10, 7, -2, 6
                    ], [4, 5, 2, 3]);
                    transposeA = true;
                    transposeB = false;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            38, -24, 9, -30, 9, -9, -74, 39, -19, 8, 11, -30, 56, -67,
                            46, -40, 71, -74, 82, 42, 55, -50, 6, 1, 60, -18, -13, -15,
                            -52, -61, 81, -52, 59, -15, 76, 43, 34, -56, 38, 0, 26, -14,
                            -15, 1, -4, 153, -34, 61, -135, 30, -48, 135, -30, 60, 38, 36,
                            58, 40, 45, 71, 1, 2, 3, 24, 90, -56, -10, 40, -18, 6,
                            -30, 14, 34, 65, 27, 24, -29, -44, -46, -3, 35, -21, 27, 48,
                            20, 52, 32, 35, -11, -46, -12, 22, 13, 30, 2, -23, -54, -48,
                            34, 16, -42, -39, -26, 82, 89, 76, -84, 30, 9, 27, 30, -21,
                            -43, -48, 60, 20, 24, -78, -91, -63, -12, 24, 21, 28, 48, 35,
                            -6, 27, 33, 53, -81, -71, 61, -27, 11, -48, -82, 8, -12, -19,
                            -10, -48, -81, 0, 13, 32, 41, 0, -100, -120, 16, 124, 152, 45,
                            60, -28, 24, 21, -12, -14, -16, 8, 9, -33, 5, -12, -48, 4,
                            8, 9, 0, -31, 16, -98, -9, 4, -22, 38, 2, -96
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('A^t x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, transposeA, transposeB, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 3, 2]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 2, 3]);
                    transposeA = true;
                    transposeB = true;
                    c = tf.matMul(a, b, transposeA, transposeB);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            66, 42, 16, -56, -12, 6, -30, 19, -1, 102,
                            -94, 14, -56, 32, 100, -56, -47, -11, 5, -31
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batch dimensions do not match', function () {
        var a = tf.tensor3d([
            -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3,
            7, -2, 5, -6, 3, 8, 7, -8, 1, 4, -4, 6
        ], [4, 3, 2]);
        var b = tf.tensor3d([
            -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
            5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
        ], [5, 2, 3]);
        var f = function () {
            tf.matMul(a, b, false, false);
        };
        expect(f).toThrowError();
    });
    it('gradients: A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 2, 3]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 3, 2]);
                    dy = tf.tensor3d([8, 2, -3, -2, -8, 4, 5, 7, 4, -4, -4, 5, 8, 10, 1, 0, 6, 6, -4, 7], [5, 2, 2]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, false, false); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    // da = dy * bT
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -72, -8, -56, 32, 3, 21, -12, -40, 40, 36, 44, 51, -52, -44, -4,
                            61, 49, 13, -2, -10, -108, -9, 0, -1, -24, 60, -6, 49, 26, -40
                        ]]);
                    // db = aT * dy
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -64, -26, -34, -6, -24, 4, -77, -47, 51, -35, 63, -3, 52, -58, -20,
                            23, -12, 20, 60, 70, -68, -80, 14, 10, 44, -11, -32, -10, -46, -68
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4d gradients: A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([
                        -2, 3, 5, -5, 3, 9, -3, -5, 1, 1, -9, 9, -6, 6, -8,
                        -7, -1, 3, 9, -7, -7, 2, 10, -6, -8, -6, 9, -6, 4, -1,
                        9, -6, 10, 8, -9, 5, -8, -7, 0, 2, -5, -1, -9, -4, 3,
                        -2, 6, -4, 7, 1, -5, -4, 9, -8, -6, -8, 4, -1, 4, 3,
                        -7, 8, -7, 5, -3, -2, -4, 9, 2, -1, 1, -10, -3, 5, -4,
                        6, -8, -8, 9, -3, -5, 10, 3, -3, -3, 9, 3, -3, 2, -8,
                        10, 1, 9, -2, -2, -3, -4, 6, -10, -1, 8, -8, 7, 3, -2,
                        3, 6, -2, -2, -4, 1, -5, -4, 0, 5, 1, 9, -8, -2, -1
                    ], [4, 5, 2, 3]);
                    b = tf.tensor4d([
                        -4, -3, -2, -6, 6, -1, -4, -1, 7, -4, 8, -9, -9, 0, -1,
                        -4, -6, -7, -3, -4, -7, 6, -8, 1, -2, 1, -1, -3, 8, -5,
                        9, -2, 5, 9, -2, 2, -5, -5, -8, -1, -2, -3, -2, -10, 6,
                        -3, 0, 1, 6, 7, 1, 2, -4, -5, 2, -5, -7, 9, 3, -6,
                        6, 4, -4, 6, 10, -3, -2, 8, 10, -8, 10, -1, -9, -7, -8,
                        -3, 1, 1, -2, -9, -7, -6, -1, 0, 7, -9, -7, -5, 0, -4,
                        -4, -7, 2, 4, 6, 6, -4, -6, -8, 3, -8, -9, 6, 9, -4,
                        1, -1, 0, 8, 9, 0, -5, 3, -1, 5, 0, -10, 7, -2, 6
                    ], [4, 5, 3, 2]);
                    dy = tf.tensor4d([
                        8, -7, 0, -9, -5, -5, 0, 3, 7, -4, 6, -8, -8, 0, -1, -8,
                        -9, -7, -4, -9, 2, 3, 5, 8, -5, -7, 3, -10, -5, -9, -5, 1,
                        7, 1, -9, -10, 8, 5, 0, 8, -6, 4, 0, -5, 8, -7, -2, 1,
                        -8, 9, 9, -7, 1, 7, -2, 5, -2, 9, 1, -5, 7, 5, -7, -6,
                        6, 7, -8, 7, 4, -5, 4, -5, 3, -4, -5, 4, -6, 3, -8, 10
                    ], [4, 5, 2, 2]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, false, false); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    // da = dy * bT
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -11, 26, 55, 27, 54, 9, 25, -15, 5, -3, -12, -27, -63, 9,
                            -14, -54, 26, 20, 24, 56, 64, 35, -41, 0, 11, 30, -37, -1,
                            31, 13, 12, 37, 2, 29, 97, 6, 60, 47, 31, 35, -14, 24,
                            100, -3, -9, 0, -33, 1, 49, 9, -33, -124, -29, 86, -9, -11,
                            -6, -40, 72, -48, -20, 48, -72, -20, -30, 15, -72, 136, 87, 12,
                            -28, -21, 9, 37, 1, -32, -51, 2, -65, -49, -1, -41, -16, 2,
                            -95, -31, -36, 52, 18, 20, -63, 34, 72, 70, -38, -78, -66, -27,
                            -111, -10, 85, 1, -21, -21, -4, -21, -21, -4, -12, 20, 13, -4,
                            -20, -19, -30, 81, 30, -40, 150, 76
                        ]]);
                    // db = aT * dy
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -16, 59, 24, -48, 40, -116, 15, 18, 25, -2, -5, 22, -84, 80,
                            36, -16, -38, 8, -74, -16, 46, -80, 62, 48, 96, 110, 38, 6,
                            -77, -54, 58, 91, -57, -90, 45, 70, 46, 36, 20, 99, -3, 10,
                            55, 79, -10, 42, 5, -31, 85, 47, -74, -89, 37, 75, -48, -38,
                            -64, -8, 32, 44, 42, -53, -48, 47, 42, -18, -30, 27, 70, -62,
                            36, -24, 78, -69, -112, 101, -40, 20, -11, 113, -9, -6, 1, -50,
                            3, -12, -16, 71, -14, 67, 84, 62, 21, 17, 84, 63, -16, -35,
                            -28, 98, 4, -126, 40, -50, 36, -45, -16, 20, 19, -12, 8, 0,
                            3, -4, 34, -65, 10, -17, -46, 17
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: A x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 3, 2]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 3, 2]);
                    dy = tf.tensor3d([
                        -0, 7, 5, 0, -9, 5, -7, 6, -5, -3, -2, -2, -4, 10, -3,
                        5, -1, 3, -2, -9, 4, -5, 7, 9, -10, -8, -8, -5, -0, -1,
                        3, 3, 4, 9, -7, 6, -2, -9, 5, 1, -5, -3, -1, 9, 4
                    ], [5, 3, 3]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, false, true); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -42, 0, -26, 0, 85, 28, -19, -29, 51, -16, 6, 37, 94, -27, 50,
                            71, 24, -202, 46, -25, -31, -22, -87, 10, -7, -80, -36, -15, 55, 35
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            14, 56, 7, -155, -45, 55, 7, 72, -67, -79, 7, 50, -69, -46, -52,
                            -88, 49, -126, -68, 106, 31, -30, -27, 60, -19, 5, 27, 43, 55, -13
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4d gradients: A x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([
                        -2, 3, 5, -5, 3, 9, -3, -5, 1, 1, -9, 9, -6, 6, -8,
                        -7, -1, 3, 9, -7, -7, 2, 10, -6, -8, -6, 9, -6, 4, -1,
                        9, -6, 10, 8, -9, 5, -8, -7, 0, 2, -5, -1, -9, -4, 3,
                        -2, 6, -4, 7, 1, -5, -4, 9, -8, -6, -8, 4, -1, 4, 3,
                        -7, 8, -7, 5, -3, -2, -4, 9, 2, -1, 1, -10, -3, 5, -4,
                        6, -8, -8, 9, -3, -5, 10, 3, -3, -3, 9, 3, -3, 2, -8,
                        10, 1, 9, -2, -2, -3, -4, 6, -10, -1, 8, -8, 7, 3, -2,
                        3, 6, -2, -2, -4, 1, -5, -4, 0, 5, 1, 9, -8, -2, -1
                    ], [4, 5, 3, 2]);
                    b = tf.tensor4d([
                        -4, -3, -2, -6, 6, -1, -4, -1, 7, -4, 8, -9, -9, 0, -1,
                        -4, -6, -7, -3, -4, -7, 6, -8, 1, -2, 1, -1, -3, 8, -5,
                        9, -2, 5, 9, -2, 2, -5, -5, -8, -1, -2, -3, -2, -10, 6,
                        -3, 0, 1, 6, 7, 1, 2, -4, -5, 2, -5, -7, 9, 3, -6,
                        6, 4, -4, 6, 10, -3, -2, 8, 10, -8, 10, -1, -9, -7, -8,
                        -3, 1, 1, -2, -9, -7, -6, -1, 0, 7, -9, -7, -5, 0, -4,
                        -4, -7, 2, 4, 6, 6, -4, -6, -8, 3, -8, -9, 6, 9, -4,
                        1, -1, 0, 8, 9, 0, -5, 3, -1, 5, 0, -10, 7, -2, 6
                    ], [4, 5, 3, 2]);
                    dy = tf.tensor4d([
                        5, -1, -5, -4, -1, 9, 1, -2, 10, 7, -1, 6, -8, 8, -3,
                        9, -4, 2, -4, -8, 8, 4, 8, -10, -8, -8, 6, 6, -5, 9,
                        -1, -7, -5, -3, -3, 2, -6, 5, 8, -9, 5, -8, -3, 8, 6,
                        2, 8, 5, 9, 7, 6, 2, -3, 10, 7, 7, -3, 4, -3, -6,
                        -8, -8, 9, 0, -8, -3, -2, -2, 8, 2, 3, -6, 3, 6, -3,
                        7, 7, -9, -3, 8, 7, 7, -1, -6, 5, 2, -1, -1, 1, 5,
                        0, -4, 3, -4, -10, 1, -2, -8, -9, -6, 4, 4, -7, -1, -1,
                        -9, 7, 1, -1, 8, 0, -2, -7, 5, 7, 8, 9, -3, -8, -6,
                        -7, -8, -1, 8, -4, 7, 5, -9, 9, 3, 0, -10, 7, -9, 4,
                        -7, 5, -2, -2, 3, 3, -6, 2, 0, 8, -5, -10, 3, -7, 0,
                        -6, 2, 3, -1, 3, 3, -10, 1, 3, -7, -1, 8, -2, -1, -1,
                        -3, -9, 7, 4, -6, 3, 0, -7, -4, -5, -8, -6, 10, -6, 4
                    ], [4, 5, 3, 3]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, false, true); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -48, -4, 72, 9, 60, -1, 13, -57, 64, 3, -48, -11, -4, -24,
                            16, 38, 44, -10, -55, -45, 92, -43, 14, -4, 71, -61, -51, 16,
                            46, -57, 48, 78, 104, 57, -17, -11, -85, -33, 16, 1, 86, 21,
                            -48, 21, -8, 34, 14, -35, 36, 48, 85, 108, -38, -40, 3, -8,
                            -7, -1, 6, -16, 46, -33, 26, -79, -70, -29, 92, -84, -6, -47,
                            98, -129, -55, -17, 79, 40, -118, -64, 68, 75, 71, 111, 5, -48,
                            98, -36, 21, 13, 112, -34, 26, 57, 32, 44, 28, 50, 88, 27,
                            44, -39, -16, 15, -21, -6, -67, -89, -46, -64, -19, -12, -3, 11,
                            41, 63, 78, -73, 67, -92, 102, -18
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -27, 44, -9, -16, 85, 30, -110, 38, 47, -23, -39, -15, 0, -76,
                            -8, -128, 26, 136, 31, -26, -26, 39, 136, -85, -45, 93, 37, -68,
                            -112, -6, 90, 70, 169, -7, 15, 68, -16, -33, -16, -47, -21, 0,
                            6, -4, 84, 24, 15, 20, -41, -1, 79, -86, 87, -23, -26, -64,
                            18, 9, 52, 64, 34, -16, 122, -66, -1, 47, 1, 43, -11, -33,
                            -17, 27, -45, -73, -60, -66, -92, -42, 32, -85, -44, -44, -28, -13,
                            8, -20, 9, -9, -49, 79, -76, 15, 73, -7, 7, -8, -110, 93,
                            106, -39, 64, -84, -29, -19, 13, 14, 63, 2, -15, 23, 17, 49,
                            -3, -31, -65, 30, -95, 63, -82, 40
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: A^t x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 3, 2]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 3, 2]);
                    dy = tf.tensor3d([8, 2, -3, -2, -8, 4, 5, 7, 4, -4, -4, 5, 8, 10, 1, 0, 6, 6, -4, 7], [5, 2, 2]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, true, false); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -72, 32, -8, 3, -56, 21, -12, 36, -40, 44, 40, 51, -52, 61, -44,
                            49, -4, 13, -2, -9, -10, 0, -108, -1, -24, 49, 60, 26, -6, -40
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -25, 0, -72, -28, 8, 12, -67, -33, 3, -87, 23, 17, 36, -38, 44,
                            -50, -20, 28, 48, 70, 12, 10, -26, -40, 40, -4, -34, -89, 20, -2
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: A^t x B^t', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor3d([
                        -5, -5, -6, 8, -2, -8, 4, -7, -6, -9, -1, 3, 7, -2, 5,
                        -6, 3, 8, 7, -8, 1, 4, -4, 6, 4, -4, -9, -5, 2, -2
                    ], [5, 3, 2]);
                    b = tf.tensor3d([
                        -8, -4, -1, 0, -7, 0, 3, 3, 6, 2, -1, 8, -4, 9, -6,
                        5, 8, 9, -9, 7, 0, -1, -1, -10, -7, 3, 4, 6, 3, -4
                    ], [5, 2, 3]);
                    dy = tf.tensor3d([8, 2, -3, -2, -8, 4, 5, 7, 4, -4, -4, 5, 8, 10, 1, 0, 6, 6, -4, 7], [5, 2, 2]);
                    grads = tf.grads(function (a, b) { return tf.matMul(a, b, true, true); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            -64, 24, -46, 26, -8, 3, -16, 29, -28, 8, -16, 86, -36, 41, 4,
                            4, -60, 69, -82, -9, 46, 7, -100, 0, -6, 70, 36, 9, 0, -44
                        ]]);
                    expect(db.shape).toEqual(b.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -25, -72, 8, 0, -28, 12, -67, 3, 23, -33, -87, 17, 36, 44, -20,
                            -38, -50, 28, 48, 12, -26, 70, 10, -40, 40, -34, 20, -4, -89, -2
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('dot', jasmine_util_1.ALL_ENVS, function () {
    var a;
    var b;
    var c;
    var d;
    var e;
    beforeEach(function () {
        a = tf.tensor1d([1, 2]);
        b = tf.tensor2d([[1, 2], [3, 4]]);
        c = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
        d = tf.tensor3d([1, 2], [1, 1, 2]);
        e = tf.scalar(1);
    });
    it('vector-vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var aa, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aa = tf.dot(a, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, aa.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5]]);
                    expect(aa.shape).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector-matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var ab, ac, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    ab = tf.dot(a, b);
                    ac = tf.dot(a, c);
                    expect(ab.shape).toEqual([2]);
                    expect(ac.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ab.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [7, 10]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ac.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [9, 12, 15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix-vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var ba, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ba = b.dot(a);
                    expect(ba.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ba.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 11]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix-matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var bb, bc, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    bb = tf.dot(b, b);
                    bc = tf.dot(b, c);
                    expect(bb.shape).toEqual([2, 2]);
                    expect(bc.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bb.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [7, 10, 15, 22]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, bc.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [9, 12, 15, 19, 26, 33]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matmul A x B asymmetric', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, cData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    b = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    c = tf.matMul(a, b);
                    return [4 /*yield*/, c.data()];
                case 1:
                    cData = _a.sent();
                    expect(c.shape).toEqual([2, 3]);
                    test_util_1.expectArraysClose(cData, [9, 12, 15, 19, 26, 33]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error on incompatible dimensions', function () {
        expect(function () { return tf.dot(c, a); }).toThrowError();
        expect(function () { return tf.dot(c, b); }).toThrowError();
    });
    it('throws error when inputs are not rank 1 or 2', function () {
        expect(function () { return tf.dot(a, d); }).toThrowError();
        expect(function () { return tf.dot(a, e); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 2, 3];
                    res = tf.dot(a, a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [14]]);
                    expect(res.shape).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensors', function () {
        expect(function () { return tf.dot('a', 'b'); })
            .toThrowError(/Argument 't1' passed to 'dot' must be numeric tensor/);
    });
});
//# sourceMappingURL=matmul_test.js.map