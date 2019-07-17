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
var dataset_1 = require("./dataset");
exports.array = dataset_1.array;
exports.Dataset = dataset_1.Dataset;
exports.zip = dataset_1.zip;
var csv_dataset_1 = require("./datasets/csv_dataset");
exports.CSVDataset = csv_dataset_1.CSVDataset;
var text_line_dataset_1 = require("./datasets/text_line_dataset");
exports.TextLineDataset = text_line_dataset_1.TextLineDataset;
var readers_1 = require("./readers");
exports.csv = readers_1.csv;
exports.func = readers_1.func;
exports.generator = readers_1.generator;
exports.microphone = readers_1.microphone;
exports.webcam = readers_1.webcam;
var file_data_source_1 = require("./sources/file_data_source");
exports.FileDataSource = file_data_source_1.FileDataSource;
var url_data_source_1 = require("./sources/url_data_source");
exports.URLDataSource = url_data_source_1.URLDataSource;
var version_1 = require("./version");
exports.version_data = version_1.version;
//# sourceMappingURL=index.js.map