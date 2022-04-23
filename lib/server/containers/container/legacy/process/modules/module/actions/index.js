const {fs} = global.utils;

module.exports = class {
    #module;
    #config;
    #service;
    #actions;
    #promise;
    #errors;

    get valid() {
        return this.#errors && !this.#errors.length;
    }

    constructor(module, config, service) {
        this.#module = module;
        this.#config = config;
        this.#service = service;
    }

    async #initialise() {
        if (this.#promise) return await this.#promise.value;
        this.#promise = Promise.pending();

        this.#errors = [];
        const config = this.#config;
        if (typeof config !== 'string' || !config) return;

        const path = require('path').resolve(this.#module.dirname, config);

        // Check if path exists
        if (!await fs.exists(path) || !((await fs.stat(path)).isDirectory())) {
            this.#errors.push(`Server configuration path "${path}" not found`);
            return;
        }

        try {
            this.#actions = new (require(path))(this.#service.core.instance);
        }
        catch (exc) {
            this.#actions = undefined;
            this.#errors.push(`Error requiring module actions backend ${exc.message}`);
            console.error(exc.stack);
        }

        this.#promise.resolve();
    }

    async execute(action, params, session) {
        await this.#initialise();

        if (typeof this.#actions !== 'object')
            throw new global.errors.StandardError(`Module "${this.#module.id}" does not have a server implementation`);

        // Find the method for this action
        action = action.startsWith('/') ? action.substr(1) : action;
        action = action.split('/');

        let method = this.#actions;

        for (let property of action) {
            if (!method.hasOwnProperty(property) || typeof method !== 'object') {
                method = undefined;
                break;
            }
            method = method[property];
        }

        if (typeof method !== 'function') {
            throw new global.errors.StandardError(`Action "${action.join('/')}" not found`);
        }

        // Execute the action
        params = typeof params === 'object' ? params : {};
        return await method(params, session);
    }
}
