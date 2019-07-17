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
jasmine_util_1.describeWithFlags('batchNorm4D', jasmine_util_1.ALL_ENVS, function () {
    it('simple batchnorm4D, no offset or scale, 2x1x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, varianceEpsilon, result, x, mean, variance, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm4d(xT, meanT, varianceT, undefined, undefined, varianceEpsilon);
                    return [4 /*yield*/, xT.array()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.array()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.array()];
                case 3:
                    variance = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _a.apply(void 0, [_b.sent(), [
                            (x[0][0][0][0] - mean[0]) * 1 / Math.sqrt(variance[0] + varianceEpsilon),
                            (x[0][0][0][1] - mean[1]) * 1 / Math.sqrt(variance[1] + varianceEpsilon),
                            (x[1][0][0][0] - mean[0]) * 1 / Math.sqrt(variance[0] + varianceEpsilon),
                            (x[1][0][0][1] - mean[1]) * 1 / Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm4D, no offset, 2x1x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, scaleT, varianceEpsilon, result, x, mean, variance, scale, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm4d(xT, meanT, varianceT, undefined, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 4:
                    scale = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            (x.get(0, 0, 0, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(0, 0, 0, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon),
                            (x.get(1, 0, 0, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(1, 0, 0, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm4D, no scale, 2x1x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, varianceEpsilon, result, x, mean, variance, offset, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm4d(xT, meanT, varianceT, offsetT, undefined, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, offsetT.buffer()];
                case 4:
                    offset = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            offset.get(0) +
                                (x.get(0, 0, 0, 0) - mean.get(0)) * 1 /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(0, 0, 0, 1) - mean.get(1)) * 1 /
                                    Math.sqrt(variance.get(1) + varianceEpsilon),
                            offset.get(0) +
                                (x.get(1, 0, 0, 0) - mean.get(0)) * 1 /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(1, 0, 0, 1) - mean.get(1)) * 1 /
                                    Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm4D, 2x1x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon, result, x, mean, variance, scale, offset, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([3, 4]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm4d(xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 4:
                    scale = _b.sent();
                    return [4 /*yield*/, offsetT.buffer()];
                case 5:
                    offset = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 6:
                    _a.apply(void 0, [_b.sent(), [
                            offset.get(0) +
                                (x.get(0, 0, 0, 0) - mean.get(0)) * scale.get(0) /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(0, 0, 0, 1) - mean.get(1)) * scale.get(1) /
                                    Math.sqrt(variance.get(1) + varianceEpsilon),
                            offset.get(0) +
                                (x.get(1, 0, 0, 0) - mean.get(0)) * scale.get(0) /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(1, 0, 0, 1) - mean.get(1)) * scale.get(1) /
                                    Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[[[2, 4]]], [[[9, 23]]]];
                    mean = [1, 2];
                    variance = [2, 3];
                    offset = [3, 4];
                    scale = [4, 5];
                    varianceEpsilon = .001;
                    result = tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            offset[0] +
                                (x[0][0][0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][0][0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0][0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][0][0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm4D gradients, 2x1x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, dy, gradX, _a, gradMean, _b, gradVariance, _c, gradOffset, _d, _e, gradScale, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
                    mean = tf.tensor1d([1, 2]);
                    variance = tf.tensor1d([2, 3]);
                    offset = tf.tensor1d([3, 4]);
                    scale = tf.tensor1d([2, 5]);
                    varianceEpsilon = .001;
                    dy = tf.tensor4d([-1, -1, -1, -1], [2, 1, 1, 2]);
                    gradX = tf.grad(function (x) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _a.apply(void 0, [_g.sent(), [-1.414, -2.887, -1.414, -2.887]]);
                    expect(gradX.shape).toEqual([2, 1, 1, 2]);
                    gradMean = tf.grad(function (mean) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(mean, dy);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _b.apply(void 0, [_g.sent(), [2.828, 5.773]]);
                    expect(gradMean.shape).toEqual([2]);
                    gradVariance = tf.grad(function (variance) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(variance, dy);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _c.apply(void 0, [_g.sent(), [3.180, 11.060]]);
                    expect(gradVariance.shape).toEqual([2]);
                    gradOffset = tf.grad(function (offset) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(offset, dy);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _e = [_g.sent()];
                    return [4 /*yield*/, dy.sum([0, 1, 2]).data()];
                case 5:
                    _d.apply(void 0, _e.concat([_g.sent()]));
                    expect(gradOffset.shape).toEqual([2]);
                    gradScale = tf.grad(function (scale) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(scale, dy);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 6:
                    _f.apply(void 0, [_g.sent(), [-6.362, -13.277]]);
                    expect(gradScale.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batchnorm4D gradients, same shapes in x, mean and variance', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, scale, offset, varianceEpsilon, dy, gradX, _a, gradMean, _b, gradVariance, _c, gradOffset, _d, _e, gradScale, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    x = tf.tensor4d([10, 20, 30, 40], [2, 1, 1, 2]);
                    mean = tf.tensor4d([0, 5, 10, 15], [2, 1, 1, 2]);
                    variance = tf.tensor4d([2, 4, 6, 8], [2, 1, 1, 2]);
                    scale = tf.tensor4d([2, 5, 2, 5], [2, 1, 1, 2]);
                    offset = tf.tensor4d([0, 0, 0, 0], [2, 1, 1, 2]);
                    varianceEpsilon = .001;
                    dy = tf.tensor4d([-1, -1, -1, -1], [2, 1, 1, 2]);
                    gradX = tf.grad(function (x) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _a.apply(void 0, [_g.sent(), [-1.414, -2.500, -0.816, -1.768]]);
                    expect(gradX.shape).toEqual([2, 1, 1, 2]);
                    gradMean = tf.grad(function (mean) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(mean, dy);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _b.apply(void 0, [_g.sent(), [1.414, 2.500, 0.816, 1.768]]);
                    expect(gradMean.shape).toEqual([2, 1, 1, 2]);
                    gradVariance = tf.grad(function (variance) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(variance, dy);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _c.apply(void 0, [_g.sent(), [3.533, 4.686, 1.360, 2.762]]);
                    expect(gradVariance.shape).toEqual([2, 1, 1, 2]);
                    gradOffset = tf.grad(function (offset) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(offset, dy);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _e = [_g.sent()];
                    return [4 /*yield*/, dy.data()];
                case 5:
                    _d.apply(void 0, _e.concat([_g.sent()]));
                    expect(gradOffset.shape).toEqual([2, 1, 1, 2]);
                    gradScale = tf.grad(function (scale) { return tf.batchNorm4d(x, mean, variance, offset, scale, varianceEpsilon); })(scale, dy);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 6:
                    _f.apply(void 0, [_g.sent(), [-7.069, -7.499, -8.164, -8.838]]);
                    expect(gradScale.shape).toEqual([2, 1, 1, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('batchNorm3D', jasmine_util_1.ALL_ENVS, function () {
    it('simple batchnorm3D, no offset or scale, 2x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, varianceEpsilon, result, x, mean, variance, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([2, 4, 9, 23], [2, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(xT, meanT, varianceT, undefined, undefined, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _a.apply(void 0, [_b.sent(), [
                            (x.get(0, 0, 0) - mean.get(0)) * 1 /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(0, 0, 1) - mean.get(1)) * 1 /
                                Math.sqrt(variance.get(1) + varianceEpsilon),
                            (x.get(1, 0, 0) - mean.get(0)) * 1 /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(1, 0, 1) - mean.get(1)) * 1 /
                                Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm3D, no offset, 2x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, scaleT, varianceEpsilon, result, x, mean, variance, scale, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([2, 4, 9, 23], [2, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(xT, meanT, varianceT, undefined, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 4:
                    scale = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            (x.get(0, 0, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(0, 0, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon),
                            (x.get(1, 0, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(1, 0, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm3D, no scale, 2x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, varianceEpsilon, result, x, mean, variance, offset, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([2, 4, 9, 23], [2, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(xT, meanT, varianceT, offsetT, undefined, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, offsetT.buffer()];
                case 4:
                    offset = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            offset.get(0) +
                                (x.get(0, 0, 0) - mean.get(0)) * 1 /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(0, 0, 1) - mean.get(1)) * 1 /
                                    Math.sqrt(variance.get(1) + varianceEpsilon),
                            offset.get(0) +
                                (x.get(1, 0, 0) - mean.get(0)) * 1 /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(1, 0, 1) - mean.get(1)) * 1 /
                                    Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm3D, 2x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon, result, x, mean, variance, offset, scale, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor3d([2, 4, 9, 23], [2, 1, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([3, 4]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, offsetT.buffer()];
                case 4:
                    offset = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 5:
                    scale = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 6:
                    _a.apply(void 0, [_b.sent(), [
                            offset.get(0) +
                                (x.get(0, 0, 0) - mean.get(0)) * scale.get(0) /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(0, 0, 1) - mean.get(1)) * scale.get(1) /
                                    Math.sqrt(variance.get(1) + varianceEpsilon),
                            offset.get(0) +
                                (x.get(1, 0, 0) - mean.get(0)) * scale.get(0) /
                                    Math.sqrt(variance.get(0) + varianceEpsilon),
                            offset.get(1) +
                                (x.get(1, 0, 1) - mean.get(1)) * scale.get(1) /
                                    Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[[2, 4]], [[9, 23]]];
                    mean = [1, 2];
                    variance = [2, 3];
                    offset = [3, 4];
                    scale = [4, 5];
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            offset[0] +
                                (x[0][0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batchnorm3D, x,mean,var,offset,scale are all 3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var shape, xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon, result, x, mean, variance, offset, scale, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    shape = [2, 1, 2];
                    xT = tf.tensor3d([2, 4, 9, 23], shape);
                    meanT = tf.tensor3d([1, 2, 3, 4], shape);
                    varianceT = tf.tensor3d([2, 3, 4, 5], shape);
                    offsetT = tf.tensor3d([3, 4, 5, 6], shape);
                    scaleT = tf.tensor3d([4, 5, 6, 7], shape);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, offsetT.buffer()];
                case 4:
                    offset = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 5:
                    scale = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 6:
                    _a.apply(void 0, [_b.sent(), [
                            offset.get(0, 0, 0) +
                                (x.get(0, 0, 0) - mean.get(0, 0, 0)) * scale.get(0, 0, 0) /
                                    Math.sqrt(variance.get(0, 0, 0) + varianceEpsilon),
                            offset.get(0, 0, 1) +
                                (x.get(0, 0, 1) - mean.get(0, 0, 1)) * scale.get(0, 0, 1) /
                                    Math.sqrt(variance.get(0, 0, 1) + varianceEpsilon),
                            offset.get(1, 0, 0) +
                                (x.get(1, 0, 0) - mean.get(1, 0, 0)) * scale.get(1, 0, 0) /
                                    Math.sqrt(variance.get(1, 0, 0) + varianceEpsilon),
                            offset.get(1, 0, 1) +
                                (x.get(1, 0, 1) - mean.get(1, 0, 1)) * scale.get(1, 0, 1) /
                                    Math.sqrt(variance.get(1, 0, 1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm3D gradients, 2x1x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, dy, gradX, _a, gradMean, _b, gradVariance, _c, gradOffset, _d, gradScale, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    x = tf.tensor3d([2, 4, 9, 23], [2, 1, 2]);
                    mean = tf.tensor1d([1, 2]);
                    variance = tf.tensor1d([2, 3]);
                    offset = tf.tensor1d([3, 4]);
                    scale = tf.tensor1d([2, 5]);
                    varianceEpsilon = .001;
                    dy = tf.tensor3d([1, 1, 1, 1], [2, 1, 2]);
                    gradX = tf.grad(function (x) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [1.414, 2.887, 1.414, 2.887]]);
                    expect(gradX.shape).toEqual([2, 1, 2]);
                    gradMean = tf.grad(function (mean) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(mean, dy);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [-2.828, -5.773]]);
                    expect(gradMean.shape).toEqual([2]);
                    gradVariance = tf.grad(function (variance) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(variance, dy);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [-3.180, -11.060]]);
                    expect(gradVariance.shape).toEqual([2]);
                    gradOffset = tf.grad(function (offset) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(offset, dy);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [2, 2]]);
                    expect(gradOffset.shape).toEqual([2]);
                    gradScale = tf.grad(function (scale) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(scale, dy);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [6.362, 13.277]]);
                    expect(gradScale.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batchnorm3D gradients, same shapes in x, mean and variance', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, scale, offset, varianceEpsilon, dy, gradX, _a, gradMean, _b, gradVariance, _c, gradOffset, _d, gradScale, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    x = tf.tensor3d([10, 20, 30, 40], [2, 1, 2]);
                    mean = tf.tensor3d([0, 5, 10, 15], [2, 1, 2]);
                    variance = tf.tensor3d([2, 4, 6, 8], [2, 1, 2]);
                    scale = tf.tensor3d([2, 5, 2, 5], [2, 1, 2]);
                    offset = tf.tensor3d([0, 0, 0, 0], [2, 1, 2]);
                    varianceEpsilon = .001;
                    dy = tf.tensor3d([1, 1, 1, 1], [2, 1, 2]);
                    gradX = tf.grad(function (x) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [1.414, 2.500, 0.816, 1.768]]);
                    expect(gradX.shape).toEqual([2, 1, 2]);
                    gradMean = tf.grad(function (mean) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(mean, dy);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [-1.414, -2.500, -0.816, -1.768]]);
                    expect(gradMean.shape).toEqual([2, 1, 2]);
                    gradVariance = tf.grad(function (variance) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(variance, dy);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [-3.533, -4.686, -1.360, -2.762]]);
                    expect(gradVariance.shape).toEqual([2, 1, 2]);
                    gradOffset = tf.grad(function (offset) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(offset, dy);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [1, 1, 1, 1]]);
                    expect(gradOffset.shape).toEqual([2, 1, 2]);
                    gradScale = tf.grad(function (scale) { return tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon); })(scale, dy);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [7.069, 7.499, 8.164, 8.838]]);
                    expect(gradScale.shape).toEqual([2, 1, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batchnorm matches tensorflow, 2x3x3', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([
                        0.49955603, 0.04158615, -1.09440524, 2.03854165, -0.61578344,
                        2.87533573, 1.18105987, 0.807462, 1.87888837, 2.26563962, -0.37040935,
                        1.35848753, -0.75347094, 0.15683117, 0.91925946, 0.34121279,
                        0.92717143, 1.89683965
                    ], [2, 3, 3]);
                    mean = tf.tensor1d([0.39745062, -0.48062894, 0.4847822]);
                    variance = tf.tensor1d([0.32375343, 0.67117643, 1.08334653]);
                    offset = tf.tensor1d([0.69398749, -1.29056387, 0.9429723]);
                    scale = tf.tensor1d([-0.5607271, 0.9878457, 0.25181573]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm3d(x, mean, variance, offset, scale, varianceEpsilon);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.59352049, -0.66135202, 0.5610874, -0.92077015, -1.45341019, 1.52106473,
                            -0.07704776, 0.26144429, 1.28010017, -1.14422404, -1.15776136, 1.15425493,
                            1.82644104, -0.52249442, 1.04803919, 0.74932291, 0.40568101, 1.2844412
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('batchNorm2D', jasmine_util_1.ALL_ENVS, function () {
    it('simple batchnorm2D, no offset or scale, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, varianceEpsilon, result, x, mean, variance, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(xT, meanT, varianceT, undefined, undefined, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 4:
                    _a.apply(void 0, [_b.sent(), [
                            (x.get(0, 0) - mean.get(0)) * 1 /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(0, 1) - mean.get(1)) * 1 /
                                Math.sqrt(variance.get(1) + varianceEpsilon),
                            (x.get(1, 0) - mean.get(0)) * 1 /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(1, 1) - mean.get(1)) * 1 /
                                Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm2D, no offset, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, scaleT, varianceEpsilon, result, x, mean, variance, scale, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(xT, meanT, varianceT, undefined, scaleT, varianceEpsilon);
                    return [4 /*yield*/, xT.buffer()];
                case 1:
                    x = _b.sent();
                    return [4 /*yield*/, meanT.buffer()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.buffer()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, scaleT.buffer()];
                case 4:
                    scale = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            (x.get(0, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(0, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon),
                            (x.get(1, 0) - mean.get(0)) * scale.get(0) /
                                Math.sqrt(variance.get(0) + varianceEpsilon),
                            (x.get(1, 1) - mean.get(1)) * scale.get(1) /
                                Math.sqrt(variance.get(1) + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm2D, no scale, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, varianceEpsilon, result, offset, mean, variance, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(xT, meanT, varianceT, offsetT, undefined, varianceEpsilon);
                    return [4 /*yield*/, offsetT.array()];
                case 1:
                    offset = _b.sent();
                    return [4 /*yield*/, meanT.array()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.array()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, xT.array()];
                case 4:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 5:
                    _a.apply(void 0, [_b.sent(), [
                            offset[0] +
                                (x[0][0] - mean[0]) * 1 / Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][1] - mean[1]) * 1 / Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0] - mean[0]) * 1 / Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][1] - mean[1]) * 1 / Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm2D, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon, result, offset, mean, variance, scale, x, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    xT = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([3, 4]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon);
                    return [4 /*yield*/, offsetT.array()];
                case 1:
                    offset = _b.sent();
                    return [4 /*yield*/, meanT.array()];
                case 2:
                    mean = _b.sent();
                    return [4 /*yield*/, varianceT.array()];
                case 3:
                    variance = _b.sent();
                    return [4 /*yield*/, scaleT.array()];
                case 4:
                    scale = _b.sent();
                    return [4 /*yield*/, xT.array()];
                case 5:
                    x = _b.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 6:
                    _a.apply(void 0, [_b.sent(), [
                            offset[0] +
                                (x[0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple batchnorm2D gradients, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, dy, _a, gradX, gradMean, gradVariance, gradOffset, gradScale, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    x = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    mean = tf.tensor1d([1, 2]);
                    variance = tf.tensor1d([2, 3]);
                    offset = tf.tensor1d([3, 4]);
                    scale = tf.tensor1d([2, 5]);
                    varianceEpsilon = .001;
                    dy = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    _a = tf.grads(function (x, mean, variance, offset, scale) {
                        return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon);
                    })([x, mean, variance, offset, scale], dy), gradX = _a[0], gradMean = _a[1], gradVariance = _a[2], gradOffset = _a[3], gradScale = _a[4];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _b.apply(void 0, [_g.sent(), [1.414, 2.887, 1.414, 2.887]]);
                    expect(gradX.shape).toEqual([2, 2]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _c.apply(void 0, [_g.sent(), [-2.828, -5.773]]);
                    expect(gradMean.shape).toEqual([2]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _d.apply(void 0, [_g.sent(), [-3.180, -11.060]]);
                    expect(gradVariance.shape).toEqual([2]);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _e.apply(void 0, [_g.sent(), [2, 2]]);
                    expect(gradOffset.shape).toEqual([2]);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 5:
                    _f.apply(void 0, [_g.sent(), [6.362, 13.277]]);
                    expect(gradScale.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones batchnorm2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, dy, _a, gradX, gradMean, gradVariance, gradOffset, gradScale, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    x = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    mean = tf.tensor1d([1, 2]);
                    variance = tf.tensor1d([2, 3]);
                    offset = tf.tensor1d([3, 4]);
                    scale = tf.tensor1d([2, 5]);
                    varianceEpsilon = .001;
                    dy = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    _a = tf.grads(function (x, mean, variance, offset, scale) {
                        return tf.batchNorm2d(x.clone(), mean.clone(), variance.clone(), offset.clone(), scale.clone(), varianceEpsilon)
                            .clone();
                    })([x, mean, variance, offset, scale], dy), gradX = _a[0], gradMean = _a[1], gradVariance = _a[2], gradOffset = _a[3], gradScale = _a[4];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _b.apply(void 0, [_g.sent(), [1.414, 2.887, 1.414, 2.887]]);
                    expect(gradX.shape).toEqual([2, 2]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _c.apply(void 0, [_g.sent(), [-2.828, -5.773]]);
                    expect(gradMean.shape).toEqual([2]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _d.apply(void 0, [_g.sent(), [-3.180, -11.060]]);
                    expect(gradVariance.shape).toEqual([2]);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _e.apply(void 0, [_g.sent(), [2, 2]]);
                    expect(gradOffset.shape).toEqual([2]);
                    _f = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 5:
                    _f.apply(void 0, [_g.sent(), [6.362, 13.277]]);
                    expect(gradScale.shape).toEqual([2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batchnorm2D gradients, same shapes in x, mean and variance', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, scale, offset, varianceEpsilon, dy, gradX, _a, gradMean, _b, gradVariance, _c, gradOffset, _d, gradScale, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    x = tf.tensor2d([10, 20, 30, 40], [2, 2]);
                    mean = tf.tensor2d([0, 5, 10, 15], [2, 2]);
                    variance = tf.tensor2d([2, 4, 6, 8], [2, 2]);
                    scale = tf.tensor2d([2, 5, 2, 5], [2, 2]);
                    offset = tf.tensor2d([0, 0, 0, 0], [2, 2]);
                    varianceEpsilon = .001;
                    dy = tf.tensor2d([1, 1, 1, 1], [2, 2]);
                    gradX = tf.grad(function (x) { return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradX.data()];
                case 1:
                    _a.apply(void 0, [_f.sent(), [1.414, 2.500, 0.816, 1.768]]);
                    expect(gradX.shape).toEqual([2, 2]);
                    gradMean = tf.grad(function (mean) { return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon); })(mean, dy);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradMean.data()];
                case 2:
                    _b.apply(void 0, [_f.sent(), [-1.414, -2.500, -0.816, -1.768]]);
                    expect(gradMean.shape).toEqual([2, 2]);
                    gradVariance = tf.grad(function (variance) { return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon); })(variance, dy);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradVariance.data()];
                case 3:
                    _c.apply(void 0, [_f.sent(), [-3.533, -4.686, -1.360, -2.762]]);
                    expect(gradVariance.shape).toEqual([2, 2]);
                    gradOffset = tf.grad(function (offset) { return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon); })(offset, dy);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradOffset.data()];
                case 4:
                    _d.apply(void 0, [_f.sent(), [1, 1, 1, 1]]);
                    expect(gradOffset.shape).toEqual([2, 2]);
                    gradScale = tf.grad(function (scale) { return tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon); })(scale, dy);
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradScale.data()];
                case 5:
                    _e.apply(void 0, [_f.sent(), [7.069, 7.499, 8.164, 8.838]]);
                    expect(gradScale.shape).toEqual([2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () {
        var x = tf.zeros([2, 2]);
        var mean = tf.zeros([2, 2]);
        var variance = tf.zeros([2, 2]);
        var scale = tf.zeros([2, 2]);
        var offset = tf.zeros([2, 2]);
        var varianceEpsilon = .001;
        var gradF = tf.grads(function (x, mean, variance, offset, scale) {
            return tf.batchNorm2d(x.clone(), mean.clone(), variance.clone(), offset.clone(), scale.clone(), varianceEpsilon)
                .clone();
        });
        var _a = gradF([x, mean, variance, offset, scale]), gradX = _a[0], gradMean = _a[1], gradVariance = _a[2], gradOffset = _a[3], gradScale = _a[4];
        expect(gradX.shape).toEqual(x.shape);
        expect(gradMean.shape).toEqual(mean.shape);
        expect(gradVariance.shape).toEqual(variance.shape);
        expect(gradOffset.shape).toEqual(offset.shape);
        expect(gradScale.shape).toEqual(scale.shape);
    });
    it('batchnorm2D matches tensorflow, 3x3', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([
                        0.3136892, 0.92389025, 0.594782, 0.05021042, 0.67545404, 0.93910035,
                        0.13277993, 0.96474269, 0.88608916
                    ], [3, 3]);
                    mean = tf.tensor1d([0.19526312, 0.74857256, 0.45166398]);
                    variance = tf.tensor1d([0.22963001, 0.61521992, 0.46623685]);
                    offset = tf.tensor1d([0.43098484, 0.77712237, 0.47916298]);
                    scale = tf.tensor1d([0.62186907, 0.85673736, 0.19201061]);
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.58433646, 0.96846228, 0.51936529, 0.24315402, 0.69732157, 0.61608542,
                            0.35007446, 1.01304821, 0.60119441
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed x as a non-tensor', function () {
        var mean = tf.tensor1d([1, 2]);
        var variance = tf.tensor1d([2, 3]);
        expect(function () { return tf.batchNorm({}, mean, variance); })
            .toThrowError(/Argument 'x' passed to 'batchNorm' must be a Tensor/);
    });
    it('throws when passed mean as a non-tensor', function () {
        var x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
        var variance = tf.tensor1d([2, 3]);
        expect(function () { return tf.batchNorm(x, {}, variance); })
            .toThrowError(/Argument 'mean' passed to 'batchNorm' must be a Tensor/);
    });
    it('throws when passed variance as a non-tensor', function () {
        var x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
        var mean = tf.tensor1d([1, 2]);
        var e = /Argument 'variance' passed to 'batchNorm' must be a Tensor/;
        expect(function () { return tf.batchNorm(x, mean, {}); }).toThrowError(e);
    });
    it('throws when passed scale as a non-tensor', function () {
        var x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
        var mean = tf.tensor1d([1, 2]);
        var variance = tf.tensor1d([2, 3]);
        var epsilon = .001;
        expect(function () { return tf.batchNorm(x, mean, variance, epsilon, {}); })
            .toThrowError(/Argument 'scale' passed to 'batchNorm' must be a Tensor/);
    });
    it('throws when passed offset as a non-tensor', function () {
        var x = tf.tensor4d([2, 4, 9, 23], [2, 1, 1, 2]);
        var mean = tf.tensor1d([1, 2]);
        var variance = tf.tensor1d([2, 3]);
        var epsilon = .001;
        var scale = tf.tensor1d([0.62186907, 0.85673736, 0.19201061]);
        var e = /Argument 'offset' passed to 'batchNorm' must be a Tensor/;
        expect(function () { return tf.batchNorm(x, mean, variance, {}, scale, epsilon); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, mean, variance, offset, scale, varianceEpsilon, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[2, 4], [9, 23]];
                    mean = [1, 2];
                    variance = [2, 3];
                    offset = [3, 4];
                    scale = [4, 5];
                    varianceEpsilon = .001;
                    result = tf.batchNorm2d(x, mean, variance, offset, scale, varianceEpsilon);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            offset[0] +
                                (x[0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error when x is a string tensor', function () {
        var mean = [1, 2];
        var variance = [2, 3];
        var offset = [3, 4];
        var scale = [4, 5];
        var varianceEpsilon = .001;
        var f = function () { return tf.batchNorm2d([['a', 'b'], ['c', 'd']], mean, variance, offset, scale, varianceEpsilon); };
        expect(f).toThrowError(/Argument 'x' passed to 'batchNorm' must be numeric/);
    });
    it('throws error when mean is a string tensor', function () {
        var x = [[2, 4], [9, 23]];
        var variance = [2, 3];
        var offset = [3, 4];
        var scale = [4, 5];
        var varianceEpsilon = .001;
        var f = function () {
            return tf.batchNorm2d(x, ['a', 'b'], variance, offset, scale, varianceEpsilon);
        };
        expect(f).toThrowError(/Argument 'mean' passed to 'batchNorm' must be numeric/);
    });
    it('throws error when variance is a string tensor', function () {
        var x = [[2, 4], [9, 23]];
        var mean = [1, 2];
        var offset = [3, 4];
        var scale = [4, 5];
        var varianceEpsilon = .001;
        var f = function () {
            return tf.batchNorm2d(x, mean, ['a', 'b'], offset, scale, varianceEpsilon);
        };
        expect(f).toThrowError(/'variance' passed to 'batchNorm' must be numeric/);
    });
    it('throws error when scale is a string tensor', function () {
        var x = [[2, 4], [9, 23]];
        var mean = [1, 2];
        var variance = [2, 3];
        var offset = [3, 4];
        var varianceEpsilon = .001;
        var f = function () {
            return tf.batchNorm2d(x, mean, variance, offset, ['a', 'b'], varianceEpsilon);
        };
        expect(f).toThrowError(/'scale' passed to 'batchNorm' must be numeric/);
    });
    it('throws error when offset is a string tensor', function () {
        var x = [[2, 4], [9, 23]];
        var mean = [1, 2];
        var variance = [2, 3];
        var scale = [4, 5];
        var varianceEpsilon = .001;
        var f = function () {
            return tf.batchNorm2d(x, mean, variance, ['a', 'b'], scale, varianceEpsilon);
        };
        expect(f).toThrowError(/'offset' passed to 'batchNorm' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('deprecated batchNormalization', jasmine_util_1.ALL_ENVS, function () {
    it('simple batchnorm2D, 2x2', function () { return __awaiter(_this, void 0, void 0, function () {
        var xT, meanT, varianceT, offsetT, scaleT, varianceEpsilon, result, offset, mean, variance, scale, x, _a, result2, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    xT = tf.tensor2d([2, 4, 9, 23], [2, 2]);
                    meanT = tf.tensor1d([1, 2]);
                    varianceT = tf.tensor1d([2, 3]);
                    offsetT = tf.tensor1d([3, 4]);
                    scaleT = tf.tensor1d([4, 5]);
                    varianceEpsilon = .001;
                    result = tf.batchNormalization(xT, meanT, varianceT, varianceEpsilon, scaleT, offsetT);
                    return [4 /*yield*/, offsetT.array()];
                case 1:
                    offset = _d.sent();
                    return [4 /*yield*/, meanT.array()];
                case 2:
                    mean = _d.sent();
                    return [4 /*yield*/, varianceT.array()];
                case 3:
                    variance = _d.sent();
                    return [4 /*yield*/, scaleT.array()];
                case 4:
                    scale = _d.sent();
                    return [4 /*yield*/, xT.array()];
                case 5:
                    x = _d.sent();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 6:
                    _a.apply(void 0, [_d.sent(), [
                            offset[0] +
                                (x[0][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[0][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon),
                            offset[0] +
                                (x[1][0] - mean[0]) * scale[0] /
                                    Math.sqrt(variance[0] + varianceEpsilon),
                            offset[1] +
                                (x[1][1] - mean[1]) * scale[1] /
                                    Math.sqrt(variance[1] + varianceEpsilon)
                        ]]);
                    result2 = tf.batchNormalization2d(xT, meanT, varianceT, varianceEpsilon, scaleT, offsetT);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 7:
                    _c = [_d.sent()];
                    return [4 /*yield*/, result2.data()];
                case 8:
                    _b.apply(void 0, _c.concat([_d.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=batchnorm_test.js.map