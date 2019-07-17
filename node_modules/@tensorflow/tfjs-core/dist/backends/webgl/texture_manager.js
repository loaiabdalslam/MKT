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
var environment_1 = require("../../environment");
var tex_util_1 = require("./tex_util");
var TextureManager = /** @class */ (function () {
    function TextureManager(gpgpu) {
        this.gpgpu = gpgpu;
        this.numUsedTextures = 0;
        this.numFreeTextures = 0;
        this.freeTextures = {};
        this.logEnabled = false;
        this.usedTextures = {};
    }
    TextureManager.prototype.acquireTexture = function (shapeRC, usage, isPacked) {
        var physicalTexType = getPhysicalFromLogicalTextureType(usage, isPacked);
        var shapeKey = getKeyFromTextureShape(shapeRC, physicalTexType, isPacked);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        if (!(shapeKey in this.usedTextures)) {
            this.usedTextures[shapeKey] = [];
        }
        if (this.freeTextures[shapeKey].length > 0) {
            this.numFreeTextures--;
            this.numUsedTextures++;
            this.log();
            var newTexture_1 = this.freeTextures[shapeKey].shift();
            this.usedTextures[shapeKey].push(newTexture_1);
            return newTexture_1;
        }
        this.numUsedTextures++;
        this.log();
        var newTexture;
        if (physicalTexType === tex_util_1.PhysicalTextureType.PACKED_2X2_FLOAT32) {
            newTexture = this.gpgpu.createPackedMatrixTexture(shapeRC[0], shapeRC[1]);
        }
        else if (physicalTexType === tex_util_1.PhysicalTextureType.PACKED_2X2_FLOAT16) {
            newTexture =
                this.gpgpu.createFloat16PackedMatrixTexture(shapeRC[0], shapeRC[1]);
        }
        else if (physicalTexType === tex_util_1.PhysicalTextureType.UNPACKED_FLOAT32) {
            newTexture =
                this.gpgpu.createFloat32MatrixTexture(shapeRC[0], shapeRC[1]);
        }
        else if (physicalTexType === tex_util_1.PhysicalTextureType.UNPACKED_FLOAT16) {
            newTexture =
                this.gpgpu.createFloat16MatrixTexture(shapeRC[0], shapeRC[1]);
        }
        else if (physicalTexType === tex_util_1.PhysicalTextureType.PACKED_4X1_UNSIGNED_BYTE) {
            newTexture =
                this.gpgpu.createUnsignedBytesMatrixTexture(shapeRC[0], shapeRC[1]);
        }
        this.usedTextures[shapeKey].push(newTexture);
        return newTexture;
    };
    TextureManager.prototype.releaseTexture = function (texture, shape, logicalTexType, isPacked) {
        if (this.freeTextures == null) {
            // Already disposed.
            return;
        }
        var physicalTexType = getPhysicalFromLogicalTextureType(logicalTexType, isPacked);
        var shapeKey = getKeyFromTextureShape(shape, physicalTexType, isPacked);
        if (!(shapeKey in this.freeTextures)) {
            this.freeTextures[shapeKey] = [];
        }
        this.freeTextures[shapeKey].push(texture);
        this.numFreeTextures++;
        this.numUsedTextures--;
        var texList = this.usedTextures[shapeKey];
        var texIndex = texList.indexOf(texture);
        if (texIndex < 0) {
            throw new Error('Cannot release a texture that was never provided by this ' +
                'texture manager');
        }
        texList.splice(texIndex, 1);
        this.log();
    };
    TextureManager.prototype.log = function () {
        if (!this.logEnabled) {
            return;
        }
        var total = this.numFreeTextures + this.numUsedTextures;
        console.log('Free/Used', this.numFreeTextures + " / " + this.numUsedTextures, "(" + total + ")");
    };
    TextureManager.prototype.getNumUsedTextures = function () {
        return this.numUsedTextures;
    };
    TextureManager.prototype.getNumFreeTextures = function () {
        return this.numFreeTextures;
    };
    TextureManager.prototype.dispose = function () {
        var _this = this;
        if (this.freeTextures == null) {
            // Already disposed.
            return;
        }
        for (var texShape in this.freeTextures) {
            this.freeTextures[texShape].forEach(function (tex) {
                _this.gpgpu.deleteMatrixTexture(tex);
            });
        }
        for (var texShape in this.usedTextures) {
            this.usedTextures[texShape].forEach(function (tex) {
                _this.gpgpu.deleteMatrixTexture(tex);
            });
        }
        this.freeTextures = null;
        this.usedTextures = null;
        this.numUsedTextures = 0;
        this.numFreeTextures = 0;
    };
    return TextureManager;
}());
exports.TextureManager = TextureManager;
function getPhysicalFromLogicalTextureType(logicalTexType, isPacked) {
    if (logicalTexType === tex_util_1.TextureUsage.UPLOAD) {
        return tex_util_1.PhysicalTextureType.PACKED_2X2_FLOAT32;
    }
    else if (logicalTexType === tex_util_1.TextureUsage.RENDER || logicalTexType == null) {
        if (isPacked) {
            return environment_1.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED') ?
                tex_util_1.PhysicalTextureType.PACKED_2X2_FLOAT32 :
                tex_util_1.PhysicalTextureType.PACKED_2X2_FLOAT16;
        }
        return environment_1.ENV.getBool('WEBGL_RENDER_FLOAT32_ENABLED') ?
            tex_util_1.PhysicalTextureType.UNPACKED_FLOAT32 :
            tex_util_1.PhysicalTextureType.UNPACKED_FLOAT16;
    }
    else if (logicalTexType === tex_util_1.TextureUsage.DOWNLOAD ||
        logicalTexType === tex_util_1.TextureUsage.PIXELS) {
        return tex_util_1.PhysicalTextureType.PACKED_4X1_UNSIGNED_BYTE;
    }
    throw new Error("Unknown logical texture type " + logicalTexType);
}
function getKeyFromTextureShape(shapeRowsCol, physicalTexType, isPacked) {
    return shapeRowsCol[0] + "_" + shapeRowsCol[1] + "_" + physicalTexType + "_" + isPacked;
}
//# sourceMappingURL=texture_manager.js.map