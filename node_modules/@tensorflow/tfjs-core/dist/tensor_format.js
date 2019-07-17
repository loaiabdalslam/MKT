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
var util_1 = require("./util");
// Maximum number of values before we decide to show ellipsis.
var FORMAT_LIMIT_NUM_VALS = 20;
// Number of first and last values to show when displaying a, b,...,y, z.
var FORMAT_NUM_FIRST_LAST_VALS = 3;
// Number of significant digits to show.
var FORMAT_NUM_SIG_DIGITS = 7;
function tensorToString(vals, shape, dtype, verbose) {
    var strides = util_1.computeStrides(shape);
    var padPerCol = computeMaxSizePerColumn(vals, shape, dtype, strides);
    var rank = shape.length;
    var valsLines = subTensorToString(vals, shape, dtype, strides, padPerCol);
    var lines = ['Tensor'];
    if (verbose) {
        lines.push("  dtype: " + dtype);
        lines.push("  rank: " + rank);
        lines.push("  shape: [" + shape + "]");
        lines.push("  values:");
    }
    lines.push(valsLines.map(function (l) { return '    ' + l; }).join('\n'));
    return lines.join('\n');
}
exports.tensorToString = tensorToString;
function computeMaxSizePerColumn(vals, shape, dtype, strides) {
    var n = util_1.sizeFromShape(shape);
    var numCols = strides[strides.length - 1];
    var padPerCol = new Array(numCols).fill(0);
    var rank = shape.length;
    var valuesOrTuples = dtype === 'complex64' ? createComplexTuples(vals) : vals;
    if (rank > 1) {
        for (var row = 0; row < n / numCols; row++) {
            var offset = row * numCols;
            for (var j = 0; j < numCols; j++) {
                padPerCol[j] = Math.max(padPerCol[j], valToString(valuesOrTuples[offset + j], 0, dtype).length);
            }
        }
    }
    return padPerCol;
}
function valToString(val, pad, dtype) {
    var valStr;
    if (Array.isArray(val)) {
        valStr = parseFloat(val[0].toFixed(FORMAT_NUM_SIG_DIGITS)) + " + " +
            (parseFloat(val[1].toFixed(FORMAT_NUM_SIG_DIGITS)) + "j");
    }
    else if (util_1.isString(val)) {
        valStr = "'" + val + "'";
    }
    else if (dtype === 'bool') {
        valStr = boolNumToString(val);
    }
    else {
        valStr = parseFloat(val.toFixed(FORMAT_NUM_SIG_DIGITS)).toString();
    }
    return util_1.rightPad(valStr, pad);
}
function boolNumToString(v) {
    return v === 0 ? 'false' : 'true';
}
function subTensorToString(vals, shape, dtype, strides, padPerCol, isLast) {
    if (isLast === void 0) { isLast = true; }
    var storagePerElement = dtype === 'complex64' ? 2 : 1;
    var size = shape[0];
    var rank = shape.length;
    if (rank === 0) {
        if (dtype === 'complex64') {
            var complexTuple = createComplexTuples(vals);
            return [valToString(complexTuple[0], 0, dtype)];
        }
        if (dtype === 'bool') {
            return [boolNumToString(vals[0])];
        }
        return [vals[0].toString()];
    }
    if (rank === 1) {
        if (size > FORMAT_LIMIT_NUM_VALS) {
            var firstValsSize = FORMAT_NUM_FIRST_LAST_VALS * storagePerElement;
            var firstVals = Array.from(vals.slice(0, firstValsSize));
            var lastVals = Array.from(vals.slice(size - FORMAT_NUM_FIRST_LAST_VALS * storagePerElement, size));
            if (dtype === 'complex64') {
                firstVals = createComplexTuples(firstVals);
                lastVals = createComplexTuples(lastVals);
            }
            return [
                '[' + firstVals.map(function (x, i) { return valToString(x, padPerCol[i], dtype); }).join(', ') +
                    ', ..., ' +
                    lastVals
                        .map(function (x, i) { return valToString(x, padPerCol[size - FORMAT_NUM_FIRST_LAST_VALS + i], dtype); })
                        .join(', ') +
                    ']'
            ];
        }
        var displayVals = dtype === 'complex64' ? createComplexTuples(vals) :
            Array.from(vals);
        return [
            '[' + displayVals.map(function (x, i) { return valToString(x, padPerCol[i], dtype); }).join(', ') +
                ']'
        ];
    }
    // The array is rank 2 or more.
    var subshape = shape.slice(1);
    var substrides = strides.slice(1);
    var stride = strides[0] * storagePerElement;
    var lines = [];
    if (size > FORMAT_LIMIT_NUM_VALS) {
        for (var i = 0; i < FORMAT_NUM_FIRST_LAST_VALS; i++) {
            var start = i * stride;
            var end = start + stride;
            lines.push.apply(lines, subTensorToString(vals.slice(start, end), subshape, dtype, substrides, padPerCol, false /* isLast */));
        }
        lines.push('...');
        for (var i = size - FORMAT_NUM_FIRST_LAST_VALS; i < size; i++) {
            var start = i * stride;
            var end = start + stride;
            lines.push.apply(lines, subTensorToString(vals.slice(start, end), subshape, dtype, substrides, padPerCol, i === size - 1 /* isLast */));
        }
    }
    else {
        for (var i = 0; i < size; i++) {
            var start = i * stride;
            var end = start + stride;
            lines.push.apply(lines, subTensorToString(vals.slice(start, end), subshape, dtype, substrides, padPerCol, i === size - 1 /* isLast */));
        }
    }
    var sep = rank === 2 ? ',' : '';
    lines[0] = '[' + lines[0] + sep;
    for (var i = 1; i < lines.length - 1; i++) {
        lines[i] = ' ' + lines[i] + sep;
    }
    var newLineSep = ',\n';
    for (var i = 2; i < rank; i++) {
        newLineSep += '\n';
    }
    lines[lines.length - 1] =
        ' ' + lines[lines.length - 1] + ']' + (isLast ? '' : newLineSep);
    return lines;
}
function createComplexTuples(vals) {
    var complexTuples = [];
    for (var i = 0; i < vals.length; i += 2) {
        complexTuples.push([vals[i], vals[i + 1]]);
    }
    return complexTuples;
}
//# sourceMappingURL=tensor_format.js.map