const CachedSource = require('./cached-source');

module.exports = class {
    #db = require('./db');
    #analyzer;
    #specs;

    constructor(analyzer, specs) {
        this.#analyzer = analyzer;
        this.#specs = specs;
    }

    async load() {
        const {bundle, distribution, language} = this.#specs;

        let row;
        try {
            const select = 'SELECT * FROM ts_analyzer WHERE bundle_id=? AND distribution=? AND language=?';
            row = await this.#db.get(select, [bundle.id, distribution.key, language]);
        }
        catch (exc) {
            console.log('Error loading ts analyzer interfaces from cache:', exc.stack);
            return;
        }
        if (!row) return;

        let output;
        try {
            const data = JSON.parse(row.data);
            output = new Map(data);

            // Convert raw data object into a source object
            output.forEach((cached, key) => output.set(key, new CachedSource(cached)));
        }
        catch (exc) {
            console.log('Error loading ts analyzer interfaces from cache:', exc.stack);
            await this.delete();
        }
        return output;
    }

    async save() {
        const {bundle, distribution, language} = this.#specs;

        try {
            const data = JSON.stringify([...this.#analyzer]);
            await this.#db.run('INSERT OR REPLACE INTO ts_analyzer(' +
                'bundle_id, distribution, language, data) VALUES(?, ?, ?, ?)',
                [bundle.id, distribution.key, language, data]);
        }
        catch (exc) {
            console.log('Error saving ts analyzer interfaces into cache:', exc.stack);
        }
    }

    async delete() {
        const {bundle, distribution, language} = this.#specs;

        try {
            const sentence = 'DELETE FROM ts_analyzer WHERE bundle_id=? AND distribution=? AND language=?';
            await this.#db.run(sentence, [bundle.id, distribution.key, language]);
        }
        catch (exc) {
            console.log('Error deleting ts analyzer interfaces cache:', exc.stack);
        }
    }
}
