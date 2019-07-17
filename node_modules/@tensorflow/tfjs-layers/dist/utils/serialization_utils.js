"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var generic_utils = require("../utils/generic_utils");
// tslint:enable
/**
 * Test whether a value in an array is the name of a LayersModel or Layer.
 * @param key The key name that the value is found under. Note that the key
 *   may not be at the level immediately above the value, if the value is in a
 *   nested array.
 * @param index Index of the value in the Array that it is found in.
 * @param value The value object.
 * @returns A boolean indicating whether value is a name.
 */
function isArrayItemInputOrOutputName(key, index, value) {
    return (key === 'inboundNodes' || key === 'outputLayers' ||
        key === 'inputLayers') &&
        index === 0 && typeof value === 'string';
}
/**
 * Convert a Pythonic config object to TypeScript config object.
 * @param pythonicConfig The config object to convert.
 * @param key Optional key name of the object being converted.
 * @returns Result of the conversion.
 */
function convertPythonicToTs(pythonicConfig, key) {
    if (pythonicConfig === null) {
        return null;
    }
    else if (typeof pythonicConfig === 'string') {
        return generic_utils.toCamelCase(pythonicConfig);
    }
    else if ((typeof pythonicConfig === 'number') ||
        (typeof pythonicConfig === 'boolean')) {
        return pythonicConfig;
    }
    else if (pythonicConfig instanceof Array) {
        var tsArray = [];
        var arrayLength = pythonicConfig.length;
        for (var i = 0; i < arrayLength; ++i) {
            var item = pythonicConfig[i];
            if (isArrayItemInputOrOutputName(key, i, item)) {
                tsArray.push(item);
            }
            else {
                tsArray.push(convertPythonicToTs(item, key));
            }
        }
        return tsArray;
    }
    else {
        var tsDict = {};
        for (var _i = 0, _a = Object.keys(pythonicConfig); _i < _a.length; _i++) {
            var pythonicKey = _a[_i];
            var pythonicValue = pythonicConfig[pythonicKey];
            if (pythonicKey === 'name' && typeof pythonicValue === 'string') {
                // Special case the 'name' key with a string value. Name values, such as
                // the names of LayersModel and Layer instances, should not undergo the
                // camel-case conversion.
                tsDict[pythonicKey] = pythonicValue;
            }
            else {
                var tsKey = generic_utils.toCamelCase(pythonicKey);
                tsDict[tsKey] = convertPythonicToTs(pythonicValue, tsKey);
            }
        }
        return tsDict;
    }
}
exports.convertPythonicToTs = convertPythonicToTs;
/**
 * Convert a TypeScript config object to Python config object.
 * @param tsConfig The config object to convert.
 * @param key Optional key name of the object being converted.
 * @returns Result of the conversion.
 */
function convertTsToPythonic(tsConfig, key) {
    if (tsConfig === null || tsConfig === undefined) {
        return null;
    }
    else if (typeof tsConfig === 'string') {
        return generic_utils.toSnakeCase(tsConfig);
    }
    else if ((typeof tsConfig === 'number') || (typeof tsConfig === 'boolean')) {
        return tsConfig;
    }
    else if (tsConfig instanceof Array) {
        var pyArray = [];
        var arrayLength = tsConfig.length;
        for (var i = 0; i < arrayLength; ++i) {
            var item = tsConfig[i];
            if (isArrayItemInputOrOutputName(key, i, item)) {
                pyArray.push(item);
            }
            else {
                pyArray.push(convertTsToPythonic(item, key));
            }
        }
        return pyArray;
    }
    else {
        var pyDict = {};
        for (var _i = 0, _a = Object.keys(tsConfig); _i < _a.length; _i++) {
            var tsKey = _a[_i];
            var tsValue = tsConfig[tsKey];
            var pyKey = generic_utils.toSnakeCase(tsKey);
            if ((tsKey === 'name' || tsKey === 'className') &&
                typeof tsValue === 'string') {
                // Special case the 'name' key with a string value. Name values, such as
                // the names of LayersModel and Layer instances, should not undergo the
                // snake-case conversion.
                pyDict[pyKey] = tsValue;
            }
            else {
                pyDict[pyKey] = convertTsToPythonic(tsValue, tsKey);
            }
        }
        return pyDict;
    }
}
exports.convertTsToPythonic = convertTsToPythonic;
//# sourceMappingURL=serialization_utils.js.map