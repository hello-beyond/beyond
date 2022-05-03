/**
 *
 * @param {object} database Database object
 * @param {string} name Name of the Store to read/write
 * @constructor
 */
function DBStore(database, name) {

    Object.defineProperty(this, 'name', {'get': () => name});

    let object;
    Object.defineProperty(this, 'object', {'get': () => object});

    Object.defineProperty(this, 'db', {
        'get': async () => {
            await database.open();
            return database.db;
        }
    });

    let pk;
    Object.defineProperty(this, 'pk', {'get': () => pk});

    this.create = async store => {

        const specs = store.config ? store.config : undefined;
        /**
         * The db object is used directly when the store is created because this method
         * is used only when the onupgradeneeded method is called.
         * In the other methods is necessary to call the database.get method to open a new
         * connection as a good practice.
         * @type {IDBDatabase}
         */
        const db = database.db;
        name = store.name;

        if (specs && specs.keyPath) pk = specs.keyPath;

        if (db.objectStoreNames.contains(store.name)) {
            /**
             * TODO: @Julio. add logic to migrate data
             */
            db.deleteObjectStore(store.name);
        }
        object = specs ? db.createObjectStore(store.name, specs) : db.createObjectStore(store.name);

        if (store.hasOwnProperty('indexes') && Array.isArray(store.indexes)) {
            for (const index of store.indexes) {
                object.createIndex(index[0], index[1], index[2]);
            }
        }

    }

    const load = async () => {

        await database.open();
        const db = database.db;

        object = db.transaction(name).objectStore(name);

    };

    this.load = load;

    getAll(this);
    deleteItem(this);
    saveItem(this)
    getItem(this);

    if (name) load();
}
