"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
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
var backend_1 = require("./backends/backend");
var engine_1 = require("./engine");
var environment_1 = require("./environment");
Error.stackTraceLimit = Infinity;
exports.NODE_ENVS = {
    predicate: function () { return environment_1.ENV.platformName === 'node'; }
};
exports.CHROME_ENVS = {
    flags: { 'IS_CHROME': true }
};
exports.BROWSER_ENVS = {
    predicate: function () { return environment_1.ENV.platformName === 'browser'; }
};
exports.SYNC_BACKEND_ENVS = {
    predicate: function (testEnv) { return testEnv.isDataSync === true; }
};
exports.ALL_ENVS = {};
// Tests whether the current environment satisfies the set of constraints.
function envSatisfiesConstraints(env, testEnv, constraints) {
    if (constraints == null) {
        return true;
    }
    if (constraints.flags != null) {
        for (var flagName in constraints.flags) {
            var flagValue = constraints.flags[flagName];
            if (env.get(flagName) !== flagValue) {
                return false;
            }
        }
    }
    if (constraints.predicate != null && !constraints.predicate(testEnv)) {
        return false;
    }
    return true;
}
exports.envSatisfiesConstraints = envSatisfiesConstraints;
function parseTestEnvFromKarmaFlags(args, registeredTestEnvs) {
    var flags;
    var testEnvName;
    args.forEach(function (arg, i) {
        if (arg === '--flags') {
            flags = JSON.parse(args[i + 1]);
        }
        else if (arg === '--testEnv') {
            testEnvName = args[i + 1];
        }
    });
    var testEnvNames = registeredTestEnvs.map(function (env) { return env.name; }).join(', ');
    if (flags != null && testEnvName == null) {
        throw new Error('--testEnv flag is required when --flags is present. ' +
            ("Available values are [" + testEnvNames + "]."));
    }
    if (testEnvName == null) {
        return null;
    }
    var testEnv;
    registeredTestEnvs.forEach(function (env) {
        if (env.name === testEnvName) {
            testEnv = env;
        }
    });
    if (testEnv == null) {
        throw new Error("Test environment with name " + testEnvName + " not " +
            "found. Available test environment names are " +
            ("" + testEnvNames));
    }
    if (flags != null) {
        testEnv.flags = flags;
    }
    return testEnv;
}
exports.parseTestEnvFromKarmaFlags = parseTestEnvFromKarmaFlags;
function describeWithFlags(name, constraints, tests) {
    if (exports.TEST_ENVS.length === 0) {
        throw new Error("Found no test environments. This is likely due to test environment " +
            "registries never being imported or test environment registries " +
            "being registered too late.");
    }
    exports.TEST_ENVS.forEach(function (testEnv) {
        environment_1.ENV.setFlags(testEnv.flags);
        if (envSatisfiesConstraints(environment_1.ENV, testEnv, constraints)) {
            var testName = name + ' ' + testEnv.name + ' ' + JSON.stringify(testEnv.flags);
            executeTests(testName, tests, testEnv);
        }
    });
}
exports.describeWithFlags = describeWithFlags;
exports.TEST_ENVS = [];
// Whether a call to setTestEnvs has been called so we turn off
// registration. This allows command line overriding or programmatic
// overriding of the default registrations.
var testEnvSet = false;
function setTestEnvs(testEnvs) {
    testEnvSet = true;
    exports.TEST_ENVS = testEnvs;
}
exports.setTestEnvs = setTestEnvs;
function registerTestEnv(testEnv) {
    // When using an explicit call to setTestEnvs, turn off registration of
    // test environments because the explicit call will set the test
    // environments.
    if (testEnvSet) {
        return;
    }
    exports.TEST_ENVS.push(testEnv);
}
exports.registerTestEnv = registerTestEnv;
function executeTests(testName, tests, testEnv) {
    var _this = this;
    describe(testName, function () {
        beforeAll(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        engine_1.ENGINE.reset();
                        if (testEnv.flags != null) {
                            environment_1.ENV.setFlags(testEnv.flags);
                        }
                        environment_1.ENV.set('IS_TEST', true);
                        // Await setting the new backend since it can have async init.
                        return [4 /*yield*/, engine_1.ENGINE.setBackend(testEnv.backendName)];
                    case 1:
                        // Await setting the new backend since it can have async init.
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        beforeEach(function () {
            engine_1.ENGINE.startScope();
        });
        afterEach(function () {
            engine_1.ENGINE.endScope();
            engine_1.ENGINE.disposeVariables();
        });
        afterAll(function () {
            engine_1.ENGINE.reset();
        });
        tests(testEnv);
    });
}
var TestKernelBackend = /** @class */ (function (_super) {
    __extends(TestKernelBackend, _super);
    function TestKernelBackend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestKernelBackend.prototype.dispose = function () { };
    return TestKernelBackend;
}(backend_1.KernelBackend));
exports.TestKernelBackend = TestKernelBackend;
//# sourceMappingURL=jasmine_util.js.map