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
 * Count the elements in an Array of LayerVariables.
 *
 * @param weights: The LayerVariables of which the constituent numbers are to
 *   be counted.
 * @returns A count of the elements in all the LayerVariables
 */
function countParamsInWeights(weights) {
    var count = 0;
    for (var _i = 0, weights_1 = weights; _i < weights_1.length; _i++) {
        var weight = weights_1[_i];
        if (weight.shape.length === 0) {
            count += 1;
        }
        else {
            count += weight.shape.reduce(function (a, b) { return a * b; });
        }
    }
    return count;
}
exports.countParamsInWeights = countParamsInWeights;
//# sourceMappingURL=variable_utils.js.map