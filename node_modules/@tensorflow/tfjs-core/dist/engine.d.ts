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
import { BackendTimingInfo, DataMover, KernelBackend } from './backends/backend';
import { Environment } from './environment';
import { TapeNode } from './tape';
import { DataId, Tensor, Tensor3D, TensorTracker, Variable } from './tensor';
import { GradSaveFunc, NamedTensorMap, NamedVariableMap, TensorContainer } from './tensor_types';
import { BackendValues, PixelData } from './types';
/**
 * A function that computes an output. The save function is for saving tensors
 * computed in the forward pass, that we need in the backward pass.
 */
export declare type ForwardFunc<T> = (backend: KernelBackend, save?: GradSaveFunc) => T;
/**
 * @docalias (a: Tensor, b: Tensor,..., save?: Function) => {
 *   value: Tensor,
 *   gradFunc: (dy: Tensor, saved?: NamedTensorMap) => Tensor | Tensor[]
 * }
 */
export declare type CustomGradientFunc<T extends Tensor> = (...inputs: Array<Tensor | GradSaveFunc>) => {
    value: T;
    gradFunc: (dy: T, saved: Tensor[]) => Tensor | Tensor[];
};
export declare type MemoryInfo = {
    numTensors: number;
    numDataBuffers: number;
    numBytes: number;
    unreliable?: boolean;
    reasons: string[];
};
declare type KernelProfile = {
    name: string;
    bytesAdded: number;
    totalBytesSnapshot: number;
    tensorsAdded: number;
    totalTensorsSnapshot: number;
    inputShapes: number[][];
    outputShape: number[] | number[][];
};
export declare type ProfileInfo = {
    newBytes: number;
    newTensors: number;
    peakBytes: number;
    kernels: KernelProfile[];
    result: TensorContainer;
};
export interface TimingInfo extends BackendTimingInfo {
    wallMs: number;
}
/** @docalias Function */
export declare type ScopeFn<T extends TensorContainer> = () => T;
export interface TensorManager {
    registerTensor(a: Tensor, backend?: KernelBackend): void;
    registerVariable(v: Variable): void;
    disposeTensor(a: Tensor): void;
    memory(): {
        numDataBuffers: number;
        numBytes: number;
    };
}
interface ScopeState {
    track: Tensor[];
    name: string;
    id: number;
}
declare class EngineState {
    registeredVariables: NamedVariableMap;
    nextTapeNodeId: number;
    numBytes: number;
    numTensors: number;
    numStringTensors: number;
    numDataBuffers: number;
    activeTape: TapeNode[];
    gradientDepth: number;
    kernelDepth: number;
    activeScope: ScopeState;
    scopeStack: ScopeState[];
    nextScopeId: number;
    tensorInfo: WeakMap<object, {
        backend: KernelBackend;
        bytes: number;
        dtype: "string" | "float32" | "int32" | "bool" | "complex64";
        shape: number[];
        refCount: number;
    }>;
    profiling: boolean;
    activeProfile: ProfileInfo;
    dispose(): void;
}
export declare class Engine implements TensorManager, TensorTracker, DataMover {
    ENV: Environment;
    state: EngineState;
    backendName: string;
    registry: {
        [id: string]: KernelBackend;
    };
    registryFactory: {
        [id: string]: {
            factory: () => KernelBackend | Promise<KernelBackend>;
            priority: number;
        };
    };
    private profiler;
    private backendInstance;
    private pendingBackendInit;
    private pendingBackendInitId;
    constructor(ENV: Environment);
    ready(): Promise<void>;
    readonly backend: KernelBackend;
    backendNames(): string[];
    findBackend(backendName: string): KernelBackend;
    findBackendFactory(backendName: string): () => KernelBackend | Promise<KernelBackend>;
    registerBackend(backendName: string, factory: () => KernelBackend | Promise<KernelBackend>, priority?: number): boolean;
    setBackend(backendName: string): Promise<boolean>;
    /**
     * Initializes a backend by looking up the backend name in the factory
     * registry and calling the factory method. Returns a boolean representing
     * whether the initialization of the backend suceeded. Throws an error if
     * there is no backend in the factory registry.
     */
    private initializeBackend;
    removeBackend(backendName: string): void;
    private getSortedBackends;
    private initializeBackendsAndReturnBest;
    moveData(destBackend: KernelBackend, dataId: DataId): void;
    tidy<T extends TensorContainer>(nameOrFn: string | ScopeFn<T>, fn?: ScopeFn<T>): T;
    private scopedRun;
    private static nextTensorId;
    nextTensorId(): number;
    private static nextVariableId;
    nextVariableId(): number;
    /**
     * This method is called instead of the public-facing tensor.clone() when
     * saving a tensor for backwards pass. It makes sure to add the clone
     * operation to the tape regardless of being called inside a kernel
     * execution.
     */
    private clone;
    runKernel<T extends Tensor | Tensor[], I extends NamedTensorMap>(forwardFunc: ForwardFunc<T>, inputs: I, backwardsFunc?: (dy: T, saved: Tensor[]) => {
        [P in keyof I]: () => I[P];
    }): T;
    registerTensor(a: Tensor | Variable, backend?: KernelBackend): void;
    registerVariable(v: Variable): void;
    disposeTensor(a: Tensor): void;
    disposeVariables(): void;
    disposeVariable(v: Variable): void;
    memory(): MemoryInfo;
    profile(query: () => TensorContainer): Promise<ProfileInfo>;
    isTapeOn(): boolean;
    private addTapeNode;
    keep<T extends Tensor>(result: T): T;
    private startTape;
    private endTape;
    /**
     * Start a scope. Use this with endScope() to achieve the same functionality
     * as scope() without the need for a function closure.
     */
    startScope(name?: string): void;
    /**
     * End a scope. Use this with startScope() to achieve the same functionality
     * as scope() without the need for a function closure.
     */
    endScope(result?: TensorContainer): void;
    /**
     * Returns gradients of `f` with respect to each of the `xs`. The gradients
     * returned are of the same length as `xs`, but some might be null if `f`
     * was not a function of that `x`. It also takes optional dy to multiply the
     * gradient, which defaults to `1`.
     */
    gradients<T extends Tensor>(f: () => T, xs: Tensor[], dy?: T, allowNoGradients?: boolean): {
        value: T;
        grads: Tensor[];
    };
    customGrad<T extends Tensor>(f: CustomGradientFunc<T>): (...args: Array<Tensor | GradSaveFunc>) => T;
    write(destBackend: KernelBackend, dataId: DataId, values: BackendValues): void;
    readSync(dataId: DataId): BackendValues;
    read(dataId: DataId): Promise<BackendValues>;
    fromPixels(pixels: PixelData | ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, numChannels: number): Tensor3D;
    time(query: () => void): Promise<TimingInfo>;
    /**
     * Tracks a Tensor in the current scope to be automatically cleaned up
     * when the current scope ends, and returns the value.
     *
     * @param result The Tensor to track in the current scope.
     */
    private track;
    readonly registeredVariables: NamedVariableMap;
    /**
     * Resets the engine state. Removes all backends but does not remove
     * registered backend factories.
     */
    reset(): void;
}
export declare let ENGINE: Engine;
export {};
