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
jasmine_util_1.describeWithFlags('reverse1d', jasmine_util_1.ALL_ENVS, function () {
    it('reverse a 1D array', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    result = tf.reverse1d(input);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 4, 3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 1D array, even length', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4]);
                    result = tf.reverse1d(input);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 2, 3]);
                    dy = tf.tensor1d([10, 20, 30]);
                    da = tf.grad(function (a) { return tf.reverse1d(a); })(a, dy);
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [30, 20, 10]]);
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
                    dy = tf.tensor1d([10, 20, 30]);
                    da = tf.grad(function (a) { return tf.reverse1d(a.clone()).clone(); })(a, dy);
                    expect(da.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [30, 20, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [1, 2, 3, 4, 5];
                    result = tf.reverse1d(input);
                    expect(result.shape).toEqual([5]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 4, 3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('reverse2d', jasmine_util_1.ALL_ENVS, function () {
    it('reverse a 2D array at axis [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = [0];
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    result = tf.reverse2d(a, axis);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5, 6, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 2D array at axis [1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = [1];
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    result = tf.reverse2d(a, axis);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2, 1, 6, 5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 2D array odd rows and columns at axis [0, 1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = [0, 1];
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], [3, 5]);
                    result = tf.reverse2d(a, axis);
                    expect(result.shape).toEqual(a.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error with invalid input', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor1d([1, 20, 300, 4]);
        expect(function () { return tf.reverse2d(x, [0]); }).toThrowError();
    });
    it('throws error with invalid axis param', function () {
        var x = tf.tensor2d([1, 20, 300, 4], [1, 4]);
        expect(function () { return tf.reverse2d(x, [2]); }).toThrowError();
        expect(function () { return tf.reverse2d(x, [-3]); }).toThrowError();
    });
    it('throws error with non integer axis param', function () {
        var x = tf.tensor2d([1, 20, 300, 4], [1, 4]);
        expect(function () { return tf.reverse2d(x, [0.5]); }).toThrowError();
    });
    it('grad', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
                    dy = tf.tensor2d([[10, 20, 30], [40, 50, 60]]);
                    da = tf.grad(function (a) { return tf.reverse2d(a); })(a, dy);
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [60, 50, 40, 30, 20, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad with reverse(axis=0)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
                    dy = tf.tensor2d([[10, 20, 30], [40, 50, 60]]);
                    da = tf.grad(function (a) { return tf.reverse2d(a, 0); })(a, dy);
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [40, 50, 60, 10, 20, 30]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad with reverse(axis=1)', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, dy, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1, 2, 3], [4, 5, 6]]);
                    dy = tf.tensor2d([[10, 20, 30], [40, 50, 60]]);
                    da = tf.grad(function (a) { return tf.reverse2d(a, 1); })(a, dy);
                    expect(da.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [30, 20, 10, 60, 50, 40]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var axis, a, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    axis = [0];
                    a = [[1, 2, 3], [4, 5, 6]];
                    result = tf.reverse2d(a, axis);
                    expect(result.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5, 6, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('reverse3d', jasmine_util_1.ALL_ENVS, function () {
    // [
    //   [
    //     [0,  1,  2,  3],
    //     [4,  5,  6,  7],
    //     [8,  9,  10, 11]
    //   ],
    //   [
    //     [12, 13, 14, 15],
    //     [16, 17, 18, 19],
    //     [20, 21, 22, 23]
    //   ]
    // ]
    var shape = [2, 3, 4];
    var data = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
    ];
    it('reverse a 3D array at axis [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [0]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 3D array at axis [1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [1]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3,
                            20, 21, 22, 23, 16, 17, 18, 19, 12, 13, 14, 15
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 3D array at axis [2]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [2]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8,
                            15, 14, 13, 12, 19, 18, 17, 16, 23, 22, 21, 20
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 3D array at axis [0, 1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [0, 1]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            20, 21, 22, 23, 16, 17, 18, 19, 12, 13, 14, 15,
                            8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 3D array at axis [0, 2]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [0, 2]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            15, 14, 13, 12, 19, 18, 17, 16, 23, 22, 21, 20,
                            3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 3D array at axis [1, 2]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d(data, shape);
                    result = tf.reverse3d(input, [1, 2]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0,
                            23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error with invalid input', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor2d([1, 20, 300, 4], [1, 4]);
        expect(function () { return tf.reverse3d(x, [1]); }).toThrowError();
    });
    it('throws error with invalid axis param', function () {
        var x = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
        expect(function () { return tf.reverse3d(x, [3]); }).toThrowError();
        expect(function () { return tf.reverse3d(x, [-4]); }).toThrowError();
    });
    it('throws error with non integer axis param', function () {
        var x = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
        expect(function () { return tf.reverse3d(x, [0.5]); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [[[1], [2], [3]], [[4], [5], [6]]];
                    result = tf.reverse3d(input, [0]);
                    expect(result.shape).toEqual([2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5, 6, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('reverse4d', jasmine_util_1.ALL_ENVS, function () {
    // [
    //   [
    //     [
    //       [0,  1,  2,  3],
    //       [4,  5,  6,  7],
    //       [8,  9,  10, 11]
    //     ],
    //     [
    //       [12, 13, 14, 15],
    //       [16, 17, 18, 19],
    //       [20, 21, 22, 23]
    //     ]
    //   ],
    //   [
    //     [
    //       [24, 25, 26, 27],
    //       [28, 29, 30, 31],
    //       [32, 33, 34, 35]
    //     ],
    //     [
    //       [36, 37, 38, 39],
    //       [40, 41, 42, 43],
    //       [44, 45, 46, 47]
    //     ]
    //   ],
    //   [
    //     [
    //       [48, 49, 50, 51],
    //       [52, 53, 54, 55],
    //       [56, 57, 58, 59]
    //     ],
    //     [
    //       [60, 61, 62, 63],
    //       [64, 65, 66, 67],
    //       [68, 69, 70, 71]
    //     ]
    //   ]
    // ]
    var shape = [3, 2, 3, 4];
    var data = [
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
        36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
        54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71
    ];
    it('reverse a 4D array at axis [0]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [0]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
                            66, 67, 68, 69, 70, 71, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
                            36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 0, 1, 2, 3, 4, 5,
                            6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 4D array at axis [1]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [1]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5,
                            6, 7, 8, 9, 10, 11, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47,
                            24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 60, 61, 62, 63, 64, 65,
                            66, 67, 68, 69, 70, 71, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 4D array at axis [2]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [2]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            8, 9, 10, 11, 4, 5, 6, 7, 0, 1, 2, 3, 20, 21, 22, 23, 16, 17,
                            18, 19, 12, 13, 14, 15, 32, 33, 34, 35, 28, 29, 30, 31, 24, 25, 26, 27,
                            44, 45, 46, 47, 40, 41, 42, 43, 36, 37, 38, 39, 56, 57, 58, 59, 52, 53,
                            54, 55, 48, 49, 50, 51, 68, 69, 70, 71, 64, 65, 66, 67, 60, 61, 62, 63
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 4D array at axis [3]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [3]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12, 19, 18,
                            17, 16, 23, 22, 21, 20, 27, 26, 25, 24, 31, 30, 29, 28, 35, 34, 33, 32,
                            39, 38, 37, 36, 43, 42, 41, 40, 47, 46, 45, 44, 51, 50, 49, 48, 55, 54,
                            53, 52, 59, 58, 57, 56, 63, 62, 61, 60, 67, 66, 65, 64, 71, 70, 69, 68
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 4D array at axis [0, 2]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [0, 2]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            56, 57, 58, 59, 52, 53, 54, 55, 48, 49, 50, 51, 68, 69, 70, 71, 64, 65,
                            66, 67, 60, 61, 62, 63, 32, 33, 34, 35, 28, 29, 30, 31, 24, 25, 26, 27,
                            44, 45, 46, 47, 40, 41, 42, 43, 36, 37, 38, 39, 8, 9, 10, 11, 4, 5,
                            6, 7, 0, 1, 2, 3, 20, 21, 22, 23, 16, 17, 18, 19, 12, 13, 14, 15
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reverse a 4D array at axis [1, 3]', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d(data, shape);
                    result = tf.reverse4d(input, [1, 3]);
                    expect(result.shape).toEqual(input.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            15, 14, 13, 12, 19, 18, 17, 16, 23, 22, 21, 20, 3, 2, 1, 0, 7, 6,
                            5, 4, 11, 10, 9, 8, 39, 38, 37, 36, 43, 42, 41, 40, 47, 46, 45, 44,
                            27, 26, 25, 24, 31, 30, 29, 28, 35, 34, 33, 32, 63, 62, 61, 60, 67, 66,
                            65, 64, 71, 70, 69, 68, 51, 50, 49, 48, 55, 54, 53, 52, 59, 58, 57, 56
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error with invalid input', function () {
        // tslint:disable-next-line:no-any
        var x = tf.tensor3d([1, 20, 300, 4], [1, 1, 4]);
        expect(function () { return tf.reverse4d(x, [1]); }).toThrowError();
    });
    it('throws error with invalid axis param', function () {
        var x = tf.tensor4d([1, 20, 300, 4], [1, 1, 1, 4]);
        expect(function () { return tf.reverse4d(x, [4]); }).toThrowError();
        expect(function () { return tf.reverse4d(x, [-5]); }).toThrowError();
    });
    it('throws error with non integer axis param', function () {
        var x = tf.tensor4d([1, 20, 300, 4], [1, 1, 1, 4]);
        expect(function () { return tf.reverse4d(x, [0.5]); }).toThrowError();
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [[[[1]], [[2]], [[3]]], [[[4]], [[5]], [[6]]]];
                    result = tf.reverse4d(input, [0]);
                    expect(result.shape).toEqual([2, 3, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5, 6, 1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('reverse', jasmine_util_1.ALL_ENVS, function () {
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.reverse({}); })
            .toThrowError(/Argument 'x' passed to 'reverse' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [1, 2, 3];
                    result = tf.reverse(input);
                    expect(result.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=reverse_test.js.map