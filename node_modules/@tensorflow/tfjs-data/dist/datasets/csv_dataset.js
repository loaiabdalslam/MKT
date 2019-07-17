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
 *
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var dataset_1 = require("../dataset");
var text_line_dataset_1 = require("./text_line_dataset");
var CODE_QUOTE = '"';
var STATE_OUT = Symbol('out');
var STATE_FIELD = Symbol('field');
var STATE_QUOTE = Symbol('quote');
var STATE_QUOTE_AFTER_QUOTE = Symbol('quoteafterquote');
var STATE_WITHIN_QUOTE_IN_QUOTE = Symbol('quoteinquote');
/**
 * Represents a potentially large collection of delimited text records.
 *
 * The produced `TensorContainer`s each contain one key-value pair for
 * every column of the table.  When a field is empty in the incoming data, the
 * resulting value is `undefined`, or throw error if it is required.  Values
 * that can be parsed as numbers are emitted as type `number`, other values
 * are parsed as `string`.
 *
 * The results are not batched.
 */
/** @doc {heading: 'Data', subheading: 'Classes', namespace: 'data'} */
var CSVDataset = /** @class */ (function (_super) {
    __extends(CSVDataset, _super);
    /**
     * Create a `CSVDataset`.
     *
     * @param input A `DataSource` providing a chunked, UTF8-encoded byte stream.
     * @param csvConfig (Optional) A CSVConfig object that contains configurations
     *     of reading and decoding from CSV file(s).
     *
     *     hasHeader: (Optional) A boolean value that indicates whether the first
     *     row of provided CSV file is a header line with column names, and should
     *     not be included in the data. Defaults to `true`.
     *
     *     columnNames: (Optional) A list of strings that corresponds to
     *     the CSV column names, in order. If provided, it ignores the column
     *     names inferred from the header row. If not provided, infers the column
     *     names from the first row of the records. If hasHeader is false and
     *     columnNames is not provided, this method throws an error.
     *
     *     columnConfigs: (Optional) A dictionary whose key is column names, value
     *     is an object stating if this column is required, column's data type,
     *     default value, and if this column is label. If provided, keys must
     *     correspond to names provided in columnNames or inferred from the file
     *     header lines. If isLabel is true any column, returns an array of two
     *     items: the first item is a dict of features key/value pairs, the second
     *     item is a dict of labels key/value pairs. If no feature is marked as
     *     label, returns a dict of features only.
     *
     *     configuredColumnsOnly (Optional) If true, only columns provided in
     *     columnConfigs will be parsed and provided during iteration.
     *
     *     delimiter (Optional) The string used to parse each line of the input
     *     file. Defaults to `,`.
     */
    function CSVDataset(input, csvConfig) {
        var _this = _super.call(this) || this;
        _this.input = input;
        _this.hasHeader = true;
        _this.fullColumnNames = null;
        _this.columnNamesValidated = false;
        _this.columnConfigs = null;
        _this.configuredColumnsOnly = false;
        _this.delimiter = ',';
        _this.delimWhitespace = false;
        _this.base = new text_line_dataset_1.TextLineDataset(input);
        if (!csvConfig) {
            csvConfig = {};
        }
        _this.hasHeader = csvConfig.hasHeader === false ? false : true;
        _this.fullColumnNames = csvConfig.columnNames;
        _this.columnConfigs = csvConfig.columnConfigs;
        _this.configuredColumnsOnly = csvConfig.configuredColumnsOnly;
        if (csvConfig.delimWhitespace) {
            tfjs_core_1.util.assert(csvConfig.delimiter == null, function () {
                return 'Delimiter should not be provided when delimWhitespace is true.';
            });
            _this.delimWhitespace = true;
            _this.delimiter = ' ';
        }
        else {
            _this.delimiter = csvConfig.delimiter ? csvConfig.delimiter : ',';
        }
        return _this;
    }
    /**
     * Returns column names of the csv dataset. If `configuredColumnsOnly` is
     * true, return column names in `columnConfigs`. If `configuredColumnsOnly` is
     * false and `columnNames` is provided, `columnNames`. If
     * `configuredColumnsOnly` is false and `columnNames` is not provided, return
     * all column names parsed from the csv file. For example usage please go to
     * `tf.data.csv`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    CSVDataset.prototype.columnNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.columnNamesValidated) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setColumnNames()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.configuredColumnsOnly ? Object.keys(this.columnConfigs) :
                            this.fullColumnNames];
                }
            });
        });
    };
    /* 1) If `columnNames` is provided as string[], use this string[] as output
     * keys in corresponding order. The length must match the number of inferred
     * columns if `hasHeader` is true .
     * 2) If `columnNames` is not provided, parse header line as `columnNames` if
     * hasHeader is true. If `hasHeader` is false, throw an error.
     * 3) If `columnConfigs` is provided, all the keys in `columnConfigs` must
     * exist in parsed `columnNames`.
     */
    CSVDataset.prototype.setColumnNames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var columnNamesFromFile, counts, duplicateNames, _i, _a, key, index;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.maybeReadHeaderLine()];
                    case 1:
                        columnNamesFromFile = _b.sent();
                        if (!this.fullColumnNames && !columnNamesFromFile) {
                            // Throw an error if columnNames is not provided and no header line.
                            throw new Error('Column names must be provided if there is no header line.');
                        }
                        else if (this.fullColumnNames && columnNamesFromFile) {
                            // Check provided columnNames match header line.
                            tfjs_core_1.util.assert(columnNamesFromFile.length === this.fullColumnNames.length, function () { return 'The length of provided columnNames (' +
                                _this.fullColumnNames.length.toString() +
                                ') does not match the length of the header line read from ' +
                                'file (' + columnNamesFromFile.length.toString() + ').'; });
                        }
                        if (!this.fullColumnNames) {
                            this.fullColumnNames = columnNamesFromFile;
                        }
                        counts = this.fullColumnNames.reduce(function (countAcc, name) {
                            countAcc[name] = (countAcc[name] + 1) || 1;
                            return countAcc;
                        }, {});
                        duplicateNames = Object.keys(counts).filter(function (name) { return (counts[name] > 1); });
                        tfjs_core_1.util.assert(duplicateNames.length === 0, function () { return 'Duplicate column names found: ' + duplicateNames.toString(); });
                        // Check if keys in columnConfigs match columnNames.
                        if (this.columnConfigs) {
                            for (_i = 0, _a = Object.keys(this.columnConfigs); _i < _a.length; _i++) {
                                key = _a[_i];
                                index = this.fullColumnNames.indexOf(key);
                                if (index === -1) {
                                    throw new Error('The key "' + key +
                                        '" provided in columnConfigs does not match any of the column ' +
                                        'names (' + this.fullColumnNames.toString() + ').');
                                }
                            }
                        }
                        this.columnNamesValidated = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    CSVDataset.prototype.maybeReadHeaderLine = function () {
        return __awaiter(this, void 0, void 0, function () {
            var iter, firstElement, firstLine, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.hasHeader) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.base.iterator()];
                    case 1:
                        iter = _a.sent();
                        return [4 /*yield*/, iter.next()];
                    case 2:
                        firstElement = _a.sent();
                        if (firstElement.done) {
                            throw new Error('No data was found for CSV parsing.');
                        }
                        firstLine = firstElement.value;
                        headers = this.parseRow(firstLine, false);
                        return [2 /*return*/, headers];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    CSVDataset.prototype.iterator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var lines;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.columnNamesValidated) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.setColumnNames()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.base.iterator()];
                    case 3:
                        lines = _a.sent();
                        if (this.hasHeader) {
                            // We previously read the first line to get the columnNames.
                            // Now that we're providing data, skip it.
                            lines = lines.skip(1);
                        }
                        return [2 /*return*/, lines.map(function (x) { return _this.makeDataElement(x); })];
                }
            });
        });
    };
    CSVDataset.prototype.makeDataElement = function (line) {
        var values = this.parseRow(line);
        var features = {};
        var labels = {};
        for (var i = 0; i < this.fullColumnNames.length; i++) {
            var key = this.fullColumnNames[i];
            var config = this.columnConfigs ? this.columnConfigs[key] : null;
            if (this.configuredColumnsOnly && !config) {
                // This column is not selected.
                continue;
            }
            else {
                var value = values[i];
                var parsedValue = null;
                if (value === '') {
                    // If default value is provided, use it. If default value is not
                    // provided, set as undefined.
                    if (config && config.default !== undefined) {
                        parsedValue = config.default;
                    }
                    else if (config && (config.required || config.isLabel)) {
                        throw new Error("Required column " + key + " is empty in this line: " + line);
                    }
                    else {
                        parsedValue = undefined;
                    }
                }
                else {
                    // A value is present, so parse it based on type
                    var valueAsNum = Number(value);
                    if (isNaN(valueAsNum)) {
                        // The value is a string and this column is declared as boolean
                        // in config, parse it as boolean.
                        if (config && config.dtype === 'bool') {
                            parsedValue = this.getBoolean(value);
                        }
                        else {
                            // Set value as string
                            parsedValue = value;
                        }
                    }
                    else if (!config || !config.dtype) {
                        // If this value is a number and no type config is provided, return
                        // it as number.
                        parsedValue = valueAsNum;
                    }
                    else {
                        // If this value is a number and data type is provided, parse it
                        // according to provided data type.
                        switch (config.dtype) {
                            case 'float32':
                                parsedValue = valueAsNum;
                                break;
                            case 'int32':
                                parsedValue = Math.floor(valueAsNum);
                                break;
                            case 'bool':
                                parsedValue = this.getBoolean(value);
                                break;
                            default:
                                parsedValue = valueAsNum;
                        }
                    }
                }
                // Check if this column is label.
                (config && config.isLabel) ? labels[key] = parsedValue :
                    features[key] = parsedValue;
            }
        }
        // If label exists, return an object of features and labels as {xs:features,
        // ys:labels}, otherwise return features only.
        if (Object.keys(labels).length === 0) {
            return features;
        }
        else {
            return { xs: features, ys: labels };
        }
    };
    CSVDataset.prototype.getBoolean = function (value) {
        if (value === '1' || value.toLowerCase() === 'true') {
            return 1;
        }
        else {
            return 0;
        }
    };
    // adapted from https://beta.observablehq.com/@mbostock/streaming-csv
    CSVDataset.prototype.parseRow = function (line, validateElementCount) {
        if (validateElementCount === void 0) { validateElementCount = true; }
        var result = [];
        var readOffset = 0;
        var readLength = line.length;
        var currentState = STATE_OUT;
        // Goes through the line to parse quote.
        for (var i = 0; i < readLength; i++) {
            switch (currentState) {
                // Before enter a new field
                case STATE_OUT:
                    switch (line.charAt(i)) {
                        // Enter a quoted field
                        case CODE_QUOTE:
                            readOffset = i + 1;
                            currentState = STATE_QUOTE;
                            break;
                        // Read an empty field
                        case this.delimiter:
                            readOffset = i + 1;
                            // If delimiter is white space and configured to collapse
                            // multiple white spaces, ignore this white space.
                            if (this.delimiter === ' ' && this.delimWhitespace) {
                                break;
                            }
                            result.push('');
                            currentState = STATE_OUT;
                            break;
                        // Enter an unquoted field
                        default:
                            currentState = STATE_FIELD;
                            readOffset = i;
                            break;
                    }
                    break;
                // In an unquoted field
                case STATE_FIELD:
                    switch (line.charAt(i)) {
                        // Exit an unquoted field, add it to result
                        case this.delimiter:
                            result.push(line.substring(readOffset, i));
                            currentState = STATE_OUT;
                            readOffset = i + 1;
                            break;
                        default:
                    }
                    break;
                // In a quoted field
                case STATE_QUOTE:
                    switch (line.charAt(i)) {
                        // Read a quote after a quote
                        case CODE_QUOTE:
                            currentState = STATE_QUOTE_AFTER_QUOTE;
                            break;
                        default:
                    }
                    break;
                // This state means it's right after a second quote in a field
                case STATE_QUOTE_AFTER_QUOTE:
                    switch (line.charAt(i)) {
                        // Finished a quoted field
                        case this.delimiter:
                            result.push(line.substring(readOffset, i - 1));
                            currentState = STATE_OUT;
                            readOffset = i + 1;
                            break;
                        // Finished a quoted part in a quoted field
                        case CODE_QUOTE:
                            currentState = STATE_QUOTE;
                            break;
                        // In a quoted part in a quoted field
                        default:
                            currentState = STATE_WITHIN_QUOTE_IN_QUOTE;
                            break;
                    }
                    break;
                case STATE_WITHIN_QUOTE_IN_QUOTE:
                    switch (line.charAt(i)) {
                        // Exit a quoted part in a quoted field
                        case CODE_QUOTE:
                            currentState = STATE_QUOTE;
                            break;
                        default:
                    }
                    break;
                default:
            }
        }
        // Adds last item based on if it is quoted.
        if (currentState === STATE_QUOTE_AFTER_QUOTE) {
            result.push(line.substring(readOffset, readLength - 1));
        }
        else {
            result.push(line.substring(readOffset));
        }
        // Check if each row has the same number of elements as column names.
        if (validateElementCount && result.length !== this.fullColumnNames.length) {
            throw new Error("Invalid row in csv file. Should have " + this.fullColumnNames.length + " elements in a row, but got " + result);
        }
        return result;
    };
    return CSVDataset;
}(dataset_1.Dataset));
exports.CSVDataset = CSVDataset;
// TODO(soergel): add more basic datasets for parity with tf.data
// tf.data.FixedLengthRecordDataset()
// tf.data.TFRecordDataset()
//# sourceMappingURL=csv_dataset.js.map