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
Object.defineProperty(exports, "__esModule", { value: true });
var broadcast_util = require("./broadcast_util");
describe('broadcast_util.getBroadcastShape', function () {
    it('two scalars', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([], []);
        expect(res).toEqual([]);
    });
    it('scalar and 1d', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([6], []);
        expect(res).toEqual([6]);
    });
    it('scalar and 2d', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([2, 6], []);
        expect(res).toEqual([2, 6]);
    });
    it('1d and 2d', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([6], [2, 6]);
        expect(res).toEqual([2, 6]);
    });
    it('2d and 3d', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([2, 6], [7, 2, 6]);
        expect(res).toEqual([7, 2, 6]);
    });
    it('3d and 3d', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([1, 1, 6], [7, 2, 6]);
        expect(res).toEqual([7, 2, 6]);
    });
    it('incompatible inner shape', function () {
        var f = function () {
            return broadcast_util.assertAndGetBroadcastShape([7, 2, 5], [7, 2, 6]);
        };
        expect(f).toThrowError();
    });
    it('incompatible middle shape', function () {
        var f = function () {
            return broadcast_util.assertAndGetBroadcastShape([7, 3, 6], [7, 2, 6]);
        };
        expect(f).toThrowError();
    });
    it('compatible with broadcasting support', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([7, 1, 1], [7, 1, 1]);
        expect(res).toEqual([7, 1, 1]);
    });
    it('3d and 3d, each gets broadcasted', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([4, 1, 7], [1, 3, 1]);
        expect(res).toEqual([4, 3, 7]);
    });
    it('[0] and [1] = [0]', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([0], [1]);
        expect(res).toEqual([0]);
        var res2 = broadcast_util.assertAndGetBroadcastShape([1], [0]);
        expect(res2).toEqual([0]);
    });
    it('[0] and [0] = [0]', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([0], [0]);
        expect(res).toEqual([0]);
    });
    it('[0, 1] and [1, 3] = [0, 3]', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([0, 1], [1, 3]);
        expect(res).toEqual([0, 3]);
    });
    it('[5, 0, 3] and [5, 1, 1] = [5, 0, 3]', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([5, 0, 3], [5, 1, 1]);
        expect(res).toEqual([5, 0, 3]);
    });
    it('[1] and [0, 0, 4] = [0, 0, 4]', function () {
        var res = broadcast_util.assertAndGetBroadcastShape([1], [0, 0, 4]);
        expect(res).toEqual([0, 0, 4]);
    });
});
describe('broadcast_util.getBroadcastDims', function () {
    it('[] => []', function () {
        var dims = broadcast_util.getBroadcastDims([], []);
        expect(dims.length).toBe(0);
    });
    it('[] => [5, 4]', function () {
        var dims = broadcast_util.getBroadcastDims([], [5, 4]);
        expect(dims.length).toBe(0);
    });
    it('[1] => [5]', function () {
        var dims = broadcast_util.getBroadcastDims([1], [5]);
        expect(dims).toEqual([0]);
    });
    it('[5, 1] => [5, 3]', function () {
        var dims = broadcast_util.getBroadcastDims([5, 1], [5, 3]);
        expect(dims).toEqual([1]);
    });
    it('[1, 3] => [5, 3]', function () {
        var dims = broadcast_util.getBroadcastDims([1, 3], [5, 3]);
        expect(dims).toEqual([0]);
    });
    it('[1, 1] => [5, 3]', function () {
        var dims = broadcast_util.getBroadcastDims([1, 1], [5, 3]);
        expect(dims).toEqual([0, 1]);
    });
    it('[4, 1, 3] => [4, 5, 3]', function () {
        var dims = broadcast_util.getBroadcastDims([4, 1, 3], [4, 5, 3]);
        expect(dims).toEqual([1]);
    });
});
describe('broadcast_util.getReductionAxes', function () {
    it('[] => []', function () {
        var axes = broadcast_util.getReductionAxes([], []);
        expect(axes).toEqual([]);
    });
    it('[] => [5, 4]', function () {
        var axes = broadcast_util.getReductionAxes([], [5, 4]);
        expect(axes).toEqual([0, 1]);
    });
    it('[1] => [5]', function () {
        var axes = broadcast_util.getReductionAxes([1], [5]);
        expect(axes).toEqual([0]);
    });
    it('[5, 1] => [5, 3]', function () {
        var axes = broadcast_util.getReductionAxes([5, 1], [5, 3]);
        expect(axes).toEqual([1]);
    });
    it('[1, 3] => [5, 3]', function () {
        var axes = broadcast_util.getReductionAxes([1, 3], [5, 3]);
        expect(axes).toEqual([0]);
    });
    it('[1, 1] => [5, 3]', function () {
        var axes = broadcast_util.getReductionAxes([1, 1], [5, 3]);
        expect(axes).toEqual([0, 1]);
    });
    it('[4, 1, 3] => [4, 5, 3]', function () {
        var axes = broadcast_util.getReductionAxes([4, 1, 3], [4, 5, 3]);
        expect(axes).toEqual([1]);
    });
});
//# sourceMappingURL=broadcast_util_test.js.map