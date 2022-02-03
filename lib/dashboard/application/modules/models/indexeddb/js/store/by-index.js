function byIndex(parent) {

    /**
     * Metodo para consultar la informacion de un store segun un indice previamente definido
     * Esta consulta se puede limitar gracias al limit y el offset para no devolver TODOS los items de un store que
     * cumplan con la condicion del indice
     * @param indexName
     * @param indexValue
     * @param limit
     * @param offset
     * @returns {Promise<unknown>}
     */

    async function get(indexName, indexValue, limit, offset = 0) {

        const db = await parent.db;

        let promise = Promise.pending();
        const query = db.transaction(parent.name, 'readwrite');

        query.onerror = (event) => console.error(event);

        const store = query.objectStore(parent.name);
        //TODO @jida agregar validacion cuando el indice nmo esta definido
        const index = store.index(indexName);
        const response = index.getAll(indexValue);

        response.onsuccess = event => {
            const entries = limit ? event.target.result.splice(offset, limit + 1) : event.target.result;
            promise.resolve(entries);
        };

        response.onerror = () => promise.reject();

        return promise;

    }

    parent.getByIndex = get;

}
