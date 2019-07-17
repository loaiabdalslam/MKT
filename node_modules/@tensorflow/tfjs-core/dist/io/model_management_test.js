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
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var indexed_db_1 = require("./indexed_db");
var local_storage_1 = require("./local_storage");
// Disabled for non-Chrome browsers due to:
// https://github.com/tensorflow/tfjs/issues/427
jasmine_util_1.describeWithFlags('ModelManagement', jasmine_util_1.CHROME_ENVS, function () {
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
    };
    beforeEach(function (done) {
        local_storage_1.purgeLocalStorageArtifacts();
        indexed_db_1.deleteDatabase().then(function () {
            done();
        });
    });
    afterEach(function (done) {
        local_storage_1.purgeLocalStorageArtifacts();
        indexed_db_1.deleteDatabase().then(function () {
            done();
        });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('List models: 0 result', function (done) {
        // Before any model is saved, listModels should return empty result.
        tf.io.listModels()
            .then(function (out) {
            expect(out).toEqual({});
            done();
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('List models: 1 result', function (done) {
        var url = 'localstorage://baz/QuxModel';
        var handler = tf.io.getSaveHandlers(url)[0];
        handler.save(artifacts1)
            .then(function (saveResult) {
            // After successful saving, there should be one model.
            tf.io.listModels()
                .then(function (out) {
                expect(Object.keys(out).length).toEqual(1);
                expect(out[url].modelTopologyType)
                    .toEqual(saveResult.modelArtifactsInfo.modelTopologyType);
                expect(out[url].modelTopologyBytes)
                    .toEqual(saveResult.modelArtifactsInfo.modelTopologyBytes);
                expect(out[url].weightSpecsBytes)
                    .toEqual(saveResult.modelArtifactsInfo.weightSpecsBytes);
                expect(out[url].weightDataBytes)
                    .toEqual(saveResult.modelArtifactsInfo.weightDataBytes);
                done();
            })
                .catch(function (err) { return done.fail(err.stack); });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('Manager: List models: 2 results in 2 mediums', function (done) {
        var url1 = 'localstorage://QuxModel';
        var url2 = 'indexeddb://QuxModel';
        // First, save a model in Local Storage.
        var handler1 = tf.io.getSaveHandlers(url1)[0];
        handler1.save(artifacts1)
            .then(function (saveResult1) {
            // Then, save the model in IndexedDB.
            var handler2 = tf.io.getSaveHandlers(url2)[0];
            handler2.save(artifacts1)
                .then(function (saveResult2) {
                // After successful saving, there should be two models.
                tf.io.listModels()
                    .then(function (out) {
                    expect(Object.keys(out).length).toEqual(2);
                    expect(out[url1].modelTopologyType)
                        .toEqual(saveResult1.modelArtifactsInfo.modelTopologyType);
                    expect(out[url1].modelTopologyBytes)
                        .toEqual(saveResult1.modelArtifactsInfo
                        .modelTopologyBytes);
                    expect(out[url1].weightSpecsBytes)
                        .toEqual(saveResult1.modelArtifactsInfo.weightSpecsBytes);
                    expect(out[url1].weightDataBytes)
                        .toEqual(saveResult1.modelArtifactsInfo.weightDataBytes);
                    expect(out[url2].modelTopologyType)
                        .toEqual(saveResult2.modelArtifactsInfo.modelTopologyType);
                    expect(out[url2].modelTopologyBytes)
                        .toEqual(saveResult2.modelArtifactsInfo
                        .modelTopologyBytes);
                    expect(out[url2].weightSpecsBytes)
                        .toEqual(saveResult2.modelArtifactsInfo.weightSpecsBytes);
                    expect(out[url2].weightDataBytes)
                        .toEqual(saveResult2.modelArtifactsInfo.weightDataBytes);
                    done();
                })
                    .catch(function (err) { return done.fail(err.stack); });
            })
                .catch(function (err) { return done.fail(err.stack); });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('Successful removeModel', function (done) {
        // First, save a model.
        var handler1 = tf.io.getSaveHandlers('localstorage://QuxModel')[0];
        handler1.save(artifacts1)
            .then(function (saveResult1) {
            // Then, save the model under another path.
            var handler2 = tf.io.getSaveHandlers('indexeddb://repeat/QuxModel')[0];
            handler2.save(artifacts1)
                .then(function (saveResult2) {
                // After successful saving, delete the first save, and then
                // `listModel` should give only one result.
                // Delete a model specified with a path that includes the
                // indexeddb:// scheme prefix should work.
                tf.io.removeModel('indexeddb://repeat/QuxModel')
                    .then(function (deletedInfo) {
                    tf.io.listModels()
                        .then(function (out) {
                        expect(Object.keys(out)).toEqual([
                            'localstorage://QuxModel'
                        ]);
                        tf.io.removeModel('localstorage://QuxModel')
                            .then(function (out) {
                            // The delete the remaining model.
                            tf.io.listModels()
                                .then(function (out) {
                                expect(Object.keys(out)).toEqual([]);
                                done();
                            })
                                .catch(function (err) { return done.fail(err); });
                        })
                            .catch(function (err) { return done.fail(err); });
                    })
                        .catch(function (err) { return done.fail(err); });
                })
                    .catch(function (err) { return done.fail(err.stack); });
            })
                .catch(function (err) { return done.fail(err.stack); });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('Successful copyModel between mediums', function (done) {
        var url1 = 'localstorage://a1/FooModel';
        var url2 = 'indexeddb://a1/FooModel';
        // First, save a model.
        var handler1 = tf.io.getSaveHandlers(url1)[0];
        handler1.save(artifacts1)
            .then(function (saveResult) {
            // Once model is saved, copy the model to another path.
            tf.io.copyModel(url1, url2)
                .then(function (modelInfo) {
                tf.io.listModels().then(function (out) {
                    expect(Object.keys(out).length).toEqual(2);
                    expect(out[url1].modelTopologyType)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyType);
                    expect(out[url1].modelTopologyBytes)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyBytes);
                    expect(out[url1].weightSpecsBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightSpecsBytes);
                    expect(out[url1].weightDataBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightDataBytes);
                    expect(out[url2].modelTopologyType)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyType);
                    expect(out[url2].modelTopologyBytes)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyBytes);
                    expect(out[url2].weightSpecsBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightSpecsBytes);
                    expect(out[url2].weightDataBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightDataBytes);
                    // Load the copy and verify the content.
                    var handler2 = tf.io.getLoadHandlers(url2)[0];
                    handler2.load()
                        .then(function (loaded) {
                        expect(loaded.modelTopology).toEqual(modelTopology1);
                        expect(loaded.weightSpecs).toEqual(weightSpecs1);
                        expect(new Uint8Array(loaded.weightData))
                            .toEqual(new Uint8Array(weightData1));
                        done();
                    })
                        .catch(function (err) { return done.fail(err.stack); });
                });
            })
                .catch(function (err) { return done.fail(err.stack); });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    // TODO(cais): Reenable this test once we fix
    // https://github.com/tensorflow/tfjs/issues/1198
    // tslint:disable-next-line:ban
    xit('Successful moveModel between mediums', function (done) {
        var url1 = 'localstorage://a1/FooModel';
        var url2 = 'indexeddb://a1/FooModel';
        // First, save a model.
        var handler1 = tf.io.getSaveHandlers(url1)[0];
        handler1.save(artifacts1)
            .then(function (saveResult) {
            // Once model is saved, move the model to another path.
            tf.io.moveModel(url1, url2)
                .then(function (modelInfo) {
                tf.io.listModels().then(function (out) {
                    expect(Object.keys(out)).toEqual([url2]);
                    expect(out[url2].modelTopologyType)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyType);
                    expect(out[url2].modelTopologyBytes)
                        .toEqual(saveResult.modelArtifactsInfo.modelTopologyBytes);
                    expect(out[url2].weightSpecsBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightSpecsBytes);
                    expect(out[url2].weightDataBytes)
                        .toEqual(saveResult.modelArtifactsInfo.weightDataBytes);
                    // Load the copy and verify the content.
                    var handler2 = tf.io.getLoadHandlers(url2)[0];
                    handler2.load()
                        .then(function (loaded) {
                        expect(loaded.modelTopology).toEqual(modelTopology1);
                        expect(loaded.weightSpecs).toEqual(weightSpecs1);
                        expect(new Uint8Array(loaded.weightData))
                            .toEqual(new Uint8Array(weightData1));
                        done();
                    })
                        .catch(function (err) {
                        done.fail(err.stack);
                    });
                });
            })
                .catch(function (err) { return done.fail(err.stack); });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    it('Failed copyModel to invalid source URL', function (done) {
        var url1 = 'invalidurl';
        var url2 = 'localstorage://a1/FooModel';
        tf.io.copyModel(url1, url2)
            .then(function (out) {
            done.fail('Copying from invalid URL succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Copying failed because no load handler is found for ' +
                'source URL invalidurl.');
            done();
        });
    });
    it('Failed copyModel to invalid destination URL', function (done) {
        var url1 = 'localstorage://a1/FooModel';
        var url2 = 'invalidurl';
        // First, save a model.
        var handler1 = tf.io.getSaveHandlers(url1)[0];
        handler1.save(artifacts1)
            .then(function (saveResult) {
            // Once model is saved, copy the model to another path.
            tf.io.copyModel(url1, url2)
                .then(function (out) {
                done.fail('Copying to invalid URL succeeded unexpectedly.');
            })
                .catch(function (err) {
                expect(err.message)
                    .toEqual('Copying failed because no save handler is found for ' +
                    'destination URL invalidurl.');
                done();
            });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    it('Failed moveModel to invalid destination URL', function (done) {
        var url1 = 'localstorage://a1/FooModel';
        var url2 = 'invalidurl';
        // First, save a model.
        var handler1 = tf.io.getSaveHandlers(url1)[0];
        handler1.save(artifacts1)
            .then(function (saveResult) {
            // Once model is saved, copy the model to an invalid path, which
            // should fail.
            tf.io.moveModel(url1, url2)
                .then(function (out) {
                done.fail('Copying to invalid URL succeeded unexpectedly.');
            })
                .catch(function (err) {
                expect(err.message)
                    .toEqual('Copying failed because no save handler is found for ' +
                    'destination URL invalidurl.');
                // Verify that the source has not been removed.
                tf.io.listModels()
                    .then(function (out) {
                    expect(Object.keys(out)).toEqual([url1]);
                    done();
                })
                    .catch(function (err) { return done.fail(err.stack); });
            });
        })
            .catch(function (err) { return done.fail(err.stack); });
    });
    it('Failed deletedModel: Absent scheme', function (done) {
        // Attempt to delete a nonexistent model is expected to fail.
        tf.io.removeModel('foo')
            .then(function (out) {
            done.fail('Removing model with missing scheme succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toMatch(/The url string provided does not contain a scheme/);
            expect(err.message.indexOf('localstorage')).toBeGreaterThan(0);
            expect(err.message.indexOf('indexeddb')).toBeGreaterThan(0);
            done();
        });
    });
    it('Failed deletedModel: Invalid scheme', function (done) {
        // Attempt to delete a nonexistent model is expected to fail.
        tf.io.removeModel('invalidscheme://foo')
            .then(function (out) {
            done.fail('Removing nonexistent model succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Cannot find model manager for scheme \'invalidscheme\'');
            done();
        });
    });
    it('Failed deletedModel: Nonexistent model', function (done) {
        // Attempt to delete a nonexistent model is expected to fail.
        tf.io.removeModel('indexeddb://nonexistent')
            .then(function (out) {
            done.fail('Removing nonexistent model succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Cannot find model with path \'nonexistent\' in IndexedDB.');
            done();
        });
    });
    it('Failed copyModel', function (done) {
        // Attempt to copy a nonexistent model should fail.
        tf.io.copyModel('indexeddb://nonexistent', 'indexeddb://destination')
            .then(function (out) {
            done.fail('Copying nonexistent model succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Cannot find model with path \'nonexistent\' in IndexedDB.');
            done();
        });
    });
    it('copyModel: Identical oldPath and newPath leads to Error', function (done) {
        tf.io.copyModel('a/1', 'a/1')
            .then(function (out) {
            done.fail('Copying with identical old & new paths succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Old path and new path are the same: \'a/1\'');
            done();
        });
    });
    it('moveModel: Identical oldPath and newPath leads to Error', function (done) {
        tf.io.moveModel('a/1', 'a/1')
            .then(function (out) {
            done.fail('Copying with identical old & new paths succeeded unexpectedly.');
        })
            .catch(function (err) {
            expect(err.message)
                .toEqual('Old path and new path are the same: \'a/1\'');
            done();
        });
    });
});
//# sourceMappingURL=model_management_test.js.map