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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Implementation of the NonMaxSuppression kernel shared between webgl and cpu.
 */
var tensor_ops_1 = require("../ops/tensor_ops");
function nonMaxSuppressionImpl(boxes, scores, maxOutputSize, iouThreshold, scoreThreshold) {
    var candidates = Array.from(scores)
        .map(function (score, boxIndex) { return ({ score: score, boxIndex: boxIndex }); })
        .filter(function (c) { return c.score > scoreThreshold; })
        .sort(function (c1, c2) { return c2.score - c1.score; });
    var selected = [];
    for (var i = 0; i < candidates.length; i++) {
        var _a = candidates[i], score = _a.score, boxIndex = _a.boxIndex;
        if (score < scoreThreshold) {
            break;
        }
        var ignoreCandidate = false;
        for (var j = selected.length - 1; j >= 0; --j) {
            var iou = intersectionOverUnion(boxes, boxIndex, selected[j]);
            if (iou >= iouThreshold) {
                ignoreCandidate = true;
                break;
            }
        }
        if (!ignoreCandidate) {
            selected.push(boxIndex);
            if (selected.length >= maxOutputSize) {
                break;
            }
        }
    }
    return tensor_ops_1.tensor1d(selected, 'int32');
}
exports.nonMaxSuppressionImpl = nonMaxSuppressionImpl;
function intersectionOverUnion(boxes, i, j) {
    var iCoord = boxes.subarray(i * 4, i * 4 + 4);
    var jCoord = boxes.subarray(j * 4, j * 4 + 4);
    var yminI = Math.min(iCoord[0], iCoord[2]);
    var xminI = Math.min(iCoord[1], iCoord[3]);
    var ymaxI = Math.max(iCoord[0], iCoord[2]);
    var xmaxI = Math.max(iCoord[1], iCoord[3]);
    var yminJ = Math.min(jCoord[0], jCoord[2]);
    var xminJ = Math.min(jCoord[1], jCoord[3]);
    var ymaxJ = Math.max(jCoord[0], jCoord[2]);
    var xmaxJ = Math.max(jCoord[1], jCoord[3]);
    var areaI = (ymaxI - yminI) * (xmaxI - xminI);
    var areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
    if (areaI <= 0 || areaJ <= 0) {
        return 0.0;
    }
    var intersectionYmin = Math.max(yminI, yminJ);
    var intersectionXmin = Math.max(xminI, xminJ);
    var intersectionYmax = Math.min(ymaxI, ymaxJ);
    var intersectionXmax = Math.min(xmaxI, xmaxJ);
    var intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
        Math.max(intersectionXmax - intersectionXmin, 0.0);
    return intersectionArea / (areaI + areaJ - intersectionArea);
}
//# sourceMappingURL=non_max_suppression_impl.js.map