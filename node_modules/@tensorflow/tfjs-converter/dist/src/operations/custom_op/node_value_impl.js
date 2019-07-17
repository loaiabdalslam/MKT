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
var utils_1 = require("../executors/utils");
var operation_mapper_1 = require("../operation_mapper");
/**
 * Helper class for lookup inputs and params for nodes in the model graph.
 */
var NodeValueImpl = /** @class */ (function () {
    function NodeValueImpl(node, tensorMap, context) {
        var _this = this;
        this.node = node;
        this.tensorMap = tensorMap;
        this.context = context;
        this.inputs = [];
        this.attrs = {};
        this.inputs = node.inputNames.map(function (name) { return _this.getInput(name); });
        if (node.rawAttrs != null) {
            this.attrs = Object.keys(node.rawAttrs)
                .reduce(function (attrs, key) {
                attrs[key] = _this.getAttr(key);
                return attrs;
            }, {});
        }
    }
    /**
     * Return the value of the attribute or input param.
     * @param name String: name of attribute or input param.
     */
    NodeValueImpl.prototype.getInput = function (name) {
        return utils_1.getTensor(name, this.tensorMap, this.context);
    };
    /**
     * Return the value of the attribute or input param.
     * @param name String: name of attribute or input param.
     */
    NodeValueImpl.prototype.getAttr = function (name, defaultValue) {
        var value = this.node.rawAttrs[name];
        if (value.tensor != null) {
            return utils_1.getTensor(name, this.tensorMap, this.context);
        }
        if (value.i != null || value.f != null) {
            return operation_mapper_1.getNumberParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.s != null) {
            return operation_mapper_1.getStringParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.b != null) {
            return operation_mapper_1.getBoolParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.shape != null) {
            return operation_mapper_1.getTensorShapeParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.type != null) {
            return operation_mapper_1.getDtypeParam(this.node.rawAttrs, name, defaultValue);
        }
        if (value.list != null) {
            if (value.list.i != null || value.list.f != null) {
                return operation_mapper_1.getNumericArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.s != null) {
                return operation_mapper_1.getStringArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.shape != null) {
                return operation_mapper_1.getTensorShapeArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.b != null) {
                return operation_mapper_1.getBoolArrayParam(this.node.rawAttrs, name, defaultValue);
            }
            if (value.list.type != null) {
                return operation_mapper_1.getDtypeArrayParam(this.node.rawAttrs, name, defaultValue);
            }
        }
        return defaultValue;
    };
    return NodeValueImpl;
}());
exports.NodeValueImpl = NodeValueImpl;
//# sourceMappingURL=node_value_impl.js.map