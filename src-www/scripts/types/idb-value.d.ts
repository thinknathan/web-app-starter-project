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
