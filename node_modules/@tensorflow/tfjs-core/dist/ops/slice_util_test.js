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
Object.defineProperty(exports, "__esModule", { value: true });
var jasmine_util_1 = require("../jasmine_util");
var slice_util_1 = require("./slice_util");
jasmine_util_1.describeWithFlags('isSliceContinous', jasmine_util_1.ALL_ENVS, function () {
    it('[] => []', function () {
        var shape = [];
        var size = [];
        var begin = [];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeTruthy();
    });
    it('[5] sliced to [3]', function () {
        var shape = [5];
        var size = [3];
        var begin = [1];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeTruthy();
    });
    it('[5, 3] sliced to [2, 3] skipping a row', function () {
        var shape = [5, 3];
        var size = [2, 3];
        var begin = [1, 0];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeTruthy();
    });
    it('[5, 3] sliced to [5, 2] skipping a column', function () {
        var shape = [5, 3];
        var size = [5, 2];
        var begin = [0, 1];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeFalsy();
    });
    it('[5, 3] sliced to [1, 2] skipping a row and column', function () {
        var shape = [5, 3];
        var size = [1, 2];
        var begin = [2, 1];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeTruthy();
    });
    it('[1, 5, 3] sliced to [1, 2, 3], skipping middle axis', function () {
        var shape = [1, 5, 3];
        var size = [1, 2, 3];
        var begin = [0, 2, 0];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeTruthy();
    });
    it('[2, 5, 3] sliced to [2, 2, 3], skipping middle axis', function () {
        var shape = [2, 5, 3];
        var size = [2, 2, 3];
        var begin = [0, 2, 0];
        expect(slice_util_1.isSliceContinous(shape, begin, size)).toBeFalsy();
    });
});
//# sourceMappingURL=slice_util_test.js.map