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
var input_config_1 = require("../input_config");
var advanced_activation_serialization_1 = require("./advanced_activation_serialization");
var convolutional_depthwise_serialization_1 = require("./convolutional_depthwise_serialization");
var convolutional_serialization_1 = require("./convolutional_serialization");
var core_serialization_1 = require("./core_serialization");
var embeddings_serialization_1 = require("./embeddings_serialization");
var merge_serialization_1 = require("./merge_serialization");
var normalization_serialization_1 = require("./normalization_serialization");
var padding_serialization_1 = require("./padding_serialization");
var pooling_serialization_1 = require("./pooling_serialization");
var recurrent_serialization_1 = require("./recurrent_serialization");
/**
 * A string array of valid Layer class names.
 *
 * This is guaranteed to match the `LayerClassName` union type.
 */
exports.layerClassNames = advanced_activation_serialization_1.advancedActivationLayerClassNames.concat(convolutional_depthwise_serialization_1.convolutionalDepthwiseLayerClassNames, convolutional_serialization_1.convolutionalLayerClassNames, core_serialization_1.coreLayerClassNames, embeddings_serialization_1.embeddingLayerClassNames, merge_serialization_1.mergeLayerClassNames, normalization_serialization_1.normalizationLayerClassNames, padding_serialization_1.paddingLayerClassNames, pooling_serialization_1.poolingLayerClassNames, recurrent_serialization_1.recurrentLayerClassNames, input_config_1.inputLayerClassNames);
//# sourceMappingURL=layer_serialization.js.map