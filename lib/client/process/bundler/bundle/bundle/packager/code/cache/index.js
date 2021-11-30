module.exports = class {
    #db = require('./db');

    // The bundle packager
    #packager;

    constructor(packager) {
        this.#packager = packager;
    }

    async load() {
        let row;

        const failed = async exc => {
            console.log(`Error loading from cache the code of the packager "${this.#packager.id}": ${exc.message}`);
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
        }
        catch (exc) {
            return await failed(exc);
        }

        const {sourcemap, specs, errors} = data;
        return {sourcemap, specs, errors, hash: row.hash};
    }

    /**
     * Save the bundle packager code
     *
     * @param sourcemap {object} The sourcemap object has a toJSON method to serialize the code and map
     * @param errors {string[]} An array or errors
     * @param hash {number} The hash of the packager
     * @param specs {{txt?: {multilanguage: boolean}}}
     */
    save(sourcemap, specs, errors, hash) {
        if (!sourcemap && !errors) throw new Error('Invalid parameters');
        const data = JSON.stringify({sourcemap, specs, errors});
        const sentence = 'INSERT OR REPLACE INTO packagers(packager_id, data, hash) VALUES(?, ?, ?)';
        const params = [this.#packager.id, data, hash];

        const exc = exc => console.log(`Error saving into cache the code of the packager "${this.#packager.id}": ${exc.stack}`);
        this.#db.run(sentence, params).catch(exc);
    }

    delete() {
        const sentence = 'DELETE FROM packagers WHERE packager_id=?';

        const exc = exc => console.log(`Error deleting from cache the code of the packager "${this.#packager.id}": ${exc.stack}`);
        this.#db.run(sentence, this.#packager.id).catch(exc);
    }
}
