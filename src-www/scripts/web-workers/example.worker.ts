/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
import promisify from 'worker-async';

/**
 * Class running on a worker thread.
 * Inlined with esbuild-plugin-inline-worker.
 */
class Remote {
	/**
	 * Increments number by 1.
	 *
	 * @param num Number to increment
	 */
	async incrementNum(num: number): Promise<number> {
		return num + 1;
	}
}

/**
 * Promisify for async worker communication.
 *
 * @link https://github.com/vishwam/worker-async/blob/master/README.md
 */
promisify(self as unknown as Worker, new Remote());

/**
 * This file will be used as a regular worker, without the module flag
 * To avoid errors with the export keyword, the following lines are stripped.
 *
 * @link https://github.com/zziger/esbuild-ifdef#readme
 */
/// #if false
const fakeExportForTS = () => new Remote();
export default fakeExportForTS;
export { Remote };
/// #endif
