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
Object.defineProperty(exports, "__esModule", { value: true });
var ring_buffer_1 = require("./ring_buffer");
var GrowingRingBuffer = /** @class */ (function (_super) {
    __extends(GrowingRingBuffer, _super);
    /**
     * Constructs a `GrowingRingBuffer`.
     */
    function GrowingRingBuffer() {
        return _super.call(this, GrowingRingBuffer.INITIAL_CAPACITY) || this;
    }
    GrowingRingBuffer.prototype.isFull = function () {
        return false;
    };
    GrowingRingBuffer.prototype.push = function (value) {
        if (_super.prototype.isFull.call(this)) {
            this.expand();
        }
        _super.prototype.push.call(this, value);
    };
    GrowingRingBuffer.prototype.unshift = function (value) {
        if (_super.prototype.isFull.call(this)) {
            this.expand();
        }
        _super.prototype.unshift.call(this, value);
    };
    /**
     * Doubles the capacity of the buffer.
     */
    GrowingRingBuffer.prototype.expand = function () {
        var newCapacity = this.capacity * 2;
        var newData = new Array(newCapacity);
        var len = this.length();
        // Rotate the buffer to start at index 0 again, since we can't just
        // allocate more space at the end.
        for (var i = 0; i < len; i++) {
            newData[i] = this.get(this.wrap(this.begin + i));
        }
        this.data = newData;
        this.capacity = newCapacity;
        this.doubledCapacity = 2 * this.capacity;
        this.begin = 0;
        this.end = len;
    };
    GrowingRingBuffer.INITIAL_CAPACITY = 32;
    return GrowingRingBuffer;
}(ring_buffer_1.RingBuffer));
exports.GrowingRingBuffer = GrowingRingBuffer;
//# sourceMappingURL=growing_ring_buffer.js.map