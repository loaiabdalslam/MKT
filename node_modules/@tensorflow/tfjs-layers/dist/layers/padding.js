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
/**
 * Padding Layers.
 */
// Porting Note: In Python Keras, the padding layers are in convolutional.py,
//   but we decided to put them in a separate file (padding.ts) for clarity.
var tfc = require("@tensorflow/tfjs-core");
var tfjs_core_1 = require("@tensorflow/tfjs-core");
var common_1 = require("../backend/common");
var topology_1 = require("../engine/topology");
var errors_1 = require("../errors");
var types_utils_1 = require("../utils/types_utils");
/**
 * Pads the middle dimension of a 3D tensor.
 *
 * @param x Input `tf.Tensor` to be padded.
 * @param padding `Array` of 2 integers, how many zeros to add at the start and
 *   end of the middle dimension (i.e., dimension 1).
 * @return A padded 3D `tf.Tensor`.
 */
function temporalPadding(x, padding) {
    return tfjs_core_1.tidy(function () {
        if (x.rank !== 3) {
            throw new errors_1.ValueError("temporalPadding expects input tensor to be 3-D, but received a " +
                (x.rank + "-D tensor."));
        }
        if (padding == null) {
            padding = [1, 1];
        }
        if (padding.length !== 2) {
            throw new errors_1.ValueError("temporalPadding expects input padding pattern to be a length-2 " +
                ("array, but received a length-" + padding.length + " array."));
        }
        var pattern = [[0, 0], padding, [0, 0]];
        return tfc.pad(x, pattern);
    });
}
exports.temporalPadding = temporalPadding;
/**
 * Pads the 2nd and 3rd dimensions of a 4D tensor.
 *
 * @param x Input `tf.Tensor` to be padded.
 * @param padding `Array` of two `Array`s, each of which is an `Array` of two
 *   integers. The amount of padding at the beginning and end of the 2nd and 3rd
 *   dimensions, respectively.
 * @param dataFormat 'channelsLast' (default) or 'channelsFirst'.
 * @return Padded 4D `tf.Tensor`.
 */
function spatial2dPadding(x, padding, dataFormat) {
    return tfjs_core_1.tidy(function () {
        if (x.rank !== 4) {
            throw new errors_1.ValueError("temporalPadding expects input tensor to be 4-D, but received a " +
                (x.rank + "-D tensor."));
        }
        if (padding == null) {
            padding = [[1, 1], [1, 1]];
        }
        if (padding.length !== 2 || padding[0].length !== 2 ||
            padding[1].length !== 2) {
            throw new errors_1.ValueError('spatial2dPadding expects `padding` to be an Array of two Arrays, ' +
                'each of which is an Array of two integers.');
        }
        if (dataFormat == null) {
            dataFormat = common_1.imageDataFormat();
        }
        if (dataFormat !== 'channelsLast' && dataFormat !== 'channelsFirst') {
            throw new errors_1.ValueError("Unknown data format: " + dataFormat + ". " +
                "Supported data formats are 'channelsLast' and 'channelsFirst.");
        }
        var pattern;
        if (dataFormat === 'channelsFirst') {
            pattern = [[0, 0], [0, 0], padding[0], padding[1]];
        }
        else {
            pattern = [[0, 0], padding[0], padding[1], [0, 0]];
        }
        return tfc.pad(x, pattern);
    });
}
exports.spatial2dPadding = spatial2dPadding;
var ZeroPadding2D = /** @class */ (function (_super) {
    __extends(ZeroPadding2D, _super);
    function ZeroPadding2D(args) {
        var _this = this;
        if (args == null) {
            args = {};
        }
        _this = _super.call(this, args) || this;
        _this.dataFormat =
            args.dataFormat == null ? common_1.imageDataFormat() : args.dataFormat;
        // TODO(cais): Maybe refactor the following logic surrounding `padding`
        //   into a helper method.
        if (args.padding == null) {
            _this.padding = [[1, 1], [1, 1]];
        }
        else if (typeof args.padding === 'number') {
            _this.padding =
                [[args.padding, args.padding], [args.padding, args.padding]];
        }
        else {
            args.padding = args.padding;
            if (args.padding.length !== 2) {
                throw new errors_1.ValueError("ZeroPadding2D expects padding to be a length-2 array, but " +
                    ("received a length-" + args.padding.length + " array."));
            }
            var heightPadding = void 0;
            var widthPadding = void 0;
            if (typeof args.padding[0] === 'number') {
                heightPadding = [args.padding[0], args.padding[0]];
                widthPadding = [args.padding[1], args.padding[1]];
            }
            else {
                args.padding = args.padding;
                if (args.padding[0].length !== 2) {
                    throw new errors_1.ValueError("ZeroPadding2D expects height padding to be a length-2 array, " +
                        ("but received a length-" + args.padding[0].length + " array."));
                }
                heightPadding = args.padding[0];
                if (args.padding[1].length !== 2) {
                    throw new errors_1.ValueError("ZeroPadding2D expects width padding to be a length-2 array, " +
                        ("but received a length-" + args.padding[1].length + " array."));
                }
                widthPadding = args.padding[1];
            }
            _this.padding = [heightPadding, widthPadding];
        }
        _this.inputSpec = [new topology_1.InputSpec({ ndim: 4 })];
        return _this;
    }
    ZeroPadding2D.prototype.computeOutputShape = function (inputShape) {
        inputShape = types_utils_1.getExactlyOneShape(inputShape);
        var rows;
        var cols;
        if (this.dataFormat === 'channelsFirst') {
            if (inputShape[2] != null && inputShape[2] >= 0) {
                rows = inputShape[2] + this.padding[0][0] + this.padding[0][1];
            }
            else {
                rows = null;
            }
            if (inputShape[3] != null && inputShape[3] >= 0) {
                cols = inputShape[3] + this.padding[1][0] + this.padding[1][1];
            }
            else {
                cols = null;
            }
            return [inputShape[0], inputShape[1], rows, cols];
        }
        else {
            if (inputShape[1] != null && inputShape[1] >= 0) {
                rows = inputShape[1] + this.padding[0][0] + this.padding[0][1];
            }
            else {
                rows = null;
            }
            if (inputShape[2] != null && inputShape[2] >= 0) {
                cols = inputShape[2] + this.padding[1][0] + this.padding[1][1];
            }
            else {
                cols = null;
            }
            return [inputShape[0], rows, cols, inputShape[3]];
        }
    };
    ZeroPadding2D.prototype.call = function (inputs, kwargs) {
        var _this = this;
        return tfjs_core_1.tidy(function () { return spatial2dPadding(types_utils_1.getExactlyOneTensor(inputs), _this.padding, _this.dataFormat); });
    };
    ZeroPadding2D.prototype.getConfig = function () {
        var config = {
            padding: this.padding,
            dataFormat: this.dataFormat,
        };
        var baseConfig = _super.prototype.getConfig.call(this);
        Object.assign(config, baseConfig);
        return config;
    };
    /** @nocollapse */
    ZeroPadding2D.className = 'ZeroPadding2D';
    return ZeroPadding2D;
}(topology_1.Layer));
exports.ZeroPadding2D = ZeroPadding2D;
tfjs_core_1.serialization.registerClass(ZeroPadding2D);
//# sourceMappingURL=padding.js.map