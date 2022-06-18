const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle';
    }

    #container;
    get container() {
        return this.#container;
    }

    get application() {
        return this.#container.application;
    }

    #name;
    get name() {
        return this.#name;
    }

    get watcher() {
        return this.#container.watcher;
    }

    get id() {
        return `${this.#container.id}//${this.#name}`;
    }

    #meta;
    get meta() {
        return this.#meta;
    }

    #path;
    get path() {
        return this.#path;
    }

    get pathname() {
        return `${this.#container.pathname}/${this.#name}`;
    }

    get resource() {
        return `${this.#container.resource}/${this.#name}`;
    }

    #packagers;
    get packagers() {
        return this.#packagers;
    }

    #config;
    get config() {
        return this.#config;
    }

    get multilanguage() {
        return !!this.#config?.multilanguage;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    /**
     * This method can be overridden
     * @param config {object} The bundle configuration
     * @return {{value?: object, errors?: string[], warnings?: string[]}}
     */
    processConfig(config) {
        return typeof config !== 'object' ? {errors: ['Invalid configuration']} : {value: config};
    }

    /**
     * Bundler constructor
     *
     * @param container {object} Can be an application module or an application library
     * @param name {string} The bundle's name
     * @param config {object} The bundle's configuration
     */
    constructor(container, name, config) {
        if (!container || !name) throw new Error('Invalid parameters');
        if (!global.bundles.has(name)) {
            throw new Error(`Bundle "${name}" is not registered`);
        }

        super();
        this.#meta = global.bundles.get(name);
        this.#container = container;
        this.#name = name;
        this.#packagers = new (require('./packagers'))(this);

        super.setup(new Map([['config', {child: config}]]));
    }

    _process() {
        const config = this.children.get('config').child;

        this.#path = config.path;
        this.#config = void 0;
        if (!config.valid || !config.value) {
            this.#errors = config.errors;
            this.#warnings = config.warnings;
            return;
        }

        this.#errors = [];
        const processed = this.processConfig(config.value);
        if (typeof processed !== 'object') throw new Error('Invalid configuration');

        const {errors, warnings, value} = processed;
        this.#errors = errors ? errors : [];
        warnings && (this.#warnings = warnings.concat(warnings));

        if (this.#errors.length) return;
        this.#config = value;
    }

    destroy() {
        super.destroy();
        this.#packagers.destroy();
    }
}
