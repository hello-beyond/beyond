function DBManager() {

    const base = new BeyondDBBase(this);

    if (!window.indexedDB) console.warn('IndexedDB is not available');

    this.create = async config => {

        const db = new Database();
        base.databases.set(config.name, db);

        return db.create(config);

    };

    this.get = async name => {

        if (base.databases.has(name)) return base.databases.get(name);

        const database = new Database();

        const db = await database.get(name);

        if (db) base.databases.set(name, db);

        return db;

    };

    window._db = this;
    this.delete = async name => {
        const promise = new PendingPromise();

        if (base.databases.has(name)) base.databases.delete(name);

        const req = indexedDB.open(name);
        let existed = true;
        req.onsuccess = async () => {

            req.result.close();
            if (existed) {
                await indexedDB.deleteDatabase(name);
                promise.resolve();
            }

        }

        req.onupgradeneeded = () => existed = false;
        return promise;

    };

}

export const BeyondDB = new DBManager();

