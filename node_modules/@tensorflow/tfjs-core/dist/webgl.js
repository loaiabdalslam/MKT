"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
var gpgpu_util = require("./backends/webgl/gpgpu_util");
exports.gpgpu_util = gpgpu_util;
var webgl_util = require("./backends/webgl/webgl_util");
exports.webgl_util = webgl_util;
var backend_webgl_1 = require("./backends/webgl/backend_webgl");
exports.MathBackendWebGL = backend_webgl_1.MathBackendWebGL;
var canvas_util_1 = require("./backends/webgl/canvas_util");
exports.setWebGLContext = canvas_util_1.setWebGLContext;
var gpgpu_context_1 = require("./backends/webgl/gpgpu_context");
exports.GPGPUContext = gpgpu_context_1.GPGPUContext;
//# sourceMappingURL=webgl.js.map