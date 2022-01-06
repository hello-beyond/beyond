const functions = new Map();

/**
 * Processor sources
 */
module.exports = class {
    #files;
    get files() {
        return this.#files;
    }

    #overwrites;
    get overwrites() {
        return this.#overwrites;
    }

    #functions;
    get functions() {
        return this.#functions;
    }

    /**
     * Processor sources constructor
     *
     * @param processorName {string} The processor name
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param extname {string[]} The files extensions array
     */
    constructor(processorName, specs, extname) {
        this.#files = new (require('./files'))(processorName, specs);

        if (specs.bundle.name !== `template/processors/${processorName}`) {
            this.#overwrites = new (require('./overwrites'))(processorName, specs, extname);

            const key = `${specs.application.id}/${processorName}/${specs.distribution.key}`;
            this.#functions = functions.get(key);
            if (!this.#functions) {
                this.#functions = new (require('./functions'))(processorName, specs);
                functions.set(key, this.#functions);
            }
        }
    }

    destroy() {
        this.#files.destroy();
        this.#overwrites?.destroy();
        this.#functions?.destroy();
    }
}
