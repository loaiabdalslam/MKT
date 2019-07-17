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
        case 'FFT': {
            return [tfc.fft(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        case 'IFFT': {
            return [tfc.ifft(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        case 'RFFT': {
            return [tfc.rfft(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        case 'IRFFT': {
            return [tfc.irfft(utils_1.getParamValue('x', node, tensorMap, context))];
        }
        default:
            throw TypeError("Node type " + node.op + " is not implemented");
    }
};
exports.CATEGORY = 'spectral';
//# sourceMappingURL=spectral_executor.js.map