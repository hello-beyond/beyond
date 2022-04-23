const fs = require('fs').promises;

module.exports = new class {
    #ready = Promise.pending();
    #store;

    async #initialise() {
        const is = global.dashboard ? 'dashboard' : 'main';
        const name = `${is}.log`;
        const dirname = require('path').join(process.cwd(), '.beyond/dps');
        const store = this.#store = require('path').join(dirname, name);

        let exists;
        try {
            await fs.access(store);
            exists = true;
        }
        catch (exc) {
            exists = false;
        }

        exists ? await fs.rm(store) : await fs.mkdir(dirname, {recursive: true});
        await fs.appendFile(store, 'Dynamic processors logs:\n\n');
        this.#ready.resolve();
    }

    constructor() {
        this.#initialise().catch(exc => console.log(exc.stack));
    }

    async append(message) {
        await this.#ready.value;
        await fs.appendFile(this.#store, `${Date.now()}:\n${message}\n\n`).catch(exc =>
            console.log('Error saving dynamic processors logs', exc.stack));
    }
}
