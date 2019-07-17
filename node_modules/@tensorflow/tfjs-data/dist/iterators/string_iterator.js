"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
 *
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var lazy_iterator_1 = require("./lazy_iterator");
var StringIterator = /** @class */ (function (_super) {
    __extends(StringIterator, _super);
    function StringIterator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Splits a string stream on a given separator.
     *
     * It is assumed that the incoming chunk boundaries have no semantic meaning,
     * so conceptually the incoming stream is treated simply as the concatenation
     * of its elements.
     *
     * The outgoing stream provides chunks corresponding to the results of the
     * standard string split() operation (even if such a chunk spanned incoming
     * chunks).  The separators are not included.
     *
     * A typical usage is to split a text file (represented as a stream with
     * arbitrary chunk boundaries) into lines.
     *
     * @param upstream A readable stream of strings that can be treated as
     *   concatenated.
     * @param separator A character to split on.
     */
    StringIterator.prototype.split = function (separator) {
        return new SplitIterator(this, separator);
    };
    return StringIterator;
}(lazy_iterator_1.LazyIterator));
exports.StringIterator = StringIterator;
// ============================================================================
// The following private classes serve to implement the chainable methods
// on StringIterator.  Unfortunately they can't be placed in separate files, due
// to resulting trouble with circular imports.
// ============================================================================
// We wanted multiple inheritance, e.g.
//   class SplitIterator extends QueueIterator<string>, StringIterator
// but the TypeScript mixin approach is a bit hacky, so we take this adapter
// approach instead.
var SplitIterator = /** @class */ (function (_super) {
    __extends(SplitIterator, _super);
    function SplitIterator(upstream, separator) {
        var _this = _super.call(this) || this;
        _this.upstream = upstream;
        _this.impl = new SplitIteratorImpl(upstream, separator);
        return _this;
    }
    SplitIterator.prototype.summary = function () {
        return this.impl.summary();
    };
    SplitIterator.prototype.next = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.impl.next()];
            });
        });
    };
    return SplitIterator;
}(StringIterator));
var SplitIteratorImpl = /** @class */ (function (_super) {
    __extends(SplitIteratorImpl, _super);
    function SplitIteratorImpl(upstream, separator) {
        var _this = _super.call(this) || this;
        _this.upstream = upstream;
        _this.separator = separator;
        // A partial string at the end of an upstream chunk
        _this.carryover = '';
        return _this;
    }
    SplitIteratorImpl.prototype.summary = function () {
        return this.upstream.summary() + " -> Split('" + this.separator + "')";
    };
    SplitIteratorImpl.prototype.pump = function () {
        return __awaiter(this, void 0, void 0, function () {
            var chunkResult, lines, _i, _a, line;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.upstream.next()];
                    case 1:
                        chunkResult = _b.sent();
                        if (chunkResult.done) {
                            if (this.carryover === '') {
                                return [2 /*return*/, false];
                            }
                            // Pretend that the pump succeeded in order to emit the small last batch.
                            // The next pump() call will actually fail.
                            this.outputQueue.push(this.carryover);
                            this.carryover = '';
                            return [2 /*return*/, true];
                        }
                        lines = chunkResult.value.split(this.separator);
                        // Note the behavior: " ab ".split(' ') === ['', 'ab', '']
                        // Thus the carryover may be '' if the separator falls on a chunk
                        // boundary; this produces the correct result.
                        lines[0] = this.carryover + lines[0];
                        for (_i = 0, _a = lines.slice(0, -1); _i < _a.length; _i++) {
                            line = _a[_i];
                            this.outputQueue.push(line);
                        }
                        this.carryover = lines[lines.length - 1];
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return SplitIteratorImpl;
}(lazy_iterator_1.OneToManyIterator));
//# sourceMappingURL=string_iterator.js.map