import promisify from 'worker-async';
import inlineWorker, { Remote } from '../web-workers/example.worker.js';
import { KeyValStore } from '../utils/keyval-store.js';

// Init framework-agnostic key/value store.
const store = new KeyValStore();

/**
 * Import worker. Automatically inlined by esbuild-plugin-inline-worker.
 *
 * @link https://github.com/mitschabaude/esbuild-plugin-inline-worker/blob/main/README.md
 */
const worker = inlineWorker() as unknown as Worker;

/**
 * Promisify for async worker communication.
 *
 * @link https://github.com/vishwam/worker-async/blob/master/README.md
 */
const { remote } = promisify<Remote>(worker);

/**
 * Increments a number and stores it.
 * Updates every 1 second.
 */
export const updateNumber = () => {
	const key = 'seconds';
	// Run update every 1 second
	setInterval(async () => {
		// Get value from IndexedDB or set to 0
		const previous: number = Number(await store.getItem(key)) ?? 0;
		// Increment value by 1
		const incremented: number = await remote.incrementNum(previous);
		// Save value to store
		await store.setItem(key, incremented);
		// Update value in DOM
		const element = document.getElementById('num');
		if (element) {
			element.textContent = String(incremented);
		}
	}, 1000);
};
