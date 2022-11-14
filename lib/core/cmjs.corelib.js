"use strict";
/*! *****************************************************************************

 Copyright (c) 2022 Coldmind AB - coldmind.com
 This file is part of the Coldmind.ts - Node Framework

 Licensed under the Apache License, Version 2.0 (the "License"); you may not use
 this file except in compliance with the License. You may obtain a copy of the
 License at http://www.apache.org/licenses/LICENSE-2.0

 THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 MERCHANTABLITY OR NON-INFRINGEMENT.

 See the Apache Version 2.0 License for specific language governing permissions
 and limitations under the License.

 ***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CmCorelib = exports.MsgType = void 0;
var MsgType;
(function (MsgType) {
    MsgType[MsgType["SimpleDataMsg"] = 0] = "SimpleDataMsg";
    MsgType[MsgType["HttpIncoming"] = 1] = "HttpIncoming";
    MsgType[MsgType["HttpResponse"] = 2] = "HttpResponse";
})(MsgType = exports.MsgType || (exports.MsgType = {}));
class CmCorelib {
    constructor() {
        this._chain = new Array();
        this._errorChain = new Array();
    }
    get errorChain() {
        return this._errorChain;
    }
    get chain() {
        return this._chain;
    }
    push(f) {
        console.log("f.handle.arguments ::", f);
        this.chain.push(f);
    }
    use(...value) {
        if (!Array.isArray(value)) {
            value = [value];
        }
        for (let func of value) {
            if (typeof func.handle === "function") {
                this.push(func.handle);
            }
        }
        return this;
    }
    handle(input, output) {
        let index = 0;
        let errIndex = 0;
        let chain = this._chain;
        const callback = (chain, value) => {
            let nextFunction;
            if (chain === this._chain) {
                nextFunction = chain[index++];
                if (nextFunction) {
                    nextFunction(input, output, next);
                }
            }
            else if (chain === this._errorChain) {
                nextFunction = chain[errIndex++];
                if (nextFunction) {
                    nextFunction(value, input, output, next);
                }
            }
        };
        const next = (value) => {
            let chain = [];
            if (value instanceof Error) {
                chain = this._errorChain;
            }
            try {
                callback(chain, value);
            }
            catch (e) {
                chain = this._errorChain;
                callback(chain, e);
            }
        };
        next();
    }
}
exports.CmCorelib = CmCorelib;
