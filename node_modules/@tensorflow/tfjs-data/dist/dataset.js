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
 *
 * =============================================================================
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var tf = require("@tensorflow/tfjs-core");
var seedrandom = require("seedrandom");
var lazy_iterator_1 = require("./iterators/lazy_iterator");
var deep_map_1 = require("./util/deep_map");
// TODO(soergel): consider vectorized operations within the pipeline.
/**
 * Represents a potentially large list of independent data elements (typically
 * 'samples' or 'examples').
 *
 * A 'data example' may be a primitive, an array, a map from string keys to
 * values, or any nested structure of these.
 *
 * A `Dataset` represents an ordered collection of elements, together with a
 * chain of transformations to be performed on those elements. Each
 * transformation is a method of `Dataset` that returns another `Dataset`, so
 * these may be chained, e.g.
 * `const processedDataset = rawDataset.filter(...).map(...).batch(...)`.
 *
 * Data loading and transformation is done in a lazy, streaming fashion.  The
 * dataset may be iterated over multiple times; each iteration starts the data
 * loading anew and recapitulates the transformations.
 *
 * A `Dataset` is typically processed as a stream of unbatched examples --i.e.,
 * its transformations are applied one example at a time. Batching produces a
 * new `Dataset` where each element is a batch. Batching should usually come
 * last in a pipeline, because data transformations are easier to express on a
 * per-example basis than on a per-batch basis.
 *
 * The following code examples are calling `await dataset.forEachAsync(...)` to
 * iterate once over the entire dataset in order to print out the data.
 */
/** @doc {heading: 'Data', subheading: 'Classes', namespace: 'data'} */
var Dataset = /** @class */ (function () {
    function Dataset() {
        this.size = null;
    }
    // TODO(soergel): Make Datasets report whether repeated iterator() calls
    // produce the same result (e.g., reading from a file) or different results
    // (e.g., from the webcam).  Currently we don't make this distinction but it
    // could be important for the user to know.
    // abstract isDeterministic(): boolean;
    /**
     * Groups elements into batches.
     *
     * It is assumed that each of the incoming dataset elements has the same
     * structure-- i.e. the same set of keys at each location in an object
     * hierarchy.  For each key, the resulting `Dataset` provides a batched
     * element collecting all of the incoming values for that key.
     *
     *  * Incoming primitives are grouped into a 1-D Tensor.
     *  * Incoming Tensors are grouped into a new Tensor where the 0'th axis is
     *    the batch dimension.
     *  * Incoming arrays are converted to Tensor and then batched.
     *  * A nested array is interpreted as an n-D Tensor, so the batched result
     *    has n+1 dimensions.
     *  * An array that cannot be converted to Tensor produces an error.
     *
     * If an array should not be batched as a unit, it should first be converted
     * to an object with integer keys.
     *
     * Here are a few examples:
     *
     * Batch a dataset of numbers:
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6, 7, 8]).batch(4);
     * await a.forEachAsync(e => e.print());
     * ```
     *
     * Batch a dataset of arrays:
     * ```js
     * const b = tf.data.array([[1], [2], [3], [4], [5], [6], [7], [8]]).batch(4);
     * await b.forEachAsync(e => e.print());
     * ```
     *
     * Batch a dataset of objects:
     * ```js
     * const c = tf.data.array([{a: 1, b: 11}, {a: 2, b: 12}, {a: 3, b: 13},
     *   {a: 4, b: 14}, {a: 5, b: 15}, {a: 6, b: 16}, {a: 7, b: 17},
     *   {a: 8, b: 18}]).batch(4);
     * await c.forEachAsync(e => {
     *   console.log('{');
     *   for(var key in e) {
     *     console.log(key+':');
     *     e[key].print();
     *   }
     *   console.log('}');
     * })
     * ```
     *
     * @param batchSize The number of elements desired per batch.
     * @param smallLastBatch Whether to emit the final batch when it has fewer
     *   than batchSize elements. Default true.
     * @returns A `Dataset`, from which a stream of batches can be obtained.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.batch = function (batchSize, smallLastBatch) {
        var _this = this;
        if (smallLastBatch === void 0) { smallLastBatch = true; }
        var base = this;
        tf.util.assert(batchSize > 0, function () { return "batchSize needs to be positive, but it is\n      " + batchSize; });
        var size;
        if (this.size === Infinity || this.size == null) {
            // If the size of this dataset is infinity or null, the new size keeps the
            // same.
            size = this.size;
        }
        else if (smallLastBatch) {
            // If the size of this dataset is known and include small last batch, the
            // new size is full batch count plus last batch.
            size = Math.ceil(this.size / batchSize);
        }
        else {
            // If the size of this dataset is known and not include small last batch,
            // the new size is full batch count.
            size = Math.floor(this.size / batchSize);
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, base.iterator()];
                    case 1: return [2 /*return*/, (_a.sent())
                            .columnMajorBatch(batchSize, smallLastBatch, deepBatchConcat)];
                }
            });
        }); }, size);
    };
    /**
     * Concatenates this `Dataset` with another.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3]);
     * const b = tf.data.array([4, 5, 6]);
     * const c = a.concatenate(b);
     * await c.forEachAsync(e => console.log(e));
     * ```
     *
     * @param dataset A `Dataset` to be concatenated onto this one.
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.concatenate = function (dataset) {
        var _this = this;
        var base = this;
        var size;
        if (this.size === Infinity || dataset.size === Infinity) {
            // If the size of any of these two dataset is infinity, new size is
            // infinity.
            size = Infinity;
        }
        else if (this.size != null && dataset.size != null) {
            // If the size of both datasets are known and not infinity, new size is
            // sum the size of these two datasets.
            size = this.size + dataset.size;
        }
        else {
            // If neither of these two datasets has infinite size and any of these two
            // datasets' size is null, the new size is null.
            size = null;
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, base.iterator()];
                case 1:
                    _b = (_a = (_c.sent())).concatenate;
                    return [4 /*yield*/, dataset.iterator()];
                case 2: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            }
        }); }); }, size);
    };
    /**
     * Filters this dataset according to `predicate`.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
     *   .filter(x => x%2 === 0);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param predicate A function mapping a dataset element to a boolean or a
     * `Promise` for one.
     *
     * @returns A `Dataset` of elements for which the predicate was true.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.filter = function (predicate) {
        var _this = this;
        var base = this;
        var size;
        if (this.size === Infinity) {
            // If the size of this dataset is infinity, new size is infinity
            size = Infinity;
        }
        else {
            // If this dataset has limited elements, new size is null because it might
            // exhausted randomly.
            size = null;
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, base.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).filter(function (x) { return tf.tidy(function () { return predicate(x); }); })];
                }
            });
        }); }, size);
    };
    /**
     * Apply a function to every element of the dataset.
     *
     * After the function is applied to a dataset element, any Tensors contained
     * within that element are disposed.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3]);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param f A function to apply to each dataset element.
     * @returns A `Promise` that resolves after all elements have been processed.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.forEachAsync = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).forEachAsync(f)];
                }
            });
        });
    };
    /** @deprecated Please use `dataset.forEachAsync()` instead. */
    Dataset.prototype.forEach = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                tf.deprecationWarn('dataset.forEach() is deprecated and will be removed. ' +
                    'Please use dataset.forEachAsync() instead');
                return [2 /*return*/, this.forEachAsync(f)];
            });
        });
    };
    /**
     * Maps this dataset through a 1-to-1 transform.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3]).map(x => x*x);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param transform A function mapping a dataset element to a transformed
     *   dataset element.
     *
     * @returns A `Dataset` of transformed elements.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.map = function (transform) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, base.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).map(function (x) { return tf.tidy(function () { return transform(x); }); })];
                }
            });
        }); }, this.size);
    };
    /**
     * Maps this dataset through an async 1-to-1 transform.
     *
     * ```js
     * const a =
     *  tf.data.array([1, 2, 3]).mapAsync(x => new Promise(function(resolve){
     *    setTimeout(() => {
     *      resolve(x * x);
     *    }, Math.random()*1000 + 500);
     *  }));
     * console.log(await a.toArray());
     * ```
     *
     * @param transform A function mapping a dataset element to a `Promise` for a
     *   transformed dataset element.  This transform is responsible for disposing
     *   any intermediate `Tensor`s, i.e. by wrapping its computation in
     *   `tf.tidy()`; that cannot be automated here (as it is in the synchronous
     *   `map()` case).
     *
     * @returns A `Dataset` of transformed elements.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.mapAsync = function (transform) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, base.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).mapAsync(transform)];
                }
            });
        }); }, this.size);
    };
    /**
     *  Creates a `Dataset` that prefetches elements from this dataset.
     *
     * @param bufferSize: An integer specifying the number of elements to be
     *   prefetched.
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.prefetch = function (bufferSize) {
        var _this = this;
        if (bufferSize == null) {
            throw new RangeError('`Dataset.prefetch()` requires bufferSize to be specified.');
        }
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, base.iterator()];
                case 1: return [2 /*return*/, (_a.sent()).prefetch(bufferSize)];
            }
        }); }); }, this.size);
    };
    /**
     * Repeats this dataset `count` times.
     *
     * NOTE: If this dataset is a function of global state (e.g. a random number
     * generator), then different repetitions may produce different elements.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3]).repeat(3);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param count: (Optional) An integer, representing the number of times
     *   the dataset should be repeated. The default behavior (if `count` is
     *   `undefined` or negative) is for the dataset be repeated indefinitely.
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.repeat = function (count) {
        var _this = this;
        var base = this;
        var size;
        if (this.size != null && count > 0) {
            // If this dataset has size and count is positive, new size is current
            // size multiply count. This also covers the case that current size is
            // infinity.
            size = this.size * count;
        }
        else if (count === 0) {
            // If count is 0, new size is 0.
            size = 0;
        }
        else if (this.size != null && (count === undefined || count < 0)) {
            // If this dataset has size and count is undefined or negative, the
            // dataset will be repeated indefinitely and new size is infinity.
            size = Infinity;
        }
        else {
            // If the size of this dataset is null, the new dataset's size is null.
            size = null;
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            var iteratorIterator;
            var _this = this;
            return __generator(this, function (_a) {
                iteratorIterator = lazy_iterator_1.iteratorFromFunction(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4 /*yield*/, base.iterator()];
                        case 1: return [2 /*return*/, (_a.value = _b.sent(), _a.done = false, _a)];
                    }
                }); }); });
                return [2 /*return*/, lazy_iterator_1.iteratorFromConcatenated(iteratorIterator.take(count))];
            });
        }); }, size);
    };
    /**
     * Creates a `Dataset` that skips `count` initial elements from this dataset.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6]).skip(3);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param count: The number of elements of this dataset that should be skipped
     *   to form the new dataset.  If `count` is greater than the size of this
     *   dataset, the new dataset will contain no elements.  If `count`
     *   is `undefined` or negative, skips the entire dataset.
     *
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.skip = function (count) {
        var _this = this;
        var base = this;
        var size;
        if (this.size != null && count >= 0 && this.size >= count) {
            // If the size of this dataset is greater than count, the new dataset's
            // size is current size minus skipped size.This also covers the case that
            // current size is infinity.
            size = this.size - count;
        }
        else if (this.size != null &&
            (this.size < count || count === undefined || count < 0)) {
            // If the size of this dataset is smaller than count, or count is
            // undefined or negative, skips the entire dataset and the new size is 0.
            size = 0;
        }
        else {
            // If the size of this dataset is null, the new dataset's size is null.
            size = null;
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, base.iterator()];
                case 1: return [2 /*return*/, (_a.sent()).skip(count)];
            }
        }); }); }, size);
    };
    /**
     * Pseudorandomly shuffles the elements of this dataset. This is done in a
     * streaming manner, by sampling from a given number of prefetched elements.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6]).shuffle(3);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param bufferSize: An integer specifying the number of elements from this
     *   dataset from which the new dataset will sample.
     * @param seed: (Optional) An integer specifying the random seed that will
     *   be used to create the distribution.
     * @param reshuffleEachIteration: (Optional) A boolean, which if true
     *   indicates that the dataset should be pseudorandomly reshuffled each time
     *   it is iterated over. If false, elements will be returned in the same
     *   shuffled order on each iteration. (Defaults to `true`.)
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.shuffle = function (bufferSize, seed, reshuffleEachIteration) {
        var _this = this;
        if (reshuffleEachIteration === void 0) { reshuffleEachIteration = true; }
        if (bufferSize == null || bufferSize < 0) {
            if (this.size == null) {
                throw new RangeError('`Dataset.shuffle()` requires bufferSize to be specified.');
            }
            else {
                throw new RangeError('`Dataset.shuffle()` requires bufferSize to be specified.  ' +
                    'If your data fits in main memory (for regular JS objects), ' +
                    'and/or GPU memory (for `tf.Tensor`s), consider setting ' +
                    ("bufferSize to the dataset size (" + this.size + " elements)"));
            }
        }
        var base = this;
        var random = seedrandom.alea(seed || tf.util.now().toString());
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            var seed2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed2 = random.int32();
                        if (reshuffleEachIteration) {
                            seed2 += random.int32();
                        }
                        return [4 /*yield*/, base.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).shuffle(bufferSize, seed2.toString())];
                }
            });
        }); }, this.size);
    };
    /**
     * Creates a `Dataset` with at most `count` initial elements from this
     * dataset.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6]).take(3);
     * await a.forEachAsync(e => console.log(e));
     * ```
     *
     * @param count: The number of elements of this dataset that should be taken
     *   to form the new dataset.  If `count` is `undefined` or negative, or if
     *   `count` is greater than the size of this dataset, the new dataset will
     *   contain all elements of this dataset.
     * @returns A `Dataset`.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.take = function (count) {
        var _this = this;
        var base = this;
        var size;
        if (this.size != null && this.size > count) {
            // If the size of this dataset is greater than count, the new dataset's
            // size is count.
            size = count;
        }
        else if (this.size != null && this.size <= count) {
            // If the size of this dataset is equal or smaller than count, the new
            // dataset's size is the size of this dataset.
            size = this.size;
        }
        else {
            // If the size of this dataset is null, the new dataset's size is null.
            size = null;
        }
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, base.iterator()];
                case 1: return [2 /*return*/, (_a.sent()).take(count)];
            }
        }); }); }, size);
    };
    /**
     * Collect all elements of this dataset into an array.
     *
     * Obviously this will succeed only for small datasets that fit in memory.
     * Useful for testing and generally should be avoided if possible.
     *
     * ```js
     * const a = tf.data.array([1, 2, 3, 4, 5, 6]);
     * console.log(await a.toArray());
     * ```
     *
     * @returns A Promise for an array of elements, which will resolve
     *   when a new stream has been obtained and fully consumed.
     */
    /** @doc {heading: 'Data', subheading: 'Classes'} */
    Dataset.prototype.toArray = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.size === Infinity) {
                            throw new Error('Can not convert infinite data stream to array.');
                        }
                        return [4 /*yield*/, this.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).toArray()];
                }
            });
        });
    };
    /**
     * Collect all elements of this dataset into an array with prefetching 100
     * elements. This is useful for testing, because the prefetch changes the
     * order in which the Promises are resolved along the processing pipeline.
     * This may help expose bugs where results are dependent on the order of
     * Promise resolution rather than on the logical order of the stream (i.e.,
     * due to hidden mutable state).
     *
     * @returns A Promise for an array of elements, which will resolve
     *   when a new stream has been obtained and fully consumed.
     */
    Dataset.prototype.toArrayForTest = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.size === Infinity) {
                            throw new Error('Can not convert infinite data stream to array.');
                        }
                        return [4 /*yield*/, this.iterator()];
                    case 1: return [2 /*return*/, (_a.sent()).toArrayForTest()];
                }
            });
        });
    };
    // TODO(soergel): deep sharded shuffle, where supported
    Dataset.MAX_BUFFER_SIZE = 10000;
    return Dataset;
}());
exports.Dataset = Dataset;
/**
 * Create a `Dataset` defined by a provided iterator() function.
 *
 * ```js
 * let i = -1;
 * const func = () =>
 *    ++i < 5 ? {value: i, done: false} : {value: null, done: true};
 * const iter = tf.data.iteratorFromFunction(func);
 * const ds = tf.data.datasetFromIteratorFn(iter);
 * await ds.forEachAsync(e => console.log(e));
 * ```
 */
function datasetFromIteratorFn(iteratorFn, size) {
    if (size === void 0) { size = null; }
    return new /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.size = size;
            return _this;
        }
        /*
         * Provide a new stream of elements.  Note this will also start new streams
         * from any underlying `Dataset`s.
         */
        class_1.prototype.iterator = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, iteratorFn()];
                });
            });
        };
        return class_1;
    }(Dataset))();
}
exports.datasetFromIteratorFn = datasetFromIteratorFn;
/**
 * Create a `Dataset` from an array of elements.
 *
 * Create a Dataset from an array of objects:
 * ```js
 * const a = tf.data.array([{'item': 1}, {'item': 2}, {'item': 3}]);
 * await a.forEachAsync(e => console.log(e));
 * ```
 *
 * Create a Dataset from an array of numbers:
 * ```js
 * const a = tf.data.array([4, 5, 6]);
 * await a.forEachAsync(e => console.log(e));
 * ```
 * @param items An array of elements that will be parsed as items in a dataset.
 */
/** @doc {heading: 'Data', subheading: 'Creation', namespace: 'data'} */
function array(items) {
    var _this = this;
    return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, lazy_iterator_1.iteratorFromItems(items)];
    }); }); }, items.length);
}
exports.array = array;
/**
 * Create a `Dataset` by zipping together an array, dict, or nested
 * structure of `Dataset`s (and perhaps additional constants).
 * The underlying datasets must provide elements in a consistent order such that
 * they correspond.
 *
 * The number of elements in the resulting dataset is the same as the size of
 * the smallest dataset in datasets.
 *
 * The nested structure of the `datasets` argument determines the
 * structure of elements in the resulting iterator.
 *
 * Note this means that, given an array of two datasets that produce dict
 * elements, the result is a dataset that produces elements that are arrays
 * of two dicts:
 *
 * Zip an array of datasets:
 * ```js
 * console.log('Zip two datasets of objects:');
 * const ds1 = tf.data.array([{a: 1}, {a: 2}, {a: 3}]);
 * const ds2 = tf.data.array([{b: 4}, {b: 5}, {b: 6}]);
 * const ds3 = tf.data.zip([ds1, ds2]);
 * await ds3.forEachAsync(e => console.log(JSON.stringify(e)));
 *
 * // If the goal is to merge the dicts in order to produce elements like
 * // {a: ..., b: ...}, this requires a second step such as:
 * console.log('Merge the objects:');
 * const ds4 = ds3.map(x => {return {a: x[0].a, b: x[1].b}});
 * await ds4.forEachAsync(e => console.log(e));
 * ```
 *
 * Zip a dict of datasets:
 * ```js
 * const a = tf.data.array([{a: 1}, {a: 2}, {a: 3}]);
 * const b = tf.data.array([{b: 4}, {b: 5}, {b: 6}]);
 * const c = tf.data.zip({c: a, d: b});
 * await c.forEachAsync(e => console.log(JSON.stringify(e)));
 * ```
 */
/** @doc {heading: 'Data', subheading: 'Operations', namespace: 'data'} */
function zip(datasets) {
    var _this = this;
    // manually type-check the argument for JS users
    if (!deep_map_1.isIterable(datasets)) {
        throw new Error('The argument to zip() must be an object or array.');
    }
    var size;
    if (Array.isArray(datasets)) {
        for (var i = 0; i < datasets.length; i++) {
            size = size == null ? datasets[i].size :
                Math.min(size, datasets[i].size);
        }
    }
    else if (datasets instanceof Object) {
        for (var ds in datasets) {
            size = size == null ? datasets[ds].size :
                Math.min(size, datasets[ds].size);
        }
    }
    return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
        var streams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deep_map_1.deepMapAndAwaitAll(datasets, function (d) {
                        if (d instanceof Dataset) {
                            return { value: d.iterator(), recurse: false };
                        }
                        else if (deep_map_1.isIterable(d)) {
                            return { value: null, recurse: true };
                        }
                        else {
                            throw new Error('Leaves of the structure passed to zip() must be Datasets, ' +
                                'not primitives.');
                        }
                    })];
                case 1:
                    streams = _a.sent();
                    return [2 /*return*/, lazy_iterator_1.iteratorFromZipped(streams, lazy_iterator_1.ZipMismatchMode.SHORTEST)];
            }
        });
    }); }, size);
}
exports.zip = zip;
/**
 * A zip function for use with deepZip, passed via the columnMajorBatch call.
 *
 * Accepts an array of identically-structured nested elements and either batches
 * them (if they are primitives, numeric arrays, or Tensors) or requests
 * recursion (if not).
 */
// tslint:disable-next-line:no-any
function deepBatchConcat(rows) {
    if (rows === null) {
        return null;
    }
    // use the first item to decide whether to recurse or batch here.
    var exampleRow = rows[0];
    if (deep_map_1.canTensorify(exampleRow)) {
        // rows is an array of primitives, Tensors, or arrays.  Batch them.
        var value = batchConcat(rows);
        return { value: value, recurse: false };
    }
    // the example row is an object, so recurse into it.
    return { value: null, recurse: true };
}
/**
 * Assembles a list of same-shaped numbers, number arrays, or Tensors
 * into a single new Tensor where axis 0 is the batch dimension.
 */
function batchConcat(arrays) {
    if (arrays.length === 0) {
        // We can't return an empty Tensor because we don't know the element shape.
        throw new Error('Can\'t make a batch of zero elements.');
    }
    if (arrays[0] instanceof tf.Tensor) {
        // Input is an array of Tensors
        return tf.stack(arrays);
    }
    else {
        // Input is a possibly-nested array of numbers.
        return tf.tensor(arrays);
    }
}
//# sourceMappingURL=dataset.js.map