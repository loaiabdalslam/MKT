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
function generateCaseInputs(totalSizeTensor, totalSizeFilter) {
    var inp = new Array(totalSizeTensor);
    var filt = new Array(totalSizeFilter);
    for (var i = 0; i < totalSizeTensor; i++) {
        inp[i] = i + 1;
    }
    for (var i = 0; i < totalSizeFilter; i++) {
        filt[i] = i + 1;
    }
    return { input: inp, filter: filt };
}
jasmine_util_1.describeWithFlags('conv2d', jasmine_util_1.ALL_ENVS, function () {
    it('x=[1,4,4,1] f=[1,1,1,3] s=2 d=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 3;
                    fSize = 1;
                    pad = 'same';
                    stride = [2, 2];
                    x = tf.tensor3d([
                        10, 30, 50, 70, 20, 40, 60, 80, -10, -30, -50, -70, -20, -40, -60, -80
                    ], inputShape);
                    w = tf.tensor4d([1, 0.5, 1], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [10, 5, 10, 50, 25, 50, -10, -5, -10, -50, -25, -50]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,1] f=[1,1,1,2] s=1 d=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[3,3,2] f=[2,2,2,1] s=1 d=1 p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, x, w, result, resultData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pad = 'valid';
                    stride = 1;
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90], [3, 3, 2]);
                    w = tf.tensor4d([.1, .2, .3, .4, .5, .6, .7, .8], [2, 2, 2, 1]);
                    result = tf.conv2d(x, w, stride, pad);
                    return [4 /*yield*/, result.data()];
                case 1:
                    resultData = _a.sent();
                    expect(result.shape).toEqual([2, 2, 1]);
                    test_util_1.expectArraysClose(resultData, new Float32Array([25.6, 53.5, 157.0, 220.9]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,2,1] f=[1,1,1,1] s=1 d=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inShape, outputDepth, fSize, pad, stride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inShape = [2, 2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 1;
                    pad = 0;
                    stride = 1;
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], inShape);
                    w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad);
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    expected = [2, 4, 6, 8, 10, 12, 14, 16];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[4,2,1] f=[4,2,1,1] s=1 d=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, pad, stride, dataFormat, dilation, x, w, result, resultData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NHWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [4, 2, inputDepth]);
                    w = tf.tensor4d([3, 1, 5, 0, 2, 7, 8, 9], [4, 2, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
                    return [4 /*yield*/, result.data()];
                case 1:
                    resultData = _a.sent();
                    expect(result.shape).toEqual([4, 2, 1]);
                    test_util_1.expectArraysClose(resultData, [133, 66, 200, 102, 108, 58, 56, 58]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,1] f=[2,2,1,1] s=1 d=1 p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, dataFormat, dilation, x, w, result, resultData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NHWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
                    return [4 /*yield*/, result.data()];
                case 1:
                    resultData = _a.sent();
                    expect(result.shape).toEqual([2, 2, 1]);
                    test_util_1.expectArraysClose(resultData, new Float32Array([20, 26, 13, 12]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[2,2,1] f=[2,2,1,1] s=1 d=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    pad = 0;
                    stride = 1;
                    dataFormat = 'NHWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[4,4,1] f=[2,2,1,1] s=1 d=2 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, fSizeDilated, pad, stride, dataFormat, dilation, noDilation, x, w, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, 4, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    fSizeDilated = 3;
                    pad = 0;
                    stride = 1;
                    dataFormat = 'NHWC';
                    dilation = 2;
                    noDilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], inputShape);
                    w = tf.tensor4d([3, 1, 5, 2], [fSize, fSize, inputDepth, outputDepth]);
                    wDilated = tf.tensor4d([3, 0, 1, 0, 0, 0, 5, 0, 2], [fSizeDilated, fSizeDilated, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad, dataFormat, dilation);
                    expectedResult = tf.conv2d(x, wDilated, stride, pad, dataFormat, noDilation);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(result.shape).toEqual(expectedResult.shape);
                    expect(result.dtype).toBe(expectedResult.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('x=[1,3,6,1] f=[2,2,1,1] s=[1,2] d=1 p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, inputs, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [1, 3, 6, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    pad = 'valid';
                    stride = [1, 2];
                    inputs = generateCaseInputs(1 * 3 * 6 * inputDepth, fSize * fSize);
                    x = tf.tensor4d(inputs.input, inputShape);
                    w = tf.tensor4d(inputs.filter, [fSize, fSize, inputDepth, outputDepth]);
                    result = tf.conv2d(x, w, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [58.0, 78.0, 98.0, 118.0, 138.0, 158.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when x is not rank 3', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when weights is not rank 4', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        // tslint:disable-next-line:no-any
        var w = tf.tensor3d([3, 1, 5, 0], [2, 2, 1]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when x depth does not match weight depth', function () {
        var inputDepth = 1;
        var wrongInputDepth = 5;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.randomNormal([fSize, fSize, wrongInputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad); }).toThrowError();
    });
    it('throws when dimRoundingMode is set and pad is not a number', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 'valid';
        var stride = 1;
        var dataFormat = 'NHWC';
        var dilation = 1;
        var dimRoundingMode = 'round';
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.randomNormal([fSize, fSize, inputDepth, outputDepth]);
        expect(function () {
            return tf.conv2d(x, w, stride, pad, dataFormat, dilation, dimRoundingMode);
        })
            .toThrowError();
    });
    it('throws when both stride and dilation are greater than 1', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = [2, 1];
        var dataFormat = 'NHWC';
        var dilation = [1, 2];
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('gradient with clones input=[3,3,1] f=[2,2,1,1] s=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, filter, x, dy, grads, _a, dx, dfilter, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [3, 3, inputDepth];
                    filterSize = 2;
                    stride = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.ones(filterShape);
                    x = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor3d([3, 1, 2, 0], [2, 2, 1]);
                    grads = tf.grads(function (x, filter) {
                        return x.clone().conv2d(filter.clone(), stride, pad).clone();
                    });
                    _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3, 4, 1, 5, 6, 1, 2, 2, 0]]);
                    expect(dfilter.shape).toEqual(filterShape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilter.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [13, 19, 31, 37]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient x=[2,3,3,1] f=[2,2,1,1] s=1 p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, filter, x, dy, grads, _a, dx, dfilter, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 1;
                    inputShape = [2, 3, 3, inputDepth];
                    filterSize = 2;
                    stride = 1;
                    pad = 0;
                    filterShape = [filterSize, filterSize, inputDepth, outputDepth];
                    filter = tf.ones(filterShape);
                    x = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9], inputShape);
                    dy = tf.tensor4d([3, 1, 2, 0, 3, 1, 2, 0], [2, 2, 2, 1]);
                    grads = tf.grads(function (x, filter) { return x.conv2d(filter, stride, pad); });
                    _a = grads([x, filter], dy), dx = _a[0], dfilter = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(),
                        [3, 4, 1, 5, 6, 1, 2, 2, 0, 3, 4, 1, 5, 6, 1, 2, 2, 0]]);
                    expect(dfilter.shape).toEqual(filterShape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dfilter.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [13 * 2, 19 * 2, 31 * 2, 37 * 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed x as a non-tensor', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 1;
        var pad = 0;
        var stride = 1;
        var w = tf.tensor4d([2], [fSize, fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv2d({}, w, stride, pad); })
            .toThrowError(/Argument 'x' passed to 'conv2d' must be a Tensor/);
    });
    it('throws when passed filter as a non-tensor', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 0;
        var stride = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        expect(function () { return tf.conv2d(x, {}, stride, pad); })
            .toThrowError(/Argument 'filter' passed to 'conv2d' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 0;
                    stride = 1;
                    x = [[[1], [2]], [[3], [4]]];
                    w = [[[[2]]]];
                    result = tf.conv2d(x, w, stride, pad);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv2d_test.js.map