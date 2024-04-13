// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
	{
		ignores: ['**/dist/**', '.electron-builder.config.js'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
		},
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.worker,
			},
			parser: tseslint.parser,
			parserOptions: {
				project: [
					'./tsconfig.json',
					'./src-electron/tsconfig.json',
					'./src-www/scripts/web-workers/tsconfig.json',
				],
			},
		},
		rules: {
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
	{
		// disable type-aware linting on JS files
		files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
		...tseslint.configs.disableTypeChecked,
	},
);
