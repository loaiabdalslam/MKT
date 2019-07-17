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
jasmine_util_1.describeWithFlags('logicalNot', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D.', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 1]]);
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tests chaining in Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalNot().data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 1]]);
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalNot().data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1]]);
                    a = tf.tensor1d([1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalNot().data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 1, 1]]);
                    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 1, 0, 1, 1, 1]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 1, 1, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 1]]);
                    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor6D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a, expectedResult, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor6d([1, 0, 1, 0], [2, 2, 1, 1, 1, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 1, 0, 1]]);
                    a = tf.zeros([2, 2, 2, 2, 2, 2]).cast('bool');
                    expectedResult = new Uint8Array(64).fill(1);
                    expectedResult = expectedResult.fill(1);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), expectedResult]);
                    a = tf.ones([2, 2, 2, 2, 2, 2]).cast('bool');
                    expectedResult = expectedResult.fill(0);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), expectedResult]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        expect(function () { return tf.logicalNot({}); })
            .toThrowError(/Argument 'x' passed to 'logicalNot' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 0, 0];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalNot(a).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('logicalAnd', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D.', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = tf.tensor1d([0, 1, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    b = tf.tensor1d([0, 0, 0], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([1, 1], 'bool');
                    b = tf.tensor1d([1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes', function () {
        var a = tf.tensor1d([1, 0], 'bool');
        var b = tf.tensor1d([0, 1, 0], 'bool');
        var f = function () {
            tf.logicalAnd(a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
                    b = tf.tensor2d([[0, 1, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [1]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [0, 0, 1, 0, 0, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 1, 1, 0], [2, 2, 1, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [0, 0, 1, 0]]);
                    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [true, false, false];
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalAnd(b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.logicalAnd({}, tf.scalar(1, 'bool')); })
            .toThrowError(/Argument 'a' passed to 'logicalAnd' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.logicalAnd(tf.scalar(1, 'bool'), {}); })
            .toThrowError(/Argument 'b' passed to 'logicalAnd' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 0, 0, 1];
                    b = [0, 1, 0, 1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalAnd(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('logicalOr', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D.', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = tf.tensor1d([0, 1, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    b = tf.tensor1d([0, 0, 0], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([1, 1], 'bool');
                    b = tf.tensor1d([1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes', function () {
        var a = tf.tensor1d([1, 0], 'bool');
        var b = tf.tensor1d([0, 1, 0], 'bool');
        var f = function () {
            tf.logicalOr(a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 1, 0, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 1, 0, 0], [2, 2, 1, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 1, 0]]);
                    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 0, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [true, false, false];
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalOr(b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.logicalOr({}, tf.scalar(1, 'bool')); })
            .toThrowError(/Argument 'a' passed to 'logicalOr' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.logicalOr(tf.scalar(1, 'bool'), {}); })
            .toThrowError(/Argument 'b' passed to 'logicalOr' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 0, 0, 1];
                    b = [0, 1, 0, 1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalOr(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('logicalXor', jasmine_util_1.ALL_ENVS, function () {
    it('Tensor1D.', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = tf.tensor1d([0, 1, 0], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0]]);
                    a = tf.tensor1d([0, 0, 0], 'bool');
                    b = tf.tensor1d([0, 0, 0], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0]]);
                    a = tf.tensor1d([1, 1], 'bool');
                    b = tf.tensor1d([1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('mismatched Tensor1D shapes', function () {
        var a = tf.tensor1d([1, 0], 'bool');
        var b = tf.tensor1d([0, 1, 0], 'bool');
        var f = function () {
            tf.logicalXor(a, b);
        };
        expect(f).toThrowError();
    });
    // Tensor2D:
    it('Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor2d([[1, 0, 1], [0, 0, 0]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 1, 0, 1, 0]]);
                    a = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [1, 1, 1]], [2, 3], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor2D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([[1], [0]], [2, 1], 'bool');
                    b = tf.tensor2d([[0, 0, 0], [0, 1, 0]], [2, 3], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 1, 0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor3D:
    it('Tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 0, 0, 1, 0, 0]]);
                    a = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    b = tf.tensor3d([[[0], [0], [0]], [[1], [1], [1]]], [2, 3, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [0, 0, 0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor3D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor3d([[[1, 0], [0, 0], [1, 1]], [[0, 0], [0, 1], [0, 0]]], [2, 3, 2], 'bool');
                    b = tf.tensor3d([[[0], [0], [1]], [[1], [0], [0]]], [2, 3, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Tensor4D:
    it('Tensor4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 1, 1, 0], [2, 2, 1, 1], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [1, 1, 0, 0]]);
                    a = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([0, 0, 0, 0], [2, 2, 1, 1], 'bool');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    a = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([1, 1, 1, 1], [2, 2, 1, 1], 'bool');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [0, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('broadcasting Tensor4D shapes', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor4d([1, 0, 1, 0], [2, 2, 1, 1], 'bool');
                    b = tf.tensor4d([[[[1, 0]], [[0, 0]]], [[[0, 0]], [[1, 1]]]], [2, 2, 1, 2], 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0, 0, 1, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [true, false, false];
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([1, 0, 0], 'bool');
                    b = [false, true, false];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.logicalXor(b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.logicalXor({}, tf.scalar(1, 'bool')); })
            .toThrowError(/Argument 'a' passed to 'logicalXor' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.logicalXor(tf.scalar(1, 'bool'), {}); })
            .toThrowError(/Argument 'b' passed to 'logicalXor' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = [1, 0, 0, 1];
                    b = [0, 1, 0, 1];
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.logicalXor(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('where', jasmine_util_1.ALL_ENVS, function () {
    it('Scalars.', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(10);
                    b = tf.scalar(20);
                    c = tf.scalar(1, 'bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Invalid condition type', function () {
        var c = tf.tensor1d([1, 0, 1, 0], 'int32');
        var a = tf.tensor1d([10, 10, 10, 10], 'bool');
        var b = tf.tensor1d([20, 20, 20, 20], 'bool');
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1, 0], 'bool');
                    a = tf.tensor1d([10, 10, 10, 10]);
                    b = tf.tensor1d([20, 20, 20, 20]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 20, 10, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor1D different a/b shapes', function () {
        var c = tf.tensor1d([1, 0, 1, 0], 'bool');
        var a = tf.tensor1d([10, 10, 10]);
        var b = tf.tensor1d([20, 20, 20, 20]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
        c = tf.tensor1d([1, 0, 1, 0], 'bool');
        a = tf.tensor1d([10, 10, 10, 10]);
        b = tf.tensor1d([20, 20, 20]);
        f = function () {
            tf.where(c, a, b);
        };
    });
    it('Tensor1D different condition/a shapes', function () {
        var c = tf.tensor1d([1, 0, 1, 0], 'bool');
        var a = tf.tensor1d([10, 10, 10]);
        var b = tf.tensor1d([20, 20, 20]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.tensor2d([[1, 0], [0, 1]], [2, 2], 'bool');
                    a = tf.tensor2d([[10, 10], [10, 10]], [2, 2]);
                    b = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 5, 5, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor2D different a/b shapes', function () {
        var c = tf.tensor2d([[1, 1], [0, 0]], [2, 2], 'bool');
        var a = tf.tensor2d([[5, 5, 5], [5, 5, 5]], [2, 3]);
        var b = tf.tensor2d([[4, 4], [4, 4]], [2, 2]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
        c = tf.tensor2d([[1, 1], [0, 0]], [2, 2], 'bool');
        a = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
        b = tf.tensor2d([[4, 4, 4], [4, 4, 4]], [2, 3]);
        f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D different condition/a shapes', function () {
        var c = tf.tensor2d([[1, 0], [0, 1]], [2, 2], 'bool');
        var a = tf.tensor2d([[10, 10, 10], [10, 10, 10]], [2, 3]);
        var b = tf.tensor2d([[5, 5, 5], [5, 5, 5]], [2, 3]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor2D different `a` dimension w/ condition rank=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, f, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1, 0], 'bool');
                    a = tf.tensor2d([[10, 10], [10, 10]], [2, 2]);
                    b = tf.tensor2d([[5, 5], [5, 5]], [2, 2]);
                    f = function () {
                        tf.where(c, a, b);
                    };
                    expect(f).toThrowError();
                    a = tf.tensor2d([[10], [10], [10], [10]], [4, 1]);
                    b = tf.tensor2d([[5], [5], [5], [5]], [4, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [10, 5, 10, 5]]);
                    a = tf.tensor2d([[10, 10], [10, 10], [10, 10], [10, 10]], [4, 2]);
                    b = tf.tensor2d([[5, 5], [5, 5], [5, 5], [5, 5]], [4, 2]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [10, 10, 5, 5, 10, 10, 5, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
                    a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
                    b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [5, 3, 5, 3, 3, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor3D different a/b shapes', function () {
        var c = tf.tensor3d([[[1], [0], [1]], [[0], [0], [0]]], [2, 3, 1], 'bool');
        var a = tf.tensor3d([[[5], [5]], [[5], [5]]], [2, 2, 1]);
        var b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
        a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
        b = tf.tensor3d([[[3], [3]], [[3], [3]]], [2, 2, 1]);
        f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor3D different condition/a shapes', function () {
        var c = tf.tensor3d([[[1], [0]], [[0], [0]]], [2, 2, 1], 'bool');
        var a = tf.tensor3d([[[5], [5], [5]], [[5], [5], [5]]], [2, 3, 1]);
        var b = tf.tensor3d([[[3], [3], [3]], [[3], [3], [3]]], [2, 3, 1]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor3D different `a` dimension w/ condition rank=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, f, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1, 0], 'bool');
                    a = tf.tensor3d([[[9, 9], [9, 9]], [[9, 9], [9, 9]]], [2, 2, 2]);
                    b = tf.tensor3d([[[8, 8], [8, 8]], [[8, 8], [8, 8]]], [2, 2, 2]);
                    f = function () {
                        tf.where(c, a, b);
                    };
                    expect(f).toThrowError();
                    a = tf.tensor3d([[[9]], [[9]], [[9]], [[9]]], [4, 1, 1]);
                    b = tf.tensor3d([[[8]], [[8]], [[8]], [[8]]], [4, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [9, 8, 9, 8]]);
                    a = tf.tensor3d([[[9], [9]], [[9], [9]], [[9], [9]], [[9], [9]]], [4, 2, 1]);
                    b = tf.tensor3d([[[8], [8]], [[8], [8]], [[8], [8]], [[8], [8]]], [4, 2, 1]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [9, 9, 8, 8, 9, 9, 8, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    c = tf.tensor4d([1, 0, 1, 1], [2, 2, 1, 1], 'bool');
                    a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
                    b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [7, 3, 7, 7]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Tensor4D different a/b shapes', function () {
        var c = tf.tensor4d([1, 0, 1, 1], [2, 2, 1, 1], 'bool');
        var a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [2, 2, 2, 1]);
        var b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
        a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
        b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 1]);
        f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor4D different condition/a shapes', function () {
        var c = tf.tensor4d([1, 0, 1, 1, 1, 0, 1, 1], [2, 2, 2, 1], 'bool');
        var a = tf.tensor4d([7, 7, 7, 7], [2, 2, 1, 1]);
        var b = tf.tensor4d([3, 3, 3, 3], [2, 2, 1, 1]);
        var f = function () {
            tf.where(c, a, b);
        };
        expect(f).toThrowError();
    });
    it('Tensor4D different `a` dimension w/ condition rank=1', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, f, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1, 0], 'bool');
                    a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [2, 2, 2, 1]);
                    b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [2, 2, 2, 1]);
                    f = function () {
                        tf.where(c, a, b);
                    };
                    expect(f).toThrowError();
                    a = tf.tensor4d([7, 7, 7, 7], [4, 1, 1, 1]);
                    b = tf.tensor4d([3, 3, 3, 3], [4, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [7, 3, 7, 3]]);
                    a = tf.tensor4d([7, 7, 7, 7, 7, 7, 7, 7], [4, 2, 1, 1]);
                    b = tf.tensor4d([3, 3, 3, 3, 3, 3, 3, 3], [4, 2, 1, 1]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [7, 7, 3, 3, 7, 7, 3, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike', function () { return __awaiter(_this, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(true, 10, 20).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('TensorLike Chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.scalar(10);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.where(true, 20).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed condition as a non-tensor', function () {
        expect(function () { return tf.where({}, tf.scalar(1, 'bool'), tf.scalar(1, 'bool')); })
            .toThrowError(/Argument 'condition' passed to 'where' must be a Tensor/);
    });
    it('throws when passed a as a non-tensor', function () {
        expect(function () { return tf.where(tf.scalar(1, 'bool'), {}, tf.scalar(1, 'bool')); })
            .toThrowError(/Argument 'a' passed to 'where' must be a Tensor/);
    });
    it('throws when passed b as a non-tensor', function () {
        expect(function () { return tf.where(tf.scalar(1, 'bool'), tf.scalar(1, 'bool'), {}); })
            .toThrowError(/Argument 'b' passed to 'where' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = 10;
                    b = 20;
                    c = 1;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.where(c, a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, dy, grads, _a, dc, da, db, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1], 'bool');
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([4, 5, 6]);
                    dy = tf.tensor1d([1, 2, 3]);
                    grads = tf.grads(function (c, a, b) { return tf.where(c, a, b); });
                    _a = grads([c, a, b], dy), dc = _a[0], da = _a[1], db = _a[2];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.data()];
                case 1:
                    _b.apply(void 0, [_e.sent(), [0, 0, 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _c.apply(void 0, [_e.sent(), [1, 0, 3]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _d.apply(void 0, [_e.sent(), [0, 2, 0]]);
                    expect(dc.shape).toEqual(c.shape);
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, dy, grads, _a, dc, da, db, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    c = tf.tensor1d([1, 0, 1], 'bool');
                    a = tf.tensor1d([1, 2, 3]);
                    b = tf.tensor1d([4, 5, 6]);
                    dy = tf.tensor1d([1, 2, 3]);
                    grads = tf.grads(function (c, a, b) { return tf.where(c.clone(), a.clone(), b.clone()).clone(); });
                    _a = grads([c, a, b], dy), dc = _a[0], da = _a[1], db = _a[2];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.data()];
                case 1:
                    _b.apply(void 0, [_e.sent(), [0, 0, 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _c.apply(void 0, [_e.sent(), [1, 0, 3]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _d.apply(void 0, [_e.sent(), [0, 2, 0]]);
                    expect(dc.shape).toEqual(c.shape);
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, dy, grads, _a, dc, da, db, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    c = tf.tensor2d([1, 0, 1, 1, 1, 0], [2, 3], 'bool');
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([7, 8, 9, 10, 11, 12], [2, 3]);
                    dy = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    grads = tf.grads(function (c, a, b) { return tf.where(c, a, b); });
                    _a = grads([c, a, b], dy), dc = _a[0], da = _a[1], db = _a[2];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.data()];
                case 1:
                    _b.apply(void 0, [_e.sent(), [0, 0, 0, 0, 0, 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _c.apply(void 0, [_e.sent(), [1, 0, 3, 4, 5, 0]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _d.apply(void 0, [_e.sent(), [0, 2, 0, 0, 0, 6]]);
                    expect(dc.shape).toEqual(c.shape);
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, dy, grads, _a, dc, da, db, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    c = tf.tensor3d([1, 1, 0, 1, 1, 0], [2, 3, 1], 'bool');
                    a = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    b = tf.tensor3d([7, 8, 9, 10, 11, 12], [2, 3, 1]);
                    dy = tf.tensor3d([1, 2, 3, 4, 5, 6], [2, 3, 1]);
                    grads = tf.grads(function (c, a, b) { return tf.where(c, a, b); });
                    _a = grads([c, a, b], dy), dc = _a[0], da = _a[1], db = _a[2];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.data()];
                case 1:
                    _b.apply(void 0, [_e.sent(), [0, 0, 0, 0, 0, 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _c.apply(void 0, [_e.sent(), [1, 2, 0, 4, 5, 0]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _d.apply(void 0, [_e.sent(), [0, 0, 3, 0, 0, 6]]);
                    expect(dc.shape).toEqual(c.shape);
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var c, a, b, dy, grads, _a, dc, da, db, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    c = tf.tensor4d([1, 1, 0, 1], [2, 2, 1, 1], 'bool');
                    a = tf.tensor4d([1, 2, 3, 4], [2, 2, 1, 1]);
                    b = tf.tensor4d([5, 6, 7, 8], [2, 2, 1, 1]);
                    dy = tf.tensor4d([1, 2, 3, 4], [2, 2, 1, 1]);
                    grads = tf.grads(function (c, a, b) { return tf.where(c, a, b); });
                    _a = grads([c, a, b], dy), dc = _a[0], da = _a[1], db = _a[2];
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dc.data()];
                case 1:
                    _b.apply(void 0, [_e.sent(), [0, 0, 0, 0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _c.apply(void 0, [_e.sent(), [1, 2, 0, 4]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _d.apply(void 0, [_e.sent(), [0, 0, 3, 0]]);
                    expect(dc.shape).toEqual(c.shape);
                    expect(da.shape).toEqual(a.shape);
                    expect(db.shape).toEqual(b.shape);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('whereAsync', jasmine_util_1.ALL_ENVS, function () {
    it('1d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = tf.tensor1d([true, false, true, true], 'bool');
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 1:
                    res = _b.sent();
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [0, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = tf.tensor2d([[true, false, false], [false, true, true]], [2, 3], 'bool');
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 1:
                    res = _b.sent();
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([3, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [0, 0, 1, 1, 1, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3d tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = tf.tensor3d([
                        [[true, false, false], [false, true, true]],
                        [[false, false, false], [true, true, false]]
                    ], [2, 2, 3], 'bool');
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 1:
                    res = _b.sent();
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([5, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = [true, false, true];
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 1:
                    res = _b.sent();
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws error if condition is not of type bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, ex_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    condition = tf.tensor1d([1, 0, 1]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 2:
                    _a.sent();
                    throw new Error('The line above should have thrown an error');
                case 3:
                    ex_1 = _a.sent();
                    expect(ex_1.message)
                        .toMatch(/Argument 'condition' passed to 'whereAsync' must be bool/);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('returns tensor with 0 in shape when no values are true', function () { return __awaiter(_this, void 0, void 0, function () {
        var condition, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    condition = [[[false]], [[false]], [[false]]];
                    return [4 /*yield*/, tf.whereAsync(condition)];
                case 1:
                    res = _b.sent();
                    expect(res.dtype).toBe('int32');
                    expect(res.shape).toEqual([0, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=logical_ops_test.js.map