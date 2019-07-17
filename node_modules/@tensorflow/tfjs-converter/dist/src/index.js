"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var graph_model_1 = require("./executor/graph_model");
exports.GraphModel = graph_model_1.GraphModel;
exports.loadGraphModel = graph_model_1.loadGraphModel;
var register_1 = require("./operations/custom_op/register");
exports.deregisterOp = register_1.deregisterOp;
exports.registerOp = register_1.registerOp;
var version_1 = require("./version");
exports.version_converter = version_1.version;
//# sourceMappingURL=index.js.map