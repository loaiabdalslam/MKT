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
var router_registry_1 = require("./router_registry");
jasmine_util_1.describeWithFlags('IORouterRegistry', jasmine_util_1.BROWSER_ENVS, function () {
    var localStorageRouter = function (url) {
        var scheme = 'localstorage://';
        if (url.startsWith(scheme)) {
            return local_storage_1.browserLocalStorage(url.slice(scheme.length));
        }
        else {
            return null;
        }
    };
    var indexedDBRouter = function (url) {
        var scheme = 'indexeddb://';
        if (url.startsWith(scheme)) {
            return indexed_db_1.browserIndexedDB(url.slice(scheme.length));
        }
        else {
            return null;
        }
    };
    var FakeIOHandler = /** @class */ (function () {
        function FakeIOHandler(url1, url2) {
        }
        return FakeIOHandler;
    }());
    var fakeMultiStringRouter = function (url) {
        var scheme = 'foo://';
        if (Array.isArray(url) && url.length === 2) {
            if (url[0].startsWith(scheme) && url[1].startsWith(scheme)) {
                return new FakeIOHandler(url[0], url[1]);
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    var tempRegistryInstance = null;
    beforeEach(function () {
        // Force reset registry for testing.
        // tslint:disable:no-any
        tempRegistryInstance = router_registry_1.IORouterRegistry.instance;
        router_registry_1.IORouterRegistry.instance = null;
        // tslint:enable:no-any
    });
    afterEach(function () {
        // tslint:disable-next-line:no-any
        router_registry_1.IORouterRegistry.instance = tempRegistryInstance;
    });
    it('getSaveHandler succeeds', function () {
        router_registry_1.IORouterRegistry.registerSaveRouter(localStorageRouter);
        router_registry_1.IORouterRegistry.registerSaveRouter(indexedDBRouter);
        var out1 = tf.io.getSaveHandlers('localstorage://foo-model');
        expect(out1.length).toEqual(1);
        expect(out1[0] instanceof local_storage_1.BrowserLocalStorage).toEqual(true);
        var out2 = tf.io.getSaveHandlers('indexeddb://foo-model');
        expect(out2.length).toEqual(1);
        expect(out2[0] instanceof indexed_db_1.BrowserIndexedDB).toEqual(true);
    });
    it('getLoadHandler succeeds', function () {
        router_registry_1.IORouterRegistry.registerLoadRouter(localStorageRouter);
        router_registry_1.IORouterRegistry.registerLoadRouter(indexedDBRouter);
        var out1 = tf.io.getLoadHandlers('localstorage://foo-model');
        expect(out1.length).toEqual(1);
        expect(out1[0] instanceof local_storage_1.BrowserLocalStorage).toEqual(true);
        var out2 = tf.io.getLoadHandlers('indexeddb://foo-model');
        expect(out2.length).toEqual(1);
        expect(out2[0] instanceof indexed_db_1.BrowserIndexedDB).toEqual(true);
    });
    it('getLoadHandler with string array argument succeeds', function () {
        router_registry_1.IORouterRegistry.registerLoadRouter(fakeMultiStringRouter);
        var loadHandler = router_registry_1.IORouterRegistry.getLoadHandlers(['foo:///123', 'foo:///456']);
        expect(loadHandler[0] instanceof FakeIOHandler).toEqual(true);
        expect(router_registry_1.IORouterRegistry.getLoadHandlers([
            'foo:///123', 'bar:///456'
        ])).toEqual([]);
        expect(router_registry_1.IORouterRegistry.getLoadHandlers(['foo:///123'])).toEqual([]);
        expect(router_registry_1.IORouterRegistry.getLoadHandlers('foo:///123')).toEqual([]);
    });
    it('getSaveHandler fails', function () {
        router_registry_1.IORouterRegistry.registerSaveRouter(localStorageRouter);
        expect(tf.io.getSaveHandlers('invalidscheme://foo-model')).toEqual([]);
        // Check there is no crosstalk between save and load handlers.
        expect(tf.io.getLoadHandlers('localstorage://foo-model')).toEqual([]);
    });
    var fakeOnProgressRouter = function (url, onProgress) {
        return new FakeOnProgressHandler(url, onProgress);
    };
    var FakeOnProgressHandler = /** @class */ (function () {
        function FakeOnProgressHandler(url, onProgress) {
            this.onProgress = onProgress;
        }
        Object.defineProperty(FakeOnProgressHandler.prototype, "onProgressCallback", {
            get: function () {
                return this.onProgress;
            },
            enumerable: true,
            configurable: true
        });
        return FakeOnProgressHandler;
    }());
    it('getLoadHandler onProgress', function () {
        router_registry_1.IORouterRegistry.registerLoadRouter(fakeOnProgressRouter);
        var onProgress = function (fraction) { };
        var loadHandler = tf.io.getLoadHandlers('foo:///123', onProgress);
        expect(loadHandler.length).toEqual(1);
        expect(loadHandler[0] instanceof FakeOnProgressHandler).toEqual(true);
        // Check callback function passed to IOHandler
        expect(loadHandler[0].onProgressCallback)
            .toBe(onProgress);
    });
});
//# sourceMappingURL=router_registry_test.js.map