module.exports = class extends Map {
    #ready = Promise.pending();
    get ready() {
        return this.#ready.value;
    }

    #append = async (name, directory) => {
        const path = require('path').join(global.lib, 'client', directory);
        const config = new global.utils.Config(path, {'/start': 'object', '/static': 'object'});

        await config.process('library.json');
        this.set(name, config);
    };

    #process = async () => {
        await this.#append('@beyond-js/kernel', 'browser/kernel');
        await this.#append('@beyond-js/local', 'browser/local');
        await this.#append('@beyond-js/backend', 'browser/backend');
        this.#ready.resolve();
    }

    constructor() {
        super();
        this.#process().catch(exc => console.error(exc.stack));
    }
}
