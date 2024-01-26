/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
/**
 * Reloads the browser when JavaScript changes.
 * Hot module replaces when CSS changes.
 * Only active when in development mode `yarn dev`.
 */
export const hotReload = /* @__PURE__ */ () => {
	console.log('[hot-reload.ts] Listening for changes...');
	new EventSource('/esbuild').addEventListener(
		'change',
		(e: MessageEvent<string>) => {
			const { added, removed, updated } = JSON.parse(e.data) as ReloadJSON;

			if (!added.length && !removed.length && updated.length === 1) {
				for (const link of document.getElementsByTagName('link')) {
					const url = new URL(link.href);

					if (url.host === location.host && url.pathname === updated[0]) {
						const next = link.cloneNode() as HTMLLinkElement;
						next.href = updated[0] + '?' + Math.random().toString(36).slice(2);
						next.onload = () => link.remove();
						link.parentNode?.insertBefore(next, link.nextSibling);
						return;
					}
				}
			}

			location.reload();
		},
	);
};

// Guessing at these types
type ReloadJSON = {
	added: string[];
	removed: string[];
	updated: string[];
};
