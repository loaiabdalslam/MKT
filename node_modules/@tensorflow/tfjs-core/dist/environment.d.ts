/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
import { Platform } from './platforms/platform';
declare type FlagValue = number | boolean;
export declare type Flags = {
    [featureName: string]: FlagValue;
};
export declare type FlagRegistryEntry = {
    evaluationFn: () => FlagValue;
    setHook?: (value: FlagValue) => void;
};
export declare class Environment {
    global: any;
    private flags;
    private flagRegistry;
    private urlFlags;
    platformName: string;
    platform: Platform;
    constructor(global: any);
    setPlatform(platformName: string, platform: Platform): void;
    registerFlag(flagName: string, evaluationFn: () => FlagValue, setHook?: (value: FlagValue) => void): void;
    get(flagName: string): FlagValue;
    getNumber(flagName: string): number;
    getBool(flagName: string): boolean;
    getFlags(): Flags;
    readonly features: Flags;
    set(flagName: string, value: FlagValue): void;
    private evaluateFlag;
    setFlags(flags: Flags): void;
    reset(): void;
    private populateURLFlags;
}
export declare function getQueryParams(queryString: string): {
    [key: string]: string;
};
export declare let ENV: Environment;
export declare function setEnvironmentGlobal(environment: Environment): void;
export {};
