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
jasmine_util_1.describeWithFlags('separableConv2d', jasmine_util_1.ALL_ENVS, function () {
    it('input=1x3x3x1,f=2,s=1,d=1,p=valid,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096, -0.13408193,
                            0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x1,f=2,s=1,d=1,p=valid,chMul=1,outDepth=2 in tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = x.separableConv2d(depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096,
                            -0.13408193, 0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x1,f=2,s=1,d=1,p=valid,chMul=2,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 2;
                    inDepth = 1;
                    outDepth = 3;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    depthwiseFilter = tf.tensor4d([
                        0.303873, 0.229223, 0.144333, 0.803373, -0.303873, -0.229223,
                        -0.144333, -0.803373
                    ], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2, -0.1, 0.2, 0.15, 0.15], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.00305368, 0.0140969, 0.00980358, -0.10853045, -0.06339455, -0.0699412,
                            0.11010849, 0.0347524, 0.05214475, 0.10307151, 0.02221644, 0.04224815
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x3x3x1,f=2,s=1,d=1,p=valid,chMul=1,outDepth=2,3D input', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor3d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [3, 3, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096,
                            -0.13408193, 0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x4x4x1,f=2,s=2,d=1,p=valid,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = [2, 2];
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335, 0.804231,
                        0.329673, 0.924503, 0.728742, 0.180217, 0.210459, 0.133869, 0.650827,
                        0.047613, 0.554795
                    ], [1, 4, 4, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.04919822, -0.09839644, 0.07275512, -0.14551024, 0.09901544, -0.19803089,
                            0.05555845, -0.11111691
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=2x4x4x1,f=2,s=2,d=1,p=valid,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = [2, 2];
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335,
                        0.804231, 0.329673, 0.924503, 0.728742, 0.180217, 0.210459,
                        0.133869, 0.650827, 0.047613, 0.554795, -0.675707, -0.758567,
                        -0.413529, -0.963967, -0.217291, -0.101335, -0.804231, -0.329673,
                        -0.924503, -0.728742, -0.180217, -0.210459, -0.133869, -0.650827,
                        -0.047613, -0.554795
                    ], [2, 4, 4, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.04919822, -0.09839644, 0.07275512, -0.14551024, 0.09901544, -0.19803089,
                            0.05555845, -0.11111691, -0.04919822, 0.09839644, -0.07275512, 0.14551024,
                            -0.09901544, 0.19803089, -0.05555845, 0.11111691
                        ]]);
                    expect(result.shape).toEqual([2, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x4x4x2,f=2,s=2,d=1,p=valid,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = [2, 2];
                    chMul = 1;
                    inDepth = 2;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335,
                        0.804231, 0.329673, 0.924503, 0.728742, 0.180217, 0.210459,
                        0.133869, 0.650827, 0.047613, 0.554795, -0.675707, -0.758567,
                        -0.413529, -0.963967, -0.217291, -0.101335, -0.804231, -0.329673,
                        -0.924503, -0.728742, -0.180217, -0.210459, -0.133869, -0.650827,
                        -0.047613, -0.554795
                    ], [1, 4, 4, inDepth]);
                    depthwiseFilter = tf.tensor4d([
                        0.303873, 0.229223, 0.144333, 0.803373, 0.98976838, 0.56597068,
                        0.42654137, 0.66445535
                    ], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2, 0.05, -0.05], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.20072255, -0.32641545, 0.08474462, -0.11823604, -0.20072255, 0.32641545,
                            -0.08474462, 0.11823604
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x4x4x1,f=2,s=1,d=2,p=valid,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, dilationRate, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    dilationRate = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335, 0.804231,
                        0.329673, 0.924503, 0.728742, 0.180217, 0.210459, 0.133869, 0.650827,
                        0.047613, 0.554795
                    ], [1, 4, 4, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad, dilationRate);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.05783373, -0.11566745, 0.07257301, -0.14514601, 0.03079498, -0.06158997,
                            0.06460048, -0.12920095
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=1x4x4x1,f=2,s=1,d=1,p=same,chMul=1,outDepth=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var fSize, pad, stride, chMul, inDepth, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    chMul = 1;
                    inDepth = 1;
                    outDepth = 2;
                    x = tf.tensor4d([
                        0.675707, 0.758567, 0.413529, 0.963967, 0.217291, 0.101335, 0.804231,
                        0.329673, 0.924503, 0.728742, 0.180217, 0.210459, 0.133869, 0.650827,
                        0.047613, 0.554795
                    ], [1, 4, 4, inDepth]);
                    depthwiseFilter = tf.tensor4d([0.303873, 0.229223, 0.144333, 0.803373], [fSize, fSize, inDepth, chMul]);
                    pointwiseFilter = tf.tensor4d([0.1, -0.2], [1, 1, inDepth * chMul, outDepth]);
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.04919822, -0.09839644, 0.09860218, -0.19720435, 0.07275512, -0.14551024,
                            0.03405062, -0.06810125, 0.08081452, -0.16162904, 0.04651042, -0.09302084,
                            0.05150411, -0.10300821, 0.01305549, -0.02611098, 0.09901544, -0.19803089,
                            0.03949417, -0.07898834, 0.05555845, -0.11111691, 0.0144028, -0.02880561,
                            0.01898637, -0.03797274, 0.02086828, -0.04173655, 0.01416401, -0.02832802,
                            0.01685872, -0.03371745
                        ]]);
                    expect(result.shape).toEqual([1, 4, 4, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    outDepth = 2;
                    x = [[
                            [[0.230664], [0.987388], [0.0685208]],
                            [[0.419224], [0.887861], [0.731641]],
                            [[0.0741907], [0.409265], [0.351377]]
                        ]];
                    depthwiseFilter = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    pointwiseFilter = [[[[0.1, -0.2]]]];
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096, -0.13408193,
                            0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, outDepth, inDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    outDepth = 2;
                    inDepth = 1;
                    x = tf.tensor4d([
                        0.230664, 0.987388, 0.0685208, 0.419224, 0.887861, 0.731641,
                        0.0741907, 0.409265, 0.351377
                    ], [1, 3, 3, inDepth]);
                    depthwiseFilter = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    pointwiseFilter = [[[[0.1, -0.2]]]];
                    result = x.separableConv2d(depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096, -0.13408193,
                            0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([1, 2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Incorrect input rank raises error', function () {
        // tslint:disable-next-line:no-any
        var x = tf.zeros([4, 4]);
        var depthwiseFilter = tf.zeros([2, 2, 1, 3]);
        var pointwiseFilter = tf.zeros([1, 1, 2, 4]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/rank 4/);
    });
    it('Incorrect depthwise filter rank raises error', function () {
        var x = tf.zeros([1, 4, 4, 1]);
        // tslint:disable-next-line:no-any
        var depthwiseFilter = tf.zeros([2, 2, 1]);
        var pointwiseFilter = tf.zeros([1, 1, 2, 4]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/rank 4/);
    });
    it('Incorrect depthwise filter rank raises error', function () {
        var x = tf.zeros([1, 4, 4, 1]);
        var depthwiseFilter = tf.zeros([2, 2, 1, 3]);
        // tslint:disable-next-line:no-any
        var pointwiseFilter = tf.zeros([1, 1, 2]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/rank 4/);
    });
    it('Incorrect point filter 1st dimension raises error', function () {
        var x = tf.zeros([1, 4, 4, 1]);
        var depthwiseFilter = tf.zeros([2, 2, 1, 3]);
        var pointwiseFilter = tf.zeros([2, 1, 3, 6]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/must be 1, but got 2/);
    });
    it('Incorrect point filter 2nd dimension raises error', function () {
        var x = tf.zeros([1, 4, 4, 1]);
        var depthwiseFilter = tf.zeros([2, 2, 1, 3]);
        var pointwiseFilter = tf.zeros([1, 5, 3, 6]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/must be 1, but got 5/);
    });
    it('Incorrect pointwise filter 3rd dimension raises error', function () {
        var x = tf.zeros([1, 4, 4, 1]);
        var depthwiseFilter = tf.zeros([2, 2, 1, 3]);
        var pointwiseFilter = tf.zeros([1, 1, 4, 6]);
        expect(function () {
            return tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, 1, 'valid');
        })
            .toThrowError(/must be 3, but got 4/);
    });
    it('throws when passed x as a non-tensor', function () {
        var fSize = 2;
        var pad = 'valid';
        var stride = 1;
        var chMul = 1;
        var inDepth = 1;
        var outDepth = 2;
        var depthwiseFilter = tf.zeros([fSize, fSize, inDepth, chMul]);
        var pointwiseFilter = tf.zeros([1, 1, inDepth * chMul, outDepth]);
        var e = /Argument 'x' passed to 'separableConv2d' must be a Tensor/;
        expect(function () { return tf.separableConv2d({}, depthwiseFilter, pointwiseFilter, stride, pad); })
            .toThrowError(e);
    });
    it('throws when passed depthwiseFilter as a non-tensor', function () {
        var pad = 'valid';
        var stride = 1;
        var chMul = 1;
        var inDepth = 1;
        var outDepth = 2;
        var x = tf.zeros([1, 3, 3, inDepth]);
        var pointwiseFilter = tf.zeros([1, 1, inDepth * chMul, outDepth]);
        var e = new RegExp('Argument \'depthwiseFilter\' passed to \'separableConv2d\'' +
            ' must be a Tensor');
        expect(function () { return tf.separableConv2d(x, {}, pointwiseFilter, stride, pad); })
            .toThrowError(e);
    });
    it('throws when passed pointwiseFilter as a non-tensor', function () {
        var fSize = 2;
        var pad = 'valid';
        var stride = 1;
        var chMul = 1;
        var inDepth = 1;
        var x = tf.zeros([1, 3, 3, inDepth]);
        var depthwiseFilter = tf.zeros([fSize, fSize, inDepth, chMul]);
        var e = new RegExp('Argument \'pointwiseFilter\' passed to \'separableConv2d\'' +
            ' must be a Tensor');
        expect(function () { return tf.separableConv2d(x, depthwiseFilter, {}, stride, pad); })
            .toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, outDepth, x, depthwiseFilter, pointwiseFilter, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    outDepth = 2;
                    x = [
                        [[0.230664], [0.987388], [0.0685208]],
                        [[0.419224], [0.887861], [0.731641]],
                        [[0.0741907], [0.409265], [0.351377]]
                    ];
                    depthwiseFilter = [[[[0.303873]], [[0.229223]]], [[[0.144333]], [[0.803373]]]];
                    pointwiseFilter = [[[[0.1, -0.2]]]];
                    result = tf.separableConv2d(x, depthwiseFilter, pointwiseFilter, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.10702161, -0.21404321, 0.10316753, -0.20633507, 0.06704096, -0.13408193,
                            0.07788632, -0.15577264
                        ]]);
                    expect(result.shape).toEqual([2, 2, outDepth]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv2d_separable_test.js.map