/// <reference types="@capacitor/splash-screen" />

import type { CapacitorConfig } from '@capacitor/cli';
import packageJson from './package.json';
const appId = packageJson.appId;
const name = packageJson.name;

const config: CapacitorConfig = {
	appId: appId,
	appName: name,
	// backgroundColor: '#ffffff',
	// plugins: {
	// 	SplashScreen: {
	// 		// backgroundColor: '#ffffff',
	// 	},
	// },
	webDir: './www',
};

export default config;
