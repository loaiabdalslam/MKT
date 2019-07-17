"use strict";
/**
 * @license
 * Copyright 2017 Google Inc. All Rights Reserved.
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
var tf = require("./index");
var jasmine_util_1 = require("./jasmine_util");
var tape_1 = require("./tape");
var test_util_1 = require("./test_util");
jasmine_util_1.describeWithFlags('getFilteredNodesXToY', jasmine_util_1.ALL_ENVS, function () {
    it('no paths from x to y', function () {
        var x = tf.scalar(1);
        var intermediate1 = tf.scalar(0);
        var intermediate2 = tf.scalar(0);
        var y = tf.scalar(2);
        var tape = [
            {
                id: 0,
                name: 'node0',
                inputs: { x: x },
                outputs: [intermediate1],
                gradient: null
            },
            {
                id: 1,
                name: 'node1',
                inputs: { intermediate2: intermediate2 },
                outputs: [y],
                gradient: null
            }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x], y);
        expect(filteredTapeNodes.length).toBe(0);
        expect(filteredTapeNodes).toEqual([]);
    });
    it('one operation x => y', function () {
        var x = tf.scalar(1);
        var y = tf.scalar(2);
        var tape = [{ id: 0, name: 'node0', inputs: { x: x }, outputs: [y], gradient: null }];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x], y);
        expect(filteredTapeNodes.length).toBe(1);
        expect(filteredTapeNodes).toEqual(tape);
    });
    it('1 operation [x0, x1] => y, all input paths', function () {
        var x0 = tf.scalar(0);
        var x1 = tf.scalar(1);
        var y = tf.scalar(2);
        var tape = [
            { id: 0, name: 'node0', inputs: { x0: x0, x1: x1 }, outputs: [y], gradient: null }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x0, x1], y);
        expect(filteredTapeNodes.length).toBe(1);
        expect(filteredTapeNodes).toEqual(tape);
    });
    it('one operation [x0, x1] => y, one input paths', function () {
        var x0 = tf.scalar(0);
        var x1 = tf.scalar(1);
        var y = tf.scalar(2);
        var tape = [
            { id: 0, name: 'node0', inputs: { x0: x0, x1: x1 }, outputs: [y], gradient: null }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x0], y);
        expect(filteredTapeNodes.length).toBe(1);
        // x1 input should be pruned, we don't ask for the gradient of x1.
        expect(filteredTapeNodes[0])
            .toEqual({ id: 0, name: 'node0', inputs: { x0: x0 }, outputs: [y], gradient: null });
    });
    it('two operations x => intermediate => y', function () {
        var x = tf.scalar(1);
        var intermediate = tf.scalar(0);
        var y = tf.scalar(2);
        var tape = [
            {
                id: 0,
                name: 'node0',
                inputs: { x: x },
                outputs: [intermediate],
                gradient: null
            },
            {
                id: 1,
                name: 'node1',
                inputs: { intermediate: intermediate },
                outputs: [y],
                gradient: null
            }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x], y);
        expect(filteredTapeNodes.length).toBe(2);
        expect(filteredTapeNodes).toEqual(tape);
    });
    it('two operations [x0, x1], [x2] => ' +
        'intermediate => y', function () {
        var x0 = tf.scalar(1);
        var x1 = tf.scalar(2);
        var x2 = tf.scalar(3);
        var intermediate = tf.scalar(4);
        var y = tf.scalar(2);
        var tape = [
            {
                id: 0,
                name: 'node0',
                inputs: { x0: x0, x1: x1 },
                outputs: [intermediate],
                gradient: null
            },
            {
                id: 1,
                name: 'node1',
                inputs: { x2: x2, intermediate: intermediate },
                outputs: [y],
                gradient: null
            }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x0, x1, x2], y);
        expect(filteredTapeNodes.length).toBe(2);
        expect(filteredTapeNodes).toEqual(tape);
    });
    it('x => y and x => orphan', function () {
        var x = tf.scalar(1);
        var orphan = tf.scalar(0);
        var y = tf.scalar(2);
        var tape = [
            { id: 0, name: 'node0', inputs: { x: x }, outputs: [orphan], gradient: null },
            { id: 1, name: 'node1', inputs: { x: x }, outputs: [y], gradient: null }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x], y);
        expect(filteredTapeNodes.length).toBe(1);
        // The orphan should be removed.
        expect(filteredTapeNodes[0]).toEqual(tape[1]);
    });
    it('x => y and orphan => y', function () {
        var x = tf.scalar(1);
        var orphan = tf.scalar(0);
        var y = tf.scalar(2);
        var tape = [
            { id: 0, name: 'node0', inputs: { x: x, orphan: orphan }, outputs: [y], gradient: null }
        ];
        var filteredTapeNodes = tape_1.getFilteredNodesXToY(tape, [x], y);
        expect(filteredTapeNodes.length).toBe(1);
        // The orphan should be pruned from the node's input.
        expect(filteredTapeNodes[0])
            .toEqual({ id: 0, name: 'node0', inputs: { x: x }, outputs: [y], gradient: null });
    });
    it('1 op with 3 outputs x => y1, y2, y3', function () {
        var x = tf.scalar(1);
        var y1 = tf.scalar(2);
        var y2 = tf.scalar(2);
        var y3 = tf.scalar(2);
        var tape = [
            { id: 0, name: 'node0', inputs: { x: x }, outputs: [y1, y2, y3], gradient: null }
        ];
        var filteredNodes1 = tape_1.getFilteredNodesXToY(tape, [x], y1);
        expect(filteredNodes1.length).toBe(1);
        expect(filteredNodes1).toEqual(tape);
        var filteredNodes2 = tape_1.getFilteredNodesXToY(tape, [x], y2);
        expect(filteredNodes2.length).toBe(1);
        expect(filteredNodes2).toEqual(tape);
        var filteredNodes3 = tape_1.getFilteredNodesXToY(tape, [x], y3);
        expect(filteredNodes3.length).toBe(1);
        expect(filteredNodes3).toEqual(tape);
    });
});
jasmine_util_1.describeWithFlags('backpropagateGradients', jasmine_util_1.ALL_ENVS, function () {
    it('Throws if gradient is not defined', function () {
        var x = tf.scalar(0);
        var y = tf.scalar(1);
        var dy = tf.scalar(1);
        var accumulatedGradientsMap = {};
        accumulatedGradientsMap[y.id] = dy;
        var tape = [{ id: 0, name: 'node0', inputs: { x: x }, outputs: [y], gradient: null }];
        expect(function () { return tape_1.backpropagateGradients(accumulatedGradientsMap, tape, function (f) { return tf.tidy(f); }); })
            .toThrowError();
    });
    it('basic backprop with 1 node', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, y, dy, accumulatedGradientsMap, tape, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(0);
                    y = tf.scalar(1);
                    dy = tf.scalar(1);
                    accumulatedGradientsMap = {};
                    accumulatedGradientsMap[y.id] = dy;
                    tape = [{
                            id: 0,
                            name: 'node0',
                            inputs: { x: x },
                            outputs: [y],
                            gradient: function (dy) {
                                return { x: function () { return dy.add(tf.scalar(1)); } };
                            }
                        }];
                    tape_1.backpropagateGradients(accumulatedGradientsMap, tape, function (f) { return tf.tidy(f); });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, accumulatedGradientsMap[x.id].data()];
                case 1:
                    _a.apply(void 0, [_b.sent(), [2]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic backprop with 2 nodes', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, intermediate, y, dy, accumulatedGradientsMap, tape, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    x = tf.scalar(0);
                    intermediate = tf.scalar(1);
                    y = tf.scalar(2);
                    dy = tf.scalar(1);
                    accumulatedGradientsMap = {};
                    accumulatedGradientsMap[y.id] = dy;
                    tape = [
                        {
                            id: 0,
                            name: 'node0',
                            inputs: { x: x },
                            outputs: [intermediate],
                            gradient: function (dy) {
                                return { x: function () { return dy.add(tf.scalar(1)); } };
                            }
                        },
                        {
                            id: 1,
                            name: 'node1',
                            inputs: { intermediate: intermediate },
                            outputs: [y],
                            gradient: function (dy) {
                                return { intermediate: function () { return dy.add(tf.scalar(1)); } };
                            }
                        }
                    ];
                    tape_1.backpropagateGradients(accumulatedGradientsMap, tape, function (f) { return tf.tidy(f); });
                    // dx = dy + 1 + 1
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, accumulatedGradientsMap[x.id].data()];
                case 1:
                    // dx = dy + 1 + 1
                    _a.apply(void 0, [_b.sent(), [3]]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('basic backprop with a split node accumulates gradients', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, intermediate1, intermediate2, y, dy, accumulatedGradientsMap, tape, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    x = tf.scalar(0);
                    intermediate1 = tf.scalar(1);
                    intermediate2 = tf.scalar(2);
                    y = tf.scalar(3);
                    dy = tf.scalar(1);
                    accumulatedGradientsMap = {};
                    accumulatedGradientsMap[y.id] = dy;
                    tape = [
                        {
                            id: 0,
                            name: 'node0',
                            inputs: { x: x },
                            outputs: [intermediate1],
                            gradient: function (dy) {
                                return { x: function () { return dy.add(tf.scalar(1)); } };
                            }
                        },
                        {
                            id: 1,
                            name: 'node1',
                            inputs: { x: x },
                            outputs: [intermediate2],
                            gradient: function (dy) {
                                return { x: function () { return dy.add(tf.scalar(1)); } };
                            }
                        },
                        {
                            id: 2,
                            name: 'node2',
                            inputs: { intermediate1: intermediate1, intermediate2: intermediate2 },
                            outputs: [y],
                            gradient: function (dy) {
                                return {
                                    intermediate1: function () { return dy.add(tf.scalar(1)); },
                                    intermediate2: function () { return dy.add(tf.scalar(1)); }
                                };
                            }
                        }
                    ];
                    tape_1.backpropagateGradients(accumulatedGradientsMap, tape, function (f) { return tf.tidy(f); });
                    // dx = dy + 1 + 1 + 1 + 1 + 1
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, accumulatedGradientsMap[x.id].data()];
                case 1:
                    _b = [_c.sent()];
                    return [4 /*yield*/, dy.data()];
                case 2:
                    // dx = dy + 1 + 1 + 1 + 1 + 1
                    _a.apply(void 0, _b.concat([[(_c.sent())[0] + 5]]));
                    return [2 /*return*/];
            }
        });
    }); });
    it('backprop over 1 node with 3 outputs, w.r.t to the 2nd output', function () { return __awaiter(_this, void 0, void 0, function () {
        var x, y1, y2, y3, accumulatedGradientsMap, dy2, dys, tape, _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    x = tf.tensor1d([1, 1, 1]);
                    y1 = tf.scalar(1);
                    y2 = tf.scalar(1);
                    y3 = tf.scalar(1);
                    accumulatedGradientsMap = {};
                    dy2 = tf.scalar(5);
                    accumulatedGradientsMap[y2.id] = dy2;
                    tape = [{
                            id: 0,
                            name: 'node0',
                            inputs: { x: x },
                            outputs: [y1, y2, y3],
                            gradient: function (dys_) {
                                dys = dys_;
                                return { x: function () { return tf.stack(dys_); } };
                            }
                        }];
                    tape_1.backpropagateGradients(accumulatedGradientsMap, tape, function (f) { return tf.tidy(f); });
                    _a = test_util_1.expectArraysClose;
                    return [4 /*yield*/, accumulatedGradientsMap[x.id].data()];
                case 1:
                    _a.apply(void 0, [_e.sent(), [0, 5, 0]]);
                    _b = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dys[0].data()];
                case 2:
                    _b.apply(void 0, [_e.sent(), [0]]);
                    _c = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dys[1].data()];
                case 3:
                    _c.apply(void 0, [_e.sent(), [5]]);
                    _d = test_util_1.expectArraysClose;
                    return [4 /*yield*/, dys[2].data()];
                case 4:
                    _d.apply(void 0, [_e.sent(), [0]]);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=tape_test.js.map