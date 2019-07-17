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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var engine_1 = require("./engine");
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
describe('Backend registration', function () {
    beforeAll(function () {
        // Silences backend registration warnings.
        spyOn(console, 'warn');
    });
    var registeredBackends = [];
    beforeEach(function () {
        // Registering a backend changes global state (engine), so we wrap
        // registration to automatically remove registered backend at the end
        // of each test.
        spyOn(tf, 'registerBackend')
            .and.callFake(function (name, factory, priority) {
            registeredBackends.push(name);
            return engine_1.ENGINE.registerBackend(name, factory, priority);
        });
        engine_1.ENGINE.reset();
    });
    afterEach(function () {
        // Remove all registered backends at the end of each test.
        registeredBackends.forEach(function (name) {
            if (tf.findBackendFactory(name) != null) {
                tf.removeBackend(name);
            }
        });
        registeredBackends = [];
    });
    it('removeBackend disposes the backend and removes the factory', function () {
        var backend;
        var factory = function () {
            var newBackend = new jasmine_util_1.TestKernelBackend();
            if (backend == null) {
                backend = newBackend;
                spyOn(backend, 'dispose').and.callThrough();
            }
            return newBackend;
        };
        tf.registerBackend('test-backend', factory);
        expect(tf.findBackend('test-backend') != null).toBe(true);
        expect(tf.findBackend('test-backend')).toBe(backend);
        expect(tf.findBackendFactory('test-backend')).toBe(factory);
        tf.removeBackend('test-backend');
        expect(tf.findBackend('test-backend') == null).toBe(true);
        expect(tf.findBackend('test-backend')).toBe(null);
        expect(backend.dispose.calls.count()).toBe(1);
        expect(tf.findBackendFactory('test-backend')).toBe(null);
    });
    it('findBackend initializes the backend', function () {
        var backend;
        var factory = function () {
            var newBackend = new jasmine_util_1.TestKernelBackend();
            if (backend == null) {
                backend = newBackend;
            }
            return newBackend;
        };
        tf.registerBackend('custom-cpu', factory);
        expect(tf.findBackend('custom-cpu') != null).toBe(true);
        expect(tf.findBackend('custom-cpu')).toBe(backend);
        expect(tf.findBackendFactory('custom-cpu')).toBe(factory);
    });
    it('custom backend registration', function () {
        var backend;
        var priority = 103;
        tf.registerBackend('custom-cpu', function () {
            var newBackend = new jasmine_util_1.TestKernelBackend();
            if (backend == null) {
                backend = newBackend;
            }
            return newBackend;
        }, priority);
        expect(tf.backend() != null).toBe(true);
        expect(tf.backend()).toBe(backend);
    });
    it('high priority backend registration fails, falls back', function () {
        var lowPriorityBackend;
        var lowPriority = 103;
        var highPriority = 104;
        tf.registerBackend('custom-low-priority', function () {
            lowPriorityBackend = new jasmine_util_1.TestKernelBackend();
            return lowPriorityBackend;
        }, lowPriority);
        tf.registerBackend('custom-high-priority', function () {
            throw new Error("High priority backend fails");
        }, highPriority);
        expect(tf.backend() != null).toBe(true);
        expect(tf.backend()).toBe(lowPriorityBackend);
        expect(tf.getBackend()).toBe('custom-low-priority');
    });
    it('low priority and high priority backends, setBackend low priority', function () {
        var lowPriorityBackend;
        var highPriorityBackend;
        var lowPriority = 103;
        var highPriority = 104;
        tf.registerBackend('custom-low-priority', function () {
            lowPriorityBackend = new jasmine_util_1.TestKernelBackend();
            return lowPriorityBackend;
        }, lowPriority);
        tf.registerBackend('custom-high-priority', function () {
            highPriorityBackend = new jasmine_util_1.TestKernelBackend();
            return highPriorityBackend;
        }, highPriority);
        expect(tf.backend() != null).toBe(true);
        expect(tf.backend()).toBe(highPriorityBackend);
        expect(tf.getBackend()).toBe('custom-high-priority');
        tf.setBackend('custom-low-priority');
        expect(tf.backend() != null).toBe(true);
        expect(tf.backend()).toBe(lowPriorityBackend);
        expect(tf.getBackend()).toBe('custom-low-priority');
    });
    it('default custom background null', function () {
        expect(tf.findBackend('custom')).toBeNull();
    });
    it('allow custom backend', function () {
        var backend = new jasmine_util_1.TestKernelBackend();
        var success = tf.registerBackend('custom', function () { return backend; });
        expect(success).toBeTruthy();
        expect(tf.findBackend('custom')).toEqual(backend);
    });
    it('sync backend with await ready works', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testBackend = new jasmine_util_1.TestKernelBackend();
                    tf.registerBackend('sync', function () { return testBackend; });
                    tf.setBackend('sync');
                    expect(tf.getBackend()).toEqual('sync');
                    return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    expect(tf.backend()).toEqual(testBackend);
                    return [2 /*return*/];
            }
        });
    }); });
    it('sync backend without await ready works', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        return __generator(this, function (_a) {
            testBackend = new jasmine_util_1.TestKernelBackend();
            tf.registerBackend('sync', function () { return testBackend; });
            tf.setBackend('sync');
            expect(tf.getBackend()).toEqual('sync');
            expect(tf.backend()).toEqual(testBackend);
            return [2 /*return*/];
        });
    }); });
    it('async backend with await ready works', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testBackend = new jasmine_util_1.TestKernelBackend();
                    tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, testBackend];
                            }
                        });
                    }); });
                    tf.setBackend('async');
                    expect(tf.getBackend()).toEqual('async');
                    return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    expect(tf.backend()).toEqual(testBackend);
                    return [2 /*return*/];
            }
        });
    }); });
    it('async backend without await ready does not work', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            testBackend = new jasmine_util_1.TestKernelBackend();
            tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tf.nextFrame()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, testBackend];
                    }
                });
            }); });
            tf.setBackend('async');
            expect(tf.getBackend()).toEqual('async');
            expect(function () { return tf.backend(); })
                .toThrowError(/Backend 'async' has not yet been initialized./);
            return [2 /*return*/];
        });
    }); });
    it('tf.square() fails if user does not await ready on async backend', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tf.nextFrame()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, new jasmine_util_1.TestKernelBackend()];
                    }
                });
            }); });
            tf.setBackend('async');
            expect(function () { return tf.square(2); })
                .toThrowError(/Backend 'async' has not yet been initialized/);
            return [2 /*return*/];
        });
    }); });
    it('tf.square() works when user awaits ready on async backend', function () { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, new jasmine_util_1.TestKernelBackend()];
                            }
                        });
                    }); });
                    tf.setBackend('async');
                    return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    expect(function () { return tf.square(2); }).toThrowError(/Not yet implemented/);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Registering async2 (higher priority) fails, async1 becomes active', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testBackend = new jasmine_util_1.TestKernelBackend();
                    tf.registerBackend('async1', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, testBackend];
                            }
                        });
                    }); }, 100 /* priority */);
                    tf.registerBackend('async2', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    throw new Error('failed to create async2');
                            }
                        });
                    }); }, 101 /* priority */);
                    // Await for the library to find the best backend that succesfully
                    // initializes.
                    return [4 /*yield*/, tf.ready()];
                case 1:
                    // Await for the library to find the best backend that succesfully
                    // initializes.
                    _a.sent();
                    expect(tf.backend()).toEqual(testBackend);
                    expect(tf.getBackend()).toBe('async1');
                    return [2 /*return*/];
            }
        });
    }); });
    it('Registering sync as higher priority and async as lower priority', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            testBackend = new jasmine_util_1.TestKernelBackend();
            tf.registerBackend('sync', function () { return testBackend; }, 101 /* priority */);
            tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tf.nextFrame()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, new jasmine_util_1.TestKernelBackend()];
                    }
                });
            }); }, 100 /* priority */);
            // No need to await for ready() since the highest priority one is sync.
            expect(tf.backend()).toEqual(testBackend);
            expect(tf.getBackend()).toBe('sync');
            return [2 /*return*/];
        });
    }); });
    it('async as higher priority and sync as lower priority with await ready', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testBackend = new jasmine_util_1.TestKernelBackend();
                    tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, testBackend];
                            }
                        });
                    }); }, 101 /* priority */);
                    tf.registerBackend('sync', function () { return new jasmine_util_1.TestKernelBackend(); }, 100 /* priority */);
                    return [4 /*yield*/, tf.ready()];
                case 1:
                    _a.sent();
                    expect(tf.backend()).toEqual(testBackend);
                    expect(tf.getBackend()).toBe('async');
                    return [2 /*return*/];
            }
        });
    }); });
    it('async as higher priority and sync as lower priority w/o await ready', function () { return __awaiter(_this, void 0, void 0, function () {
        var testBackend;
        var _this = this;
        return __generator(this, function (_a) {
            testBackend = new jasmine_util_1.TestKernelBackend();
            tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tf.nextFrame()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, testBackend];
                    }
                });
            }); }, 101 /* priority */);
            tf.registerBackend('sync', function () { return new jasmine_util_1.TestKernelBackend(); }, 100 /* priority */);
            expect(function () { return tf.backend(); })
                .toThrowError(/The highest priority backend 'async' has not yet been/);
            return [2 /*return*/];
        });
    }); });
    it('Registering and setting a backend that fails to register', function () { return __awaiter(_this, void 0, void 0, function () {
        var success, _a;
        var _this = this;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.registerBackend('async', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tf.nextFrame()];
                                case 1:
                                    _a.sent();
                                    throw new Error('failed to create async');
                            }
                        });
                    }); });
                    success = tf.setBackend('async');
                    expect(tf.getBackend()).toBe('async');
                    expect(function () { return tf.backend(); })
                        .toThrowError(/Backend 'async' has not yet been initialized/);
                    _a = expect;
                    return [4 /*yield*/, success];
                case 1:
                    _a.apply(void 0, [_b.sent()]).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('memory', jasmine_util_1.ALL_ENVS, function () {
    it('Sum(float)', function () { return __awaiter(_this, void 0, void 0, function () {
        var sum, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    expect(tf.memory().numTensors).toBe(0);
                    expect(tf.memory().numBytes).toBe(0);
                    sum = tf.tidy(function () {
                        var a = tf.tensor1d([1, 2, 3, 4]);
                        expect(tf.memory().numTensors).toBe(1);
                        expect(tf.memory().numBytes).toBe(4 * 4);
                        return a.sum();
                    });
                    expect(tf.memory().numTensors).toBe(1);
                    expect(tf.memory().numBytes).toBe(4);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, sum.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 + 2 + 3 + 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Sum(bool)', function () { return __awaiter(_this, void 0, void 0, function () {
        var sum, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sum = tf.tidy(function () {
                        var a = tf.tensor1d([true, true, false, true], 'bool');
                        expect(tf.memory().numTensors).toBe(1);
                        expect(tf.memory().numBytes).toBe(4);
                        return a.sum();
                    });
                    expect(tf.memory().numTensors).toBe(1);
                    expect(tf.memory().numBytes).toBe(4);
                    expect(sum.dtype).toBe('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, sum.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 + 1 + 0 + 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Sum(int32)', function () { return __awaiter(_this, void 0, void 0, function () {
        var sum, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    sum = tf.tidy(function () {
                        var a = tf.tensor1d([1, 1, 0, 1], 'int32');
                        expect(tf.memory().numTensors).toBe(1);
                        expect(tf.memory().numBytes).toBe(4 * 4);
                        return a.sum();
                    });
                    expect(tf.memory().numTensors).toBe(1);
                    expect(tf.memory().numBytes).toBe(4);
                    expect(sum.dtype).toBe('int32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, sum.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1 + 1 + 0 + 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('string tensor', function () {
        var a = tf.tensor([['a', 'bb'], ['c', 'd']]);
        expect(tf.memory().numTensors).toBe(1);
        expect(tf.memory().numBytes).toBe(5); // 5 letters, each 1 byte in utf8.
        a.dispose();
        expect(tf.memory().numTensors).toBe(0);
        expect(tf.memory().numBytes).toBe(0);
    });
    it('unreliable is true for string tensors', function () {
        tf.tensor('a');
        var mem = tf.memory();
        expect(mem.unreliable).toBe(true);
        var expectedReason = 'Memory usage by string tensors is approximate ' +
            '(2 bytes per character)';
        expect(mem.reasons.indexOf(expectedReason) >= 0).toBe(true);
    });
});
jasmine_util_1.describeWithFlags('profile', jasmine_util_1.ALL_ENVS, function () {
    it('squaring', function () { return __awaiter(_this, void 0, void 0, function () {
        var profile, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.profile(function () {
                        var x = tf.tensor1d([1, 2, 3]);
                        var x2 = x.square();
                        x2.dispose();
                        x2 = x.square();
                        x2.dispose();
                        return x;
                    })];
                case 1:
                    profile = _b.sent();
                    result = profile.result;
                    expect(profile.newBytes).toBe(12);
                    expect(profile.peakBytes).toBe(24);
                    expect(profile.newTensors).toBe(1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    expect(profile.kernels).toEqual([
                        {
                            'name': 'square',
                            'bytesAdded': 12,
                            'totalBytesSnapshot': 24,
                            'tensorsAdded': 1,
                            'totalTensorsSnapshot': 2,
                            'inputShapes': [[3]],
                            'outputShape': [3]
                        },
                        {
                            'name': 'square',
                            'bytesAdded': 12,
                            'totalBytesSnapshot': 24,
                            'tensorsAdded': 1,
                            'totalTensorsSnapshot': 2,
                            'inputShapes': [[3]],
                            'outputShape': [3]
                        }
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('squaring without disposing', function () { return __awaiter(_this, void 0, void 0, function () {
        var profile, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, tf.profile(function () {
                        var x = tf.tensor1d([1, 2, 3]);
                        var x2 = x.square();
                        return x2;
                    })];
                case 1:
                    profile = _b.sent();
                    result = profile.result;
                    expect(profile.newBytes).toBe(24);
                    expect(profile.peakBytes).toBe(24);
                    expect(profile.newTensors).toBe(2);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 2:
                    _a.apply(void 0, [_b.sent(), [1, 4, 9]]);
                    expect(profile.kernels).toEqual([{
                            'name': 'square',
                            'bytesAdded': 12,
                            'totalBytesSnapshot': 24,
                            'tensorsAdded': 1,
                            'totalTensorsSnapshot': 2,
                            'inputShapes': [[3]],
                            'outputShape': [3]
                        }]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('disposeVariables', jasmine_util_1.ALL_ENVS, function () {
    it('reuse same name variable', function () {
        tf.tensor1d([1, 2, 3]).variable(true, 'v1');
        tf.tensor1d([1, 2, 3]).variable(true, 'v2');
        expect(function () {
            tf.tensor1d([1, 2, 3]).variable(true, 'v1');
        }).toThrowError();
        tf.disposeVariables();
        tf.tensor1d([1, 2, 3]).variable(true, 'v1');
        tf.tensor1d([1, 2, 3]).variable(true, 'v2');
    });
});
/**
 * The following test constraints to the CPU environment because it needs a
 * concrete backend to exist. This test will work for any backend, but currently
 * this is the simplest backend to test against.
 */
jasmine_util_1.describeWithFlags('Switching cpu backends', { predicate: function (testEnv) { return testEnv.backendName === 'cpu'; } }, function () {
    beforeEach(function () {
        tf.registerBackend('cpu1', tf.findBackendFactory('cpu'));
        tf.registerBackend('cpu2', tf.findBackendFactory('cpu'));
    });
    afterEach(function () {
        tf.removeBackend('cpu1');
        tf.removeBackend('cpu2');
    });
    it('Move data from cpu1 to cpu2 backend', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    tf.setBackend('cpu1');
                    a = tf.scalar(5);
                    tf.setBackend('cpu2');
                    b = tf.scalar(3);
                    expect(tf.memory().numDataBuffers).toBe(2);
                    expect(tf.memory().numTensors).toBe(2);
                    expect(tf.memory().numBytes).toBe(8);
                    // Make sure you can read both tensors.
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    // Make sure you can read both tensors.
                    _a.apply(void 0, [_e.sent(), [5]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), [3]]);
                    // Switch back to cpu1.
                    tf.setBackend('cpu1');
                    // Again make sure you can read both tensors.
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 3:
                    // Again make sure you can read both tensors.
                    _c.apply(void 0, [_e.sent(), [5]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, b.data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), [3]]);
                    tf.dispose([a, b]);
                    expect(tf.memory().numDataBuffers).toBe(0);
                    expect(tf.memory().numTensors).toBe(0);
                    expect(tf.memory().numBytes).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('can execute op with data from mixed backends', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    tf.setBackend('cpu1');
                    a = tf.scalar(5);
                    tf.setBackend('cpu2');
                    b = tf.scalar(3);
                    // Verify that ops can execute with mixed backend data.
                    engine_1.ENGINE.startScope();
                    tf.setBackend('cpu1');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.add(a, b).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [8]]);
                    tf.setBackend('cpu2');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.add(a, b).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [8]]);
                    engine_1.ENGINE.endScope();
                    expect(tf.memory().numTensors).toBe(2);
                    expect(tf.memory().numDataBuffers).toBe(2);
                    tf.dispose([a, b]);
                    expect(tf.memory().numTensors).toBe(0);
                    expect(tf.memory().numDataBuffers).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
/**
 * The following unit test is a special integration-style test that assumes
 * things about CPU & WebGL backends being registered. This tests doesn't live
 * in the backend directory because it is testing engine rather than
 * backend-specific details but needs a real backend to exist. This test will
 * fail if the CPU backends is not registered. This is intentional, we should
 * have coverage for when these backends are enabled and ensure they work with
 * the engine.
 */
jasmine_util_1.describeWithFlags('Switching WebGL + CPU backends', {
    predicate: function (testEnv) { return testEnv.backendName === 'webgl' &&
        engine_1.ENGINE.backendNames().indexOf('webgl') !== -1 &&
        engine_1.ENGINE.backendNames().indexOf('cpu') !== -1; }
}, function () {
    beforeEach(function () {
        tf.registerBackend('webgl1', tf.findBackendFactory('webgl'));
        tf.registerBackend('webgl2', tf.findBackendFactory('webgl'));
        tf.registerBackend('cpu1', tf.findBackendFactory('cpu'));
    });
    afterEach(function () {
        tf.removeBackend('webgl1');
        tf.removeBackend('webgl2');
        tf.removeBackend('cpu1');
    });
    it('can execute op with data from mixed backends', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, c, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    tf.setBackend('webgl1');
                    a = tf.scalar(5);
                    tf.setBackend('webgl2');
                    b = tf.scalar(3);
                    tf.setBackend('cpu1');
                    c = tf.scalar(2);
                    // Verify that ops can execute with mixed backend data.
                    engine_1.ENGINE.startScope();
                    tf.setBackend('webgl1');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.addN([a, b, c]).data()];
                case 1:
                    _a.apply(void 0, [_d.sent(), [10]]);
                    tf.setBackend('webgl2');
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.addN([a, b, c]).data()];
                case 2:
                    _b.apply(void 0, [_d.sent(), [10]]);
                    tf.setBackend('cpu1');
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.addN([a, b, c]).data()];
                case 3:
                    _c.apply(void 0, [_d.sent(), [10]]);
                    engine_1.ENGINE.endScope();
                    expect(tf.memory().numTensors).toBe(3);
                    expect(tf.memory().numDataBuffers).toBe(3);
                    tf.dispose([a, b, c]);
                    expect(tf.memory().numTensors).toBe(0);
                    expect(tf.memory().numDataBuffers).toBe(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('fromPixels with mixed backends works', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.setBackend('webgl1');
                    a = tf.browser.fromPixels(new ImageData(new Uint8ClampedArray([1, 2, 3, 4]), 1, 1));
                    tf.setBackend('webgl2');
                    b = tf.browser.fromPixels(new ImageData(new Uint8ClampedArray([5, 6, 7, 8]), 1, 1));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.add(a, b).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [6, 8, 10]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('single tidy multiple backends', function () {
        expect(tf.memory().numTensors).toBe(0);
        tf.tidy(function () {
            tf.setBackend('webgl1');
            var a = tf.scalar(1);
            a.square(); // Uploads to GPU.
            tf.setBackend('webgl2');
            var b = tf.scalar(1);
            b.square(); // Uploads to GPU.
            expect(tf.memory().numTensors).toBe(4);
        });
        expect(tf.memory().numTensors).toBe(0);
    });
});
// NOTE: This describe is purposefully not a describeWithFlags so that we
// test tensor allocation where no scopes have been created. The backend
// here must be set to CPU because we cannot allocate GPU tensors outside
// a describeWithFlags because the default webgl backend and the test
// backends share a WebGLContext. When backends get registered, global
// WebGL state is initialized, which causes the two backends to step on
// each other and get in a bad state.
describe('Memory allocation outside a test scope', function () {
    it('constructing a tensor works', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tf.setBackend('cpu');
                    a = tf.tensor1d([1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, a.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 2, 3]]);
                    a.dispose();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=engine_test.js.map