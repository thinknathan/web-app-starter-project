/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
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

const updateLogic = async (options?: { skipIncrement: boolean }) => {
	const displayElement = document.getElementById('num');
	if (!displayElement) {
		console.warn('displayElement is null');
		return;
	}
	const key = 'seconds';
	// Get value from IndexedDB or set to 0
	let currentNumber = Number(await store.getItem(key));
	currentNumber = isNaN(currentNumber) ? 0 : currentNumber;
	if (!options || !options.skipIncrement) {
		// Increment value by 1
		const nextNumber = await remote.incrementNum(currentNumber);
		// Save value to store
		await store.setItem(key, nextNumber);
		// Update value in DOM
		displayElement.textContent = String(nextNumber);
	} else {
		displayElement.textContent = String(currentNumber);
	}
};

/**
 * Increments a number and stores it.
 * Updates every 1 second.
 */
export const updateNumber = () => {
	// Run logic to display number immediately
	void updateLogic({
		skipIncrement: true,
	});
	// Run update every 1 second
	setInterval(updateLogic, 1000);
};
