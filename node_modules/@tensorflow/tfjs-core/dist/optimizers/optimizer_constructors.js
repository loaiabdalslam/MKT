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
var adadelta_optimizer_1 = require("./adadelta_optimizer");
var adagrad_optimizer_1 = require("./adagrad_optimizer");
var adam_optimizer_1 = require("./adam_optimizer");
var adamax_optimizer_1 = require("./adamax_optimizer");
var momentum_optimizer_1 = require("./momentum_optimizer");
var rmsprop_optimizer_1 = require("./rmsprop_optimizer");
var sgd_optimizer_1 = require("./sgd_optimizer");
var OptimizerConstructors = /** @class */ (function () {
    function OptimizerConstructors() {
    }
    /**
     * Constructs a `tf.SGDOptimizer` that uses stochastic gradient descent.
     *
     * ```js
     * // Fit a quadratic function by learning the coefficients a, b, c.
     * const xs = tf.tensor1d([0, 1, 2, 3]);
     * const ys = tf.tensor1d([1.1, 5.9, 16.8, 33.9]);
     *
     * const a = tf.scalar(Math.random()).variable();
     * const b = tf.scalar(Math.random()).variable();
     * const c = tf.scalar(Math.random()).variable();
     *
     * // y = a * x^2 + b * x + c.
     * const f = x => a.mul(x.square()).add(b.mul(x)).add(c);
     * const loss = (pred, label) => pred.sub(label).square().mean();
     *
     * const learningRate = 0.01;
     * const optimizer = tf.train.sgd(learningRate);
     *
     * // Train the model.
     * for (let i = 0; i < 10; i++) {
     *   optimizer.minimize(() => loss(f(xs), ys));
     * }
     *
     * // Make predictions.
     * console.log(
     *     `a: ${a.dataSync()}, b: ${b.dataSync()}, c: ${c.dataSync()}`);
     * const preds = f(xs).dataSync();
     * preds.forEach((pred, i) => {
     *   console.log(`x: ${i}, pred: ${pred}`);
     * });
     * ```
     *
     * @param learningRate The learning rate to use for the SGD algorithm.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.sgd = function (learningRate) {
        return new sgd_optimizer_1.SGDOptimizer(learningRate);
    };
    /**
     * Constructs a `tf.MomentumOptimizer` that uses momentum gradient
     * descent.
     *
     * See
     * [http://proceedings.mlr.press/v28/sutskever13.pdf](
     * http://proceedings.mlr.press/v28/sutskever13.pdf)
     *
     * @param learningRate The learning rate to use for the Momentum gradient
     * descent algorithm.
     * @param momentum The momentum to use for the momentum gradient descent
     * algorithm.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.momentum = function (learningRate, momentum, useNesterov) {
        if (useNesterov === void 0) { useNesterov = false; }
        return new momentum_optimizer_1.MomentumOptimizer(learningRate, momentum, useNesterov);
    };
    /**
     * Constructs a `tf.RMSPropOptimizer` that uses RMSProp gradient
     * descent. This implementation uses plain momentum and is not centered
     * version of RMSProp.
     *
     * See
     * [http://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf](
     * http://www.cs.toronto.edu/~tijmen/csc321/slides/lecture_slides_lec6.pdf)
     *
     * @param learningRate The learning rate to use for the RMSProp gradient
     * descent algorithm.
     * @param decay The discounting factor for the history/coming gradient.
     * @param momentum The momentum to use for the RMSProp gradient descent
     * algorithm.
     * @param epsilon Small value to avoid zero denominator.
     * @param centered If true, gradients are normalized by the estimated
     * variance of the gradient.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.rmsprop = function (learningRate, decay, momentum, epsilon, centered) {
        if (decay === void 0) { decay = .9; }
        if (momentum === void 0) { momentum = 0.0; }
        if (epsilon === void 0) { epsilon = null; }
        if (centered === void 0) { centered = false; }
        return new rmsprop_optimizer_1.RMSPropOptimizer(learningRate, decay, momentum, epsilon, centered);
    };
    /**
     * Constructs a `tf.AdamOptimizer` that uses the Adam algorithm.
     * See [https://arxiv.org/abs/1412.6980](https://arxiv.org/abs/1412.6980)
     *
     * @param learningRate The learning rate to use for the Adam gradient
     * descent algorithm.
     * @param beta1 The exponential decay rate for the 1st moment estimates.
     * @param beta2 The exponential decay rate for the 2nd moment estimates.
     * @param epsilon A small constant for numerical stability.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.adam = function (learningRate, beta1, beta2, epsilon) {
        if (learningRate === void 0) { learningRate = 0.001; }
        if (beta1 === void 0) { beta1 = 0.9; }
        if (beta2 === void 0) { beta2 = 0.999; }
        if (epsilon === void 0) { epsilon = null; }
        return new adam_optimizer_1.AdamOptimizer(learningRate, beta1, beta2, epsilon);
    };
    /**
     * Constructs a `tf.AdadeltaOptimizer` that uses the Adadelta algorithm.
     * See [https://arxiv.org/abs/1212.5701](https://arxiv.org/abs/1212.5701)
     *
     * @param learningRate The learning rate to use for the Adadelta gradient
     * descent algorithm.
     * @param rho The learning rate decay over each update.
     * @param epsilon A constant epsilon used to better condition the grad
     * update.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.adadelta = function (learningRate, rho, epsilon) {
        if (learningRate === void 0) { learningRate = .001; }
        if (rho === void 0) { rho = .95; }
        if (epsilon === void 0) { epsilon = null; }
        return new adadelta_optimizer_1.AdadeltaOptimizer(learningRate, rho, epsilon);
    };
    /**
     * Constructs a `tf.AdamaxOptimizer` that uses the Adamax algorithm.
     * See [https://arxiv.org/abs/1412.6980](https://arxiv.org/abs/1412.6980)
     *
     * @param learningRate The learning rate to use for the Adamax gradient
     * descent algorithm.
     * @param beta1 The exponential decay rate for the 1st moment estimates.
     * @param beta2 The exponential decay rate for the 2nd moment estimates.
     * @param epsilon A small constant for numerical stability.
     * @param decay The learning rate decay over each update.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.adamax = function (learningRate, beta1, beta2, epsilon, decay) {
        if (learningRate === void 0) { learningRate = 0.002; }
        if (beta1 === void 0) { beta1 = 0.9; }
        if (beta2 === void 0) { beta2 = 0.999; }
        if (epsilon === void 0) { epsilon = null; }
        if (decay === void 0) { decay = 0.0; }
        return new adamax_optimizer_1.AdamaxOptimizer(learningRate, beta1, beta2, epsilon, decay);
    };
    /**
     * Constructs a `tf.AdagradOptimizer` that uses the Adagrad algorithm.
     * See
     * [http://www.jmlr.org/papers/volume12/duchi11a/duchi11a.pdf](
     * http://www.jmlr.org/papers/volume12/duchi11a/duchi11a.pdf)
     * or
     * [http://ruder.io/optimizing-gradient-descent/index.html#adagrad](
     * http://ruder.io/optimizing-gradient-descent/index.html#adagrad)
     *
     * @param learningRate The learning rate to use for the Adagrad gradient
     * descent algorithm.
     * @param initialAccumulatorValue Starting value for the accumulators, must be
     * positive.
     */
    /**
     * @doc {heading: 'Training', subheading: 'Optimizers', namespace: 'train'}
     */
    OptimizerConstructors.adagrad = function (learningRate, initialAccumulatorValue) {
        if (initialAccumulatorValue === void 0) { initialAccumulatorValue = 0.1; }
        return new adagrad_optimizer_1.AdagradOptimizer(learningRate, initialAccumulatorValue);
    };
    return OptimizerConstructors;
}());
exports.OptimizerConstructors = OptimizerConstructors;
//# sourceMappingURL=optimizer_constructors.js.map