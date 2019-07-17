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
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
var defaultValue;
jasmine_util_1.describeWithFlags('sparseToDense', jasmine_util_1.ALL_ENVS, function () {
    beforeEach(function () { return defaultValue = tf.scalar(0, 'int32'); });
    it('should work for scalar indices', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.scalar(2, 'int32');
                    values = tf.scalar(100, 'int32');
                    shape = [6];
                    result = tf.sparseToDense(indices, values, shape, defaultValue);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 100, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for vector', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.tensor1d([0, 2, 4], 'int32');
                    values = tf.tensor1d([100, 101, 102], 'int32');
                    shape = [6];
                    result = tf.sparseToDense(indices, values, shape, defaultValue);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, 0, 101, 0, 102, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for scalar value', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.tensor1d([0, 2, 4], 'int32');
                    values = tf.scalar(10, 'int32');
                    shape = [6];
                    result = tf.sparseToDense(indices, values, shape, defaultValue);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 0, 10, 0, 10, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work for matrix', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
                    values = tf.tensor1d([5, 6], 'float32');
                    shape = [2, 2];
                    result = tf.sparseToDense(indices, values, shape, defaultValue.toFloat());
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 5, 0, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw exception if default value does not match dtype', function () {
        var indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
        var values = tf.tensor1d([5, 6], 'float32');
        var shape = [2, 2];
        expect(function () { return tf.sparseToDense(indices, values, shape, tf.scalar(1, 'int32')); })
            .toThrowError();
    });
    it('should allow setting default value', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
                    values = tf.tensor1d([5, 6], 'float32');
                    shape = [2, 2];
                    result = tf.sparseToDense(indices, values, shape, tf.scalar(1));
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 5, 1, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('no default value passed', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.tensor2d([0, 1, 1, 1], [2, 2], 'int32');
                    values = tf.tensor1d([5, 6], 'float32');
                    shape = [2, 2];
                    result = tf.sparseToDense(indices, values, shape);
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual(values.dtype);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 5, 0, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should support TensorLike inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, shape, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = [[0, 1], [1, 1]];
                    values = [5, 6];
                    shape = [2, 2];
                    result = tf.sparseToDense(indices, values, shape, defaultValue.toFloat());
                    expect(result.shape).toEqual(shape);
                    expect(result.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 5, 0, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should work with 0-sized tensors', function () { return __awaiter(_this, void 0, void 0, function () {
        var indices, values, defaultValue, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    indices = tf.zeros([0], 'int32');
                    values = tf.zeros([0]);
                    defaultValue = tf.scalar(5);
                    result = tf.sparseToDense(indices, values, [3], defaultValue);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 5, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when indices are not int32', function () {
        var indices = tf.scalar(2, 'float32');
        var values = tf.scalar(100, 'int32');
        var shape = [6];
        expect(function () { return tf.sparseToDense(indices, values, shape, defaultValue); })
            .toThrow();
    });
    it('should throw error when indices rank > 2', function () {
        var indices = tf.tensor3d([1], [1, 1, 1], 'int32');
        var values = tf.tensor1d([100], 'float32');
        var shape = [6];
        expect(function () { return tf.sparseToDense(indices, values, shape, defaultValue); })
            .toThrow();
    });
    it('should throw error when values has rank > 1', function () {
        var indices = tf.tensor1d([0, 4, 2], 'int32');
        var values = tf.tensor2d([1.0, 2.0, 3.0], [3, 1], 'float32');
        var shape = [6];
        expect(function () { return tf.sparseToDense(indices, values, shape, defaultValue); })
            .toThrow();
    });
    it('should throw error when values has wrong size', function () {
        var indices = tf.tensor1d([0, 4, 2], 'int32');
        var values = tf.tensor1d([1.0, 2.0, 3.0, 4.0], 'float32');
        var shape = [6];
        expect(function () { return tf.sparseToDense(indices, values, shape, defaultValue); })
            .toThrow();
    });
});
//# sourceMappingURL=sparse_to_dense_test.js.map