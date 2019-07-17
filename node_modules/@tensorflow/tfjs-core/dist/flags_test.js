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
var device_util = require("./device_util");
var environment_1 = require("./environment");
describe('DEBUG', function () {
    beforeEach(function () {
        environment_1.ENV.reset();
        spyOn(console, 'warn').and.callFake(function (msg) { });
    });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('disabled by default', function () {
        expect(environment_1.ENV.getBool('DEBUG')).toBe(false);
    });
    it('warns when enabled', function () {
        var consoleWarnSpy = console.warn;
        environment_1.ENV.set('DEBUG', true);
        expect(consoleWarnSpy.calls.count()).toBe(1);
        expect(consoleWarnSpy.calls.first().args[0]
            .startsWith('Debugging mode is ON. '))
            .toBe(true);
        expect(environment_1.ENV.getBool('DEBUG')).toBe(true);
        expect(consoleWarnSpy.calls.count()).toBe(1);
    });
});
describe('IS_BROWSER', function () {
    var isBrowser;
    beforeEach(function () {
        environment_1.ENV.reset();
        spyOn(device_util, 'isBrowser').and.callFake(function () { return isBrowser; });
    });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('isBrowser: true', function () {
        isBrowser = true;
        expect(environment_1.ENV.getBool('IS_BROWSER')).toBe(true);
    });
    it('isBrowser: false', function () {
        isBrowser = false;
        expect(environment_1.ENV.getBool('IS_BROWSER')).toBe(false);
    });
});
describe('PROD', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('disabled by default', function () {
        expect(environment_1.ENV.getBool('PROD')).toBe(false);
    });
});
describe('TENSORLIKE_CHECK_SHAPE_CONSISTENCY', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('disabled when debug is disabled', function () {
        environment_1.ENV.set('DEBUG', false);
        expect(environment_1.ENV.getBool('TENSORLIKE_CHECK_SHAPE_CONSISTENCY')).toBe(false);
    });
    it('enabled when debug is enabled', function () {
        environment_1.ENV.set('DEBUG', true);
        expect(environment_1.ENV.getBool('TENSORLIKE_CHECK_SHAPE_CONSISTENCY')).toBe(true);
    });
});
describe('DEPRECATION_WARNINGS_ENABLED', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('enabled by default', function () {
        expect(environment_1.ENV.getBool('DEPRECATION_WARNINGS_ENABLED')).toBe(true);
    });
});
describe('IS_TEST', function () {
    beforeEach(function () { return environment_1.ENV.reset(); });
    afterAll(function () { return environment_1.ENV.reset(); });
    it('disabled by default', function () {
        expect(environment_1.ENV.getBool('IS_TEST')).toBe(false);
    });
});
//# sourceMappingURL=flags_test.js.map