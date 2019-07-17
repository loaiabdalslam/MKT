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
var globals_1 = require("../globals");
var gradients_1 = require("../gradients");
var ops_1 = require("../ops/ops");
var serialization_1 = require("../serialization");
/** @doc {heading: 'Training', subheading: 'Classes', namespace: 'train'} */
var Optimizer = /** @class */ (function (_super) {
    __extends(Optimizer, _super);
    function Optimizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Executes `f()` and minimizes the scalar output of `f()` by computing
     * gradients of y with respect to the list of trainable variables provided by
     * `varList`. If no list is provided, it defaults to all trainable variables.
     *
     * @param f The function to execute and whose output to minimize.
     * @param returnCost Whether to return the scalar cost value produced by
     * executing `f()`.
     * @param varList An optional list of variables to update. If specified, only
     * the trainable variables in varList will be updated by minimize. Defaults to
     * all trainable variables.
     */
    /** @doc {heading: 'Training', subheading: 'Optimizers'} */
    Optimizer.prototype.minimize = function (f, returnCost, varList) {
        if (returnCost === void 0) { returnCost = false; }
        var _a = this.computeGradients(f, varList), value = _a.value, grads = _a.grads;
        if (varList != null) {
            var gradArray = varList.map(function (v) { return ({ name: v.name, tensor: grads[v.name] }); });
            this.applyGradients(gradArray);
        }
        else {
            this.applyGradients(grads);
        }
        // Dispose gradients.
        globals_1.dispose(grads);
        if (returnCost) {
            return value;
        }
        else {
            value.dispose();
            return null;
        }
    };
    Object.defineProperty(Optimizer.prototype, "iterations", {
        /**
         * The number of iterations that this optimizer instance has been invoked for.
         */
        get: function () {
            if (this.iterations_ == null) {
                this.iterations_ = 0;
            }
            return this.iterations_;
        },
        enumerable: true,
        configurable: true
    });
    Optimizer.prototype.incrementIterations = function () {
        this.iterations_ = this.iterations + 1;
    };
    /**
     * Executes f() and computes the gradient of the scalar output of f() with
     * respect to the list of trainable variables provided by `varList`. If no
     * list is provided, it defaults to all trainable variables.
     *
     * @param f The function to execute and whose output to use for computing
     * gradients with respect to variables.
     * @param varList An optional list of variables to compute gradients with
     * respect to. If specified, only the trainable variables in varList will have
     * gradients computed with respect to. Defaults to all trainable variables.
     */
    Optimizer.prototype.computeGradients = function (f, varList) {
        return gradients_1.variableGrads(f, varList);
    };
    /**
     * Dispose the variables (if any) owned by this optimizer instance.
     */
    Optimizer.prototype.dispose = function () {
        if (this.iterations_ != null) {
            globals_1.dispose(this.iterations_);
        }
    };
    Optimizer.prototype.saveIterations = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.iterations_ == null) {
                    this.iterations_ = 0;
                }
                return [2 /*return*/, {
                        name: 'iter',
                        // TODO(cais): Use 'int64' type when available.
                        tensor: ops_1.scalar(this.iterations_, 'int32')
                    }];
            });
        });
    };
    Optimizer.prototype.getWeights = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('getWeights() is not implemented for this optimizer yet.');
            });
        });
    };
    Optimizer.prototype.setWeights = function (weightValues) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("setWeights() is not implemented for this optimizer class " +
                    ("" + this.getClassName()));
            });
        });
    };
    /**
     * Extract the first element of the weight values and set it
     * as the iterations counter variable of this instance of optimizer.
     *
     * @param weightValues
     * @returns Weight values with the first element consumed and excluded.
     */
    Optimizer.prototype.extractIterations = function (weightValues) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, weightValues[0].tensor.data()];
                    case 1:
                        _a.iterations_ = (_b.sent())[0];
                        return [2 /*return*/, weightValues.slice(1)];
                }
            });
        });
    };
    return Optimizer;
}(serialization_1.Serializable));
exports.Optimizer = Optimizer;
Object.defineProperty(Optimizer, Symbol.hasInstance, {
    value: function (instance) {
        return instance.minimize != null && instance.computeGradients != null &&
            instance.applyGradients != null;
    }
});
//# sourceMappingURL=optimizer.js.map