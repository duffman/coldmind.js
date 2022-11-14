/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-14 10:56
 */

import * as path       from "path";
import { StringUtils } from "./string.utils";

export class UrlUtils {
	/**
	 * Cross platform method that verifies that path starts
	 * with a path delimiter, NOTE that this method does nothing
	 * in order to verify that the path is valid
	 * @param searchPath
	 * @returns {string}
	 */
	public static ensureLeadingSlash(searchPath: string) {
		let pathSep = path.sep;
		if (searchPath.startsWith(pathSep) == false) {
			searchPath = pathSep + searchPath;
		}
		return searchPath;
	}

	/**
	 * Cross platform method that verifies that path ends
	 * with a path delimiter, NOTE that this method does nothing
	 * in order to verify that the path is valid
	 * @param searchPath
	 * @returns {string}
	 */
	public static trailSlash(searchPath: string) {
		const pathSep = path.sep;
		if (!searchPath.endsWith(pathSep)) {
			searchPath = searchPath + pathSep;
		}
		return searchPath;
	}

	/**
	 * Remove all trailing slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static stripTrailingSlashes(value: string): string {
		return value.replace(/\/+$/, '');
	}

	/**
	 * Remove all leading slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static stripLeadingSlashes(value: string): string {
		return value.replace(/^\/+/g, '');
	}

	/**
	 * Strip both trailing and leading slashes
	 * @param {string} value
	 * @returns {string}
	 */
	public static trimSlashes(value: string): string {
		value = UrlUtils.stripLeadingSlashes(value);
		return UrlUtils.stripTrailingSlashes(value);
	}
}
