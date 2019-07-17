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
 * IOHandler implementations based on HTTP requests in the web browser.
 *
 * Uses [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).
 */
var util_1 = require("../util");
var io_utils_1 = require("./io_utils");
var router_registry_1 = require("./router_registry");
var weights_loader_1 = require("./weights_loader");
var OCTET_STREAM_MIME_TYPE = 'application/octet-stream';
var JSON_TYPE = 'application/json';
var HTTPRequest = /** @class */ (function () {
    function HTTPRequest(path, loadOptions) {
        this.DEFAULT_METHOD = 'POST';
        if (loadOptions == null) {
            loadOptions = {};
        }
        this.weightPathPrefix = loadOptions.weightPathPrefix;
        this.onProgress = loadOptions.onProgress;
        if (loadOptions.fetchFunc != null) {
            util_1.assert(typeof loadOptions.fetchFunc === 'function', function () { return 'Must pass a function that matches the signature of ' +
                '`fetch` (see ' +
                'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)'; });
            this.fetch = loadOptions.fetchFunc;
        }
        else {
            this.fetch = util_1.fetch;
        }
        util_1.assert(path != null && path.length > 0, function () { return 'URL path for http must not be null, undefined or ' +
            'empty.'; });
        if (Array.isArray(path)) {
            util_1.assert(path.length === 2, function () { return 'URL paths for http must have a length of 2, ' +
                ("(actual length is " + path.length + ")."); });
        }
        this.path = path;
        if (loadOptions.requestInit != null &&
            loadOptions.requestInit.body != null) {
            throw new Error('requestInit is expected to have no pre-existing body, but has one.');
        }
        this.requestInit = loadOptions.requestInit || {};
    }
    HTTPRequest.prototype.save = function (modelArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var init, weightsManifest, modelTopologyAndWeightManifest, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
                            throw new Error('BrowserHTTPRequest.save() does not support saving model topology ' +
                                'in binary formats yet.');
                        }
                        init = Object.assign({ method: this.DEFAULT_METHOD }, this.requestInit);
                        init.body = new FormData();
                        weightsManifest = [{
                                paths: ['./model.weights.bin'],
                                weights: modelArtifacts.weightSpecs,
                            }];
                        modelTopologyAndWeightManifest = {
                            modelTopology: modelArtifacts.modelTopology,
                            format: modelArtifacts.format,
                            generatedBy: modelArtifacts.generatedBy,
                            convertedBy: modelArtifacts.convertedBy,
                            weightsManifest: weightsManifest
                        };
                        init.body.append('model.json', new Blob([JSON.stringify(modelTopologyAndWeightManifest)], { type: JSON_TYPE }), 'model.json');
                        if (modelArtifacts.weightData != null) {
                            init.body.append('model.weights.bin', new Blob([modelArtifacts.weightData], { type: OCTET_STREAM_MIME_TYPE }), 'model.weights.bin');
                        }
                        return [4 /*yield*/, this.fetch(this.path, init)];
                    case 1:
                        response = _a.sent();
                        if (response.ok) {
                            return [2 /*return*/, {
                                    modelArtifactsInfo: io_utils_1.getModelArtifactsInfoForJSON(modelArtifacts),
                                    responses: [response],
                                }];
                        }
                        else {
                            throw new Error("BrowserHTTPRequest.save() failed due to HTTP response status " +
                                (response.status + "."));
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load model artifacts via HTTP request(s).
     *
     * See the documentation to `tf.io.http` for details on the saved
     * artifacts.
     *
     * @returns The loaded model artifacts (if loading succeeds).
     */
    HTTPRequest.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modelConfigRequest, modelConfig, e_1, message, modelTopology, weightsManifest, weightSpecs, weightData, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch(this.path, this.requestInit)];
                    case 1:
                        modelConfigRequest = _a.sent();
                        if (!modelConfigRequest.ok) {
                            throw new Error("Request to " + this.path + " failed with status code " +
                                (modelConfigRequest.status + ". Please verify this URL points to ") +
                                "the model JSON of the model to load.");
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, modelConfigRequest.json()];
                    case 3:
                        modelConfig = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        message = "Failed to parse model JSON of response from " + this.path + ".";
                        // TODO(nsthorat): Remove this after some time when we're comfortable that
                        // .pb files are mostly gone.
                        if (this.path.endsWith('.pb')) {
                            message += ' Your path contains a .pb file extension. ' +
                                'Support for .pb models have been removed in TensorFlow.js 1.0 ' +
                                'in favor of .json models. You can re-convert your Python ' +
                                'TensorFlow model using the TensorFlow.js 1.0 conversion scripts ' +
                                'or you can convert your.pb models with the \'pb2json\'' +
                                'NPM script in the tensorflow/tfjs-converter repository.';
                        }
                        else {
                            message += ' Please make sure the server is serving valid ' +
                                'JSON for this request.';
                        }
                        throw new Error(message);
                    case 5:
                        modelTopology = modelConfig.modelTopology;
                        weightsManifest = modelConfig.weightsManifest;
                        // We do not allow both modelTopology and weightsManifest to be missing.
                        if (modelTopology == null && weightsManifest == null) {
                            throw new Error("The JSON from HTTP path " + this.path + " contains neither model " +
                                "topology or manifest for weights.");
                        }
                        if (!(weightsManifest != null)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.loadWeights(weightsManifest)];
                    case 6:
                        results = _a.sent();
                        weightSpecs = results[0], weightData = results[1];
                        _a.label = 7;
                    case 7: return [2 /*return*/, { modelTopology: modelTopology, weightSpecs: weightSpecs, weightData: weightData }];
                }
            });
        });
    };
    HTTPRequest.prototype.loadWeights = function (weightsManifest) {
        return __awaiter(this, void 0, void 0, function () {
            var weightPath, _a, prefix, suffix, pathPrefix, weightSpecs, _i, weightsManifest_1, entry, fetchURLs, buffers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        weightPath = Array.isArray(this.path) ? this.path[1] : this.path;
                        _a = parseUrl(weightPath), prefix = _a[0], suffix = _a[1];
                        pathPrefix = this.weightPathPrefix || prefix;
                        weightSpecs = [];
                        for (_i = 0, weightsManifest_1 = weightsManifest; _i < weightsManifest_1.length; _i++) {
                            entry = weightsManifest_1[_i];
                            weightSpecs.push.apply(weightSpecs, entry.weights);
                        }
                        fetchURLs = [];
                        weightsManifest.forEach(function (weightsGroup) {
                            weightsGroup.paths.forEach(function (path) {
                                fetchURLs.push(pathPrefix + path + suffix);
                            });
                        });
                        return [4 /*yield*/, weights_loader_1.loadWeightsAsArrayBuffer(fetchURLs, {
                                requestInit: this.requestInit,
                                fetchFunc: this.fetch,
                                onProgress: this.onProgress
                            })];
                    case 1:
                        buffers = _b.sent();
                        return [2 /*return*/, [weightSpecs, io_utils_1.concatenateArrayBuffers(buffers)]];
                }
            });
        });
    };
    HTTPRequest.URL_SCHEME_REGEX = /^https?:\/\//;
    return HTTPRequest;
}());
exports.HTTPRequest = HTTPRequest;
/**
 * Extract the prefix and suffix of the url, where the prefix is the path before
 * the last file, and suffix is the search params after the last file.
 * ```
 * const url = 'http://tfhub.dev/model/1/tensorflowjs_model.pb?tfjs-format=file'
 * [prefix, suffix] = parseUrl(url)
 * // prefix = 'http://tfhub.dev/model/1/'
 * // suffix = '?tfjs-format=file'
 * ```
 * @param url the model url to be parsed.
 */
function parseUrl(url) {
    var lastSlash = url.lastIndexOf('/');
    var lastSearchParam = url.lastIndexOf('?');
    var prefix = url.substring(0, lastSlash);
    var suffix = lastSearchParam > lastSlash ? url.substring(lastSearchParam) : '';
    return [prefix + '/', suffix];
}
exports.parseUrl = parseUrl;
function isHTTPScheme(url) {
    return url.match(HTTPRequest.URL_SCHEME_REGEX) != null;
}
exports.isHTTPScheme = isHTTPScheme;
exports.httpRouter = function (url, onProgress) {
    if (typeof util_1.fetch === 'undefined') {
        // `http` uses `fetch` or `node-fetch`, if one wants to use it in
        // an environment that is not the browser or node they have to setup a
        // global fetch polyfill.
        return null;
    }
    else {
        var isHTTP = true;
        if (Array.isArray(url)) {
            isHTTP = url.every(function (urlItem) { return isHTTPScheme(urlItem); });
        }
        else {
            isHTTP = isHTTPScheme(url);
        }
        if (isHTTP) {
            return http(url, { onProgress: onProgress });
        }
    }
    return null;
};
router_registry_1.IORouterRegistry.registerSaveRouter(exports.httpRouter);
router_registry_1.IORouterRegistry.registerLoadRouter(exports.httpRouter);
/**
 * Creates an IOHandler subtype that sends model artifacts to HTTP server.
 *
 * An HTTP request of the `multipart/form-data` mime type will be sent to the
 * `path` URL. The form data includes artifacts that represent the topology
 * and/or weights of the model. In the case of Keras-style `tf.Model`, two
 * blobs (files) exist in form-data:
 *   - A JSON file consisting of `modelTopology` and `weightsManifest`.
 *   - A binary weights file consisting of the concatenated weight values.
 * These files are in the same format as the one generated by
 * [tfjs_converter](https://js.tensorflow.org/tutorials/import-keras.html).
 *
 * The following code snippet exemplifies the client-side code that uses this
 * function:
 *
 * ```js
 * const model = tf.sequential();
 * model.add(
 *     tf.layers.dense({units: 1, inputShape: [100], activation: 'sigmoid'}));
 *
 * const saveResult = await model.save(tf.io.http(
 *     'http://model-server:5000/upload', {method: 'PUT'}));
 * console.log(saveResult);
 * ```
 *
 * If the default `POST` method is to be used, without any custom parameters
 * such as headers, you can simply pass an HTTP or HTTPS URL to `model.save`:
 *
 * ```js
 * const saveResult = await model.save('http://model-server:5000/upload');
 * ```
 *
 * The following GitHub Gist
 * https://gist.github.com/dsmilkov/1b6046fd6132d7408d5257b0976f7864
 * implements a server based on [flask](https://github.com/pallets/flask) that
 * can receive the request. Upon receiving the model artifacts via the requst,
 * this particular server reconsistutes instances of [Keras
 * Models](https://keras.io/models/model/) in memory.
 *
 *
 * @param path A URL path to the model.
 *   Can be an absolute HTTP path (e.g.,
 *   'http://localhost:8000/model-upload)') or a relative path (e.g.,
 *   './model-upload').
 * @param requestInit Request configurations to be used when sending
 *    HTTP request to server using `fetch`. It can contain fields such as
 *    `method`, `credentials`, `headers`, `mode`, etc. See
 *    https://developer.mozilla.org/en-US/docs/Web/API/Request/Request
 *    for more information. `requestInit` must not have a body, because the
 * body will be set by TensorFlow.js. File blobs representing the model
 * topology (filename: 'model.json') and the weights of the model (filename:
 * 'model.weights.bin') will be appended to the body. If `requestInit` has a
 * `body`, an Error will be thrown.
 * @param loadOptions Optional configuration for the loading. It includes the
 *   following fields:
 *   - weightPathPrefix Optional, this specifies the path prefix for weight
 *     files, by default this is calculated from the path param.
 *   - fetchFunc Optional, custom `fetch` function. E.g., in Node.js,
 *     the `fetch` from node-fetch can be used here.
 *   - onProgress Optional, progress callback function, fired periodically
 *     before the load is completed.
 * @returns An instance of `IOHandler`.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function http(path, loadOptions) {
    return new HTTPRequest(path, loadOptions);
}
exports.http = http;
/**
 * Deprecated. Use `tf.io.http`.
 * @param path
 * @param loadOptions
 */
function browserHTTPRequest(path, loadOptions) {
    return http(path, loadOptions);
}
exports.browserHTTPRequest = browserHTTPRequest;
//# sourceMappingURL=http.js.map