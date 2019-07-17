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
var engine_1 = require("./engine");
var tensor_util_env_1 = require("./tensor_util_env");
var util_1 = require("./util");
var TEST_EPSILON_FLOAT32 = 1e-3;
exports.TEST_EPSILON_FLOAT16 = 1e-1;
function expectArraysClose(actual, expected, epsilon) {
    if (epsilon == null) {
        epsilon = testEpsilon();
    }
    return expectArraysPredicate(actual, expected, function (a, b) { return areClose(a, b, epsilon); });
}
exports.expectArraysClose = expectArraysClose;
function testEpsilon() {
    return engine_1.ENGINE.backend.floatPrecision() === 32 ? TEST_EPSILON_FLOAT32 :
        exports.TEST_EPSILON_FLOAT16;
}
exports.testEpsilon = testEpsilon;
function expectArraysPredicate(actual, expected, predicate) {
    var checkClassType = true;
    if (util_1.isTypedArray(actual) || util_1.isTypedArray(expected)) {
        checkClassType = false;
    }
    if (util_1.isTypedArray(actual) && util_1.isTypedArray(expected)) {
        checkClassType = true;
    }
    if (checkClassType) {
        var aType = actual.constructor.name;
        var bType = expected.constructor.name;
        if (aType !== bType) {
            throw new Error("Arrays are of different type. Actual: " + aType + ". " +
                ("Expected: " + bType));
        }
    }
    if (Array.isArray(actual) && Array.isArray(expected)) {
        var actualShape = tensor_util_env_1.inferShape(actual);
        var expectedShape = tensor_util_env_1.inferShape(expected);
        if (!util_1.arraysEqual(actualShape, expectedShape)) {
            throw new Error("Arrays have different shapes. " +
                ("Actual: [" + actualShape + "]. Expected: [" + expectedShape + "]"));
        }
    }
    var actualFlat = util_1.isTypedArray(actual) ? actual : util_1.flatten(actual);
    var expectedFlat = util_1.isTypedArray(expected) ?
        expected :
        util_1.flatten(expected);
    if (actualFlat.length !== expectedFlat.length) {
        throw new Error("Arrays have different lengths actual: " + actualFlat.length + " vs " +
            ("expected: " + expectedFlat.length + ".\n") +
            ("Actual:   " + actualFlat + ".\n") +
            ("Expected: " + expectedFlat + "."));
    }
    for (var i = 0; i < expectedFlat.length; ++i) {
        var a = actualFlat[i];
        var e = expectedFlat[i];
        if (!predicate(a, e)) {
            throw new Error("Arrays differ: actual[" + i + "] = " + a + ", expected[" + i + "] = " + e + ".\n" +
                ("Actual:   " + actualFlat + ".\n") +
                ("Expected: " + expectedFlat + "."));
        }
    }
}
function expectPromiseToFail(fn, done) {
    fn().then(function () { return done.fail(); }, function () { return done(); });
}
exports.expectPromiseToFail = expectPromiseToFail;
function expectArraysEqual(actual, expected) {
    var exp = typeof expected === 'string' || typeof expected === 'number' ||
        typeof expected === 'boolean' ?
        [expected] :
        expected;
    if (util_1.isString(actual) || util_1.isString(actual[0]) ||
        util_1.isString(expected) || util_1.isString(expected[0])) {
        // tslint:disable-next-line: triple-equals
        return expectArraysPredicate(actual, exp, function (a, b) { return a == b; });
    }
    return expectArraysPredicate(actual, expected, function (a, b) { return areClose(a, b, 0); });
}
exports.expectArraysEqual = expectArraysEqual;
function expectNumbersClose(a, e, epsilon) {
    if (epsilon == null) {
        epsilon = testEpsilon();
    }
    if (!areClose(a, e, epsilon)) {
        throw new Error("Numbers differ: actual === " + a + ", expected === " + e);
    }
}
exports.expectNumbersClose = expectNumbersClose;
function areClose(a, e, epsilon) {
    if (!isFinite(a) && !isFinite(e)) {
        return true;
    }
    if (isNaN(a) || isNaN(e) || Math.abs(a - e) > epsilon) {
        return false;
    }
    return true;
}
function expectValuesInRange(actual, low, high) {
    for (var i = 0; i < actual.length; i++) {
        if (actual[i] < low || actual[i] > high) {
            throw new Error("Value out of range:" + actual[i] + " low: " + low + ", high: " + high);
        }
    }
}
exports.expectValuesInRange = expectValuesInRange;
function expectArrayBuffersEqual(actual, expected) {
    // Safari & Jasmine don't like comparing ArrayBuffers directly. Wrapping in
    // a Float32Array solves this issue.
    expect(new Float32Array(actual)).toEqual(new Float32Array(expected));
}
exports.expectArrayBuffersEqual = expectArrayBuffersEqual;
//# sourceMappingURL=test_util.js.map