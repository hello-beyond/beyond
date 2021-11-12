const {ConfigCollection} = global.utils

/**
 * The collection of applications or libraries with beyond execution environment
 */
module.exports = class extends ConfigCollection {
    #is;
    get is() {
        return this.#is;
    }

    #dashboard; // Is is the dashboard instance or not?
    get dashboard() {
        return this.#dashboard;
    }

    _notify() {
        // ipc.events.emit('data-notification', {});
    }

    async _processConfig(config, request) {
        if (this.#is !== 'library') return await super._processConfig(config, request);

        // Includes beyond-local by default
        const libraries = [...config.items.values()];
        await require('./process-config').process(libraries);
        return libraries;
    }

    /**
     * Containers collection constructor
     *
     * @param is {string} Can be 'application', 'library' or 'dashboard' (for the compiled dashboard)
     * @param config {object} The applications or libraries configuration
     * @param dashboard {boolean} Is it the instance of the Beyond JS dashboard
     */
    constructor(is, config, dashboard) {
        if (!['application', 'library', 'dashboard'].includes(is)) throw new Error('Invalid parameters');

        super(config);
        this.#is = is;
        this.#dashboard = dashboard;
    }

    _createItem(config) {
        return new (require('./container'))(this.#is, config, this.#dashboard);
    }
}
