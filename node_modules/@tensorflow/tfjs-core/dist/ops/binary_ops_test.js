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
jasmine_util_1.describeWithFlags('prelu', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([0, 1, -2, -4]);
                    a = tf.tensor1d([0.15, 0.2, 0.25, 0.15]);
                    result = tf.prelu(x, a);
                    expect(result.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, -0.5, -0.6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [0, 1, -2, -4];
                    a = [0.15, 0.2, 0.25, 0.15];
                    result = tf.prelu(x, a);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, -0.5, -0.6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([0, 1, -2, -4]);
                    a = [0.15, 0.2, 0.25, 0.15];
                    result = x.prelu(a);
                    expect(result.shape).toEqual(x.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, -0.5, -0.6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, dy, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([0.5, 3, -0.1, -4]);
                    a = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    dy = tf.tensor1d([1, 1, 1, 1]);
                    dx = tf.grad(function (x) { return tf.prelu(x, a); })(x, dy);
                    expect(dx.shape).toEqual(x.shape);
                    expect(dx.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, dx, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([0.5, 3, -0.1, -4]);
                    a = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    dx = tf.grad(function (x) { return tf.prelu(x.clone(), a).clone(); })(x);
                    expect(dx.shape).toEqual(x.shape);
                    expect(dx.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dx.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('derivative where alpha got broadcasted', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor2d([[0.5, 3, -0.1, -4]]);
                    a = tf.tensor2d([[0.2]]);
                    dy = tf.tensor2d([[1, 1, 1, 1]]);
                    da = tf.grad(function (a) { return tf.prelu(x, a); })(a, dy);
                    expect(da.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-4.1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed x as a non-tensor', function () {
        expect(function () { return tf.prelu({}, tf.scalar(1)); })
            .toThrowError(/Argument 'x' passed to 'prelu' must be a Tensor/);
    });
    it('throws when passed alpha as a non-tensor', function () {
        expect(function () { return tf.prelu(tf.scalar(1), {}); })
            .toThrowError(/Argument 'alpha' passed to 'prelu' must be a Tensor/);
    });
    it('throws for string tensor', function () {
        expect(function () { return tf.prelu(['a'], 0.1); })
            .toThrowError(/Argument 'x' passed to 'prelu' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('maximum', jasmine_util_1.ALL_ENVS, function () {
    it('float32 and float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 3, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0.5, 3, -0.1, -4];
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 3, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = a.maximum(b);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 3, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32 and int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 2, 3], 'int32');
                    b = tf.tensor1d([2, 3, 1, 4], 'int32');
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 5, 2, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('bool and bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true], 'bool');
                    b = tf.tensor1d([false, false, true, true], 'bool');
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0, 1], 'float32');
                    b = tf.tensor1d([0, 0, 1, 1], 'int32');
                    res = tf.maximum(a, b);
                    expect(res.shape).toEqual(a.shape);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, -0.1, NaN]);
                    b = tf.tensor1d([0.2, 0.3, 0.25]);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.3, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.scalar(0.6);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.6, 3, 0.6, 0.6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts scalar and Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.6);
                    b = tf.tensor1d([0.5, 3, -0.1, -4]);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.6, 3, 0.6, 0.6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 0.3]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.4, 0.6, 0.3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts 2x1 Tensor2D and 2x2 Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3], [2, 1]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.5, 0.6, 0.3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.maximum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.maximum(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 2.6, 3, 5.9]);
                    b = tf.tensor1d([1.0, 2.7, 3, 5.8]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    grads = tf.grads(function (a, b) { return tf.maximum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1, 2 * 0, 3 * 1, 4 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 0, 2 * 1, 3 * 0, 4 * 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3, 0.7, 0.9], [2, 2]);
                    b = tf.tensor2d([0.2, 0.4, 0.7, 0.15], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.maximum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1, 2 * 0, 3 * 1, 4 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 0, 2 * 1, 3 * 0, 4 * 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.maximum({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'maximum' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.maximum(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'maximum' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[0.5, 3], [-0.1, -4]];
                    b = [[0.2, 0.4], [0.25, 0.15]];
                    result = tf.maximum(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 3, 0.25, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.maximum('q', 3); })
            .toThrowError(/Argument 'a' passed to 'maximum' must be numeric tensor/);
        expect(function () { return tf.maximum(3, 'q'); })
            .toThrowError(/Argument 'b' passed to 'maximum' must be numeric tensor/);
    });
});
jasmine_util_1.describeWithFlags('squaredDifference', jasmine_util_1.ALL_ENVS, function () {
    it('float32 and float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.2, 2), Math.pow(3 - 0.4, 2), Math.pow(-0.1 - 0.25, 2),
                            Math.pow(-4 - 0.15, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0.5, 3, -0.1, -4];
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.2, 2), Math.pow(3 - 0.4, 2), Math.pow(-0.1 - 0.25, 2),
                            Math.pow(-4 - 0.15, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = a.squaredDifference(b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.2, 2), Math.pow(3 - 0.4, 2), Math.pow(-0.1 - 0.25, 2),
                            Math.pow(-4 - 0.15, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32 and int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 2, 3], 'int32');
                    b = tf.tensor1d([2, 3, 1, 4], 'int32');
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(1 - 2, 2), Math.pow(5 - 3, 2), Math.pow(2 - 1, 2),
                            Math.pow(3 - 4, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    res = tf.squaredDifference(tf.scalar(5, 'int32'), tf.scalar(2, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [9]]);
                    res = tf.squaredDifference(tf.scalar(5, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [16]]);
                    res = tf.squaredDifference(tf.scalar(5, 'int32'), tf.scalar(false, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, -0.1, NaN]);
                    b = tf.tensor1d([0.2, 0.3, 0.25]);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [Math.pow(0.5 - 0.2, 2), Math.pow(-0.1 - 0.3, 2), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.scalar(0.6);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.6, 2), Math.pow(3 - 0.6, 2), Math.pow(-0.1 - 0.6, 2),
                            Math.pow(-4 - 0.6, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts scalar and Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.6);
                    b = tf.tensor1d([0.5, 3, -0.1, -4]);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.6 - 0.5, 2), Math.pow(0.6 - 3, 2), Math.pow(0.6 - (-0.1), 2),
                            Math.pow(0.6 - (-4), 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 0.3]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.2, 2), Math.pow(0.3 - 0.4, 2), Math.pow(0.5 - 0.6, 2),
                            Math.pow(0.3 - 0.15, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts 2x1 Tensor2D and 2x2 Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3], [2, 1]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.2, 2), Math.pow(0.5 - 0.4, 2), Math.pow(0.3 - 0.6, 2),
                            Math.pow(0.3 - 0.15, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.squaredDifference(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 2 * (5.2 - 0.6)]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 2 * (0.6 - 5.2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.squaredDifference(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 2 * (5.2 - 0.6)]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 2 * (0.6 - 5.2)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 2.6, 3, 5.9]);
                    b = tf.tensor1d([1.0, 2.7, 3, 5.8]);
                    dy = tf.tensor1d([1, 2, 3, 1]);
                    grads = tf.grads(function (a, b) { return tf.squaredDifference(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            1 * 2 * (1.1 - 1.0), 2 * 2 * (2.6 - 2.7), 3 * 2 * (3 - 3),
                            1 * 2 * (5.9 - 5.8)
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * 2 * (1.0 - 1.1), 2 * 2 * (2.7 - 2.6), 3 * 2 * (3 - 3),
                            1 * 2 * (5.8 - 5.9)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3, 0.7, 0.9], [2, 2]);
                    b = tf.tensor2d([0.2, 0.4, 0.7, 0.15], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.squaredDifference(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [
                            1 * 2 * (0.5 - 0.2), 2 * 2 * (0.3 - 0.4), 3 * 2 * (0.7 - 0.7),
                            4 * 2 * (0.9 - 0.15)
                        ]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * 2 * (0.2 - 0.5), 2 * 2 * (0.4 - 0.3), 3 * 2 * (0.7 - 0.7),
                            4 * 2 * (0.15 - 0.9)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.squaredDifference({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'squaredDifference' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.squaredDifference(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'squaredDifference' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[0.5, 3], [-0.1, -4]];
                    b = 0.6;
                    result = tf.squaredDifference(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            Math.pow(0.5 - 0.6, 2), Math.pow(3 - 0.6, 2), Math.pow(-0.1 - 0.6, 2),
                            Math.pow(-4 - 0.6, 2)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.squaredDifference('q', 3); })
            .toThrowError(/Argument 'a' passed to 'squaredDifference' must be numeric/);
        expect(function () { return tf.squaredDifference(3, 'q'); })
            .toThrowError(/Argument 'b' passed to 'squaredDifference' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('minimum', jasmine_util_1.ALL_ENVS, function () {
    it('float32 and float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.4, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0.5, 3, -0.1, -4];
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.4, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = a.minimum(b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.4, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32 and int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 2, 3], 'int32');
                    b = tf.tensor1d([2, 3, 1, 4], 'int32');
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 1, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('bool and bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, false, false, true], 'bool');
                    b = tf.tensor1d([false, false, true, true], 'bool');
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0, 1], 'float32');
                    b = tf.tensor1d([0, 0, 1, 1], 'int32');
                    res = tf.minimum(a, b);
                    expect(res.shape).toEqual(a.shape);
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, -0.1, NaN]);
                    b = tf.tensor1d([0.2, 0.3, 0.25]);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, -0.1, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.scalar(0.6);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.6, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts scalar and Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(0.6);
                    b = tf.tensor1d([0.5, 3, -0.1, -4]);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.6, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 0.3]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.3, 0.5, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts 2x1 Tensor2D and 2x2 Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3], [2, 1]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.4, 0.3, 0.15]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.minimum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.minimum(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3 * 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 2.6, 3, 5.9]);
                    b = tf.tensor1d([1.0, 2.7, 3, 5.8]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    grads = tf.grads(function (a, b) { return tf.minimum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 0, 2 * 1, 3 * 1, 4 * 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 1, 2 * 0, 3 * 0, 4 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3, 0.7, 0.9], [2, 2]);
                    b = tf.tensor2d([0.2, 0.4, 0.7, 0.15], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.minimum(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 0, 2 * 1, 3 * 1, 4 * 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [1 * 1, 2 * 0, 3 * 0, 4 * 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.minimum({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'minimum' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.minimum(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'minimum' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[0.5, 3], [-0.1, -4]];
                    b = [[0.2, 0.4], [0.25, 0.15]];
                    result = tf.minimum(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.2, 0.4, -0.1, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.minimum('q', 3); })
            .toThrowError(/Argument 'a' passed to 'minimum' must be numeric/);
        expect(function () { return tf.minimum(3, 'q'); })
            .toThrowError(/Argument 'b' passed to 'minimum' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('mod', jasmine_util_1.ALL_ENVS, function () {
    it('float32 and float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = tf.tensor1d([0.2, 0.4, 0.25, 0.15]);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.15, 0.05]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [0.5, 3, -0.1, -4];
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual([4]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.15, 0.05]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 3, -0.1, -4]);
                    b = [0.2, 0.4, 0.25, 0.15];
                    result = a.mod(b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.15, 0.05]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32 and int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 5, 2, 3], 'int32');
                    b = tf.tensor1d([2, 3, 1, 4], 'int32');
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(a.shape);
                    expect(result.dtype).toBe('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res = tf.mod(tf.scalar(5, 'int32'), tf.scalar(2, 'float32'));
                    expect(res.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1]]);
                    res = tf.mod(tf.scalar(5, 'int32'), tf.scalar(true, 'bool'));
                    expect(res.dtype).toBe('int32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaN', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([5, -1, NaN]);
                    b = tf.tensor1d([2, 3, 0.25]);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 2.5, -0.1, -4], 'float32');
                    b = tf.scalar(0.6);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.5, 0.1, 0.5, 0.2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts scalar and Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 3, -1, -4]);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([0.5, 0.3]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.3, 0.5, 0.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts 2x1 Tensor2D and 2x2 Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3], [2, 1]);
                    b = tf.tensor2d([0.2, 0.4, 0.6, 0.15], [2, 2]);
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual(b.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.1, 0.3, 0.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.mod(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * -1 * Math.floor(5.2 / 0.6)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5.2);
                    b = tf.scalar(0.6);
                    dy = tf.scalar(3);
                    grads = tf.grads(function (a, b) { return tf.mod(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [3]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [3 * -1 * Math.floor(5.2 / 0.6)]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1.1, 2.6, 3, 5.9]);
                    b = tf.tensor1d([1.0, 2.7, 3, 5.8]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    grads = tf.grads(function (a, b) { return tf.mod(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1, 2 * 1, 3 * 1, 4 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * -1 * Math.floor(1.1 / 1.0), 2 * -1 * Math.floor(2.6 / 2.7),
                            3 * -1 * Math.floor(3 / 3), 4 * -1 * Math.floor(5.9 / 5.8)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([0.5, 0.3, 0.7, 0.91], [2, 2]);
                    b = tf.tensor2d([0.2, 0.4, 0.7, 0.15], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.mod(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1, 2 * 1, 3 * 1, 4 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * -1 * Math.floor(0.5 / 0.2), 2 * -1 * Math.floor(0.3 / 0.4),
                            3 * -1 * Math.floor(0.7 / 0.7), 4 * -1 * Math.floor(0.91 / 0.15)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradients: broadcasts scalar and Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(0.7);
                    b = tf.tensor1d([0.2, 0.3, 0.4, 0.5]);
                    dy = tf.tensor1d([1, 2, 3, 4]);
                    grads = tf.grads(function (a, b) { return tf.mod(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 + 2 + 3 + 4]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * -1 * Math.floor(0.7 / 0.2), 2 * -1 * Math.floor(0.7 / 0.3),
                            3 * -1 * Math.floor(0.7 / 0.4), 4 * -1 * Math.floor(0.7 / 0.5)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasts Tensor1D and Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([0.5, 0.3]);
                    b = tf.tensor2d([0.2, 0.4, 0.7, 0.15], [2, 2]);
                    dy = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.mod(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    expect(da.dtype).toEqual('float32');
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1 + 3 * 1, 2 * 1 + 4 * 1]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [
                            1 * -1 * Math.floor(0.5 / 0.2), 2 * -1 * Math.floor(0.3 / 0.4),
                            3 * -1 * Math.floor(0.5 / 0.7), 4 * -1 * Math.floor(0.3 / 0.15)
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.mod({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'mod' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.mod(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'mod' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[0.5, 3], [-0.1, -4]];
                    b = [[0.2, 0.4], [0.25, 0.15]];
                    result = tf.mod(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.1, 0.2, 0.15, 0.05]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.mod('q', 3); })
            .toThrowError(/Argument 'a' passed to 'mod' must be numeric/);
        expect(function () { return tf.mod(3, 'q'); })
            .toThrowError(/Argument 'b' passed to 'mod' must be numeric/);
    });
});
jasmine_util_1.describeWithFlags('atan2', jasmine_util_1.ALL_ENVS, function () {
    it('same shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, bValues, a, c, r, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
                    bValues = [1.0, 2.5, 3.5, 4.5, 2.0, 5.0];
                    a = tf.tensor2d(aValues, [2, 3]);
                    c = tf.tensor2d(bValues, [2, 3]);
                    r = tf.atan2(a, c);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atan2(aValues[i], bValues[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('uses chaining', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, bValues, a, b, r, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
                    bValues = [1.0, 2.5, 3.5, 4.5, 2.0, 5.0];
                    a = tf.tensor2d(aValues, [2, 3]);
                    b = tf.tensor2d(bValues, [2, 3]);
                    r = a.atan2(b);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atan2(aValues[i], bValues[i]);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1.0, 2.0], [2, 1]);
                    c = tf.tensor2d([3.0, NaN], [2, 1]);
                    r = tf.atan2(a, c);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [Math.atan2(1.0, 3.0), NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting same rank Tensors different shape', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, bValues, a, b, result, expected, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1.0, 2.0, -3.0, -4.0];
                    bValues = [2.0, 3.0];
                    a = tf.tensor2d(aValues, [2, 2]);
                    b = tf.tensor2d(bValues, [2, 1]);
                    result = tf.atan2(a, b);
                    expect(result.shape).toEqual([2, 2]);
                    expected = [
                        Math.atan2(1.0, 2.0), Math.atan2(2.0, 2.0), Math.atan2(-3.0, 3.0),
                        Math.atan2(-4.0, 3.0)
                    ];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed tensors of different shapes', function () {
        var a = tf.tensor2d([1, 2, -3, -4, 5, 6], [2, 3]);
        var b = tf.tensor2d([5, 3, 4, -7], [2, 2]);
        expect(function () { return tf.atan2(a, b); }).toThrowError();
        expect(function () { return tf.atan2(b, a); }).toThrowError();
    });
    it('upcasts when dtypes dont match', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, bValues, a, c, r, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0];
                    bValues = [1, 2, 3, 4, 2, 5];
                    a = tf.tensor2d(aValues, [2, 3], 'float32');
                    c = tf.tensor2d(bValues, [2, 3], 'int32');
                    r = tf.atan2(a, c);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atan2(aValues[i], bValues[i]);
                    }
                    expect(r.shape).toEqual([2, 3]);
                    expect(r.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('atan2 of scalar and array propagates NaNs', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, r, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.scalar(NaN);
                    a = tf.tensor2d([1, 2, 3], [1, 3]);
                    r = tf.atan2(c, a);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [NaN, NaN, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('atan2 of scalar and array', function () { return __awaiter(_this, void 0, void 0, function () {
        var aValues, a, c, r, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    aValues = [1, 2, 3, 4, 5, 6];
                    a = tf.tensor2d(aValues, [2, 3]);
                    c = tf.scalar(2);
                    r = tf.atan2(a, c);
                    expected = [];
                    for (i = 0; i < a.size; i++) {
                        expected[i] = Math.atan2(aValues[i], 2);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2);
                    dy = tf.scalar(4);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4 * 2 / 29]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [4 * -5 / 29]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(5);
                    b = tf.scalar(2);
                    dy = tf.scalar(4);
                    grads = tf.grads(function (a, b) { return tf.atan2(a.clone(), b.clone()).clone(); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [4 * 2 / 29]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [4 * -5 / 29]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([1, 10, 20]);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(db.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 3 / 10, 10 * 4 / 20, 20 * 5 / 34]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-1 * 1 / 10, -10 * 2 / 20, -20 * 3 / 34]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 1, 2, 3], [2, 2]);
                    b = tf.tensor2d([1, 3, 4, 5], [2, 2]);
                    dy = tf.tensor2d([1, 10, 15, 20], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [1 * 1 / 10, 10 * 3 / 10, 15 * 4 / 20, 20 * 5 / 34]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [-1 * 3 / 10, -10 * 1 / 10, -15 * 2 / 20, -20 * 3 / 34]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: scalar / Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(2);
                    b = tf.tensor1d([3, 4, 5]);
                    dy = tf.tensor1d([6, 7, 8]);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 * 3 / 13 + 7 * 4 / 20 + 8 * 5 / 29]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-6 * 2 / 13, -7 * 2 / 20, -8 * 2 / 29]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    b = tf.scalar(2);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 * 2 / 8, 7 * 2 / 13, 8 * 2 / 20, 9 * 2 / 29]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(),
                        [-6 * 2 / 8 + -7 * 3 / 13 + -8 * 4 / 20 + -9 * 5 / 29]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient: Tensor2D / Tensor2D w/ broadcast', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, grads, _a, da, db, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([3, 4], [2, 1]);
                    b = tf.tensor2d([[2, 3], [4, 5]], [2, 2]);
                    dy = tf.tensor2d([[6, 7], [8, 9]], [2, 2]);
                    grads = tf.grads(function (a, b) { return tf.atan2(a, b); });
                    _a = grads([a, b], dy), da = _a[0], db = _a[1];
                    expect(da.shape).toEqual(a.shape);
                    expect(da.dtype).toEqual('float32');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [6 * 2 / 13 + 7 * 3 / 18, 8 * 4 / 32 + 9 * 5 / 41]]);
                    expect(db.shape).toEqual(b.shape);
                    expect(db.dtype).toEqual('float32');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [-6 * 3 / 13, -7 * 3 / 18, -8 * 4 / 32, -9 * 4 / 41]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.atan2({}, tf.scalar(1)); })
            .toThrowError(/Argument 'a' passed to 'atan2' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.atan2(tf.scalar(1), {}); })
            .toThrowError(/Argument 'b' passed to 'atan2' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, c, r, expected, i, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[1, 2, 3], [4, 5, 6]];
                    c = 2;
                    r = tf.atan2(a, c);
                    expected = [];
                    for (i = 0; i < 6; i++) {
                        expected[i] = Math.atan2(i + 1, 2);
                    }
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, r.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), expected]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws for string tensor', function () {
        expect(function () { return tf.atan2('q', 3); })
            .toThrowError(/Argument 'a' passed to 'atan2' must be numeric/);
        expect(function () { return tf.atan2(3, 'q'); })
            .toThrowError(/Argument 'b' passed to 'atan2' must be numeric/);
    });
});
//# sourceMappingURL=binary_ops_test.js.map