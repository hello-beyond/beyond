export function DSDatabase() {
    'use strict';

    let db, initialised;
    const config = getConfig();

    Object.defineProperty(this, 'initialised', {get: () => initialised});
    Object.defineProperty(this, 'db', {get: () => db});

    let promise;
    this.initialise = async () => {
        if (initialised || promise) return promise;
        promise = new PendingPromise();
        const {BeyondDB} = await beyond.import('@beyond-js/dashboard/indexeddb/code');
        db = await BeyondDB.create(config);
        initialised = true;
        promise.resolve(db);
        promise = undefined;
    };

    this.store = name => db.stores.has(name) ? db.stores.get(name) : false;

}
