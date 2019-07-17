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
/**
 * Built-in metrics.
 */
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var K = require("./backend/tfjs_backend");
var errors_1 = require("./errors");
var losses_1 = require("./losses");
var losses_2 = require("./losses");
var losses_3 = require("./losses");
var util = require("./utils/generic_utils");
function binaryAccuracy(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var threshold = tfc.mul(.5, tfc.onesLike(yPred));
        var yPredThresholded = K.cast(tfc.greater(yPred, threshold), yTrue.dtype);
        return tfc.mean(tfc.equal(yTrue, yPredThresholded), -1);
    });
}
exports.binaryAccuracy = binaryAccuracy;
function categoricalAccuracy(yTrue, yPred) {
    return tfjs_core_1.tidy(function () { return K.cast(tfc.equal(tfc.argMax(yTrue, -1), tfc.argMax(yPred, -1)), 'float32'); });
}
exports.categoricalAccuracy = categoricalAccuracy;
function truePositives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        return tfc.logicalAnd(yTrue.equal(1), yPred.equal(1)).sum().cast('float32');
    });
}
function falseNegatives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        return tfc.logicalAnd(yTrue.equal(1), yPred.equal(0)).sum().cast('float32');
    });
}
function falsePositives(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        return tfc.logicalAnd(yTrue.equal(0), yPred.equal(1)).sum().cast('float32');
    });
}
function precision(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var tp = truePositives(yTrue, yPred);
        var fp = falsePositives(yTrue, yPred);
        var denominator = tp.add(fp);
        return tfc.where(tfc.greater(denominator, 0), tp.div(denominator), 0)
            .cast('float32');
    });
}
exports.precision = precision;
function recall(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var tp = truePositives(yTrue, yPred);
        var fn = falseNegatives(yTrue, yPred);
        var denominator = tp.add(fn);
        return tfc.where(tfc.greater(denominator, 0), tp.div(denominator), 0)
            .cast('float32');
    });
}
exports.recall = recall;
function binaryCrossentropy(yTrue, yPred) {
    return losses_2.binaryCrossentropy(yTrue, yPred);
}
exports.binaryCrossentropy = binaryCrossentropy;
function sparseCategoricalAccuracy(yTrue, yPred) {
    if (yTrue.rank === yPred.rank) {
        yTrue = yTrue.squeeze([yTrue.rank - 1]);
    }
    yPred = yPred.argMax(-1);
    if (yPred.dtype !== yTrue.dtype) {
        yPred = yPred.asType(yTrue.dtype);
    }
    return tfc.equal(yTrue, yPred).asType('float32');
}
exports.sparseCategoricalAccuracy = sparseCategoricalAccuracy;
function topKCategoricalAccuracy(yTrue, yPred) {
    throw new errors_1.NotImplementedError();
}
exports.topKCategoricalAccuracy = topKCategoricalAccuracy;
function sparseTopKCategoricalAccuracy(yTrue, yPred) {
    throw new errors_1.NotImplementedError();
}
exports.sparseTopKCategoricalAccuracy = sparseTopKCategoricalAccuracy;
// Aliases.
exports.mse = losses_1.meanSquaredError;
exports.MSE = losses_1.meanSquaredError;
exports.mae = losses_1.meanAbsoluteError;
exports.MAE = losses_1.meanAbsoluteError;
exports.mape = losses_1.meanAbsolutePercentageError;
exports.MAPE = losses_1.meanAbsolutePercentageError;
exports.categoricalCrossentropy = losses_1.categoricalCrossentropy;
exports.cosine = losses_1.cosineProximity;
exports.sparseCategoricalCrossentropy = losses_1.sparseCategoricalCrossentropy;
// TODO(cais, nielsene): Add serialize().
exports.metricsMap = {
    binaryAccuracy: binaryAccuracy,
    categoricalAccuracy: categoricalAccuracy,
    precision: precision,
    categoricalCrossentropy: exports.categoricalCrossentropy,
    sparseCategoricalCrossentropy: exports.sparseCategoricalCrossentropy,
    mse: exports.mse,
    MSE: exports.MSE,
    mae: exports.mae,
    MAE: exports.MAE,
    mape: exports.mape,
    MAPE: exports.MAPE,
    cosine: exports.cosine
};
function get(identifier) {
    if (typeof identifier === 'string' && identifier in exports.metricsMap) {
        return exports.metricsMap[identifier];
    }
    else if (typeof identifier !== 'string' && identifier != null) {
        return identifier;
    }
    else {
        throw new errors_1.ValueError("Unknown metric " + identifier);
    }
}
exports.get = get;
/**
 * Get the shortcut function name.
 *
 * If the fn name is a string,
 *   directly return the string name.
 * If the function is included in metricsMap or lossesMap,
 *   return key of the map.
 *   - If the function relative to multiple keys,
 *     return the first found key as the function name.
 *   - If the function exists in both lossesMap and metricsMap,
 *     search lossesMap first.
 * If the function is not included in metricsMap or lossesMap,
 *   return the function name.
 *
 * @param fn loss function, metric function, or short cut name.
 * @returns Loss or Metric name in string.
 */
function getLossOrMetricName(fn) {
    util.assert(fn !== null, "Unknown LossOrMetricFn " + fn);
    if (typeof fn === 'string') {
        return fn;
    }
    else {
        var fnName = void 0;
        for (var _i = 0, _a = Object.keys(losses_3.lossesMap); _i < _a.length; _i++) {
            var key = _a[_i];
            if (losses_3.lossesMap[key] === fn) {
                fnName = key;
                break;
            }
        }
        if (fnName !== undefined) {
            return fnName;
        }
        for (var _b = 0, _c = Object.keys(exports.metricsMap); _b < _c.length; _b++) {
            var key = _c[_b];
            if (exports.metricsMap[key] === fn) {
                fnName = key;
                break;
            }
        }
        if (fnName !== undefined) {
            return fnName;
        }
        return fn.name;
    }
}
exports.getLossOrMetricName = getLossOrMetricName;
//# sourceMappingURL=metrics.js.map