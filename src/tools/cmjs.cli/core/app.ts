/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-07 22:27
 */

import { CmCli }      from "../cmcli.config";
import { JsonFile }   from "../helpers/json-file";
import { injectable } from "tsyringe";

@injectable()
export class App {
	public readonly configFile: JsonFile;

	constructor() {
		try {
			this.configFile = new JsonFile(CmCli.ConfigFilename);
		} catch (e) {
			this.configFile = new JsonFile();
		}
	}

	getVersion = (): string => {
		return this.configFile.getProp("version");
	}
}
