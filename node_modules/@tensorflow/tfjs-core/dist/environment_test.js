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
var environment = require("./environment");
var environment_1 = require("./environment");
describe('initializes flags from the url', function () {
    // Silence console.warns for these tests.
    beforeAll(function () { return spyOn(console, 'warn').and.returnValue(null); });
    it('no overrides one registered flag', function () {
        spyOn(environment, 'getQueryParams').and.returnValue({});
        var global = { location: { search: '' } };
        var env = new environment_1.Environment(global);
        env.registerFlag('FLAG1', function () { return false; });
        expect(env.get('FLAG1')).toBe(false);
    });
    it('one unregistered flag', function () {
        spyOn(environment, 'getQueryParams').and.returnValue({
            'tfjsflags': 'FLAG1:true'
        });
        var global = { location: { search: '' } };
        var env = new environment_1.Environment(global);
        expect(env.features).toEqual({});
    });
    it('one registered flag true', function () {
        var global = { location: { search: '?tfjsflags=FLAG1:true' } };
        var env = new environment_1.Environment(global);
        env.registerFlag('FLAG1', function () { return false; });
        expect(env.get('FLAG1')).toBe(true);
    });
    it('one registered flag false', function () {
        var global = { location: { search: '?tfjsflags=FLAG1:false' } };
        var env = new environment_1.Environment(global);
        env.registerFlag('FLAG1', function () { return true; });
        expect(env.get('FLAG1')).toBe(false);
    });
    it('two registered flags', function () {
        var global = { location: { search: '?tfjsflags=FLAG1:true,FLAG2:200' } };
        var env = new environment_1.Environment(global);
        env.registerFlag('FLAG1', function () { return false; });
        env.registerFlag('FLAG2', function () { return 100; });
        expect(env.get('FLAG1')).toBe(true);
        expect(env.get('FLAG2')).toBe(200);
    });
});
describe('flag registration and evaluation', function () {
    it('one flag registered', function () {
        var env = new environment_1.Environment({});
        var evalObject = { eval: function () { return true; } };
        var spy = spyOn(evalObject, 'eval').and.callThrough();
        env.registerFlag('FLAG1', function () { return evalObject.eval(); });
        expect(env.get('FLAG1')).toBe(true);
        expect(spy.calls.count()).toBe(1);
        // Multiple calls to get do not call the evaluation function again.
        expect(env.get('FLAG1')).toBe(true);
        expect(spy.calls.count()).toBe(1);
    });
    it('multiple flags registered', function () {
        var env = new environment_1.Environment({});
        var evalObject = { eval1: function () { return true; }, eval2: function () { return 100; } };
        var spy1 = spyOn(evalObject, 'eval1').and.callThrough();
        var spy2 = spyOn(evalObject, 'eval2').and.callThrough();
        env.registerFlag('FLAG1', function () { return evalObject.eval1(); });
        env.registerFlag('FLAG2', function () { return evalObject.eval2(); });
        expect(env.get('FLAG1')).toBe(true);
        expect(spy1.calls.count()).toBe(1);
        expect(spy2.calls.count()).toBe(0);
        expect(env.get('FLAG2')).toBe(100);
        expect(spy1.calls.count()).toBe(1);
        expect(spy2.calls.count()).toBe(1);
        // Multiple calls to get do not call the evaluation function again.
        expect(env.get('FLAG1')).toBe(true);
        expect(env.get('FLAG2')).toBe(100);
        expect(spy1.calls.count()).toBe(1);
        expect(spy2.calls.count()).toBe(1);
    });
    it('setting overrides value', function () {
        var env = new environment_1.Environment({});
        var evalObject = { eval: function () { return true; } };
        var spy = spyOn(evalObject, 'eval').and.callThrough();
        env.registerFlag('FLAG1', function () { return evalObject.eval(); });
        expect(env.get('FLAG1')).toBe(true);
        expect(spy.calls.count()).toBe(1);
        env.set('FLAG1', false);
        expect(env.get('FLAG1')).toBe(false);
        expect(spy.calls.count()).toBe(1);
    });
    it('set hook is called', function () {
        var env = new environment_1.Environment({});
        var evalObject = { eval: function () { return true; }, setHook: function () { return true; } };
        var evalSpy = spyOn(evalObject, 'eval').and.callThrough();
        var setHookSpy = spyOn(evalObject, 'setHook').and.callThrough();
        env.registerFlag('FLAG1', function () { return evalObject.eval(); }, function () { return evalObject.setHook(); });
        expect(env.get('FLAG1')).toBe(true);
        expect(evalSpy.calls.count()).toBe(1);
        expect(setHookSpy.calls.count()).toBe(0);
        env.set('FLAG1', false);
        expect(env.get('FLAG1')).toBe(false);
        expect(evalSpy.calls.count()).toBe(1);
        expect(setHookSpy.calls.count()).toBe(1);
    });
});
describe('environment.getQueryParams', function () {
    it('basic', function () {
        expect(environment.getQueryParams('?a=1&b=hi&f=animal'))
            .toEqual({ 'a': '1', 'b': 'hi', 'f': 'animal' });
    });
});
//# sourceMappingURL=environment_test.js.map