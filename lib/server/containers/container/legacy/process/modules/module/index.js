module.exports = class {
    #file;
    #service;
    #path;
    #id;
    #dirname;
    #errors;
    #actions;
    #ready;

    get path() {
        return this.#path;
    }

    get id() {
        return this.#id;
    }

    get dirname() {
        return this.#dirname;
    }

    get valid() {
        return this.#errors && !this.#errors.length;
    }

    constructor(file, service) {
        this.#file = file;
        this.#service = service;

        this.#path = file.relative.dirname
            .replace(/\\/g, '/')
            .replace(/\/$/, ''); // Remove trailing slash;

        this.#dirname = file.dirname;
    }

    async initialise() {
        if (this.#ready) return await this.#ready.value;
        this.#ready = Promise.pending();

        const config = new (require('./config'))(this, this.#file);
        await config.initialise();
        if (!config.valid) {
            this.#errors = config.errors;
            return;
        }

        const pathname = this.#path ? this.#path : 'main';
        const name = config.value?.name ? config.value.name : `unnamed/${pathname}`;
        this.#id = `${this.#service.package}/${name}`;

        this.#errors = [];
        try {
            this.#actions = new (require('./actions'))(this, config.value.server, this.#service);
        }
        catch (exc) {
            console.error(exc);
            this.#errors.push(exc.message);
        }

        this.#ready.resolve();
    }

    async execute(action, params, session) {
        await this.initialise();
        if (!this.valid) return;

        return this.#actions.execute(action, params, session);
    }
}