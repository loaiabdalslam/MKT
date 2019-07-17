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
/**
 * Classes and functions for model management across multiple storage mediums.
 *
 * Supported client actions:
 * - Listing models on all registered storage mediums.
 * - Remove model by URL from any registered storage mediums, by using URL
 *   string.
 * - Moving or copying model from one path to another in the same medium or from
 *   one medium to another, by using URL strings.
 */
var util_1 = require("../util");
var router_registry_1 = require("./router_registry");
var URL_SCHEME_SUFFIX = '://';
var ModelStoreManagerRegistry = /** @class */ (function () {
    function ModelStoreManagerRegistry() {
        this.managers = {};
    }
    ModelStoreManagerRegistry.getInstance = function () {
        if (ModelStoreManagerRegistry.instance == null) {
            ModelStoreManagerRegistry.instance = new ModelStoreManagerRegistry();
        }
        return ModelStoreManagerRegistry.instance;
    };
    /**
     * Register a save-handler router.
     *
     * @param saveRouter A function that maps a URL-like string onto an instance
     * of `IOHandler` with the `save` method defined or `null`.
     */
    ModelStoreManagerRegistry.registerManager = function (scheme, manager) {
        util_1.assert(scheme != null, function () { return 'scheme must not be undefined or null.'; });
        if (scheme.endsWith(URL_SCHEME_SUFFIX)) {
            scheme = scheme.slice(0, scheme.indexOf(URL_SCHEME_SUFFIX));
        }
        util_1.assert(scheme.length > 0, function () { return 'scheme must not be an empty string.'; });
        var registry = ModelStoreManagerRegistry.getInstance();
        util_1.assert(registry.managers[scheme] == null, function () { return "A model store manager is already registered for scheme '" + scheme + "'."; });
        registry.managers[scheme] = manager;
    };
    ModelStoreManagerRegistry.getManager = function (scheme) {
        var manager = this.getInstance().managers[scheme];
        if (manager == null) {
            throw new Error("Cannot find model manager for scheme '" + scheme + "'");
        }
        return manager;
    };
    ModelStoreManagerRegistry.getSchemes = function () {
        return Object.keys(this.getInstance().managers);
    };
    return ModelStoreManagerRegistry;
}());
exports.ModelStoreManagerRegistry = ModelStoreManagerRegistry;
/**
 * Helper method for parsing a URL string into a scheme and a path.
 *
 * @param url E.g., 'localstorage://my-model'
 * @returns A dictionary with two fields: scheme and path.
 *   Scheme: e.g., 'localstorage' in the example above.
 *   Path: e.g., 'my-model' in the example above.
 */
function parseURL(url) {
    if (url.indexOf(URL_SCHEME_SUFFIX) === -1) {
        throw new Error("The url string provided does not contain a scheme. " +
            "Supported schemes are: " +
            ("" + ModelStoreManagerRegistry.getSchemes().join(',')));
    }
    return {
        scheme: url.split(URL_SCHEME_SUFFIX)[0],
        path: url.split(URL_SCHEME_SUFFIX)[1],
    };
}
function cloneModelInternal(sourceURL, destURL, deleteSource) {
    if (deleteSource === void 0) { deleteSource = false; }
    return __awaiter(this, void 0, void 0, function () {
        var loadHandlers, loadHandler, saveHandlers, saveHandler, sourceScheme, sourcePath, sameMedium, modelArtifacts, saveResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    util_1.assert(sourceURL !== destURL, function () { return "Old path and new path are the same: '" + sourceURL + "'"; });
                    loadHandlers = router_registry_1.IORouterRegistry.getLoadHandlers(sourceURL);
                    util_1.assert(loadHandlers.length > 0, function () { return "Copying failed because no load handler is found for source URL " + sourceURL + "."; });
                    util_1.assert(loadHandlers.length < 2, function () { return "Copying failed because more than one (" + loadHandlers.length + ") " +
                        ("load handlers for source URL " + sourceURL + "."); });
                    loadHandler = loadHandlers[0];
                    saveHandlers = router_registry_1.IORouterRegistry.getSaveHandlers(destURL);
                    util_1.assert(saveHandlers.length > 0, function () { return "Copying failed because no save handler is found for destination " +
                        ("URL " + destURL + "."); });
                    util_1.assert(saveHandlers.length < 2, function () { return "Copying failed because more than one (" + loadHandlers.length + ") " +
                        ("save handlers for destination URL " + destURL + "."); });
                    saveHandler = saveHandlers[0];
                    sourceScheme = parseURL(sourceURL).scheme;
                    sourcePath = parseURL(sourceURL).path;
                    sameMedium = sourceScheme === parseURL(sourceURL).scheme;
                    return [4 /*yield*/, loadHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    if (!(deleteSource && sameMedium)) return [3 /*break*/, 3];
                    return [4 /*yield*/, ModelStoreManagerRegistry.getManager(sourceScheme)
                            .removeModel(sourcePath)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, saveHandler.save(modelArtifacts)];
                case 4:
                    saveResult = _a.sent();
                    if (!(deleteSource && !sameMedium)) return [3 /*break*/, 6];
                    return [4 /*yield*/, ModelStoreManagerRegistry.getManager(sourceScheme)
                            .removeModel(sourcePath)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/, saveResult.modelArtifactsInfo];
            }
        });
    });
}
/**
 * List all models stored in registered storage mediums.
 *
 * For a web browser environment, the registered mediums are Local Storage and
 * IndexedDB.
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Delete the model.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 * ```
 *
 * @returns A `Promise` of a dictionary mapping URLs of existing models to
 * their model artifacts info. URLs include medium-specific schemes, e.g.,
 *   'indexeddb://my/model/1'. Model artifacts info include type of the
 * model's topology, byte sizes of the topology, weights, etc.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function listModels() {
    return __awaiter(this, void 0, void 0, function () {
        var schemes, out, _i, schemes_1, scheme, schemeOut, path, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    schemes = ModelStoreManagerRegistry.getSchemes();
                    out = {};
                    _i = 0, schemes_1 = schemes;
                    _a.label = 1;
                case 1:
                    if (!(_i < schemes_1.length)) return [3 /*break*/, 4];
                    scheme = schemes_1[_i];
                    return [4 /*yield*/, ModelStoreManagerRegistry.getManager(scheme).listModels()];
                case 2:
                    schemeOut = _a.sent();
                    for (path in schemeOut) {
                        url = scheme + URL_SCHEME_SUFFIX + path;
                        out[url] = schemeOut[path];
                    }
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, out];
            }
        });
    });
}
exports.listModels = listModels;
/**
 * Remove a model specified by URL from a reigstered storage medium.
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Delete the model.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 * ```
 *
 * @param url A URL to a stored model, with a scheme prefix, e.g.,
 *   'localstorage://my-model-1', 'indexeddb://my/model/2'.
 * @returns ModelArtifactsInfo of the deleted model (if and only if deletion
 *   is successful).
 * @throws Error if deletion fails, e.g., if no model exists at `path`.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function removeModel(url) {
    return __awaiter(this, void 0, void 0, function () {
        var schemeAndPath, manager;
        return __generator(this, function (_a) {
            schemeAndPath = parseURL(url);
            manager = ModelStoreManagerRegistry.getManager(schemeAndPath.scheme);
            return [2 /*return*/, manager.removeModel(schemeAndPath.path)];
        });
    });
}
exports.removeModel = removeModel;
/**
 * Copy a model from one URL to another.
 *
 * This function supports:
 *
 * 1. Copying within a storage medium, e.g.,
 *    `tf.io.copyModel('localstorage://model-1', 'localstorage://model-2')`
 * 2. Copying between two storage mediums, e.g.,
 *    `tf.io.copyModel('localstorage://model-1', 'indexeddb://model-1')`
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Copy the model, from Local Storage to IndexedDB.
 * await tf.io.copyModel(
 *     'localstorage://demo/management/model1',
 *     'indexeddb://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Remove both models.
 * await tf.io.removeModel('localstorage://demo/management/model1');
 * await tf.io.removeModel('indexeddb://demo/management/model1');
 * ```
 *
 * @param sourceURL Source URL of copying.
 * @param destURL Destination URL of copying.
 * @returns ModelArtifactsInfo of the copied model (if and only if copying
 *   is successful).
 * @throws Error if copying fails, e.g., if no model exists at `sourceURL`, or
 *   if `oldPath` and `newPath` are identical.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function copyModel(sourceURL, destURL) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteSource;
        return __generator(this, function (_a) {
            deleteSource = false;
            return [2 /*return*/, cloneModelInternal(sourceURL, destURL, deleteSource)];
        });
    });
}
exports.copyModel = copyModel;
/**
 * Move a model from one URL to another.
 *
 * This function supports:
 *
 * 1. Moving within a storage medium, e.g.,
 *    `tf.io.moveModel('localstorage://model-1', 'localstorage://model-2')`
 * 2. Moving between two storage mediums, e.g.,
 *    `tf.io.moveModel('localstorage://model-1', 'indexeddb://model-1')`
 *
 * ```js
 * // First create and save a model.
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * await model.save('localstorage://demo/management/model1');
 *
 * // Then list existing models.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Move the model, from Local Storage to IndexedDB.
 * await tf.io.moveModel(
 *     'localstorage://demo/management/model1',
 *     'indexeddb://demo/management/model1');
 *
 * // List models again.
 * console.log(JSON.stringify(await tf.io.listModels()));
 *
 * // Remove the moved model.
 * await tf.io.removeModel('indexeddb://demo/management/model1');
 * ```
 *
 * @param sourceURL Source URL of moving.
 * @param destURL Destination URL of moving.
 * @returns ModelArtifactsInfo of the copied model (if and only if copying
 *   is successful).
 * @throws Error if moving fails, e.g., if no model exists at `sourceURL`, or
 *   if `oldPath` and `newPath` are identical.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Management',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function moveModel(sourceURL, destURL) {
    return __awaiter(this, void 0, void 0, function () {
        var deleteSource;
        return __generator(this, function (_a) {
            deleteSource = true;
            return [2 /*return*/, cloneModelInternal(sourceURL, destURL, deleteSource)];
        });
    });
}
exports.moveModel = moveModel;
//# sourceMappingURL=model_management.js.map