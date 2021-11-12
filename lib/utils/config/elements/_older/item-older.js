// noinspection JSPotentiallyInvalidUsageOfThis
module.exports = (Base = Nothing) => class extends Base {
     // @param initialSpecs {any} The initial specification used to invoke the _initialise method

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
