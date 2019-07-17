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
var tfjs_core_1 = require("@tensorflow/tfjs-core");
function standardizeSampleOrClassWeights(xWeight, outputNames, weightType) {
    var numOutputs = outputNames.length;
    if (xWeight == null || (Array.isArray(xWeight) && xWeight.length === 0)) {
        return outputNames.map(function (name) { return null; });
    }
    if (numOutputs === 1) {
        if (Array.isArray(xWeight) && xWeight.length === 1) {
            return xWeight;
        }
        else if (typeof xWeight === 'object' && outputNames[0] in xWeight) {
            return [xWeight[outputNames[0]]];
        }
        else {
            return [xWeight];
        }
    }
    if (Array.isArray(xWeight)) {
        if (xWeight.length !== numOutputs) {
            throw new Error("Provided " + weightType + " is an array of " + xWeight.length + " " +
                ("element(s), but the model has " + numOutputs + " outputs. ") +
                "Make sure a set of weights is provided for each model output.");
        }
        return xWeight;
    }
    else if (typeof xWeight === 'object' && Object.keys(xWeight).length > 0 &&
        typeof xWeight[Object.keys(xWeight)[0]] ===
            'object') {
        var output_1 = [];
        outputNames.forEach(function (outputName) {
            if (outputName in xWeight) {
                output_1.push(xWeight[outputName]);
            }
            else {
                output_1.push(null);
            }
        });
        return output_1;
    }
    else {
        throw new Error("The model has multiple (" + numOutputs + ") outputs, " +
            ("so " + weightType + " must be either an array with ") +
            (numOutputs + " elements or an object with " + outputNames + " keys. ") +
            ("Provided " + weightType + " not understood: " + JSON.stringify(xWeight)));
    }
}
/**
 * Standardize class weighting objects.
 *
 * This function takes a single class-weighting object, an array of them,
 * or a map from output name to class-weighting object. It compares it to the
 * output name(s) of the model, base on which it outputs an array of
 * class-weighting objects of which the length matches the number of outputs.
 *
 * @param classWeight Input class-weighting object(s).
 * @param outputNames All output name(s) of the model.
 * @return An array of class-weighting objects. The length of the array matches
 *   the model's number of outputs.
 */
function standardizeClassWeights(classWeight, outputNames) {
    return standardizeSampleOrClassWeights(classWeight, outputNames, 'classWeight');
}
exports.standardizeClassWeights = standardizeClassWeights;
function standardizeSampleWeights(classWeight, outputNames) {
    return standardizeSampleOrClassWeights(classWeight, outputNames, 'sampleWeight');
}
exports.standardizeSampleWeights = standardizeSampleWeights;
/**
 * Standardize by-sample and/or by-class weights for training.
 *
 * Note that this function operates on one model output at a time. For a model
 * with multiple outputs, you must call this function multiple times.
 *
 * @param y The target tensor that the by-sample and/or by-class weight is for.
 *     The values of y are assumed to encode the classes, either directly
 *     as an integer index, or as one-hot encoding.
 * @param sampleWeight By-sample weights.
 * @param classWeight By-class weights: an object mapping class indices
 *     (integers) to a weight (float) to apply to the model's loss for the
 *     samples from this class during training. This can be useful to tell the
 *     model to "pay more attention" to samples from an under-represented class.
 * @param sampleWeightMode The mode for the sample weights.
 * @return A Promise of weight tensor, of which the size of the first dimension
 *     matches that of `y`.
 */
function standardizeWeights(y, sampleWeight, classWeight, sampleWeightMode) {
    return __awaiter(this, void 0, void 0, function () {
        var yClasses, yClassIndices, _a, _b, classSampleWeight_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (sampleWeight != null || sampleWeightMode != null) {
                        // TODO(cais): Once 'temporal' mode is implemented, document it in the doc
                        // string.
                        throw new Error('Support sampleWeight is not implemented yet');
                    }
                    if (!(classWeight != null)) return [3 /*break*/, 2];
                    yClasses = tfjs_core_1.tidy(function () {
                        if (y.shape.length === 1) {
                            // Assume class indices.
                            return y.clone();
                        }
                        else if (y.shape.length === 2) {
                            if (y.shape[1] > 1) {
                                // Assume one-hot encoding of classes.
                                var axis = 1;
                                return y.argMax(axis);
                            }
                            else if (y.shape[1] === 1) {
                                // Class index.
                                return y.reshape([y.shape[0]]);
                            }
                            else {
                                throw new Error("Encountered unexpected last-dimension size (" + y.shape[1] + ") " +
                                    "during handling of class weights. The size is expected to be " +
                                    ">= 1.");
                            }
                        }
                        else {
                            throw new Error("Unexpected rank of target (y) tensor (" + y.rank + ") during " +
                                "handling of class weights. The rank is expected to be 1 or 2.");
                        }
                    });
                    _b = (_a = Array).from;
                    return [4 /*yield*/, yClasses.data()];
                case 1:
                    yClassIndices = _b.apply(_a, [_c.sent()]);
                    tfjs_core_1.dispose(yClasses);
                    classSampleWeight_1 = [];
                    yClassIndices.forEach(function (classIndex) {
                        if (classWeight[classIndex] == null) {
                            throw new Error("classWeight must contain all classes in the training data. " +
                                ("The class " + classIndex + " exists in the data but not in ") +
                                "classWeight");
                        }
                        else {
                            classSampleWeight_1.push(classWeight[classIndex]);
                        }
                    });
                    return [2 /*return*/, tfjs_core_1.tensor1d(classSampleWeight_1, 'float32')];
                case 2: return [2 /*return*/, null];
            }
        });
    });
}
exports.standardizeWeights = standardizeWeights;
/**
 * Apply per-sample weights on the loss values from a number of samples.
 *
 * @param losses Loss tensor of shape `[batchSize]`.
 * @param sampleWeights Per-sample weight tensor of shape `[batchSize]`.
 * @returns Tensor of the same shape as`losses`.
 */
function computeWeightedLoss(losses, sampleWeights) {
    return tfjs_core_1.mul(losses, sampleWeights);
}
exports.computeWeightedLoss = computeWeightedLoss;
//# sourceMappingURL=training_utils.js.map