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
/* Original Source: losses.py */
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var common_1 = require("./backend/common");
var K = require("./backend/tfjs_backend");
var errors_1 = require("./errors");
/**
 * Normalizes a tensor wrt the L2 norm alongside the specified axis.
 * @param x
 * @param axis Axis along which to perform normalization.
 */
function l2Normalize(x, axis) {
    return tfjs_core_1.tidy(function () {
        if (x.dtype !== 'float32') {
            x = x.asType('float32');
        }
        var squareSum = tfc.sum(K.square(x), axis, true);
        var epsilonTensor = tfc.fill(squareSum.shape, common_1.epsilon());
        var norm = tfc.sqrt(tfc.maximum(squareSum, epsilonTensor));
        return tfc.div(x, norm);
    });
}
exports.l2Normalize = l2Normalize;
function meanSquaredError(yTrue, yPred) {
    return tfjs_core_1.tidy(function () { return tfc.mean(K.square(tfc.sub(yPred, yTrue)), -1); });
}
exports.meanSquaredError = meanSquaredError;
function meanAbsoluteError(yTrue, yPred) {
    return tfjs_core_1.tidy(function () { return tfc.mean(tfc.abs(tfc.sub(yPred, yTrue)), -1); });
}
exports.meanAbsoluteError = meanAbsoluteError;
function meanAbsolutePercentageError(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var diff = tfc.sub(yTrue, yPred);
        var clippedTrue = tfc.clipByValue(tfc.abs(yTrue), common_1.epsilon(), Number.MAX_VALUE);
        var absResult = tfc.abs(tfc.div(diff, clippedTrue));
        return tfc.mul(100, tfc.mean(absResult, -1));
    });
}
exports.meanAbsolutePercentageError = meanAbsolutePercentageError;
function meanSquaredLogarithmicError(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var clippedPred = tfc.clipByValue(yPred, common_1.epsilon(), Number.MAX_VALUE);
        var firstLog = tfc.log(tfc.add(1, clippedPred));
        var clippedTrue = tfc.clipByValue(yTrue, common_1.epsilon(), Number.MAX_VALUE);
        var secondLog = tfc.log(tfc.add(1, clippedTrue));
        return tfc.mean(K.square(tfc.sub(firstLog, secondLog)), -1);
    });
}
exports.meanSquaredLogarithmicError = meanSquaredLogarithmicError;
function squaredHinge(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var maxResult = tfc.maximum(0, tfc.sub(1, tfc.mul(yTrue, yPred)));
        return tfc.mean(K.square(maxResult), -1);
    });
}
exports.squaredHinge = squaredHinge;
function hinge(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var maxResult = tfc.maximum(0, tfc.sub(1, tfc.mul(yTrue, yPred)));
        return tfc.mean(maxResult, -1);
    });
}
exports.hinge = hinge;
function categoricalHinge(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var pos = tfc.sum(tfc.mul(yTrue, yPred), -1);
        var neg = tfc.max(tfc.mul(tfc.sub(1, yTrue), yPred), -1);
        return tfc.maximum(0, tfc.add(1, tfc.sub(neg, pos)));
    });
}
exports.categoricalHinge = categoricalHinge;
/**
 * Logarithm of the hyperbolic cosine of the prediction error.
 *
 * `log(cosh(x))` is approximately equal to `(x ** 2) / 2` for small `x` and
 * to `abs(x) - log(2)` for large `x`. This means that 'logcosh' works mostly
 * like the mean squared error, but will not be so strongly affected by the
 * occasional wildly incorrect prediction.
 */
function logcosh(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var log2 = Math.log(2);
        var predictionDiff = tfc.sub(yPred, yTrue);
        var logcoshResult = tfc.sub(tfc.add(predictionDiff, tfc.softplus(tfc.mul(-2, predictionDiff))), log2);
        return tfc.mean(logcoshResult, -1);
    });
}
exports.logcosh = logcosh;
function categoricalCrossentropy(target, output, fromLogits) {
    if (fromLogits === void 0) { fromLogits = false; }
    return tfjs_core_1.tidy(function () {
        if (fromLogits) {
            output = tfc.softmax(output);
        }
        else {
            // scale preds so that the class probabilities of each sample sum to 1.
            var outputSum = tfc.sum(output, output.shape.length - 1, true);
            output = tfc.div(output, outputSum);
        }
        output = tfc.clipByValue(output, common_1.epsilon(), 1 - common_1.epsilon());
        return tfc.neg(tfc.sum(tfc.mul(target.toFloat(), tfc.log(output)), output.shape.length - 1));
    });
}
exports.categoricalCrossentropy = categoricalCrossentropy;
/**
 * Categorical crossentropy with integer targets.
 *
 * @param target An integer tensor.
 * @param output A tensor resulting from a softmax (unless `fromLogits` is
 *  `true`, in which case `output` is expected to be the logits).
 * @param fromLogits Boolean, whether `output` is the result of a softmax, or is
 *   a tensor of logits.
 */
function sparseCategoricalCrossentropy(target, output) {
    return tfjs_core_1.tidy(function () {
        var flatTarget = tfc.floor(K.flatten(target)).toInt();
        output = tfc.clipByValue(output, common_1.epsilon(), 1 - common_1.epsilon());
        var outputShape = output.shape;
        var oneHotTarget = tfc.oneHot(flatTarget, outputShape[outputShape.length - 1])
            .reshape(outputShape);
        var fromLogits = false;
        return categoricalCrossentropy(oneHotTarget, output, fromLogits);
    });
}
exports.sparseCategoricalCrossentropy = sparseCategoricalCrossentropy;
/**
 * From TensorFlow's implementation in nn_impl.py:
 *
 * For brevity, let `x = logits`, `z = labels`.  The logistic loss is
 *      z * -log(sigmoid(x)) + (1 - z) * -log(1 - sigmoid(x))
 *    = z * -log(1 / (1 + exp(-x))) + (1 - z) * -log(exp(-x) / (1 + exp(-x)))
 *    = z * log(1 + exp(-x)) + (1 - z) * (-log(exp(-x)) + log(1 + exp(-x)))
 *    = z * log(1 + exp(-x)) + (1 - z) * (x + log(1 + exp(-x))
 *    = (1 - z) * x + log(1 + exp(-x))
 *    = x - x * z + log(1 + exp(-x))
 * For x < 0, to avoid overflow in exp(-x), we reformulate the above
 *      x - x * z + log(1 + exp(-x))
 *    = log(exp(x)) - x * z + log(1 + exp(-x))
 *    = - x * z + log(1 + exp(x))
 * Hence, to ensure stability and avoid overflow, the implementation uses this
 * equivalent formulation
 *    max(x, 0) - x * z + log(1 + exp(-abs(x)))
 *
 * @param labels The labels.
 * @param logits The logits.
 */
function sigmoidCrossEntropyWithLogits(labels, logits) {
    if (!tfjs_core_1.util.arraysEqual(labels.shape, logits.shape)) {
        throw new errors_1.ValueError("logits and labels must have the same shape, but got shapes " +
            (JSON.stringify(labels.shape) + " and " + JSON.stringify(logits.shape)));
    }
    return tfjs_core_1.tidy(function () {
        // The logistic loss formula from above is
        //   x - x * z + log(1 + exp(-x))
        // For x < 0, a more numerically stable formula is
        //   -x * z + log(1 + exp(x))
        // Note that these two expressions can be combined into the following:
        //   max(x, 0) - x * z + log(1 + exp(-abs(x)))
        var reluLogits = logits.relu();
        var negAbsLogits = logits.abs().neg();
        return reluLogits.sub(logits.mul(labels)).add(negAbsLogits.exp().log1p());
    });
}
exports.sigmoidCrossEntropyWithLogits = sigmoidCrossEntropyWithLogits;
function binaryCrossentropy(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var y;
        y = tfc.clipByValue(yPred, common_1.epsilon(), 1 - common_1.epsilon());
        y = tfc.log(tfc.div(y, tfc.sub(1, y)));
        return tfc.mean(sigmoidCrossEntropyWithLogits(yTrue, y), -1);
    });
}
exports.binaryCrossentropy = binaryCrossentropy;
function kullbackLeiblerDivergence(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var clippedTrue = tfc.clipByValue(yTrue, common_1.epsilon(), 1);
        var clippedPred = tfc.clipByValue(yPred, common_1.epsilon(), 1);
        return tfc.sum(tfc.mul(yTrue, tfc.log(tfc.div(clippedTrue, clippedPred))), -1);
    });
}
exports.kullbackLeiblerDivergence = kullbackLeiblerDivergence;
function poisson(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var logPred = tfc.log(tfc.add(common_1.epsilon(), yPred));
        return tfc.mean(tfc.sub(yPred, tfc.mul(yTrue, logPred)), -1);
    });
}
exports.poisson = poisson;
function cosineProximity(yTrue, yPred) {
    return tfjs_core_1.tidy(function () {
        var trueNormalized = l2Normalize(yTrue, -1);
        var predNormalized = l2Normalize(yPred, -1);
        var trueXPred = tfc.mul(trueNormalized, predNormalized);
        return tfc.neg(tfc.sum(trueXPred, -1));
    });
}
exports.cosineProximity = cosineProximity;
exports.mse = meanSquaredError;
exports.MSE = meanSquaredError;
exports.mae = meanAbsoluteError;
exports.MAE = meanAbsoluteError;
exports.mape = meanAbsolutePercentageError;
exports.MAPE = meanAbsolutePercentageError;
exports.msle = meanSquaredLogarithmicError;
exports.MSLE = meanSquaredLogarithmicError;
exports.kld = kullbackLeiblerDivergence;
exports.KLD = kullbackLeiblerDivergence;
exports.cosine = cosineProximity;
// TODO(michaelterry): Add deserialize() function.
exports.lossesMap = {
    meanSquaredError: meanSquaredError,
    meanAbsoluteError: meanAbsoluteError,
    meanAbsolutePercentageError: meanAbsolutePercentageError,
    meanSquaredLogarithmicError: meanSquaredLogarithmicError,
    squaredHinge: squaredHinge,
    hinge: hinge,
    categoricalHinge: categoricalHinge,
    logcosh: logcosh,
    categoricalCrossentropy: categoricalCrossentropy,
    sparseCategoricalCrossentropy: sparseCategoricalCrossentropy,
    binaryCrossentropy: binaryCrossentropy,
    kullbackLeiblerDivergence: kullbackLeiblerDivergence,
    poisson: poisson,
    cosineProximity: cosineProximity
};
// Porting note: This diverges from the PyKeras implementation and may need to
// change based on (de)serialization requirements.
function get(identifierOrFn) {
    if (typeof identifierOrFn === 'string') {
        if (identifierOrFn in exports.lossesMap) {
            return exports.lossesMap[identifierOrFn];
        }
        var errMsg = "Unknown loss " + identifierOrFn;
        if (identifierOrFn.toLowerCase().includes('softmaxcrossentropy')) {
            errMsg = "Unknown loss " + identifierOrFn + ". " +
                'Use "categoricalCrossentropy" as the string name for ' +
                'tf.losses.softmaxCrossEntropy';
        }
        throw new errors_1.ValueError(errMsg);
    }
    else {
        return identifierOrFn;
    }
}
exports.get = get;
//# sourceMappingURL=losses.js.map