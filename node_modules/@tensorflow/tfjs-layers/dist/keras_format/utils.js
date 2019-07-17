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
 * Infers a string union type from an array of string literals, and returns
 * the array as an array of that type.
 *
 * For instance:
 *
 * ```
 * const fruits = stringLiteralArray(['apple', 'banana', 'orange']);
 * type Fruit = typeof activationOptions[number];
 * ```
 *
 * now `Fruit` is the union type `'apple'|'banana'|'orange'`.
 *
 * https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings/52085658
 */
function stringLiteralArray(a) {
    return a;
}
exports.stringLiteralArray = stringLiteralArray;
//# sourceMappingURL=utils.js.map