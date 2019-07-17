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
var environment_1 = require("./environment");
var jasmine_util_1 = require("./jasmine_util");
var ops_1 = require("./ops/ops");
var tensor_util_env_1 = require("./tensor_util_env");
var util = require("./util");
describe('Util', function () {
    it('Correctly gets size from shape', function () {
        expect(util.sizeFromShape([1, 2, 3, 4])).toEqual(24);
    });
    it('Correctly identifies scalars', function () {
        expect(util.isScalarShape([])).toBe(true);
        expect(util.isScalarShape([1, 2])).toBe(false);
        expect(util.isScalarShape([1])).toBe(false);
    });
    it('Number arrays equal', function () {
        expect(util.arraysEqual([1, 2, 3, 6], [1, 2, 3, 6])).toBe(true);
        expect(util.arraysEqual([1, 2], [1, 2, 3])).toBe(false);
        expect(util.arraysEqual([1, 2, 5], [1, 2])).toBe(false);
    });
    it('Is integer', function () {
        expect(util.isInt(0.5)).toBe(false);
        expect(util.isInt(1)).toBe(true);
    });
    it('Size to squarish shape (perfect square)', function () {
        expect(util.sizeToSquarishShape(9)).toEqual([3, 3]);
    });
    it('Size to squarish shape (prime number)', function () {
        expect(util.sizeToSquarishShape(11)).toEqual([4, 3]);
    });
    it('Size to squarish shape (almost square)', function () {
        expect(util.sizeToSquarishShape(35)).toEqual([6, 6]);
    });
    it('Size of 1 to squarish shape', function () {
        expect(util.sizeToSquarishShape(1)).toEqual([1, 1]);
    });
    it('infer shape single number', function () {
        expect(tensor_util_env_1.inferShape(4)).toEqual([]);
    });
    it('infer shape 1d array', function () {
        expect(tensor_util_env_1.inferShape([1, 2, 5])).toEqual([3]);
    });
    it('infer shape 2d array', function () {
        expect(tensor_util_env_1.inferShape([[1, 2, 5], [5, 4, 1]])).toEqual([2, 3]);
    });
    it('infer shape 3d array', function () {
        var a = [[[1, 2], [2, 3], [5, 6]], [[5, 6], [4, 5], [1, 2]]];
        expect(tensor_util_env_1.inferShape(a)).toEqual([2, 3, 2]);
    });
    it('infer shape 4d array', function () {
        var a = [
            [[[1], [2]], [[2], [3]], [[5], [6]]], [[[5], [6]], [[4], [5]], [[1], [2]]]
        ];
        expect(tensor_util_env_1.inferShape(a)).toEqual([2, 3, 2, 1]);
    });
    it('infer shape of typed array', function () {
        var a = new Float32Array([1, 2, 3, 4, 5]);
        expect(tensor_util_env_1.inferShape(a)).toEqual([5]);
    });
    it('infer shape of Uint8Array[], string tensor', function () {
        var a = [new Uint8Array([1, 2]), new Uint8Array([3, 4])];
        expect(tensor_util_env_1.inferShape(a, 'string')).toEqual([2]);
    });
    it('infer shape of Uint8Array[][], string tensor', function () {
        var a = [
            [new Uint8Array([1]), new Uint8Array([2])],
            [new Uint8Array([1]), new Uint8Array([2])]
        ];
        expect(tensor_util_env_1.inferShape(a, 'string')).toEqual([2, 2]);
    });
    it('infer shape of Uint8Array[][][], string tensor', function () {
        var a = [
            [[new Uint8Array([1, 2])], [new Uint8Array([2, 1])]],
            [[new Uint8Array([1, 2])], [new Uint8Array([2, 1])]]
        ];
        expect(tensor_util_env_1.inferShape(a, 'string')).toEqual([2, 2, 1]);
    });
});
describe('util.flatten', function () {
    it('nested number arrays', function () {
        expect(util.flatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
        expect(util.flatten([[[1, 2], [3, 4], [5, 6], [7, 8]]])).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8
        ]);
        expect(util.flatten([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('nested string arrays', function () {
        expect(util.flatten([['a', 'b'], ['c', [['d']]]])).toEqual([
            'a', 'b', 'c', 'd'
        ]);
        expect(util.flatten([['a', ['b']], ['c', [['d']], 'e']])).toEqual([
            'a', 'b', 'c', 'd', 'e'
        ]);
    });
    it('mixed TypedArray and number[]', function () {
        var data = [new Float32Array([1, 2]), 3, [4, 5, new Float32Array([6, 7])]];
        expect(util.flatten(data)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
    it('nested Uint8Arrays, skipTypedArray=true', function () {
        var data = [
            [new Uint8Array([1, 2]), new Uint8Array([3, 4])],
            [new Uint8Array([5, 6]), new Uint8Array([7, 8])]
        ];
        expect(util.flatten(data, [], true)).toEqual([
            new Uint8Array([1, 2]), new Uint8Array([3, 4]), new Uint8Array([5, 6]),
            new Uint8Array([7, 8])
        ]);
    });
});
function encodeStrings(a) {
    return a.map(function (s) { return util.encodeString(s); });
}
describe('util.bytesFromStringArray', function () {
    it('count bytes after utf8 encoding', function () {
        expect(util.bytesFromStringArray(encodeStrings(['a', 'bb', 'ccc'])))
            .toBe(6);
        expect(util.bytesFromStringArray(encodeStrings(['a', 'bb', 'cccddd'])))
            .toBe(9);
        expect(util.bytesFromStringArray(encodeStrings(['даниел']))).toBe(6 * 2);
    });
});
describe('util.inferDtype', function () {
    it('a single string => string', function () {
        expect(util.inferDtype('hello')).toBe('string');
    });
    it('a single boolean => bool', function () {
        expect(util.inferDtype(true)).toBe('bool');
        expect(util.inferDtype(false)).toBe('bool');
    });
    it('a single number => float32', function () {
        expect(util.inferDtype(0)).toBe('float32');
        expect(util.inferDtype(34)).toBe('float32');
    });
    it('a list of strings => string', function () {
        // Flat.
        expect(util.inferDtype(['a', 'b', 'c'])).toBe('string');
        // Nested.
        expect(util.inferDtype([
            [['a']], [['b']], [['c']], [['d']]
        ])).toBe('string');
    });
    it('a list of bools => float32', function () {
        // Flat.
        expect(util.inferDtype([false, true, false])).toBe('bool');
        // Nested.
        expect(util.inferDtype([
            [[true]], [[false]], [[true]], [[true]]
        ])).toBe('bool');
    });
    it('a list of numbers => float32', function () {
        // Flat.
        expect(util.inferDtype([0, 1, 2])).toBe('float32');
        // Nested.
        expect(util.inferDtype([[[0]], [[1]], [[2]], [[3]]])).toBe('float32');
    });
});
describe('util.repeatedTry', function () {
    it('resolves', function (doneFn) {
        var counter = 0;
        var checkFn = function () {
            counter++;
            if (counter === 2) {
                return true;
            }
            return false;
        };
        util.repeatedTry(checkFn).then(doneFn).catch(function () {
            throw new Error('Rejected backoff.');
        });
    });
    it('rejects', function (doneFn) {
        var checkFn = function () { return false; };
        util.repeatedTry(checkFn, function () { return 0; }, 5)
            .then(function () {
            throw new Error('Backoff resolved');
        })
            .catch(doneFn);
    });
});
describe('util.inferFromImplicitShape', function () {
    it('empty shape', function () {
        var result = util.inferFromImplicitShape([], 0);
        expect(result).toEqual([]);
    });
    it('[2, 3, 4] -> [2, 3, 4]', function () {
        var result = util.inferFromImplicitShape([2, 3, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, -1, 4] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([2, -1, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[-1, 3, 4] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([-1, 3, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, 3, -1] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([2, 3, -1], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, -1, -1] throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, -1, -1], 24); }).toThrowError();
    });
    it('[2, 3, -1] size=13 throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, 3, -1], 13); }).toThrowError();
    });
    it('[2, 3, 4] size=25 (should be 24) throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, 3, 4], 25); }).toThrowError();
    });
});
describe('util parseAxisParam', function () {
    it('axis=null returns no axes for scalar', function () {
        var axis = null;
        var shape = [];
        expect(util.parseAxisParam(axis, shape)).toEqual([]);
    });
    it('axis=null returns 0 axis for Tensor1D', function () {
        var axis = null;
        var shape = [4];
        expect(util.parseAxisParam(axis, shape)).toEqual([0]);
    });
    it('axis=null returns all axes for Tensor3D', function () {
        var axis = null;
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([0, 1, 2]);
    });
    it('axis as a single number', function () {
        var axis = 1;
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([1]);
    });
    it('axis as single negative number', function () {
        var axis = -1;
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([2]);
        var axis2 = -2;
        expect(util.parseAxisParam(axis2, shape)).toEqual([1]);
        var axis3 = -3;
        expect(util.parseAxisParam(axis3, shape)).toEqual([0]);
    });
    it('axis as list of negative numbers', function () {
        var axis = [-1, -3];
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([2, 0]);
    });
    it('axis as list of positive numbers', function () {
        var axis = [0, 2];
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([0, 2]);
    });
    it('axis as combo of positive and negative numbers', function () {
        var axis = [0, -1];
        var shape = [3, 1, 2];
        expect(util.parseAxisParam(axis, shape)).toEqual([0, 2]);
    });
    it('axis out of range throws error', function () {
        var axis = -4;
        var shape = [3, 1, 2];
        expect(function () { return util.parseAxisParam(axis, shape); }).toThrowError();
        var axis2 = 4;
        expect(function () { return util.parseAxisParam(axis2, shape); }).toThrowError();
    });
    it('axis a list with one number out of range throws error', function () {
        var axis = [0, 4];
        var shape = [3, 1, 2];
        expect(function () { return util.parseAxisParam(axis, shape); }).toThrowError();
    });
    it('axis with decimal value throws error', function () {
        var axis = 0.5;
        var shape = [3, 1, 2];
        expect(function () { return util.parseAxisParam(axis, shape); }).toThrowError();
    });
});
describe('util.squeezeShape', function () {
    it('scalar', function () {
        var _a = util.squeezeShape([]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([]);
        expect(keptDims).toEqual([]);
    });
    it('1x1 reduced to scalar', function () {
        var _a = util.squeezeShape([1, 1]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([]);
        expect(keptDims).toEqual([]);
    });
    it('1x3x1 reduced to [3]', function () {
        var _a = util.squeezeShape([1, 3, 1]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([3]);
        expect(keptDims).toEqual([1]);
    });
    it('1x1x4 reduced to [4]', function () {
        var _a = util.squeezeShape([1, 1, 4]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([4]);
        expect(keptDims).toEqual([2]);
    });
    it('2x3x4 not reduction', function () {
        var _a = util.squeezeShape([2, 3, 4]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([2, 3, 4]);
        expect(keptDims).toEqual([0, 1, 2]);
    });
    describe('with axis', function () {
        it('should only reduce dimensions specified by axis', function () {
            var _a = util.squeezeShape([1, 1, 1, 1, 4], [1, 2]), newShape = _a.newShape, keptDims = _a.keptDims;
            expect(newShape).toEqual([1, 1, 4]);
            expect(keptDims).toEqual([0, 3, 4]);
        });
        it('should only reduce dimensions specified by negative axis', function () {
            var _a = util.squeezeShape([1, 1, 1, 1, 4], [-2, -3]), newShape = _a.newShape, keptDims = _a.keptDims;
            expect(newShape).toEqual([1, 1, 4]);
            expect(keptDims).toEqual([0, 1, 4]);
        });
        it('should only reduce dimensions specified by negative axis', function () {
            var axis = [-2, -3];
            util.squeezeShape([1, 1, 1, 1, 4], axis);
            expect(axis).toEqual([-2, -3]);
        });
        it('throws error when specified axis is not squeezable', function () {
            expect(function () { return util.squeezeShape([1, 1, 2, 1, 4], [1, 2]); }).toThrowError();
        });
        it('throws error when specified negative axis is not squeezable', function () {
            expect(function () { return util.squeezeShape([1, 1, 2, 1, 4], [-1, -2]); }).toThrowError();
        });
        it('throws error when specified axis is out of range', function () {
            expect(function () { return util.squeezeShape([1, 1, 2, 1, 4], [11, 22]); }).toThrowError();
        });
        it('throws error when specified negative axis is out of range', function () {
            expect(function () { return util.squeezeShape([1, 1, 2, 1, 4], [
                -11, -22
            ]); }).toThrowError();
        });
    });
});
describe('util.checkComputationForErrors', function () {
    it('Float32Array has NaN', function () {
        expect(function () { return util.checkComputationForErrors(new Float32Array([1, 2, 3, NaN, 4, 255]), 'float32', ''); })
            .toThrowError();
    });
    it('Float32Array has Infinity', function () {
        expect(function () { return util.checkComputationForErrors(new Float32Array([1, 2, 3, Infinity, 4, 255]), 'float32', ''); })
            .toThrowError();
    });
    it('Float32Array no NaN', function () {
        // Int32 and Bool NaNs should not trigger an error.
        expect(function () { return util.checkComputationForErrors(new Float32Array([1, 2, 3, 4, -1, 255]), 'float32', ''); })
            .not.toThrowError();
    });
});
describe('util.checkConversionForErrors', function () {
    it('Float32Array has NaN', function () {
        expect(function () { return util.checkConversionForErrors(new Float32Array([1, 2, 3, NaN, 4, 255]), 'float32'); })
            .toThrowError();
    });
    it('Float32Array has Infinity', function () {
        expect(function () { return util.checkConversionForErrors(new Float32Array([1, 2, 3, Infinity, 4, 255]), 'float32'); })
            .toThrowError();
    });
    it('Int32Array has NaN', function () {
        expect(function () { return util.checkConversionForErrors([1, 2, 3, 4, NaN], 'int32'); })
            .toThrowError();
    });
});
describe('util.hasEncodingLoss', function () {
    it('complex64 to any', function () {
        expect(util.hasEncodingLoss('complex64', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'float32')).toBe(true);
        expect(util.hasEncodingLoss('complex64', 'int32')).toBe(true);
        expect(util.hasEncodingLoss('complex64', 'bool')).toBe(true);
    });
    it('any to complex64', function () {
        expect(util.hasEncodingLoss('bool', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'complex64')).toBe(false);
    });
    it('any to float32', function () {
        expect(util.hasEncodingLoss('bool', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'float32')).toBe(true);
    });
    it('float32 to any', function () {
        expect(util.hasEncodingLoss('float32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'int32')).toBe(true);
        expect(util.hasEncodingLoss('float32', 'bool')).toBe(true);
        expect(util.hasEncodingLoss('float32', 'complex64')).toBe(false);
    });
    it('int32 to lower', function () {
        expect(util.hasEncodingLoss('int32', 'int32')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'bool')).toBe(true);
    });
    it('lower to int32', function () {
        expect(util.hasEncodingLoss('bool', 'int32')).toBe(false);
    });
    it('bool to bool', function () {
        expect(util.hasEncodingLoss('bool', 'bool')).toBe(false);
    });
});
jasmine_util_1.describeWithFlags('util.toNestedArray', jasmine_util_1.ALL_ENVS, function () {
    it('2 dimensions', function () {
        var a = new Float32Array([1, 2, 3, 4, 5, 6]);
        expect(util.toNestedArray([2, 3], a)).toEqual([[1, 2, 3], [4, 5, 6]]);
    });
    it('3 dimensions (2x2x3)', function () {
        var a = new Float32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        expect(util.toNestedArray([2, 2, 3], a)).toEqual([
            [[0, 1, 2], [3, 4, 5]], [[6, 7, 8], [9, 10, 11]]
        ]);
    });
    it('3 dimensions (3x2x2)', function () {
        var a = new Float32Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
        expect(util.toNestedArray([3, 2, 2], a)).toEqual([
            [[0, 1], [2, 3]], [[4, 5], [6, 7]], [[8, 9], [10, 11]]
        ]);
    });
    it('invalid dimension', function () {
        var a = new Float32Array([1, 2, 3]);
        expect(function () { return util.toNestedArray([2, 2], a); }).toThrowError();
    });
    it('tensor to nested array', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    x = ops_1.tensor2d([1, 2, 3, 4], [2, 2]);
                    _a = expect;
                    _c = (_b = util).toNestedArray;
                    _d = [x.shape];
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_c.apply(_b, _d.concat([_e.sent()]))]).toEqual([
                        [1, 2], [3, 4]
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('scalar to nested array', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    x = ops_1.scalar(1);
                    _a = expect;
                    _c = (_b = util).toNestedArray;
                    _d = [x.shape];
                    return [4 /*yield*/, x.data()];
                case 1:
                    _a.apply(void 0, [_c.apply(_b, _d.concat([_e.sent()]))]).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('tensor with zero shape', function () {
        var a = new Float32Array([0, 1]);
        expect(util.toNestedArray([1, 0, 2], a)).toEqual([]);
    });
});
describe('util.fetch', function () {
    it('should call the platform fetch', function () {
        spyOn(environment_1.ENV.platform, 'fetch').and.callFake(function () { });
        util.fetch('test/path', { method: 'GET' });
        expect(environment_1.ENV.platform.fetch).toHaveBeenCalledWith('test/path', {
            method: 'GET'
        });
    });
});
describe('util.encodeString', function () {
    it('Encode an empty string, default encoding', function () {
        var res = util.encodeString('');
        expect(res).toEqual(new Uint8Array([]));
    });
    it('Encode an empty string, utf-8 encoding', function () {
        var res = util.encodeString('', 'utf-8');
        expect(res).toEqual(new Uint8Array([]));
    });
    it('Encode an empty string, encoding must be utf-8', function () {
        expect(function () { return util.encodeString('', 'utf-16'); })
            .toThrowError(/only supports utf-8, but got utf-16/);
    });
    it('Encode cyrillic letters', function () {
        var res = util.encodeString('Kaкo стe');
        expect(res).toEqual(new Uint8Array([75, 97, 208, 186, 111, 32, 209, 129, 209, 130, 101]));
    });
    it('Encode ascii letters', function () {
        var res = util.encodeString('hello');
        expect(res).toEqual(new Uint8Array([104, 101, 108, 108, 111]));
    });
});
describe('util.decodeString', function () {
    it('decode an empty string', function () {
        var s = util.decodeString(new Uint8Array([]));
        expect(s).toEqual('');
    });
    it('decode ascii', function () {
        var s = util.decodeString(new Uint8Array([104, 101, 108, 108, 111]));
        expect(s).toEqual('hello');
    });
    it('decode cyrillic', function () {
        var s = util.decodeString(new Uint8Array([75, 97, 208, 186, 111, 32, 209, 129, 209, 130, 101]));
        expect(s).toEqual('Kaкo стe');
    });
    it('decode utf-16', function () {
        var s = util.decodeString(new Uint8Array([255, 254, 237, 139, 0, 138, 4, 89, 6, 116]), 'utf-16');
        expect(s).toEqual('语言处理');
    });
});
//# sourceMappingURL=util_test.js.map