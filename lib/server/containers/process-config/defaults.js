module.exports = class extends Map {
    #ready = Promise.pending();
    get ready() {
        return this.#ready.value;
    }

    #append = async (name, directory) => {
        const path = require('path').join(global.lib, 'client', directory);
        const config = new global.utils.Config(path, {
            '/node': 'object',
            '/ssr': 'object',
            '/backend': 'object',
            '/legacyBackend': 'object'
        });
        await config.process('library.json');
        this.set(name, config);
    };

    #process = async () => {
        await this.#append('beyond-local', 'browser/local');
        this.#ready.resolve();
    }

    constructor() {
        super();
        this.#process().catch(exc => console.error(exc.stack));
    }
}
