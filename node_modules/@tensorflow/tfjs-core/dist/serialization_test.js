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
Object.defineProperty(exports, "__esModule", { value: true });
var optimizer_1 = require("./optimizers/optimizer");
var serialization_1 = require("./serialization");
describe('registerClass', function () {
    var randomClassName = "OptimizerForTest" + Math.random();
    var OptimizerForTest = /** @class */ (function (_super) {
        __extends(OptimizerForTest, _super);
        function OptimizerForTest() {
            return _super.call(this) || this;
        }
        OptimizerForTest.prototype.applyGradients = function (variableGradients) { };
        OptimizerForTest.prototype.getConfig = function () {
            return {};
        };
        OptimizerForTest.className = randomClassName;
        return OptimizerForTest;
    }(optimizer_1.Optimizer));
    it('registerClass succeeds', function () {
        serialization_1.registerClass(OptimizerForTest);
        expect(serialization_1.SerializationMap.getMap().classNameMap[randomClassName] != null)
            .toEqual(true);
    });
    var OptimizerWithoutClassName = /** @class */ (function (_super) {
        __extends(OptimizerWithoutClassName, _super);
        function OptimizerWithoutClassName() {
            return _super.call(this) || this;
        }
        OptimizerWithoutClassName.prototype.applyGradients = function (variableGradients) { };
        OptimizerWithoutClassName.prototype.getConfig = function () {
            return {};
        };
        return OptimizerWithoutClassName;
    }(optimizer_1.Optimizer));
    it('registerClass fails on missing className', function () {
        // tslint:disable-next-line:no-any
        expect(function () { return serialization_1.registerClass(OptimizerWithoutClassName); })
            .toThrowError(/does not have the static className property/);
    });
    var OptimizerWithEmptyClassName = /** @class */ (function (_super) {
        __extends(OptimizerWithEmptyClassName, _super);
        function OptimizerWithEmptyClassName() {
            return _super.call(this) || this;
        }
        OptimizerWithEmptyClassName.prototype.applyGradients = function (variableGradients) { };
        OptimizerWithEmptyClassName.prototype.getConfig = function () {
            return {};
        };
        OptimizerWithEmptyClassName.className = '';
        return OptimizerWithEmptyClassName;
    }(optimizer_1.Optimizer));
    it('registerClass fails on missing className', function () {
        expect(function () { return serialization_1.registerClass(OptimizerWithEmptyClassName); })
            .toThrowError(/has an empty-string as its className/);
    });
    var OptimizerWithNonStringClassName = /** @class */ (function (_super) {
        __extends(OptimizerWithNonStringClassName, _super);
        function OptimizerWithNonStringClassName() {
            return _super.call(this) || this;
        }
        OptimizerWithNonStringClassName.prototype.applyGradients = function (variableGradients) { };
        OptimizerWithNonStringClassName.prototype.getConfig = function () {
            return {};
        };
        OptimizerWithNonStringClassName.className = 42;
        return OptimizerWithNonStringClassName;
    }(optimizer_1.Optimizer));
    it('registerClass fails on missing className', function () {
        // tslint:disable-next-line:no-any
        expect(function () { return serialization_1.registerClass(OptimizerWithNonStringClassName); })
            .toThrowError(/is required to be a string, but got type number/);
    });
});
//# sourceMappingURL=serialization_test.js.map