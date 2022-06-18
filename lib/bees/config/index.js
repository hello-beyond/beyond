const DynamicProcessor = global.utils.DynamicProcessor(Set);
const BEESpecs = require('./specs');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bees.instances.config';
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

    // Is it the instance of the Beyond JS dashboard
    #dashboard;

    /**
     * BEEs config constructor
     *
     * @param path {string} The path where the beyond.json is located
     * @param dashboard {boolean} Is it the instance of the Beyond JS dashboard
     */
    constructor(path, dashboard) {
        super();
        this.#dashboard = dashboard;

        const config = new global.utils.Config(path, {
            '/applications': 'array',
            '/applications/children/deployment': 'object',
            '/libraries': 'array',
            '/libraries/children/legacyBackend': 'object'
        });
        config.data = 'beyond.json';

        const applications = new (require('./applications'))(config.properties.get('applications'));
        const libraries = new (require('./libraries'))(config.properties.get('libraries'));
        super.setup(new Map([['applications', {child: applications}], ['libraries', {child: libraries}]]));
    }

    _process() {
        const applications = this.children.get('applications').child;
        const libraries = this.children.get('libraries').child;

        this.clear();

        // Add the bees required by the distributions specified in each project
        applications.forEach(item => this.add(new BEESpecs(item, this.#dashboard)));

        // The legacy bees required by legacy libraries
        libraries.forEach(item => this.add(new BEESpecs(item, this.#dashboard)));

        // Add the compiled dashboard to the list of bees to be created
        !this.#dashboard && (() => {
            const engine = 'legacy';
            const path = require('path').join(__dirname, '../../../dashboard/ws');
            const distribution = {name: 'legacy', platform: 'legacy'};
            const legacy = {core: './core', sessions: './sessions'};
            const pkg = 'dashboard.published';

            const config = {engine, path, pkg, distribution, legacy};
            this.#compiledDashboard = new BEESpecs(config, false);
        })();

        // Add the local library to the list of bees to be created
        (() => {
            const engine = 'legacy';
            const path = require('path').join(__dirname, '../../client/browser/local');
            const distribution = {name: 'legacy', platform: 'legacy'};
            const legacy = {core: './service'};
            const pkg = '@beyond-js/local';

            const config = {engine, path, pkg, distribution, legacy};
            this.#local = new BEESpecs(config, this.#dashboard);
        })();
    }
}
