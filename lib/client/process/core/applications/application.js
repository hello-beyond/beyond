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

    #libraries;
    get libraries() {
        return this.#libraries;
    }

    #modules;
    get modules() {
        return this.#modules;
    }

    #transversals;
    get transversals() {
        return this.#transversals;
    }

    #externals;
    get externals() {
        return this.#externals;
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

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

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
        cfg.externals = cfg.modules.properties.get('externals');

        this.#libraries = new (require('./libraries'))(this, this.#libraries, cfg.libraries);
        this.#template = new (require('./template'))(this, cfg.template);
        this.#deployment = new (require('./deployment'))(this, cfg.deployment);
        this.#_static = new (require('./static'))(this, cfg.static);
        this.#excludes = new (require('./excludes'))(this, cfg.excludes);
        this.#modules = new (require('./modules'))(this, cfg.modules, this.#excludes);
        this.#transversals = new (require('./transversals'))(this, cfg.transversals);
        this.#styles = new (require('./styles'))(this);
        this.#consumers = new (require('./consumers'))(this);

        this.#template.initialise();

        await super.initialise();

        this.#externals = new (require('./externals'))(this, cfg.externals);
        this.#externals.initialise().catch(exc => console.error(exc.stack));

        this.#initialising = false;
    }

    constructor(config, libraries) {
        super(config);
        this.#libraries = libraries;
        this.#config = new (require('./config'))(this);

        // As the modules are subscribed to the events of the application, then
        // it is required to increase the number of listeners
        this._events.setMaxListeners(500);
    }

    _process() {
        const config = this.children.get('config').child;
        this.#warnings = config.warnings;
        this.#errors = config.errors;
        const value = config.valid ? config.value : {};

        super._process(value);
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
