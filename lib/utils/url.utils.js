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
exports.UrlUtils = void 0;
const path = __importStar(require("path"));
class UrlUtils {
    static ensureLeadingSlash(searchPath) {
        let pathSep = path.sep;
        if (searchPath.startsWith(pathSep) == false) {
            searchPath = pathSep + searchPath;
        }
        return searchPath;
    }
    static trailSlash(searchPath) {
        const pathSep = path.sep;
        if (!searchPath.endsWith(pathSep)) {
            searchPath = searchPath + pathSep;
        }
        return searchPath;
    }
    static stripTrailingSlashes(value) {
        return value.replace(/\/+$/, '');
    }
    static stripLeadingSlashes(value) {
        return value.replace(/^\/+/g, '');
    }
    static trimSlashes(value) {
        value = UrlUtils.stripLeadingSlashes(value);
        return UrlUtils.stripTrailingSlashes(value);
    }
}
exports.UrlUtils = UrlUtils;
