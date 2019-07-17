"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var losses = require("./losses");
var metrics = require("./metrics");
/**
 * Binary accuracy metric function.
 *
 * `yTrue` and `yPred` can have 0-1 values. Example:
 * ```js
 * const x = tf.tensor2d([[1, 1, 1, 1], [0, 0, 0, 0]], [2, 4]);
 * const y = tf.tensor2d([[1, 0, 1, 0], [0, 0, 0, 1]], [2, 4]);
 * const accuracy = tf.metrics.binaryAccuracy(x, y);
 * accuracy.print();
 * ```
 *
 * `yTrue` and `yPred` can also have floating-number values between 0 and 1, in
 * which case the values will be thresholded at 0.5 to yield 0-1 values (i.e.,
 * a value >= 0.5 and <= 1.0 is interpreted as 1.
 * )
 * Example:
 * ```js
 * const x = tf.tensor1d([1, 1, 1, 1, 0, 0, 0, 0]);
 * const y = tf.tensor1d([0.2, 0.4, 0.6, 0.8, 0.2, 0.3, 0.4, 0.7]);
 * const accuracy = tf.metrics.binaryAccuracy(x, y);
 * accuracy.print();
 * ```
 *
 * @param yTrue Binary Tensor of truth.
 * @param yPred Binary Tensor of prediction.
 * @return Accuracy Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function binaryAccuracy(yTrue, yPred) {
    return metrics.binaryAccuracy(yTrue, yPred);
}
exports.binaryAccuracy = binaryAccuracy;
/**
 * Binary crossentropy metric function.
 *
 * Example:
 * ```js
 * const x = tf.tensor2d([[0], [1], [1], [1]]);
 * const y = tf.tensor2d([[0], [0], [0.5], [1]]);
 * const crossentropy = tf.metrics.binaryCrossentropy(x, y);
 * crossentropy.print();
 * ```
 *
 * @param yTrue Binary Tensor of truth.
 * @param yPred Binary Tensor of prediction, probabilities for the `1` case.
 * @return Accuracy Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function binaryCrossentropy(yTrue, yPred) {
    return metrics.binaryCrossentropy(yTrue, yPred);
}
exports.binaryCrossentropy = binaryCrossentropy;
/**
 * Sparse categorical accuracy metric function.
 *
 * Example:
 * ```js
 *
 * const yTrue = tf.tensor1d([1, 1, 2, 2, 0]);
 * const yPred = tf.tensor2d(
 *      [[0, 1, 0], [1, 0, 0], [0, 0.4, 0.6], [0, 0.6, 0.4], [0.7, 0.3, 0]]);
 * const crossentropy = tf.metrics.sparseCategoricalAccuracy(yTrue, yPred);
 * crossentropy.print();
 * ```
 *
 * @param yTrue True labels: indices.
 * @param yPred Predicted probabilities or logits.
 * @returns Accuracy tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function sparseCategoricalAccuracy(yTrue, yPred) {
    return metrics.sparseCategoricalAccuracy(yTrue, yPred);
}
exports.sparseCategoricalAccuracy = sparseCategoricalAccuracy;
/**
 * Categorical accuracy metric function.
 *
 * Example:
 * ```js
 * const x = tf.tensor2d([[0, 0, 0, 1], [0, 0, 0, 1]]);
 * const y = tf.tensor2d([[0.1, 0.8, 0.05, 0.05], [0.1, 0.05, 0.05, 0.8]]);
 * const accuracy = tf.metrics.categoricalAccuracy(x, y);
 * accuracy.print();
 * ```
 *
 * @param yTrue Binary Tensor of truth: one-hot encoding of categories.
 * @param yPred Binary Tensor of prediction: probabilities or logits for the
 *   same categories as in `yTrue`.
 * @return Accuracy Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function categoricalAccuracy(yTrue, yPred) {
    return metrics.categoricalAccuracy(yTrue, yPred);
}
exports.categoricalAccuracy = categoricalAccuracy;
/**
 * Categorical crossentropy between an output tensor and a target tensor.
 *
 * @param target A tensor of the same shape as `output`.
 * @param output A tensor resulting from a softmax (unless `fromLogits` is
 *  `true`, in which case `output` is expected to be the logits).
 * @param fromLogits Boolean, whether `output` is the result of a softmax, or is
 *   a tensor of logits.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function categoricalCrossentropy(yTrue, yPred) {
    return metrics.categoricalCrossentropy(yTrue, yPred);
}
exports.categoricalCrossentropy = categoricalCrossentropy;
/**
 * Computes the precision of the predictions with respect to the labels.
 *
 * Example:
 * ```js
 * const x = tf.tensor2d(
 *    [
 *      [0, 0, 0, 1],
 *      [0, 1, 0, 0],
 *      [0, 0, 0, 1],
 *      [1, 0, 0, 0],
 *      [0, 0, 1, 0]
 *    ]
 * );
 *
 * const y = tf.tensor2d(
 *    [
 *      [0, 0, 1, 0],
 *      [0, 1, 0, 0],
 *      [0, 0, 0, 1],
 *      [0, 1, 0, 0],
 *      [0, 1, 0, 0]
 *    ]
 * );
 *
 * const precision = tf.metrics.precision(x, y);
 * precision.print();
 * ```
 *
 * @param yTrue The ground truth values. Expected to be contain only 0-1 values.
 * @param yPred The predicted values. Expected to be contain only 0-1 values.
 * @return Precision Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function precision(yTrue, yPred) {
    return metrics.precision(yTrue, yPred);
}
exports.precision = precision;
/**
 * Computes the recall of the predictions with respect to the labels.
 *
 * Example:
 * ```js
 * const x = tf.tensor2d(
 *    [
 *      [0, 0, 0, 1],
 *      [0, 1, 0, 0],
 *      [0, 0, 0, 1],
 *      [1, 0, 0, 0],
 *      [0, 0, 1, 0]
 *    ]
 * );
 *
 * const y = tf.tensor2d(
 *    [
 *      [0, 0, 1, 0],
 *      [0, 1, 0, 0],
 *      [0, 0, 0, 1],
 *      [0, 1, 0, 0],
 *      [0, 1, 0, 0]
 *    ]
 * );
 *
 * const recall = tf.metrics.recall(x, y);
 * recall.print();
 * ```
 *
 * @param yTrue The ground truth values. Expected to be contain only 0-1 values.
 * @param yPred The predicted values. Expected to be contain only 0-1 values.
 * @return Recall Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function recall(yTrue, yPred) {
    return metrics.recall(yTrue, yPred);
}
exports.recall = recall;
/**
 * Loss or metric function: Cosine proximity.
 *
 * Mathematically, cosine proximity is defined as:
 *   `-sum(l2Normalize(yTrue) * l2Normalize(yPred))`,
 * wherein `l2Normalize()` normalizes the L2 norm of the input to 1 and `*`
 * represents element-wise multiplication.
 *
 * ```js
 * const yTrue = tf.tensor2d([[1, 0], [1, 0]]);
 * const yPred = tf.tensor2d([[1 / Math.sqrt(2), 1 / Math.sqrt(2)], [0, 1]]);
 * const proximity = tf.metrics.cosineProximity(yTrue, yPred);
 * proximity.print();
 * ```
 *
 * @param yTrue Truth Tensor.
 * @param yPred Prediction Tensor.
 * @return Cosine proximity Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function cosineProximity(yTrue, yPred) {
    return losses.cosineProximity(yTrue, yPred);
}
exports.cosineProximity = cosineProximity;
/**
 * Loss or metric function: Mean absolute error.
 *
 * Mathematically, mean absolute error is defined as:
 *   `mean(abs(yPred - yTrue))`,
 * wherein the `mean` is applied over feature dimensions.
 *
 * ```js
 * const yTrue = tf.tensor2d([[0, 1], [0, 0], [2, 3]]);
 * const yPred = tf.tensor2d([[0, 1], [0, 1], [-2, -3]]);
 * const mse = tf.metrics.meanAbsoluteError(yTrue, yPred);
 * mse.print();
 * ```
 *
 * @param yTrue Truth Tensor.
 * @param yPred Prediction Tensor.
 * @return Mean absolute error Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function meanAbsoluteError(yTrue, yPred) {
    return losses.meanAbsoluteError(yTrue, yPred);
}
exports.meanAbsoluteError = meanAbsoluteError;
/**
 * Loss or metric function: Mean absolute percentage error.
 *
 * ```js
 * const yTrue = tf.tensor2d([[0, 1], [10, 20]]);
 * const yPred = tf.tensor2d([[0, 1], [11, 24]]);
 * const mse = tf.metrics.meanAbsolutePercentageError(yTrue, yPred);
 * mse.print();
 * ```
 *
 * Aliases: `tf.metrics.MAPE`, `tf.metrics.mape`.
 *
 * @param yTrue Truth Tensor.
 * @param yPred Prediction Tensor.
 * @return Mean absolute percentage error Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function meanAbsolutePercentageError(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.meanAbsolutePercentageError = meanAbsolutePercentageError;
function MAPE(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.MAPE = MAPE;
function mape(yTrue, yPred) {
    return losses.meanAbsolutePercentageError(yTrue, yPred);
}
exports.mape = mape;
/**
 * Loss or metric function: Mean squared error.
 *
 * ```js
 * const yTrue = tf.tensor2d([[0, 1], [3, 4]]);
 * const yPred = tf.tensor2d([[0, 1], [-3, -4]]);
 * const mse = tf.metrics.meanSquaredError(yTrue, yPred);
 * mse.print();
 * ```
 *
 * Aliases: `tf.metrics.MSE`, `tf.metrics.mse`.
 *
 * @param yTrue Truth Tensor.
 * @param yPred Prediction Tensor.
 * @return Mean squared error Tensor.
 */
/** @doc {heading: 'Metrics', namespace: 'metrics'} */
function meanSquaredError(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.meanSquaredError = meanSquaredError;
function MSE(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.MSE = MSE;
function mse(yTrue, yPred) {
    return losses.meanSquaredError(yTrue, yPred);
}
exports.mse = mse;
//# sourceMappingURL=exports_metrics.js.map