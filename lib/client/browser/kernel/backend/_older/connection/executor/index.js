module.exports = class {
    #applicationId;
    #bundles;
    #session;

    constructor(applicationId, bundles, session) {
        this.#applicationId = applicationId;
        this.#bundles = bundles;
        this.#session = session;
    }

    /**
     * Execute an action
     *
     * @param rq
     * @return {Promise<{response: (*)}|{error: module.exports.error}>}
     */
    async execute(rq) {
        const action = new (require('./action'))(rq);
        if (action.error) return {error: action.error};

        const {className, method} = action;
        await this.#bundles.load(`${action.module}/backend`);
        this.#bundles.compile();

        if (this.#bundles.error) {
            const {bundle, message} = this.#bundles.error;
            const error = bundle ? bundle.error : {message};
            return {error};
        }

        const bundle = this.#bundles.get(`${action.module}/backend`);
        if (!bundle.exports.has(className)) {
            return {error: `Class "${className}" is not implemented in the module "${rq.module}"`};
        }
        if (!bundle.exports.get(className).has(method)) {
            return {error: `Method "${method}" is not implemented in "${className}" class in module "${rq.module}"`};
        }

        const response = require('./execute')(action, bundle);
        return {response};
    }
}
