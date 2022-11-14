/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-10-14 08:22
 */

import { FileFindUp } from "./file-find-up";

export class FileUtils {
	public static findFileUpwards(filename: string,startPath: string = __dirname,): string
	{
		const result = FileFindUp.findFile(startPath, filename);
		return result.fileFound ? result.path : startPath;
	}
}
