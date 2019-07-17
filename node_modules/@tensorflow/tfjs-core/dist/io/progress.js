"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
/**
 * Monitor Promise.all progress, fire onProgress callback function.
 *
 * @param promises Promise list going to be monitored
 * @param onProgress Callback function. Fired when a promise resolved.
 * @param startFraction Optional fraction start. Default to 0.
 * @param endFraction Optional fraction end. Default to 1.
 */
function monitorPromisesProgress(promises, onProgress, startFraction, endFraction) {
    checkPromises(promises);
    startFraction = startFraction == null ? 0 : startFraction;
    endFraction = endFraction == null ? 1 : endFraction;
    checkFraction(startFraction, endFraction);
    var resolvedPromise = 0;
    var registerMonitor = function (promise) {
        promise.then(function (value) {
            var fraction = startFraction +
                ++resolvedPromise / promises.length * (endFraction - startFraction);
            // pass fraction as parameter to callback function.
            onProgress(fraction);
            return value;
        });
        return promise;
    };
    function checkPromises(promises) {
        util_1.assert(promises != null && Array.isArray(promises) && promises.length > 0, function () { return 'promises must be a none empty array'; });
    }
    function checkFraction(startFraction, endFraction) {
        util_1.assert(startFraction >= 0 && startFraction <= 1, function () { return "Progress fraction must be in range [0, 1], but " +
            ("got startFraction " + startFraction); });
        util_1.assert(endFraction >= 0 && endFraction <= 1, function () { return "Progress fraction must be in range [0, 1], but " +
            ("got endFraction " + endFraction); });
        util_1.assert(endFraction >= startFraction, function () { return "startFraction must be no more than endFraction, but " +
            ("got startFraction " + startFraction + " and endFraction ") +
            ("" + endFraction); });
    }
    return Promise.all(promises.map(registerMonitor));
}
exports.monitorPromisesProgress = monitorPromisesProgress;
//# sourceMappingURL=progress.js.map