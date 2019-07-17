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
var rand_1 = require("./rand");
var rand_util_1 = require("./rand_util");
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
describe('MPRandGauss', function () {
    var EPSILON = 0.05;
    var SEED = 2002;
    it('should default to float32 numbers', function () {
        var rand = new rand_1.MPRandGauss(0, 1.5);
        expect(isFloat(rand.nextValue())).toBe(true);
    });
    it('should handle create a mean/stdv of float32 numbers', function () {
        var rand = new rand_1.MPRandGauss(0, 1.5, 'float32', false /* truncated */, SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        rand_util_1.expectArrayInMeanStdRange(values, 0, 1.5, EPSILON);
        rand_util_1.jarqueBeraNormalityTest(values);
    });
    it('should handle int32 numbers', function () {
        var rand = new rand_1.MPRandGauss(0, 1, 'int32');
        expect(isFloat(rand.nextValue())).toBe(false);
    });
    it('should handle create a mean/stdv of int32 numbers', function () {
        var rand = new rand_1.MPRandGauss(0, 2, 'int32', false /* truncated */, SEED);
        var values = [];
        var size = 10000;
        for (var i = 0; i < size; i++) {
            values.push(rand.nextValue());
        }
        rand_util_1.expectArrayInMeanStdRange(values, 0, 2, EPSILON);
        rand_util_1.jarqueBeraNormalityTest(values);
    });
    it('Should not have a more than 2x std-d from mean for truncated values', function () {
        var stdv = 1.5;
        var rand = new rand_1.MPRandGauss(0, stdv, 'float32', true /* truncated */);
        for (var i = 0; i < 1000; i++) {
            expect(Math.abs(rand.nextValue())).toBeLessThan(stdv * 2);
        }
    });
});
describe('UniformRandom', function () {
    it('float32, no seed', function () {
        var min = 0.2;
        var max = 0.24;
        var dtype = 'float32';
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_1.UniformRandom(min, max, dtype);
            var x = rand.nextValue();
            xs.push(x);
        }
        expect(Math.min.apply(Math, xs)).toBeGreaterThanOrEqual(min);
        expect(Math.max.apply(Math, xs)).toBeLessThan(max);
    });
    it('int32, no seed', function () {
        var min = 13;
        var max = 37;
        var dtype = 'int32';
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_1.UniformRandom(min, max, dtype);
            var x = rand.nextValue();
            expect(Number.isInteger(x)).toEqual(true);
            xs.push(x);
        }
        expect(Math.min.apply(Math, xs)).toBeGreaterThanOrEqual(min);
        expect(Math.max.apply(Math, xs)).toBeLessThanOrEqual(max);
    });
    it('seed is number', function () {
        var min = -1.2;
        var max = -0.4;
        var dtype = 'float32';
        var seed = 1337;
        var xs = [];
        for (var i = 0; i < 10; ++i) {
            var rand = new rand_1.UniformRandom(min, max, dtype, seed);
            var x = rand.nextValue();
            expect(x).toBeGreaterThanOrEqual(min);
            expect(x).toBeLessThan(max);
            xs.push(x);
        }
        // Assert deterministic results.
        expect(Math.min.apply(Math, xs)).toEqual(Math.max.apply(Math, xs));
    });
    it('seed === null', function () {
        var min = 0;
        var max = 1;
        var dtype = 'float32';
        var seed = null;
        var rand = new rand_1.UniformRandom(min, max, dtype, seed);
        var x = rand.nextValue();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(1);
    });
    it('seed === undefined', function () {
        var min = 0;
        var max = 1;
        var dtype = 'float32';
        var seed = undefined;
        var rand = new rand_1.UniformRandom(min, max, dtype, seed);
        var x = rand.nextValue();
        expect(x).toBeGreaterThanOrEqual(0);
        expect(x).toBeLessThan(1);
    });
});
//# sourceMappingURL=rand_test.js.map