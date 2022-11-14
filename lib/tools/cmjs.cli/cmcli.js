"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = require("./core/app");
const commander_1 = require("commander");
const args = process.argv.slice(2);
const log = console.log;
const app = new app_1.App();
commander_1.program
    .version(app.getVersion())
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble');
if (args.length) {
    commander_1.program.parse(process.argv);
}
else {
    commander_1.program.outputHelp();
}
