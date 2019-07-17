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
var IORouterRegistry = /** @class */ (function () {
    function IORouterRegistry() {
        this.saveRouters = [];
        this.loadRouters = [];
    }
    IORouterRegistry.getInstance = function () {
        if (IORouterRegistry.instance == null) {
            IORouterRegistry.instance = new IORouterRegistry();
        }
        return IORouterRegistry.instance;
    };
    /**
     * Register a save-handler router.
     *
     * @param saveRouter A function that maps a URL-like string onto an instance
     * of `IOHandler` with the `save` method defined or `null`.
     */
    IORouterRegistry.registerSaveRouter = function (saveRouter) {
        IORouterRegistry.getInstance().saveRouters.push(saveRouter);
    };
    /**
     * Register a load-handler router.
     *
     * @param loadRouter A function that maps a URL-like string onto an instance
     * of `IOHandler` with the `load` method defined or `null`.
     */
    IORouterRegistry.registerLoadRouter = function (loadRouter) {
        IORouterRegistry.getInstance().loadRouters.push(loadRouter);
    };
    /**
     * Look up IOHandler for saving, given a URL-like string.
     *
     * @param url
     * @returns If only one match is found, an instance of IOHandler with the
     * `save` method defined. If no match is found, `null`.
     * @throws Error, if more than one match is found.
     */
    IORouterRegistry.getSaveHandlers = function (url) {
        return IORouterRegistry.getHandlers(url, 'save');
    };
    /**
     * Look up IOHandler for loading, given a URL-like string.
     *
     * @param url
     * @param onProgress Optional, progress callback function, fired periodically
     *   before the load is completed.
     * @returns All valid handlers for `url`, given the currently registered
     *   handler routers.
     */
    IORouterRegistry.getLoadHandlers = function (url, onProgress) {
        return IORouterRegistry.getHandlers(url, 'load', onProgress);
    };
    IORouterRegistry.getHandlers = function (url, handlerType, onProgress) {
        var validHandlers = [];
        var routers = handlerType === 'load' ?
            IORouterRegistry.getInstance().loadRouters :
            IORouterRegistry.getInstance().saveRouters;
        routers.forEach(function (router) {
            var handler = router(url, onProgress);
            if (handler !== null) {
                validHandlers.push(handler);
            }
        });
        return validHandlers;
    };
    return IORouterRegistry;
}());
exports.IORouterRegistry = IORouterRegistry;
exports.registerSaveRouter = function (loudRouter) {
    return IORouterRegistry.registerSaveRouter(loudRouter);
};
exports.registerLoadRouter = function (loudRouter) {
    return IORouterRegistry.registerLoadRouter(loudRouter);
};
exports.getSaveHandlers = function (url) {
    return IORouterRegistry.getSaveHandlers(url);
};
exports.getLoadHandlers = function (url, onProgress) {
    return IORouterRegistry.getLoadHandlers(url, onProgress);
};
//# sourceMappingURL=router_registry.js.map