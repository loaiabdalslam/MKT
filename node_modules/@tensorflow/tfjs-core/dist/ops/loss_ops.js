"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var gradients_1 = require("../gradients");
var tensor_util_env_1 = require("../tensor_util_env");
var util_1 = require("../util");
var axis_util_1 = require("./axis_util");
var binary_ops_1 = require("./binary_ops");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
var Reduction;
(function (Reduction) {
    Reduction[Reduction["NONE"] = 0] = "NONE";
    Reduction[Reduction["MEAN"] = 1] = "MEAN";
    Reduction[Reduction["SUM"] = 2] = "SUM";
    Reduction[Reduction["SUM_BY_NONZERO_WEIGHTS"] = 3] = "SUM_BY_NONZERO_WEIGHTS";
})(Reduction = exports.Reduction || (exports.Reduction = {}));
/**
 * Computes the weighted loss between two tensors.
 *
 * @param losses Tensor of shape `[batch_size, d1, ... dN]`.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `losses`, and must be broadcastable to `losses` (i.e., all
 *    dimensions must be either `1`, or the same as the corresponding
 *    `losses` dimension).
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function computeWeightedLoss_(losses, weights, reduction) {
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $losses = tensor_util_env_1.convertToTensor(losses, 'losses', 'computeWeightedLoss');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'computeWeightedLoss');
    }
    var weightedLoss = ($weights == null) ? $losses : $losses.mul($weights);
    if (reduction === Reduction.NONE) {
        return weightedLoss;
    }
    if (reduction === Reduction.SUM) {
        return weightedLoss.sum();
    }
    if (reduction === Reduction.MEAN) {
        if ($weights == null) {
            return weightedLoss.mean();
        }
        else {
            var broadcastFactor = $losses.size / $weights.size;
            var result = weightedLoss.sum().div($weights.sum());
            return broadcastFactor > 1 ? result.div(tensor_ops_1.scalar(broadcastFactor)) :
                result;
        }
    }
    if (reduction === Reduction.SUM_BY_NONZERO_WEIGHTS) {
        if ($weights == null) {
            return weightedLoss.sum().div(tensor_ops_1.scalar($losses.size));
        }
        else {
            var broadcastedWeights = $weights.mul(tensor_ops_1.ones($losses.shape));
            var numNonZeros = broadcastedWeights.notEqual(tensor_ops_1.scalar(0)).sum().toFloat();
            return weightedLoss.sum().div(numNonZeros);
        }
    }
    throw Error("Unknown reduction: " + reduction);
}
/**
 * Computes the absolute difference loss between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function absoluteDifference_(labels, predictions, weights, reduction) {
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'absoluteDifference');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'absoluteDifference');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'absoluteDifference');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in absoluteDifference: ');
    var losses = $labels.sub($predictions).abs();
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes the mean squared error between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function meanSquaredError_(labels, predictions, weights, reduction) {
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'meanSquaredError');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'meanSquaredError');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'meanSquaredError');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in meanSquaredError: ');
    var losses = $labels.squaredDifference($predictions);
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes the cosine distance loss between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param axis The dimension along which the cosine distance is computed.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function cosineDistance_(labels, predictions, axis, weights, reduction) {
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'cosineDistance');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'cosineDistance');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'cosineDistance');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in cosineDistance: ');
    var one = tensor_ops_1.scalar(1);
    var losses = one.sub($labels.mul($predictions).sum(axis, true));
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes the Hinge loss between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function hingeLoss_(labels, predictions, weights, reduction) {
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'hingeLoss');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'hingeLoss');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'hingeLoss');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in hingeLoss: ');
    var one = tensor_ops_1.scalar(1);
    // Convert binary labels to (-1, 1)
    $labels = tensor_ops_1.scalar(2).mul($labels).sub(one);
    var losses = one.sub($labels.mul($predictions)).relu();
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes the log loss between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param epsilon A small increment to avoid taking log of zero
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function logLoss_(labels, predictions, weights, epsilon, reduction) {
    if (epsilon === void 0) { epsilon = 1e-7; }
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'logLoss');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'logLoss');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'logLoss');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in logLoss: ');
    var one = tensor_ops_1.scalar(1);
    var epsilonScalar = tensor_ops_1.scalar(epsilon);
    var losses = $labels.mul($predictions.add(epsilonScalar).log())
        .neg()
        .sub(one.sub($labels).mul(one.sub($predictions).add(epsilonScalar).log()));
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
function sigmoidCrossEntropyWithLogits_(labels, logits) {
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'sigmoidCrossEntropyWithLogits');
    var $logits = tensor_util_env_1.convertToTensor(logits, 'logits', 'sigmoidCrossEntropyWithLogits');
    util_1.assertShapesMatch($labels.shape, $logits.shape, 'Error in sigmoidCrossEntropyWithLogits: ');
    /**
     * Implementation Details:
     *
     * For brevity, let `x = logits`, `z = labels`.  The logistic loss is
     *     z * -log(sigmoid(x)) + (1 - z) * -log(1 - sigmoid(x))
     *   = z * -log(1 / (1 + exp(-x))) + (1 - z) * -log(exp(-x) / (1 + exp(-x)))
     *   = z * log(1 + exp(-x)) + (1 - z) * (-log(exp(-x)) + log(1 + exp(-x)))
     *   = z * log(1 + exp(-x)) + (1 - z) * (x + log(1 + exp(-x))
     *   = (1 - z) * x + log(1 + exp(-x))
     *   = x - x * z + log(1 + exp(-x))
     *
     *   For x < 0, to avoid overflow in exp(-x), we reformulate the above
     *     x - x * z + log(1 + exp(-x))
     *   = log(exp(x)) - x * z + log(1 + exp(-x))
     *   = - x * z + log(1 + exp(x))
     *
     * Hence, to ensure stability and avoid overflow, the implementation uses
     * this equivalent formulation:
     *     max(x, 0) - x * z + log(1 + exp(-abs(x)))
     */
    var maxOutput = $logits.relu();
    var outputXTarget = $logits.mul($labels);
    var sigmoidOutput = $logits.abs().neg().exp().log1p();
    return maxOutput.sub(outputXTarget).add(sigmoidOutput);
}
/**
 * Computes the sigmoid cross entropy loss between two tensors.
 *
 * If labelSmoothing is nonzero, smooth the labels towards 1/2:
 *
 *   newMulticlassLabels = multiclassLabels * (1 - labelSmoothing)
 *                         + 0.5 * labelSmoothing
 *
 * @param multiClassLabels The ground truth output tensor of shape
 * [batch_size, num_classes], same dimensions as 'predictions'.
 * @param logits The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param labelSmoothing If greater than 0, then smooth the labels.
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc { heading: 'Training', subheading: 'Losses', namespace: 'losses' } */
function sigmoidCrossEntropy_(multiClassLabels, logits, weights, labelSmoothing, reduction) {
    if (labelSmoothing === void 0) { labelSmoothing = 0; }
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $multiClassLabels = tensor_util_env_1.convertToTensor(multiClassLabels, 'multiClassLabels', 'sigmoidCrossEntropy');
    var $logits = tensor_util_env_1.convertToTensor(logits, 'logits', 'sigmoidCrossEntropy');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'sigmoidCrossEntropy');
    }
    util_1.assertShapesMatch($multiClassLabels.shape, $logits.shape, 'Error in sigmoidCrossEntropy: ');
    if (labelSmoothing > 0) {
        var labelSmoothingScalar = tensor_ops_1.scalar(labelSmoothing);
        var one = tensor_ops_1.scalar(1);
        var half = tensor_ops_1.scalar(0.5);
        $multiClassLabels = $multiClassLabels.mul(one.sub(labelSmoothingScalar))
            .add(half.mul(labelSmoothingScalar));
    }
    var losses = sigmoidCrossEntropyWithLogits_($multiClassLabels, $logits);
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes the huber loss between two tensors.
 *
 * @param labels The ground truth output tensor, same dimensions as
 *    'predictions'.
 * @param predictions The predicted outputs.
 * @param weights Tensor whose rank is either 0, or the same rank as
 *    `labels`, and must be broadcastable to `labels` (i.e., all dimensions
 *    must be either `1`, or the same as the corresponding `losses`
 *    dimension).
 * @param delta Point where huber loss changes from quadratic to linear.
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`.
 */
/** @doc {heading: 'Training', subheading: 'Losses', namespace: 'losses'} */
function huberLoss_(labels, predictions, weights, delta, reduction) {
    if (delta === void 0) { delta = 1.0; }
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'huberLoss');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'huberLoss');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'huberLoss');
    }
    util_1.assertShapesMatch($labels.shape, $predictions.shape, 'Error in huberLoss: ');
    var deltaScalar = tensor_ops_1.scalar(delta);
    var error = $predictions.sub($labels).abs();
    var quadratic = binary_ops_1.minimum(error, deltaScalar);
    var linear = error.sub(quadratic);
    var losses = tensor_ops_1.scalar(0.5).mul(quadratic.square()).add(deltaScalar.mul(linear));
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
/**
 * Computes softmax cross entropy between logits and labels.
 *
 * Measures the probability error in discrete classification tasks in which
 * the classes are mutually exclusive (each entry is in exactly one class).
 * For example, each CIFAR-10 image is labeled with one and only one label: an
 * image can be a dog or a truck, but not both.
 *
 * `NOTE`: While the classes are mutually exclusive, their probabilities need
 * not be. All that is required is that each row of labels is a valid
 * probability distribution. If they are not, the computation of the gradient
 * will be incorrect.
 *
 * `WARNING`: This op expects unscaled logits, since it performs a softmax on
 * logits internally for efficiency. Do not call this op with the output of
 * softmax, as it will produce incorrect results.
 *
 * logits and labels must have the same shape, e.g. [batch_size, num_classes]
 * and the same dtype.
 * @param labels The labels array.
 * @param logits The logits array.
 * @param dim The dimension softmax would be performed on. Defaults to `-1`
 *     which indicates the last dimension.
 */
function softmaxCrossEntropyWithLogits_(labels, logits, dim) {
    if (dim === void 0) { dim = -1; }
    if (dim === -1) {
        dim = logits.rank - 1;
    }
    if (dim !== logits.rank - 1) {
        throw Error("Softmax cross entropy along a non-last dimension is not yet " +
            ("supported. Labels / logits was rank " + logits.rank + " ") +
            ("and dim was " + dim));
    }
    // Use a custom gradient for numerical stability.
    var customOp = gradients_1.customGrad(function (labels, logits, save) {
        // Reference:
        //   1. http://cs231n.github.io/linear-classify/#softmax
        //   2. https://blog.feedly.com/tricks-of-the-trade-logsumexp/
        var keepDims = true;
        var lse = logits.logSumExp([dim], keepDims);
        var logResult = logits.toFloat().sub(lse);
        save([labels, logResult]);
        var costVector = logResult.mul(labels).neg();
        var value = costVector.sum([dim]);
        var gradFunc = function (dy, saved) {
            var labels = saved[0], logResult = saved[1];
            var dyShape = axis_util_1.expandShapeToKeepDim(dy.shape, [dim]);
            return [
                dy.reshape(dyShape).mul(labels.toFloat().sub(logResult.exp())),
                dy.reshape(dyShape).mul(logResult.exp().sub(labels.toFloat())),
            ];
        };
        return { value: value, gradFunc: gradFunc };
    });
    return customOp(labels, logits);
}
/**
 * Computes the softmax cross entropy loss between two tensors.
 *
 * If labelSmoothing is nonzero, smooth the labels towards 1/2:
 *
 *   newOnehotLabels = onehotLabels * (1 - labelSmoothing)
 *                         + labelSmoothing / numClasses
 *
 * @param onehotLabels One hot encoded labels
 *    [batch_size, num_classes], same dimensions as 'predictions'.
 * @param logits The predicted outputs.
 * @param weights Tensor whose rank is either 0, or 1, and must be
 *    broadcastable to `loss`  of shape [batch_size]
 * @param labelSmoothing If greater than 0, then smooth the labels.
 * @param reduction Type of reduction to apply to loss. Should be of type
 *    `Reduction`
 */
/** @doc { heading: 'Training', subheading: 'Losses', namespace: 'losses' } */
function softmaxCrossEntropy_(onehotLabels, logits, weights, labelSmoothing, reduction) {
    if (labelSmoothing === void 0) { labelSmoothing = 0; }
    if (reduction === void 0) { reduction = Reduction.SUM_BY_NONZERO_WEIGHTS; }
    var $onehotLabels = tensor_util_env_1.convertToTensor(onehotLabels, 'onehotLabels', 'softmaxCrossEntropy');
    var $logits = tensor_util_env_1.convertToTensor(logits, 'logits', 'softmaxCrossEntropy');
    var $weights = null;
    if (weights != null) {
        $weights = tensor_util_env_1.convertToTensor(weights, 'weights', 'softmaxCrossEntropy');
    }
    util_1.assertShapesMatch($onehotLabels.shape, $logits.shape, 'Error in softmaxCrossEntropy: ');
    if (labelSmoothing > 0) {
        var labelSmoothingScalar = tensor_ops_1.scalar(labelSmoothing);
        var one = tensor_ops_1.scalar(1);
        var numClasses = tensor_ops_1.scalar($onehotLabels.shape[1]);
        $onehotLabels = $onehotLabels.mul(one.sub(labelSmoothingScalar))
            .add(labelSmoothingScalar.div(numClasses));
    }
    var losses = softmaxCrossEntropyWithLogits_($onehotLabels, $logits);
    return exports.computeWeightedLoss(losses, $weights, reduction);
}
exports.absoluteDifference = operation_1.op({ absoluteDifference_: absoluteDifference_ });
exports.computeWeightedLoss = operation_1.op({ computeWeightedLoss_: computeWeightedLoss_ });
exports.cosineDistance = operation_1.op({ cosineDistance_: cosineDistance_ });
exports.hingeLoss = operation_1.op({ hingeLoss_: hingeLoss_ });
exports.huberLoss = operation_1.op({ huberLoss_: huberLoss_ });
exports.logLoss = operation_1.op({ logLoss_: logLoss_ });
exports.meanSquaredError = operation_1.op({ meanSquaredError_: meanSquaredError_ });
exports.sigmoidCrossEntropy = operation_1.op({ sigmoidCrossEntropy_: sigmoidCrossEntropy_ });
exports.softmaxCrossEntropy = operation_1.op({ softmaxCrossEntropy_: softmaxCrossEntropy_ });
//# sourceMappingURL=loss_ops.js.map