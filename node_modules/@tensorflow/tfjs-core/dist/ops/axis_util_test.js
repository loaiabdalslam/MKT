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
var axis_util = require("./axis_util");
describe('axis_util combineLocations', function () {
    it('rank 4, reduce last 2 dims', function () {
        var loc = axis_util.combineLocations([4, 1], [3, 7], [2, 3]);
        expect(loc).toEqual([4, 1, 3, 7]);
    });
    it('rank 4, reduce first two dims', function () {
        var loc = axis_util.combineLocations([4, 1], [3, 7], [0, 1]);
        expect(loc).toEqual([3, 7, 4, 1]);
    });
    it('rank 4, reduce 1st and 3rd dims', function () {
        var loc = axis_util.combineLocations([4, 1], [3, 7], [0, 2]);
        expect(loc).toEqual([3, 4, 7, 1]);
    });
    it('rank 4, reduce 1st and 4th dims', function () {
        var loc = axis_util.combineLocations([4, 1], [3, 7], [0, 3]);
        expect(loc).toEqual([3, 4, 1, 7]);
    });
    it('rank 3, reduce all dims', function () {
        var loc = axis_util.combineLocations([], [3, 7, 1], [0, 1, 2]);
        expect(loc).toEqual([3, 7, 1]);
    });
    it('rank 2, reduce last dim', function () {
        var loc = axis_util.combineLocations([3], [5], [1]);
        expect(loc).toEqual([3, 5]);
    });
    it('rank 2, reduce first dim', function () {
        var loc = axis_util.combineLocations([3], [5], [0]);
        expect(loc).toEqual([5, 3]);
    });
});
describe('axis_util computeOutAndReduceShapes', function () {
    it('rank 4, reduce all dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2, 4], [0, 1, 2, 3]), out = _a[0], red = _a[1];
        expect(out).toEqual([]);
        expect(red).toEqual([3, 7, 2, 4]);
    });
    it('rank 4, reduce last 2 dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2, 4], [2, 3]), out = _a[0], red = _a[1];
        expect(out).toEqual([3, 7]);
        expect(red).toEqual([2, 4]);
    });
    it('rank 4, reduce first 2 dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2, 4], [0, 1]), out = _a[0], red = _a[1];
        expect(out).toEqual([2, 4]);
        expect(red).toEqual([3, 7]);
    });
    it('rank 4, reduce last 3 dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2, 4], [1, 2, 3]), out = _a[0], red = _a[1];
        expect(out).toEqual([3]);
        expect(red).toEqual([7, 2, 4]);
    });
    it('rank 4, reduce 1st and 3rd dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2, 4], [0, 2]), out = _a[0], red = _a[1];
        expect(out).toEqual([7, 4]);
        expect(red).toEqual([3, 2]);
    });
    it('rank 3, reduce all dims', function () {
        var _a = axis_util.computeOutAndReduceShapes([3, 7, 2], [0, 1, 2]), out = _a[0], red = _a[1];
        expect(out).toEqual([]);
        expect(red).toEqual([3, 7, 2]);
    });
});
describe('axis_util axesAreInnerMostDims', function () {
    it('rank 4, reduce last dim', function () {
        var res = axis_util.axesAreInnerMostDims([3], 4);
        expect(res).toBe(true);
    });
    it('rank 4, reduce last 2 dims', function () {
        var res = axis_util.axesAreInnerMostDims([2, 3], 4);
        expect(res).toBe(true);
    });
    it('rank 4, reduce last 3 dims', function () {
        var res = axis_util.axesAreInnerMostDims([1, 2, 3], 4);
        expect(res).toBe(true);
    });
    it('rank 4, reduce all dims', function () {
        var res = axis_util.axesAreInnerMostDims([0, 1, 2, 3], 4);
        expect(res).toBe(true);
    });
    it('rank 4, reduce all but 2nd', function () {
        var res = axis_util.axesAreInnerMostDims([0, 2, 3], 4);
        expect(res).toBe(false);
    });
    it('rank 4, reduce all but 3rd', function () {
        var res = axis_util.axesAreInnerMostDims([0, 1, 3], 4);
        expect(res).toBe(false);
    });
    it('rank 4, reduce all but last', function () {
        var res = axis_util.axesAreInnerMostDims([0, 1, 2], 4);
        expect(res).toBe(false);
    });
});
describe('axis_util expandShapeToKeepDim', function () {
    it('2d -> 1d axis=0', function () {
        var shape = axis_util.expandShapeToKeepDim([2], [0]);
        expect(shape).toEqual([1, 2]);
    });
    it('2d -> 1d axis=1', function () {
        var shape = axis_util.expandShapeToKeepDim([4], [1]);
        expect(shape).toEqual([4, 1]);
    });
    it('3d -> 1d axis=1,2', function () {
        var shape = axis_util.expandShapeToKeepDim([7], [1, 2]);
        expect(shape).toEqual([7, 1, 1]);
    });
    it('3d -> 2d axis=1', function () {
        var shape = axis_util.expandShapeToKeepDim([7, 3], [1]);
        expect(shape).toEqual([7, 1, 3]);
    });
});
describe('axis_util getPermAxes', function () {
    it('all axes, no perm is needed', function () {
        var perm = axis_util.getAxesPermutation([0, 1, 2], 3);
        expect(perm).toBeNull();
    });
    it('no axes, no perm is needed', function () {
        var perm = axis_util.getAxesPermutation([], 3);
        expect(perm).toBeNull();
    });
    it('inner most 2 axes, no perm is needed', function () {
        var perm = axis_util.getAxesPermutation([2, 3], 4);
        expect(perm).toBeNull();
    });
    it('outer most axis, perm is needed', function () {
        var perm = axis_util.getAxesPermutation([0], 4);
        expect(perm).toEqual([1, 2, 3, 0]);
    });
    it('2 outer most axes, perm is needed', function () {
        var perm = axis_util.getAxesPermutation([0, 1], 4);
        expect(perm).toEqual([2, 3, 0, 1]);
    });
});
jasmine_util_1.describeWithFlags('axis_util getUndoAxesPermutation', jasmine_util_1.ALL_ENVS, function () {
    it('4d axes', function () {
        var axes = [2, 0, 1, 3];
        expect(axis_util.getUndoAxesPermutation(axes)).toEqual([1, 2, 0, 3]);
    });
    it('3d axes, no perm', function () {
        var axes = [0, 1, 2];
        expect(axis_util.getUndoAxesPermutation(axes)).toEqual([0, 1, 2]);
    });
    it('3d axes, complete flip', function () {
        var axes = [2, 1, 0];
        expect(axis_util.getUndoAxesPermutation(axes)).toEqual([2, 1, 0]);
    });
    it('4d array with values', function () { return __awaiter(_this, void 0, void 0, function () {
        var axes, undoPermutation, a, aT, aTT, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    axes = [2, 0, 1, 3];
                    undoPermutation = axis_util.getUndoAxesPermutation(axes);
                    a = tf.randomNormal([2, 3, 4, 5]);
                    aT = tf.transpose(a, axes);
                    aTT = tf.transpose(aT, undoPermutation);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, aTT.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=axis_util_test.js.map