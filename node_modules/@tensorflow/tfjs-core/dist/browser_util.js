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
Object.defineProperty(exports, "__esModule", { value: true });
var delayCallback = (function () {
    if (typeof requestAnimationFrame !== 'undefined') {
        return requestAnimationFrame;
    }
    else if (typeof setImmediate !== 'undefined') {
        return setImmediate;
    }
    return function (f) { return f(); }; // no delays
})();
/**
 * Returns a promise that resolve when a requestAnimationFrame has completed.
 *
 * On Node.js this uses setImmediate instead of requestAnimationFrame.
 *
 * This is simply a sugar method so that users can do the following:
 * `await tf.nextFrame();`
 */
/** @doc {heading: 'Performance', subheading: 'Timing'} */
function nextFrame() {
    return new Promise(function (resolve) { return delayCallback(function () { return resolve(); }); });
}
exports.nextFrame = nextFrame;
//# sourceMappingURL=browser_util.js.map