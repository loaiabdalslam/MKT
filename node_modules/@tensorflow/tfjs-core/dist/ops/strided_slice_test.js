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
jasmine_util_1.describeWithFlags('stridedSlice', jasmine_util_1.ALL_ENVS, function () {
    it('stridedSlice should fail if new axis mask is set', function () {
        var tensor = tf.tensor1d([0, 1, 2, 3]);
        expect(function () { return tf.stridedSlice(tensor, [0], [3], [2], 0, 0, 0, 1); }).toThrow();
    });
    it('stridedSlice should fail if ellipsis mask is set', function () {
        var tensor = tf.tensor1d([0, 1, 2, 3]);
        expect(function () { return tf.stridedSlice(tensor, [0], [3], [2], 0, 0, 1); }).toThrow();
    });
    it('stridedSlice should support 1d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [0], [3], [2]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [0], [3], [2]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice with 1d tensor should be used by tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([0, 1, 2, 3]);
                    output = t.stridedSlice([0], [3], [2]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor empty result', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [10], [3], [2]);
                    expect(output.shape).toEqual([0]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor negative begin', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-3], [3], [1]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor out of range begin', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-5], [3], [1]);
                    expect(output.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor negative end', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [1], [-2], [1]);
                    expect(output.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor out of range end', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-3], [5], [1]);
                    expect(output.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor begin mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [1], [3], [1], 1);
                    expect(output.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor nagtive begin and stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-2], [-3], [-1]);
                    expect(output.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor' +
        ' out of range begin and negative stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [5], [-2], [-1]);
                    expect(output.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor nagtive end and stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [2], [-4], [-1]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor' +
        ' out of range end and negative stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-3], [-5], [-1]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor end mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [1], [3], [1], 0, 1);
                    expect(output.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor shrink axis mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [1], [3], [1], 0, 0, 0, 0, 1);
                    expect(output.shape).toEqual([]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor negative stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [-1], [-4], [-1]);
                    expect(output.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor even length stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [0], [2], [2]);
                    expect(output.shape).toEqual([1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 1d tensor odd length stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor1d([0, 1, 2, 3]);
                    output = tf.stridedSlice(tensor, [0], [3], [2]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor identity', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [0, 0], [2, 3], [1, 1]);
                    expect(output.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, 0], [2, 2], [1, 1]);
                    expect(output.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor strides', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [0, 0], [2, 3], [2, 2]);
                    expect(output.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice with 2d tensor should be used by tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = t.stridedSlice([1, 0], [2, 2], [1, 1]);
                    expect(output.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor negative strides', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, -1], [2, -4], [2, -1]);
                    expect(output.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor begin mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, 0], [2, 2], [1, 1], 1);
                    expect(output.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor shrink mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, 0], [2, 2], [1, 1], 0, 0, 0, 0, 1);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor end mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, 0], [2, 2], [1, 1], 0, 2);
                    expect(output.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor' +
        ' negative strides and begin mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, -2], [2, -4], [1, -1], 2);
                    expect(output.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 2d tensor' +
        ' negative strides and end mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    output = tf.stridedSlice(tensor, [1, -2], [2, -3], [1, -1], 0, 2);
                    expect(output.shape).toEqual([1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d tensor identity', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
                    output = tf.stridedSlice(tensor, [0, 0, 0], [2, 3, 2], [1, 1, 1]);
                    expect(output.shape).toEqual([2, 3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d tensor negative stride', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
                    output = tf.stridedSlice(tensor, [-1, -1, -1], [-3, -4, -3], [-1, -1, -1]);
                    expect(output.shape).toEqual([2, 3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d tensor strided 2', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
                    output = tf.stridedSlice(tensor, [0, 0, 0], [2, 3, 2], [2, 2, 2]);
                    expect(output.shape).toEqual([1, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d tensor shrink mask', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 2]);
                    output = tf.stridedSlice(tensor, [0, 0, 0], [2, 3, 2], [1, 1, 1], 0, 0, 0, 0, 1);
                    expect(output.shape).toEqual([3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d with smaller length of begin array', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 1, 2]);
                    output = tf.stridedSlice(tensor, [1, 0], [2, 3, 1, 2], [1, 1, 1, 1], 0, 0, 0, 0, 0);
                    expect(output.shape).toEqual([1, 3, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 8, 9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d with smaller length of end array', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 1, 2]);
                    output = tf.stridedSlice(tensor, [1, 0, 0, 0], [2, 3], [1, 1, 1, 1], 0, 0, 0, 0, 0);
                    expect(output.shape).toEqual([1, 3, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 8, 9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should support 3d with smaller length of stride array', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [2, 3, 1, 2]);
                    output = tf.stridedSlice(tensor, [1, 0, 0, 0], [2, 3, 1, 2], [1, 1], 0, 0, 0, 0, 0);
                    expect(output.shape).toEqual([1, 3, 1, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 8, 9, 10, 11, 12]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('stridedSlice should throw when passed a non-tensor', function () {
        expect(function () { return tf.stridedSlice({}, [0], [0], [1]); })
            .toThrowError(/Argument 'x' passed to 'stridedSlice' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var tensor, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tensor = [0, 1, 2, 3];
                    output = tf.stridedSlice(tensor, [0], [3], [2]);
                    expect(output.shape).toEqual([2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=strided_slice_test.js.map