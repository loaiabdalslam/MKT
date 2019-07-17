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
 * IOHandlers related to files, such as browser-triggered file downloads,
 * user-selected files in browser.
 */
var environment_1 = require("../environment");
var io_utils_1 = require("./io_utils");
var router_registry_1 = require("./router_registry");
var DEFAULT_FILE_NAME_PREFIX = 'model';
var DEFAULT_JSON_EXTENSION_NAME = '.json';
var DEFAULT_WEIGHT_DATA_EXTENSION_NAME = '.weights.bin';
function defer(f) {
    return new Promise(function (resolve) { return setTimeout(resolve); }).then(f);
}
var BrowserDownloads = /** @class */ (function () {
    function BrowserDownloads(fileNamePrefix) {
        if (!environment_1.ENV.getBool('IS_BROWSER')) {
            // TODO(cais): Provide info on what IOHandlers are available under the
            //   current environment.
            throw new Error('browserDownloads() cannot proceed because the current environment ' +
                'is not a browser.');
        }
        if (fileNamePrefix.startsWith(BrowserDownloads.URL_SCHEME)) {
            fileNamePrefix = fileNamePrefix.slice(BrowserDownloads.URL_SCHEME.length);
        }
        if (fileNamePrefix == null || fileNamePrefix.length === 0) {
            fileNamePrefix = DEFAULT_FILE_NAME_PREFIX;
        }
        this.modelTopologyFileName = fileNamePrefix + DEFAULT_JSON_EXTENSION_NAME;
        this.weightDataFileName =
            fileNamePrefix + DEFAULT_WEIGHT_DATA_EXTENSION_NAME;
    }
    BrowserDownloads.prototype.save = function (modelArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            var weightsURL, weightsManifest, modelTopologyAndWeightManifest, modelTopologyAndWeightManifestURL, jsonAnchor_1, weightDataAnchor_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof (document) === 'undefined') {
                            throw new Error('Browser downloads are not supported in ' +
                                'this environment since `document` is not present');
                        }
                        weightsURL = window.URL.createObjectURL(new Blob([modelArtifacts.weightData], { type: 'application/octet-stream' }));
                        if (!(modelArtifacts.modelTopology instanceof ArrayBuffer)) return [3 /*break*/, 1];
                        throw new Error('BrowserDownloads.save() does not support saving model topology ' +
                            'in binary formats yet.');
                    case 1:
                        weightsManifest = [{
                                paths: ['./' + this.weightDataFileName],
                                weights: modelArtifacts.weightSpecs
                            }];
                        modelTopologyAndWeightManifest = {
                            modelTopology: modelArtifacts.modelTopology,
                            format: modelArtifacts.format,
                            generatedBy: modelArtifacts.generatedBy,
                            convertedBy: modelArtifacts.convertedBy,
                            weightsManifest: weightsManifest
                        };
                        modelTopologyAndWeightManifestURL = window.URL.createObjectURL(new Blob([JSON.stringify(modelTopologyAndWeightManifest)], { type: 'application/json' }));
                        jsonAnchor_1 = this.jsonAnchor == null ? document.createElement('a') :
                            this.jsonAnchor;
                        jsonAnchor_1.download = this.modelTopologyFileName;
                        jsonAnchor_1.href = modelTopologyAndWeightManifestURL;
                        // Trigger downloads by evoking a click event on the download anchors.
                        // When multiple downloads are started synchronously, Firefox will only
                        // save the last one.
                        return [4 /*yield*/, defer(function () { return jsonAnchor_1.dispatchEvent(new MouseEvent('click')); })];
                    case 2:
                        // Trigger downloads by evoking a click event on the download anchors.
                        // When multiple downloads are started synchronously, Firefox will only
                        // save the last one.
                        _a.sent();
                        if (!(modelArtifacts.weightData != null)) return [3 /*break*/, 4];
                        weightDataAnchor_1 = this.weightDataAnchor == null ?
                            document.createElement('a') :
                            this.weightDataAnchor;
                        weightDataAnchor_1.download = this.weightDataFileName;
                        weightDataAnchor_1.href = weightsURL;
                        return [4 /*yield*/, defer(function () { return weightDataAnchor_1.dispatchEvent(new MouseEvent('click')); })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, { modelArtifactsInfo: io_utils_1.getModelArtifactsInfoForJSON(modelArtifacts) }];
                }
            });
        });
    };
    BrowserDownloads.URL_SCHEME = 'downloads://';
    return BrowserDownloads;
}());
exports.BrowserDownloads = BrowserDownloads;
var BrowserFiles = /** @class */ (function () {
    function BrowserFiles(files) {
        if (files == null || files.length < 1) {
            throw new Error("When calling browserFiles, at least 1 file is required, " +
                ("but received " + files));
        }
        this.files = files;
    }
    BrowserFiles.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var jsonFile, weightFiles;
            var _this = this;
            return __generator(this, function (_a) {
                jsonFile = this.files[0];
                weightFiles = this.files.slice(1);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var jsonReader = new FileReader();
                        jsonReader.onload = function (event) {
                            // tslint:disable-next-line:no-any
                            var modelJSON = JSON.parse(event.target.result);
                            var modelTopology = modelJSON.modelTopology;
                            if (modelTopology == null) {
                                reject(new Error("modelTopology field is missing from file " + jsonFile.name));
                                return;
                            }
                            if (weightFiles.length === 0) {
                                resolve({ modelTopology: modelTopology });
                            }
                            var weightsManifest = modelJSON.weightsManifest;
                            if (weightsManifest == null) {
                                reject(new Error("weightManifest field is missing from file " + jsonFile.name));
                                return;
                            }
                            var pathToFile;
                            try {
                                pathToFile =
                                    _this.checkManifestAndWeightFiles(weightsManifest, weightFiles);
                            }
                            catch (err) {
                                reject(err);
                                return;
                            }
                            var weightSpecs = [];
                            var paths = [];
                            var perFileBuffers = [];
                            weightsManifest.forEach(function (weightsGroup) {
                                weightsGroup.paths.forEach(function (path) {
                                    paths.push(path);
                                    perFileBuffers.push(null);
                                });
                                weightSpecs.push.apply(weightSpecs, weightsGroup.weights);
                            });
                            weightsManifest.forEach(function (weightsGroup) {
                                weightsGroup.paths.forEach(function (path) {
                                    var weightFileReader = new FileReader();
                                    weightFileReader.onload = function (event) {
                                        // tslint:disable-next-line:no-any
                                        var weightData = event.target.result;
                                        var index = paths.indexOf(path);
                                        perFileBuffers[index] = weightData;
                                        if (perFileBuffers.indexOf(null) === -1) {
                                            resolve({
                                                modelTopology: modelTopology,
                                                weightSpecs: weightSpecs,
                                                weightData: io_utils_1.concatenateArrayBuffers(perFileBuffers),
                                            });
                                        }
                                    };
                                    weightFileReader.onerror = function (error) {
                                        return reject("Failed to weights data from file of path '" + path + "'.");
                                    };
                                    weightFileReader.readAsArrayBuffer(pathToFile[path]);
                                });
                            });
                        };
                        jsonReader.onerror = function (error) { return reject("Failed to read model topology and weights manifest JSON " +
                            ("from file '" + jsonFile.name + "'. BrowserFiles supports loading ") +
                            "Keras-style tf.Model artifacts only."); };
                        jsonReader.readAsText(jsonFile);
                    })];
            });
        });
    };
    /**
     * Check the compatibility between weights manifest and weight files.
     */
    BrowserFiles.prototype.checkManifestAndWeightFiles = function (manifest, files) {
        var basenames = [];
        var fileNames = files.map(function (file) { return io_utils_1.basename(file.name); });
        var pathToFile = {};
        for (var _i = 0, manifest_1 = manifest; _i < manifest_1.length; _i++) {
            var group = manifest_1[_i];
            group.paths.forEach(function (path) {
                var pathBasename = io_utils_1.basename(path);
                if (basenames.indexOf(pathBasename) !== -1) {
                    throw new Error("Duplicate file basename found in weights manifest: " +
                        ("'" + pathBasename + "'"));
                }
                basenames.push(pathBasename);
                if (fileNames.indexOf(pathBasename) === -1) {
                    throw new Error("Weight file with basename '" + pathBasename + "' is not provided.");
                }
                else {
                    pathToFile[path] = files[fileNames.indexOf(pathBasename)];
                }
            });
        }
        if (basenames.length !== files.length) {
            throw new Error("Mismatch in the number of files in weights manifest " +
                ("(" + basenames.length + ") and the number of weight files provided ") +
                ("(" + files.length + ")."));
        }
        return pathToFile;
    };
    return BrowserFiles;
}());
exports.browserDownloadsRouter = function (url) {
    if (!environment_1.ENV.getBool('IS_BROWSER')) {
        return null;
    }
    else {
        if (!Array.isArray(url) && url.startsWith(BrowserDownloads.URL_SCHEME)) {
            return browserDownloads(url.slice(BrowserDownloads.URL_SCHEME.length));
        }
        else {
            return null;
        }
    }
};
router_registry_1.IORouterRegistry.registerSaveRouter(exports.browserDownloadsRouter);
/**
 * Creates an IOHandler that triggers file downloads from the browser.
 *
 * The returned `IOHandler` instance can be used as model exporting methods such
 * as `tf.Model.save` and supports only saving.
 *
 * ```js
 * const model = tf.sequential();
 * model.add(tf.layers.dense(
 *     {units: 1, inputShape: [10], activation: 'sigmoid'}));
 * const saveResult = await model.save('downloads://mymodel');
 * // This will trigger downloading of two files:
 * //   'mymodel.json' and 'mymodel.weights.bin'.
 * console.log(saveResult);
 * ```
 *
 * @param fileNamePrefix Prefix name of the files to be downloaded. For use with
 *   `tf.Model`, `fileNamePrefix` should follow either of the following two
 *   formats:
 *   1. `null` or `undefined`, in which case the default file
 *      names will be used:
 *      - 'model.json' for the JSON file containing the model topology and
 *        weights manifest.
 *      - 'model.weights.bin' for the binary file containing the binary weight
 *        values.
 *   2. A single string or an Array of a single string, as the file name prefix.
 *      For example, if `'foo'` is provided, the downloaded JSON
 *      file and binary weights file will be named 'foo.json' and
 *      'foo.weights.bin', respectively.
 * @param config Additional configuration for triggering downloads.
 * @returns An instance of `BrowserDownloads` `IOHandler`.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function browserDownloads(fileNamePrefix) {
    if (fileNamePrefix === void 0) { fileNamePrefix = 'model'; }
    return new BrowserDownloads(fileNamePrefix);
}
exports.browserDownloads = browserDownloads;
/**
 * Creates an IOHandler that loads model artifacts from user-selected files.
 *
 * This method can be used for loading from files such as user-selected files
 * in the browser.
 * When used in conjunction with `tf.loadLayersModel`, an instance of
 * `tf.LayersModel` (Keras-style) can be constructed from the loaded artifacts.
 *
 * ```js
 * // Note: This code snippet won't run properly without the actual file input
 * //   elements in the HTML DOM.
 *
 * // Suppose there are two HTML file input (`<input type="file" ...>`)
 * // elements.
 * const uploadJSONInput = document.getElementById('upload-json');
 * const uploadWeightsInput = document.getElementById('upload-weights');
 * const model = await tf.loadLayersModel(tf.io.browserFiles(
 *     [uploadJSONInput.files[0], uploadWeightsInput.files[0]]));
 * ```
 *
 * @param files `File`s to load from. Currently, this function supports only
 *   loading from files that contain Keras-style models (i.e., `tf.Model`s), for
 *   which an `Array` of `File`s is expected (in that order):
 *   - A JSON file containing the model topology and weight manifest.
 *   - Optionally, One or more binary files containing the binary weights.
 *     These files must have names that match the paths in the `weightsManifest`
 *     contained by the aforementioned JSON file, or errors will be thrown
 *     during loading. These weights files have the same format as the ones
 *     generated by `tensorflowjs_converter` that comes with the `tensorflowjs`
 *     Python PIP package. If no weights files are provided, only the model
 *     topology will be loaded from the JSON file above.
 * @returns An instance of `Files` `IOHandler`.
 */
/**
 * @doc {
 *   heading: 'Models',
 *   subheading: 'Loading',
 *   namespace: 'io',
 *   ignoreCI: true
 * }
 */
function browserFiles(files) {
    return new BrowserFiles(files);
}
exports.browserFiles = browserFiles;
//# sourceMappingURL=browser_files.js.map