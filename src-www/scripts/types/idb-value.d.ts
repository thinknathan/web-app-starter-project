/* Copyright (c) Nathan Bolton (GPL-3.0 OR MPL-2.0) | https://github.com/thinknathan/web-app-starter-project */
type IDBValue =
	| boolean
	| number
	| string
	| Date
	| { [x: string]: IDBValue }
	| Array<IDBValue>
	| RegExp
	| undefined
	| null;
