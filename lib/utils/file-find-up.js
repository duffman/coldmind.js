"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFindUp = exports.FileFindResult = exports.PathAlias = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const url_utils_1 = require("./url.utils");
var PathAlias;
(function (PathAlias) {
    PathAlias["projectRoot"] = "{{PROJECT}}";
    PathAlias["userHome"] = "{{HOME}}";
    PathAlias["documents"] = "{{DOCUMENTS}}";
})(PathAlias = exports.PathAlias || (exports.PathAlias = {}));
class FileFindResult {
    constructor(fileFound = false, path = "", result = "") {
        this.fileFound = fileFound;
        this.path = path;
        this.result = result;
    }
}
exports.FileFindResult = FileFindResult;
class FileFindUp {
    static ensureTrailingPathDelimiter(searchPath) {
        if (!searchPath) {
            return;
        }
        let pathSep = path.sep;
        if (searchPath.endsWith(pathSep) == false) {
            searchPath = searchPath + pathSep;
        }
        return searchPath;
    }
    static findFile(startPath, filename) {
        let result = new FileFindResult();
        let sep = path.sep;
        let parts = startPath.split(sep);
        let tmpStr = sep;
        for (let i = 0; i < parts.length; i++) {
            tmpStr = path.resolve(tmpStr, parts[i]);
            tmpStr = url_utils_1.UrlUtils.trailSlash(tmpStr);
            parts[i] = tmpStr;
        }
        for (let i = parts.length - 1; i > 0; i--) {
            tmpStr = parts[i];
            const tmpFilename = path.resolve(tmpStr, filename);
            if (fs.existsSync(tmpFilename)) {
                result.fileFound = true;
                result.path = tmpStr;
                result.result = tmpFilename;
                break;
            }
        }
        return result;
    }
}
exports.FileFindUp = FileFindUp;
