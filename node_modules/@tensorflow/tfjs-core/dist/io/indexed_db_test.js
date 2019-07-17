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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Unit tests for indexed_db.ts.
 */
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
var indexed_db_1 = require("./indexed_db");
jasmine_util_1.describeWithFlags('IndexedDB', jasmine_util_1.BROWSER_ENVS, function () {
    // Test data.
    var modelTopology1 = {
        'class_name': 'Sequential',
        'keras_version': '2.1.4',
        'config': [{
                'class_name': 'Dense',
                'config': {
                    'kernel_initializer': {
                        'class_name': 'VarianceScaling',
                        'config': {
                            'distribution': 'uniform',
                            'scale': 1.0,
                            'seed': null,
                            'mode': 'fan_avg'
                        }
                    },
                    'name': 'dense',
                    'kernel_constraint': null,
                    'bias_regularizer': null,
                    'bias_constraint': null,
                    'dtype': 'float32',
                    'activation': 'linear',
                    'trainable': true,
                    'kernel_regularizer': null,
                    'bias_initializer': { 'class_name': 'Zeros', 'config': {} },
                    'units': 1,
                    'batch_input_shape': [null, 3],
                    'use_bias': true,
                    'activity_regularizer': null
                }
            }],
        'backend': 'tensorflow'
    };
    var weightSpecs1 = [
        {
            name: 'dense/kernel',
            shape: [3, 1],
            dtype: 'float32',
        },
        {
            name: 'dense/bias',
            shape: [1],
            dtype: 'float32',
        }
    ];
    var weightData1 = new ArrayBuffer(16);
    var artifacts1 = {
        modelTopology: modelTopology1,
        weightSpecs: weightSpecs1,
        weightData: weightData1,
        format: 'layers-model',
        generatedBy: 'TensorFlow.js v0.0.0',
        convertedBy: null
    };
    var weightSpecs2 = [
        {
            name: 'dense/new_kernel',
            shape: [5, 1],
            dtype: 'float32',
        },
        {
            name: 'dense/new_bias',
            shape: [1],
            dtype: 'float32',
        }
    ];
    beforeEach(indexed_db_1.deleteDatabase);
    afterEach(indexed_db_1.deleteDatabase);
    it('Save-load round trip', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStartDate, handler, saveResult, loadedArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testStartDate = new Date();
                    handler = tf.io.getSaveHandlers('indexeddb://FooModel')[0];
                    return [4 /*yield*/, handler.save(artifacts1)];
                case 1:
                    saveResult = _a.sent();
                    expect(saveResult.modelArtifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(testStartDate.getTime());
                    // Note: The following two assertions work only because there is no
                    //   non-ASCII characters in `modelTopology1` and `weightSpecs1`.
                    expect(saveResult.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs1).length);
                    expect(saveResult.modelArtifactsInfo.weightDataBytes)
                        .toEqual(weightData1.byteLength);
                    return [4 /*yield*/, handler.load()];
                case 2:
                    loadedArtifacts = _a.sent();
                    expect(loadedArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(loadedArtifacts.weightSpecs).toEqual(weightSpecs1);
                    expect(loadedArtifacts.format).toEqual('layers-model');
                    expect(loadedArtifacts.generatedBy).toEqual('TensorFlow.js v0.0.0');
                    expect(loadedArtifacts.convertedBy).toEqual(null);
                    test_util_1.expectArrayBuffersEqual(loadedArtifacts.weightData, weightData1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Save two models and load one', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightData2, artifacts2, handler1, saveResult1, handler2, saveResult2, loadedArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightData2 = new ArrayBuffer(24);
                    artifacts2 = {
                        modelTopology: modelTopology1,
                        weightSpecs: weightSpecs2,
                        weightData: weightData2,
                    };
                    handler1 = tf.io.getSaveHandlers('indexeddb://Model/1')[0];
                    return [4 /*yield*/, handler1.save(artifacts1)];
                case 1:
                    saveResult1 = _a.sent();
                    // Note: The following two assertions work only because there is no
                    // non-ASCII characters in `modelTopology1` and `weightSpecs1`.
                    expect(saveResult1.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult1.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs1).length);
                    expect(saveResult1.modelArtifactsInfo.weightDataBytes)
                        .toEqual(weightData1.byteLength);
                    handler2 = tf.io.getSaveHandlers('indexeddb://Model/2')[0];
                    return [4 /*yield*/, handler2.save(artifacts2)];
                case 2:
                    saveResult2 = _a.sent();
                    expect(saveResult2.modelArtifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(saveResult1.modelArtifactsInfo.dateSaved.getTime());
                    // Note: The following two assertions work only because there is
                    // no non-ASCII characters in `modelTopology1` and
                    // `weightSpecs1`.
                    expect(saveResult2.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult2.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs2).length);
                    expect(saveResult2.modelArtifactsInfo.weightDataBytes)
                        .toEqual(weightData2.byteLength);
                    return [4 /*yield*/, handler1.load()];
                case 3:
                    loadedArtifacts = _a.sent();
                    expect(loadedArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(loadedArtifacts.weightSpecs).toEqual(weightSpecs1);
                    test_util_1.expectArrayBuffersEqual(loadedArtifacts.weightData, weightData1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Loading nonexistent model fails', function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = tf.io.getSaveHandlers('indexeddb://NonexistentModel')[0];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, handler.load()];
                case 2:
                    _a.sent();
                    fail('Loading nonexistent model from IndexedDB succeeded unexpectly');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1.message)
                        .toEqual('Cannot find model with path \'NonexistentModel\' in IndexedDB.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Null, undefined or empty modelPath throws Error', function () {
        expect(function () { return indexed_db_1.browserIndexedDB(null); })
            .toThrowError(/IndexedDB, modelPath must not be null, undefined or empty/);
        expect(function () { return indexed_db_1.browserIndexedDB(undefined); })
            .toThrowError(/IndexedDB, modelPath must not be null, undefined or empty/);
        expect(function () { return indexed_db_1.browserIndexedDB(''); })
            .toThrowError(/IndexedDB, modelPath must not be null, undefined or empty./);
    });
    it('router', function () {
        expect(indexed_db_1.indexedDBRouter('indexeddb://bar') instanceof indexed_db_1.BrowserIndexedDB)
            .toEqual(true);
        expect(indexed_db_1.indexedDBRouter('localstorage://bar')).toBeNull();
        expect(indexed_db_1.indexedDBRouter('qux')).toBeNull();
    });
    it('Manager: List models: 0 result', function () { return __awaiter(_this, void 0, void 0, function () {
        var models;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new indexed_db_1.BrowserIndexedDBManager().listModels()];
                case 1:
                    models = _a.sent();
                    expect(models).toEqual({});
                    return [2 /*return*/];
            }
        });
    }); });
    it('Manager: List models: 1 result', function () { return __awaiter(_this, void 0, void 0, function () {
        var handler, saveResult, models;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler = tf.io.getSaveHandlers('indexeddb://baz/QuxModel')[0];
                    return [4 /*yield*/, handler.save(artifacts1)];
                case 1:
                    saveResult = _a.sent();
                    return [4 /*yield*/, new indexed_db_1.BrowserIndexedDBManager().listModels()];
                case 2:
                    models = _a.sent();
                    expect(Object.keys(models).length).toEqual(1);
                    expect(models['baz/QuxModel'].modelTopologyType)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyType);
                    expect(models['baz/QuxModel'].modelTopologyBytes)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyBytes);
                    expect(models['baz/QuxModel'].weightSpecsBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightSpecsBytes);
                    expect(models['baz/QuxModel'].weightDataBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightDataBytes);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Manager: List models: 2 results', function () { return __awaiter(_this, void 0, void 0, function () {
        var handler1, saveResult1, handler2, saveResult2, models;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler1 = tf.io.getSaveHandlers('indexeddb://QuxModel')[0];
                    return [4 /*yield*/, handler1.save(artifacts1)];
                case 1:
                    saveResult1 = _a.sent();
                    handler2 = tf.io.getSaveHandlers('indexeddb://repeat/QuxModel')[0];
                    return [4 /*yield*/, handler2.save(artifacts1)];
                case 2:
                    saveResult2 = _a.sent();
                    return [4 /*yield*/, new indexed_db_1.BrowserIndexedDBManager().listModels()];
                case 3:
                    models = _a.sent();
                    expect(Object.keys(models).length).toEqual(2);
                    expect(models['QuxModel'].modelTopologyType)
                        .toEqual(saveResult1.modelArtifactsInfo.modelTopologyType);
                    expect(models['QuxModel'].modelTopologyBytes)
                        .toEqual(saveResult1.modelArtifactsInfo.modelTopologyBytes);
                    expect(models['QuxModel'].weightSpecsBytes)
                        .toEqual(saveResult1.modelArtifactsInfo.weightSpecsBytes);
                    expect(models['QuxModel'].weightDataBytes)
                        .toEqual(saveResult1.modelArtifactsInfo.weightDataBytes);
                    expect(models['repeat/QuxModel'].modelTopologyType)
                        .toEqual(saveResult2.modelArtifactsInfo.modelTopologyType);
                    expect(models['repeat/QuxModel'].modelTopologyBytes)
                        .toEqual(saveResult2.modelArtifactsInfo.modelTopologyBytes);
                    expect(models['repeat/QuxModel'].weightSpecsBytes)
                        .toEqual(saveResult2.modelArtifactsInfo.weightSpecsBytes);
                    expect(models['repeat/QuxModel'].weightDataBytes)
                        .toEqual(saveResult2.modelArtifactsInfo.weightDataBytes);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Manager: Successful removeModel', function () { return __awaiter(_this, void 0, void 0, function () {
        var handler1, handler2, manager, models;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler1 = tf.io.getSaveHandlers('indexeddb://QuxModel')[0];
                    return [4 /*yield*/, handler1.save(artifacts1)];
                case 1:
                    _a.sent();
                    handler2 = tf.io.getSaveHandlers('indexeddb://repeat/QuxModel')[0];
                    return [4 /*yield*/, handler2.save(artifacts1)];
                case 2:
                    _a.sent();
                    manager = new indexed_db_1.BrowserIndexedDBManager();
                    return [4 /*yield*/, manager.removeModel('QuxModel')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, manager.listModels()];
                case 4:
                    models = _a.sent();
                    expect(Object.keys(models)).toEqual(['repeat/QuxModel']);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Manager: Successful removeModel with URL scheme', function () { return __awaiter(_this, void 0, void 0, function () {
        var handler1, handler2, manager, models;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    handler1 = tf.io.getSaveHandlers('indexeddb://QuxModel')[0];
                    return [4 /*yield*/, handler1.save(artifacts1)];
                case 1:
                    _a.sent();
                    handler2 = tf.io.getSaveHandlers('indexeddb://repeat/QuxModel')[0];
                    return [4 /*yield*/, handler2.save(artifacts1)];
                case 2:
                    _a.sent();
                    manager = new indexed_db_1.BrowserIndexedDBManager();
                    // Delete a model specified with a path that includes the
                    // indexeddb:// scheme prefix should work.
                    manager.removeModel('indexeddb://QuxModel');
                    return [4 /*yield*/, manager.listModels()];
                case 3:
                    models = _a.sent();
                    expect(Object.keys(models)).toEqual(['repeat/QuxModel']);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Manager: Failed removeModel', function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    // Attempt to delete a nonexistent model is expected to fail.
                    return [4 /*yield*/, new indexed_db_1.BrowserIndexedDBManager().removeModel('nonexistent')];
                case 1:
                    // Attempt to delete a nonexistent model is expected to fail.
                    _a.sent();
                    fail('Deleting nonexistent model succeeded unexpectedly.');
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    expect(err_2.message)
                        .toEqual('Cannot find model with path \'nonexistent\' in IndexedDB.');
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=indexed_db_test.js.map