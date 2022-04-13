function getItem(parent) {

    async function get(item) {

        const db = await parent.db;

        let promise = Promise.pending();
        const query = db.transaction(parent.name, 'readwrite');

        query.onerror = (event) => console.error(event);

        const store = query.objectStore(parent.name);
        const response = store.get(item);

        response.onsuccess = event => {
            promise.resolve(response.result);
            promise = undefined;
        };

        response.onerror = () => promise.reject();

        return promise;

    }

    parent.get = get;

}

