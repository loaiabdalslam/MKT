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
jasmine_util_1.describeWithFlags('pad1d', jasmine_util_1.ALL_ENVS, function () {
    it('Should pad 1D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4, 5, 6], 'int32');
                    b = tf.pad1d(a, [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 2, 3, 4, 5, 6, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not pad 1D arrays with 0s', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4], 'int32');
                    b = tf.pad1d(a, [0, 0]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle padding with custom value', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3, 4], 'int32');
                    b = tf.pad1d(a, [2, 3], 9);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [9, 9, 1, 2, 3, 4, 9, 9, 9]]);
                    a = tf.tensor1d([1, 2, 3, 4]);
                    b = tf.pad1d(a, [2, 1], 1.1);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1.1, 1.1, 1, 2, 3, 4, 1.1]]);
                    a = tf.tensor1d([1, 2, 3, 4]);
                    b = tf.pad1d(a, [2, 1], 1);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 2, 3, 4, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle NaNs with 1D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, NaN, 2, NaN]);
                    b = tf.pad1d(a, [1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, NaN, 2, NaN, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle invalid paddings', function () {
        var a = tf.tensor1d([1, 2, 3, 4], 'int32');
        var f = function () {
            // tslint:disable-next-line:no-any
            tf.pad1d(a, [2, 2, 2]);
        };
        expect(f).toThrowError();
    });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    dy = tf.tensor1d([10, 20, 30, 40, 50, 60]);
                    da = tf.grad(function (a) { return tf.pad1d(a, [2, 1]); })(a, dy);
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [30, 40, 50]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    dy = tf.tensor1d([10, 20, 30, 40, 50, 60]);
                    da = tf.grad(function (a) { return tf.pad1d(a.clone(), [2, 1]).clone(); })(a, dy);
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [30, 40, 50]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 2, 3, 4, 5, 6];
                    b = tf.pad1d(a, [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 2, 3, 4, 5, 6, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('pad2d', jasmine_util_1.ALL_ENVS, function () {
    it('Should pad 2D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1], [2]], [2, 1], 'int32');
                    b = tf.pad2d(a, [[1, 1], [1, 1]]);
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0]]);
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3], 'int32');
                    b = tf.pad2d(a, [[2, 2], [1, 1]]);
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    // 0, 1, 2, 3, 0
                    // 0, 4, 5, 6, 0
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    // 0, 1, 2, 3, 0
                    // 0, 4, 5, 6, 0
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    _b.apply(void 0, [_c.sent(), [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0,
                            0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should not pad 2D arrays with 0s', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3], 'int32');
                    b = tf.pad2d(a, [[0, 0], [0, 0]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle padding with custom value', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3], 'int32');
                    b = tf.pad2d(a, [[1, 1], [1, 1]], 10);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [
                            10, 10, 10, 10, 10, 10, 1, 2, 3, 10,
                            10, 4, 5, 6, 10, 10, 10, 10, 10, 10
                        ]]);
                    a = tf.tensor2d([[1], [1]], [2, 1]);
                    b = tf.pad2d(a, [[1, 1], [1, 1]], -2.1);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _b.apply(void 0, [_d.sent(),
                        [-2.1, -2.1, -2.1, -2.1, 1, -2.1, -2.1, 1, -2.1, -2.1, -2.1, -2.1]]);
                    a = tf.tensor2d([[1], [1]], [2, 1]);
                    b = tf.pad2d(a, [[1, 1], [1, 1]], -2);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [-2, -2, -2, -2, 1, -2, -2, 1, -2, -2, -2, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle NaNs with 2D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, NaN], [1, NaN]], [2, 2]);
                    b = tf.pad2d(a, [[1, 1], [1, 1]]);
                    // 0, 0, 0,   0
                    // 0, 1, NaN, 0
                    // 0, 1, NaN, 0
                    // 0, 0, 0,   0
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    // 0, 0, 0,   0
                    // 0, 1, NaN, 0
                    // 0, 1, NaN, 0
                    // 0, 0, 0,   0
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 0, 1, NaN, 0, 0, 1, NaN, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Should handle invalid paddings', function () {
        var a = tf.tensor2d([[1], [2]], [2, 1], 'int32');
        var f = function () {
            // tslint:disable-next-line:no-any
            tf.pad2d(a, [[2, 2, 2], [1, 1, 1]]);
        };
        expect(f).toThrowError();
    });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2], [3, 4]]);
                    dy = tf.tensor2d([[0, 0, 0], [10, 20, 0], [30, 40, 0]], [3, 3]);
                    da = tf.grad(function (a) { return tf.pad2d(a, [[1, 0], [0, 1]]); })(a, dy);
                    expect(da.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 20, 30, 40]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [[1, 2, 3], [4, 5, 6]];
                    b = tf.pad2d(a, [[0, 0], [0, 0]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('pad4d', jasmine_util_1.ALL_ENVS, function () {
    it('Should pad 4D arrays', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor4d([[[[9]]]], [1, 1, 1, 1], 'int32');
                    b = tf.pad4d(a, [[0, 0], [1, 1], [1, 1], [0, 0]]);
                    expected = tf.tensor4d([[[[0], [0], [0]], [[0], [9], [0]], [[0], [0], [0]]]], [1, 3, 3, 1], 'int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(b.dtype).toBe('int32');
                    expect(b.shape).toEqual([1, 3, 3, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not leak memory', function () {
        var a = tf.tensor4d([[[[9]]]], [1, 1, 1, 1], 'int32');
        // The first call to pad may create and keeps internal singleton tensors.
        // Subsequent calls should always create exactly one new tensor.
        tf.pad4d(a, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        // Count before real call.
        var numTensors = tf.memory().numTensors;
        tf.pad4d(a, [[0, 0], [1, 1], [1, 1], [0, 0]]);
        expect(tf.memory().numTensors).toEqual(numTensors + 1);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = [[[[9]]]];
                    b = tf.pad4d(a, [[0, 0], [1, 1], [1, 1], [0, 0]]);
                    expected = tf.tensor4d([[[[0], [0], [0]], [[0], [9], [0]], [[0], [0], [0]]]], [1, 3, 3, 1], 'float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(b.dtype).toBe('float32');
                    expect(b.shape).toEqual([1, 3, 3, 1]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('pad', jasmine_util_1.ALL_ENVS, function () {
    it('Pad tensor2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1], [2]], [2, 1], 'int32');
                    b = tf.pad(a, [[1, 1], [1, 1]]);
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0]]);
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]], [2, 3], 'int32');
                    b = tf.pad(a, [[2, 2], [1, 1]]);
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    // 0, 1, 2, 3, 0
                    // 0, 4, 5, 6, 0
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    // 0, 1, 2, 3, 0
                    // 0, 4, 5, 6, 0
                    // 0, 0, 0, 0, 0
                    // 0, 0, 0, 0, 0
                    _b.apply(void 0, [_c.sent(), [
                            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 0,
                            0, 4, 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.pad({}, [[0, 0]]); })
            .toThrowError(/Argument 'x' passed to 'pad' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [[1], [2]];
                    res = tf.pad(x, [[1, 1], [1, 1]]);
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    // 0, 0, 0
                    // 0, 1, 0
                    // 0, 2, 0
                    // 0, 0, 0
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=pad_test.js.map