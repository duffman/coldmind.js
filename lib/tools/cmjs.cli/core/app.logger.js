"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLogger = void 0;
class AppLogger {
    static error(...data) {
        console.log(":: ERROR ::", data);
    }
}
exports.AppLogger = AppLogger;
