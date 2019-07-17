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
import { NamedTensorMap, Tensor } from '@tensorflow/tfjs-core';
import { NamedTensorsMap, TensorInfo } from '../data/types';
import { Graph } from '../operations/types';
export declare class GraphExecutor {
    private graph;
    private compiledMap;
    private _weightMap;
    private weightIds;
    private placeholders;
    private _outputs;
    private SEPERATOR;
    weightMap: NamedTensorsMap;
    readonly inputs: TensorInfo[];
    readonly outputs: TensorInfo[];
    readonly inputNodes: string[];
    readonly outputNodes: string[];
    constructor(graph: Graph);
    private getCompilationKey;
    /**
     * Compiles the inference graph and returns the minimal set of nodes that are
     * required for execution, in the correct execution order.
     */
    private compile;
    /**
     * Executes the inference for given input tensors.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     */
    execute(inputs: NamedTensorMap, outputs: string[]): Tensor[];
    private getFrozenTensorIds;
    private checkTensorForDisposal;
    /**
     * Executes the inference for given input tensors in Async fashion.
     * @param inputs Tensor map for the model inputs, keyed by the input node
     * names.
     * @param outputs output node name from the Tensorflow model, if no outputs
     * are specified, the default outputs of the model would be used. You can
     * inspect intermediate nodes of the model by adding them to the outputs
     * array.
     */
    executeAsync(inputs: NamedTensorMap, outputs: string[]): Promise<Tensor[]>;
    /**
     * When there are control flow nodes in the graph, the graph execution use
     * ExecutionContext to keep track of the frames and loop iterators.
     * @param inputs placeholder tensors for the graph.
     * @param context the execution context object for current execution.
     */
    private executeWithControlFlow;
    private processStack;
    private processChildNodes;
    /**
     * Releases the memory used by the weight tensors.
     */
    dispose(): void;
    private checkInputShapeAndType;
    private checkInputs;
    private checkOutputs;
}
