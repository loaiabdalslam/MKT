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
var tensor_util_env_1 = require("../tensor_util_env");
var util = require("../util");
var operation_1 = require("./operation");
/**
 * Normalizes the activation of a local neighborhood across or within
 * channels.
 *
 * @param x The input tensor. The 4-D input tensor is treated as a 3-D array
 *     of 1D vectors (along the last dimension), and each vector is
 *     normalized independently.
 * @param depthRadius The number of adjacent channels in the 1D normalization
 *     window.
 * @param bias A constant bias term for the basis.
 * @param alpha A scale factor, usually positive.
 * @param beta An exponent.
 */
/** @doc {heading: 'Operations', subheading: 'Normalization'} */
function localResponseNormalization_(x, depthRadius, bias, alpha, beta) {
    if (depthRadius === void 0) { depthRadius = 5; }
    if (bias === void 0) { bias = 1; }
    if (alpha === void 0) { alpha = 1; }
    if (beta === void 0) { beta = 0.5; }
    var $x = tensor_util_env_1.convertToTensor(x, 'x', 'localResponseNormalization');
    util.assert($x.rank === 4 || $x.rank === 3, function () { return "Error in localResponseNormalization: x must be rank 3 or 4 but got\n               rank " + $x.rank + "."; });
    util.assert(util.isInt(depthRadius), function () { return "Error in localResponseNormalization: depthRadius must be an " +
        ("integer but got depthRadius " + depthRadius + "."); });
    var x4D = $x;
    var reshapedTo4D = false;
    if ($x.rank === 3) {
        reshapedTo4D = true;
        x4D = $x.as4D(1, $x.shape[0], $x.shape[1], $x.shape[2]);
    }
    var backward = function (dy, saved) {
        var x4D = saved[0], y = saved[1];
        return {
            x4D: function () { return engine_1.ENGINE.runKernel(function (backend) { return backend.LRNGrad(dy, x4D, y, depthRadius, bias, alpha, beta); }, {}); }
        };
    };
    var res = engine_1.ENGINE.runKernel(function (backend, save) {
        var y = backend.localResponseNormalization4D(x4D, depthRadius, bias, alpha, beta);
        save([x4D, y]);
        return y;
    }, { x4D: x4D }, backward);
    if (reshapedTo4D) {
        return res.as3D(res.shape[1], res.shape[2], res.shape[3]);
    }
    else {
        return res;
    }
}
exports.localResponseNormalization = operation_1.op({ localResponseNormalization_: localResponseNormalization_ });
//# sourceMappingURL=lrn.js.map