interface Window {
	electron: {
		versions: {
			chrome: string;
			node: string;
			electron: string;
		};

		store: {
			getItem: (key: string) => Promise<{ data: string | null }>;
			setItem: (key: string, val: string) => Promise<{ success: boolean }>;
			hasItem: (key: string) => Promise<{ exists: boolean }>;
			removeItem: (key: string) => Promise<{ success: boolean }>;
			clearItems: () => Promise<{ success: boolean }>;
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
