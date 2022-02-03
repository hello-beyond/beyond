module.exports = class {
    #db = require('./db');

    // The bundle or transversal packager, or the processor base
    #packager;

    constructor(packager) {
        this.#packager = packager;
    }

    async load() {
        let row;

        const failed = async exc => {
            console.log(`Error loading from cache the dependencies of the packager "${this.#packager.id}": ${exc.message}`);
            this.delete();
        }

        try {
            const select = 'SELECT hash, data FROM packagers WHERE packager_id=?';
            row = await this.#db.get(select, this.#packager.id);
        }
        catch (exc) {
            return await failed(exc);
        }
        if (!row || !row.hash) return;

        let data;
        try {
            data = JSON.parse(row.data);
            const {dependencies} = data;
            data.dependencies = new Map(dependencies);
        }
        catch (exc) {
            return await failed(exc);
        }

        return {dependencies: data.dependencies, errors: data.errors, hash: row.hash};
    }

    save(dependencies, hash) {
        if (!dependencies) throw new Error('Invalid parameters');
        const {errors} = dependencies;
        const data = JSON.stringify({dependencies: [...dependencies], errors});

        const sentence = 'INSERT OR REPLACE INTO packagers(packager_id, data, hash) VALUES(?, ?, ?)';
        const params = [this.#packager.id, data, hash];

        const exc = exc => console.log(`Error saving into cache the dependencies of the packager "${this.#packager.id}": ${exc.stack}`);
        this.#db.run(sentence, params).catch(exc);
    }

    delete() {
        const sentence = 'DELETE FROM packagers WHERE packager_id=?';

        const exc = exc => console.log(`Error deleting from cache the dependencies of the packager "${this.#packager.id}": ${exc.stack}`);
        this.#db.run(sentence, this.#packager.id).catch(exc);
    }
}
