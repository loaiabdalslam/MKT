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
var reduce_util_1 = require("./reduce_util");
jasmine_util_1.describeWithFlags('unsortedSegmentSum', jasmine_util_1.ALL_ENVS, function () {
    it('tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = tf.tensor1d([0, 2, 0, 1], 'int32');
                    numSegments = 3;
                    res = tf.unsortedSegmentSum(t, segmentIds, numSegments);
                    expect(res.shape).toEqual([numSegments]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2D', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    segmentIds = tf.tensor1d([0, 0], 'int32');
                    numSegments = 2;
                    res = tf.unsortedSegmentSum(t, segmentIds, numSegments);
                    expect(res.shape).toEqual([numSegments, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 6, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor3D', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [3, 2, 2]);
                    segmentIds = tf.tensor1d([2, 1, 2], 'int32');
                    numSegments = 3;
                    res = tf.unsortedSegmentSum(t, segmentIds, numSegments);
                    expect(res.shape).toEqual([numSegments, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0, 0, 0, 5, 6, 7, 8, 10, 12, 14, 16]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('N > than parallelization threshold, tensor1D', function () { return __awaiter(_this, void 0, void 0, function () {
        var n, values, numSegments, segmentIdValues, vals, i, t, segmentIds, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    n = reduce_util_1.PARALLELIZE_THRESHOLD * 2;
                    values = new Float32Array(n);
                    numSegments = 5;
                    segmentIdValues = new Float32Array(n);
                    vals = new Float32Array(numSegments);
                    for (i = 0; i < n; i++) {
                        values[i] = i;
                        segmentIdValues[i] = i % numSegments;
                        vals[i % numSegments] += i;
                    }
                    t = tf.tensor1d(values);
                    segmentIds = tf.tensor1d(segmentIdValues, 'int32');
                    res = tf.unsortedSegmentSum(t, segmentIds, numSegments);
                    expect(res.shape).toEqual([numSegments]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), vals]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('ignores negative segmentIds', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = tf.tensor1d([0, 2, -1, 1], 'int32');
                    numSegments = 3;
                    res = tf.unsortedSegmentSum(t, segmentIds, numSegments);
                    expect(res.shape).toEqual([numSegments]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 4, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient ignores negative segmentIds', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, dy, gradient, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = tf.tensor1d([0, 2, -1, 1], 'int32');
                    numSegments = 3;
                    dy = tf.tensor1d([11, 2, 7]);
                    gradient = tf.grad(function (a) { return tf.unsortedSegmentSum(a, segmentIds, numSegments); })(t, dy);
                    expect(gradient.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradient.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 7, 0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor1D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, dy, gradient, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = tf.tensor1d([0, 2, 0, 1], 'int32');
                    numSegments = 3;
                    dy = tf.tensor1d([11, 2, 7]);
                    gradient = tf.grad(function (a) { return tf.unsortedSegmentSum(a, segmentIds, numSegments); })(t, dy);
                    expect(gradient.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradient.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 7, 11, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('gradient with clones', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, dy, gradient, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = tf.tensor1d([0, 2, 0, 1], 'int32');
                    numSegments = 3;
                    dy = tf.tensor1d([11, 2, 7]);
                    gradient = tf.grad(function (a) { return tf.unsortedSegmentSum(a.clone(), segmentIds.clone(), numSegments)
                        .clone(); })(t, dy);
                    expect(gradient.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradient.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 7, 11, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor2D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, dy, gradient, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    segmentIds = tf.tensor1d([0, 0], 'int32');
                    numSegments = 2;
                    dy = tf.tensor2d([11, 2, 4, 5], [2, 2]);
                    gradient = tf.grad(function (a) { return tf.unsortedSegmentSum(a, segmentIds, numSegments); })(t, dy);
                    expect(gradient.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradient.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [11, 2, 11, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor3D gradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, segmentIds, numSegments, dy, gradient, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], [3, 2, 2]);
                    segmentIds = tf.tensor1d([2, 1, 2], 'int32');
                    numSegments = 3;
                    dy = tf.tensor3d([11, 2, 4, 5, 17, 31, 1, 0, -1, 14, 3, 28], [3, 2, 2]);
                    gradient = tf.grad(function (a) { return tf.unsortedSegmentSum(a, segmentIds, numSegments); })(t, dy);
                    expect(gradient.shape).toEqual(t.shape);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, gradient.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [-1, 14, 3, 28, 17, 31, 1, 0, -1, 14, 3, 28]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = [1, 2, 3, 4];
                    segmentIds = [0, 2, 0, 1];
                    numSegments = 3;
                    res = tf.unsortedSegmentSum(x, segmentIds, numSegments);
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object chained', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, segmentIds, numSegments, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([1, 2, 3, 4]);
                    segmentIds = [0, 2, 0, 1];
                    numSegments = 3;
                    res = x.unsortedSegmentSum(segmentIds, numSegments);
                    expect(res.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=segment_ops_test.js.map