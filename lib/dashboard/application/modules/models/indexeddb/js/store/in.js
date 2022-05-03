function getAllIn(parent) {

    const promises = new Map();
    /**
     * Funcion para obtener la informacion de un conjunto de valores correspondientes al mismo campo como un WHERE field IN (value1, value2,..., valueN)
     * @param ids
     * @param index
     * @param specs
     * @returns {Promise<Array>}
     */
    parent.getAllIn = async (ids, index, specs) => {
        let entries = [];
        const key = `${parent.name}.${index}`;

        if (promises.has(key)) {
            return promises.get(key);
        }

        await parent.load();
        const db = await parent.db;

        const query = db.transaction(parent.name);
        let store = query.objectStore(parent.name);

        query.oncomplete = (event) => {
        };
        query.onerror = (event) => console.error(event);

        let promise = Promise.pending();
        promises.set(key, promise);

        store.openCursor().onsuccess = event => {
            const cursor = event.target.result;
            if (!cursor) {
                promise.resolve(entries);
                promises.delete(key);
                promise = undefined;
                return;
            }

            if (cursor.value[index] && ids.find(item => item === cursor.value[index])) entries.push(cursor.value);

            cursor.continue();
        };

        return promise;
    };

}
