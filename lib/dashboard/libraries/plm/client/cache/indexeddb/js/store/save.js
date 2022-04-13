function saveItem(parent) {

    async function save(data) {

        const db = await parent.db;

        if (!Array.isArray(data)) data = [data];
        let promise = Promise.pending();

        const query = db.transaction(parent.name, 'readwrite');

        query.onerror = (event) => console.error(event);

        const store = query.objectStore(parent.name);

        let total = 1;
        const onSuccessAll = (event) => {

            if (total !== data.length) total++;
            else {
                promise.resolve();
                promise = undefined;
            }

        }

        for (let item in data) {
            let request = store.put(data[item]);
            request.onsuccess = onSuccessAll;
        }

        return promise;

    }

    parent.save = save;

}

