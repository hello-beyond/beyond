const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.deployment.distributions';
    }

    #application;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    constructor(application) {
        super();
        this.#application = application;
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        await this.#application.deployment.initialise();

        await super.initialise();
        this.#initialising = false;
    }

    _prepared() {
        return this.#configured;
    }

    #configured = false;

    configure(config) {
        this.#configured = true;

        if (!(config instanceof Array)) {
            config && (this.#errors = ['Invalid configuration']);
            this.clear();
            this._invalidate();
            return;
        }

        const updated = new Map();
        for (const dConfig of config) {
            if (typeof dConfig !== 'object') continue;

            const key = require('./key')(dConfig);
            let distribution = this.has(key) && this.get(key);
            if (!distribution) {
                distribution = new (require('./distribution'))(this.#application, dConfig, true, key);
                distribution.on('initialised', () => this._events.emit('item.initialised'));
                distribution.on('change', () => this._events.emit('item.change'));
                distribution.initialise().catch(exc => console.log(exc.stack));
            }

            updated.set(key, distribution);
            distribution.configure(dConfig.port);
        }

        // Destroy unused distributions
        this.forEach(distribution => !updated.has(distribution.key) && distribution.destroy());

        super.clear(); // Do not use this.clear as it would destroy reused distributions
        updated.forEach((value, key) => this.set(key, value));
    }

    clear = () => {
        this.forEach(distribution => distribution.destroy());
        super.clear();
    }

    destroy() {
        super.destroy();
        this.clear();
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'applications-distributions',
            filter: {application: this.#application.id}
        });
    }
}