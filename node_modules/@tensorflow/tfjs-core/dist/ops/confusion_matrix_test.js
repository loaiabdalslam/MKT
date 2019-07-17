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
/**
 * Unit tests for confusionMatrix().
 */
jasmine_util_1.describeWithFlags('confusionMatrix', jasmine_util_1.ALL_ENVS, function () {
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // labels = tf.constant([0, 1, 2, 1, 0])
    // predictions = tf.constant([0, 2, 2, 1, 0])
    // out = tf.confusion_matrix(labels, predictions, 3)
    //
    // print(out)
    // ```
    it('3x3 all cases present in both labels and predictions', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([0, 1, 2, 1, 0], 'int32');
                    predictions = tf.tensor1d([0, 2, 2, 1, 0], 'int32');
                    numClasses = 3;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 0, 1, 1, 0, 0, 1]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([3, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('float32 arguments are accepted', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([0, 1, 2, 1, 0], 'float32');
                    predictions = tf.tensor1d([0, 2, 2, 1, 0], 'float32');
                    numClasses = 3;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 0, 1, 1, 0, 0, 1]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([3, 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // labels = tf.constant([3, 3, 2, 2, 1, 1, 0, 0])
    // predictions = tf.constant([2, 2, 2, 2, 0, 0, 0, 0])
    // out = tf.confusion_matrix(labels, predictions, 4)
    //
    // print(out)
    // ```
    it('4x4 all cases present in labels, but not predictions', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([3, 3, 2, 2, 1, 1, 0, 0], 'int32');
                    predictions = tf.tensor1d([2, 2, 2, 2, 0, 0, 0, 0], 'int32');
                    numClasses = 4;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([4, 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('4x4 all cases present in predictions, but not labels', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([2, 2, 2, 2, 0, 0, 0, 0], 'int32');
                    predictions = tf.tensor1d([3, 3, 2, 2, 1, 1, 0, 0], 'int32');
                    numClasses = 4;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([4, 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Plain arrays as inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = [3, 3, 2, 2, 1, 1, 0, 0];
                    predictions = [2, 2, 2, 2, 0, 0, 0, 0];
                    numClasses = 4;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([4, 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Int32Arrays as inputs', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = new Int32Array([3, 3, 2, 2, 1, 1, 0, 0]);
                    predictions = new Int32Array([2, 2, 2, 2, 0, 0, 0, 0]);
                    numClasses = 4;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([4, 4]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Reference (Python) TensorFlow code:
    //
    // ```py
    // import tensorflow as tf
    //
    // tf.enable_eager_execution()
    //
    // labels = tf.constant([0, 4])
    // predictions = tf.constant([4, 0])
    // out = tf.confusion_matrix(labels, predictions, 5)
    //
    // print(out)
    // ```
    it('5x5 predictions and labels both missing some cases', function () { return __awaiter(_this, void 0, void 0, function () {
        var labels, predictions, numClasses, out, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    labels = tf.tensor1d([0, 4], 'int32');
                    predictions = tf.tensor1d([4, 0], 'int32');
                    numClasses = 5;
                    out = tf.math.confusionMatrix(labels, predictions, numClasses);
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, out.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                            0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0
                        ]]);
                    expect(out.dtype).toBe('int32');
                    expect(out.shape).toEqual([5, 5]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Invalid numClasses leads to Error', function () {
        expect(function () { return tf.math.confusionMatrix(tf.tensor1d([0, 1]), tf.tensor1d([1, 0]), 2.5); })
            .toThrowError(/numClasses .* positive integer.* got 2\.5/);
    });
    it('Incorrect tensor rank leads to Error', function () {
        expect(function () { return tf.math.confusionMatrix(
        // tslint:disable-next-line:no-any
        tf.scalar(0), tf.scalar(0), 1); })
            .toThrowError(/rank .* 1.*got 0/);
        expect(function () {
            // tslint:disable-next-line:no-any
            return tf.math.confusionMatrix(tf.zeros([3, 3]), tf.zeros([9]), 2);
        })
            .toThrowError(/rank .* 1.*got 2/);
        expect(function () {
            // tslint:disable-next-line:no-any
            return tf.math.confusionMatrix(tf.zeros([9]), tf.zeros([3, 3]), 2);
        })
            .toThrowError(/rank .* 1.*got 2/);
    });
    it('Mismatch in lengths leads to Error', function () {
        expect(
        // tslint:disable-next-line:no-any
        function () { return tf.math.confusionMatrix(tf.zeros([3]), tf.zeros([9]), 2); })
            .toThrowError(/Mismatch .* 3 vs.* 9/);
    });
});
//# sourceMappingURL=confusion_matrix_test.js.map