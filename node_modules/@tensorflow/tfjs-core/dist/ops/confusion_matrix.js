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
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var array_ops_1 = require("./array_ops");
var operation_1 = require("./operation");
/**
 * Computes the confusion matrix from true labels and predicted labels.
 *
 * ```js
 * const labels = tf.tensor1d([0, 1, 2, 1, 0], 'int32');
 * const predictions = tf.tensor1d([0, 2, 2, 1, 0], 'int32');
 * const numClasses = 3;
 * const out = tf.math.confusionMatrix(labels, predictions, numClasses);
 * out.print();
 * // Expected output matrix:
 * // [[2, 0, 0],
 * //  [0, 1, 1],
 * //  [0, 0, 1]]
 * ```
 *
 * @param labels The target labels, assumed to be 0-based integers
 *   for the classes. The shape is `[numExamples]`, where
 *   `numExamples` is the number of examples included.
 * @param predictions The predicted classes, assumed to be
 *   0-based integers for the classes. Must have the same shape as `labels`.
 * @param numClasses Number of all classes, as an integer.
 *   Its value must be larger than the largest element in `labels` and
 *   `predictions`.
 * @returns The confusion matrix as a int32-type 2D tensor. The value at
 *   row `r` and column `c` is the number of times examples of actual class
 *   `r` were predicted as class `c`.
 */
/** @doc {heading: 'Operations', subheading: 'Evaluation'} */
function confusionMatrix_(labels, predictions, numClasses) {
    var $labels = tensor_util_env_1.convertToTensor(labels, 'labels', 'confusionMatrix');
    var $predictions = tensor_util_env_1.convertToTensor(predictions, 'predictions', 'confusionMatrix');
    util.assert(numClasses == null || numClasses > 0 && Number.isInteger(numClasses), function () { return "If provided, numClasses must be a positive integer, " +
        ("but got " + numClasses); });
    util.assert($labels.rank === 1, function () { return "Expected the rank of labels to be 1, but got " + $labels.rank; });
    util.assert($predictions.rank === 1, function () { return "Expected the rank of predictions to be 1, " +
        ("but got " + $predictions.rank); });
    util.assert($labels.shape[0] === $predictions.shape[0], function () { return "Mismatch in the number of examples: " +
        ($labels.shape[0] + " vs. " + $predictions.shape[0] + ". ") +
        "Labels and predictions should have the same number of elements."; });
    util.assert(numClasses > 0 && Number.isInteger(numClasses), function () { return "numClasses is required to be a positive integer, but got " +
        ("" + numClasses); });
    // TODO(cais): In the future, if oneHot supports tensors inputs for
    //   `numClasses`, `confusionMatrix` can make `numClasses` optional.
    var oneHotLabels = array_ops_1.oneHot($labels.asType('int32'), numClasses);
    var oneHotPredictions = array_ops_1.oneHot($predictions.asType('int32'), numClasses);
    return oneHotLabels.transpose().matMul(oneHotPredictions).asType('int32');
}
exports.confusionMatrix_ = confusionMatrix_;
exports.confusionMatrix = operation_1.op({ confusionMatrix_: confusionMatrix_ });
//# sourceMappingURL=confusion_matrix.js.map