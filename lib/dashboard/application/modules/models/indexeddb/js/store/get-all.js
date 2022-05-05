function getAll(parent) {

    parent.getAll = async () => {

        let entries = [];

        await parent.load();

        const {object} = parent;
        const db = await parent.db;

        const query = db.transaction(parent.name);
        let store = query.objectStore(parent.name);

        query.oncomplete = (event) => {
        };
        query.onerror = (event) => console.error(event);
        let promise = new PendingPromise();

        if ('getAll' in object) {

            store.getAll().onsuccess = event => {
                entries = event.target.result;
                promise.resolve(entries);
                promise = undefined;
            }
            return promise;

        }

        store.openCursor().onsuccess = event => {

            const cursor = event.target.result;

            if (!cursor) {
                promise.resolve(entries);
                promise = undefined;
                return;
            }

            entries.push(cursor.value);
            cursor.continue();

        };

        return promise;

    }
}
