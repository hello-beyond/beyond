const {ConfigurableFinder} = global.utils;

module.exports = class extends ConfigurableFinder {
    #config;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    constructor(library, config) {
        super(library.watcher);

        this.#config = config;
        config.on('initialised', this.#configure);
        config.on('change', this.#configure);
        this.#configure();
    }

    #configure = () => {
        this.#errors = this.#config.errors;
        this.#warnings = this.#config.warnings;

        if (!this.#config.valid || !this.#config.value) {
            super.configure();
            return;
        }

        const config = this.#config.value;
        config.includes = typeof config.includes === 'string' ? [config.includes] : config.includes;

        if (!(config.includes instanceof Array)) {
            this.#errors.push('Invalid includes configuration');
            super.configure();
            return;
        }
        super.configure(this.#config.path, config);
    }

    destroy() {
        super.destroy();
        this.#config.off('initialised', this.#configure);
        this.#config.off('change', this.#configure);
    }
}
