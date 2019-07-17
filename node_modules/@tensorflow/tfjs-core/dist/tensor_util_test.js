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
var tensor_util_1 = require("./tensor_util");
var tensor_util_env_1 = require("./tensor_util_env");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('tensor_util.isTensorInList', jasmine_util_1.ALL_ENVS, function () {
    it('not in list', function () {
        var a = tf.scalar(1);
        var list = [tf.scalar(1), tf.tensor1d([1, 2, 3])];
        expect(tensor_util_1.isTensorInList(a, list)).toBe(false);
    });
    it('in list', function () {
        var a = tf.scalar(1);
        var list = [tf.scalar(2), tf.tensor1d([1, 2, 3]), a];
        expect(tensor_util_1.isTensorInList(a, list)).toBe(true);
    });
});
jasmine_util_1.describeWithFlags('getTensorsInContainer', jasmine_util_1.ALL_ENVS, function () {
    it('null input returns empty tensor', function () {
        var results = tensor_util_1.getTensorsInContainer(null);
        expect(results).toEqual([]);
    });
    it('tensor input returns one element tensor', function () {
        var x = tf.scalar(1);
        var results = tensor_util_1.getTensorsInContainer(x);
        expect(results).toEqual([x]);
    });
    it('name tensor map returns flattened tensor', function () {
        var x1 = tf.scalar(1);
        var x2 = tf.scalar(3);
        var x3 = tf.scalar(4);
        var results = tensor_util_1.getTensorsInContainer({ x1: x1, x2: x2, x3: x3 });
        expect(results).toEqual([x1, x2, x3]);
    });
    it('can extract from arbitrary depth', function () {
        var container = [
            { x: tf.scalar(1), y: tf.scalar(2) }, [[[tf.scalar(3)]], { z: tf.scalar(4) }]
        ];
        var results = tensor_util_1.getTensorsInContainer(container);
        expect(results.length).toBe(4);
    });
    it('works with loops in container', function () {
        var container = [tf.scalar(1), tf.scalar(2), [tf.scalar(3)]];
        var innerContainer = [container];
        // tslint:disable-next-line:no-any
        container.push(innerContainer);
        var results = tensor_util_1.getTensorsInContainer(container);
        expect(results.length).toBe(3);
    });
});
jasmine_util_1.describeWithFlags('convertToTensor', jasmine_util_1.ALL_ENVS, function () {
    it('primitive integer, NaN converts to zero, no error thrown', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = function () { return tensor_util_env_1.convertToTensor(NaN, 'a', 'test', 'int32'); };
                    expect(a).not.toThrowError();
                    b = tensor_util_env_1.convertToTensor(NaN, 'b', 'test', 'int32');
                    expect(b.rank).toBe(0);
                    expect(b.dtype).toBe('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('primitive number', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor(3, 'a', 'test');
                    expect(a.rank).toBe(0);
                    expect(a.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 3]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('primitive integer, NaN converts to zero', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor(NaN, 'a', 'test', 'int32');
                    expect(a.rank).toBe(0);
                    expect(a.dtype).toBe('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 0]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('primitive boolean, parsed as bool tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor(true, 'a', 'test');
                    expect(a.rank).toBe(0);
                    expect(a.dtype).toBe('bool');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('primitive boolean, forced to be parsed as bool tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor(true, 'a', 'test', 'bool');
                    expect(a.rank).toBe(0);
                    expect(a.dtype).toBe('bool');
                    _a = test_util_1.expectArraysEqual;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), 1]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array1d', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor([1, 2, 3], 'a', 'test');
                    expect(a.rank).toBe(1);
                    expect(a.dtype).toBe('float32');
                    expect(a.shape).toEqual([3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array2d', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor([[1], [2], [3]], 'a', 'test');
                    expect(a.rank).toBe(2);
                    expect(a.shape).toEqual([3, 1]);
                    expect(a.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array3d', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor([[[1], [2]], [[3], [4]]], 'a', 'test');
                    expect(a.rank).toBe(3);
                    expect(a.shape).toEqual([2, 2, 1]);
                    expect(a.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('array4d', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tensor_util_env_1.convertToTensor([[[[1]], [[2]]], [[[3]], [[4]]]], 'a', 'test');
                    expect(a.rank).toBe(4);
                    expect(a.shape).toEqual([2, 2, 1, 1]);
                    expect(a.dtype).toBe('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('passing a tensor returns the tensor itself', function () {
        var s = tf.scalar(3);
        var res = tensor_util_env_1.convertToTensor(s, 'a', 'test');
        expect(res === s).toBe(true);
    });
    it('passing a tensor with wrong type errors', function () {
        var s = tf.scalar(3);
        expect(function () { return tensor_util_env_1.convertToTensor(s, 'p', 'f', 'bool'); })
            .toThrowError(/Argument 'p' passed to 'f' must be bool tensor, but got float32/);
    });
    it('fails when passed a string and force numeric is true', function () {
        var expectedDtype = 'numeric';
        expect(function () { return tensor_util_env_1.convertToTensor('hello', 'p', 'test', expectedDtype); })
            .toThrowError();
    });
    it('force numeric is true by default', function () {
        // Should fail to parse a string tensor since force numeric is true.
        expect(function () { return tensor_util_env_1.convertToTensor('hello', 'p', 'test'); }).toThrowError();
    });
    it('primitive string, do not force numeric', function () {
        var t = tensor_util_env_1.convertToTensor('hello', 'p', 'test', null /* Allow any dtype */);
        expect(t.dtype).toBe('string');
        expect(t.shape).toEqual([]);
    });
    it('string[], do not force numeric', function () {
        var t = tensor_util_env_1.convertToTensor(['a', 'b', 'c'], 'p', 'test', null /* Allow any dtype */);
        expect(t.dtype).toBe('string');
        expect(t.shape).toEqual([3]);
    });
    it('string, explicitly parse as bool', function () {
        expect(function () { return tensor_util_env_1.convertToTensor('a', 'argName', 'func', 'bool'); })
            .toThrowError('Argument \'argName\' passed to \'func\' must be bool tensor' +
            ', but got string tensor');
    });
    it('fails to convert a dict to tensor', function () {
        expect(function () { return tensor_util_env_1.convertToTensor({}, 'a', 'test'); })
            .toThrowError('Argument \'a\' passed to \'test\' must be a Tensor ' +
            'or TensorLike, but got \'Object\'');
    });
    it('fails to convert a string to tensor', function () {
        expect(function () { return tensor_util_env_1.convertToTensor('asdf', 'a', 'test'); })
            .toThrowError('Argument \'a\' passed to \'test\' must be numeric tensor, ' +
            'but got string tensor');
    });
});
jasmine_util_1.describeWithFlags('convertToTensor debug mode', jasmine_util_1.ALL_ENVS, function () {
    beforeAll(function () {
        tf.ENV.set('DEBUG', true);
    });
    it('fails to convert a non-valid shape array to tensor', function () {
        var a = [[1, 2], [3], [4, 5, 6]]; // 2nd element has only 1 entry.
        expect(function () { return tensor_util_env_1.convertToTensor(a, 'a', 'test'); })
            .toThrowError('Element arr[1] should have 2 elements, but has 1 elements');
    });
});
//# sourceMappingURL=tensor_util_test.js.map