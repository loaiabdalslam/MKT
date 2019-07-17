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
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/** An implementation of the Where kernel shared between cpu and webgl */
var array_ops_1 = require("../ops/array_ops");
function whereImpl(condShape, condVals) {
    var indices = [];
    for (var i = 0; i < condVals.length; i++) {
        if (condVals[i]) {
            indices.push(i);
        }
    }
    var inBuffer = array_ops_1.buffer(condShape, 'int32');
    var out = array_ops_1.buffer([indices.length, condShape.length], 'int32');
    for (var i = 0; i < indices.length; i++) {
        var loc = inBuffer.indexToLoc(indices[i]);
        var offset = i * condShape.length;
        out.values.set(loc, offset);
    }
    return out.toTensor();
}
exports.whereImpl = whereImpl;
//# sourceMappingURL=where_impl.js.map