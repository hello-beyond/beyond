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

    /**
     * Processor sources constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     * @param extname {string[]} The files extensions array
     */
    constructor(specs, extname) {
        this.#files = new (require('./files'))(specs);
        this.#overwrites = new (require('./overwrites'))(specs, extname);
    }

    destroy() {
        this.#files.destroy();
        this.#overwrites.destroy();
    }
}
