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
var fs = require("fs");
var path = require("path");
// tslint:disable-next-line:no-require-imports
var deepEqual = require('deep-equal');
/**
 * Converts the ts files in src/operations/op_list/* to json files and stores
 * them in python/tensorflowjs/op_list/. These are then used by the python
 * converter.
 *
 * If this script is called with the `--test` flag, will perform consistency
 * test between the two directories instead of actual file sync'ing.
 */
// Make the directory python/tensorflowjs/op_list/ if it doesn't exist.
var destDir = './python/tensorflowjs/op_list/';
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
// Go over all .ts files in src/operations/op_list and convert them to json.
var srcDir = './src/operations/op_list';
var fileNames = fs.readdirSync(srcDir);
var testing = process.argv.indexOf('--test') !== -1;
var tsFilesNamesWithJSONs = [];
fileNames.forEach(function (fileName) {
    var srcPath = path.join(srcDir, fileName);
    if (srcPath.endsWith('_test.ts')) {
        return;
    }
    var m = require('../' + srcPath);
    if (m.json == null) {
        console.log("Ignored " + srcPath + " due to absent \"json\" field.");
        return;
    }
    tsFilesNamesWithJSONs.push(path.basename(srcPath));
    var destPath = path.join(destDir, fileName.replace('.ts', '.json'));
    if (testing) {
        if (!fs.existsSync(destPath) || !fs.lstatSync(destPath).isFile()) {
            throw new Error("Op JSON consistency test failed: Missing file " + destPath + ". " +
                "You may want to run: yarn gen-json");
        }
        var destJSON = JSON.parse(fs.readFileSync(destPath, { encoding: 'utf8' }));
        if (!deepEqual(m.json, destJSON)) {
            throw new Error("JSON content of " + destPath + " does not match TypeScript file " +
                (srcPath + ". Run the following command to make sure they are ") +
                "in sync: yarn gen-json");
        }
    }
    else {
        fs.writeFileSync(destPath, JSON.stringify(m.json, null, 2));
        console.log('Generated', destPath);
    }
});
if (testing) {
    var dirContent = fs.readdirSync(destDir);
    dirContent.forEach(function (itemPath) {
        if (!itemPath.endsWith('.json')) {
            throw new Error("Found non-json file in directory " + destDir + ": " + itemPath);
        }
        if (tsFilesNamesWithJSONs.indexOf(itemPath.replace('.json', '.ts')) ===
            -1) {
            throw new Error("Found extraneous .json file in " + destDir + ": " + itemPath);
        }
    });
}
console.log('Done!');
//# sourceMappingURL=gen_json.js.map