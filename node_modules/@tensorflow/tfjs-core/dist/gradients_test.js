"use strict";
/**
 * @license
 * Copyright 2019 Google Inc. All Rights Reserved.
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
var engine_1 = require("./engine");
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('gradients', jasmine_util_1.ALL_ENVS, function () {
    it('matmul + relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, da, db, dedm, transposeA, transposeB, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    a = tf.tensor2d([-1, 2, -3, 10, -20, 30], [2, 3]);
                    b = tf.tensor2d([2, -3, 4, -1, 2, -3], [3, 2]);
                    _a = tf.grads(function (a, b) {
                        // m = dot(a, b)
                        // y = relu(m)
                        // e = sum(y)
                        var m = tf.matMul(a, b);
                        var y = tf.relu(m);
                        return tf.sum(y);
                    })([a, b]), da = _a[0], db = _a[1];
                    dedm = tf.step(tf.matMul(a, b));
                    // de/da = dot(de/dy, bT)
                    expect(da.shape).toEqual(a.shape);
                    transposeA = false;
                    transposeB = true;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _c = [_f.sent()];
                    return [4 /*yield*/, tf.matMul(dedm, b, transposeA, transposeB).data()];
                case 2:
                    _b.apply(void 0, _c.concat([_f.sent()]));
                    // de/db = dot(aT, de/dy)
                    expect(db.shape).toEqual(b.shape);
                    transposeA = true;
                    transposeB = false;
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 3:
                    _e = [_f.sent()];
                    return [4 /*yield*/, tf.matMul(a, dedm, transposeA, transposeB).data()];
                case 4:
                    _d.apply(void 0, _e.concat([_f.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad(f)', function () { return __awaiter(_this, void 0, void 0, function () {
        var grad, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    grad = tf.grad(function (x) { return x.square(); });
                    result = grad(tf.tensor1d([.1, .2]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [.2, .4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calling grad(f) twice works', function () { return __awaiter(_this, void 0, void 0, function () {
        var grad, result, result2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    grad = tf.grad(function (x) { return x.square(); });
                    result = grad(tf.tensor1d([.1, .2]));
                    result2 = grad(tf.tensor1d([.1, .4]));
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [.2, .4]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result2.data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [.2, .8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad(f): throwing an error during forward pass', function () {
        var grad = tf.grad(function (x) {
            throw new Error('failed forward pass');
        });
        expect(function () { return grad(tf.zeros([])); }).toThrowError();
        expect(engine_1.ENGINE.isTapeOn()).toBe(false);
    });
    it('grad(f): throwing an error during backwards pass', function () {
        var customOp = tf.customGrad(function (x) {
            return {
                value: x,
                gradFunc: function () {
                    throw new Error('failed backward pass');
                }
            };
        });
        var grad = tf.grad(function (x) { return customOp(x); });
        expect(function () { return grad(tf.zeros([])); }).toThrowError();
        expect(engine_1.ENGINE.isTapeOn()).toBe(false);
    });
    it('grads(f)', function () { return __awaiter(_this, void 0, void 0, function () {
        var grads, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    grads = tf.grads(function (x) { return x.square(); });
                    result = grads([tf.tensor1d([.1, .2])]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result[0].data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [.2, .4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('calling grads(f) twice works', function () { return __awaiter(_this, void 0, void 0, function () {
        var grads, result, result2, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    grads = tf.grads(function (x) { return x.square(); });
                    result = grads([tf.tensor1d([.1, .2])]);
                    result2 = grads([tf.tensor1d([.1, .4])]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result[0].data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [.2, .4]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result2[0].data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [.2, .8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('works with reshape', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, exponent, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
                    exponent = tf.tensor1d([2, 2, 2, 2], 'int32');
                    da = tf.grad(function (a) {
                        var b = a.flatten();
                        var m = tf.pow(b, exponent);
                        return tf.sum(m);
                    })(a);
                    expect(da.shape).toEqual([2, 2]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reshape outside tf.grads() throws error', function () {
        var a = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var b = a.flatten();
        var exponent = tf.tensor1d([2, 2, 2, 2], 'int32');
        var f = function () {
            tf.grads(function (a, b) {
                var m = tf.pow(b, exponent);
                return tf.sum(m);
            })([a, b]);
        };
        expect(f).toThrowError();
    });
    it('does not error if irrelevant (pruned) ops are missing grads', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor1d([true, true], 'bool');
                    b = tf.tensor1d([false, true], 'bool');
                    da = tf.grad(function (a) {
                        // Logical has no gradients, but it is irrelevant.
                        a.logicalAnd(b);
                        return a.sum();
                    })(a);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [1, 1]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('errors if relevant ops are missing grads', function () {
        var a = tf.tensor1d([true, true], 'bool');
        var b = tf.tensor1d([false, true], 'bool');
        var dfda = tf.grad(function (a) {
            // Logical has no gradients, but it's relevant to the output.
            return a.logicalAnd(b);
        });
        expect(function () { return dfda(a); }).toThrowError();
    });
    it('works with asType', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, exponent, da, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    a = tf.tensor2d([1, 2, 3, 4], [2, 2], 'int32');
                    exponent = tf.tensor2d([2, 2, 2, 2], [2, 2], 'int32');
                    da = tf.grad(function (a) {
                        var b = a.toFloat();
                        var m = tf.pow(b, exponent);
                        return tf.sum(m);
                    })(a);
                    expect(da.shape).toEqual([2, 2]);
                    expect(da.dtype).toEqual('float32');
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2, 4, 6, 8]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('asType outside of tf.grads() throws error', function () {
        var a = tf.tensor2d([1, 2, 3, 4], [2, 2], 'int32');
        var b = a.toFloat();
        var exponent = tf.tensor2d([2, 2, 2, 2], [2, 2], 'int32');
        var f = function () {
            tf.grad(function (a) {
                var m = tf.pow(b, exponent);
                return tf.sum(m);
            })(a);
        };
        expect(f).toThrowError();
    });
    it('saves tensors from the forward pass as expected', function () {
        var x = tf.scalar(1).variable();
        var optimizer = tf.train.sgd(0.1);
        optimizer.minimize(function () {
            var y = x.square();
            var z = y.square();
            y.dispose();
            return z;
        });
    });
    it('custom ops do not leak', function () {
        var before = tf.memory().numTensors;
        var x = tf.softmax([1, 2, 3, 4]);
        x.dispose();
        var now = tf.memory().numTensors;
        expect(now).toBe(before);
    });
});
jasmine_util_1.describeWithFlags('valueAndGradients', jasmine_util_1.ALL_ENVS, function () {
    it('matmul + relu', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, value, grads, _b, dedm, da, db, transposeA, transposeB, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    a = tf.tensor2d([-1, 2, -3, 10, -20, 30], [2, 3]);
                    b = tf.tensor2d([2, -3, 4, -1, 2, -3], [3, 2]);
                    _a = tf.valueAndGrads(function (a, b) {
                        // m = dot(a, b)
                        // y = relu(m)
                        // e = sum(y)
                        var m = tf.matMul(a, b);
                        var y = tf.relu(m);
                        return tf.sum(y);
                    })([a, b]), value = _a.value, grads = _a.grads;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, value.data()];
                case 1:
                    _b.apply(void 0, [_g.sent(), 10]);
                    dedm = tf.step(tf.matMul(a, b));
                    da = grads[0], db = grads[1];
                    transposeA = false;
                    transposeB = true;
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _d = [_g.sent()];
                    return [4 /*yield*/, tf.matMul(dedm, b, transposeA, transposeB).data()];
                case 3:
                    _c.apply(void 0, _d.concat([_g.sent()]));
                    // de/db = dot(aT, de/dy)
                    transposeA = true;
                    transposeB = false;
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 4:
                    _f = [_g.sent()];
                    return [4 /*yield*/, tf.matMul(a, dedm, transposeA, transposeB).data()];
                case 5:
                    _e.apply(void 0, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('matmul + relu + inner tidy', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, _a, value, grads, _b, dedm, da, db, transposeA, transposeB, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    a = tf.tensor2d([-1, 2, -3, 10, -20, 30], [2, 3]);
                    b = tf.tensor2d([2, -3, 4, -1, 2, -3], [3, 2]);
                    _a = tf.valueAndGrads(function (a, b) {
                        // m = dot(a, b)
                        // y = relu(m)
                        // e = sum(y)
                        var m = tf.matMul(a, b);
                        return tf.tidy(function () {
                            var y = tf.relu(m);
                            return tf.sum(y);
                        });
                    })([a, b]), value = _a.value, grads = _a.grads;
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, value.data()];
                case 1:
                    _b.apply(void 0, [_g.sent(), 10]);
                    dedm = tf.step(tf.matMul(a, b));
                    da = grads[0], db = grads[1];
                    transposeA = false;
                    transposeB = true;
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, da.data()];
                case 2:
                    _d = [_g.sent()];
                    return [4 /*yield*/, tf.matMul(dedm, b, transposeA, transposeB).data()];
                case 3:
                    _c.apply(void 0, _d.concat([_g.sent()]));
                    // de/db = dot(aT, de/dy)
                    transposeA = true;
                    transposeB = false;
                    _e = test_util_1.expectArraysClose;
                    return [4 /*yield*/, db.data()];
                case 4:
                    _f = [_g.sent()];
                    return [4 /*yield*/, tf.matMul(a, dedm, transposeA, transposeB).data()];
                case 5:
                    _e.apply(void 0, _f.concat([_g.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('higher-order gradients', jasmine_util_1.ALL_ENVS, function () {
    it('grad(grad(f))', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, before, gradgrad, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.tensor1d([.1, .2]);
                    before = tf.memory().numTensors;
                    gradgrad = tf.grad(tf.grad(function (x) { return x.mul(x).mul(x); }));
                    result = gradgrad(x);
                    expect(tf.memory().numTensors).toBe(before + 1);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [.6, 1.2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grad(grad(x^2))', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, gradgrad, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(3);
                    gradgrad = tf.grad(tf.grad(function (x) { return x.square(); }));
                    result = gradgrad(x);
                    // grad(grad(x^2)) = grad(2x) = 2
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result.data()];
                case 1:
                    // grad(grad(x^2)) = grad(2x) = 2
                    _a.apply(void 0, [_b.sent(), [2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('grads(grads(f))', function () { return __awaiter(_this, void 0, void 0, function () {
        var grads, gradsgrads, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    grads = tf.grads(function (x) { return x.mul(x).mul(x); });
                    gradsgrads = tf.grads(function (x) { return grads([x])[0]; });
                    result = gradsgrads([tf.tensor1d([.1, .2])]);
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, result[0].data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [.6, 1.2]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
jasmine_util_1.describeWithFlags('customGradient', jasmine_util_1.ALL_ENVS, function () {
    it('basic', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, customPow, _a, value, grad, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    a = tf.scalar(3);
                    b = tf.scalar(2, 'int32');
                    dy = tf.scalar(4);
                    customPow = tf.customGrad(function (a) {
                        var value = tf.pow(a, b);
                        var gradFunc = function (dy) { return dy.mul(tf.scalar(0.1)); };
                        return { value: value, gradFunc: gradFunc };
                    });
                    _a = tf.valueAndGrad(function (a) { return customPow(a); })(a, dy), value = _a.value, grad = _a.grad;
                    expect(value.shape).toEqual(a.shape);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, value.data()];
                case 1:
                    _b.apply(void 0, [_d.sent(), [9]]);
                    expect(grad.shape).toEqual(a.shape);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad.data()];
                case 2:
                    _c.apply(void 0, [_d.sent(), [.4]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('second order derivative through customGradient', function () { return __awaiter(_this, void 0, void 0, function () {
        var a, b, dy, customPow, dda, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    a = tf.scalar(3);
                    b = tf.scalar(2, 'int32');
                    dy = tf.scalar(5);
                    customPow = tf.customGrad(function (a, save) {
                        var value = tf.pow(a, b);
                        save([a]);
                        var gradFunc = function (dy, saved) {
                            var a = saved[0];
                            return dy.mul(a);
                        };
                        return { value: value, gradFunc: gradFunc };
                    });
                    dda = tf.grad(tf.grad(function (a) { return customPow(a); }))(a, dy);
                    expect(dda.shape).toEqual(a.shape);
                    // First order: dy * a. Second order: dy.
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dda.data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, dy.data()];
                case 2:
                    // First order: dy * a. Second order: dy.
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('calling gradient of custom op twice works', function () { return __awaiter(_this, void 0, void 0, function () {
        var customOp, x, grad, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    customOp = tf.customGrad(function (x, save) {
                        // Override gradient of our custom x ^ 2 op to be dy * abs(x);
                        save([x]);
                        return {
                            value: x.square(),
                            gradFunc: function (dy, saved) {
                                var x = saved[0];
                                return dy.mul(x.abs());
                            }
                        };
                    });
                    x = tf.tensor1d([-1, -2, 3]);
                    grad = tf.grad(function (x) { return customOp(x); });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad(x).data()];
                case 1:
                    _a.apply(void 0, [_c.sent(), [1, 2, 3]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, grad(x).data()];
                case 2:
                    _b.apply(void 0, [_c.sent(), [1, 2, 3]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=gradients_test.js.map