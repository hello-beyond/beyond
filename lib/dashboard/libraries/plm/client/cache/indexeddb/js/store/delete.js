function deleteItem(parent) {

    async function remove(item) {

        const db = await parent.db;

        let promise = Promise.pending();
        const query = db.transaction(parent.name, 'readwrite');

        query.onerror = (event) => console.error(event);

        const store = query.objectStore(parent.name);
        const response = store.delete(item);

        response.onsuccess = event => {
            promise.resolve();
            promise = undefined;
        };

        response.onerror = () => promise.reject();

        return promise;

    }

    parent.delete = remove;

}

