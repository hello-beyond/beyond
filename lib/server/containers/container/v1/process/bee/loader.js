const {ipc} = global.utils;

module.exports = class {
    #bee;
    #pending = new Map();  // The pending promises
    #resolved = new Set(); // It is expected to load the same uri only once

    constructor(bee) {
        this.#bee = bee;
    }

    #process = () => {
        this.#timer = void 0;
        const distribution = (require('./distribution'))(this.#bee.is);

        const done = ({loaded, errors}) => {
            this.#pending.forEach((promise, uri) => {
                let response;
                if (errors) {
                    response = {errors};
                }
                else if (loaded && !loaded.has(uri)) {
                    response = {errors: ['Resource "${uri}" not found']};
                }
                else {
                    const {errors, is, code, map, dependencies} = loaded.get(uri);
                    response = errors ? {errors} : {is, code, map, dependencies};
                }

                try {
                    promise.resolve(response);
                }
                catch (exc) {
                    console.error(exc.stack);
                }
            });
            this.#pending.clear();
        }

        // Request the code of the bundles by IPC
        const required = [...this.#pending.keys()];
        const params = [this.#bee.application.id, required, distribution];
        ipc.exec('main-client', 'code/bundles/get', ...params).then(response => {
            done({loaded: new Map(response)});
        }).catch((exc) => {
            console.error(`Error loading resources "${required}"`, exc.stack);
            done({errors: ['Error found loading resources']});
        });
    }

    #timer;

    async load(uri) {
        if (this.#resolved.has(uri)) throw new Error(`Resource "${uri}" already loaded`);

        if (this.#pending.has(uri)) {
            return await this.#pending.get(uri).value;
        }

        const promise = Promise.pending();
        this.#pending.set(uri, promise);

        this.#timer = this.#timer || setTimeout(this.#process, 0);
        return await promise.value;
    }
}
