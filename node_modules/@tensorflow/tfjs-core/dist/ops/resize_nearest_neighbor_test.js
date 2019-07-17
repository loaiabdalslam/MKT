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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('resizeNearestNeighbor', jasmine_util_1.ALL_ENVS, function () {
    it('simple alignCorners=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d([2, 2, 4, 4], [2, 2, 1]);
                    output = input.resizeNearestNeighbor([3, 3], false);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 2, 2, 2, 2, 4, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('simple alignCorners=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d([2, 2, 4, 4], [2, 2, 1]);
                    output = input.resizeNearestNeighbor([3, 3], true);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 2, 4, 4, 4, 4, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matches tensorflow w/ random numbers alignCorners=false', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d([
                        1.19074044, 0.91373104, 2.01611669, -0.52270832, 0.38725395,
                        1.30809779, 0.61835143, 3.49600659, 2.09230986, 0.56473997,
                        0.03823943, 1.19864896
                    ], [2, 3, 2]);
                    output = input.resizeNearestNeighbor([4, 5], false);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1.19074047, 0.913731039, 1.19074047, 0.913731039, 2.01611662,
                            -0.522708297, 2.01611662, -0.522708297, 0.38725394, 1.30809784,
                            1.19074047, 0.913731039, 1.19074047, 0.913731039, 2.01611662,
                            -0.522708297, 2.01611662, -0.522708297, 0.38725394, 1.30809784,
                            0.61835146, 3.49600649, 0.61835146, 3.49600649, 2.09230995,
                            0.564739943, 2.09230995, 0.564739943, 0.0382394306, 1.19864893,
                            0.61835146, 3.49600649, 0.61835146, 3.49600649, 2.09230995,
                            0.564739943, 2.09230995, 0.564739943, 0.0382394306, 1.19864893
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('matches tensorflow w/ random numbers alignCorners=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor3d([
                        1.19074044, 0.91373104, 2.01611669, -0.52270832, 0.38725395,
                        1.30809779, 0.61835143, 3.49600659, 2.09230986, 0.56473997,
                        0.03823943, 1.19864896
                    ], [2, 3, 2]);
                    output = input.resizeNearestNeighbor([4, 5], true);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1.19074044, 0.91373104, 2.01611669, -0.52270832, 2.01611669, -0.52270832,
                            0.38725395, 1.30809779, 0.38725395, 1.30809779, 1.19074044, 0.91373104,
                            2.01611669, -0.52270832, 2.01611669, -0.52270832, 0.38725395, 1.30809779,
                            0.38725395, 1.30809779, 0.61835143, 3.49600659, 2.09230986, 0.56473997,
                            2.09230986, 0.56473997, 0.03823943, 1.19864896, 0.03823943, 1.19864896,
                            0.61835143, 3.49600659, 2.09230986, 0.56473997, 2.09230986, 0.56473997,
                            0.03823943, 1.19864896, 0.03823943, 1.19864896
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('batch of 2, simple, alignCorners=true', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = tf.tensor4d([2, 2, 4, 4, 3, 3, 5, 5], [2, 2, 2, 1]);
                    output = input.resizeNearestNeighbor([3, 3], true /* alignCorners */);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2, 2, 2, 4, 4, 4, 4, 4, 4, 3, 3, 3, 5, 5, 5, 5, 5, 5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('throws when passed a non-tensor', function () {
        var e = /Argument 'images' passed to 'resizeNearestNeighbor' must be a Tensor/;
        expect(function () { return tf.image.resizeNearestNeighbor({}, [
            1, 1
        ]); }).toThrowError(e);
    });
    it('accepts a tensor-like object', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, output, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    input = [[[2], [2]], [[4], [4]]];
                    output = tf.image.resizeNearestNeighbor(input, [3, 3], false);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 2, 2, 2, 2, 2, 4, 4, 4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('does not throw when some output dim is 1 and alignCorners=true', function () {
        var input = tf.tensor3d([2, 2, 4, 4], [2, 2, 1]);
        expect(function () { return input.resizeNearestNeighbor([1, 3], true); }).not.toThrow();
    });
});
jasmine_util_1.describeWithFlags('resizeNearestNeighbor gradients', jasmine_util_1.ALL_ENVS, function () {
    it('greyscale: upscale, same aspect ratio', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0]], [[5.0], [6.0], [7.0], [8.0]],
                        [[9.0], [10.0], [11.0], [12.0]], [[13.0], [14.0], [15.0], [16.0]]
                    ]);
                    size = [4, 4];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[14.0], [22.0]], [[46.0], [54.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('with clones, greyscale: upscale, same aspect ratio', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0]], [[5.0], [6.0], [7.0], [8.0]],
                        [[9.0], [10.0], [11.0], [12.0]], [[13.0], [14.0], [15.0], [16.0]]
                    ]);
                    size = [4, 4];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i.clone(), size, alignCorners)
                            .clone();
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[14.0], [22.0]], [[46.0], [54.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: upscale, same aspect ratio, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0]], [[5.0], [6.0], [7.0], [8.0]],
                        [[9.0], [10.0], [11.0], [12.0]], [[13.0], [14.0], [15.0], [16.0]]
                    ]);
                    size = [4, 4];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[14.0], [22.0]], [[46.0], [54.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: upscale, taller than wider', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0]], [[5.0], [6.0], [7.0], [8.0]],
                        [[9.0], [10.0], [11.0], [12.0]], [[13.0], [14.0], [15.0], [16.0]],
                        [[17.0], [18.0], [19.0], [20.0]], [[21.0], [22.0], [23.0], [24.0]],
                        [[25.0], [26.0], [27.0], [28.0]], [[29.0], [30.0], [31.0], [32.0]],
                        [[33.0], [34.0], [35.0], [36.0]]
                    ]);
                    size = [9, 4];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[95.0], [115.0]], [[220.0], [236.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: upscale, taller than wider, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0]], [[5.0], [6.0], [7.0], [8.0]],
                        [[9.0], [10.0], [11.0], [12.0]], [[13.0], [14.0], [15.0], [16.0]],
                        [[17.0], [18.0], [19.0], [20.0]], [[21.0], [22.0], [23.0], [24.0]],
                        [[25.0], [26.0], [27.0], [28.0]], [[29.0], [30.0], [31.0], [32.0]],
                        [[33.0], [34.0], [35.0], [36.0]]
                    ]);
                    size = [9, 4];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[60.0], [76.0]], [[255.0], [275.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: upscale, wider than taller', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0], [5.0], [6.0], [7.0]],
                        [[8.0], [9.0], [10.0], [11.0], [12.0], [13.0], [14.0]],
                        [[15.0], [16.0], [17.0], [18.0], [19.0], [20.0], [21.0]],
                        [[22.0], [23.0], [24.0], [25.0], [26.0], [27.0], [28.0]]
                    ]);
                    size = [4, 7];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[48.0], [57.0]], [[160.0], [141.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: upscale, wider than taller, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [4.0], [5.0], [6.0], [7.0]],
                        [[8.0], [9.0], [10.0], [11.0], [12.0], [13.0], [14.0]],
                        [[15.0], [16.0], [17.0], [18.0], [19.0], [20.0], [21.0]],
                        [[22.0], [23.0], [24.0], [25.0], [26.0], [27.0], [28.0]]
                    ]);
                    size = [4, 7];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[33.0], [72.0]], [[117.0], [184.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    //
    // Downscaling
    //
    it('greyscale: downscale, same aspect ratio', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    size = [2, 2];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [0.0], [2.0], [0.0]], [[0.0], [0.0], [0.0], [0.0]],
                        [[3.0], [0.0], [4.0], [0.0]], [[0.0], [0.0], [0.0], [0.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, same aspect ratio, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    size = [2, 2];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [0.0], [0.0], [2.0]], [[0.0], [0.0], [0.0], [0.0]],
                        [[0.0], [0.0], [0.0], [0.0]], [[3.0], [0.0], [0.0], [4.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, taller than wider', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]], [[5.0], [6.0]]]);
                    size = [3, 2];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [0.0], [2.0], [0.0]], [[3.0], [0.0], [4.0], [0.0]],
                        [[5.0], [0.0], [6.0], [0.0]], [[0.0], [0.0], [0.0], [0.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, taller than wider, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]], [[5.0], [6.0]]]);
                    size = [3, 2];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [0.0], [0.0], [2.0]], [[0.0], [0.0], [0.0], [0.0]],
                        [[3.0], [0.0], [0.0], [4.0]], [[5.0], [0.0], [0.0], [6.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, taller than wider', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0], [3.0]], [[4.0], [5.0], [6.0]]]);
                    size = [2, 3];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [2.0], [3.0], [0.0]], [[0.0], [0.0], [0.0], [0.0]],
                        [[4.0], [5.0], [6.0], [0.0]], [[0.0], [0.0], [0.0], [0.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, taller than wider, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [[100.0], [50.0], [25.0], [10.0]], [[60.0], [20.0], [80.0], [20.0]],
                        [[40.0], [15.0], [200.0], [203.0]], [[40.0], [10.0], [230.0], [200.0]]
                    ]);
                    dy = tf.tensor3d([[[1.0], [2.0], [3.0]], [[4.0], [5.0], [6.0]]]);
                    size = [2, 3];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0], [0.0], [2.0], [3.0]], [[0.0], [0.0], [0.0], [0.0]],
                        [[0.0], [0.0], [0.0], [0.0]], [[4.0], [0.0], [5.0], [6.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, same size', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    size = [2, 2];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('greyscale: downscale, same size, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([[[100.0], [50.0]], [[60.0], [20.0]]]);
                    dy = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    size = [2, 2];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([[[1.0], [2.0]], [[3.0], [4.0]]]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    //
    // 3 channel images
    //
    it('color: upscale, wider than taller', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [
                            [100.26818084716797, 74.61857604980469, 81.62117767333984],
                            [127.86964416503906, 85.0583267211914, 102.95439147949219]
                        ],
                        [
                            [104.3798828125, 96.70733642578125, 92.60601043701172],
                            [77.63021850585938, 68.55794525146484, 96.17212677001953]
                        ]
                    ]);
                    dy = tf.tensor3d([
                        [
                            [1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0], [10.0, 11.0, 12.0],
                            [13.0, 14.0, 15.0]
                        ],
                        [
                            [16.0, 17.0, 18.0], [19.0, 20.0, 21.0], [22.0, 23.0, 24.0],
                            [25.0, 26.0, 27.0], [28.0, 29.0, 30.0]
                        ],
                        [
                            [31.0, 32.0, 33.0], [34.0, 35.0, 36.0], [37.0, 38.0, 39.0],
                            [40.0, 41.0, 42.0], [43.0, 44.0, 45.0]
                        ]
                    ]);
                    size = [3, 5];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[69.0, 75.0, 81.0], [76.0, 80.0, 84.0]],
                        [[102.0, 105.0, 108.0], [83.0, 85.0, 87.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('color: upscale, wider than taller, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [
                            [100.26818084716797, 74.61857604980469, 81.62117767333984],
                            [127.86964416503906, 85.0583267211914, 102.95439147949219]
                        ],
                        [
                            [104.3798828125, 96.70733642578125, 92.60601043701172],
                            [77.63021850585938, 68.55794525146484, 96.17212677001953]
                        ]
                    ]);
                    dy = tf.tensor3d([
                        [
                            [1.0, 2.0, 3.0], [4.0, 5.0, 6.0], [7.0, 8.0, 9.0], [10.0, 11.0, 12.0],
                            [13.0, 14.0, 15.0]
                        ],
                        [
                            [16.0, 17.0, 18.0], [19.0, 20.0, 21.0], [22.0, 23.0, 24.0],
                            [25.0, 26.0, 27.0], [28.0, 29.0, 30.0]
                        ],
                        [
                            [31.0, 32.0, 33.0], [34.0, 35.0, 36.0], [37.0, 38.0, 39.0],
                            [40.0, 41.0, 42.0], [43.0, 44.0, 45.0]
                        ]
                    ]);
                    size = [3, 5];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[5.0, 7.0, 9.0], [30.0, 33.0, 36.0]],
                        [[100.0, 104.0, 108.0], [195.0, 201.0, 207.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('color: downscale, taller than wider', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [
                            [97.98934936523438, 77.24969482421875, 113.70111846923828],
                            [111.34081268310547, 113.15758514404297, 157.90521240234375],
                            [105.77980041503906, 85.75989532470703, 69.62374114990234],
                            [125.94231414794922, 73.11385345458984, 87.03099822998047]
                        ],
                        [
                            [62.25117111206055, 90.23927307128906, 119.1966552734375],
                            [93.55166625976562, 95.9106674194336, 115.56237030029297],
                            [102.98121643066406, 98.1983413696289, 97.55982971191406],
                            [86.47753143310547, 97.04051208496094, 121.50492095947266]
                        ],
                        [
                            [92.4140853881836, 118.45619201660156, 108.0341796875],
                            [126.43061065673828, 123.28077697753906, 121.03379821777344],
                            [128.6694793701172, 98.47042846679688, 114.47464752197266],
                            [93.31566619873047, 95.2713623046875, 102.51188659667969]
                        ],
                        [
                            [101.55884552001953, 83.31947326660156, 119.08016204833984],
                            [128.28546142578125, 92.56212615966797, 74.85054779052734],
                            [88.9786148071289, 119.43685913085938, 73.06110382080078],
                            [98.17908477783203, 105.54570007324219, 93.45832061767578]
                        ]
                    ]);
                    dy = tf.tensor3d([[[1.0, 2.0, 3.0]], [[4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0]]]);
                    size = [3, 1];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0, 2.0, 3.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[4.0, 5.0, 6.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[7.0, 8.0, 9.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('color: downscale, taller than wider, align corners', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [
                            [97.98934936523438, 77.24969482421875, 113.70111846923828],
                            [111.34081268310547, 113.15758514404297, 157.90521240234375],
                            [105.77980041503906, 85.75989532470703, 69.62374114990234],
                            [125.94231414794922, 73.11385345458984, 87.03099822998047]
                        ],
                        [
                            [62.25117111206055, 90.23927307128906, 119.1966552734375],
                            [93.55166625976562, 95.9106674194336, 115.56237030029297],
                            [102.98121643066406, 98.1983413696289, 97.55982971191406],
                            [86.47753143310547, 97.04051208496094, 121.50492095947266]
                        ],
                        [
                            [92.4140853881836, 118.45619201660156, 108.0341796875],
                            [126.43061065673828, 123.28077697753906, 121.03379821777344],
                            [128.6694793701172, 98.47042846679688, 114.47464752197266],
                            [93.31566619873047, 95.2713623046875, 102.51188659667969]
                        ],
                        [
                            [101.55884552001953, 83.31947326660156, 119.08016204833984],
                            [128.28546142578125, 92.56212615966797, 74.85054779052734],
                            [88.9786148071289, 119.43685913085938, 73.06110382080078],
                            [98.17908477783203, 105.54570007324219, 93.45832061767578]
                        ]
                    ]);
                    dy = tf.tensor3d([[[1.0, 2.0, 3.0]], [[4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0]]]);
                    size = [3, 1];
                    alignCorners = true;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0, 2.0, 3.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[4.0, 5.0, 6.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]],
                        [[7.0, 8.0, 9.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0], [0.0, 0.0, 0.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
    it('color: same size', function () { return __awaiter(_this, void 0, void 0, function () {
        var input, dy, size, alignCorners, g, output, expected, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    input = tf.tensor3d([
                        [
                            [100.26818084716797, 74.61857604980469, 81.62117767333984],
                            [127.86964416503906, 85.0583267211914, 102.95439147949219]
                        ],
                        [
                            [104.3798828125, 96.70733642578125, 92.60601043701172],
                            [77.63021850585938, 68.55794525146484, 96.17212677001953]
                        ]
                    ]);
                    dy = tf.tensor3d([
                        [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]
                    ]);
                    size = [2, 2];
                    alignCorners = false;
                    g = tf.grad(function (i) {
                        return tf.image.resizeNearestNeighbor(i, size, alignCorners);
                    });
                    output = g(input, dy);
                    expected = tf.tensor3d([
                        [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]], [[7.0, 8.0, 9.0], [10.0, 11.0, 12.0]]
                    ]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, output.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, expected.data()];
                case 2:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    expect(output.shape).toEqual(expected.shape);
                    expect(output.dtype).toBe(expected.dtype);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=resize_nearest_neighbor_test.js.map