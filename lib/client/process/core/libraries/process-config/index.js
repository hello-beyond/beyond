module.exports = new class {
    #defaults = new (require('./defaults'))();

    /**
     * Check if the library is already included, if not, then added it
     *
     * @param config {array} The configuration of the libraries that is being processed
     * @param library {string} The package id of the library
     * @returns {boolean}
     */
    #check = async (config, library) => {
        let exists = false;
        for (const item of config) {
            await item.ready;
            if (!item.valid || item.value.package !== library) continue;
            exists = true;
            break;
        }
        !exists && config.push(this.#defaults.get(library));
    }

    async process(config) {
        await this.#defaults.ready;

        // Include beyond library by default
        await this.#check(config, '@beyond-js/kernel');
        await this.#check(config, '@beyond-js/local');
        await this.#check(config, '@beyond-js/backend');
    }
}
