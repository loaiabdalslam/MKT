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
var environment_1 = require("../environment");
var io_utils_1 = require("./io_utils");
var model_management_1 = require("./model_management");
var router_registry_1 = require("./router_registry");
var DATABASE_NAME = 'tensorflowjs';
var DATABASE_VERSION = 1;
// Model data and ModelArtifactsInfo (metadata) are stored in two separate
// stores for efficient access of the list of stored models and their metadata.
// 1. The object store for model data: topology, weights and weight manifests.
var MODEL_STORE_NAME = 'models_store';
// 2. The object store for ModelArtifactsInfo, including meta-information such
//    as the type of topology (JSON vs binary), byte size of the topology, byte
//    size of the weights, etc.
var INFO_STORE_NAME = 'model_info_store';
/**
 * Delete the entire database for tensorflow.js, including the models store.
 */
function deleteDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var idbFactory;
        return __generator(this, function (_a) {
            idbFactory = getIndexedDBFactory();
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    var deleteRequest = idbFactory.deleteDatabase(DATABASE_NAME);
                    deleteRequest.onsuccess = function () { return resolve(); };
                    deleteRequest.onerror = function (error) { return reject(error); };
                })];
        });
    });
}
exports.deleteDatabase = deleteDatabase;
function getIndexedDBFactory() {
    if (!environment_1.ENV.getBool('IS_BROWSER')) {
        // TODO(cais): Add more info about what IOHandler subtypes are available.
        //   Maybe point to a doc page on the web and/or automatically determine
        //   the available IOHandlers and print them in the error message.
        throw new Error('Failed to obtain IndexedDB factory because the current environment' +
            'is not a web browser.');
    }
    // tslint:disable-next-line:no-any
    var theWindow = window;
    var factory = theWindow.indexedDB || theWindow.mozIndexedDB ||
        theWindow.webkitIndexedDB || theWindow.msIndexedDB ||
        theWindow.shimIndexedDB;
    if (factory == null) {
        throw new Error('The current browser does not appear to support IndexedDB.');
    }
    return factory;
}
function setUpDatabase(openRequest) {
    var db = openRequest.result;
    db.createObjectStore(MODEL_STORE_NAME, { keyPath: 'modelPath' });
    db.createObjectStore(INFO_STORE_NAME, { keyPath: 'modelPath' });
}
/**
 * IOHandler subclass: Browser IndexedDB.
 *
 * See the doc string of `browserIndexedDB` for more details.
 */
var BrowserIndexedDB = /** @class */ (function () {
    function BrowserIndexedDB(modelPath) {
        this.indexedDB = getIndexedDBFactory();
        if (modelPath == null || !modelPath) {
            throw new Error('For IndexedDB, modelPath must not be null, undefined or empty.');
        }
        this.modelPath = modelPath;
    }
    BrowserIndexedDB.prototype.save = function (modelArtifacts) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // TODO(cais): Support saving GraphDef models.
                if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
                    throw new Error('BrowserLocalStorage.save() does not support saving model topology ' +
                        'in binary formats yet.');
                }
                return [2 /*return*/, this.databaseAction(this.modelPath, modelArtifacts)];
            });
        });
    };
    BrowserIndexedDB.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.databaseAction(this.modelPath)];
            });
        });
    };
    /**
     * Perform database action to put model artifacts into or read model artifacts
     * from IndexedDB object store.
     *
     * Whether the action is put or get depends on whether `modelArtifacts` is
     * specified. If it is specified, the action will be put; otherwise the action
     * will be get.
     *
     * @param modelPath A unique string path for the model.
     * @param modelArtifacts If specified, it will be the model artifacts to be
     *   stored in IndexedDB.
     * @returns A `Promise` of `SaveResult`, if the action is put, or a `Promise`
     *   of `ModelArtifacts`, if the action is get.
     */
    BrowserIndexedDB.prototype.databaseAction = function (modelPath, modelArtifacts) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var openRequest = _this.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
            openRequest.onupgradeneeded = function () { return setUpDatabase(openRequest); };
            openRequest.onsuccess = function () {
                var db = openRequest.result;
                if (modelArtifacts == null) {
                    // Read model out from object store.
                    var modelTx = db.transaction(MODEL_STORE_NAME, 'readonly');
                    var modelStore = modelTx.objectStore(MODEL_STORE_NAME);
                    var getRequest_1 = modelStore.get(_this.modelPath);
                    getRequest_1.onsuccess = function () {
                        if (getRequest_1.result == null) {
                            db.close();
                            return reject(new Error("Cannot find model with path '" + _this.modelPath + "' " +
                                "in IndexedDB."));
                        }
                        else {
                            resolve(getRequest_1.result.modelArtifacts);
                        }
                    };
                    getRequest_1.onerror = function (error) {
                        db.close();
                        return reject(getRequest_1.error);
                    };
                    modelTx.oncomplete = function () { return db.close(); };
                }
                else {
                    // Put model into object store.
                    var modelArtifactsInfo_1 = io_utils_1.getModelArtifactsInfoForJSON(modelArtifacts);
                    // First, put ModelArtifactsInfo into info store.
                    var infoTx_1 = db.transaction(INFO_STORE_NAME, 'readwrite');
                    var infoStore_1 = infoTx_1.objectStore(INFO_STORE_NAME);
                    var putInfoRequest_1 = infoStore_1.put({ modelPath: _this.modelPath, modelArtifactsInfo: modelArtifactsInfo_1 });
                    var modelTx_1;
                    putInfoRequest_1.onsuccess = function () {
                        // Second, put model data into model store.
                        modelTx_1 = db.transaction(MODEL_STORE_NAME, 'readwrite');
                        var modelStore = modelTx_1.objectStore(MODEL_STORE_NAME);
                        var putModelRequest = modelStore.put({
                            modelPath: _this.modelPath,
                            modelArtifacts: modelArtifacts,
                            modelArtifactsInfo: modelArtifactsInfo_1
                        });
                        putModelRequest.onsuccess = function () { return resolve({ modelArtifactsInfo: modelArtifactsInfo_1 }); };
                        putModelRequest.onerror = function (error) {
                            // If the put-model request fails, roll back the info entry as
                            // well.
                            infoStore_1 = infoTx_1.objectStore(INFO_STORE_NAME);
                            var deleteInfoRequest = infoStore_1.delete(_this.modelPath);
                            deleteInfoRequest.onsuccess = function () {
                                db.close();
                                return reject(putModelRequest.error);
                            };
                            deleteInfoRequest.onerror = function (error) {
                                db.close();
                                return reject(putModelRequest.error);
                            };
                        };
                    };
                    putInfoRequest_1.onerror = function (error) {
                        db.close();
                        return reject(putInfoRequest_1.error);
                    };
                    infoTx_1.oncomplete = function () {
                        if (modelTx_1 == null) {
                            db.close();
                        }
                        else {
                            modelTx_1.oncomplete = function () { return db.close(); };
                        }
                    };
                }
            };
            openRequest.onerror = function (error) { return reject(openRequest.error); };
        });
    };
    BrowserIndexedDB.URL_SCHEME = 'indexeddb://';
    return BrowserIndexedDB;
}());
exports.BrowserIndexedDB = BrowserIndexedDB;
exports.indexedDBRouter = function (url) {
    if (!environment_1.ENV.getBool('IS_BROWSER')) {
        return null;
    }
    else {
        if (!Array.isArray(url) && url.startsWith(BrowserIndexedDB.URL_SCHEME)) {
            return browserIndexedDB(url.slice(BrowserIndexedDB.URL_SCHEME.length));
        }
        else {
            return null;
        }
    }
};
router_registry_1.IORouterRegistry.registerSaveRouter(exports.indexedDBRouter);
router_registry_1.IORouterRegistry.registerLoadRouter(exports.indexedDBRouter);
/**
 * Creates a browser IndexedDB IOHandler for saving and loading models.
 *
 * ```js
 * const model = tf.sequential();
 * model.add(
 *     tf.layers.dense({units: 1, inputShape: [100], activation: 'sigmoid'}));
 *
 * const saveResult = await model.save('indexeddb://MyModel'));
 * console.log(saveResult);
 * ```
 *
 * @param modelPath A unique identifier for the model to be saved. Must be a
 *   non-empty string.
 * @returns An instance of `BrowserIndexedDB` (sublcass of `IOHandler`),
 *   which can be used with, e.g., `tf.Model.save`.
 */
function browserIndexedDB(modelPath) {
    return new BrowserIndexedDB(modelPath);
}
exports.browserIndexedDB = browserIndexedDB;
function maybeStripScheme(key) {
    return key.startsWith(BrowserIndexedDB.URL_SCHEME) ?
        key.slice(BrowserIndexedDB.URL_SCHEME.length) :
        key;
}
var BrowserIndexedDBManager = /** @class */ (function () {
    function BrowserIndexedDBManager() {
        this.indexedDB = getIndexedDBFactory();
    }
    BrowserIndexedDBManager.prototype.listModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var openRequest = _this.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
                        openRequest.onupgradeneeded = function () { return setUpDatabase(openRequest); };
                        openRequest.onsuccess = function () {
                            var db = openRequest.result;
                            var tx = db.transaction(INFO_STORE_NAME, 'readonly');
                            var store = tx.objectStore(INFO_STORE_NAME);
                            // tslint:disable:max-line-length
                            // Need to cast `store` as `any` here because TypeScript's DOM
                            // library does not have the `getAll()` method even though the
                            // method is supported in the latest version of most mainstream
                            // browsers:
                            // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll
                            // tslint:enable:max-line-length
                            // tslint:disable-next-line:no-any
                            var getAllInfoRequest = store.getAll();
                            getAllInfoRequest.onsuccess = function () {
                                var out = {};
                                for (var _i = 0, _a = getAllInfoRequest.result; _i < _a.length; _i++) {
                                    var item = _a[_i];
                                    out[item.modelPath] = item.modelArtifactsInfo;
                                }
                                resolve(out);
                            };
                            getAllInfoRequest.onerror = function (error) {
                                db.close();
                                return reject(getAllInfoRequest.error);
                            };
                            tx.oncomplete = function () { return db.close(); };
                        };
                        openRequest.onerror = function (error) { return reject(openRequest.error); };
                    })];
            });
        });
    };
    BrowserIndexedDBManager.prototype.removeModel = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                path = maybeStripScheme(path);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var openRequest = _this.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
                        openRequest.onupgradeneeded = function () { return setUpDatabase(openRequest); };
                        openRequest.onsuccess = function () {
                            var db = openRequest.result;
                            var infoTx = db.transaction(INFO_STORE_NAME, 'readwrite');
                            var infoStore = infoTx.objectStore(INFO_STORE_NAME);
                            var getInfoRequest = infoStore.get(path);
                            var modelTx;
                            getInfoRequest.onsuccess = function () {
                                if (getInfoRequest.result == null) {
                                    db.close();
                                    return reject(new Error("Cannot find model with path '" + path + "' " +
                                        "in IndexedDB."));
                                }
                                else {
                                    // First, delete the entry in the info store.
                                    var deleteInfoRequest = infoStore.delete(path);
                                    var deleteModelData_1 = function () {
                                        // Second, delete the entry in the model store.
                                        modelTx = db.transaction(MODEL_STORE_NAME, 'readwrite');
                                        var modelStore = modelTx.objectStore(MODEL_STORE_NAME);
                                        var deleteModelRequest = modelStore.delete(path);
                                        deleteModelRequest.onsuccess = function () {
                                            return resolve(getInfoRequest.result.modelArtifactsInfo);
                                        };
                                        deleteModelRequest.onerror = function (error) {
                                            return reject(getInfoRequest.error);
                                        };
                                    };
                                    // Proceed with deleting model data regardless of whether deletion
                                    // of info data succeeds or not.
                                    deleteInfoRequest.onsuccess = deleteModelData_1;
                                    deleteInfoRequest.onerror = function (error) {
                                        deleteModelData_1();
                                        db.close();
                                        return reject(getInfoRequest.error);
                                    };
                                }
                            };
                            getInfoRequest.onerror = function (error) {
                                db.close();
                                return reject(getInfoRequest.error);
                            };
                            infoTx.oncomplete = function () {
                                if (modelTx == null) {
                                    db.close();
                                }
                                else {
                                    modelTx.oncomplete = function () { return db.close(); };
                                }
                            };
                        };
                        openRequest.onerror = function (error) { return reject(openRequest.error); };
                    })];
            });
        });
    };
    return BrowserIndexedDBManager;
}());
exports.BrowserIndexedDBManager = BrowserIndexedDBManager;
if (environment_1.ENV.getBool('IS_BROWSER')) {
    // Wrap the construction and registration, to guard against browsers that
    // don't support Local Storage.
    try {
        model_management_1.ModelStoreManagerRegistry.registerManager(BrowserIndexedDB.URL_SCHEME, new BrowserIndexedDBManager());
    }
    catch (err) {
    }
}
//# sourceMappingURL=indexed_db.js.map