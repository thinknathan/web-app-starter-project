/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
type JSONValue =
	| string
	| number
	| boolean
	| null
	| { [x: string]: JSONValue }
	| Array<JSONValue>;
