"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var tensor_util_env_1 = require("./tensor_util_env");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('debug on', jasmine_util_1.SYNC_BACKEND_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('DEBUG', true);
    });
    afterAll(function () {
        tf.ENV.set('DEBUG', false);
    });
    it('debug mode does not error when no nans', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, -1, 0, 3]);
                    res = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 0, 0, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('debug mode errors when nans in tensor construction, float32', function () {
        var a = function () { return tf.tensor1d([2, NaN], 'float32'); };
        expect(a).toThrowError();
    });
    it('debug mode errors when nans in tensor construction, int32', function () {
        var a = function () { return tf.tensor1d([2, NaN], 'int32'); };
        expect(a).toThrowError();
    });
    it('debug mode errors when Infinity in tensor construction', function () {
        var a = function () { return tf.tensor1d([2, Infinity], 'float32'); };
        expect(a).toThrowError();
    });
    it('debug mode errors when nans in tensor created from TypedArray', function () {
        var a = function () { return tf.tensor1d(new Float32Array([1, 2, NaN]), 'float32'); };
        expect(a).toThrowError();
    });
    it('debug mode errors when infinities in op output', function () {
        var a = tf.tensor1d([1, 2, 3, 4]);
        var b = tf.tensor1d([2, -1, 0, 3]);
        var c = function () { return a.div(b); };
        expect(c).toThrowError();
    });
    it('debug mode errors when nans in op output', function () {
        var a = tf.tensor1d([-1, 2]);
        var b = tf.tensor1d([0.5, 1]);
        var c = function () { return a.pow(b); };
        expect(c).toThrowError();
    });
    it('debug mode errors when nans in oneHot op (tensorlike), int32', function () {
        var f = function () { return tf.oneHot([2, NaN], 3); };
        expect(f).toThrowError();
    });
    it('debug mode errors when nan in convertToTensor, int32', function () {
        var a = function () { return tensor_util_env_1.convertToTensor(NaN, 'a', 'test', 'int32'); };
        expect(a).toThrowError();
    });
    it('debug mode errors when nan in convertToTensor array input, int32', function () {
        var a = function () { return tensor_util_env_1.convertToTensor([NaN], 'a', 'test', 'int32'); };
        expect(a).toThrowError();
    });
    it('A x B', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
                    c = tf.matMul(a, b);
                    expect(c.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, c.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 8, -3, 20]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('debug off', jasmine_util_1.ALL_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('DEBUG', false);
    });
    it('no errors where there are nans, and debug mode is disabled', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([2, NaN]);
                    res = tf.relu(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, NaN]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=debug_mode_test.js.map