module.exports = class extends global.Bundle {
    #route;
    get route() {
        return this.#route;
    }

    // "is" is reserved by the global.Bundle class
    #pageIs;
    get pageIs() {
        return this.#pageIs;
    }

    #vdir;
    get vdir() {
        return this.#vdir;
    }

    #layout;
    get layout() {
        return this.#layout;
    }

    processConfig(config) {
        if (!['object', 'string'].includes(typeof config)) {
            return {errors: ['Invalid configuration']};
        }
        config = Object.assign({}, config);

        this.#route = config.route;
        this.#pageIs = config.pageIs;
        this.#vdir = config.vdir;
        this.#layout = config.layout;

        if (config.is && !['error', 'loading'].includes(config.is)) {
            return {errors: ['"is" configuration is invalid']};
        }

        delete config.route;
        delete config.is;
        delete config.vdir;
        delete config.layout;

        return {value: config};
    }
}
