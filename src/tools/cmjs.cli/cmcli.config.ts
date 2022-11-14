/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-07 23:00
 */

import { PathUtils } from "../../utils/path.utils";

export namespace CmCli {
	export const ConfigFilename = "cmcli.json";
	export const RootPath = PathUtils.getProjectRoot(CmCli.ConfigFilename);
}
