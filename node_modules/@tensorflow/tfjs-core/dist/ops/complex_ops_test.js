"use strict";
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
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('complex64', jasmine_util_1.ALL_ENVS, function () {
    it('tf.complex', function () { return __awaiter(_this, void 0, void 0, function () {
        var real, imag, complex, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    real = tf.tensor1d([3, 30]);
                    imag = tf.tensor1d([4, 40]);
                    complex = tf.complex(real, imag);
                    expect(complex.dtype).toBe('complex64');
                    expect(complex.shape).toEqual(real.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, complex.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 30, 40]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tf.real', function () { return __awaiter(_this, void 0, void 0, function () {
        var complex, real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    complex = tf.complex([3, 30], [4, 40]);
                    real = tf.real(complex);
                    expect(real.dtype).toBe('float32');
                    expect(real.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, real.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 30]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tf.imag', function () { return __awaiter(_this, void 0, void 0, function () {
        var complex, imag, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    complex = tf.complex([3, 30], [4, 40]);
                    imag = tf.imag(complex);
                    expect(imag.dtype).toBe('float32');
                    expect(imag.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, imag.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 40]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when shapes dont match', function () {
        var real = tf.tensor1d([3, 30]);
        var imag = tf.tensor1d([4, 40, 50]);
        var re = /real and imag shapes, 2 and 3, must match in call to tf.complex\(\)/;
        expect(function () { return tf.complex(real, imag); }).toThrowError(re);
    });
});
var BYTES_PER_COMPLEX_ELEMENT = 4 * 2;
jasmine_util_1.describeWithFlags('complex64 memory', jasmine_util_1.BROWSER_ENVS, function () {
    it('usage', function () { return __awaiter(_this, void 0, void 0, function () {
        var numTensors, numBuffers, startTensors, real1, imag1, complex1, real2, imag2, complex2, result, _a, real, _b, imag, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    numTensors = tf.memory().numTensors;
                    numBuffers = tf.memory().numDataBuffers;
                    startTensors = numTensors;
                    real1 = tf.tensor1d([1]);
                    imag1 = tf.tensor1d([2]);
                    complex1 = tf.complex(real1, imag1);
                    // 5 new Tensors: real1, imag1, complex1, and two internal clones.
                    expect(tf.memory().numTensors).toBe(numTensors + 5);
                    // Only 3 new data buckets are actually created.
                    expect(tf.memory().numDataBuffers).toBe(numBuffers + 3);
                    numTensors = tf.memory().numTensors;
                    numBuffers = tf.memory().numDataBuffers;
                    real2 = tf.tensor1d([3]);
                    imag2 = tf.tensor1d([4]);
                    complex2 = tf.complex(real2, imag2);
                    // 5 new Tensors: real1, imag1, complex1, and two internal clones.
                    expect(tf.memory().numTensors).toBe(numTensors + 5);
                    // Only 3 new data buckets are actually created.
                    expect(tf.memory().numDataBuffers).toBe(numBuffers + 3);
                    numTensors = tf.memory().numTensors;
                    numBuffers = tf.memory().numDataBuffers;
                    result = complex1.add(complex2);
                    // A complex tensor is created, which is composed of 2 underlying tensors.
                    expect(tf.memory().numTensors).toBe(numTensors + 3);
                    numTensors = tf.memory().numTensors;
                    expect(result.dtype).toBe('complex64');
                    expect(result.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [4, 6]]);
                    real = tf.real(result);
                    expect(tf.memory().numTensors).toBe(numTensors + 1);
                    numTensors = tf.memory().numTensors;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, real.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [4]]);
                    imag = tf.imag(result);
                    expect(tf.memory().numTensors).toBe(numTensors + 1);
                    numTensors = tf.memory().numTensors;
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, imag.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [6]]);
                    // After disposing, there should be no tensors.
                    real1.dispose();
                    imag1.dispose();
                    real2.dispose();
                    imag2.dispose();
                    complex1.dispose();
                    complex2.dispose();
                    result.dispose();
                    real.dispose();
                    imag.dispose();
                    expect(tf.memory().numTensors).toBe(startTensors);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tf.complex disposing underlying tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var numTensors, real, imag, complex, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    numTensors = tf.memory().numTensors;
                    real = tf.tensor1d([3, 30]);
                    imag = tf.tensor1d([4, 40]);
                    expect(tf.memory().numTensors).toEqual(numTensors + 2);
                    complex = tf.complex(real, imag);
                    // real and imag are cloned.
                    expect(tf.memory().numTensors).toEqual(numTensors + 5);
                    real.dispose();
                    imag.dispose();
                    // A copy of real and imag still exist, the one owned by the complex tensor.
                    expect(tf.memory().numTensors).toEqual(numTensors + 3);
                    expect(complex.dtype).toBe('complex64');
                    expect(complex.shape).toEqual(real.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, complex.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 4, 30, 40]]);
                    complex.dispose();
                    expect(tf.memory().numTensors).toEqual(numTensors);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reshape', function () { return __awaiter(_this, void 0, void 0, function () {
        var memoryBefore, a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    memoryBefore = tf.memory();
                    a = tf.complex([[1, 3, 5], [7, 9, 11]], [[2, 4, 6], [8, 10, 12]]);
                    // 3 new tensors, the complex64 tensor and the 2 underlying float32 tensors.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 3);
                    // Bytes should be counted once.
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    b = a.reshape([6]);
                    // 1 new tensor from the reshape.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 4);
                    // No new bytes from a reshape.
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    expect(b.dtype).toBe('complex64');
                    expect(b.shape).toEqual([6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, b.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    b.dispose();
                    // 1 complex tensor should be disposed.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 3);
                    // Byte count should not change because the refcounts are all 1.
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    a.dispose();
                    // All the tensors should now be disposed.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors);
                    // The underlying memory should now be released.
                    expect(tf.memory().numBytes).toBe(memoryBefore.numBytes);
                    return [2 /*return*/];
            }
        });
    }); });
    it('clone', function () { return __awaiter(_this, void 0, void 0, function () {
        var memoryBefore, a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    memoryBefore = tf.memory();
                    a = tf.complex([[1, 3, 5], [7, 9, 11]], [[2, 4, 6], [8, 10, 12]]);
                    // 3 new tensors, the complex64 tensor and the 2 underlying float32 tensors.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 3);
                    // Bytes should be counted once
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    b = a.clone();
                    // 1 new tensor from the clone.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 4);
                    // No new bytes from a clone.
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    expect(b.dtype).toBe('complex64');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, b.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    b.dispose();
                    // 1 complex tensor should be disposed.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors + 3);
                    // Byte count should not change because the refcounts are all 1.
                    expect(tf.memory().numBytes)
                        .toBe(memoryBefore.numBytes + 6 * BYTES_PER_COMPLEX_ELEMENT);
                    a.dispose();
                    // All the tensors should now be disposed.
                    expect(tf.memory().numTensors).toBe(memoryBefore.numTensors);
                    // The underlying memory should now be released.
                    expect(tf.memory().numBytes).toBe(memoryBefore.numBytes);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=complex_ops_test.js.map