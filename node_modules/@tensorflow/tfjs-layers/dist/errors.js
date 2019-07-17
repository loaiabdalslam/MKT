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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Explicit error types.
 *
 * See the following link for more information about why the code includes
 * calls to setPrototypeOf:
 *
 * https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
 */
// tslint:enable
/**
 * Equivalent of Python's AttributeError.
 */
var AttributeError = /** @class */ (function (_super) {
    __extends(AttributeError, _super);
    function AttributeError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, AttributeError.prototype);
        return _this;
    }
    return AttributeError;
}(Error));
exports.AttributeError = AttributeError;
/**
 * Equivalent of Python's RuntimeError.
 */
var RuntimeError = /** @class */ (function (_super) {
    __extends(RuntimeError, _super);
    function RuntimeError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, RuntimeError.prototype);
        return _this;
    }
    return RuntimeError;
}(Error));
exports.RuntimeError = RuntimeError;
/**
 * Equivalent of Python's ValueError.
 */
var ValueError = /** @class */ (function (_super) {
    __extends(ValueError, _super);
    function ValueError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, ValueError.prototype);
        return _this;
    }
    return ValueError;
}(Error));
exports.ValueError = ValueError;
/**
 * Equivalent of Python's NotImplementedError.
 */
var NotImplementedError = /** @class */ (function (_super) {
    __extends(NotImplementedError, _super);
    function NotImplementedError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, NotImplementedError.prototype);
        return _this;
    }
    return NotImplementedError;
}(Error));
exports.NotImplementedError = NotImplementedError;
/**
 * Equivalent of Python's AssertionError.
 */
var AssertionError = /** @class */ (function (_super) {
    __extends(AssertionError, _super);
    function AssertionError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, AssertionError.prototype);
        return _this;
    }
    return AssertionError;
}(Error));
exports.AssertionError = AssertionError;
/**
 * Equivalent of Python's IndexError.
 */
var IndexError = /** @class */ (function (_super) {
    __extends(IndexError, _super);
    function IndexError(message) {
        var _this = _super.call(this, message) || this;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, IndexError.prototype);
        return _this;
    }
    return IndexError;
}(Error));
exports.IndexError = IndexError;
//# sourceMappingURL=errors.js.map