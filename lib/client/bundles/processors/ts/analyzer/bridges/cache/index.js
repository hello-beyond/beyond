// In-memory storage is specially designed to prevent the backend,
// which requires both client and server bridges, from being processed twice
const memory = new Map();

const CachedSource = require('./cached-source');

module.exports = class {
    #db = require('./db');
    #key;
    #bridges;
    #bundle;

    constructor(bridges, bundle) {
        this.#key = bundle.id;
        this.#bridges = bridges;
        this.#bundle = bundle;
    }

    async load() {
        if (memory.has(this.#bundle.id)) return await memory.get(this.#bundle.id).value;
        const promise = Promise.pending();
        memory.set(this.#bundle.id, promise);

        let row;
        try {
            const select = 'SELECT * FROM bridges WHERE bundle_id=?';
            row = await this.#db.get(select, this.#bundle.id);
        }
        catch (exc) {
            console.log('Error loading ts processor compilation from cache:', exc.stack);
            promise.resolve();
            return;
        }
        if (!row) {
            promise.resolve();
            return;
        }

        let output;
        try {
            output = new Map(JSON.parse(row.data));

            // Convert raw data object into a source object
            output.forEach((cached, key) => output.set(key, new CachedSource(cached)));
        }
        catch (exc) {
            console.log('Error loading backend bridges from cache:', exc.stack);
            await this.delete();
        }

        promise.resolve(output);
        return output;
    }

    async save() {
        const data = JSON.stringify([...this.#bridges]);

        const promise = Promise.pending();
        promise.resolve(new Map([...this.#bridges]));
        memory.set(this.#bundle.id, promise);

        try {
            await this.#db.run('INSERT OR REPLACE INTO bridges(' +
                'bundle_id, data) VALUES(?, ?)',
                [this.#bundle.id, data]);
        }
        catch (exc) {
            console.log('Error saving backend bridges into cache:', exc.stack);
        }
    }

    async delete() {
        memory.delete(this.#bundle.id);

        try {
            await this.#db.run('DELETE FROM bridges WHERE bundle_id=?', this.#bundle.id);
        }
        catch (exc) {
            console.log('Error deleting backend bridges cache:', exc.stack);
        }
    }
}
