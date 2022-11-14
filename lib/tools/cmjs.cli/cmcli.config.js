"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmCli = void 0;
const path_utils_1 = require("../../utils/path.utils");
var CmCli;
(function (CmCli) {
    CmCli.ConfigFilename = "cmcli.json";
    CmCli.RootPath = path_utils_1.PathUtils.getProjectRoot(CmCli.ConfigFilename);
})(CmCli = exports.CmCli || (exports.CmCli = {}));
