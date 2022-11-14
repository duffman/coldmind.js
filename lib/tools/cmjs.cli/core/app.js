"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const cmcli_config_1 = require("../cmcli.config");
const json_file_1 = require("../helpers/json-file");
const tsyringe_1 = require("tsyringe");
let App = class App {
    constructor() {
        this.getVersion = () => {
            return this.configFile.getProp("version");
        };
        try {
            this.configFile = new json_file_1.JsonFile(cmcli_config_1.CmCli.ConfigFilename);
        }
        catch (e) {
            this.configFile = new json_file_1.JsonFile();
        }
    }
};
App = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], App);
exports.App = App;
