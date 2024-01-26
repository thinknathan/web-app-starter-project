/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
interface Window {
	readonly electron: {
		readonly versions: {
			readonly chrome: string;
			readonly node: string;
			readonly electron: string;
		};

		readonly store: {
			readonly getItem: (key: string) => Promise<{ data: string | null }>;
			readonly setItem: (
				key: string,
				val: string,
			) => Promise<{ success: boolean }>;
			readonly hasItem: (key: string) => Promise<{ exists: boolean }>;
			readonly removeItem: (key: string) => Promise<{ success: boolean }>;
			readonly clearItems: () => Promise<{ success: boolean }>;
		};
	};
}

declare const APP_NAME: string;
declare const IS_CAPACITOR: boolean;
declare const IS_ELECTRON: boolean;
declare const IS_WEB: boolean;
declare const IS_DEV: boolean;
declare const NODE_ENV: string;
declare const TARGET_ENV: string;
