module.exports = class {
    #db = require('./db');
    #specs;

    constructor(specs) {
        this.#specs = specs;
    }

    async load() {
        const {bundle, distribution, language} = this.#specs;

        let row;
        try {
            const select = 'SELECT * FROM tsc WHERE bundle_id=? AND distribution=? AND language=?';
            row = await this.#db.get(select, [bundle.id, distribution.key, language]);
        }
        catch (exc) {
            console.log('Error loading ts processor compilation from cache:', exc.stack);
            return;
        }
        if (!row || !row.hash) return;

        let compilation;
        try {
            compilation = JSON.parse(row.data);
            compilation = {
                files: new Map(compilation.files),
                diagnostics: {
                    general: compilation.diagnostics.general,
                    files: new Map(compilation.diagnostics.files),
                    dependencies: new Map(compilation.diagnostics.dependencies)
                }
            };
        }
        catch (exc) {
            console.log('Error loading ts processor compilation from cache:', exc.stack);
            await this.delete();
        }
        return {compilation, hash: row.hash};
    }

    /**
     * Save the compilation to cache
     *
     * @param compilation {string} The stringified data ready to be stored
     * @param hash {number} The calculated hash
     * @return {Promise<void>}
     */
    async save(compilation, hash) {
        const {bundle, distribution, language} = this.#specs;

        try {
            await this.#db.run('INSERT OR REPLACE INTO tsc(' +
                'bundle_id, distribution, language, hash, data) VALUES(?, ?, ?, ?, ?)',
                [bundle.id, distribution.key, language, hash, compilation]);
        }
        catch (exc) {
            console.log('Error saving ts processor compilation into cache:', exc.stack);
        }
    }

    async delete() {
        const {bundle, distribution, language} = this.#specs;

        try {
            const sentence = 'DELETE FROM tsc WHERE bundle_id=? AND distribution=? AND language=?';
            await this.#db.run(sentence, [bundle.id, distribution.key, language]);
        }
        catch (exc) {
            console.log('Error deleting ts processor compilation cache:', exc.stack);
        }
    }
}
