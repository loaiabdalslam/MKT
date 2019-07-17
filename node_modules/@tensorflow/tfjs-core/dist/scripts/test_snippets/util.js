"use strict";
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
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
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
process.on('unhandledRejection', function (ex) {
    throw ex;
});
// Used for logging the number of snippets that have been found.
var snippetCount = 0;
// Used for counting the number of errors that have been found.
var errorCount = 0;
/**
 * Parse and evaluate snippets for the src/index.ts from where this script is
 * run.
 * @param tf The TensorFlow.js module to use when evaluating snippets. If used
 *     outside core, this should be a union of core and the separate package.
 *     This is unused here but is used in eval() of the snippets.
 */
// tslint:disable-next-line:no-any
function parseAndEvaluateSnippets(tf) {
    return __awaiter(this, void 0, void 0, function () {
        var index, tsconfigPath, tsconfig, program, checker, _i, _a, sourceFile, children, i;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    index = path.join(process.cwd(), 'src/index.ts');
                    tsconfigPath = path.join(process.cwd(), 'tsconfig.json');
                    tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));
                    delete tsconfig.compilerOptions.moduleResolution;
                    program = ts.createProgram([index], tsconfig.compilerOptions);
                    checker = program.getTypeChecker();
                    _i = 0, _a = program.getSourceFiles();
                    _b.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    sourceFile = _a[_i];
                    if (!!sourceFile.isDeclarationFile) return [3 /*break*/, 5];
                    children = sourceFile.getChildren();
                    i = 0;
                    _b.label = 2;
                case 2:
                    if (!(i < children.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, visit(tf, checker, children[i], sourceFile)];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6:
                    if (errorCount === 0) {
                        console.log("Parsed and evaluated " + snippetCount + " snippets successfully.");
                    }
                    else {
                        console.log("Evaluated " + snippetCount + " snippets with " + errorCount + " errors.");
                        process.exit(1);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.parseAndEvaluateSnippets = parseAndEvaluateSnippets;
function visit(
// tslint:disable-next-line:no-any
tf, checker, node, sourceFile) {
    return __awaiter(this, void 0, void 0, function () {
        var children, i, symbol_1, jsdoc, documentation, i, doc, re, matches, _loop_1, k;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    children = node.getChildren();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < children.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, visit(tf, checker, children[i], sourceFile)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    if (!(ts.isClassDeclaration(node) || ts.isFunctionDeclaration(node) ||
                        ts.isMethodDeclaration(node) || ts.isInterfaceDeclaration(node))) return [3 /*break*/, 10];
                    symbol_1 = checker.getSymbolAtLocation(node.name);
                    jsdoc = getJSDocTag(symbol_1);
                    if (jsdoc == null) {
                        return [2 /*return*/];
                    }
                    // Ignore snippets of methods that have been marked with ignoreCI.
                    if (jsdoc['ignoreCI']) {
                        return [2 /*return*/];
                    }
                    documentation = symbol_1.getDocumentationComment(checker);
                    if (documentation == null) {
                        return [2 /*return*/];
                    }
                    i = 0;
                    _a.label = 5;
                case 5:
                    if (!(i < documentation.length)) return [3 /*break*/, 10];
                    doc = documentation[i];
                    re = /```js.*?```/gs;
                    matches = re.exec(doc.text);
                    if (matches == null) {
                        return [2 /*return*/];
                    }
                    _loop_1 = function (k) {
                        var match, lines, evalLines, j, line, srcCode, evalString, oldLog, oldWarn, reportError, e_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    snippetCount++;
                                    match = matches[k];
                                    lines = match.split('\n');
                                    evalLines = [];
                                    for (j = 0; j < lines.length; j++) {
                                        line = lines[j];
                                        if (line.startsWith('```js')) {
                                            line = line.substring('```js'.length);
                                        }
                                        if (line.endsWith('```')) {
                                            line = line.substring(0, line.length - '```'.length);
                                        }
                                        line = line.trim();
                                        if (line.startsWith('*')) {
                                            line = line.substring(1).trim();
                                        }
                                        evalLines.push(line);
                                    }
                                    srcCode = evalLines.join('\n');
                                    evalString = '(async function runner() { try { ' + srcCode +
                                        '} catch (e) { reportError(e); } })()';
                                    oldLog = console.log;
                                    oldWarn = console.warn;
                                    reportError = function (e) {
                                        oldLog();
                                        oldLog("Error executing snippet for " + symbol_1.name + " at " + sourceFile.fileName);
                                        oldLog();
                                        oldLog("```js" + srcCode + "```");
                                        oldLog();
                                        console.error(e);
                                        errorCount++;
                                    };
                                    // Overrwrite console.log so we don't spam the console.
                                    console.log = function (msg) { };
                                    console.warn = function (msg) { };
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, eval(evalString)];
                                case 2:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    e_1 = _a.sent();
                                    reportError(e_1);
                                    return [3 /*break*/, 4];
                                case 4:
                                    console.log = oldLog;
                                    console.warn = oldWarn;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    k = 0;
                    _a.label = 6;
                case 6:
                    if (!(k < matches.length)) return [3 /*break*/, 9];
                    return [5 /*yield**/, _loop_1(k)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    k++;
                    return [3 /*break*/, 6];
                case 9:
                    i++;
                    return [3 /*break*/, 5];
                case 10: return [2 /*return*/];
            }
        });
    });
}
function getJSDocTag(symbol) {
    var tags = symbol.getJsDocTags();
    for (var i = 0; i < tags.length; i++) {
        var jsdocTag = tags[i];
        if (jsdocTag.name === 'doc' && jsdocTag.text != null) {
            var json = convertDocStringToDocInfoObject(jsdocTag.text.trim());
            return json;
        }
    }
    return null;
}
function convertDocStringToDocInfoObject(docString) {
    var jsonString = docString.replace(/([a-zA-Z0-9]+):/g, '"$1":').replace(/\'/g, '"');
    return JSON.parse(jsonString);
}
//# sourceMappingURL=util.js.map