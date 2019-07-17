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
var tf = require("@tensorflow/tfjs-core");
/**
 * Provides a function that scales numeric values into the [0, 1] interval.
 *
 * @param min the lower bound of the inputs, which should be mapped to 0.
 * @param max the upper bound of the inputs, which should be mapped to 1,
 * @return A function that maps an input ElementArray to a scaled ElementArray.
 */
function scaleTo01(min, max) {
    var range = max - min;
    var minTensor = tf.scalar(min);
    var rangeTensor = tf.scalar(range);
    return function (value) {
        if (typeof (value) === 'string') {
            throw new Error('Can\'t scale a string.');
        }
        else {
            if (value instanceof tf.Tensor) {
                var result = value.sub(minTensor).div(rangeTensor);
                return result;
            }
            else if (value instanceof Array) {
                return value.map(function (v) { return (v - min) / range; });
            }
            else {
                return (value - min) / range;
            }
        }
    };
}
exports.scaleTo01 = scaleTo01;
/**
 * Provides a function that calculates column level statistics, i.e. min, max,
 * variance, stddev.
 *
 * @param dataset The Dataset object whose statistics will be calculated.
 * @param sampleSize (Optional) If set, statistics will only be calculated
 *     against a subset of the whole data.
 * @param shuffleWindowSize (Optional) If set, shuffle provided dataset before
 *     calculating statistics.
 * @return A DatasetStatistics object that contains NumericColumnStatistics of
 *     each column.
 */
function computeDatasetStatistics(dataset, sampleSize, shuffleWindowSize) {
    return __awaiter(this, void 0, void 0, function () {
        var sampleDataset, result, key, stat;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sampleDataset = dataset;
                    // TODO(soergel): allow for deep shuffle where possible.
                    if (shuffleWindowSize != null) {
                        sampleDataset = sampleDataset.shuffle(shuffleWindowSize);
                    }
                    if (sampleSize != null) {
                        sampleDataset = sampleDataset.take(sampleSize);
                    }
                    result = {};
                    return [4 /*yield*/, sampleDataset.forEachAsync(function (e) {
                            for (var _i = 0, _a = Object.keys(e); _i < _a.length; _i++) {
                                var key = _a[_i];
                                var value = e[key];
                                if (typeof (value) === 'string') {
                                    // No statistics for string element.
                                }
                                else {
                                    var previousMean = 0;
                                    var previousLength = 0;
                                    var previousVariance = 0;
                                    var columnStats = result[key];
                                    if (columnStats == null) {
                                        columnStats = {
                                            min: Number.POSITIVE_INFINITY,
                                            max: Number.NEGATIVE_INFINITY,
                                            mean: 0,
                                            variance: 0,
                                            stddev: 0,
                                            length: 0
                                        };
                                        result[key] = columnStats;
                                    }
                                    else {
                                        previousMean = columnStats.mean;
                                        previousLength = columnStats.length;
                                        previousVariance = columnStats.variance;
                                    }
                                    var recordMin = void 0;
                                    var recordMax = void 0;
                                    // Calculate accumulated mean and variance following tf.Transform
                                    // implementation
                                    var valueLength = 0;
                                    var valueMean = 0;
                                    var valueVariance = 0;
                                    var combinedLength = 0;
                                    var combinedMean = 0;
                                    var combinedVariance = 0;
                                    if (value instanceof tf.Tensor) {
                                        recordMin = value.min().dataSync()[0];
                                        recordMax = value.max().dataSync()[0];
                                        var valueMoment = tf.moments(value);
                                        valueMean = valueMoment.mean.dataSync()[0];
                                        valueVariance = valueMoment.variance.dataSync()[0];
                                        valueLength = value.size;
                                    }
                                    else if (value instanceof Array) {
                                        recordMin = value.reduce(function (a, b) { return Math.min(a, b); });
                                        recordMax = value.reduce(function (a, b) { return Math.max(a, b); });
                                        var valueMoment = tf.moments(value);
                                        valueMean = valueMoment.mean.dataSync()[0];
                                        valueVariance = valueMoment.variance.dataSync()[0];
                                        valueLength = value.length;
                                    }
                                    else if (!isNaN(value) && isFinite(value)) {
                                        recordMin = value;
                                        recordMax = value;
                                        valueMean = value;
                                        valueVariance = 0;
                                        valueLength = 1;
                                    }
                                    else {
                                        columnStats = null;
                                        continue;
                                    }
                                    combinedLength = previousLength + valueLength;
                                    combinedMean = previousMean +
                                        (valueLength / combinedLength) * (valueMean - previousMean);
                                    combinedVariance = previousVariance +
                                        (valueLength / combinedLength) *
                                            (valueVariance +
                                                ((valueMean - combinedMean) * (valueMean - previousMean)) -
                                                previousVariance);
                                    columnStats.min = Math.min(columnStats.min, recordMin);
                                    columnStats.max = Math.max(columnStats.max, recordMax);
                                    columnStats.length = combinedLength;
                                    columnStats.mean = combinedMean;
                                    columnStats.variance = combinedVariance;
                                    columnStats.stddev = Math.sqrt(combinedVariance);
                                }
                            }
                        })];
                case 1:
                    _a.sent();
                    // Variance and stddev should be NaN for the case of a single element.
                    for (key in result) {
                        stat = result[key];
                        if (stat.length === 1) {
                            stat.variance = NaN;
                            stat.stddev = NaN;
                        }
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.computeDatasetStatistics = computeDatasetStatistics;
//# sourceMappingURL=statistics.js.map