"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
var constraint_config_1 = require("./constraint_config");
var initializer_config_1 = require("./initializer_config");
var layer_serialization_1 = require("./layers/layer_serialization");
var optimizer_config_1 = require("./optimizer_config");
var regularizer_config_1 = require("./regularizer_config");
exports.kerasClassNames = layer_serialization_1.layerClassNames.concat(constraint_config_1.constraintClassNames, initializer_config_1.initializerClassNames, regularizer_config_1.regularizerClassNames, optimizer_config_1.optimizerClassNames);
//# sourceMappingURL=keras_class_names.js.map