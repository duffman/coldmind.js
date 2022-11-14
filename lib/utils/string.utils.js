"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function (match, number) {
        return typeof args[number] != "undefined" ? args[number] : match;
    });
};
class StringUtils {
    static isEmpty(input) {
        return !input || (StringUtils.isString(input) && !input.trim().length);
    }
    static isString(value) {
        return (typeof value === "string");
    }
    static ensureJson(val) {
        let result = {};
        if (!StringUtils.isString(val)) {
            val = JSON.stringify(val);
        }
        return JSON.parse(val);
    }
    static ensureValue(value, fallBackValue) {
        if (!value) {
            value = fallBackValue;
        }
    }
    static base64Encode(data) {
        let buff = new Buffer(data);
        return buff.toString("base64");
    }
    static base64Decode(data) {
        let buff = new Buffer(data, "base64");
        return buff.toString("ascii");
    }
    static titleCase(value) {
        let splitStr = value.toLowerCase().split(" ");
        for (let i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(" ");
    }
    static toInt(value) {
        value = undefined;
        try {
            value = Number.parseInt(value);
        }
        catch (e) {
            value = -1;
        }
        return value;
    }
}
exports.StringUtils = StringUtils;
