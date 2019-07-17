"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var operation_1 = require("../ops/operation");
var concat_split_1 = require("./concat_split");
var slice_1 = require("./slice");
var tensor_ops_1 = require("./tensor_ops");
/**
 * Generate a Hann window.
 *
 * See: https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 *
 * ```js
 * tf.signal.hannWindow(10).print();
 * ```
 * @param The length of window
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function hannWindow_(windowLength) {
    return cosineWindow(windowLength, 0.5, 0.5);
}
/**
 * Generate a hamming window.
 *
 * See: https://en.wikipedia.org/wiki/Window_function#Hann_and_Hamming_windows
 *
 * ```js
 * tf.signal.hammingWindow(10).print();
 * ```
 * @param The length of window
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function hammingWindow_(windowLength) {
    return cosineWindow(windowLength, 0.54, 0.46);
}
/**
 * Expands input into frames of frameLength.
 * Slides a window size with frameStep.
 *
 * ```js
 * tf.signal.frame([1, 2, 3], 2, 1).print();
 * ```
 * @param signal The input tensor to be expanded
 * @param frameLength Length of each frame
 * @param frameStep The frame hop size in samples.
 */
/**
 * @doc {heading: 'Operations', subheading: 'Signal', namespace: 'signal'}
 */
function frame_(signal, frameLength, frameStep, padEnd, padValue) {
    if (padEnd === void 0) { padEnd = false; }
    if (padValue === void 0) { padValue = 0; }
    var start = 0;
    var output = [];
    while (start + frameLength <= signal.size) {
        output.push(slice_1.slice(signal, start, frameLength));
        start += frameStep;
    }
    if (padEnd) {
        var padLen = (start + frameLength) - signal.size;
        var pad = concat_split_1.concat([slice_1.slice(signal, start, frameLength - padLen), tensor_ops_1.fill([padLen], padValue)]);
        output.push(pad);
    }
    if (output.length === 0) {
        return tensor_ops_1.tensor2d([], [0, frameLength]);
    }
    return concat_split_1.concat(output).as2D(output.length, frameLength);
}
function cosineWindow(windowLength, a, b) {
    var even = 1 - windowLength % 2;
    var newValues = new Float32Array(windowLength);
    for (var i = 0; i < windowLength; ++i) {
        var cosArg = (2.0 * Math.PI * i) / (windowLength + even - 1);
        newValues[i] = a - b * Math.cos(cosArg);
    }
    return tensor_ops_1.tensor1d(newValues, 'float32');
}
exports.hannWindow = operation_1.op({ hannWindow_: hannWindow_ });
exports.hammingWindow = operation_1.op({ hammingWindow_: hammingWindow_ });
exports.frame = operation_1.op({ frame_: frame_ });
//# sourceMappingURL=signal_ops.js.map