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
var constraints_1 = require("./constraints");
/**
 * MaxNorm weight constraint.
 *
 * Constrains the weights incident to each hidden unit
 * to have a norm less than or equal to a desired value.
 *
 * References
 *       - [Dropout: A Simple Way to Prevent Neural Networks from Overfitting
 * Srivastava, Hinton, et al.
 * 2014](http://www.cs.toronto.edu/~rsalakhu/papers/srivastava14a.pdf)
 */
/** @doc {heading: 'Constraints',namespace: 'constraints'} */
function maxNorm(args) {
    return new constraints_1.MaxNorm(args);
}
exports.maxNorm = maxNorm;
/**
 * Constrains the weights incident to each hidden unit to have unit norm.
 */
/** @doc {heading: 'Constraints', namespace: 'constraints'} */
function unitNorm(args) {
    return new constraints_1.UnitNorm(args);
}
exports.unitNorm = unitNorm;
/**
 * Constains the weight to be non-negative.
 */
/** @doc {heading: 'Constraints', namespace: 'constraints'} */
function nonNeg() {
    return new constraints_1.NonNeg();
}
exports.nonNeg = nonNeg;
/** @doc {heading: 'Constraints', namespace: 'constraints'} */
function minMaxNorm(config) {
    return new constraints_1.MinMaxNorm(config);
}
exports.minMaxNorm = minMaxNorm;
//# sourceMappingURL=exports_constraints.js.map