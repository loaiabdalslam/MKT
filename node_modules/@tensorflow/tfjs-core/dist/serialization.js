"use strict";
/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
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
var util_1 = require("./util");
/**
 * Serializable defines the serialization contract.
 *
 * TFJS requires serializable classes to return their className when asked
 * to avoid issues with minification.
 */
var Serializable = /** @class */ (function () {
    function Serializable() {
    }
    /**
     * Return the class name for this class to use in serialization contexts.
     *
     * Generally speaking this will be the same thing that constructor.name
     * would have returned.  However, the class name needs to be robust
     * against minification for serialization/deserialization to work properly.
     *
     * There's also places such as initializers.VarianceScaling, where
     * implementation details between different languages led to different
     * class hierarchies and a non-leaf node is used for serialization purposes.
     */
    Serializable.prototype.getClassName = function () {
        return this.constructor
            .className;
    };
    /**
     * Creates an instance of T from a ConfigDict.
     *
     * This works for most descendants of serializable.  A few need to
     * provide special handling.
     * @param cls A Constructor for the class to instantiate.
     * @param config The Configuration for the object.
     */
    /** @nocollapse */
    Serializable.fromConfig = function (cls, config) {
        return new cls(config);
    };
    return Serializable;
}());
exports.Serializable = Serializable;
/**
 * Maps string keys to class constructors.
 *
 * Used during (de)serialization from the cross-language JSON format, which
 * requires the class name in the serialization format matches the class
 * names as used in Python, should it exist.
 */
var SerializationMap = /** @class */ (function () {
    function SerializationMap() {
        this.classNameMap = {};
    }
    /**
     * Returns the singleton instance of the map.
     */
    SerializationMap.getMap = function () {
        if (SerializationMap.instance == null) {
            SerializationMap.instance = new SerializationMap();
        }
        return SerializationMap.instance;
    };
    /**
     * Registers the class as serializable.
     */
    SerializationMap.register = function (cls) {
        SerializationMap.getMap().classNameMap[cls.className] =
            [cls, cls.fromConfig];
    };
    return SerializationMap;
}());
exports.SerializationMap = SerializationMap;
/**
 * Register a class with the serialization map of TensorFlow.js.
 *
 * This is often used for registering custom Layers, so they can be
 * serialized and deserialized.
 *
 * Example:
 *
 * ```js
 * class MyCustomLayer extends tf.layers.Layer {
 *   static className = 'MyCustomLayer';
 *
 *   constructor(config) {
 *     super(config);
 *   }
 * }
 * tf.serialization.registerClass(MyCustomLayer);
 * ```
 *
 * @param cls The class to be registered. It must have a public static member
 *   called `className` defined and the value must be a non-empty string.
 */
/** @doc {heading: 'Models', subheading: 'Serialization', ignoreCI: true} */
function registerClass(cls) {
    util_1.assert(cls.className != null, function () { return "Class being registered does not have the static className " +
        "property defined."; });
    util_1.assert(typeof cls.className === 'string', function () { return "className is required to be a string, but got type " +
        typeof cls.className; });
    util_1.assert(cls.className.length > 0, function () { return "Class being registered has an empty-string as its className, " +
        "which is disallowed."; });
    SerializationMap.register(cls);
}
exports.registerClass = registerClass;
//# sourceMappingURL=serialization.js.map