const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

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

    // The name of the bundle type (ex: 'ts', 'sass', etc.)
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

    #packagers;
    get packagers() {
        return this.#packagers;
    }

    #config;
    get config() {
        return this.#config;
    }

    get resource() {
        return this.#config?.resource;
    }

    get pathname() {
        return this.#config?.pathname;
    }

    get multilanguage() {
        return !!this.#config?.multilanguage;
    }

    /**
     * The name of the bundle specified in the module.json
     * If the bundle name is not specified, then the bundle meta name (ex: 'ts', 'sass', etc) is taken by default
     * @return {string}
     */
    get iname() {
        return this.#config?.iname;
    }

    /**
     * The path of the resource relative to the package, used as the exported value in the package.json
     * @return {string}
     */
    get rname() {
        return this.#config?.rname;
    }

    // The name of the bundle specified in the module.json
    get platforms() {
        return this.#config?.platforms;
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
     * @param container {object} The application module that contains the bundle
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

        super.setup(new Map([['container', {child: container}], ['config', {child: config}]]));
    }

    _process() {
        const container = this.children.get('container').child;
        const config = this.children.get('config').child;

        const done = ({errors, warnings, value}) => {
            if (equal(this.#errors, errors) && equal(this.#warnings, warnings) && equal(this.#config, config)) {
                return false;
            }

            this.#errors = errors ? errors : [];
            this.#warnings = warnings ? warnings : [];
            this.#config = value;
        }

        this.#path = config.path;
        if (!config.valid || !config.value) {
            const {errors, warnings} = config;
            return done({errors, warnings});
        }

        this.#errors = [];
        const processed = this.processConfig(config.value);
        if (typeof processed !== 'object') throw new Error('Invalid configuration');

        let {errors, warnings, value} = processed;
        warnings = warnings ? warnings : [];
        warnings = warnings.concat(config.warnings ? config.warnings : []);

        const iname = value.iname = typeof value.name === 'string' ? value.name : this.#name;
        value.rname = container.rname + (container.bundles.size === 1 ? '' : `.${iname}`);
        value.resource = container.resource + (container.bundles.size === 1 ? '' : `.${iname}`);
        value.pathname = container.pathname;

        value.platforms = (() => {
            let {platforms: {all}} = global;
            let platforms = config.platforms ? config.platforms : all;
            platforms = typeof platforms === 'string' ? [platforms] : platforms;
            platforms = platforms instanceof Array ? platforms : all;
            platforms = platforms.includes('*') ? all : platforms;

            // Remove the platforms that are not included in the container module
            platforms = platforms.filter(platform => container.platforms.has(platform));

            return new Set(platforms);
        })();

        if (this.#errors.length) return done({errors, warnings});
        return done({warnings, value});
    }

    destroy() {
        super.destroy();
        this.#packagers.destroy();
    }
}
