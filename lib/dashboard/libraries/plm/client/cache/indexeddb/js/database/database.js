function Database(name) {

    Object.defineProperty(this, 'name', {'get': () => name});

    let version;
    Object.defineProperty(this, 'version', {'get': () => version});

    let db;
    Object.defineProperty(this, 'db', {'get': () => db});

    const stores = new Map();
    Object.defineProperty(this, 'stores', {'get': () => stores});

    this.delete = () => window.indexedDB.deleteDatabase(name);

    /**
     *
     * @param {object}config . The configuration of the database.
     * @param {string} config.name The name of the database
     * @param {number} config.version The version of the database
     * @param {array} config.stores Array of stores to be created.
     * @param {object} config.stores[index] Object with the store configuration
     * @param {object} config.stores[index].name Store name
     * @param {object} config.stores[index].config  Optional specs to store definition. keypath, autoIncremental
     * @param {array} config.stores[index].indexes List of index of the store to be created, each position
     * must be an array with the same values of `IDBObjectStore.createIndex` method: indexName, keyPath, objectParameters
     *
     * @returns {Promise<*>}
     */
    this.create = async config => {

        name = config.name;
        version = config.version;

        let request = window.indexedDB.open(name, version);

        const promise = Promise.pending();

        const onError = (e) => {
            console.error('IndexDB could not connect to database', e);
            promise.reject();
        };

        const onSuccess = () => {

            if (!request) promise.reject();
            db = request.result;
            const storeNames = [...db.objectStoreNames];
            storeNames.map(name => stores.set(name, new DBStore(this, name)));
            promise.resolve(this);

        };

        request.onerror = onError;
        request.onsuccess = onSuccess;
        request.onupgradeneeded = async (event) => {
            //TODO: si la version cambia, debe validarse la estructura de datos previa y respaldarla.

            if (!Array.isArray(config.stores)) {
                throw Error('the property store must be an array');
            }
            if (!db) db = event.target.result;

            for (const store of config.stores) {
                if (!store.hasOwnProperty('name') || typeof store.name !== 'string') {
                    throw Error('Name of store must be a string');
                }
                const obj = new DBStore(this);
                await obj.create(store);

                stores.set(store.name, obj);

            }
            const transaction = event.target.transaction;

            transaction.oncomplete = () => {
                promise.resolve(this);
            }

        };

        return promise;

    };

    this.store = (name) => {
        if (!stores.has(name)) {
            throw Error('the request store does not exists');
        }

        return stores.get(name);
    };

    let promise;

    this.open = () => {

        let promise = Promise.pending();
        const database = window.indexedDB.open(name);
        database.onsuccess = () => {
            promise.resolve(this);
            promise = undefined;
        };

        return promise;

    };

    this.get = dbName => {

        if (promise) return promise;

        dbName = !dbName ? name : dbName;
        if (!dbName) throw Error("The name of the Database to connect is necessary");

        if (db) db = undefined;

        promise = Promise.pending();

        const database = window.indexedDB.open(dbName);
        let exists = true;

        database.onupgradeneeded = () => exists = false;
        database.onsuccess = async (event) => {

            if (!exists) {
                await indexedDB.deleteDatabase(dbName);
                promise.resolve(this);
                promise = undefined;
                return;
            }

            db = event.target.result;

            name = dbName;
            version = db.version;
            const storeNames = [...db.objectStoreNames];
            storeNames.map(name => stores.set(name, new DBStore(this, name)));
            promise.resolve(this);
            promise = undefined;

        };

        return promise;

    }
}