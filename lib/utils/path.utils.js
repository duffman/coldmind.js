"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PathUtils = void 0;
const file_utils_1 = require("./file.utils");
class PathUtils {
    static getProjectRoot(filename = "package.json", startPath = __dirname) {
        return file_utils_1.FileUtils.findFileUpwards(filename, startPath);
    }
}
exports.PathUtils = PathUtils;
