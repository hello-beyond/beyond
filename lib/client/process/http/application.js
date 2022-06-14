const DynamicProcessor = global.utils.DynamicProcessor(Map);
const Server = require('./server');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'http.application';
    }

    #application;

    constructor(application) {
        super();
        this.#application = application;
    }

    async _begin() {
        const application = this.#application;
        await application.initialise();
        super.setup(new Map([['distributions', {child: application.deployment.distributions}]]));
    }

    _prepared(require) {
        const distributions = this.children.get('distributions').child;
        distributions.forEach(distribution => require(distribution));
    }

    _process() {
        const distributions = this.children.get('distributions').child;

        const updated = new Map();
        distributions.forEach(distribution => {
            const {key} = distribution;
            const application = this.#application;
            updated.set(key, this.has(key) ? this.get(key) : new Server(application, distribution));
        });

        // Initialise servers
        updated.forEach(server => !server.initialised && !server.initialising &&
            server.initialise().catch(exc => console.log(exc.stack)));

        // Destroy unused servers
        this.forEach((server, key) => !updated.has(key) && server.destroy());

        super.clear(); // Do not use this.clear as it would destroy reused servers
        updated.forEach((value, key) => this.set(key, value));
    }

    clear() {
        this.forEach(server => server.destroy());
    }

    destroy() {
        super.destroy();
        this.clear();
    }
}
