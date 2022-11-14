/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-18 22:57
 */

String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match: any, number: number) {
		return typeof args[number] != "undefined" ? args[number] : match;
	});
};

declare global {
	interface String {
		format(...arguments: string[]): string;
	}
}

export interface String {
	format(...replacements: string[]): string;
}

export class StringUtils {
	/**
	 * Checks for unset input string
	 * @param input
	 * @returns {boolean}
	 */
	public static isEmpty(input: any): boolean {
		return !input || ( StringUtils.isString(input) && !(input as string).trim().length);
	}

	/**
	 * Returns true if the value param is of type string
	 * @param value
	 * @returns {boolean}
	 */
	public static isString(value: any): boolean {
		return (typeof value === "string");
	}

	/**
	 * Ensure that given data is returned as a JSON object
	 * @param val
	 * @returns {object}
	 */
	public static ensureJson(val: any): object {
		let result: object = {};

		if (!StringUtils.isString(val)) {
			val = JSON.stringify(val);
		}

		return JSON.parse(val);
	}

	/**
	 * If given value param is null, return a fallback value
	 * @param value
	 * @param fallBackValue
	 */
	public static ensureValue(value: any, fallBackValue: any): void {
		if (!value) {
			value = fallBackValue;
		}
	}

	public static base64Encode(data: string) {
		let buff = new Buffer(data);
		return buff.toString("base64");
	}

	public static base64Decode(data: string) {
		let buff = new Buffer(data, "base64");
		return buff.toString("ascii");
	}

	public static titleCase(value: string): string {
		let splitStr = value.toLowerCase().split(" ");

		for (let i = 0; i < splitStr.length; i++) {
			splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
		}

		return splitStr.join(" ");
	}

	public static toInt(value: any): number {
		value = undefined;

		try {
			value = Number.parseInt(value);
		} catch (e) {
			value = -1;
		}

		return value;
	}
}
