"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var jasmine_util_1 = require("../jasmine_util");
var operation_1 = require("./operation");
jasmine_util_1.describeWithFlags('operation', jasmine_util_1.ALL_ENVS, function () {
    it('executes and preserves function name', function () {
        var f = function () { return 2; };
        var opfn = operation_1.op({ 'opName': f });
        expect(opfn.name).toBe('opName');
        expect(opfn()).toBe(2);
    });
    it('executes, preserves function name, strips underscore', function () {
        var f = function () { return 2; };
        var opfn = operation_1.op({ 'opName_': f });
        expect(opfn.name).toBe('opName');
        expect(opfn()).toBe(2);
    });
    it('throws when passing an object with multiple keys', function () {
        var f = function () { return 2; };
        expect(function () { return operation_1.op({ 'opName_': f, 'opName2_': f }); })
            .toThrowError(/Please provide an object with a single key/);
    });
});
//# sourceMappingURL=operation_test.js.map