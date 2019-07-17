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
jasmine_util_1.describeWithFlags('1D FFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([1, 1]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should calculate FFT from Tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([1, 1]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t1.fft().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 2, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow (3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    t1Imag = tf.tensor1d([0, 0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [6, 0, -1.5, 0.866025, -1.5, -0.866025]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow with imaginary (3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    t1Imag = tf.tensor1d([1, 2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [6, 6, -2.3660252, -0.63397473, -0.6339747, -2.3660254]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow (negative 3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-1, -2, -3]);
                    t1Imag = tf.tensor1d([-1, -2, -3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [-5.9999995, -6, 2.3660252, 0.63397473, 0.6339747, 2.3660254]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (4 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4]);
                    t1Imag = tf.tensor1d([0, 0, 0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 0, -2, 2, -2, 0, -2, -2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow with imaginary (4 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4]);
                    t1Imag = tf.tensor1d([1, 2, 3, 4]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.fft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [10, 10, -4, 0, -2, -2, 0, -4]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('2D FFT', jasmine_util_1.ALL_ENVS, function () {
    it('2D: should return the same value as TensorFlow', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    t1Imag = tf.tensor2d([5, 6, 7, 8], [2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    y = tf.spectral.fft(t1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 11, -1, -1, 7, 15, -1, -1]]);
                    expect(y.shape).toEqual(t1Real.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D: should return the same value as TensorFlow', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, -1, -2, -3, -4], [2, 2, 2]);
                    t1Imag = tf.tensor3d([5, 6, 7, 8, -5, -6, -7, -8], [2, 2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    y = tf.spectral.fft(t1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [3, 11, -1, -1, 7, 15, -1, -1, -3, -11, 1, 1, -7, -15, 1, 1]]);
                    expect(y.shape).toEqual(t1Real.shape);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('1D IFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([1, 1]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, 1, -0.5, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should calculate FFT from Tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([1, 1]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t1.ifft().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, 1, -0.5, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow (3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    t1Imag = tf.tensor1d([0, 0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            2, -3.9736431e-08, -0.49999997, -.28867507, -0.49999994, 2.8867519e-01
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow with imaginary (3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    t1Imag = tf.tensor1d([1, 2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2, 1.9999999, -0.21132492, -0.78867507, -0.7886752, -0.2113249]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow (negative 3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-1, -2, -3]);
                    t1Imag = tf.tensor1d([-1, -2, -3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [-2, -1.9999999, 0.21132492, 0.78867507, 0.7886752, 0.2113249]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (4 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4]);
                    t1Imag = tf.tensor1d([0, 0, 0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value as TensorFlow with imaginary (4 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4]);
                    t1Imag = tf.tensor1d([1, 2, 3, 4]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.ifft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2.5, 2.5, 0, -1, -0.5, -0.5, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('2D IFFT', jasmine_util_1.ALL_ENVS, function () {
    it('2D: should return the same value as TensorFlow', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    t1Imag = tf.tensor2d([5, 6, 7, 8], [2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    y = tf.spectral.ifft(t1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, 5.5, -0.5, -0.5, 3.5, 7.5, -0.5, -0.5]]);
                    expect(y.shape).toEqual(t1Real.shape);
                    return [2 /*return*/];
            }
        });
    }); });
    it('3D: should return the same value as TensorFlow', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, y, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, -1, -2, -3, -4], [2, 2, 2]);
                    t1Imag = tf.tensor3d([5, 6, 7, 8, -5, -6, -7, -8], [2, 2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    y = tf.spectral.ifft(t1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, y.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            1.5, 5.5, -0.5, -0.5, 3.5, 7.5, -0.5, -0.5, -1.5, -5.5, 0.5, 0.5, -3.5,
                            -7.5, 0.5, 0.5
                        ]]);
                    expect(y.shape).toEqual(t1Real.shape);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('1D RFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [6, 1.1920929e-07, -1.4999999, 8.6602521e-01]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should calculate from tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t1Real.rfft().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [6, 1.1920929e-07, -1.4999999, 8.6602521e-01]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (6 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-3, -2, -1, 1, 2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -5.8859587e-07, 1.1920929e-07, -3.9999995, 6.9282026e+00, -2.9999998,
                            1.7320497, -4.0000000, -2.3841858e-07
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value without any fftLength', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, fftLength, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-3, -2, -1, 1, 2, 3]);
                    fftLength = 6;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real, fftLength).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -5.8859587e-07, 1.1920929e-07, -3.9999995, 6.9282026e+00, -2.9999998,
                            1.7320497, -4.0000000, -2.3841858e-07
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the value with cropped input', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, fftLength, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-3, -2, -1, 1, 2, 3]);
                    fftLength = 3;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real, fftLength).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -6, 0.0, -1.5000002, 0.866
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the value with padded input', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, fftLength, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([-3, -2, -1]);
                    fftLength = 4;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real, fftLength).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            -6, 0, -2, 2, -2, 0
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('2D RFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [3, 0, -1, 0, 7, 0, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            6, 1.1920929e-07, -1.4999999, 8.6602521e-01, 15, -5.9604645e-08,
                            -1.4999998, 8.6602545e-01
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x2x2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [3, 0, -1, 0, 7, 0, -1, 0, 11, 0, -1, 0, 15, 0, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the value with cropping', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, fftLength, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    fftLength = 2;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real, fftLength).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [3, 0, -1, 0, 9, 0, -1, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the value with padding', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, fftLength, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    fftLength = 4;
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.rfft(t1Real, fftLength).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [6, 0, -2, -2, 2, 0, 15, 0, -2, -5, 5, 0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('1D IRFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, -0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should calculate from the tensor directly', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2]);
                    t1Imag = tf.tensor1d([0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, t1.irfft().data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, -0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (5 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4, 5]);
                    t1Imag = tf.tensor1d([0, 0, 0, 0, 0]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [3, -0.8535534, 0, -0.14644662, 0, -0.14644662, 0, -0.8535534]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (5 elements) with imag', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor1d([1, 2, 3, 4, 5]);
                    t1Imag = tf.tensor1d([1, 2, 3, 4, 5]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [3, -2.6642137, 0.5, -0.45710677, 0, 0.16421354, -0.5, 0.95710677]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('2D IRFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    t1Imag = tf.tensor2d([0, 0, 0, 0], [2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1.5, -0.5, 3.5, -0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    t1Imag = tf.tensor2d([0, 0, 0, 0, 0, 0], [2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x3 elements) with imag', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    t1Imag = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, -1.5, 0, 0.5, 5, -3, 0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('3D IRFFT', jasmine_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2x2 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, 1, 2, 3, 4], [2, 2, 2]);
                    t1Imag = tf.tensor3d([0, 0, 0, 0, 0, 0, 0, 0], [2, 2, 2]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [1.5, -0.5, 3.5, -0.5, 1.5, -0.5, 3.5, -0.5]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x2x3 elements)', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
                    t1Imag = tf.tensor3d([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [
                            2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5, 2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5
                        ]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return the same value with TensorFlow (2x2x3 elements) with imag', function () { return __awaiter(_this, void 0, void 0, function () {
        var t1Real, t1Imag, t1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
                    t1Imag = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
                    t1 = tf.complex(t1Real, t1Imag);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, tf.spectral.irfft(t1).data()];
                case 1:
                    _a.apply(void 0, [_b.sent(),
                        [2, -1.5, 0, 0.5, 5, -3, 0, 2, 2, -1.5, 0, 0.5, 5, -3, 0, 2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=spectral_ops_test.js.map