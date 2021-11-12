const ServiceEngineBase = require('../base');

new class extends ServiceEngineBase {
    #ws;

    #ready = Promise.pending();
    get ready() {
        return this.#ready.value;
    }

    #initialised = false;
    get initialised() {
        return this.#initialised;
    }

    async initialise(port) {
        if (this.#initialised) return;
        this.#initialised = true;

        const {config} = this;
        this.#ws = new (require('./ws'))(port, config);

        try {
            await this.#ws.initialise();
        }
        catch (exc) {
            console.error('exception', exc.stack);
            return;
        }

        this.#ready.resolve();
        super.initialise(port);
    }
}
