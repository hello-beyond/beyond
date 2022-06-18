const instances = new Map;
require('./ipc')(instances);
require('./logs');

const DynamicProcessor = global.utils.DynamicProcessor(Map);
const ProcessManager = require('./process-manager');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bees';
    }

    #path;
    get path() {
        return this.#path;
    }

    #dashboard;
    get dashboard() {
        return this.#dashboard;
    }

    get errors() {
        return [];
    }

    get warnings() {
        return [];
    }

    // The @beyond-js/local process is registered outside the rest of the bees
    #local;
    get local() {
        return this.#local;
    }

    // The compiled dashboard process is registered outside the rest of the bees
    #compiledDashboard;
    get compiledDashboard() {
        return this.#compiledDashboard;
    }

    /**
     * BEEs instances constructor
     *
     * @param path {string} The path where the beyond.json is located
     * @param dashboard {boolean} Is it the instance of the Beyond JS dashboard
     */
    constructor(path, dashboard) {
        super();
        this.#path = path;
        this.#dashboard = dashboard;

        instances.set(dashboard ? 'dashboard' : 'main', this);

        const config = new (require('./config'))(path, dashboard);
        super.setup(new Map([['config', {child: config}]]));
    }

    _prepared(require) {
        const config = this.children.get('config').child;
        config.forEach(item => require(item));
        require(config.local);
        config.compiledDashboard && require(config.compiledDashboard);
    }

    _process() {
        const config = this.children.get('config').child;
        config.forEach(specs => {
            const {id} = specs;
            !this.has(id) && this.set(id, new ProcessManager());
            this.get(id).update(specs);
        });

        // Destroy bees that has been removed from configuration
        this.forEach((processManager, path) => !config.has(path) && processManager.destroy());

        // Create the @beyond-js/local process wrapper only once
        this.#local = this.#local ?
            this.#local : (() => {
                const local = new ProcessManager();
                local.update(config.local);
                return local;
            })();

        // Create the compiled dashboard process wrapper only once
        this.#compiledDashboard = this.#compiledDashboard || !config.compiledDashboard ?
            this.#compiledDashboard : (() => {
                const compiledDashboard = new ProcessManager();
                compiledDashboard.update(config.compiledDashboard);
                return compiledDashboard;
            })();
    }
}
