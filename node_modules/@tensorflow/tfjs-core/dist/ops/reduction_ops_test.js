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
var reduce_util = require("./reduce_util");
jasmine_util_1.describeWithFlags('Reduction: min', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.min(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, NaN, 2]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.min(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.min(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D axis=[0,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.min(a, [0, 1]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.min(a, 0);
                    expect(r.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -7, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.min(a, 0, true /* keepDims */);
                    expect(r.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, -7, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.min(a, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, -7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.min(a, -1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, -7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.min(a, [1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, -7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.min({}); })
            .toThrowError(/Argument 'x' passed to 'min' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.min([3, -1, 0, 100, -7, 2]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(42);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.min(v); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(42);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.min(v.clone()).clone(); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), -1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 1D, ties', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([-1, -3, -7, -7]);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.min(v); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, -1, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 2D, axes=-1, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[-0, -20, -10], [10, 30, 20]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = -1;
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: ties, 2D, axes=-1, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, -20, -20], [10, 30, 10]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = -1;
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, -1, -1, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 2D, axes=0, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 10], [-10, -30, 20]]);
                    dy = tf.tensor1d([-1, -1, -1]);
                    axis = 0;
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, -1, 0, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 2D, axes=-1, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, -20, -10], [10, 30, 20]]);
                    dy = tf.tensor2d([[-1], [-1]]);
                    axis = -1;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.min(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 2D, axes=0, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, -20, -10], [10, 30, -20]]);
                    dy = tf.tensor2d([[-1, -1, -1]]);
                    axis = 0;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.min(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, -1, 0, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 3D, axes=[1, 2], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, -20], [-10, -15]], [[10, 30], [20, 15]]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2];
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, 0, -1, 0, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: ties, 3D, axes=[1, 2], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, -20], [-20, -20]], [[10, 30], [10, 15]]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2];
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, -1, -1, -1, 0, -1, 0]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 3D, axes=2, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, -20], [-10, -15]], [[10, 30], [20, 15]]]);
                    dy = tf.tensor2d([[-1, -1], [-1, -1]]);
                    axis = 2;
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, -1, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: 3D, axes=2, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, -20], [-10, -15]], [[10, 30], [20, 15]]]);
                    dy = tf.tensor3d([[[-1], [-1]], [[-1], [-1]]]);
                    axis = 2;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.min(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, -1, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: ties, 4D, axes=[1, 2, 3], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([
                        [[[0, -20], [-20, -20]], [[10, 30], [10, 30]]],
                        [[[0, 20], [20, 20]], [[-10, -30], [-10, -30]]]
                    ]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2, 3];
                    gradients = tf.grad(function (v) { return tf.min(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min gradient: ties, 4D, axes=[2, 3], keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([
                        [[[0, -20], [-20, -20]], [[10, 30], [10, 30]]],
                        [[[0, 20], [20, 20]], [[-10, -30], [-10, -30]]]
                    ]);
                    dy = tf.tensor4d([[[[-1]], [[-2]]], [[[-3]], [[-4]]]]);
                    axis = [2, 3];
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.min(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, -1, -1, -1, -2, 0, -2, 0, -3, 0, 0, 0, 0, -4, 0, -4]]);
                    expect(gradients.shape).toEqual([2, 2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.min(['a']); })
            .toThrowError(/Argument 'x' passed to 'min' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: max', jasmine_util_1.ALL_ENVS, function () {
    it('with one element dominating', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, -1, 0, 100, -7, 2]);
                    r = tf.max(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 100]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('with all elements being the same', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([3, 3, 3]);
                    r = tf.max(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.max([3, NaN, 2]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.max(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 100]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D axis=[0,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.max(a, [0, 1]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 100]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.max(a, [0]);
                    expect(r.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.max(a, [0], true /* keepDims */);
                    expect(r.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [100, -1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.max(a, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.max(a, -1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.max(a, [1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D, axis=[5]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, expectedResult, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.range(0, 64).reshape([2, 2, 2, 2, 2, 2]);
                    r = tf.max(a, [5]);
                    expectedResult = [
                        1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31,
                        33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.max({}); })
            .toThrowError(/Argument 'x' passed to 'max' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.max([3, -1, 0, 100, -7, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 100]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(42);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.max(v); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(42);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.max(v.clone()).clone(); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 1D, ties', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 3, 7, 7]);
                    dy = tf.scalar(-1);
                    gradients = tf.grad(function (v) { return tf.max(v); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, -1, -1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 2D, axes=-1, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 10], [-10, -30, -20]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = -1;
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: ties, 2D, axes=-1, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 20], [-10, -30, -10]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = -1;
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, -1, -1, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 2D, axes=0, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 10], [-10, -30, 20]]);
                    dy = tf.tensor1d([-1, -1, -1]);
                    axis = 0;
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, -1, 0, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 2D, axes=-1, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 10], [-10, -30, -20]]);
                    dy = tf.tensor2d([[-1], [-1]]);
                    axis = -1;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.max(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 2D, axes=0, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0, 20, 10], [-10, -30, 20]]);
                    dy = tf.tensor2d([[-1, -1, -1]]);
                    axis = 0;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.max(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, -1, 0, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 3D, axes=[1, 2], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, 20], [10, 15]], [[-10, -30], [-20, -15]]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2];
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, 0, -1, 0, 0, 0]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: ties, 3D, axes=[1, 2], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, 20], [20, 20]], [[-10, -30], [-10, -15]]]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2];
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, -1, -1, -1, 0, -1, 0]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 3D, axes=2, keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, 20], [10, 15]], [[-10, -30], [-20, -15]]]);
                    dy = tf.tensor2d([[-1, -1], [-1, -1]]);
                    axis = 2;
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, -1, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: 3D, axes=2, keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor3d([[[0, 20], [10, 15]], [[-10, -30], [-20, -15]]]);
                    dy = tf.tensor3d([[[-1], [-1]], [[-1], [-1]]]);
                    axis = 2;
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.max(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, -1, 0, -1, -1, 0, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: ties, 4D, axes=[1, 2, 3], keepDims=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([
                        [[[0, 20], [20, 20]], [[-10, -30], [-10, -30]]],
                        [[[0, -20], [-20, -20]], [[10, 30], [10, 30]]]
                    ]);
                    dy = tf.tensor1d([-1, -1]);
                    axis = [1, 2, 3];
                    gradients = tf.grad(function (v) { return tf.max(v, axis); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, -1, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, -1]]);
                    expect(gradients.shape).toEqual([2, 2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max gradient: ties, 4D, axes=[2, 3], keepDims=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, dy, axis, keepDims, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor4d([
                        [[[0, 20], [20, 20]], [[-10, -30], [-10, -30]]],
                        [[[0, -20], [-20, -20]], [[10, 30], [10, 30]]]
                    ]);
                    dy = tf.tensor4d([[[[-1]], [[-2]]], [[[-3]], [[-4]]]]);
                    axis = [2, 3];
                    keepDims = true;
                    gradients = tf.grad(function (v) { return tf.max(v, axis, keepDims); })(x, dy);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [0, -1, -1, -1, -2, 0, -2, 0, -3, 0, 0, 0, 0, -4, 0, -4]]);
                    expect(gradients.shape).toEqual([2, 2, 2, 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.max(['a']); })
            .toThrowError(/Argument 'x' passed to 'max' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: argmax', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 3, 2]);
                    result = tf.argMax(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('one value', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([10]);
                    result = tf.argMax(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('N > than parallelization threshold', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, values, i, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    values = new Float32Array(n);
                    for (i = 0; i < n; i++) {
                        values[i] = i;
                    }
                    a = tf.tensor1d(values);
                    result = tf.argMax(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), n - 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D, N > than parallelization threshold', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, values, i, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    values = new Float32Array(n);
                    for (i = 0; i < n; i++) {
                        values[i] = i;
                    }
                    a = tf.tensor3d(values, [1, 1, n]);
                    result = tf.argMax(a, -1);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), n - 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('max index corresponds to start of a non-initial window', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, windowSize, values, index, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    windowSize = reduce_util.computeOptimalWindowSize(n);
                    values = new Float32Array(n);
                    index = windowSize * 2;
                    values[index] = 1;
                    a = tf.tensor1d(values);
                    result = tf.argMax(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), index]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('5D, max index corresponds to start of a non-initial window', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, windowSize, values, index, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    windowSize = reduce_util.computeOptimalWindowSize(n);
                    values = new Float32Array(n);
                    index = windowSize * 2;
                    values[index] = 1;
                    a = tf.tensor5d(values, [1, 1, 1, 1, n]);
                    result = tf.argMax(a, -1);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), index]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0, 3, 5, NaN, 3]);
                    res = tf.argMax(a);
                    expect(res.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, no axis specified', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.argMax(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4D, no axis specified', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([3, -1, 0, 100, -7, 2], [2, 1, 1, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.argMax(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.argMax(a, 0);
                    expect(r.shape).toEqual([3]);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('6D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor6d([3, -1, 0, 100, -7, 2], [2, 1, 1, 1, 1, 3]);
                    r = tf.argMax(a, 0);
                    expect(r.shape).toEqual([1, 1, 1, 1, 3]);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.argMax(a, 1);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    r = tf.argMax(a, -1);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.argMax({}); })
            .toThrowError(/Argument 'x' passed to 'argMax' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.argMax([1, 0, 3, 2]);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 2]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts tensor with bool values', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([0, 1], 'bool');
                    result = tf.argMax(t);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('has gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (x) { return tf.argMax(x); })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (x) { return tf.argMax(x.clone()).clone(); })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.argMax(['a']); })
            .toThrowError(/Argument 'x' passed to 'argMax' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: argmin', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 3, 2]);
                    result = tf.argMin(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('one value', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([10]);
                    result = tf.argMin(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('N > than parallelization threshold', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, values, i, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    values = new Float32Array(n);
                    for (i = 0; i < n; i++) {
                        values[i] = n - i;
                    }
                    a = tf.tensor1d(values);
                    result = tf.argMin(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), n - 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4D, N > than parallelization threshold', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, values, i, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    values = new Float32Array(n);
                    for (i = 0; i < n; i++) {
                        values[i] = n - i;
                    }
                    a = tf.tensor4d(values, [1, 1, 1, n]);
                    result = tf.argMin(a, -1);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), n - 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('min index corresponds to start of a non-initial window', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, windowSize, values, index, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util.PARALLELIZE_THRESHOLD * 2;
                    windowSize = reduce_util.computeOptimalWindowSize(n);
                    values = new Float32Array(n);
                    index = windowSize * 2;
                    values[index] = -1;
                    a = tf.tensor1d(values);
                    result = tf.argMin(a);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), index]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([5, 0, NaN, -1, 3]);
                    res = tf.argMin(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D, ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([5, 0, NaN, -1, 3], [1, 1, 5]);
                    res = tf.argMin(a, -1);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, no axis specified', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.argMin(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, -1, 0, 100, -7, 2], [2, 3]);
                    r = tf.argMin(a, 0);
                    expect(r.shape).toEqual([3]);
                    expect(r.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, -8], [2, 3]);
                    r = tf.argMin(a, 1);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, -8], [2, 3]);
                    r = tf.argMin(a, -1);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.argMin({}); })
            .toThrowError(/Argument 'x' passed to 'argMin' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.argMin([1, 0, 3, 2]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts tensor with bool values', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([0, 1], 'bool');
                    result = tf.argMin(t);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('has gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (x) { return tf.argMin(x); })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([3, 2, 5, 100, -7, 2], [2, 3]);
                    dy = tf.ones([3], 'float32');
                    da = tf.grad(function (x) { return tf.argMin(x.clone()).clone(); })(a, dy);
                    expect(da.dtype).toBe('float32');
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.argMin(['a']); })
            .toThrowError(/Argument 'x' passed to 'argMin' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: logSumExp', jasmine_util_1.ALL_ENVS, function () {
    it('0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0);
                    result = tf.logSumExp(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, -3]);
                    result = tf.logSumExp(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        Math.log(Math.exp(1) + Math.exp(2) + Math.exp(-3))]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, NaN]);
                    result = tf.logSumExp(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axes=0 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    r = tf.logSumExp(a, [0]);
                    expect(r.shape).toEqual([2]);
                    expected = [
                        Math.log(Math.exp(1) + Math.exp(3) + Math.exp(0)),
                        Math.log(Math.exp(2) + Math.exp(0) + Math.exp(1))
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axes=0 in 2D array, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    r = tf.logSumExp(a, [0], true /* keepDims */);
                    expect(r.shape).toEqual([1, 2]);
                    expected = [
                        Math.log(Math.exp(1) + Math.exp(3) + Math.exp(0)),
                        Math.log(Math.exp(2) + Math.exp(0) + Math.exp(1))
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axes=1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.logSumExp(a, [1]);
                    expect(res.shape).toEqual([3]);
                    expected = [
                        Math.log(Math.exp(1) + Math.exp(2)),
                        Math.log(Math.exp(3) + Math.exp(0)),
                        Math.log(Math.exp(0) + Math.exp(1)),
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axes = -1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.logSumExp(a, -1);
                    expect(res.shape).toEqual([3]);
                    expected = [
                        Math.log(Math.exp(1) + Math.exp(2)),
                        Math.log(Math.exp(3) + Math.exp(0)),
                        Math.log(Math.exp(0) + Math.exp(1)),
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axes=1 provided as a single digit', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    res = tf.logSumExp(a, 1);
                    expect(res.shape).toEqual([2]);
                    expected = [
                        Math.log(Math.exp(1) + Math.exp(2) + Math.exp(3)),
                        Math.log(Math.exp(0) + Math.exp(0) + Math.exp(1))
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axes=0,1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.logSumExp(a, [0, 1]);
                    expect(res.shape).toEqual([]);
                    expected = [Math.log(Math.exp(1) + Math.exp(2) + Math.exp(3) + Math.exp(0) + Math.exp(0) +
                            Math.exp(1))];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.logSumExp({}); })
            .toThrowError(/Argument 'x' passed to 'logSumExp' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.logSumExp([1, 2, -3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        Math.log(Math.exp(1) + Math.exp(2) + Math.exp(-3))]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.logSumExp(['a']); })
            .toThrowError(/Argument 'x' passed to 'logSumExp' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: sum', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    result = tf.sum(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, NaN, 0, 1], [3, 2]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.sum(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sum over dtype int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, sum, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 7, 3], 'int32');
                    sum = tf.sum(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, sum.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 16]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sum over dtype bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, sum, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true, true], 'bool');
                    sum = tf.sum(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, sum.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sums all values in 2D array with keep dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, null, true /* keepDims */);
                    expect(res.shape).toEqual([1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sums across axis=0 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, [0]);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sums across axis=0 in 2D array, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, [0], true /* keepDims */);
                    expect(res.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sums across axis=1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, [1]);
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    res = tf.sum(a, 1);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    res = tf.sum(a, -1);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sums across axis=0,1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, [0, 1]);
                    expect(res.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[-1,-2] in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.sum(a, [-1, -2]);
                    expect(res.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: sum(2d)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    dy = tf.scalar(10);
                    gradients = tf.grad(function (a) { return a.sum(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 10, 10, 10, 10, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    dy = tf.scalar(10);
                    gradients = tf.grad(function (a) { return a.clone().sum().clone(); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 10, 10, 10, 10, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: sum(2d, axis=0)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2], [3, 0], [0, 1]], [3, 2]);
                    dy = tf.tensor1d([10, 20]);
                    axis = 0;
                    gradients = tf.grad(function (a) { return a.sum(axis); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 20, 10, 20, 10, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: sum(2d, axis=1)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, axis, gradients, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2], [3, 0], [0, 1]], [3, 2]);
                    dy = tf.tensor1d([10, 20, 30]);
                    axis = 1;
                    gradients = tf.grad(function (a) { return a.sum(axis); })(a, dy);
                    expect(gradients.shape).toEqual(a.shape);
                    expect(gradients.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradients.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 10, 20, 20, 30, 30]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.sum({}); })
            .toThrowError(/Argument 'x' passed to 'sum' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.sum([[1, 2], [3, 0], [0, 1]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 7]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.sum(['a']); })
            .toThrowError(/Argument 'x' passed to 'sum' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: prod', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    result = tf.prod(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, NaN, 0, 1], [3, 2]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.prod(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prod over dtype int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, prod, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 7, 3], 'int32');
                    prod = tf.prod(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, prod.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 105]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prod over dtype bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, prod, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true, true], 'bool');
                    prod = tf.prod(a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, prod.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prods all values in 2D array with keep dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 0, 1], [3, 2]);
                    res = tf.prod(a, null, true /* keepDims */);
                    expect(res.shape).toEqual([1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prods across axis=0 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 0, 1], [3, 2]);
                    res = tf.prod(a, [0]);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prods across axis=0 in 2D array, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 0, 1], [3, 2]);
                    res = tf.prod(a, [0], true /* keepDims */);
                    expect(res.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prods across axis=1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 1, 1], [3, 2]);
                    res = tf.prod(a, [1]);
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 1, 1], [2, 3]);
                    res = tf.prod(a, 1);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 1, 1], [2, 3]);
                    res = tf.prod(a, -1);
                    expect(res.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('prods across axis=0,1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 1, 1], [3, 2]);
                    res = tf.prod(a, [0, 1]);
                    expect(res.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[-1,-2] in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 1, 1, 1], [3, 2]);
                    res = tf.prod(a, [-1, -2]);
                    expect(res.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.prod({}); })
            .toThrowError(/Argument 'x' passed to 'prod' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    result = tf.prod([[1, 2], [3, 1], [1, 1]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.prod(['a']); })
            .toThrowError(/Argument 'x' passed to 'prod' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: mean', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    r = tf.mean(a);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 7 / 6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, NaN, 0, 1], [3, 2]);
                    r = tf.mean(a);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mean(int32) => float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 7, 3], 'int32');
                    r = tf.mean(a);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mean(bool) => float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true, true], 'bool');
                    r = tf.mean(a);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3 / 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D array with keep dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, null, true /* keepDims */);
                    expect(res.shape).toEqual([1, 1]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7 / 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, [0]);
                    expect(res.shape).toEqual([2]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4 / 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0 in 2D array, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, [0], true /* keepDims */);
                    expect(res.shape).toEqual([1, 2]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4 / 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, [1]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, 1.5, 0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis = -1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, [-1]);
                    expect(res.dtype).toBe('float32');
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, 1.5, 0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    res = tf.mean(a, 1);
                    expect(res.shape).toEqual([2]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 1 / 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    res = tf.mean(a, [0, 1]);
                    expect(res.shape).toEqual([]);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7 / 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, dyVal, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    dy = tf.scalar(1.5);
                    da = tf.grad(function (a) { return a.mean(); })(a, dy);
                    return [4 /*yield*/, dy.array()];
                case 1:
                    dyVal = _b.sent();
                    expect(da.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            dyVal / a.size, dyVal / a.size, dyVal / a.size, dyVal / a.size,
                            dyVal / a.size, dyVal / a.size
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, dyVal, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    dy = tf.scalar(1.5);
                    da = tf.grad(function (a) { return a.clone().mean().clone(); })(a, dy);
                    return [4 /*yield*/, dy.array()];
                case 1:
                    dyVal = _b.sent();
                    expect(da.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [
                            dyVal / a.size, dyVal / a.size, dyVal / a.size, dyVal / a.size,
                            dyVal / a.size, dyVal / a.size
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients throws for defined axis', function () {
        var a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
        var dy = tf.scalar(1.5);
        expect(function () { return tf.grad(function (a) { return a.mean(1); })(a, dy); }).toThrowError();
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.mean({}); })
            .toThrowError(/Argument 'x' passed to 'mean' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    r = tf.mean([[1, 2, 3], [0, 0, 1]]);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 7 / 6]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.mean(['a']); })
            .toThrowError(/Argument 'x' passed to 'mean' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: moments', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    _a = tf.moments(a), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), 7 / 6]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), 1.1389]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, NaN, 0, 1], [3, 2]);
                    _a = tf.moments(a), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), NaN]);
                    _c = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('moments(int32) => float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 7, 3], 'int32');
                    _a = tf.moments(a), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), 4]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('moments(bool) => float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true, true], 'bool');
                    _a = tf.moments(a), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), 3 / 5]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), 0.23999998]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D array with keep dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    _a = tf.moments(a, null, true /* keepDims */), mean = _a.mean, variance = _a.variance;
                    expect(mean.shape).toEqual([1, 1]);
                    expect(mean.dtype).toBe('float32');
                    expect(variance.shape).toEqual([1, 1]);
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 / 6]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1.138889]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    _a = tf.moments(a, [0]), mean = _a.mean, variance = _a.variance;
                    expect(mean.shape).toEqual([2]);
                    expect(mean.dtype).toBe('float32');
                    expect(variance.shape).toEqual([2]);
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4 / 3, 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1.556, 2 / 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    _a = tf.moments(a, [1]), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(mean.shape).toEqual([3]);
                    expect(variance.dtype).toBe('float32');
                    expect(variance.shape).toEqual([3]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1.5, 1.5, 0.5]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [0.25, 2.25, 0.25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    _a = tf.moments(a, 1), mean = _a.mean, variance = _a.variance;
                    expect(mean.shape).toEqual([2]);
                    expect(mean.dtype).toBe('float32');
                    expect(variance.shape).toEqual([2]);
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2, 1 / 3]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [2 / 3, 0.222]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=-1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    _a = tf.moments(a, -1), mean = _a.mean, variance = _a.variance;
                    expect(mean.shape).toEqual([2]);
                    expect(mean.dtype).toBe('float32');
                    expect(variance.shape).toEqual([2]);
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [2, 1 / 3]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [2 / 3, 0.222]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 in 2D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    _a = tf.moments(a, [0, 1]), mean = _a.mean, variance = _a.variance;
                    expect(mean.shape).toEqual([]);
                    expect(mean.dtype).toBe('float32');
                    expect(variance.shape).toEqual([]);
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [7 / 6]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1.1389]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.moments({}); })
            .toThrowError(/Argument 'x' passed to 'moments' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a, mean, variance, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = tf.moments([1, 2, 3, 0, 0, 1]), mean = _a.mean, variance = _a.variance;
                    expect(mean.dtype).toBe('float32');
                    expect(variance.dtype).toBe('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, mean.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), 7 / 6]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, variance.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), 1.1389]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('Reduction: norm', jasmine_util_1.ALL_ENVS, function () {
    it('scalar norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(-22.0);
                    norm = tf.norm(a);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 22]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector inf norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 3, -4]);
                    norm = tf.norm(a, Infinity);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector -inf norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 3, -4]);
                    norm = tf.norm(a, -Infinity);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector 1 norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 3, -4]);
                    norm = tf.norm(a, 1);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 10]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector euclidean norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 3, -4]);
                    norm = tf.norm(a, 'euclidean');
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 5.4772]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector 2-norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, -2, 3, -4]);
                    norm = tf.norm(a, 2);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 5.4772]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('vector >2-norm to throw error', function () {
        var a = tf.tensor1d([1, -2, 3, -4]);
        expect(function () { return tf.norm(a, 3); }).toThrowError();
    });
    it('matrix inf norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 1, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [0, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix -inf norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 1, 0, 1], [3, 2]);
                    norm = tf.norm(a, -Infinity, [0, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix 1 norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 1, 1, 1], [3, 2]);
                    norm = tf.norm(a, 1, [0, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix euclidean norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 1, 1, 1], [3, 2]);
                    norm = tf.norm(a, 'euclidean', [0, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4.123]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix fro norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, -3, 1, 1, 1], [3, 2]);
                    norm = tf.norm(a, 'fro', [0, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 4.123]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matrix other norm to throw error', function () {
        var a = tf.tensor2d([1, 2, -3, 1, 1, 1], [3, 2]);
        expect(function () { return tf.norm(a, 2, [0, 1]); }).toThrowError();
    });
    it('propagates NaNs for norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, NaN, 0, 1], [3, 2]);
                    norm = tf.norm(a);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), NaN]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=null in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity);
                    expect(norm.shape).toEqual([]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D array norm with keep dim', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, null, true /* keepDims */);
                    expect(norm.shape).toEqual([1, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0 in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [0]);
                    expect(norm.shape).toEqual([2]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=1 in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [1]);
                    expect(norm.dtype).toBe('float32');
                    expect(norm.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=1 keepDims in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [1], true);
                    expect(norm.dtype).toBe('float32');
                    expect(norm.shape).toEqual([3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D norm with axis=1 provided as number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [2, 3]);
                    norm = tf.norm(a, Infinity, 1);
                    expect(norm.shape).toEqual([2]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [0, 1]);
                    expect(norm.shape).toEqual([]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 keepDims in 2D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 0, 0, 1], [3, 2]);
                    norm = tf.norm(a, Infinity, [0, 1], true);
                    expect(norm.shape).toEqual([1, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D norm axis=0,1, matrix inf norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, -3, 1, 0, 1], [3, 2, 1]);
                    norm = tf.norm(a, Infinity, [0, 1]);
                    expect(norm.shape).toEqual([1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 keepDims in 3D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 0, 0, 1], [3, 2, 1]);
                    norm = tf.norm(a, Infinity, [0, 1], true);
                    expect(norm.shape).toEqual([1, 1, 1]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 keepDims in 3D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 0, 0, 1, 1, 2, 3, 0, 0, 1], [3, 2, 2]);
                    norm = tf.norm(a, Infinity, [0, 1], true);
                    expect(norm.shape).toEqual([1, 1, 2]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=null in 3D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([1, 2, 3, 0, 0, 1], [3, 2, 1]);
                    norm = tf.norm(a, Infinity);
                    expect(norm.shape).toEqual([]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=null in 4D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 2, 3, 0, 0, 1], [3, 2, 1, 1]);
                    norm = tf.norm(a, Infinity);
                    expect(norm.shape).toEqual([]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 in 4D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([
                        1, 2, 3, 0, 0, 1, 1, 2, 3, 0, 0, 1,
                        1, 2, 3, 0, 0, 1, 1, 2, 3, 0, 0, 1
                    ], [3, 2, 2, 2]);
                    norm = tf.norm(a, Infinity, [0, 1]);
                    expect(norm.shape).toEqual([2, 2]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3, 4, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('axis=0,1 in 4D array norm', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([
                        1, 2, 3, 0, 0, 1, 1, 2, 3, 0, 0, 1,
                        1, 2, 3, 0, 0, 1, 1, 2, 3, 0, 0, 1
                    ], [3, 2, 2, 2]);
                    norm = tf.norm(a, Infinity, [0, 1], true);
                    expect(norm.shape).toEqual([1, 1, 2, 2]);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3, 4, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.norm({}); })
            .toThrowError(/Argument 'x' passed to 'norm' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var norm, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    norm = tf.norm([1, -2, 3, -4], 1);
                    expect(norm.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, norm.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 10]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensors', function () {
        expect(function () { return tf.norm([
            'a', 'b'
        ]); }).toThrowError(/Argument 'x' passed to 'norm' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: all', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), 0]);
                    a = tf.tensor1d([1, 0, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), 0]);
                    a = tf.tensor1d([1, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 1], 'bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.all(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D axis=[0,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a, [0, 1]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
                    r = tf.all(a, 0);
                    expect(r.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0]]);
                    r = tf.all(a, 1);
                    expect(r.shape).toEqual([2]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = a.all(0, true /* keepDims */);
                    expect(r.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.all(a, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.all(a, -1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.all(a, [1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when dtype is not boolean', function () {
        var a = tf.tensor2d([1, 1, 0, 0], [2, 2]);
        expect(function () { return tf.all(a); })
            .toThrowError(/Argument 'x' passed to 'all' must be bool tensor, but got float/);
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.all({}); })
            .toThrowError(/Argument 'x' passed to 'all' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0, 0, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.all(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.all(['a']); })
            .toThrowError(/Argument 'x' passed to 'all' must be bool tensor, but got string/);
    });
});
jasmine_util_1.describeWithFlags('Reduction: any', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), 0]);
                    a = tf.tensor1d([1, 0, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), 1]);
                    a = tf.tensor1d([1, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 0], 'bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, tf.any(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D axis=[0,1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a, [0, 1]).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0], [2, 2], 'bool');
                    r = tf.any(a, 0);
                    expect(r.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 1]]);
                    r = tf.any(a, 1);
                    expect(r.shape).toEqual([2]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=0, keepDims', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = a.any(0, true /* keepDims */);
                    expect(r.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.any(a, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis = -1 provided as a number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.any(a, -1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D, axis=[1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 1, 0, 0, 1, 0], [2, 3], 'bool');
                    r = tf.any(a, [1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when dtype is not boolean', function () {
        var a = tf.tensor2d([1, 1, 0, 0], [2, 2]);
        expect(function () { return tf.any(a); })
            .toThrowError(/Argument 'x' passed to 'any' must be bool tensor, but got float/);
    });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.any({}); })
            .toThrowError(/Argument 'x' passed to 'any' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0, 0, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.any(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error for string tensor', function () {
        expect(function () { return tf.any(['a']); })
            .toThrowError(/Argument 'x' passed to 'any' must be bool tensor/);
    });
});
//# sourceMappingURL=reduction_ops_test.js.map