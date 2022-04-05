const {FinderCollection} = global.utils;

/**
 * Collection of application's own modules
 */
module.exports = class extends FinderCollection {
    #application;
    get application() {
        return this.#application;
    }

    #config;

    constructor(application, config) {
        super(application.watcher, require('./module'), {items: {subscriptions: ['change', 'initialised']}});
        this.#application = application;
        this.#config = config;

        config.on('initialised', this.#configure);
        config.on('change', this.#configure);
        config.initialised && this.#configure();
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        // Create the files watcher of the application
        const config = this.#config;
        !config.initialised && await config.initialise();

        await super.initialise();
        this.#initialising = false;
    }

    #configure = () => {
        const config = this.#config;
        if (!config.valid || !config.value) {
            super.configure();
            return;
        }

        const application = this.#application;
        const {value} = config;
        const path = value.path ? require('path').join(application.path, value.path) : application.path;
        super.configure(path, {filename: 'module.json', excludes: ['./builds', 'node_modules']});
    }

    destroy() {
        super.destroy();
        this.#config.off('initialised', this.#configure);
        this.#config.off('change', this.#configure);
    }
}
