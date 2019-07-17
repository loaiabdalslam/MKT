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
var regularizers = require("./regularizers");
// tslint:disable-next-line:max-line-length
var regularizers_1 = require("./regularizers");
/**
 * Regularizer for L1 and L2 regularization.
 *
 * Adds a term to the loss to penalize large weights:
 * loss += sum(l1 * abs(x)) + sum(l2 * x^2)
 */
/** @doc {heading: 'Regularizers', namespace: 'regularizers'} */
function l1l2(config) {
    return new regularizers_1.L1L2(config);
}
exports.l1l2 = l1l2;
/**
 * Regularizer for L1 regularization.
 *
 * Adds a term to the loss to penalize large weights:
 * loss += sum(l1 * abs(x))
 * @param args l1 config.
 */
/** @doc {heading: 'Regularizers', namespace: 'regularizers'} */
function l1(config) {
    return regularizers.l1(config);
}
exports.l1 = l1;
/**
 * Regularizer for L2 regularization.
 *
 * Adds a term to the loss to penalize large weights:
 * loss += sum(l2 * x^2)
 * @param args l2 config.
 */
/** @doc {heading: 'Regularizers', namespace: 'regularizers'} */
function l2(config) {
    return regularizers.l2(config);
}
exports.l2 = l2;
//# sourceMappingURL=exports_regularizers.js.map