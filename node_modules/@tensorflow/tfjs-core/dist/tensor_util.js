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
var tensor_1 = require("./tensor");
var types_1 = require("./types");
var util_1 = require("./util");
function makeTypesMatch(a, b) {
    if (a.dtype === b.dtype) {
        return [a, b];
    }
    var dtype = types_1.upcastType(a.dtype, b.dtype);
    return [a.cast(dtype), b.cast(dtype)];
}
exports.makeTypesMatch = makeTypesMatch;
function assertTypesMatch(a, b) {
    util_1.assert(a.dtype === b.dtype, function () { return "The dtypes of the first(" + a.dtype + ") and" +
        (" second(" + b.dtype + ") input must match"); });
}
exports.assertTypesMatch = assertTypesMatch;
function isTensorInList(tensor, tensorList) {
    for (var i = 0; i < tensorList.length; i++) {
        if (tensorList[i].id === tensor.id) {
            return true;
        }
    }
    return false;
}
exports.isTensorInList = isTensorInList;
/**
 * Extracts any `Tensor`s found within the provided object.
 *
 * @param container an object that may be a `Tensor` or may directly contain
 *   `Tensor`s, such as a `Tensor[]` or `{key: Tensor, ...}`. In general it
 *   is safe to pass any object here, except that `Promise`s are not
 *   supported.
 * @returns An array of `Tensors` found within the passed object. If the
 *   argument is simply a `Tensor', a list containing that `Tensor` is
 *   returned. If the object is not a `Tensor` or does not
 *   contain `Tensors`, an empty list is returned.
 */
function getTensorsInContainer(result) {
    var list = [];
    var seen = new Set();
    walkTensorContainer(result, list, seen);
    return list;
}
exports.getTensorsInContainer = getTensorsInContainer;
function walkTensorContainer(container, list, seen) {
    if (container == null) {
        return;
    }
    if (container instanceof tensor_1.Tensor) {
        list.push(container);
        return;
    }
    if (!isIterable(container)) {
        return;
    }
    // Iteration over keys works also for arrays.
    var iterable = container;
    for (var k in iterable) {
        var val = iterable[k];
        if (!seen.has(val)) {
            seen.add(val);
            walkTensorContainer(val, list, seen);
        }
    }
}
// tslint:disable-next-line:no-any
function isIterable(obj) {
    return Array.isArray(obj) || typeof obj === 'object';
}
//# sourceMappingURL=tensor_util.js.map