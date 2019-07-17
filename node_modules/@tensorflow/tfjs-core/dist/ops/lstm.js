"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("../tensor_util_env");
var operation_1 = require("./operation");
/**
 * Computes the next states and outputs of a stack of LSTMCells.
 *
 * Each cell output is used as input to the next cell.
 *
 * Returns `[cellState, cellOutput]`.
 *
 * Derived from tf.contrib.rn.MultiRNNCell.
 *
 * @param lstmCells Array of LSTMCell functions.
 * @param data The input to the cell.
 * @param c Array of previous cell states.
 * @param h Array of previous cell outputs.
 */
/** @doc {heading: 'Operations', subheading: 'RNN'} */
function multiRNNCell_(lstmCells, data, c, h) {
    var $data = tensor_util_env_1.convertToTensor(data, 'data', 'multiRNNCell');
    var $c = tensor_util_env_1.convertToTensorArray(c, 'c', 'multiRNNCell');
    var $h = tensor_util_env_1.convertToTensorArray(h, 'h', 'multiRNNCell');
    var input = $data;
    var newStates = [];
    for (var i = 0; i < lstmCells.length; i++) {
        var output = lstmCells[i](input, $c[i], $h[i]);
        newStates.push(output[0]);
        newStates.push(output[1]);
        input = output[1];
    }
    var newC = [];
    var newH = [];
    for (var i = 0; i < newStates.length; i += 2) {
        newC.push(newStates[i]);
        newH.push(newStates[i + 1]);
    }
    return [newC, newH];
}
/**
 * Computes the next state and output of a BasicLSTMCell.
 *
 * Returns `[newC, newH]`.
 *
 * Derived from tf.contrib.rnn.BasicLSTMCell.
 *
 * @param forgetBias Forget bias for the cell.
 * @param lstmKernel The weights for the cell.
 * @param lstmBias The bias for the cell.
 * @param data The input to the cell.
 * @param c Previous cell state.
 * @param h Previous cell output.
 */
/** @doc {heading: 'Operations', subheading: 'RNN'} */
function basicLSTMCell_(forgetBias, lstmKernel, lstmBias, data, c, h) {
    var $forgetBias = tensor_util_env_1.convertToTensor(forgetBias, 'forgetBias', 'basicLSTMCell');
    var $lstmKernel = tensor_util_env_1.convertToTensor(lstmKernel, 'lstmKernel', 'basicLSTMCell');
    var $lstmBias = tensor_util_env_1.convertToTensor(lstmBias, 'lstmBias', 'basicLSTMCell');
    var $data = tensor_util_env_1.convertToTensor(data, 'data', 'basicLSTMCell');
    var $c = tensor_util_env_1.convertToTensor(c, 'c', 'basicLSTMCell');
    var $h = tensor_util_env_1.convertToTensor(h, 'h', 'basicLSTMCell');
    var combined = $data.concat($h, 1);
    var weighted = combined.matMul($lstmKernel);
    var res = weighted.add($lstmBias);
    // i = input_gate, j = new_input, f = forget_gate, o = output_gate
    var batchSize = res.shape[0];
    var sliceCols = res.shape[1] / 4;
    var sliceSize = [batchSize, sliceCols];
    var i = res.slice([0, 0], sliceSize);
    var j = res.slice([0, sliceCols], sliceSize);
    var f = res.slice([0, sliceCols * 2], sliceSize);
    var o = res.slice([0, sliceCols * 3], sliceSize);
    var newC = i.sigmoid().mulStrict(j.tanh()).addStrict($c.mulStrict($forgetBias.add(f).sigmoid()));
    var newH = newC.tanh().mulStrict(o.sigmoid());
    return [newC, newH];
}
exports.basicLSTMCell = operation_1.op({ basicLSTMCell_: basicLSTMCell_ });
exports.multiRNNCell = operation_1.op({ multiRNNCell_: multiRNNCell_ });
//# sourceMappingURL=lstm.js.map