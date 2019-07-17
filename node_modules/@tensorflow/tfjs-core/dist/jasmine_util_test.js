"use strict";
/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
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
var environment_1 = require("./environment");
var jasmine_util_1 = require("./jasmine_util");
describe('jasmine_util.envSatisfiesConstraints', function () {
    it('ENV satisfies empty constraints', function () {
        var env = new environment_1.Environment({});
        env.setFlags({});
        var constraints = {};
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(true);
    });
    it('ENV satisfies matching flag constraints no predicate', function () {
        var env = new environment_1.Environment({});
        env.setFlags({ 'TEST-FLAG': true });
        var constraints = { flags: { 'TEST-FLAG': true } };
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(true);
    });
    it('ENV satisfies matching flag and predicate is true', function () {
        var env = new environment_1.Environment({});
        env.setFlags({ 'TEST-FLAG': true });
        var constraints = { flags: { 'TEST-FLAG': true }, predicate: function () { return true; } };
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(true);
    });
    it('ENV doesnt satisfy flags and predicate is true', function () {
        var env = new environment_1.Environment({});
        env.setFlags({ 'TEST-FLAG': true });
        var constraints = { flags: { 'TEST-FLAG': false }, predicate: function () { return true; } };
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(false);
    });
    it('ENV satisfies flags and predicate is false', function () {
        var env = new environment_1.Environment({});
        env.setFlags({ 'TEST-FLAG': true });
        var constraints = { flags: { 'TEST-FLAG': true }, predicate: function () { return false; } };
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(false);
    });
    it('ENV doesnt satiisfy flags and predicate is false', function () {
        var env = new environment_1.Environment({});
        env.setFlags({ 'TEST-FLAG': true });
        var constraints = { flags: { 'TEST-FLAG': false }, predicate: function () { return false; } };
        var backendName = 'test-backend';
        expect(jasmine_util_1.envSatisfiesConstraints(env, { name: 'test', backendName: backendName }, constraints))
            .toBe(false);
    });
});
describe('jasmine_util.parseKarmaFlags', function () {
    var registeredTestEnvs = [
        { name: 'test-env', backendName: 'test-backend', isDataSync: true, flags: {} }
    ];
    it('parse empty args', function () {
        var res = jasmine_util_1.parseTestEnvFromKarmaFlags([], registeredTestEnvs);
        expect(res).toBeNull();
    });
    it('--testEnv test-env --flags {"IS_NODE": true}', function () {
        var res = jasmine_util_1.parseTestEnvFromKarmaFlags(['--testEnv', 'test-env', '--flags', '{"IS_NODE": true}'], registeredTestEnvs);
        expect(res.name).toBe('test-env');
        expect(res.backendName).toBe('test-backend');
        expect(res.flags).toEqual({ IS_NODE: true });
    });
    it('"--testEnv unknown" throws error', function () {
        expect(function () { return jasmine_util_1.parseTestEnvFromKarmaFlags(['--testEnv', 'unknown'], registeredTestEnvs); })
            .toThrowError();
    });
    it('"--flags {}" throws error since --testEnv is missing', function () {
        expect(function () { return jasmine_util_1.parseTestEnvFromKarmaFlags(['--flags', '{}'], registeredTestEnvs); })
            .toThrowError();
    });
    it('"--testEnv cpu --flags" throws error since features value is missing', function () {
        expect(function () { return jasmine_util_1.parseTestEnvFromKarmaFlags(['--testEnv', 'test-env', '--flags'], registeredTestEnvs); })
            .toThrowError();
    });
    it('"--backend cpu --flags notJson" throws error', function () {
        expect(function () { return jasmine_util_1.parseTestEnvFromKarmaFlags(['--testEnv', 'test-env', '--flags', 'notJson'], registeredTestEnvs); })
            .toThrowError();
    });
});
//# sourceMappingURL=jasmine_util_test.js.map