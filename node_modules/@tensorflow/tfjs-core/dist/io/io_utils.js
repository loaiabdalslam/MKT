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
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_ops_1 = require("../ops/tensor_ops");
var util_1 = require("../util");
var types_1 = require("./types");
/** Number of bytes reserved for the length of the string. (32bit integer). */
var NUM_BYTES_STRING_LENGTH = 4;
/**
 * Encode a map from names to weight values as an ArrayBuffer, along with an
 * `Array` of `WeightsManifestEntry` as specification of the encoded weights.
 *
 * This function does not perform sharding.
 *
 * This function is the reverse of `decodeWeights`.
 *
 * @param tensors A map ("dict") from names to tensors.
 * @param group Group to which the weights belong (optional).
 * @returns A `Promise` of
 *   - A flat `ArrayBuffer` with all the binary values of the `Tensor`s
 *     concatenated.
 *   - An `Array` of `WeightManifestEntry`s, carrying information including
 *     tensor names, `dtype`s and shapes.
 * @throws Error: on unsupported tensor `dtype`.
 */
function encodeWeights(tensors, group) {
    return __awaiter(this, void 0, void 0, function () {
        var specs, dataPromises, names, _loop_1, i, tensorValues;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    specs = [];
                    dataPromises = [];
                    names = Array.isArray(tensors) ?
                        tensors.map(function (tensor) { return tensor.name; }) :
                        Object.keys(tensors);
                    _loop_1 = function (i) {
                        var name_1 = names[i];
                        var t = Array.isArray(tensors) ? tensors[i].tensor : tensors[name_1];
                        if (t.dtype !== 'float32' && t.dtype !== 'int32' && t.dtype !== 'bool' &&
                            t.dtype !== 'string') {
                            throw new Error("Unsupported dtype in weight '" + name_1 + "': " + t.dtype);
                        }
                        var spec = { name: name_1, shape: t.shape, dtype: t.dtype };
                        if (t.dtype === 'string') {
                            var utf8bytes = new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                                var vals, totalNumBytes, bytes, offset, i_1, val, bytesOfLength;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, t.bytes()];
                                        case 1:
                                            vals = _a.sent();
                                            totalNumBytes = vals.reduce(function (p, c) { return p + c.length; }, 0) +
                                                NUM_BYTES_STRING_LENGTH * vals.length;
                                            bytes = new Uint8Array(totalNumBytes);
                                            offset = 0;
                                            for (i_1 = 0; i_1 < vals.length; i_1++) {
                                                val = vals[i_1];
                                                bytesOfLength = new Uint8Array(new Uint32Array([val.length]).buffer);
                                                bytes.set(bytesOfLength, offset);
                                                offset += NUM_BYTES_STRING_LENGTH;
                                                bytes.set(val, offset);
                                                offset += val.length;
                                            }
                                            resolve(bytes);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            dataPromises.push(utf8bytes);
                        }
                        else {
                            dataPromises.push(t.data());
                        }
                        if (group != null) {
                            spec.group = group;
                        }
                        specs.push(spec);
                    };
                    for (i = 0; i < names.length; ++i) {
                        _loop_1(i);
                    }
                    return [4 /*yield*/, Promise.all(dataPromises)];
                case 1:
                    tensorValues = _a.sent();
                    return [2 /*return*/, { data: concatenateTypedArrays(tensorValues), specs: specs }];
            }
        });
    });
}
exports.encodeWeights = encodeWeights;
/**
 * Decode flat ArrayBuffer as weights.
 *
 * This function does not handle sharding.
 *
 * This function is the reverse of `encodeWeights`.
 *
 * @param buffer A flat ArrayBuffer carrying the binary values of the tensors
 *   concatenated in the order specified in `specs`.
 * @param specs Specifications of the names, dtypes and shapes of the tensors
 *   whose value are encoded by `buffer`.
 * @return A map from tensor name to tensor value, with the names corresponding
 *   to names in `specs`.
 * @throws Error, if any of the tensors has unsupported dtype.
 */
function decodeWeights(buffer, specs) {
    // TODO(adarob, cais): Support quantization.
    var out = {};
    var offset = 0;
    var _loop_2 = function (spec) {
        var name_2 = spec.name;
        var dtype = spec.dtype;
        var shape = spec.shape;
        var size = util_1.sizeFromShape(shape);
        var values = void 0;
        if ('quantization' in spec) {
            var quantization_1 = spec.quantization;
            if (quantization_1.dtype !== 'uint8' && quantization_1.dtype !== 'uint16') {
                throw new Error("Weight " + spec.name + " has unknown " +
                    ("quantization dtype " + quantization_1.dtype + ". ") +
                    "Supported quantization dtypes are: 'uint8' and 'uint16'.");
            }
            var quantizationSizeFactor = types_1.DTYPE_VALUE_SIZE_MAP[quantization_1.dtype];
            var byteBuffer = buffer.slice(offset, offset + size * quantizationSizeFactor);
            var quantizedArray = (quantization_1.dtype === 'uint8') ?
                new Uint8Array(byteBuffer) :
                new Uint16Array(byteBuffer);
            if (dtype === 'float32') {
                values = Float32Array.from(quantizedArray, function (v) { return v * quantization_1.scale + quantization_1.min; });
            }
            else if (dtype === 'int32') {
                values = Int32Array.from(quantizedArray, function (v) { return Math.round(v * quantization_1.scale + quantization_1.min); });
            }
            else {
                throw new Error("Unsupported dtype in weight '" + name_2 + "': " + dtype);
            }
            offset += size * quantizationSizeFactor;
        }
        else if (dtype === 'string') {
            var size_1 = util_1.sizeFromShape(spec.shape);
            values = [];
            for (var i = 0; i < size_1; i++) {
                var byteLength = new Uint32Array(buffer.slice(offset, offset + NUM_BYTES_STRING_LENGTH))[0];
                offset += NUM_BYTES_STRING_LENGTH;
                var bytes = new Uint8Array(buffer.slice(offset, offset + byteLength));
                values.push(bytes);
                offset += byteLength;
            }
        }
        else {
            var dtypeFactor = types_1.DTYPE_VALUE_SIZE_MAP[dtype];
            var byteBuffer = buffer.slice(offset, offset + size * dtypeFactor);
            if (dtype === 'float32') {
                values = new Float32Array(byteBuffer);
            }
            else if (dtype === 'int32') {
                values = new Int32Array(byteBuffer);
            }
            else if (dtype === 'bool') {
                values = new Uint8Array(byteBuffer);
            }
            else {
                throw new Error("Unsupported dtype in weight '" + name_2 + "': " + dtype);
            }
            offset += size * dtypeFactor;
        }
        out[name_2] = tensor_ops_1.tensor(values, shape, dtype);
    };
    for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
        var spec = specs_1[_i];
        _loop_2(spec);
    }
    return out;
}
exports.decodeWeights = decodeWeights;
/**
 * Concatenate TypedArrays into an ArrayBuffer.
 */
function concatenateTypedArrays(xs) {
    // TODO(adarob, cais): Support quantization.
    if (xs === null) {
        throw new Error("Invalid input value: " + JSON.stringify(xs));
    }
    var totalByteLength = 0;
    // `normalizedXs` is here for this reason: a `TypedArray`'s `buffer'
    // can have a different byte length from that of the `TypedArray` itself,
    // for example, when the `TypedArray` is created from an offset in an
    // `ArrayBuffer`. `normliazedXs` holds `TypedArray`s whose `buffer`s match
    // the `TypedArray` in byte length. If an element of `xs` does not show
    // this property, a new `TypedArray` that satisfy this property will be
    // constructed and pushed into `normalizedXs`.
    var normalizedXs = [];
    xs.forEach(function (x) {
        totalByteLength += x.byteLength;
        // tslint:disable:no-any
        normalizedXs.push(x.byteLength === x.buffer.byteLength ? x :
            new x.constructor(x));
        if (!(x instanceof Float32Array || x instanceof Int32Array ||
            x instanceof Uint8Array)) {
            throw new Error("Unsupported TypedArray subtype: " + x.constructor.name);
        }
        // tslint:enable:no-any
    });
    var y = new Uint8Array(totalByteLength);
    var offset = 0;
    normalizedXs.forEach(function (x) {
        y.set(new Uint8Array(x.buffer), offset);
        offset += x.byteLength;
    });
    return y.buffer;
}
exports.concatenateTypedArrays = concatenateTypedArrays;
// Use Buffer on Node.js instead of Blob/atob/btoa
var useNodeBuffer = typeof Buffer !== 'undefined' &&
    (typeof Blob === 'undefined' || typeof atob === 'undefined' ||
        typeof btoa === 'undefined');
/**
 * Calculate the byte length of a JavaScript string.
 *
 * Note that a JavaScript string can contain wide characters, therefore the
 * length of the string is not necessarily equal to the byte length.
 *
 * @param str Input string.
 * @returns Byte length.
 */
function stringByteLength(str) {
    if (useNodeBuffer) {
        return Buffer.byteLength(str);
    }
    return new Blob([str]).size;
}
exports.stringByteLength = stringByteLength;
/**
 * Encode an ArrayBuffer as a base64 encoded string.
 *
 * @param buffer `ArrayBuffer` to be converted.
 * @returns A string that base64-encodes `buffer`.
 */
function arrayBufferToBase64String(buffer) {
    if (useNodeBuffer) {
        return Buffer.from(buffer).toString('base64');
    }
    return btoa(String.fromCharCode.apply(null, new Uint8Array(buffer)));
}
exports.arrayBufferToBase64String = arrayBufferToBase64String;
/**
 * Decode a base64 string as an ArrayBuffer.
 *
 * @param str Base64 string.
 * @returns Decoded `ArrayBuffer`.
 */
function base64StringToArrayBuffer(str) {
    if (useNodeBuffer) {
        var buf = Buffer.from(str, 'base64');
        return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    }
    var s = atob(str);
    var buffer = new Uint8Array(s.length);
    for (var i = 0; i < s.length; ++i) {
        buffer.set([s.charCodeAt(i)], i);
    }
    return buffer.buffer;
}
exports.base64StringToArrayBuffer = base64StringToArrayBuffer;
/**
 * Concatenate a number of ArrayBuffers into one.
 *
 * @param buffers A number of array buffers to concatenate.
 * @returns Result of concatenating `buffers` in order.
 */
function concatenateArrayBuffers(buffers) {
    var totalByteLength = 0;
    buffers.forEach(function (buffer) {
        totalByteLength += buffer.byteLength;
    });
    var temp = new Uint8Array(totalByteLength);
    var offset = 0;
    buffers.forEach(function (buffer) {
        temp.set(new Uint8Array(buffer), offset);
        offset += buffer.byteLength;
    });
    return temp.buffer;
}
exports.concatenateArrayBuffers = concatenateArrayBuffers;
/**
 * Get the basename of a path.
 *
 * Behaves in a way analogous to Linux's basename command.
 *
 * @param path
 */
function basename(path) {
    var SEPARATOR = '/';
    path = path.trim();
    while (path.endsWith(SEPARATOR)) {
        path = path.slice(0, path.length - 1);
    }
    var items = path.split(SEPARATOR);
    return items[items.length - 1];
}
exports.basename = basename;
/**
 * Populate ModelArtifactsInfo fields for a model with JSON topology.
 * @param modelArtifacts
 * @returns A ModelArtifactsInfo object.
 */
function getModelArtifactsInfoForJSON(modelArtifacts) {
    if (modelArtifacts.modelTopology instanceof ArrayBuffer) {
        throw new Error('Expected JSON model topology, received ArrayBuffer.');
    }
    return {
        dateSaved: new Date(),
        modelTopologyType: 'JSON',
        modelTopologyBytes: modelArtifacts.modelTopology == null ?
            0 :
            stringByteLength(JSON.stringify(modelArtifacts.modelTopology)),
        weightSpecsBytes: modelArtifacts.weightSpecs == null ?
            0 :
            stringByteLength(JSON.stringify(modelArtifacts.weightSpecs)),
        weightDataBytes: modelArtifacts.weightData == null ?
            0 :
            modelArtifacts.weightData.byteLength,
    };
}
exports.getModelArtifactsInfoForJSON = getModelArtifactsInfoForJSON;
//# sourceMappingURL=io_utils.js.map