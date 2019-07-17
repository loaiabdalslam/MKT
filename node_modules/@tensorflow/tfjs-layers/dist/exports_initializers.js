"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
// tslint:disable-next-line:max-line-length
var initializers_1 = require("./initializers");
/**
 * Initializer that generates tensors initialized to 0.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function zeros() {
    return new initializers_1.Zeros();
}
exports.zeros = zeros;
/**
 * Initializer that generates tensors initialized to 1.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function ones() {
    return new initializers_1.Ones();
}
exports.ones = ones;
/**
 * Initializer that generates values initialized to some constant.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function constant(args) {
    return new initializers_1.Constant(args);
}
exports.constant = constant;
/**
 * Initializer that generates random values initialized to a uniform
 * distribution.
 *
 * Values will be distributed uniformly between the configured minval and
 * maxval.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function randomUniform(args) {
    return new initializers_1.RandomUniform(args);
}
exports.randomUniform = randomUniform;
/**
 * Initializer that generates random values initialized to a normal
 * distribution.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function randomNormal(args) {
    return new initializers_1.RandomNormal(args);
}
exports.randomNormal = randomNormal;
/**
 * Initializer that generates random values initialized to a truncated normal.
 * distribution.
 *
 * These values are similar to values from a `RandomNormal` except that values
 * more than two standard deviations from the mean are discarded and re-drawn.
 * This is the recommended initializer for neural network weights and filters.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function truncatedNormal(args) {
    return new initializers_1.TruncatedNormal(args);
}
exports.truncatedNormal = truncatedNormal;
/**
 * Initializer that generates the identity matrix.
 * Only use for square 2D matrices.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function identity(args) {
    return new initializers_1.Identity(args);
}
exports.identity = identity;
/**
 * Initializer capable of adapting its scale to the shape of weights.
 * With distribution=NORMAL, samples are drawn from a truncated normal
 * distribution centered on zero, with `stddev = sqrt(scale / n)` where n is:
 *   - number of input units in the weight tensor, if mode = FAN_IN.
 *   - number of output units, if mode = FAN_OUT.
 *   - average of the numbers of input and output units, if mode = FAN_AVG.
 * With distribution=UNIFORM,
 * samples are drawn from a uniform distribution
 * within [-limit, limit], with `limit = sqrt(3 * scale / n)`.
 */
/** @doc {heading: 'Initializers',namespace: 'initializers'} */
function varianceScaling(config) {
    return new initializers_1.VarianceScaling(config);
}
exports.varianceScaling = varianceScaling;
/**
 * Glorot uniform initializer, also called Xavier uniform initializer.
 * It draws samples from a uniform distribution within [-limit, limit]
 * where `limit` is `sqrt(6 / (fan_in + fan_out))`
 * where `fan_in` is the number of input units in the weight tensor
 * and `fan_out` is the number of output units in the weight tensor
 *
 * Reference:
 *   Glorot & Bengio, AISTATS 2010
 *       http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function glorotUniform(args) {
    return new initializers_1.GlorotUniform(args);
}
exports.glorotUniform = glorotUniform;
/**
 * Glorot normal initializer, also called Xavier normal initializer.
 * It draws samples from a truncated normal distribution centered on 0
 * with `stddev = sqrt(2 / (fan_in + fan_out))`
 * where `fan_in` is the number of input units in the weight tensor
 * and `fan_out` is the number of output units in the weight tensor.
 *
 * Reference:
 *   Glorot & Bengio, AISTATS 2010
 *       http://jmlr.org/proceedings/papers/v9/glorot10a/glorot10a.pdf
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function glorotNormal(args) {
    return new initializers_1.GlorotNormal(args);
}
exports.glorotNormal = glorotNormal;
/**
 * He normal initializer.
 *
 * It draws samples from a truncated normal distribution centered on 0
 * with `stddev = sqrt(2 / fanIn)`
 * where `fanIn` is the number of input units in the weight tensor.
 *
 * Reference:
 *     He et al., http://arxiv.org/abs/1502.01852
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function heNormal(args) {
    return new initializers_1.HeNormal(args);
}
exports.heNormal = heNormal;
/**
 * He uniform initializer.
 *
 * It draws samples from a uniform distribution within [-limit, limit]
 * where `limit` is `sqrt(6 / fan_in)`
 * where `fanIn` is the number of input units in the weight tensor.
 *
 * Reference:
 *     He et al., http://arxiv.org/abs/1502.01852
 */
/** @doc {heading: 'Initializers',namespace: 'initializers'} */
function heUniform(args) {
    return new initializers_1.HeUniform(args);
}
exports.heUniform = heUniform;
/**
 * LeCun normal initializer.
 *
 * It draws samples from a truncated normal distribution centered on 0
 * with `stddev = sqrt(1 / fanIn)`
 * where `fanIn` is the number of input units in the weight tensor.
 *
 * References:
 *   [Self-Normalizing Neural Networks](https://arxiv.org/abs/1706.02515)
 *   [Efficient Backprop](http://yann.lecun.com/exdb/publis/pdf/lecun-98b.pdf)
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function leCunNormal(args) {
    return new initializers_1.LeCunNormal(args);
}
exports.leCunNormal = leCunNormal;
/**
 * LeCun uniform initializer.
 *
 * It draws samples from a uniform distribution in the interval
 * `[-limit, limit]` with `limit = sqrt(3 / fanIn)`,
 * where `fanIn` is the number of input units in the weight tensor.
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function leCunUniform(args) {
    return new initializers_1.LeCunUniform(args);
}
exports.leCunUniform = leCunUniform;
/**
 * Initializer that generates a random orthogonal matrix.
 *
 * Reference:
 * [Saxe et al., http://arxiv.org/abs/1312.6120](http://arxiv.org/abs/1312.6120)
 */
/** @doc {heading: 'Initializers', namespace: 'initializers'} */
function orthogonal(args) {
    return new initializers_1.Orthogonal(args);
}
exports.orthogonal = orthogonal;
//# sourceMappingURL=exports_initializers.js.map