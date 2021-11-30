const CachedSource = require('./cached-source');

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
            const select = 'SELECT * FROM ts_transpiler WHERE bundle_id=? AND distribution=? AND language=?';
            row = await this.#db.get(select, [bundle.id, distribution.key, language]);
        }
        catch (exc) {
            console.log('Error loading ts transpiled code from cache:', exc.stack);
            return;
        }
        if (!row) return;

        let output;
        try {
            const data = JSON.parse(row.data);
            output = {
                files: new Map(data.files),
                diagnostics: {
                    general: data.diagnostics.general,
                    files: new Map(data.diagnostics.files)
                }
            };

            // Convert raw data object into a source object
            const {files} = output;
            files.forEach((cached, key) => files.set(key, new CachedSource(cached)));
        }
        catch (exc) {
            console.log('Error loading ts transpiled code from cache:', exc.stack);
            await this.delete();
        }
        return output;
    }

    async save(files, diagnostics) {
        const {bundle, distribution, language} = this.#specs;

        const data = {files: [...files], diagnostics: diagnostics};
        try {
            await this.#db.run('INSERT OR REPLACE INTO ts_transpiler(' +
                'bundle_id, distribution, language, data) VALUES(?, ?, ?, ?)',
                [bundle.id, distribution.key, language, JSON.stringify(data)]);
        }
        catch (exc) {
            console.log('Error saving ts transpiled code into cache:', exc.stack);
        }
    }

    async delete() {
        const {bundle, distribution, language} = this.#specs;

        try {
            const sentence = 'DELETE FROM ts_transpiler WHERE bundle_id=? AND distribution=? AND language=?';
            await this.#db.run(sentence, [bundle.id, distribution, language]);
        }
        catch (exc) {
            console.log('Error deleting ts transpiled code cache:', exc.stack);
        }
    }
}
