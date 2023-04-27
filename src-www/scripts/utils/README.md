# Utility functions

## keyval-store.ts

This class attempts to provide a consistent interface for saving small amounts of data regardless of the platform.

- In browsers, it uses [idb-keyval](https://github.com/jakearchibald/idb-keyval) to store data in [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- In Electron, it uses [electron-store](https://github.com/sindresorhus/electron-store)
- In Capacitor, it uses [@capacitor/preferences](https://capacitorjs.com/docs/apis/preferences)

### Usage

The API is Promise-based, so results should be `await`ed.

```
import KeyvalStore from './utils/keyval-store.js';
const store = new KeyvalStore();
```

- `getItem('foo')` Retrieves value for key `foo`.
- `setItem('foo', 'bar')` Sets value of key `foo` to `bar`.
- `hasItem('foo')` Searches for existence of value for key `foo`.
- `removeItem('foo')` Removes key `foo` from the keystore.
- `clearItems()` Removes all keys and their values from the keystore.

### Caveats

Browsers may periodically delete stored data to reclaim space. For more durable storage, use the [StorageManager.persist()](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist) API in the browser context.

Avoid using this class a worker thread, because it will only work as expected in a browser context, not in an Electron or Capacitor context.
