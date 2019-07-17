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
 * Unit tests for file-related IOHandlers.
 */
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var browser_files_1 = require("./browser_files");
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
jasmine_util_1.describeWithFlags('browserDownloads', jasmine_util_1.BROWSER_ENVS, function () {
    var FakeHTMLAnchorElement = /** @class */ (function () {
        function FakeHTMLAnchorElement() {
            this.clicked = 0;
        }
        FakeHTMLAnchorElement.prototype.dispatchEvent = function () {
            this.clicked++;
        };
        return FakeHTMLAnchorElement;
    }());
    var fakeAnchors = [];
    var fakeAnchorCount = 0;
    beforeEach(function () {
        fakeAnchorCount = 0;
        fakeAnchors = [new FakeHTMLAnchorElement(), new FakeHTMLAnchorElement()];
        spyOn(document, 'createElement').and.callFake(function (tag) {
            return fakeAnchors[fakeAnchorCount++];
        });
    });
    it('Explicit file name prefix, with existing anchors', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStartDate, downloadTrigger, saveResult, artifactsInfo, jsonAnchor, weightDataAnchor, jsonContent, modelTopologyAndWeightsManifest, _a, _b, weightsManifest, response, buffer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testStartDate = new Date();
                    downloadTrigger = tf.io.getSaveHandlers('downloads://test-model')[0];
                    return [4 /*yield*/, downloadTrigger.save(artifacts1)];
                case 1:
                    saveResult = _c.sent();
                    expect(saveResult.errors).toEqual(undefined);
                    artifactsInfo = saveResult.modelArtifactsInfo;
                    expect(artifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(testStartDate.getTime());
                    expect(saveResult.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs1).length);
                    expect(saveResult.modelArtifactsInfo.weightDataBytes).toEqual(16);
                    jsonAnchor = fakeAnchors[0];
                    weightDataAnchor = fakeAnchors[1];
                    expect(jsonAnchor.download).toEqual('test-model.json');
                    expect(weightDataAnchor.download).toEqual('test-model.weights.bin');
                    return [4 /*yield*/, fetch(jsonAnchor.href)];
                case 2:
                    jsonContent = _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, jsonContent.text()];
                case 3:
                    modelTopologyAndWeightsManifest = _b.apply(_a, [_c.sent()]);
                    expect(modelTopologyAndWeightsManifest.modelTopology)
                        .toEqual(modelTopology1);
                    expect(modelTopologyAndWeightsManifest.format).toEqual('layers-model');
                    expect(modelTopologyAndWeightsManifest.generatedBy)
                        .toEqual('TensorFlow.js v0.0.0');
                    expect(modelTopologyAndWeightsManifest.convertedBy).toEqual(null);
                    weightsManifest = modelTopologyAndWeightsManifest.weightsManifest;
                    expect(weightsManifest.length).toEqual(1);
                    expect(weightsManifest[0].paths).toEqual(['./test-model.weights.bin']);
                    expect(weightsManifest[0].weights).toEqual(weightSpecs1);
                    return [4 /*yield*/, fetch(weightDataAnchor.href)];
                case 4:
                    response = _c.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 5:
                    buffer = _c.sent();
                    expect(buffer).toEqual(weightData1);
                    // Verify that the downloads are triggered through clicks.
                    expect(jsonAnchor.clicked).toEqual(1);
                    expect(weightDataAnchor.clicked).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('URL scheme in explicit name gets stripped', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStartDate, downloadTrigger, saveResult, artifactsInfo, jsonAnchor, weightDataAnchor, jsonContent, modelTopologyAndWeightsManifest, _a, _b, weightsManifest, response, buffer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testStartDate = new Date();
                    downloadTrigger = browser_files_1.browserDownloads('downloads://test-model');
                    return [4 /*yield*/, downloadTrigger.save(artifacts1)];
                case 1:
                    saveResult = _c.sent();
                    expect(saveResult.errors).toEqual(undefined);
                    artifactsInfo = saveResult.modelArtifactsInfo;
                    expect(artifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(testStartDate.getTime());
                    expect(saveResult.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs1).length);
                    expect(saveResult.modelArtifactsInfo.weightDataBytes).toEqual(16);
                    jsonAnchor = fakeAnchors[0];
                    weightDataAnchor = fakeAnchors[1];
                    expect(jsonAnchor.download).toEqual('test-model.json');
                    expect(weightDataAnchor.download).toEqual('test-model.weights.bin');
                    return [4 /*yield*/, fetch(jsonAnchor.href)];
                case 2:
                    jsonContent = _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, jsonContent.text()];
                case 3:
                    modelTopologyAndWeightsManifest = _b.apply(_a, [_c.sent()]);
                    expect(modelTopologyAndWeightsManifest.modelTopology)
                        .toEqual(modelTopology1);
                    weightsManifest = modelTopologyAndWeightsManifest.weightsManifest;
                    expect(weightsManifest.length).toEqual(1);
                    expect(weightsManifest[0].paths).toEqual(['./test-model.weights.bin']);
                    expect(weightsManifest[0].weights).toEqual(weightSpecs1);
                    return [4 /*yield*/, fetch(weightDataAnchor.href)];
                case 4:
                    response = _c.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 5:
                    buffer = _c.sent();
                    expect(buffer).toEqual(weightData1);
                    // Verify that the downloads are triggered through clicks.
                    expect(jsonAnchor.clicked).toEqual(1);
                    expect(weightDataAnchor.clicked).toEqual(1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('No file name provided, with existing anchors', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStartDate, downloadTrigger, saveResult, artifactsInfo, jsonAnchor, weightDataAnchor, jsonContent, modelTopologyAndWeightsManifest, _a, _b, weightsManifest, response, buffer;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testStartDate = new Date();
                    downloadTrigger = browser_files_1.browserDownloads();
                    return [4 /*yield*/, downloadTrigger.save(artifacts1)];
                case 1:
                    saveResult = _c.sent();
                    expect(saveResult.errors).toEqual(undefined);
                    artifactsInfo = saveResult.modelArtifactsInfo;
                    expect(artifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(testStartDate.getTime());
                    expect(saveResult.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult.modelArtifactsInfo.weightSpecsBytes)
                        .toEqual(JSON.stringify(weightSpecs1).length);
                    expect(saveResult.modelArtifactsInfo.weightDataBytes).toEqual(16);
                    jsonAnchor = fakeAnchors[0];
                    weightDataAnchor = fakeAnchors[1];
                    // Verify that the default file names are used.
                    expect(jsonAnchor.download).toEqual('model.json');
                    expect(weightDataAnchor.download).toEqual('model.weights.bin');
                    return [4 /*yield*/, fetch(jsonAnchor.href)];
                case 2:
                    jsonContent = _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, jsonContent.text()];
                case 3:
                    modelTopologyAndWeightsManifest = _b.apply(_a, [_c.sent()]);
                    expect(modelTopologyAndWeightsManifest.modelTopology)
                        .toEqual(modelTopology1);
                    weightsManifest = modelTopologyAndWeightsManifest.weightsManifest;
                    expect(weightsManifest.length).toEqual(1);
                    expect(weightsManifest[0].paths).toEqual(['./model.weights.bin']);
                    expect(weightsManifest[0].weights).toEqual(weightSpecs1);
                    return [4 /*yield*/, fetch(weightDataAnchor.href)];
                case 4:
                    response = _c.sent();
                    return [4 /*yield*/, response.arrayBuffer()];
                case 5:
                    buffer = _c.sent();
                    expect(buffer).toEqual(weightData1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Download only model topology', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStartDate, downloadTrigger, modelTopologyOnlyArtifacts, saveResult, artifactsInfo, jsonAnchor, weightDataAnchor, jsonContent, modelTopologyAndWeightsManifest, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    testStartDate = new Date();
                    downloadTrigger = browser_files_1.browserDownloads();
                    modelTopologyOnlyArtifacts = {
                        modelTopology: modelTopology1,
                    };
                    return [4 /*yield*/, downloadTrigger.save(modelTopologyOnlyArtifacts)];
                case 1:
                    saveResult = _c.sent();
                    expect(saveResult.errors).toEqual(undefined);
                    artifactsInfo = saveResult.modelArtifactsInfo;
                    expect(artifactsInfo.dateSaved.getTime())
                        .toBeGreaterThanOrEqual(testStartDate.getTime());
                    expect(saveResult.modelArtifactsInfo.modelTopologyBytes)
                        .toEqual(JSON.stringify(modelTopology1).length);
                    expect(saveResult.modelArtifactsInfo.weightSpecsBytes).toEqual(0);
                    expect(saveResult.modelArtifactsInfo.weightDataBytes).toEqual(0);
                    jsonAnchor = fakeAnchors[0];
                    weightDataAnchor = fakeAnchors[1];
                    // Verify that the default file names are used.
                    expect(jsonAnchor.download).toEqual('model.json');
                    expect(jsonAnchor.clicked).toEqual(1);
                    // The weight file should not have been downoaded.
                    expect(weightDataAnchor.download).toEqual(undefined);
                    expect(weightDataAnchor.clicked).toEqual(0);
                    return [4 /*yield*/, fetch(jsonAnchor.href)];
                case 2:
                    jsonContent = _c.sent();
                    _b = (_a = JSON).parse;
                    return [4 /*yield*/, jsonContent.text()];
                case 3:
                    modelTopologyAndWeightsManifest = _b.apply(_a, [_c.sent()]);
                    expect(modelTopologyAndWeightsManifest.modelTopology)
                        .toEqual(modelTopology1);
                    return [2 /*return*/];
            }
        });
    }); });
    it('browserDownloadsRouter', function () {
        expect(browser_files_1.browserDownloadsRouter('downloads://foo') instanceof browser_files_1.BrowserDownloads)
            .toEqual(true);
        expect(browser_files_1.browserDownloadsRouter('invaliddownloads://foo')).toBeNull();
        expect(browser_files_1.browserDownloadsRouter('foo')).toBeNull();
    });
});
jasmine_util_1.describeWithFlags('browserFiles', jasmine_util_1.BROWSER_ENVS, function () {
    var weightsFile = new File([weightData1], 'model.weights.bin', { type: 'application/octet-stream' });
    it('One group, one path', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightsManifest, weightsTopologyAndManifest, jsonFile, filesHandler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightsManifest = [{
                            paths: ['./model.weights.bin'],
                            weights: weightSpecs1,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile]);
                    return [4 /*yield*/, filesHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs).toEqual(weightSpecs1);
                    expect(new Uint8Array(modelArtifacts.weightData))
                        .toEqual(new Uint8Array(weightData1));
                    return [2 /*return*/];
            }
        });
    }); });
    it("One group, two paths", function () { return __awaiter(_this, void 0, void 0, function () {
        var weightSpecs, weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, jsonFile, filesHandler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightSpecs = [
                        {
                            name: 'foo',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'bar',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightsManifest = [{
                            paths: ['./dir1/model.weights.1.bin', './dir2/model.weights.2.bin'],
                            weights: weightSpecs,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 2, 3, 4]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 20, 30, 40]).buffer], 'model.weights.2.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile1, weightsFile2]);
                    return [4 /*yield*/, filesHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs).toEqual(weightSpecs);
                    expect(new Uint8Array(modelArtifacts.weightData)).toEqual(new Uint8Array([
                        1, 2, 3, 4, 10, 20, 30, 40
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Two groups, four paths, reverseOrder=false", function () { return __awaiter(_this, void 0, void 0, function () {
        var weightSpecs1, weightSpecs2, weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, weightsFile3, weightsFile4, jsonFile, filesHandler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightSpecs1 = [
                        {
                            name: 'foo',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'bar',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightSpecs2 = [
                        {
                            name: 'baz',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'qux',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightsManifest = [
                        {
                            paths: ['./model.weights.1.bin', './model.weights.2.bin'],
                            weights: weightSpecs1,
                        },
                        {
                            paths: ['./model.weights.3.bin', './model.weights.4.bin'],
                            weights: weightSpecs2,
                        }
                    ];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 3, 5, 7]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 30, 50, 70]).buffer], 'model.weights.2.bin', { type: 'application/octet-stream' });
                    weightsFile3 = new File([new Uint8Array([2, 4, 6, 8]).buffer], 'model.weights.3.bin', { type: 'application/octet-stream' });
                    weightsFile4 = new File([new Uint8Array([20, 40, 60, 80]).buffer], 'model.weights.4.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile1, weightsFile2, weightsFile3, weightsFile4]);
                    return [4 /*yield*/, filesHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs)
                        .toEqual(weightSpecs1.concat(weightSpecs2));
                    expect(new Uint8Array(modelArtifacts.weightData)).toEqual(new Uint8Array([
                        1, 3, 5, 7, 10, 30, 50, 70, 2, 4, 6, 8, 20, 40, 60, 80
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it("Two groups, four paths, reverseOrder=true", function () { return __awaiter(_this, void 0, void 0, function () {
        var weightSpecs1, weightSpecs2, weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, weightsFile3, weightsFile4, jsonFile, filesHandler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightSpecs1 = [
                        {
                            name: 'foo',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'bar',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightSpecs2 = [
                        {
                            name: 'baz',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'qux',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightsManifest = [
                        {
                            paths: ['./model.weights.1.bin', './model.weights.2.bin'],
                            weights: weightSpecs1,
                        },
                        {
                            paths: ['./model.weights.3.bin', './model.weights.4.bin'],
                            weights: weightSpecs2,
                        }
                    ];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 3, 5, 7]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 30, 50, 70]).buffer], 'model.weights.2.bin', { type: 'application/octet-stream' });
                    weightsFile3 = new File([new Uint8Array([2, 4, 6, 8]).buffer], 'model.weights.3.bin', { type: 'application/octet-stream' });
                    weightsFile4 = new File([new Uint8Array([20, 40, 60, 80]).buffer], 'model.weights.4.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile4, weightsFile3, weightsFile2, weightsFile1]);
                    return [4 /*yield*/, filesHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs)
                        .toEqual(weightSpecs1.concat(weightSpecs2));
                    expect(new Uint8Array(modelArtifacts.weightData)).toEqual(new Uint8Array([
                        1, 3, 5, 7, 10, 30, 50, 70, 2, 4, 6, 8, 20, 40, 60, 80
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('Upload model topology only', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightsManifest, weightsTopologyAndManifest, jsonFile, filesHandler, modelArtifacts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightsManifest = [{
                            paths: ['./model.weights.bin'],
                            weights: weightSpecs1,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile]);
                    return [4 /*yield*/, filesHandler.load()];
                case 1:
                    modelArtifacts = _a.sent();
                    expect(modelArtifacts.modelTopology).toEqual(modelTopology1);
                    expect(modelArtifacts.weightSpecs).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Mismatch in number of paths and number of files', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, jsonFile, filesHandler, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightsManifest = [{
                            paths: ['./model.weights.1.bin'],
                            weights: weightSpecs1,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: weightSpecs1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 2, 3, 4]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 20, 30, 40]).buffer], 'model.weights.2.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile2, weightsFile1]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, filesHandler.load()];
                case 2:
                    _a.sent();
                    fail('Loading with mismatch in number of paths and number of files ' +
                        'succeeded unexpectedly.');
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    expect(err_1.message)
                        .toEqual('Mismatch in the number of files in weights manifest (1) ' +
                        'and the number of weight files provided (2).');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Mismatch in manifest paths and file names', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightSpecs, weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, jsonFile, filesHandler, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightSpecs = [
                        {
                            name: 'foo',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'bar',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightsManifest = [{
                            paths: ['./model.weights.1.bin', './model.weights.2.bin'],
                            weights: weightSpecs,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 2, 3, 4]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 20, 30, 40]).buffer], 'model.weights.3.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile1, weightsFile2]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, filesHandler.load()];
                case 2:
                    _a.sent();
                    fail('Loading with mismatching paths and file names ' +
                        'succeeded unexpectedly.');
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    expect(err_2.message)
                        .toEqual('Weight file with basename \'model.weights.2.bin\' is not ' +
                        'provided.');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Duplicate basenames in paths fails', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightSpecs, weightsManifest, weightsTopologyAndManifest, weightsFile1, weightsFile2, jsonFile, filesHandler, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightSpecs = [
                        {
                            name: 'foo',
                            shape: [1, 1],
                            dtype: 'float32',
                        },
                        {
                            name: 'bar',
                            shape: [1, 1],
                            dtype: 'float32',
                        }
                    ];
                    weightsManifest = [{
                            paths: ['./dir1/model.weights.1.bin', './dir2/model.weights.1.bin'],
                            weights: weightSpecs,
                        }];
                    weightsTopologyAndManifest = {
                        modelTopology: modelTopology1,
                        weightsManifest: weightsManifest,
                    };
                    weightsFile1 = new File([new Uint8Array([1, 2, 3, 4]).buffer], 'model.weights.1.bin', { type: 'application/octet-stream' });
                    weightsFile2 = new File([new Uint8Array([10, 20, 30, 40]).buffer], 'model.weights.2.bin', { type: 'application/octet-stream' });
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile1, weightsFile2]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, filesHandler.load()];
                case 2:
                    _a.sent();
                    fail('Loading with duplicate basenames in paths succeeded unexpectedly.');
                    return [3 /*break*/, 4];
                case 3:
                    err_3 = _a.sent();
                    expect(err_3.message)
                        .toEqual('Duplicate file basename found in weights manifest: ' +
                        '\'model.weights.1.bin\'');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Missing modelTopology from JSON leads to Error', function () { return __awaiter(_this, void 0, void 0, function () {
        var weightsManifest, weightsTopologyAndManifest, jsonFile, filesHandler, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    weightsManifest = [{
                            paths: ['./model.weights.bin'],
                            weights: weightSpecs1,
                        }];
                    weightsTopologyAndManifest = {
                        weightsManifest: weightsManifest,
                    };
                    jsonFile = new File([JSON.stringify(weightsTopologyAndManifest)], 'model.json', { type: 'application/json' });
                    filesHandler = tf.io.browserFiles([jsonFile, weightsFile]);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, filesHandler.load()];
                case 2:
                    _a.sent();
                    fail('Loading with Files IOHandler with missing modelTopology ' +
                        'succeeded unexpectedly.');
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    expect(err_4.message)
                        .toMatch(/modelTopology field is missing from file model\.json/);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it('Incorrect number of files leads to Error', function () {
        expect(function () { return tf.io.browserFiles(null); }).toThrowError(/at least 1 file/);
        expect(function () { return tf.io.browserFiles([]); }).toThrowError(/at least 1 file/);
    });
});
//# sourceMappingURL=browser_files_test.js.map