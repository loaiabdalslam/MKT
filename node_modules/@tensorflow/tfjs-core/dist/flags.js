"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var device_util = require("./device_util");
var environment_1 = require("./environment");
/**
 * This file contains environment-related flag registrations.
 */
/** Whether to enable debug mode. */
environment_1.ENV.registerFlag('DEBUG', function () { return false; }, function (debugValue) {
    if (debugValue) {
        console.warn('Debugging mode is ON. The output of every math call will ' +
            'be downloaded to CPU and checked for NaNs. ' +
            'This significantly impacts performance.');
    }
});
/** Whether we are in a browser (as versus, say, node.js) environment. */
environment_1.ENV.registerFlag('IS_BROWSER', function () { return device_util.isBrowser(); });
/** Whether we are in a browser (as versus, say, node.js) environment. */
environment_1.ENV.registerFlag('IS_NODE', function () { return (typeof process !== 'undefined') &&
    (typeof process.versions !== 'undefined') &&
    (typeof process.versions.node !== 'undefined'); });
/** Whether this browser is Chrome. */
environment_1.ENV.registerFlag('IS_CHROME', function () { return typeof navigator !== 'undefined' && navigator != null &&
    navigator.userAgent != null && /Chrome/.test(navigator.userAgent) &&
    /Google Inc/.test(navigator.vendor); });
/**
 * True when the environment is "production" where we disable safety checks
 * to gain performance.
 */
environment_1.ENV.registerFlag('PROD', function () { return false; });
/**
 * Whether to do sanity checks when inferring a shape from user-provided
 * values, used when creating a new tensor.
 */
environment_1.ENV.registerFlag('TENSORLIKE_CHECK_SHAPE_CONSISTENCY', function () { return environment_1.ENV.getBool('DEBUG'); });
/** Whether deprecation warnings are enabled. */
environment_1.ENV.registerFlag('DEPRECATION_WARNINGS_ENABLED', function () { return true; });
/** True if running unit tests. */
environment_1.ENV.registerFlag('IS_TEST', function () { return false; });
//# sourceMappingURL=flags.js.map