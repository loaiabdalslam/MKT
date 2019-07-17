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
jasmine_util_1.describeWithFlags('movingAverage', jasmine_util_1.ALL_ENVS, function () {
    // Use the following tensorflow to generate reference values for
    // `zeroDebias` = `true`;
    //
    // ```python
    // import tensorflow as tf
    // from tensorflow.python.training.moving_averages import
    // assign_moving_average
    //
    // with tf.Session() as sess:
    //   v = tf.get_variable("v1", shape=[2, 2], dtype=tf.float32,
    //                       initializer=tf.zeros_initializer)
    //   x = tf.Variable([[1.0, 2.0], [3.0, 4.0]])
    //   inc_x = x.assign_add([[10.0, 10.0], [10.0, 10.0]])
    //   update = assign_moving_average(v, x, 0.6)
    //
    //   sess.run(tf.global_variables_initializer())
    //
    //   sess.run(update)
    //   print(sess.run(v))
    //
    //   sess.run(inc_x)
    //   sess.run(update)
    //   print(sess.run(v))
    // ```
    it('zeroDebias=true, decay and step are numbers', function () { return __awaiter(_this, void 0, void 0, function () {
        var v0, x, decay, v1, _a, y, v2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
                    x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    decay = 0.6;
                    v1 = tf.movingAverage(v0, x, decay, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v1.array()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [[1, 2], [3, 4]]]);
                    y = tf.tensor2d([[11, 12], [13, 14]], [2, 2]);
                    v2 = tf.movingAverage(v1, y, decay, 2);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v2.array()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [[7.25, 8.25], [9.25, 10.25]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('zeroDebias=true, decay and step are scalars', function () { return __awaiter(_this, void 0, void 0, function () {
        var v0, x, decay, v1, _a, y, v2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
                    x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    decay = tf.scalar(0.6);
                    v1 = tf.movingAverage(v0, x, decay, tf.scalar(1));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v1.array()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [[1, 2], [3, 4]]]);
                    y = tf.tensor2d([[11, 12], [13, 14]], [2, 2]);
                    v2 = tf.movingAverage(v1, y, decay, tf.scalar(2));
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v2.array()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [[7.25, 8.25], [9.25, 10.25]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    // Use the following tensorflow to generate reference values for
    // `zeroDebias` = `false`;
    //
    // ```python
    // import tensorflow as tf
    // from tensorflow.python.training.moving_averages import
    // assign_moving_average
    //
    // with tf.Session() as sess:
    //   v = tf.get_variable("v1", shape=[2, 2], dtype=tf.float32,
    //                       initializer=tf.zeros_initializer)
    //   x = tf.Variable([[1.0, 2.0], [3.0, 4.0]])
    //   inc_x = x.assign_add([[10.0, 10.0], [10.0, 10.0]])
    //   update = assign_moving_average(v, x, 0.6, zero_debias=False)
    //
    //   sess.run(tf.global_variables_initializer())
    //
    //   sess.run(update)
    //   print(sess.run(v))
    //
    //   sess.run(inc_x)
    //   sess.run(update)
    //   print(sess.run(v))
    // ```
    it('zeroDebias=false, decay and step are numbers', function () { return __awaiter(_this, void 0, void 0, function () {
        var v0, x, decay, v1, _a, y, v2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
                    x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    decay = 0.6;
                    v1 = tf.movingAverage(v0, x, decay, null, false);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v1.array()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [[0.4, 0.8], [1.2, 1.6]]]);
                    y = tf.tensor2d([[11, 12], [13, 14]], [2, 2]);
                    v2 = tf.movingAverage(v1, y, decay, null, false);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v2.array()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [[4.64, 5.28], [5.92, 6.56]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('zeroDebias=false, decay is scalar', function () { return __awaiter(_this, void 0, void 0, function () {
        var v0, x, decay, v1, _a, y, v2, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
                    x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
                    decay = tf.scalar(0.6);
                    v1 = tf.movingAverage(v0, x, decay, null, false);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v1.array()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [[0.4, 0.8], [1.2, 1.6]]]);
                    y = tf.tensor2d([[11, 12], [13, 14]], [2, 2]);
                    v2 = tf.movingAverage(v1, y, decay, null, false);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v2.array()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [[4.64, 5.28], [5.92, 6.56]]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('zeroDebias=true, no step throws error', function () {
        var v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
        var x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
        var decay = tf.scalar(0.6);
        expect(function () { return tf.movingAverage(v0, x, decay, null); }).toThrowError();
    });
    it('shape mismatch in v and x throws error', function () {
        var v0 = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
        var x = tf.tensor2d([[1, 2]], [1, 2]);
        var decay = tf.scalar(0.6);
        expect(function () { return tf.movingAverage(v0, x, decay, null); }).toThrowError();
    });
    it('throws when passed v as a non-tensor', function () {
        var x = tf.tensor2d([[1, 2], [3, 4]], [2, 2]);
        expect(function () { return tf.movingAverage({}, x, 1); })
            .toThrowError(/Argument 'v' passed to 'movingAverage' must be a Tensor/);
    });
    it('throws when passed v as a non-tensor', function () {
        var v = tf.tensor2d([[0, 0], [0, 0]], [2, 2]);
        expect(function () { return tf.movingAverage(v, {}, 1); })
            .toThrowError(/Argument 'x' passed to 'movingAverage' must be a Tensor/);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var v0, x, decay, v1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v0 = [[0, 0], [0, 0]];
                    x = [[1, 2], [3, 4]];
                    decay = 0.6;
                    v1 = tf.movingAverage(v0, x, decay, 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v1.array()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [[1, 2], [3, 4]]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=moving_average_test.js.map