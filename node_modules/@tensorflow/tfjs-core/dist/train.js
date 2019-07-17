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
Object.defineProperty(exports, "__esModule", { value: true });
// So typings can propagate.
var adadelta_optimizer_1 = require("./optimizers/adadelta_optimizer");
var adagrad_optimizer_1 = require("./optimizers/adagrad_optimizer");
var adam_optimizer_1 = require("./optimizers/adam_optimizer");
var adamax_optimizer_1 = require("./optimizers/adamax_optimizer");
var momentum_optimizer_1 = require("./optimizers/momentum_optimizer");
var optimizer_constructors_1 = require("./optimizers/optimizer_constructors");
var rmsprop_optimizer_1 = require("./optimizers/rmsprop_optimizer");
var sgd_optimizer_1 = require("./optimizers/sgd_optimizer");
// tslint:disable-next-line:no-unused-expression
[momentum_optimizer_1.MomentumOptimizer, sgd_optimizer_1.SGDOptimizer, adadelta_optimizer_1.AdadeltaOptimizer, adagrad_optimizer_1.AdagradOptimizer,
    rmsprop_optimizer_1.RMSPropOptimizer, adamax_optimizer_1.AdamaxOptimizer, adam_optimizer_1.AdamOptimizer];
exports.train = {
    sgd: optimizer_constructors_1.OptimizerConstructors.sgd,
    momentum: optimizer_constructors_1.OptimizerConstructors.momentum,
    adadelta: optimizer_constructors_1.OptimizerConstructors.adadelta,
    adagrad: optimizer_constructors_1.OptimizerConstructors.adagrad,
    rmsprop: optimizer_constructors_1.OptimizerConstructors.rmsprop,
    adamax: optimizer_constructors_1.OptimizerConstructors.adamax,
    adam: optimizer_constructors_1.OptimizerConstructors.adam
};
//# sourceMappingURL=train.js.map