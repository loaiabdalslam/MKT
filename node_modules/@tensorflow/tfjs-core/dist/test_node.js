#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jasmine_util_1 = require("./jasmine_util");
// tslint:disable-next-line:no-require-imports
var jasmine = require('jasmine');
process.on('unhandledRejection', function (e) {
    throw e;
});
jasmine_util_1.setTestEnvs([{ name: 'node', backendName: 'cpu' }]);
var runner = new jasmine();
runner.loadConfig({ spec_files: ['dist/**/**_test.js'], random: false });
runner.execute();
//# sourceMappingURL=test_node.js.map