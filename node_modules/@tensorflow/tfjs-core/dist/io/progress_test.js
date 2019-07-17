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
Object.defineProperty(exports, "__esModule", { value: true });
var progress_1 = require("./progress");
describe('util.monitorPromisesProgress', function () {
    it('Default progress from 0 to 1', function (done) {
        var expectFractions = [0.25, 0.50, 0.75, 1.00];
        var fractionList = [];
        var tasks = Array(4).fill(0).map(function () {
            return Promise.resolve();
        });
        progress_1.monitorPromisesProgress(tasks, function (progress) {
            fractionList.push(parseFloat(progress.toFixed(2)));
        }).then(function () {
            expect(fractionList).toEqual(expectFractions);
            done();
        });
    });
    it('Progress with pre-defined range', function (done) {
        var startFraction = 0.2;
        var endFraction = 0.8;
        var expectFractions = [0.35, 0.50, 0.65, 0.80];
        var fractionList = [];
        var tasks = Array(4).fill(0).map(function () {
            return Promise.resolve();
        });
        progress_1.monitorPromisesProgress(tasks, function (progress) {
            fractionList.push(parseFloat(progress.toFixed(2)));
        }, startFraction, endFraction).then(function () {
            expect(fractionList).toEqual(expectFractions);
            done();
        });
    });
    it('throws error when progress fraction is out of range', function () {
        expect(function () {
            var startFraction = -1;
            var endFraction = 1;
            var tasks = Array(4).fill(0).map(function () {
                return Promise.resolve();
            });
            progress_1.monitorPromisesProgress(tasks, function (progress) { }, startFraction, endFraction);
        }).toThrowError();
    });
    it('throws error when startFraction more than endFraction', function () {
        expect(function () {
            var startFraction = 0.8;
            var endFraction = 0.2;
            var tasks = Array(4).fill(0).map(function () {
                return Promise.resolve();
            });
            progress_1.monitorPromisesProgress(tasks, function (progress) { }, startFraction, endFraction);
        }).toThrowError();
    });
    it('throws error when promises is null', function () {
        expect(function () {
            progress_1.monitorPromisesProgress(null, function (progress) { });
        }).toThrowError();
    });
    it('throws error when promises is empty array', function () {
        expect(function () {
            progress_1.monitorPromisesProgress([], function (progress) { });
        }).toThrowError();
    });
});
//# sourceMappingURL=progress_test.js.map