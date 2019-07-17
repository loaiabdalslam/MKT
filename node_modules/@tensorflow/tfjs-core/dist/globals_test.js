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
var environment_1 = require("./environment");
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
describe('deprecation warnings', function () {
    beforeEach(function () {
        spyOn(console, 'warn').and.callFake(function (msg) { return null; });
    });
    it('deprecationWarn warns', function () {
        tf.deprecationWarn('xyz is deprecated.');
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn)
            .toHaveBeenCalledWith('xyz is deprecated. You can disable deprecation warnings with ' +
            'tf.disableDeprecationWarnings().');
    });
    it('disableDeprecationWarnings called, deprecationWarn doesnt warn', function () {
        tf.disableDeprecationWarnings();
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn)
            .toHaveBeenCalledWith('TensorFlow.js deprecation warnings have been disabled.');
        // deprecationWarn no longer warns.
        tf.deprecationWarn('xyz is deprecated.');
        expect(console.warn).toHaveBeenCalledTimes(1);
    });
});
describe('Flag flipping methods', function () {
    beforeEach(function () {
        environment_1.ENV.reset();
    });
    it('tf.enableProdMode', function () {
        tf.enableProdMode();
        expect(environment_1.ENV.getBool('PROD')).toBe(true);
    });
    it('tf.enableDebugMode', function () {
        tf.enableDebugMode();
        expect(environment_1.ENV.getBool('DEBUG')).toBe(true);
    });
});
jasmine_util_1.describeWithFlags('time cpu', jasmine_util_1.NODE_ENVS, function () {
    it('simple upload', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    a = tf.zeros([10, 10]);
                    return [4 /*yield*/, tf.time(function () { return a.square(); })];
                case 1:
                    time = _a.sent();
                    expect(time.kernelMs > 0);
                    expect(time.wallMs >= time.kernelMs);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('tidy', jasmine_util_1.ALL_ENVS, function () {
    it('returns Tensor', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            tf.tidy(function () {
                var a = tf.tensor1d([1, 2, 3]);
                var b = tf.tensor1d([0, 0, 0]);
                expect(tf.memory().numTensors).toBe(2);
                tf.tidy(function () {
                    var result = tf.tidy(function () {
                        b = tf.addStrict(a, b);
                        b = tf.addStrict(a, b);
                        b = tf.addStrict(a, b);
                        return tf.add(a, b);
                    });
                    // result is new. All intermediates should be disposed.
                    expect(tf.memory().numTensors).toBe(2 + 1);
                    expect(result.shape).toEqual([3]);
                    expect(result.isDisposed).toBe(false);
                });
                // a, b are still here, result should be disposed.
                expect(tf.memory().numTensors).toBe(2);
            });
            expect(tf.memory().numTensors).toBe(0);
            return [2 /*return*/];
        });
    }); });
    it('multiple disposes does not affect num arrays', function () {
        expect(tf.memory().numTensors).toBe(0);
        var a = tf.tensor1d([1, 2, 3]);
        var b = tf.tensor1d([1, 2, 3]);
        expect(tf.memory().numTensors).toBe(2);
        a.dispose();
        a.dispose();
        expect(tf.memory().numTensors).toBe(1);
        b.dispose();
        expect(tf.memory().numTensors).toBe(0);
    });
    it('allows primitive types', function () {
        var a = tf.tidy(function () { return 5; });
        expect(a).toBe(5);
        var b = tf.tidy(function () { return 'hello'; });
        expect(b).toBe('hello');
    });
    it('allows complex types', function () { return __awaiter(_this, void 0, void 0, function () {
        var res, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    res = tf.tidy(function () {
                        return { a: tf.scalar(1), b: 'hello', c: [tf.scalar(2), 'world'] };
                    });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.a.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, res.c[0].data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns Tensor[]', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b;
        return __generator(this, function (_a) {
            a = tf.tensor1d([1, 2, 3]);
            b = tf.tensor1d([0, -1, 1]);
            expect(tf.memory().numTensors).toBe(2);
            tf.tidy(function () {
                var result = tf.tidy(function () {
                    tf.add(a, b);
                    return [tf.add(a, b), tf.sub(a, b)];
                });
                // the 2 results are new. All intermediates should be disposed.
                expect(tf.memory().numTensors).toBe(4);
                expect(result[0].isDisposed).toBe(false);
                expect(result[0].shape).toEqual([3]);
                expect(result[1].isDisposed).toBe(false);
                expect(result[1].shape).toEqual([3]);
                expect(tf.memory().numTensors).toBe(4);
            });
            // the 2 results should be disposed.
            expect(tf.memory().numTensors).toBe(2);
            a.dispose();
            b.dispose();
            expect(tf.memory().numTensors).toBe(0);
            return [2 /*return*/];
        });
    }); });
    it('basic usage without return', function () {
        var a = tf.tensor1d([1, 2, 3]);
        var b = tf.tensor1d([0, 0, 0]);
        expect(tf.memory().numTensors).toBe(2);
        tf.tidy(function () {
            b = tf.addStrict(a, b);
            b = tf.addStrict(a, b);
            b = tf.addStrict(a, b);
            tf.add(a, b);
        });
        // all intermediates should be disposed.
        expect(tf.memory().numTensors).toBe(2);
    });
    it('nested usage', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b;
        return __generator(this, function (_a) {
            a = tf.tensor1d([1, 2, 3]);
            b = tf.tensor1d([0, 0, 0]);
            expect(tf.memory().numTensors).toBe(2);
            tf.tidy(function () {
                var result = tf.tidy(function () {
                    b = tf.addStrict(a, b);
                    b = tf.tidy(function () {
                        b = tf.tidy(function () {
                            return tf.addStrict(a, b);
                        });
                        // original a, b, and two intermediates.
                        expect(tf.memory().numTensors).toBe(4);
                        tf.tidy(function () {
                            tf.addStrict(a, b);
                        });
                        // All the intermediates should be cleaned up.
                        expect(tf.memory().numTensors).toBe(4);
                        return tf.addStrict(a, b);
                    });
                    expect(tf.memory().numTensors).toBe(4);
                    return tf.addStrict(a, b);
                });
                expect(tf.memory().numTensors).toBe(3);
                expect(result.isDisposed).toBe(false);
                expect(result.shape).toEqual([3]);
            });
            expect(tf.memory().numTensors).toBe(2);
            return [2 /*return*/];
        });
    }); });
    it('nested usage returns tensor created from outside scope', function () {
        var x = tf.scalar(1);
        tf.tidy(function () {
            tf.tidy(function () {
                return x;
            });
        });
        expect(x.isDisposed).toBe(false);
    });
    it('nested usage with keep works', function () {
        var b;
        tf.tidy(function () {
            var a = tf.scalar(1);
            tf.tidy(function () {
                b = tf.keep(a);
            });
        });
        expect(b.isDisposed).toBe(false);
        b.dispose();
    });
    it('single argument', function () {
        var hasRan = false;
        tf.tidy(function () {
            hasRan = true;
        });
        expect(hasRan).toBe(true);
    });
    it('single argument, but not a function throws error', function () {
        expect(function () {
            tf.tidy('asdf');
        }).toThrowError();
    });
    it('2 arguments, first is string', function () {
        var hasRan = false;
        tf.tidy('name', function () {
            hasRan = true;
        });
        expect(hasRan).toBe(true);
    });
    it('2 arguments, but first is not string throws error', function () {
        expect(function () {
            // tslint:disable-next-line:no-any
            tf.tidy(4, function () { });
        }).toThrowError();
    });
    it('2 arguments, but second is not a function throws error', function () {
        expect(function () {
            // tslint:disable-next-line:no-any
            tf.tidy('name', 'another name');
        }).toThrowError();
    });
    it('works with arbitrary depth of result', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            tf.tidy(function () {
                var res = tf.tidy(function () {
                    return [tf.scalar(1), [[tf.scalar(2)]], { list: [tf.scalar(3)] }];
                });
                expect(res[0].isDisposed).toBe(false);
                // tslint:disable-next-line:no-any
                expect(res[1][0][0].isDisposed).toBe(false);
                // tslint:disable-next-line:no-any
                expect(res[2].list[0].isDisposed).toBe(false);
                expect(tf.memory().numTensors).toBe(3);
                return res[0];
            });
            // Everything but scalar(1) got disposed.
            expect(tf.memory().numTensors).toBe(1);
            return [2 /*return*/];
        });
    }); });
});
//# sourceMappingURL=globals_test.js.map