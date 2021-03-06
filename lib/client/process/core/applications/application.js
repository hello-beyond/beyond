const {BackgroundWatcher} = global.utils.watchers;

module.exports = class extends require('./attributes') {
    #watcher;
    get watcher() {
        return this.#watcher;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    get valid() {
        return !this.#errors.length;
    }

    #config;
    get config() {
        return this.#config;
    }

    #imports;
    get imports() {
        return this.#imports;
    }

    #excludes;
    get excludes() {
        return this.#excludes;
    }

    #applications;
    #libraries;
    get libraries() {
        return this.#libraries;
    }

    #modules;
    get modules() {
        return this.#modules;
    }

    #bundles = new global.BundlesConfig(this);
    get bundles() {
        return this.#bundles;
    }

    #transversals;
    get transversals() {
        return this.#transversals;
    }

    #deployment;
    get deployment() {
        return this.#deployment;
    }

    #template;
    get template() {
        return this.#template;
    }

    #_static;
    get static() {
        return this.#_static
    }

    #resources = new (require('./resources'))(this);
    get resources() {
        return this.#resources;
    }

    #styles;
    get styles() {
        return this.#styles;
    }

    #builder = new (require('./builder'))(this);
    get builder() {
        return this.#builder;
    }

    #consumers;
    get consumers() {
        return this.#consumers;
    }

    async _begin() {
        await super._begin();

        // Create the files watcher of the application
        const config = this.children.get('config').child;
        await config.initialise();

        this.#watcher = new BackgroundWatcher({is: 'application', path: config.path});
        this.#watcher.start().catch(exc => console.error(exc.stack));

        const cfg = {
            libraries: config.properties.get('libraries'),
            template: config.properties.get('template'),
            deployment: config.properties.get('deployment'),
            static: config.properties.get('static'),
            excludes: config.properties.get('excludes'),
            modules: config.properties.get('modules'),
            transversals: config.properties.get('transversals')
        };

        this.#libraries = new (require('./libraries'))(this, this.#applications, this.#libraries, cfg.libraries);
        this.#template = new (require('./template'))(this, cfg.template);
        this.#deployment = new (require('./deployment'))(this, cfg.deployment);
        this.#_static = new (require('./static'))(this, cfg.static);
        this.#excludes = new (require('./excludes'))(this, cfg.excludes);
        this.#modules = new (require('./modules'))(this, cfg.modules, this.#excludes);
        this.#transversals = new (require('./transversals'))(this, cfg.transversals);
        this.#styles = new (require('./styles'))(this);
        this.#consumers = new (require('./consumers'))(this);

        this.#template.initialise();
    }

    constructor(config, applications, libraries) {
        super(config);
        this.#applications = applications;
        this.#libraries = libraries;
        this.#config = new (require('./config/'))(this);

        // As the modules are subscribed to the events of the application, then
        // it is required to increase the number of listeners
        this._events.setMaxListeners(500);
    }

    _process() {
        let config = this.children.get('config').child;
        this.#warnings = config.warnings;
        this.#errors = config.errors;
        config = !config.valid || !config.value ? {bundles: {}} : require('./config.js')(config.value);

        super._process(config);
        this.#bundles.configure(config.bundles);
    }

    host(distribution) {
        const {hosts} = this;
        return typeof hosts === 'object' ? hosts[distribution.environment] : hosts;
    }

    destroy() {
        super.destroy();
        this.#watcher.destroy();
        this.#libraries.destroy();
        this.#template.destroy();
        this.#_static.destroy();
        this.#excludes.destroy();
        this.#modules.destroy();
        this.#styles.destroy();
    }
}
