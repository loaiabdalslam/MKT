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
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A ring buffer, providing O(1) FIFO, LIFO, and related operations.
 */
var RingBuffer = /** @class */ (function () {
    /**
     * Constructs a `RingBuffer`.
     * @param capacity The number of items that the buffer can accomodate.
     */
    function RingBuffer(capacity) {
        this.capacity = capacity;
        // Note we store the indices in the range 0 <= index < 2*capacity.
        // This allows us to distinguish the full from the empty case.
        // See https://www.snellman.net/blog/archive/2016-12-13-ring-buffers/
        this.begin = 0; // inclusive
        this.end = 0; // exclusive
        if (capacity == null) {
            throw new RangeError('Can\'t create a ring buffer of unknown capacity.');
        }
        if (capacity < 1) {
            throw new RangeError('Can\'t create ring buffer of capacity < 1.');
        }
        this.data = new Array(capacity);
        this.doubledCapacity = 2 * capacity;
    }
    /**
     * Map any index into the range 0 <= index < 2*capacity.
     */
    RingBuffer.prototype.wrap = function (index) {
        // don't trust % on negative numbers
        while (index < 0) {
            index += this.doubledCapacity;
        }
        return index % this.doubledCapacity;
    };
    RingBuffer.prototype.get = function (index) {
        if (index < 0) {
            throw new RangeError('Can\'t get item at a negative index.');
        }
        return this.data[index % this.capacity];
    };
    RingBuffer.prototype.set = function (index, value) {
        if (index < 0) {
            throw new RangeError('Can\'t set item at a negative index.');
        }
        this.data[index % this.capacity] = value;
    };
    /**
     * Returns the current number of items in the buffer.
     */
    RingBuffer.prototype.length = function () {
        var length = this.end - this.begin;
        if (length < 0) {
            length = this.doubledCapacity + length;
        }
        return length;
    };
    /**
     * Reports whether the buffer is full.
     * @returns true if the number of items in the buffer equals its capacity, and
     *   false otherwise.
     */
    RingBuffer.prototype.isFull = function () {
        return this.length() === this.capacity;
    };
    /**
     * Reports whether the buffer is empty.
     * @returns true if the number of items in the buffer equals zero, and
     *   false otherwise.
     */
    RingBuffer.prototype.isEmpty = function () {
        return this.length() === 0;
    };
    /**
     * Adds an item to the end of the buffer.
     */
    RingBuffer.prototype.push = function (value) {
        if (this.isFull()) {
            throw new RangeError('Ring buffer is full.');
        }
        this.set(this.end, value);
        this.end = this.wrap(this.end + 1);
    };
    /**
     * Adds many items to the end of the buffer, in order.
     */
    RingBuffer.prototype.pushAll = function (values) {
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            this.push(value);
        }
    };
    /**
     * Removes and returns the last item in the buffer.
     */
    RingBuffer.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new RangeError('Ring buffer is empty.');
        }
        this.end = this.wrap(this.end - 1);
        var result = this.get(this.end);
        this.set(this.end, undefined);
        return result;
    };
    /**
     * Adds an item to the beginning of the buffer.
     */
    RingBuffer.prototype.unshift = function (value) {
        if (this.isFull()) {
            throw new RangeError('Ring buffer is full.');
        }
        this.begin = this.wrap(this.begin - 1);
        this.set(this.begin, value);
    };
    /**
     * Removes and returns the first item in the buffer.
     */
    RingBuffer.prototype.shift = function () {
        if (this.isEmpty()) {
            throw new RangeError('Ring buffer is empty.');
        }
        var result = this.get(this.begin);
        this.set(this.begin, undefined);
        this.begin = this.wrap(this.begin + 1);
        return result;
    };
    /**
     * Removes and returns a specific item in the buffer, and moves the last item
     * to the vacated slot.  This is useful for implementing a shuffling stream.
     * Note that this operation necessarily scrambles the original order.
     *
     * @param relativeIndex: the index of the item to remove, relative to the
     *   first item in the buffer (e.g., hiding the ring nature of the underlying
     *   storage).
     */
    RingBuffer.prototype.shuffleExcise = function (relativeIndex) {
        if (this.isEmpty()) {
            throw new RangeError('Ring buffer is empty.');
        }
        var index = this.wrap(this.begin + relativeIndex);
        var result = this.get(index);
        this.set(index, this.pop());
        return result;
    };
    return RingBuffer;
}());
exports.RingBuffer = RingBuffer;
//# sourceMappingURL=ring_buffer.js.map