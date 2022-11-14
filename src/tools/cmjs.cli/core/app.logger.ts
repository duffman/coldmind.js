/**
 * @author: Patrik Forsberg <patrik.forsberg@coldmind.com>
 * @date: 2022-11-07 23:12
 */

export class AppLogger {
	public static error(...data: any[]): void {
		console.log(":: ERROR ::", data);
	}
}
