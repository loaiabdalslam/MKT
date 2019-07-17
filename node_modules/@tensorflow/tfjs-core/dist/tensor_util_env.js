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
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var tensor_1 = require("./tensor");
var util_1 = require("./util");
function inferShape(val, dtype) {
    var firstElem = val;
    if (util_1.isTypedArray(val)) {
        return dtype === 'string' ? [] : [val.length];
    }
    if (!Array.isArray(val)) {
        return []; // Scalar.
    }
    var shape = [];
    while (Array.isArray(firstElem) ||
        util_1.isTypedArray(firstElem) && dtype !== 'string') {
        shape.push(firstElem.length);
        firstElem = firstElem[0];
    }
    if (Array.isArray(val) && environment_1.ENV.getBool('TENSORLIKE_CHECK_SHAPE_CONSISTENCY')) {
        deepAssertShapeConsistency(val, shape, []);
    }
    return shape;
}
exports.inferShape = inferShape;
function deepAssertShapeConsistency(val, shape, indices) {
    indices = indices || [];
    if (!(Array.isArray(val)) && !util_1.isTypedArray(val)) {
        util_1.assert(shape.length === 0, function () { return "Element arr[" + indices.join('][') + "] is a primitive, " +
            ("but should be an array/TypedArray of " + shape[0] + " elements"); });
        return;
    }
    util_1.assert(shape.length > 0, function () { return "Element arr[" + indices.join('][') + "] should be a primitive, " +
        ("but is an array of " + val.length + " elements"); });
    util_1.assert(val.length === shape[0], function () { return "Element arr[" + indices.join('][') + "] should have " + shape[0] + " " +
        ("elements, but has " + val.length + " elements"); });
    var subShape = shape.slice(1);
    for (var i = 0; i < val.length; ++i) {
        deepAssertShapeConsistency(val[i], subShape, indices.concat(i));
    }
}
function assertDtype(expectedDtype, actualDType, argName, functionName) {
    if (expectedDtype == null) {
        return;
    }
    if (expectedDtype !== 'numeric' && expectedDtype !== actualDType ||
        expectedDtype === 'numeric' && actualDType === 'string') {
        throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must " +
            ("be " + expectedDtype + " tensor, but got " + actualDType + " tensor"));
    }
}
function convertToTensor(x, argName, functionName, parseAsDtype) {
    if (parseAsDtype === void 0) { parseAsDtype = 'numeric'; }
    if (x instanceof tensor_1.Tensor) {
        assertDtype(parseAsDtype, x.dtype, argName, functionName);
        return x;
    }
    var inferredDtype = util_1.inferDtype(x);
    // If the user expects a bool/int/float, use that info to update the
    // inferredDtype when it is not a string.
    if (inferredDtype !== 'string' &&
        ['bool', 'int32', 'float32'].indexOf(parseAsDtype) >= 0) {
        inferredDtype = parseAsDtype;
    }
    assertDtype(parseAsDtype, inferredDtype, argName, functionName);
    if ((x == null) ||
        (!util_1.isTypedArray(x) && !Array.isArray(x) && typeof x !== 'number' &&
            typeof x !== 'boolean' && typeof x !== 'string')) {
        var type = x == null ? 'null' : x.constructor.name;
        throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must be a " +
            ("Tensor or TensorLike, but got '" + type + "'"));
    }
    var inferredShape = inferShape(x, inferredDtype);
    if (!util_1.isTypedArray(x) && !Array.isArray(x)) {
        x = [x];
    }
    var skipTypedArray = true;
    var values = inferredDtype !== 'string' ?
        util_1.toTypedArray(x, inferredDtype, environment_1.ENV.getBool('DEBUG')) :
        util_1.flatten(x, [], skipTypedArray);
    return tensor_1.Tensor.make(inferredShape, { values: values }, inferredDtype);
}
exports.convertToTensor = convertToTensor;
function convertToTensorArray(arg, argName, functionName, parseAsDtype) {
    if (parseAsDtype === void 0) { parseAsDtype = 'numeric'; }
    if (!Array.isArray(arg)) {
        throw new Error("Argument " + argName + " passed to " + functionName + " must be a " +
            '`Tensor[]` or `TensorLike[]`');
    }
    var tensors = arg;
    return tensors.map(function (t, i) { return convertToTensor(t, argName + "[" + i + "]", functionName); }, parseAsDtype);
}
exports.convertToTensorArray = convertToTensorArray;
//# sourceMappingURL=tensor_util_env.js.map