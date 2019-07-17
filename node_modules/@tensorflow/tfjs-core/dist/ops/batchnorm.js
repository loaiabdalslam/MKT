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
var engine_1 = require("../engine");
var globals_1 = require("../globals");
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var array_ops_1 = require("./array_ops");
var broadcast_util_1 = require("./broadcast_util");
var operation_1 = require("./operation");
var tensor_ops_1 = require("./tensor_ops");
var unary_ops_1 = require("./unary_ops");
/**
 * Batch normalization, strictly for 2D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
function batchNorm2d_(x, mean, variance, offset, scale, varianceEpsilon) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchNorm');
    var $mean = tensor_util_env_1.convertToTensor(mean, 'mean', 'batchNorm');
    var $variance = tensor_util_env_1.convertToTensor(variance, 'variance', 'batchNorm');
    var $scale;
    if (scale != null) {
        $scale = tensor_util_env_1.convertToTensor(scale, 'scale', 'batchNorm');
    }
    var $offset;
    if (offset != null) {
        $offset = tensor_util_env_1.convertToTensor(offset, 'offset', 'batchNorm');
    }
    util.assert($x.rank === 2, function () { return "Error in batchNorm3D: x must be rank 3 but got rank " +
        ($x.rank + "."); });
    util.assert($mean.rank === 2 || $mean.rank === 1, function () { return "Error in batchNorm2D: mean must be rank 2 or rank 1 but " +
        ("got rank " + $mean.rank + "."); });
    util.assert($variance.rank === 2 || $variance.rank === 1, function () { return "Error in batchNorm2D: variance must be rank 2 or rank 1 " +
        ("but got rank " + $variance.rank + "."); });
    if ($scale != null) {
        util.assert($scale.rank === 2 || $scale.rank === 1, function () { return "Error in batchNorm2D: scale must be rank 2 or rank 1 " +
            ("but got rank " + $scale.rank + "."); });
    }
    if ($offset != null) {
        util.assert($offset.rank === 2 || $offset.rank === 1, function () { return "Error in batchNorm2D: offset must be rank 2 or rank 1 " +
            ("but got rank " + $offset.rank + "."); });
    }
    return batchNorm_($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
/**
 * Batch normalization, strictly for 3D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
function batchNorm3d_(x, mean, variance, offset, scale, varianceEpsilon) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchNorm');
    var $mean = tensor_util_env_1.convertToTensor(mean, 'mean', 'batchNorm');
    var $variance = tensor_util_env_1.convertToTensor(variance, 'variance', 'batchNorm');
    var $scale;
    if (scale != null) {
        $scale = tensor_util_env_1.convertToTensor(scale, 'scale', 'batchNorm');
    }
    var $offset;
    if (offset != null) {
        $offset = tensor_util_env_1.convertToTensor(offset, 'offset', 'batchNorm');
    }
    util.assert($x.rank === 3, function () { return "Error in batchNorm3D: x must be rank 3 but got rank " +
        ($x.rank + "."); });
    util.assert($mean.rank === 3 || $mean.rank === 1, function () { return "Error in batchNorm3D: mean must be rank 3 or rank 1 but " +
        ("got rank " + $mean.rank + "."); });
    util.assert($variance.rank === 3 || $variance.rank === 1, function () { return "Error in batchNorm3D: variance must be rank 3 or rank 1 " +
        ("but got rank " + $variance.rank + "."); });
    if ($scale != null) {
        util.assert($scale.rank === 3 || $scale.rank === 1, function () { return "Error in batchNorm3D: scale must be rank 3 or rank 1 " +
            ("but got rank " + $scale.rank + "."); });
    }
    if ($offset != null) {
        util.assert($offset.rank === 3 || $offset.rank === 1, function () { return "Error in batchNorm3D: offset must be rank 3 or rank 1 " +
            ("but got rank " + $offset.rank + "."); });
    }
    return batchNorm_($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
/**
 * Batch normalization, strictly for 4D. For the more relaxed version, see
 * `tf.batchNorm`.
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
function batchNorm4d_(x, mean, variance, offset, scale, varianceEpsilon) {
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchNorm');
    var $mean = tensor_util_env_1.convertToTensor(mean, 'mean', 'batchNorm');
    var $variance = tensor_util_env_1.convertToTensor(variance, 'variance', 'batchNorm');
    var $scale;
    if (scale != null) {
        $scale = tensor_util_env_1.convertToTensor(scale, 'scale', 'batchNorm');
    }
    var $offset;
    if (offset != null) {
        $offset = tensor_util_env_1.convertToTensor(offset, 'offset', 'batchNorm');
    }
    util.assert($x.rank === 4, function () { return "Error in batchNorm4D: x must be rank 4 but got rank " +
        ($x.rank + "."); });
    util.assert($mean.rank === 4 || $mean.rank === 1, function () { return "Error in batchNorm4D: mean must be rank 4 or rank 1 but " +
        ("got rank " + $mean.rank + "."); });
    util.assert($variance.rank === 4 || $variance.rank === 1, function () { return "Error in batchNorm4D: variance must be rank 4 or rank 1 " +
        ("but got rank " + $variance.rank + "."); });
    if ($scale != null) {
        util.assert($scale.rank === 4 || $scale.rank === 1, function () { return "Error in batchNorm4D: scale must be rank 4 or rank 1 " +
            ("but got rank " + $scale.rank + "."); });
    }
    if ($offset != null) {
        util.assert($offset.rank === 4 || $offset.rank === 1, function () { return "Error in batchNorm4D: offset must be rank 4 or rank 1 " +
            ("but got rank " + $offset.rank + "."); });
    }
    return batchNorm_($x, $mean, $variance, $offset, $scale, varianceEpsilon);
}
/**
 * @deprecated Please use `tf.batchNorm` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    warnDeprecation();
    return batchNorm_(x, mean, variance, offset, scale, varianceEpsilon);
}
/**
 * Batch normalization.
 *
 * As described in
 * [http://arxiv.org/abs/1502.03167](http://arxiv.org/abs/1502.03167).
 *
 * Mean, variance, scale, and offset can be of two shapes:
 *   - The same shape as the input.
 *   - In the common case, the depth dimension is the last dimension of x, so
 *     the values would be an `tf.Tensor1D` of shape [depth].
 *
 * Also available are stricter rank-specific methods with the same signature
 * as this method that assert that parameters passed are of given rank
 *   - `tf.batchNorm2d`
 *   - `tf.batchNorm3d`
 *   - `tf.batchNorm4d`
 *
 * @param x The input Tensor.
 * @param mean A mean Tensor.
 * @param variance A variance Tensor.
 * @param offset An offset Tensor.
 * @param scale A scale Tensor.
 * @param varianceEpsilon A small float number to avoid dividing by 0.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
function batchNorm_(x, mean, variance, offset, scale, varianceEpsilon) {
    if (varianceEpsilon == null) {
        varianceEpsilon = 0.001;
    }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'batchNorm');
    var $mean = tensor_util_env_1.convertToTensor(mean, 'mean', 'batchNorm');
    var $variance = tensor_util_env_1.convertToTensor(variance, 'variance', 'batchNorm');
    var $scale;
    if (scale != null) {
        $scale = tensor_util_env_1.convertToTensor(scale, 'scale', 'batchNorm');
    }
    var $offset;
    if (offset != null) {
        $offset = tensor_util_env_1.convertToTensor(offset, 'offset', 'batchNorm');
    }
    util.assert($mean.rank === $variance.rank, function () { return 'Batch normalization gradient requires mean and variance to have ' +
        'equal ranks.'; });
    util.assert($offset == null || $mean.rank === $offset.rank, function () { return 'Batch normalization gradient requires mean and offset to have ' +
        'equal ranks.'; });
    util.assert($scale == null || $mean.rank === $scale.rank, function () { return 'Batch normalization gradient requires mean and scale to have ' +
        'equal ranks.'; });
    var x4D;
    if ($x.rank === 0 || $x.rank === 1) {
        x4D = $x.as4D(1, 1, 1, $x.size);
    }
    else if ($x.rank === 2) {
        x4D = $x.as4D(1, 1, $x.shape[0], $x.shape[1]);
    }
    else if ($x.rank === 3) {
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    else {
        x4D = $x;
    }
    var der = function (dy, saved) {
        var _a = saved, $x = _a[0], $mean = _a[1], $variance = _a[2], $scale = _a[3];
        var scaleValue = $scale == null ? tensor_ops_1.scalar(1) : $scale;
        var reductionAxes = broadcast_util_1.getReductionAxes($mean.shape, x4D.shape);
        var tileShape = [];
        if ($mean.rank === 1) {
            for (var i = 0; i < x4D.shape.length - 1; ++i) {
                tileShape.push(x4D.shape[i]);
            }
            tileShape.push(1);
        }
        var xMinusMean = $x.sub($mean);
        var dyTimesScaleValue = dy.mul(scaleValue);
        var oneOverSqrtVariance = unary_ops_1.rsqrt($variance.add(tensor_ops_1.scalar(varianceEpsilon)));
        var minusHalfRCube = oneOverSqrtVariance.mul(oneOverSqrtVariance)
            .mul(oneOverSqrtVariance)
            .mul(tensor_ops_1.scalar(-0.5));
        var derX = function () {
            if ($mean.rank === 1) {
                return dy
                    .mul(array_ops_1.tile(oneOverSqrtVariance.as4D(1, 1, 1, $mean.shape[0]), tileShape))
                    .mul(scaleValue)
                    .reshape($x.shape);
            }
            else {
                return dy.mul(oneOverSqrtVariance).mul(scaleValue).reshape($x.shape);
            }
        };
        var derMean = function () {
            var meanDer = oneOverSqrtVariance.mul(tensor_ops_1.scalar(-1)).mul(dyTimesScaleValue);
            if ($mean.rank === 1) {
                meanDer = meanDer.sum(reductionAxes);
            }
            return meanDer.reshape($mean.shape);
        };
        var derVariance = function () {
            var varianceDer = minusHalfRCube.mul(xMinusMean).mul(dyTimesScaleValue);
            if ($mean.rank === 1) {
                varianceDer = varianceDer.sum(reductionAxes);
            }
            return varianceDer.reshape($mean.shape);
        };
        var derScale = function () {
            var xMinusMean2TimesRsqrt = xMinusMean.mul(oneOverSqrtVariance);
            var scaleDer = dy.mul(xMinusMean2TimesRsqrt);
            if ($mean.rank === 1) {
                scaleDer = scaleDer.sum(reductionAxes);
            }
            return scaleDer.reshape($mean.shape);
        };
        var derOffset = function () {
            var offsetDer = dy;
            if ($mean.rank === 1) {
                offsetDer = offsetDer.sum(reductionAxes);
            }
            return offsetDer.reshape($mean.shape);
        };
        return {
            $x: derX,
            $mean: derMean,
            $variance: derVariance,
            $scale: derScale,
            $offset: derOffset
        };
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var res = backend.batchNormalization(x4D, batchnormReshape4D($mean), batchnormReshape4D($variance), varianceEpsilon, batchnormReshape4D($scale), batchnormReshape4D($offset));
        save([$x, $mean, $variance, $scale]);
        return res;
    }, { $x: $x, $mean: $mean, $variance: $variance, $scale: $scale, $offset: $offset }, der);
    return res.reshape($x.shape);
}
function batchnormReshape4D(x) {
    if (x == null) {
        return null;
    }
    if (x.rank === 0) {
        return x.as1D();
    }
    else if (x.rank === 1) {
        return x;
    }
    else if (x.rank === 2) {
        return x.as4D(1, 1, x.shape[0], x.shape[1]);
    }
    else if (x.rank === 3) {
        return x.as4D(1, x.shape[0], x.shape[1], x.shape[2]);
    }
    return x;
}
/**
 * @deprecated Please use `tf.batchNorm2d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization2d_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    warnDeprecation();
    return batchNorm2d_(x, mean, variance, offset, scale, varianceEpsilon);
}
/**
 * @deprecated Please use `tf.batchNorm3d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization3d_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    warnDeprecation();
    return batchNorm3d_(x, mean, variance, offset, scale, varianceEpsilon);
}
/**
 * @deprecated Please use `tf.batchNorm4d` instead and note the positional
 *     argument change of scale, offset, and varianceEpsilon.
 */
function batchNormalization4d_(x, mean, variance, varianceEpsilon, scale, offset) {
    if (varianceEpsilon === void 0) { varianceEpsilon = .001; }
    warnDeprecation();
    return batchNorm4d_(x, mean, variance, offset, scale, varianceEpsilon);
}
function warnDeprecation() {
    globals_1.deprecationWarn('tf.batchNormalization() is going away. ' +
        'Use tf.batchNorm() instead, and note the positional argument change ' +
        'of scale, offset, and varianceEpsilon');
}
exports.batchNormalization2d = operation_1.op({ batchNormalization2d_: batchNormalization2d_ });
exports.batchNormalization3d = operation_1.op({ batchNormalization3d_: batchNormalization3d_ });
exports.batchNormalization4d = operation_1.op({ batchNormalization4d_: batchNormalization4d_ });
exports.batchNormalization = operation_1.op({ batchNormalization_: batchNormalization_ });
exports.batchNorm = operation_1.op({ batchNorm_: batchNorm_ });
exports.batchNorm2d = operation_1.op({ batchNorm2d_: batchNorm2d_ });
exports.batchNorm3d = operation_1.op({ batchNorm3d_: batchNorm3d_ });
exports.batchNorm4d = operation_1.op({ batchNorm4d_: batchNorm4d_ });
//# sourceMappingURL=batchnorm.js.map