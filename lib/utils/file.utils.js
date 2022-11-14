"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUtils = void 0;
const file_find_up_1 = require("./file-find-up");
class FileUtils {
    static findFileUpwards(filename, startPath = __dirname) {
        const result = file_find_up_1.FileFindUp.findFile(startPath, filename);
        return result.fileFound ? result.path : startPath;
    }
}
exports.FileUtils = FileUtils;
