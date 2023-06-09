import { Workbox } from 'workbox-window';
import { createSnackbar } from '@snackbar/core';

export const loadServiceWorkerWeb = () => {
	const wb = new Workbox('/service-worker.js');

	const showSkipWaitingPrompt = async () => {
		/**
		 * Assuming the user accepted the update, set up a listener
		 * that will reload the page as soon as the previously waiting
		 * service worker has taken control.
		 */
		wb.addEventListener('controlling', () => {
			/**
			 * At this point, reloading will ensure that the current
			 * tab is loaded under the control of the new service worker.
			 * Depending on your web app, you may want to auto-save or
			 * persist transient state before triggering the reload.
			 */
			const updatingNotice = createSnackbar('Updating...', {
				position: 'right',
				actions: [
					{
						text: 'Dismiss',
						style: {
							color: '#BE88FF',
						},
						callback(_, snackbar) {
							wb.messageSkipWaiting();
							snackbar.destroy();
						},
					},
				],
			});
			setTimeout(() => {
				updatingNotice.destroy();
			}, 4000);
			window.location.reload();
		});

		/**
		 * When `event.wasWaitingBeforeRegister` is true, a previously
		 * updated service worker is still waiting.
		 * You may want to customize the UI prompt accordingly.
		 */
		const updateNotice = createSnackbar('Update to latest version?', {
			position: 'right',
			actions: [
				{
					text: 'Yes',
					style: {
						color: '#BE88FF',
					},
					callback(_, snackbar) {
						wb.messageSkipWaiting();
						snackbar.destroy();
					},
				},
			],
		});
		setTimeout(() => {
			updateNotice.destroy();
		}, 10000);
	};

	/**
	 * Add an event listener to detect when the registered
	 * service worker has installed but is waiting to activate.
	 */
	wb.addEventListener('waiting', () => {
		showSkipWaitingPrompt();
	});

	// Runs when the service worker becomes operational.
	wb.addEventListener('activated', (event) => {
		// Does not run on subsequent updates.
		if (!event.isUpdate) {
			const readyNotice = createSnackbar('App is ready for offline use.', {
				position: 'right',
				actions: [
					{
						text: 'Dismiss',
						style: {
							color: '#BE88FF',
						},
						callback: (_, snackbar) => snackbar.destroy(),
					},
				],
			});
			setTimeout(() => {
				readyNotice.destroy();
			}, 4000);
		}
	});

	// Install the service worker.
	wb.register();

	// Check for updates.
	wb.update();
};
