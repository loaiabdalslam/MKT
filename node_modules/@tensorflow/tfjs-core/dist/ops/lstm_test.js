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
jasmine_util_1.describeWithFlags('lstm', jasmine_util_1.ALL_ENVS, function () {
    it('MultiRNNCell with 2 BasicLSTMCells', function () { return __awaiter(_this, void 0, void 0, function () {
        var lstmKernel1, lstmBias1, lstmKernel2, lstmBias2, forgetBias, lstm1, lstm2, c, h, onehot, output, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    lstmKernel1 = tf.tensor2d([
                        0.26242125034332275, -0.8787832260131836, 0.781475305557251,
                        1.337337851524353, 0.6180247068405151, -0.2760246992111206,
                        -0.11299663782119751, -0.46332040429115295, -0.1765323281288147,
                        0.6807947158813477, -0.8326982855796814, 0.6732975244522095
                    ], [3, 4]);
                    lstmBias1 = tf.tensor1d([1.090713620185852, -0.8282332420349121, 0, 1.0889357328414917]);
                    lstmKernel2 = tf.tensor2d([
                        -1.893059492111206, -1.0185645818710327, -0.6270437240600586,
                        -2.1829540729522705, -0.4583775997161865, -0.5454602241516113,
                        -0.3114445209503174, 0.8450229167938232
                    ], [2, 4]);
                    lstmBias2 = tf.tensor1d([0.9906240105628967, 0.6248329877853394, 0, 1.0224634408950806]);
                    forgetBias = tf.scalar(1.0);
                    lstm1 = function (data, c, h) {
                        return tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
                    };
                    lstm2 = function (data, c, h) {
                        return tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
                    };
                    c = [
                        tf.zeros([1, lstmBias1.shape[0] / 4]),
                        tf.zeros([1, lstmBias2.shape[0] / 4])
                    ];
                    h = [
                        tf.zeros([1, lstmBias1.shape[0] / 4]),
                        tf.zeros([1, lstmBias2.shape[0] / 4])
                    ];
                    onehot = tf.buffer([1, 2], 'float32');
                    onehot.set(1.0, 0, 0);
                    output = tf.multiRNNCell([lstm1, lstm2], onehot.toTensor(), c, h);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output[0][0].data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), [-0.7440074682235718]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output[0][1].data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), [0.7460772395133972]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output[1][0].data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), [-0.5802832245826721]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output[1][1].data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), [0.5745711922645569]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basicLSTMCell with batch=2', function () { return __awaiter(_this, void 0, void 0, function () {
        var lstmKernel, lstmBias, forgetBias, data, batchedData, c, batchedC, h, batchedH, _a, newC, newH, newCVals, newHVals;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lstmKernel = tf.randomNormal([3, 4]);
                    lstmBias = tf.randomNormal([4]);
                    forgetBias = tf.scalar(1.0);
                    data = tf.randomNormal([1, 2]);
                    batchedData = tf.concat2d([data, data], 0);
                    c = tf.randomNormal([1, 1]);
                    batchedC = tf.concat2d([c, c], 0);
                    h = tf.randomNormal([1, 1]);
                    batchedH = tf.concat2d([h, h], 0);
                    _a = tf.basicLSTMCell(forgetBias, lstmKernel, lstmBias, batchedData, batchedC, batchedH), newC = _a[0], newH = _a[1];
                    return [4 /*yield*/, newC.array()];
                case 1:
                    newCVals = _b.sent();
                    return [4 /*yield*/, newH.array()];
                case 2:
                    newHVals = _b.sent();
                    expect(newCVals[0][0]).toEqual(newCVals[1][0]);
                    expect(newHVals[0][0]).toEqual(newHVals[1][0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basicLSTMCell accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var lstmKernel, lstmBias, forgetBias, data, batchedData, c, batchedC, h, batchedH, _a, newC, newH, newCVals, newHVals;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    lstmKernel = tf.randomNormal([3, 4]);
                    lstmBias = [0, 0, 0, 0];
                    forgetBias = 1;
                    data = [[0, 0]];
                    batchedData = tf.concat2d([data, data], 0);
                    c = [[0]];
                    batchedC = tf.concat2d([c, c], 0);
                    h = [[0]];
                    batchedH = tf.concat2d([h, h], 0);
                    _a = tf.basicLSTMCell(forgetBias, lstmKernel, lstmBias, batchedData, batchedC, batchedH), newC = _a[0], newH = _a[1];
                    return [4 /*yield*/, newC.array()];
                case 1:
                    newCVals = _b.sent();
                    return [4 /*yield*/, newH.array()];
                case 2:
                    newHVals = _b.sent();
                    expect(newCVals[0][0]).toEqual(newCVals[1][0]);
                    expect(newHVals[0][0]).toEqual(newHVals[1][0]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('multiRNN throws when passed non-tensor', jasmine_util_1.ALL_ENVS, function () {
    it('input: data', function () {
        var lstmKernel1 = tf.zeros([3, 4]);
        var lstmBias1 = tf.zeros([4]);
        var lstmKernel2 = tf.zeros([2, 4]);
        var lstmBias2 = tf.zeros([4]);
        var forgetBias = tf.scalar(1.0);
        var lstm1 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        };
        var lstm2 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        };
        var c = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        var h = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        expect(function () { return tf.multiRNNCell([lstm1, lstm2], {}, c, h); })
            .toThrowError(/Argument 'data' passed to 'multiRNNCell' must be a Tensor/);
    });
    it('input: c', function () {
        var lstmKernel1 = tf.zeros([3, 4]);
        var lstmBias1 = tf.zeros([4]);
        var lstmKernel2 = tf.zeros([2, 4]);
        var lstmBias2 = tf.zeros([4]);
        var forgetBias = tf.scalar(1.0);
        var lstm1 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        };
        var lstm2 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        };
        var h = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        var data = tf.zeros([1, 2]);
        expect(function () { return tf.multiRNNCell([lstm1, lstm2], data, [{}], h); })
            .toThrowError(/Argument 'c\[0\]' passed to 'multiRNNCell' must be a Tensor/);
    });
    it('input: h', function () {
        var lstmKernel1 = tf.zeros([3, 4]);
        var lstmBias1 = tf.zeros([4]);
        var lstmKernel2 = tf.zeros([2, 4]);
        var lstmBias2 = tf.zeros([4]);
        var forgetBias = tf.scalar(1.0);
        var lstm1 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel1, lstmBias1, data, c, h);
        };
        var lstm2 = function (data, c, h) {
            return tf.basicLSTMCell(forgetBias, lstmKernel2, lstmBias2, data, c, h);
        };
        var c = [
            tf.zeros([1, lstmBias1.shape[0] / 4]),
            tf.zeros([1, lstmBias2.shape[0] / 4])
        ];
        var data = tf.zeros([1, 2]);
        expect(function () { return tf.multiRNNCell([lstm1, lstm2], data, c, [{}]); })
            .toThrowError(/Argument 'h\[0\]' passed to 'multiRNNCell' must be a Tensor/);
    });
});
jasmine_util_1.describeWithFlags('basicLSTMCell throws with non-tensor', jasmine_util_1.ALL_ENVS, function () {
    it('input: forgetBias', function () {
        var lstmKernel = tf.randomNormal([3, 4]);
        var lstmBias = tf.randomNormal([4]);
        var data = tf.randomNormal([1, 2]);
        var batchedData = tf.concat2d([data, data], 0); // 2x2
        var c = tf.randomNormal([1, 1]);
        var batchedC = tf.concat2d([c, c], 0); // 2x1
        var h = tf.randomNormal([1, 1]);
        var batchedH = tf.concat2d([h, h], 0); // 2x1
        expect(function () { return tf.basicLSTMCell({}, lstmKernel, lstmBias, batchedData, batchedC, batchedH); })
            .toThrowError(/Argument 'forgetBias' passed to 'basicLSTMCell' must be a Tensor/);
    });
    it('input: lstmKernel', function () {
        var lstmBias = tf.randomNormal([4]);
        var forgetBias = tf.scalar(1.0);
        var data = tf.randomNormal([1, 2]);
        var batchedData = tf.concat2d([data, data], 0); // 2x2
        var c = tf.randomNormal([1, 1]);
        var batchedC = tf.concat2d([c, c], 0); // 2x1
        var h = tf.randomNormal([1, 1]);
        var batchedH = tf.concat2d([h, h], 0); // 2x1
        expect(function () { return tf.basicLSTMCell(forgetBias, {}, lstmBias, batchedData, batchedC, batchedH); })
            .toThrowError(/Argument 'lstmKernel' passed to 'basicLSTMCell' must be a Tensor/);
    });
    it('input: lstmBias', function () {
        var lstmKernel = tf.randomNormal([3, 4]);
        var forgetBias = tf.scalar(1.0);
        var data = tf.randomNormal([1, 2]);
        var batchedData = tf.concat2d([data, data], 0); // 2x2
        var c = tf.randomNormal([1, 1]);
        var batchedC = tf.concat2d([c, c], 0); // 2x1
        var h = tf.randomNormal([1, 1]);
        var batchedH = tf.concat2d([h, h], 0); // 2x1
        expect(function () { return tf.basicLSTMCell(forgetBias, lstmKernel, {}, batchedData, batchedC, batchedH); })
            .toThrowError(/Argument 'lstmBias' passed to 'basicLSTMCell' must be a Tensor/);
    });
    it('input: data', function () {
        var lstmKernel = tf.randomNormal([3, 4]);
        var lstmBias = tf.randomNormal([4]);
        var forgetBias = tf.scalar(1.0);
        var c = tf.randomNormal([1, 1]);
        var batchedC = tf.concat2d([c, c], 0); // 2x1
        var h = tf.randomNormal([1, 1]);
        var batchedH = tf.concat2d([h, h], 0); // 2x1
        expect(function () { return tf.basicLSTMCell(forgetBias, lstmKernel, lstmBias, {}, batchedC, batchedH); })
            .toThrowError(/Argument 'data' passed to 'basicLSTMCell' must be a Tensor/);
    });
    it('input: c', function () {
        var lstmKernel = tf.randomNormal([3, 4]);
        var lstmBias = tf.randomNormal([4]);
        var forgetBias = tf.scalar(1.0);
        var data = tf.randomNormal([1, 2]);
        var batchedData = tf.concat2d([data, data], 0); // 2x2
        var h = tf.randomNormal([1, 1]);
        var batchedH = tf.concat2d([h, h], 0); // 2x1
        expect(function () { return tf.basicLSTMCell(forgetBias, lstmKernel, lstmBias, batchedData, {}, batchedH); })
            .toThrowError(/Argument 'c' passed to 'basicLSTMCell' must be a Tensor/);
    });
    it('input: h', function () {
        var lstmKernel = tf.randomNormal([3, 4]);
        var lstmBias = tf.randomNormal([4]);
        var forgetBias = tf.scalar(1.0);
        var data = tf.randomNormal([1, 2]);
        var batchedData = tf.concat2d([data, data], 0); // 2x2
        var c = tf.randomNormal([1, 1]);
        var batchedC = tf.concat2d([c, c], 0); // 2x1
        expect(function () { return tf.basicLSTMCell(forgetBias, lstmKernel, lstmBias, batchedData, batchedC, {}); })
            .toThrowError(/Argument 'h' passed to 'basicLSTMCell' must be a Tensor/);
    });
});
//# sourceMappingURL=lstm_test.js.map