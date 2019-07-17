"use strict";
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
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('tf.buffer', jasmine_util_1.ALL_ENVS, function () {
    it('float32', function () { return __awaiter(_this, void 0, void 0, function () {
        var buff, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    buff = tf.buffer([1, 2, 3], 'float32');
                    buff.set(1.3, 0, 0, 0);
                    buff.set(2.9, 0, 1, 0);
                    expect(buff.get(0, 0, 0)).toBeCloseTo(1.3);
                    expect(buff.get(0, 0, 1)).toBeCloseTo(0);
                    expect(buff.get(0, 0, 2)).toBeCloseTo(0);
                    expect(buff.get(0, 1, 0)).toBeCloseTo(2.9);
                    expect(buff.get(0, 1, 1)).toBeCloseTo(0);
                    expect(buff.get(0, 1, 2)).toBeCloseTo(0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, buff.toTensor().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.3, 0, 0, 2.9, 0, 0]]);
                    test_util_1.expectArraysClose(buff.values, new Float32Array([1.3, 0, 0, 2.9, 0, 0]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('get() out of range throws', function () { return __awaiter(_this, void 0, void 0, function () {
        var t, buff;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    t = tf.tensor([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    return [4 /*yield*/, t.buffer()];
                case 1:
                    buff = _a.sent();
                    expect(buff.get(0, 0, 0)).toBeCloseTo(1);
                    expect(buff.get(0, 0, 1)).toBeCloseTo(2);
                    expect(function () { return buff.get(0, 0, 2); })
                        .toThrowError(/Requested out of range element/);
                    return [2 /*return*/];
            }
        });
    }); });
    it('int32', function () { return __awaiter(_this, void 0, void 0, function () {
        var buff, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    buff = tf.buffer([2, 3], 'int32');
                    buff.set(1.3, 0, 0);
                    buff.set(2.1, 1, 1);
                    expect(buff.get(0, 0)).toEqual(1);
                    expect(buff.get(0, 1)).toEqual(0);
                    expect(buff.get(0, 2)).toEqual(0);
                    expect(buff.get(1, 0)).toEqual(0);
                    expect(buff.get(1, 1)).toEqual(2);
                    expect(buff.get(1, 2)).toEqual(0);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, buff.toTensor().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 0, 0, 0, 2, 0]]);
                    test_util_1.expectArraysClose(buff.values, new Int32Array([1, 0, 0, 0, 2, 0]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('bool', function () { return __awaiter(_this, void 0, void 0, function () {
        var buff, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    buff = tf.buffer([4], 'bool');
                    buff.set(true, 1);
                    buff.set(true, 2);
                    expect(buff.get(0)).toBeFalsy();
                    expect(buff.get(1)).toBeTruthy();
                    expect(buff.get(2)).toBeTruthy();
                    expect(buff.get(3)).toBeFalsy();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, buff.toTensor().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [0, 1, 1, 0]]);
                    test_util_1.expectArraysClose(buff.values, new Uint8Array([0, 1, 1, 0]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('string', function () { return __awaiter(_this, void 0, void 0, function () {
        var buff, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    buff = tf.buffer([2, 2], 'string');
                    buff.set('first', 0, 0);
                    buff.set('third', 1, 0);
                    expect(buff.get(0, 0)).toEqual('first');
                    expect(buff.get(0, 1)).toBeFalsy();
                    expect(buff.get(1, 0)).toEqual('third');
                    expect(buff.get(1, 1)).toBeFalsy();
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, buff.toTensor().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), ['first', null, 'third', null]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed non-integer shape', function () {
        var msg = 'Tensor must have a shape comprised of positive ' +
            'integers but got shape [2,2.2].';
        expect(function () { return tf.buffer([2, 2.2]); }).toThrowError(msg);
    });
    it('throws when passed negative shape', function () {
        var msg = 'Tensor must have a shape comprised of positive ' +
            'integers but got shape [2,-2].';
        expect(function () { return tf.buffer([2, -2]); }).toThrowError(msg);
    });
});
//# sourceMappingURL=buffer_test.js.map