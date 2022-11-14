/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-13 07:52
 */

import { FileUtils } from "./file.utils";

export class PathUtils {
	/**
	 * Locate the package.json file marking the project root
	 * @param filename
	 * @param {string} startPath
	 * @returns {string}
	 */
	public static getProjectRoot(filename = "package.json", startPath: string = __dirname): string {
		return FileUtils.findFileUpwards(filename, startPath);
	}
}
