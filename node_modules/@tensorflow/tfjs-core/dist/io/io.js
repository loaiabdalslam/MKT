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
// Importing local_storage and indexed_db is necessary for the routers to be
// registered.
require("./indexed_db");
require("./local_storage");
var browser_files_1 = require("./browser_files");
exports.browserFiles = browser_files_1.browserFiles;
var http_1 = require("./http");
exports.browserHTTPRequest = http_1.browserHTTPRequest;
exports.http = http_1.http;
exports.isHTTPScheme = http_1.isHTTPScheme;
var io_utils_1 = require("./io_utils");
exports.concatenateArrayBuffers = io_utils_1.concatenateArrayBuffers;
exports.decodeWeights = io_utils_1.decodeWeights;
exports.encodeWeights = io_utils_1.encodeWeights;
exports.getModelArtifactsInfoForJSON = io_utils_1.getModelArtifactsInfoForJSON;
var passthrough_1 = require("./passthrough");
exports.fromMemory = passthrough_1.fromMemory;
exports.withSaveHandler = passthrough_1.withSaveHandler;
var router_registry_1 = require("./router_registry");
exports.getLoadHandlers = router_registry_1.getLoadHandlers;
exports.getSaveHandlers = router_registry_1.getSaveHandlers;
exports.registerLoadRouter = router_registry_1.registerLoadRouter;
exports.registerSaveRouter = router_registry_1.registerSaveRouter;
var weights_loader_1 = require("./weights_loader");
exports.loadWeights = weights_loader_1.loadWeights;
exports.weightsLoaderFactory = weights_loader_1.weightsLoaderFactory;
var model_management_1 = require("./model_management");
exports.copyModel = model_management_1.copyModel;
exports.listModels = model_management_1.listModels;
exports.moveModel = model_management_1.moveModel;
exports.removeModel = model_management_1.removeModel;
//# sourceMappingURL=io.js.map