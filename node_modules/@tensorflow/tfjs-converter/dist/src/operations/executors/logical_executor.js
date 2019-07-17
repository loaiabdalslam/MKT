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
var tfc = require("@tensorflow/tfjs-core");
var utils_1 = require("./utils");
exports.executeOp = function (node, tensorMap, context) {
    switch (node.op) {
        case 'Equal': {
            return [tfc.equal(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'NotEqual': {
            return [tfc.notEqual(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'Greater': {
            return [tfc.greater(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'GreaterEqual': {
            return [tfc.greaterEqual(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'Less': {
            return [tfc.less(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'LessEqual': {
            return [tfc.lessEqual(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalAnd': {
            return [tfc.logicalAnd(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'LogicalNot': {
            return [tfc.logicalNot(utils_1.getParamValue('a', node, tensorMap, context))];
        }
        case 'LogicalOr': {
            return [tfc.logicalOr(utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        case 'Select': {
            return [tfc.where(utils_1.getParamValue('condition', node, tensorMap, context), utils_1.getParamValue('a', node, tensorMap, context), utils_1.getParamValue('b', node, tensorMap, context))];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'logical';
//# sourceMappingURL=logical_executor.js.map