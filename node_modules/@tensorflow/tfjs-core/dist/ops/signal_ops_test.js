"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
jasmine_util_1.describeWithFlags('hannWindow', jasmine_util_1.ALL_ENVS, function () {
    it('length=3', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hannWindow(3);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=7', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hannWindow(7);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 0.25, 0.75, 1, 0.75, 0.25, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=6', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hannWindow(6);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0., 0.25, 0.75, 1., 0.75, 0.25]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=20', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hannWindow(20);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0., 0.02447176, 0.09549153, 0.20610738, 0.34549153,
                            0.5, 0.65450853, 0.79389274, 0.9045085, 0.97552824,
                            1., 0.97552824, 0.9045085, 0.7938925, 0.65450835,
                            0.5, 0.34549144, 0.20610726, 0.09549153, 0.02447173
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('hammingWindow', jasmine_util_1.ALL_ENVS, function () {
    it('length=3', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hammingWindow(3);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.08, 1, 0.08]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=6', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hammingWindow(6);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.08, 0.31, 0.77, 1., 0.77, 0.31]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=7', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hammingWindow(7);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0.08, 0.31, 0.77, 1, 0.77, 0.31, 0.08]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('length=20', function () { return __awaiter(_this, void 0, void 0, function () {
        var ret, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ret = tf.signal.hammingWindow(20);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, ret.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            0.08000001, 0.10251403, 0.16785222, 0.2696188, 0.3978522,
                            0.54, 0.68214786, 0.8103813, 0.9121479, 0.977486,
                            1., 0.977486, 0.9121478, 0.8103812, 0.6821477,
                            0.54, 0.39785212, 0.2696187, 0.16785222, 0.102514
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('frame', jasmine_util_1.ALL_ENVS, function () {
    it('3 length frames', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 3, 1);
                    expect(output.shape).toEqual([3, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 2, 3, 4, 3, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 length frames with step 2', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 3, 2);
                    expect(output.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 3, 4, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3 length frames with step 5', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 3, 5);
                    expect(output.shape).toEqual([1, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Exceeding frame length', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 6, 1);
                    expect(output.shape).toEqual([0, 6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Zero frame step', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 6, 0);
                    expect(output.shape).toEqual([0, 6]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), []]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Padding with default value', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 3, 3, true);
                    expect(output.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Padding with the given value', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor1d([1, 2, 3, 4, 5]);
                    output = tf.signal.frame(input, 3, 3, true, 100);
                    expect(output.shape).toEqual([2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4, 5, 100]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=signal_ops_test.js.map