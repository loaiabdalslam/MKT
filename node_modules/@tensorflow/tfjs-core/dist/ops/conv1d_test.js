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
jasmine_util_1.describeWithFlags('conv1d', jasmine_util_1.ALL_ENVS, function () {
    it('conv1d input=2x2x1,d2=1,f=1,s=1,d=1,p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 1;
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor3d([3], [fSize, inputDepth, outputDepth]);
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 6, 9, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('conv1d input=4x1,d2=1,f=2x1x1,s=1,d=1,p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    pad = 'valid';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = tf.tensor2d([1, 2, 3, 4], inputShape);
                    w = tf.tensor3d([2, 1], [fSize, inputDepth, outputDepth]);
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expect(result.shape).toEqual([3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 7, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('conv1d input=4x1,d2=1,f=2x1x1,s=1,d=2,p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, fSizeDilated, pad, stride, dataFormat, dilation, dilationWEffective, x, w, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [4, inputDepth];
                    outputDepth = 1;
                    fSize = 2;
                    fSizeDilated = 3;
                    pad = 'valid';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 2;
                    dilationWEffective = 1;
                    x = tf.tensor2d([1, 2, 3, 4], inputShape);
                    w = tf.tensor3d([2, 1], [fSize, inputDepth, outputDepth]);
                    wDilated = tf.tensor3d([2, 0, 1], [fSizeDilated, inputDepth, outputDepth]);
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expectedResult = tf.conv1d(x, wDilated, stride, pad, dataFormat, dilationWEffective);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('conv1d input=14x1,d2=1,f=3x1x1,s=1,d=3,p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, fSizeDilated, pad, stride, dataFormat, dilation, dilationWEffective, x, w, wDilated, result, expectedResult, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [14, inputDepth];
                    outputDepth = 1;
                    fSize = 3;
                    fSizeDilated = 7;
                    pad = 'valid';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 3;
                    dilationWEffective = 1;
                    x = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], inputShape);
                    w = tf.tensor3d([3, 2, 1], [fSize, inputDepth, outputDepth]);
                    wDilated = tf.tensor3d([3, 0, 0, 2, 0, 0, 1], [fSizeDilated, inputDepth, outputDepth]);
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expectedResult = tf.conv1d(x, wDilated, stride, pad, dataFormat, dilationWEffective);
                    expect(result.shape).toEqual(expectedResult.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expectedResult.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = [[[1], [2]], [[3], [4]]];
                    w = [[[3]]];
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 6, 9, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = [[[3]]];
                    result = x.conv1d(w, stride, pad, dataFormat, dilation);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 6, 9, 12]]);
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
        var dataFormat = 'NWC';
        var dilation = 1;
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var w = tf.tensor3d([3, 1], [fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv1d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('throws when weights is not rank 3', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        // tslint:disable-next-line:no-any
        var w = tf.tensor4d([3, 1, 5, 0], [2, 2, 1, 1]);
        expect(function () { return tf.conv1d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('throws when x depth does not match weight depth', function () {
        var inputDepth = 1;
        var wrongInputDepth = 5;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 2;
        var pad = 0;
        var stride = 1;
        var dataFormat = 'NWC';
        var dilation = 1;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.randomNormal([fSize, wrongInputDepth, outputDepth]);
        expect(function () { return tf.conv1d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('throws when both stride and dilation are greater than 1', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var outputDepth = 1;
        var fSize = 1;
        var pad = 'same';
        var stride = 2;
        var dataFormat = 'NWC';
        var dilation = 2;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        var w = tf.tensor3d([3], [fSize, inputDepth, outputDepth]);
        expect(function () { return tf.conv1d(x, w, stride, pad, dataFormat, dilation); })
            .toThrowError();
    });
    it('throws when passed x as a non-tensor', function () {
        var inputDepth = 1;
        var outputDepth = 1;
        var fSize = 1;
        var pad = 'same';
        var stride = 2;
        var dataFormat = 'NWC';
        var dilation = 2;
        var w = tf.tensor3d([3], [fSize, inputDepth, outputDepth]);
        expect(function () {
            return tf.conv1d({}, w, stride, pad, dataFormat, dilation);
        })
            .toThrowError(/Argument 'x' passed to 'conv1d' must be a Tensor/);
    });
    it('throws when passed filter as a non-tensor', function () {
        var inputDepth = 1;
        var inputShape = [2, 2, inputDepth];
        var pad = 'same';
        var stride = 2;
        var dataFormat = 'NWC';
        var dilation = 2;
        var x = tf.tensor3d([1, 2, 3, 4], inputShape);
        expect(function () {
            return tf.conv1d(x, {}, stride, pad, dataFormat, dilation);
        })
            .toThrowError(/Argument 'filter' passed to 'conv1d' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var pad, stride, dataFormat, dilation, x, w, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = [[[1], [2]], [[3], [4]]];
                    w = [[[3]]];
                    result = tf.conv1d(x, w, stride, pad, dataFormat, dilation);
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 6, 9, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones, input=2x2x1,d2=1,f=1,s=1,d=1,p=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, filterShape, pad, stride, dataFormat, dilation, x, w, dy, grads, _a, dx, dw, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [2, 2, inputDepth];
                    outputDepth = 1;
                    fSize = 1;
                    filterShape = [fSize, inputDepth, outputDepth];
                    pad = 'same';
                    stride = 1;
                    dataFormat = 'NWC';
                    dilation = 1;
                    x = tf.tensor3d([1, 2, 3, 4], inputShape);
                    w = tf.tensor3d([3], filterShape);
                    dy = tf.tensor3d([3, 2, 1, 0], inputShape);
                    grads = tf.grads(function (x, w) {
                        return tf.conv1d(x.clone(), w.clone(), stride, pad, dataFormat, dilation)
                            .clone();
                    });
                    _a = grads([x, w], dy), dx = _a[0], dw = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [9, 6, 3, 0]]);
                    expect(dw.shape).toEqual(w.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dw.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('conv1d gradients input=14x1,d2=1,f=3x1x1,s=1,p=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, inputShape, outputDepth, fSize, pad, stride, dataFormat, x, w, dy, grads, _a, dx, dw, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    inputShape = [14, inputDepth];
                    outputDepth = 1;
                    fSize = 3;
                    pad = 'valid';
                    stride = 1;
                    dataFormat = 'NWC';
                    x = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], inputShape);
                    w = tf.tensor3d([3, 2, 1], [fSize, inputDepth, outputDepth]);
                    dy = tf.tensor2d([3, 2, 1, 0, 3, 2, 1, 0, 3, 2, 1, 0], [12, inputDepth]);
                    grads = tf.grads(function (x, w) {
                        return tf.conv1d(x, w, stride, pad, dataFormat);
                    });
                    _a = grads([x, w], dy), dx = _a[0], dw = _a[1];
                    expect(dx.shape).toEqual(x.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [9, 12, 10, 4, 10, 12, 10, 4, 10, 12, 10, 4, 1, 0]]);
                    expect(dw.shape).toEqual(w.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dw.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [102, 120, 138]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv1d_test.js.map