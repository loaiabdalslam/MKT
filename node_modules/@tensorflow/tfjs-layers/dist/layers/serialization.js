"use strict";
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Use of this source code is governed by an MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 * =============================================================================
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* Original Source layers/__init__.py */
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var generic_utils_1 = require("../utils/generic_utils");
/**
 * Instantiate a layer from a config dictionary.
 * @param config dict of the form {class_name: str, config: dict}
 * @param customObjects dict mapping class names (or function names)
 *   of custom (non-Keras) objects to class/functions
 * @param fastWeightInit Optional flag to use fast weight initialization
 *   during deserialization. This is applicable to cases in which
 *   the initialization will be immediately overwritten by loaded weight
 *   values. Default: `false`.
 * @returns Layer instance (may be LayersModel, Sequential, Layer...)
 */
function deserialize(config, customObjects, fastWeightInit) {
    if (customObjects === void 0) { customObjects = {}; }
    if (fastWeightInit === void 0) { fastWeightInit = false; }
    return generic_utils_1.deserializeKerasObject(config, tfjs_core_1.serialization.SerializationMap.getMap().classNameMap, customObjects, 'layer', fastWeightInit);
}
exports.deserialize = deserialize;
//# sourceMappingURL=serialization.js.map