function saveItem(parent) {

    async function save(data) {

        const db = await parent.db;
        if (!Array.isArray(data)) data = [data];
        let promise = new PendingPromise();
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

            if (!data.hasOwnProperty(item)) return;
            try {
                let request = store.put(data[item]);
                request.onsuccess = onSuccessAll;
            }
            catch (exc) {
                console.error(exc);
                console.error(data, item, data[0]);
            }

        }

        return promise;

    }

    parent.save = save;

}

