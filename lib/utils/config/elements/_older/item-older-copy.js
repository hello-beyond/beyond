const {EventEmitter} = require('events');

const Nothing = class {
};

// noinspection JSPotentiallyInvalidUsageOfThis
module.exports = (Base = Nothing) => class extends Base {
    _events = new EventEmitter();
    on = (event, listener) => this._events.on(event, listener);
    off = (event, listener) => this._events.off(event, listener);
    removeALlListeners = () => this._events.removeAllListeners();

    _config;

    get errors() {
        return this._config.errors;
    }

    get warnings() {
        return this._config.warnings;
    }

    get valid() {
        return this._config.valid;
    }

    #tu; // The last time when this collection was updated
    get tu() {
        return this.#tu;
    }

    #processed = false;
    get processed() {
        return this.#processed;
    }

    #processing = false;
    get processing() {
        return this.#processing;
    }

    // The ready promise;
    #ready = Promise.pending();
    get ready() {
        return this.#ready ? this.#ready.value : Promise.resolve();
    }

    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    // This method can be overridden
    async _initialise() {
    }

    #initialise = async (initialSpecs) => {
        await this._config.ready;
        // Initialise the item once its configuration is ready
        await this._initialise(initialSpecs);

        if (this.#destroyed) return;
        this._config.on('change', this.#update);
        this.#update();
    };

    /**
     * Config item constructor
     *
     * @param config {object} The object configuration property
     * @param initialSpecs {any} The initial specification used to invoke the _initialise method
     */
    constructor(config, initialSpecs) {
        if (!config) throw new Error('Invalid config parameter');
        super();
        this._config = config;
        this.#initialise(initialSpecs).catch(exc => console.error(exc.stack));
    }

    #first = true;

    #notify() {
        if (this.#first) return this.#first = false;
        this._events.emit('change');
        this._notify();
    };

    // This method can be overridden
    _notify() {
    }

    _request;

    // This method should be overridden to process the configuration, and also can be used
    // to alter the configuration of the items before creating the children
    async _processConfig(now) {
        void (now);
        return [...this._config.properties.values()];
    }

    async #process() {
        const now = this._request = Date.now();
        this.#tu = Date.now(); // The time updated

        if (!this._config.valid) {
            await this._processConfig(now);
            if (this._request !== request) return;
            this._notify();
            return;
        }

        this.#processed = false;
        this.#processing = false;
        this.#ready = this.#ready ? this.#ready : Promise.pending();

        let changed = await this._processConfig(now);
        if (this._request > now) return;
        changed = changed === undefined ? true : changed;

        this.#processing = false;
        this.#processed = true;
        (changed || this.#first) && this.#notify();

        this.#ready.resolve();
        this.#ready = undefined;
    }

    #update = () => this.#process().catch(exc => console.error(exc.stack));

    destroy() {
        if (this.#destroyed) throw new Error('Collection is already destroyed');
        this.#destroyed = true;
        this._request = Date.now();

        this._config.off('change', this.#update);
        this._events.removeAllListeners();
    }
}
