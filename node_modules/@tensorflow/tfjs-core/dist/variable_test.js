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
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var tensor_1 = require("./tensor");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('variable', jasmine_util_1.ALL_ENVS, function () {
    it('simple assign', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v = tensor_1.variable(tf.tensor1d([1, 2, 3]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 2, 3]]);
                    v.assign(tf.tensor1d([4, 5, 6]));
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple chain assign', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v = tf.tensor1d([1, 2, 3]).variable();
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 2, 3]]);
                    v.assign(tf.tensor1d([4, 5, 6]));
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [4, 5, 6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('default names are unique', function () {
        var v = tensor_1.variable(tf.tensor1d([1, 2, 3]));
        expect(v.name).not.toBeNull();
        var v2 = tensor_1.variable(tf.tensor1d([1, 2, 3]));
        expect(v2.name).not.toBeNull();
        expect(v.name).not.toBe(v2.name);
    });
    it('user provided name', function () {
        var v = tensor_1.variable(tf.tensor1d([1, 2, 3]), true, 'myName');
        expect(v.name).toBe('myName');
    });
    it('if name already used, throw error', function () {
        tensor_1.variable(tf.tensor1d([1, 2, 3]), true, 'myName');
        expect(function () { return tensor_1.variable(tf.tensor1d([1, 2, 3]), true, 'myName'); })
            .toThrowError();
    });
    it('ops can take variables', function () { return __awaiter(_this, void 0, void 0, function () {
        var value, v, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    value = tf.tensor1d([1, 2, 3]);
                    v = tensor_1.variable(value);
                    res = tf.sum(v);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('chained variables works', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, res, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    v = tf.tensor1d([1, 2, 3]).variable();
                    res = tf.sum(v);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('variables are not affected by tidy', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    expect(tf.memory().numTensors).toBe(0);
                    tf.tidy(function () {
                        var value = tf.tensor1d([1, 2, 3], 'float32');
                        expect(tf.memory().numTensors).toBe(1);
                        v = tensor_1.variable(value);
                        expect(tf.memory().numTensors).toBe(2);
                    });
                    expect(tf.memory().numTensors).toBe(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    v.dispose();
                    expect(tf.memory().numTensors).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('disposing a named variable allows creating new named variable', function () {
        var numTensors = tf.memory().numTensors;
        var t = tf.scalar(1);
        var varName = 'var';
        var v = tf.variable(t, true, varName);
        expect(tf.memory().numTensors).toBe(numTensors + 2);
        v.dispose();
        t.dispose();
        expect(tf.memory().numTensors).toBe(numTensors);
        // Create another variable with the same name.
        var t2 = tf.scalar(1);
        var v2 = tf.variable(t2, true, varName);
        expect(tf.memory().numTensors).toBe(numTensors + 2);
        t2.dispose();
        v2.dispose();
        expect(tf.memory().numTensors).toBe(numTensors);
    });
    it('double disposing a variable works', function () {
        var numTensors = tf.memory().numTensors;
        var t = tf.scalar(1);
        var v = tf.variable(t);
        expect(tf.memory().numTensors).toBe(numTensors + 2);
        t.dispose();
        v.dispose();
        expect(tf.memory().numTensors).toBe(numTensors);
        // Double dispose the variable.
        v.dispose();
        expect(tf.memory().numTensors).toBe(numTensors);
    });
    it('constructor does not dispose', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, v, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.scalar(2);
                    v = tf.variable(a);
                    expect(tf.memory().numTensors).toBe(2);
                    expect(tf.memory().numDataBuffers).toBe(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [2]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('variables are assignable to tensors', function () {
        // This test asserts compilation, not doing any run-time assertion.
        var x0 = null;
        var y0 = x0;
        expect(y0).toBeNull();
        var x1 = null;
        var y1 = x1;
        expect(y1).toBeNull();
        var x2 = null;
        var y2 = x2;
        expect(y2).toBeNull();
        var x3 = null;
        var y3 = x3;
        expect(y3).toBeNull();
        var x4 = null;
        var y4 = x4;
        expect(y4).toBeNull();
        var xh = null;
        var yh = xh;
        expect(yh).toBeNull();
    });
    it('assign does not dispose old data', function () { return __awaiter(_this, void 0, void 0, function () {
        var v, _a, secondArray, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    v = tensor_1.variable(tf.tensor1d([1, 2, 3]));
                    expect(tf.memory().numTensors).toBe(2);
                    expect(tf.memory().numDataBuffers).toBe(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 2, 3]]);
                    secondArray = tf.tensor1d([4, 5, 6]);
                    expect(tf.memory().numTensors).toBe(3);
                    expect(tf.memory().numDataBuffers).toBe(2);
                    v.assign(secondArray);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, v.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [4, 5, 6]]);
                    // Assign doesn't dispose the 1st array.
                    expect(tf.memory().numTensors).toBe(3);
                    expect(tf.memory().numDataBuffers).toBe(2);
                    v.dispose();
                    // Disposing the variable disposes itself. The input to variable and
                    // secondArray are the only remaining tensors.
                    expect(tf.memory().numTensors).toBe(2);
                    expect(tf.memory().numDataBuffers).toBe(2);
                    return [2 /*return*/];
            }
        });
    }); });
    it('shape must match', function () {
        var v = tensor_1.variable(tf.tensor1d([1, 2, 3]));
        expect(function () { return v.assign(tf.tensor1d([1, 2])); }).toThrowError();
        // tslint:disable-next-line:no-any
        expect(function () { return v.assign(tf.tensor2d([3, 4], [1, 2])); }).toThrowError();
    });
    it('dtype must match', function () {
        var v = tensor_1.variable(tf.tensor1d([1, 2, 3]));
        // tslint:disable-next-line:no-any
        expect(function () { return v.assign(tf.tensor1d([1, 1, 1], 'int32')); })
            .toThrowError();
        // tslint:disable-next-line:no-any
        expect(function () { return v.assign(tf.tensor1d([true, false, true], 'bool')); })
            .toThrowError();
    });
});
jasmine_util_1.describeWithFlags('x instanceof Variable', jasmine_util_1.ALL_ENVS, function () {
    it('x: Variable', function () {
        var t = tf.variable(tf.scalar(1));
        expect(t instanceof tensor_1.Variable).toBe(true);
    });
    it('x: Variable-like', function () {
        var t = { assign: function () { }, shape: [2], dtype: 'float32', dataId: {} };
        expect(t instanceof tensor_1.Variable).toBe(true);
    });
    it('x: other object, fails', function () {
        var t = { something: 'else' };
        expect(t instanceof tensor_1.Variable).toBe(false);
    });
    it('x: Tensor, fails', function () {
        var t = tf.scalar(1);
        expect(t instanceof tensor_1.Variable).toBe(false);
    });
});
//# sourceMappingURL=variable_test.js.map