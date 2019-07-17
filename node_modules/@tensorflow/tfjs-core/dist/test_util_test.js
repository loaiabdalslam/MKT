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
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('expectArraysEqual', jasmine_util_1.ALL_ENVS, function () {
    it('same arrays', function () {
        test_util_1.expectArraysEqual([1, 2, 3], [1, 2, 3]);
    });
    it('throws on different arrays', function () {
        expect(function () { return test_util_1.expectArraysEqual([1, 2, 3], [3, 2, 1]); })
            .toThrowError(/Arrays differ/);
    });
    it('same nested arrays', function () {
        test_util_1.expectArraysEqual([[1, 2], [3, 4]], [[1, 2], [3, 4]]);
    });
    it('throws on different nested arrays', function () {
        expect(function () { return test_util_1.expectArraysEqual([[1, 2], [3, 4]], [[1, 2], [4, 3]]); })
            .toThrowError(/Arrays differ/);
    });
    it('throws on different nested shapes', function () {
        expect(function () { return test_util_1.expectArraysEqual([[1, 2], [3, 4]], [1, 2, 3, 4]); })
            .toThrowError(/Arrays have different shapes. Actual: \[2,2\]. Expected: \[4\]/);
    });
    it('float32 with regular array', function () {
        test_util_1.expectArraysEqual(new Float32Array([1, 2, 3]), [1, 2, 3]);
    });
    it('throws on different values of float32 with regular array', function () {
        expect(function () { return test_util_1.expectArraysEqual(new Float32Array([1, 2, 3]), [1, 2, 4]); })
            .toThrowError(/Arrays differ/);
    });
    it('int32 with regular array', function () {
        test_util_1.expectArraysEqual(new Int32Array([1, 2, 3]), [1, 2, 3]);
    });
    it('throws on different values of int32 with regular array', function () {
        expect(function () { return test_util_1.expectArraysEqual(new Int32Array([1, 2, 3]), [1, 2, 4]); })
            .toThrowError(/Arrays differ/);
    });
    it('throws on float32 with int32', function () {
        expect(function () { return test_util_1.expectArraysEqual(new Float32Array([1, 2, 3]), new Int32Array([1, 2, 3])); })
            .toThrowError(/Arrays are of different type/);
    });
    it('throws on int32 with uint8', function () {
        expect(function () { return test_util_1.expectArraysEqual(new Int32Array([1, 2, 3]), new Uint8Array([1, 2, 3])); })
            .toThrowError(/Arrays are of different type/);
    });
});
jasmine_util_1.describeWithFlags('expectArraysClose', jasmine_util_1.ALL_ENVS, function () {
    it('same arrays', function () {
        test_util_1.expectArraysClose([1, 2, 3], [1, 2, 3]);
    });
    it('throws on different arrays', function () {
        expect(function () { return test_util_1.expectArraysClose([1, 2, 3], [3, 2, 1]); })
            .toThrowError(/Arrays differ/);
    });
    it('same nested arrays', function () {
        test_util_1.expectArraysClose([[1, 2], [3, 4]], [[1, 2], [3, 4]]);
    });
    it('throws on different nested arrays', function () {
        expect(function () { return test_util_1.expectArraysClose([[1, 2], [3, 4]], [[1, 2], [4, 3]]); })
            .toThrowError(/Arrays differ/);
    });
    it('throws on different nested shapes', function () {
        expect(function () { return test_util_1.expectArraysClose([[1, 2], [3, 4]], [1, 2, 3, 4]); })
            .toThrowError(/Arrays have different shapes. Actual: \[2,2\]. Expected: \[4\]/);
    });
    it('float32 with regular array', function () {
        test_util_1.expectArraysClose(new Float32Array([1, 2, 3]), [1, 2, 3]);
    });
    it('throws on different values of float32 with regular array', function () {
        expect(function () { return test_util_1.expectArraysClose(new Float32Array([1, 2, 3]), [1, 2, 4]); })
            .toThrowError(/Arrays differ/);
    });
    it('int32 with regular array', function () {
        test_util_1.expectArraysClose(new Int32Array([1, 2, 3]), [1, 2, 3]);
    });
    it('throws on different values of int32 with regular array', function () {
        expect(function () { return test_util_1.expectArraysClose(new Int32Array([1, 2, 3]), [1, 2, 4]); })
            .toThrowError(/Arrays differ/);
    });
    it('throws on float32 with int32', function () {
        expect(function () { return test_util_1.expectArraysClose(new Float32Array([1, 2, 3]), new Int32Array([1, 2, 3])); })
            .toThrowError(/Arrays are of different type/);
    });
    it('throws on int32 with uint8', function () {
        expect(function () { return test_util_1.expectArraysClose(new Int32Array([1, 2, 3]), new Uint8Array([1, 2, 3])); })
            .toThrowError(/Arrays are of different type/);
    });
    it('similar arrays with good epsilon', function () {
        var epsilon = 0.1;
        test_util_1.expectArraysClose(new Float32Array([1, 2, 3.08]), [1, 2, 3], epsilon);
    });
    it('similar arrays with bad epsilon', function () {
        var epsilon = 0.01;
        expect(function () { return test_util_1.expectArraysClose(new Float32Array([1, 2, 3.08]), [1, 2, 3], epsilon); })
            .toThrowError(/Arrays differ/);
    });
});
//# sourceMappingURL=test_util_test.js.map