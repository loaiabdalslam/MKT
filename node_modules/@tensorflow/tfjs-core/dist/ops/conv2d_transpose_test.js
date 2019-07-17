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
jasmine_util_1.describeWithFlags('conv2dTranspose', jasmine_util_1.ALL_ENVS, function () {
    it('input=2x2x1,d2=1,f=2,s=1,p=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var origInputDepth, origOutputDepth, inputShape, fSize, origPad, origStride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origInputDepth = 1;
                    origOutputDepth = 1;
                    inputShape = [1, 1, origOutputDepth];
                    fSize = 2;
                    origPad = 0;
                    origStride = 1;
                    x = tf.tensor3d([2], inputShape);
                    w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, origInputDepth, origOutputDepth]);
                    result = tf.conv2dTranspose(x, w, [2, 2, 1], origStride, origPad);
                    expected = [6, 2, 10, 0];
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('input=2x2x1,d2=1,f=2,s=1,p=0, batch=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var origInputDepth, origOutputDepth, inputShape, fSize, origPad, origStride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origInputDepth = 1;
                    origOutputDepth = 1;
                    inputShape = [2, 1, 1, origOutputDepth];
                    fSize = 2;
                    origPad = 0;
                    origStride = 1;
                    x = tf.tensor4d([2, 3], inputShape);
                    w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, origInputDepth, origOutputDepth]);
                    result = tf.conv2dTranspose(x, w, [2, 2, 2, 1], origStride, origPad);
                    expected = [6, 2, 10, 0, 9, 3, 15, 0];
                    expect(result.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import numpy as np
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // x = tf.constant(np.array([[
    //     [[-0.14656299], [0.32942239], [-1.90302866]],
    //     [[-0.06487813], [-2.02637842], [-1.83669377]],
    //     [[0.82650784], [-0.89249092], [0.01207666]]
    // ]]).astype(np.float32))
    // filt = tf.constant(np.array([
    //     [[[-0.48280062], [1.26770487]], [[-0.83083738], [0.54341856]]],
    //     [[[-0.274904], [0.73111374]], [[2.01885189], [-2.68975237]]]
    // ]).astype(np.float32))
    //
    // with tf.GradientTape() as g:
    //   g.watch(x)
    //   g.watch(filt)
    //   y = tf.keras.backend.conv2d_transpose(x, filt, [1, 4, 4, 2])
    //   print(y)
    // (x_grad, filt_grad) = g.gradient(y, [x, filt])
    //
    // print("x_grad = %s" % x_grad)
    // print("filt_grad = %s" % filt_grad)
    // ```
    it('gradient with clones input=[1,3,3,1] f=[2,2,2,1] s=1 padding=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, x, filt, grads, dy, _a, xGrad, filtGrad, expectedXGrad, _b, _c, expectedFiltGrad, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 2;
                    inputShape = [1, 3, 3, inputDepth];
                    filterSize = 2;
                    stride = 1;
                    pad = 'valid';
                    filterShape = [filterSize, filterSize, outputDepth, inputDepth];
                    x = tf.tensor4d([[
                            [[-0.14656299], [0.32942239], [-1.90302866]],
                            [[-0.06487813], [-2.02637842], [-1.83669377]],
                            [[0.82650784], [-0.89249092], [0.01207666]]
                        ]], inputShape);
                    filt = tf.tensor4d([
                        [[[-0.48280062], [1.26770487]], [[-0.83083738], [0.54341856]]],
                        [[[-0.274904], [0.73111374]], [[2.01885189], [-2.68975237]]]
                    ], filterShape);
                    grads = tf.grads(function (x, filter) {
                        return tf.conv2dTranspose(x.clone(), filter.clone(), [1, 4, 4, outputDepth], stride, pad)
                            .clone();
                    });
                    dy = tf.ones([1, 4, 4, outputDepth]);
                    _a = grads([x, filt], dy), xGrad = _a[0], filtGrad = _a[1];
                    expectedXGrad = tf.ones([1, 3, 3, 1]).mul(tf.scalar(0.2827947));
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, xGrad.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, expectedXGrad.data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    expectedFiltGrad = tf.ones([2, 2, 2, 1]).mul(tf.scalar(-5.70202599));
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, filtGrad.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, expectedFiltGrad.data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import numpy as np
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // x = tf.constant(np.array([
    //     [[[-0.36541713], [-0.53973116]], [[0.01731674], [0.90227772]]]
    // ]).astype(np.float32))
    // filt = tf.constant(np.array([
    //     [[[-0.01423461], [-1.00267384]], [[1.61163029], [0.66302646]]],
    //     [[[-0.46900087], [-0.78649444]], [[0.87780536], [-0.84551637]]]
    // ]).astype(np.float32))
    //
    // with tf.GradientTape() as g:
    //   g.watch(x)
    //   g.watch(filt)
    //   y = tf.keras.backend.conv2d_transpose(x, filt, [1, 4, 4, 2], strides=(2,
    //   2)) print(y)
    // (x_grad, filt_grad) = g.gradient(y, [x, filt])
    //
    // print("x_grad = %s" % -x_grad)
    // print("filt_grad = %s" % -filt_grad)
    // ```
    it('gradient input=[1,2,2,1] f=[2,2,2,1] s=[2,2] padding=valid', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, x, filt, grads, dy, _a, xGrad, filtGrad, expectedXGrad, _b, _c, expectedFiltGrad, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 2;
                    inputShape = [1, 2, 2, inputDepth];
                    filterSize = 2;
                    stride = [2, 2];
                    pad = 'valid';
                    filterShape = [filterSize, filterSize, outputDepth, inputDepth];
                    x = tf.tensor4d([[[[-0.36541713], [-0.53973116]], [[0.01731674], [0.90227772]]]], inputShape);
                    filt = tf.tensor4d([
                        [[[-0.01423461], [-1.00267384]], [[1.61163029], [0.66302646]]],
                        [[[-0.46900087], [-0.78649444]], [[0.87780536], [-0.84551637]]]
                    ], filterShape);
                    grads = tf.grads(function (x, filter) {
                        return tf.conv2dTranspose(x, filter, [1, 4, 4, outputDepth], stride, pad);
                    });
                    dy = tf.ones([1, 4, 4, outputDepth]).mul(tf.scalar(-1));
                    _a = grads([x, filt], dy), xGrad = _a[0], filtGrad = _a[1];
                    expectedXGrad = tf.ones([1, 2, 2, 1]).mul(tf.scalar(-0.03454196));
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, xGrad.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, expectedXGrad.data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    expect(xGrad.shape).toEqual([1, 2, 2, 1]);
                    expectedFiltGrad = tf.ones([2, 2, 2, 1]).mul(tf.scalar(-0.01444618));
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, filtGrad.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, expectedFiltGrad.data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    expect(filtGrad.shape).toEqual([2, 2, 2, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import numpy as np
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // x = tf.constant(np.array([[
    //     [[1.52433065], [-0.77053435], [-0.64562341]],
    //     [[0.77962889], [1.58413887], [-0.25581856]],
    //     [[-0.58966221], [0.05411662], [0.70749138]]
    // ]]).astype(np.float32))
    // filt = tf.constant(np.array([
    //     [[[0.11178388], [-0.96654977]], [[1.21021296], [0.84121729]]],
    //     [[[0.34968338], [-0.42306114]], [[1.27395733], [-1.09014535]]]
    // ]).astype(np.float32))
    //
    // with tf.GradientTape() as g:
    //   g.watch(x)
    //   g.watch(filt)
    //   y = tf.keras.backend.conv2d_transpose(
    //       x, filt, [1, 3, 3, 2], strides=(1, 1), padding='same')
    // (x_grad, filt_grad) = g.gradient(y, [x, filt])
    //
    // print("x_grad = %s" % x_grad)
    // print("filt_grad = %s" % filt_grad)
    // ```
    it('gradient input=[1,3,3,1] f=[2,2,2,1] s=[1,1] padding=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, x, filt, grads, dy, _a, xGrad, filtGrad, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 1;
                    outputDepth = 2;
                    inputShape = [1, 3, 3, inputDepth];
                    filterSize = 2;
                    stride = [1, 1];
                    pad = 'same';
                    filterShape = [filterSize, filterSize, outputDepth, inputDepth];
                    x = tf.tensor4d([[
                            [[1.52433065], [-0.77053435], [-0.64562341]],
                            [[0.77962889], [1.58413887], [-0.25581856]],
                            [[-0.58966221], [0.05411662], [0.70749138]]
                        ]], inputShape);
                    filt = tf.tensor4d([
                        [[[0.11178388], [-0.96654977]], [[1.21021296], [0.84121729]]],
                        [[[0.34968338], [-0.42306114]], [[1.27395733], [-1.09014535]]]
                    ], filterShape);
                    grads = tf.grads(function (x, filter) {
                        return tf.conv2dTranspose(x, filter, [1, 3, 3, outputDepth], stride, pad);
                    });
                    dy = tf.ones([1, 3, 3, outputDepth]);
                    _a = grads([x, filt], dy), xGrad = _a[0], filtGrad = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, xGrad.array()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [[
                                [[1.30709858], [1.30709858], [-0.92814366]],
                                [[1.30709858], [1.30709858], [-0.92814366]],
                                [[1.19666437], [1.19666437], [-0.85476589]]
                            ]]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, filtGrad.array()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            [[[2.38806788], [2.38806788]], [[2.58201847], [2.58201847]]],
                            [[[2.2161221], [2.2161221]], [[3.11756406], [3.11756406]]]
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import numpy as np
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // x = tf.constant(np.array([[
    //     [[1.52433065], [-0.77053435]], [[0.77962889], [1.58413887]],
    // ]]).astype(np.float32))
    // filt = tf.constant(np.array([
    //     [[[0.11178388], [-0.96654977]], [[1.21021296], [0.84121729]]],
    //     [[[0.34968338], [-0.42306114]], [[1.27395733], [-1.09014535]]]
    // ]).astype(np.float32))
    //
    // with tf.GradientTape() as g:
    //   g.watch(x)
    //   g.watch(filt)
    //   y = tf.keras.backend.conv2d_transpose(
    //       x, filt, [1, 3, 3, 2], strides=(2, 2), padding='same')
    //   print(y.shape)
    // (x_grad, filt_grad) = g.gradient(y, [x, filt])
    //
    // print("x_grad = %s" % x_grad)
    // print("filt_grad = %s" % filt_grad)
    // ```
    it('gradient input=[1,2,2,2] f=[2,2,2,1] s=[2,2] padding=same', function () { return __awaiter(_this, void 0, void 0, function () {
        var inputDepth, outputDepth, inputShape, filterSize, stride, pad, filterShape, x, filt, grads, dy, _a, xGrad, filtGrad, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    inputDepth = 2;
                    outputDepth = 2;
                    inputShape = [1, 2, 2, inputDepth];
                    filterSize = 2;
                    stride = [2, 2];
                    pad = 'same';
                    filterShape = [filterSize, filterSize, outputDepth, inputDepth];
                    x = tf.tensor4d([[
                            [[-1.81506593, 1.00900095], [-0.05199118, 0.26311377]],
                            [[-1.18469792, -0.34780521], [2.04971242, -0.65154692]]
                        ]], inputShape);
                    filt = tf.tensor4d([
                        [
                            [[0.19529686, -0.79594708], [0.70314057, -0.06081263]],
                            [[0.28724744, 0.88522715], [-0.51824096, -0.97120989]]
                        ],
                        [
                            [[0.51872197, -1.17569193], [1.28316791, -0.81225092]],
                            [[-0.44221532, 0.70058174], [-0.4849217, 0.03806348]]
                        ]
                    ], filterShape);
                    grads = tf.grads(function (x, filter) {
                        return tf.conv2dTranspose(x, filter, [1, 3, 3, outputDepth], stride, pad);
                    });
                    dy = tf.ones([1, 3, 3, outputDepth]);
                    _a = grads([x, filt], dy), xGrad = _a[0], filtGrad = _a[1];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, xGrad.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            1.54219678, -2.19204008, 2.70032732, -2.84470257, 0.66744391, -0.94274245,
                            0.89843743, -0.85675972
                        ]]);
                    expect(xGrad.shape).toEqual([1, 2, 2, 2]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, filtGrad.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            -1.00204261, 0.27276259, -1.00204261, 0.27276259, -2.99976385, 0.66119574,
                            -2.99976385, 0.66119574, -1.86705711, 1.27211472, -1.86705711, 1.27211472,
                            -1.81506593, 1.00900095, -1.81506593, 1.00900095
                        ]]);
                    expect(filtGrad.shape).toEqual([2, 2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when x is not rank 3', function () {
        var origInputDepth = 1;
        var origOutputDepth = 1;
        var fSize = 2;
        var origPad = 0;
        var origStride = 1;
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([2, 2], [2, 1]);
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, origInputDepth, origOutputDepth]);
        expect(function () { return tf.conv2dTranspose(x, w, [2, 2, 1], origStride, origPad); })
            .toThrowError();
    });
    it('throws when weights is not rank 4', function () {
        var origInputDepth = 1;
        var origOutputDepth = 1;
        var inputShape = [1, 1, origOutputDepth];
        var fSize = 2;
        var origPad = 0;
        var origStride = 1;
        var x = tf.tensor3d([2], inputShape);
        // tslint:disable-next-line:no-any
        var w = tf.tensor3d([3, 1, 5, 0], [fSize, fSize, origInputDepth]);
        expect(function () { return tf.conv2dTranspose(x, w, [2, 2, 1], origStride, origPad); })
            .toThrowError();
    });
    it('throws when x depth does not match weights original output depth', function () {
        var origInputDepth = 1;
        var origOutputDepth = 2;
        var wrongOrigOutputDepth = 3;
        var inputShape = [1, 1, origOutputDepth];
        var fSize = 2;
        var origPad = 0;
        var origStride = 1;
        var x = tf.tensor3d([2, 2], inputShape);
        var w = tf.randomNormal([fSize, fSize, origInputDepth, wrongOrigOutputDepth]);
        expect(function () { return tf.conv2dTranspose(x, w, [2, 2, 2], origStride, origPad); })
            .toThrowError();
    });
    it('throws when passed x as a non-tensor', function () {
        var origInputDepth = 1;
        var origOutputDepth = 1;
        var fSize = 2;
        var origPad = 0;
        var origStride = 1;
        var w = tf.tensor4d([3, 1, 5, 0], [fSize, fSize, origInputDepth, origOutputDepth]);
        expect(function () { return tf.conv2dTranspose({}, w, [2, 2, 1], origStride, origPad); })
            .toThrowError(/Argument 'x' passed to 'conv2dTranspose' must be a Tensor/);
    });
    it('throws when passed filter as a non-tensor', function () {
        var origOutputDepth = 1;
        var inputShape = [1, 1, origOutputDepth];
        var origPad = 0;
        var origStride = 1;
        var x = tf.tensor3d([2], inputShape);
        expect(function () { return tf.conv2dTranspose(x, {}, [2, 2, 1], origStride, origPad); })
            .toThrowError(/Argument 'filter' passed to 'conv2dTranspose' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var origPad, origStride, x, w, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    origPad = 0;
                    origStride = 1;
                    x = [[[2]]];
                    w = [[[[3]], [[1]]], [[[5]], [[0]]]];
                    result = tf.conv2dTranspose(x, w, [2, 2, 1], origStride, origPad);
                    expected = [6, 2, 10, 0];
                    expect(result.shape).toEqual([2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=conv2d_transpose_test.js.map