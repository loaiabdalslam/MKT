"use strict";
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
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('nonMaxSuppression', jasmine_util_1.ALL_ENVS, function () {
    it('select from three clusters', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([
                        0, 0, 1, 1, 0, 0.1, 1, 1.1, 0, -0.1, 1, 0.9,
                        0, 10, 1, 11, 0, 10.1, 1, 11.1, 0, 100, 1, 101
                    ], [6, 4]);
                    scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5, 0.3]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 0, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select from three clusters flipped coordinates', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([
                        1, 1, 0, 0, 0, 0.1, 1, 1.1, 0, .9, 1, -0.1,
                        0, 10, 1, 11, 1, 10.1, 0, 11.1, 1, 101, 0, 100
                    ], [6, 4]);
                    scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5, 0.3]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 0, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select at most two boxes from three clusters', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([
                        0, 0, 1, 1, 0, 0.1, 1, 1.1, 0, -0.1, 1, 0.9,
                        0, 10, 1, 11, 0, 10.1, 1, 11.1, 0, 100, 1, 101
                    ], [6, 4]);
                    scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5, 0.3]);
                    maxOutputSize = 2;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([2]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select at most thirty boxes from three clusters', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([
                        0, 0, 1, 1, 0, 0.1, 1, 1.1, 0, -0.1, 1, 0.9,
                        0, 10, 1, 11, 0, 10.1, 1, 11.1, 0, 100, 1, 101
                    ], [6, 4]);
                    scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5, 0.3]);
                    maxOutputSize = 30;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 0, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select single box', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    scores = tf.tensor1d([0.9]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([1]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select from ten identical boxes', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    scores = tf.tensor1d([0.9]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([1]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('select from ten identical boxes', function () { return __awaiter(_this, void 0, void 0, function () {
        var numBoxes, corners, boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    numBoxes = 10;
                    corners = new Array(numBoxes)
                        .fill(0)
                        .map(function (_) { return [0, 0, 1, 1]; })
                        .reduce(function (arr, curr) { return arr.concat(curr); });
                    boxes = tf.tensor2d(corners, [numBoxes, 4]);
                    scores = tf.tensor1d(Array(numBoxes).fill(0.9));
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([1]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('inconsistent box and score shapes', function () {
        var boxes = tf.tensor2d([
            0, 0, 1, 1, 0, 0.1, 1, 1.1, 0, -0.1, 1, 0.9,
            0, 10, 1, 11, 0, 10.1, 1, 11.1, 0, 100, 1, 101
        ], [6, 4]);
        var scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5]);
        var maxOutputSize = 30;
        var iouThreshold = 0.5;
        var scoreThreshold = 0;
        expect(function () { return tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold); })
            .toThrowError(/scores has incompatible shape with boxes/);
    });
    it('invalid iou threshold', function () {
        var boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
        var scores = tf.tensor1d([0.9]);
        var maxOutputSize = 3;
        var iouThreshold = 1.2;
        var scoreThreshold = 0;
        expect(function () { return tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold); })
            .toThrowError(/iouThreshold must be in \[0, 1\]/);
    });
    it('empty input', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([], [0, 4]);
                    scores = tf.tensor1d([]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    indices = tf.image.nonMaxSuppression(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold);
                    expect(indices.shape).toEqual([0]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = [[0, 0, 1, 1], [0, 1, 1, 2]];
                    scores = [1, 2];
                    indices = tf.image.nonMaxSuppression(boxes, scores, 10);
                    expect(indices.shape).toEqual([2]);
                    expect(indices.dtype).toEqual('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('nonMaxSuppressionAsync', jasmine_util_1.ALL_ENVS, function () {
    it('select from three clusters', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, maxOutputSize, iouThreshold, scoreThreshold, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = tf.tensor2d([
                        0, 0, 1, 1, 0, 0.1, 1, 1.1, 0, -0.1, 1, 0.9,
                        0, 10, 1, 11, 0, 10.1, 1, 11.1, 0, 100, 1, 101
                    ], [6, 4]);
                    scores = tf.tensor1d([0.9, 0.75, 0.6, 0.95, 0.5, 0.3]);
                    maxOutputSize = 3;
                    iouThreshold = 0.5;
                    scoreThreshold = 0;
                    return [4 /*yield*/, tf.image.nonMaxSuppressionAsync(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold)];
                case 1:
                    indices = _b.sent();
                    expect(indices.shape).toEqual([3]);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [3, 0, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var boxes, scores, indices, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    boxes = [[0, 0, 1, 1], [0, 1, 1, 2]];
                    scores = [1, 2];
                    return [4 /*yield*/, tf.image.nonMaxSuppressionAsync(boxes, scores, 10)];
                case 1:
                    indices = _b.sent();
                    expect(indices.shape).toEqual([2]);
                    expect(indices.dtype).toEqual('int32');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, indices.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('cropAndResize', jasmine_util_1.ALL_ENVS, function () {
    it('1x1-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [1, 1], 'bilinear', 0);
                    expect(output.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1x1-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [1, 1], 'nearest', 0);
                    expect(output.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1x1Flipped-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [1, 1], 'bilinear', 0);
                    expect(output.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('1x1Flipped-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [1, 1], 'nearest', 0);
                    expect(output.shape).toEqual([1, 1, 1, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4.0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1.5, 2, 2, 2.5, 3, 3, 3.5, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'nearest', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 2, 3, 4, 4, 3, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3Flipped-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 3.5, 3, 3, 2.5, 2, 2, 1.5, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3Flipped-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'nearest', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [4, 4, 3, 4, 4, 3, 2, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3to2x2-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 3, 3, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1, 0, 0, 0.5, 0.5], [2, 4]);
                    boxInd = tf.tensor1d([0, 0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [2, 2], 'bilinear', 0);
                    expect(output.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 7, 9, 1, 2, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3to2x2-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 3, 3, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1, 0, 0, 0.5, 0.5], [2, 4]);
                    boxInd = tf.tensor1d([0, 0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [2, 2], 'nearest', 0);
                    expect(output.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 3, 7, 9, 1, 2, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3to2x2Flipped-bilinear', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 3, 3, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0, 0.5, 0.5, 0, 0], [2, 4]);
                    boxInd = tf.tensor1d([0, 0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [2, 2], 'bilinear', 0);
                    expect(output.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [9, 7, 3, 1, 5, 4, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3to2x2Flipped-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 3, 3, 1]);
                    boxes = tf.tensor2d([1, 1, 0, 0, 0.5, 0.5, 0, 0], [2, 4]);
                    boxInd = tf.tensor1d([0, 0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [2, 2], 'nearest', 0);
                    expect(output.shape).toEqual([2, 2, 2, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [9, 7, 3, 1, 5, 4, 2, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3-BoxisRectangular', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1.5], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1.75, 0, 2, 2.75, 0, 3, 3.75, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3x3-BoxisRectangular-nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1.5], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'nearest', 0);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 0, 3, 4, 0, 3, 4, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x2to3x3-Extrapolated', function () { return __awaiter(_this, void 0, void 0, function () {
        var val, image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    val = -1;
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([-1, -1, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', val);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [val, val, val, val, 1, 2, val, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x2to3x3-Extrapolated-Float', function () { return __awaiter(_this, void 0, void 0, function () {
        var val, image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    val = -1.5;
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([-1, -1, 1, 1], [1, 4]);
                    boxInd = tf.tensor1d([0], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', val);
                    expect(output.shape).toEqual([1, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [val, val, val, val, 1, 2, val, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('2x2to3x3-NoCrop', function () { return __awaiter(_this, void 0, void 0, function () {
        var val, image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    val = -1.0;
                    image = tf.tensor4d([1, 2, 3, 4], [1, 2, 2, 1]);
                    boxes = tf.tensor2d([], [0, 4]);
                    boxInd = tf.tensor1d([], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', val);
                    expect(output.shape).toEqual([0, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('MultipleBoxes-DifferentBoxes', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1.5, 0, 0, 1.5, 1], [2, 4]);
                    boxInd = tf.tensor1d([0, 1], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'bilinear', 0);
                    expect(output.shape).toEqual([2, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1, 1.75, 0, 2, 2.75, 0, 3, 3.75, 0, 5, 5.5, 6, 6.5, 7, 7.5, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('MultipleBoxes-DifferentBoxes-Nearest', function () { return __awaiter(_this, void 0, void 0, function () {
        var image, boxes, boxInd, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    image = tf.tensor4d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2, 1]);
                    boxes = tf.tensor2d([0, 0, 1, 1.5, 0, 0, 2, 1], [2, 4]);
                    boxInd = tf.tensor1d([0, 1], 'int32');
                    output = tf.image.cropAndResize(image, boxes, boxInd, [3, 3], 'nearest', 0);
                    expect(output.shape).toEqual([2, 3, 3, 1]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1, 2, 0, 3, 4, 0, 3, 4, 0, 5, 6, 6, 7, 8, 8, 0, 0, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=image_ops_test.js.map