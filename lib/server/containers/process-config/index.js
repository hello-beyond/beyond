module.exports = new class {
    #defaults = new (require('./defaults'))();

    /**
     * Check if the library is already included, if not, then added it
     *
     * @param config {array} The configuration of the libraries that is being processed
     * @param library {string} The library name
     * @returns {boolean}
     */
    #check = async (config, library) => {
        let exists = false;
        for (const item of config) {
            await item.ready;
            if (!item.valid || item.value.name !== library) continue;
            exists = true;
            break;
        }
        !exists && config.push(this.#defaults.get(library));
    }

    async process(config) {
        await this.#defaults.ready;

        // Include beyond-local by default
        await this.#check(config, 'beyond-local');
    }
}
