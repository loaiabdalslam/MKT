"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var engine_1 = require("../engine");
/**
 * Used for wrapping functions that perform math operations on
 * Tensors. The function will be wrapped in a named scope that cleans all
 * memory usage after the function is done.
 */
function op(f) {
    var keys = Object.keys(f);
    if (keys.length !== 1) {
        throw new Error("Please provide an object with a single key " +
            "(operation name) mapping to a function. Got an object with " +
            (keys.length + " keys."));
    }
    var opName = keys[0];
    var fn = f[opName];
    // Strip the underscore from the end of the function name.
    if (opName.endsWith('_')) {
        opName = opName.substring(0, opName.length - 1);
    }
    // tslint:disable-next-line:no-any
    var f2 = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        engine_1.ENGINE.startScope(opName);
        try {
            var result = fn.apply(void 0, args);
            if (result instanceof Promise) {
                console.error('Cannot return a Promise inside of tidy.');
            }
            engine_1.ENGINE.endScope(result);
            return result;
        }
        catch (ex) {
            engine_1.ENGINE.endScope(null);
            throw ex;
        }
    };
    Object.defineProperty(f2, 'name', { value: opName, configurable: true });
    // tslint:disable-next-line:no-any
    return f2;
}
exports.op = op;
//# sourceMappingURL=operation.js.map