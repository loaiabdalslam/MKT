"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
// Expects flags from URL in the format ?tfjsflags=FLAG1:1,FLAG2:true.
var TENSORFLOWJS_FLAGS_PREFIX = 'tfjsflags';
var Environment = /** @class */ (function () {
    // tslint:disable-next-line: no-any
    function Environment(global) {
        this.global = global;
        this.flags = {};
        this.flagRegistry = {};
        this.urlFlags = {};
        this.populateURLFlags();
    }
    Environment.prototype.setPlatform = function (platformName, platform) {
        if (this.platform != null) {
            console.warn("Platform " + this.platformName + " has already been set. " +
                ("Overwriting the platform with " + platform + "."));
        }
        this.platformName = platformName;
        this.platform = platform;
    };
    Environment.prototype.registerFlag = function (flagName, evaluationFn, setHook) {
        this.flagRegistry[flagName] = { evaluationFn: evaluationFn, setHook: setHook };
        // Override the flag value from the URL. This has to happen here because the
        // environment is initialized before flags get registered.
        if (this.urlFlags[flagName] != null) {
            var flagValue = this.urlFlags[flagName];
            console.warn("Setting feature override from URL " + flagName + ": " + flagValue + ".");
            this.set(flagName, flagValue);
        }
    };
    Environment.prototype.get = function (flagName) {
        if (flagName in this.flags) {
            return this.flags[flagName];
        }
        this.flags[flagName] = this.evaluateFlag(flagName);
        return this.flags[flagName];
    };
    Environment.prototype.getNumber = function (flagName) {
        return this.get(flagName);
    };
    Environment.prototype.getBool = function (flagName) {
        return this.get(flagName);
    };
    Environment.prototype.getFlags = function () {
        return this.flags;
    };
    Object.defineProperty(Environment.prototype, "features", {
        // For backwards compatibility.
        get: function () {
            return this.flags;
        },
        enumerable: true,
        configurable: true
    });
    Environment.prototype.set = function (flagName, value) {
        if (this.flagRegistry[flagName] == null) {
            throw new Error("Cannot set flag " + flagName + " as it has not been registered.");
        }
        this.flags[flagName] = value;
        if (this.flagRegistry[flagName].setHook != null) {
            this.flagRegistry[flagName].setHook(value);
        }
    };
    Environment.prototype.evaluateFlag = function (flagName) {
        if (this.flagRegistry[flagName] == null) {
            throw new Error("Cannot evaluate flag '" + flagName + "': no evaluation function found.");
        }
        return this.flagRegistry[flagName].evaluationFn();
    };
    Environment.prototype.setFlags = function (flags) {
        this.flags = Object.assign({}, flags);
    };
    Environment.prototype.reset = function () {
        this.flags = {};
        this.urlFlags = {};
        this.populateURLFlags();
    };
    Environment.prototype.populateURLFlags = function () {
        var _this = this;
        if (typeof this.global === 'undefined' ||
            typeof this.global.location === 'undefined' ||
            typeof this.global.location.search === 'undefined') {
            return;
        }
        var urlParams = getQueryParams(this.global.location.search);
        if (TENSORFLOWJS_FLAGS_PREFIX in urlParams) {
            var keyValues = urlParams[TENSORFLOWJS_FLAGS_PREFIX].split(',');
            keyValues.forEach(function (keyValue) {
                var _a = keyValue.split(':'), key = _a[0], value = _a[1];
                _this.urlFlags[key] = parseValue(key, value);
            });
        }
    };
    return Environment;
}());
exports.Environment = Environment;
function getQueryParams(queryString) {
    var params = {};
    queryString.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g, function (s) {
        var t = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            t[_i - 1] = arguments[_i];
        }
        decodeParam(params, t[0], t[1]);
        return t.join('=');
    });
    return params;
}
exports.getQueryParams = getQueryParams;
function decodeParam(params, name, value) {
    params[decodeURIComponent(name)] = decodeURIComponent(value || '');
}
function parseValue(flagName, value) {
    value = value.toLowerCase();
    if (value === 'true' || value === 'false') {
        return value === 'true';
    }
    else if ("" + +value === value) {
        return +value;
    }
    throw new Error("Could not parse value flag value " + value + " for flag " + flagName + ".");
}
exports.ENV = null;
function setEnvironmentGlobal(environment) {
    exports.ENV = environment;
}
exports.setEnvironmentGlobal = setEnvironmentGlobal;
//# sourceMappingURL=environment.js.map