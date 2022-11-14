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

import { IncomingHttpHeaders } from "http";
import { Socket }              from "node:net";

export enum MsgType {
	SimpleDataMsg,
	HttpIncoming,
	HttpResponse
}

export type CoreMsgType = MsgType.SimpleDataMsg | MsgType.HttpIncoming | MsgType.HttpResponse ;

export type CoreMsgDataType = void | string | object;

export interface ICmCoreMessage<T = CoreMsgDataType> {
	msgType: CoreMsgType;
	msgData: T;
}

export interface ICmHttpMessage<T = any> extends ICmCoreMessage<T> {
	aborted: boolean;
	httpVersion: string;
	httpVersionMajor: number;
	httpVersionMinor: number;
	complete: boolean;
	connection: Socket;
	socket: Socket;
	headers: IncomingHttpHeaders;
	rawHeaders: string[];
	method?: string | undefined;
	url?: string | undefined;
	statusCode?: number | undefined;
	statusMessage?: string | undefined;
}

export type chainFunc = (input: ICmCoreMessage<any>,
						 output: ICmCoreMessage<any>, next: CmNextFunc) => void;

export type chainHandleFunc = (
	error: Error,
	input: ICmCoreMessage<any>,
	output: ICmCoreMessage<any>,
	next: CmNextFunc
) => void;

export interface ICmMiddleware<T = any> {
	handle(input: ICmCoreMessage<T>, output: ICmCoreMessage<T>, next: CmNextFunc): Promise<void>;
}

export interface ICmHandlerMiddleware<T = any> {
	handle(error: Error, input: ICmCoreMessage<T>, output: ICmCoreMessage<T>, next: CmNextFunc): Promise<void>;
}

export type CmMiddleware = ICmMiddleware<any> | ICmHandlerMiddleware<any>;

export type CmNextFunc = (err?: any) => void;

export class CmCorelib {
	public get errorChain(): Function[] {
		return this._errorChain;
	}

	public get chain(): Function[] {
		return this._chain;
	}

	private _chain = new Array<chainFunc>(); //Array<ICmMiddleware>();
	private _errorChain = new Array<chainHandleFunc>(); //Array<ICmHandlerMiddleware>();

	constructor() {}

	/**
	 * Pushes a function to the associated
	 * array given its arity.
	 * @param f the function to push
	 */
	public push(f: Function) {
		console.log("f.handle.arguments ::", f);
		this.chain.push(f);
	}

	/**
	 * Pushes a middleware, or a collection of
	 * middleware into the chain.
	 * @returns {Chain}
	 */
	public use(...value: CmMiddleware[]) {
		if (!Array.isArray(value)) {
			value = [value];
		}

		for (let func of value) {
			if (typeof func.handle === "function") {
				this.push(func.handle);
			}
		}

		/*
		for (let func of values) {
			if (typeof func.handle === "function") {
				this.push(func.handle);
			} else if (Array.isArray(func)) {
				for (let childFunc of func) {
					this.push(childFunc.handle);
				}
				//f.forEach((value) => this.push(value));
			}
		}
		*/
		/*
		args.forEach((f) => {
			if (typeof f === 'function') {
				push.call(this, f);
			} else if (Array.isArray(f)) {
				f.forEach((value) => push.call(this, value));
			}
		});
	 	*/
		return this;
	}

	/**
	 * Triggers a new treatment to be processed by
	 * the chain.
	 * @param input
	 * @param output
	 */
	public handle(input, output) {
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
			} else if (chain === this._errorChain) {
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
			} catch (e) {
				chain = this._errorChain;
				callback(chain, e);
			}
		};

		// @ts-ignore
		next();
	}
}

/*
export {
	CoreMsgType,
	CoreMsgDataType,
	ICmCoreMessage,
	ICmHttpMessage,
	ICmMiddleware,
	ICmHandlerMiddleware,
	CmNextFunc,
	CmCorelib
}
*/
