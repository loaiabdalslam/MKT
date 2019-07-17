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
var util = require("./util");
var Profiler = /** @class */ (function () {
    function Profiler(backendTimer, logger) {
        this.backendTimer = backendTimer;
        this.logger = logger;
        if (logger == null) {
            this.logger = new Logger();
        }
    }
    Profiler.prototype.profileKernel = function (name, f) {
        var _this = this;
        var result;
        var holdResultWrapperFn = function () {
            result = f();
        };
        var timer = this.backendTimer.time(holdResultWrapperFn);
        var results = Array.isArray(result) ? result : [result];
        results.forEach(function (r) {
            var vals = r.dataSync();
            util.checkComputationForErrors(vals, r.dtype, name);
            timer.then(function (timing) {
                var extraInfo = '';
                if (timing.getExtraProfileInfo != null) {
                    extraInfo = timing.getExtraProfileInfo();
                }
                _this.logger.logKernelProfile(name, r, vals, timing.kernelMs, extraInfo);
            });
        });
        return result;
    };
    return Profiler;
}());
exports.Profiler = Profiler;
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.prototype.logKernelProfile = function (name, result, vals, timeMs, extraInfo) {
        var time = util.rightPad(timeMs + "ms", 9);
        var paddedName = util.rightPad(name, 25);
        var rank = result.rank;
        var size = result.size;
        var shape = util.rightPad(result.shape.toString(), 14);
        console.log("%c" + paddedName + "\t%c" + time + "\t%c" + rank + "D " + shape + "\t%c" + size + "\t%c" + extraInfo, 'font-weight:bold', 'color:red', 'color:blue', 'color: orange', 'color: green');
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=profiler.js.map