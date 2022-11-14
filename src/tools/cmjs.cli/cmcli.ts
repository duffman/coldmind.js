/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-07 22:25
 */

import "reflect-metadata";
import { App }     from "./core/app";
import { program } from "commander";

const args = process.argv.slice(2);

const log = console.log;

const app = new App();

program
	.version(app.getVersion())
	.option("-p, --peppers", "Add peppers")
	.option("-P, --pineapple", "Add pineapple")
	.option("-b, --bbq-sauce", "Add bbq sauce")
	.option("-c, --cheese [type]", "Add the specified type of cheese [marble]", "marble")

if (args.length) {
	program.parse(process.argv)
} else {
	program.outputHelp();
}
