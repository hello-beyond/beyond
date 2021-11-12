module.exports = class {
    #error;
    get error() {
        return this.#error;
    }

    #rq;

    get id() {
        return this.#rq.id;
    }

    get module() {
        return this.#rq.module;
    }

    #className;
    get className() {
        return this.#className;
    }

    #method;
    get method() {
        return this.#method;
    }

    get params() {
        return this.#rq.params;
    }

    constructor(rq) {
        if (!rq.id) {
            this.#error = 'Action id not set';
            return;
        }
        else if (typeof rq.module !== 'string') {
            this.#error = 'Module id is invalid or not set';
            return;
        }
        else if (typeof rq.action !== 'string' || !rq.action) {
            this.#error = 'Action is invalid or not set';
            return;
        }
        else if (rq.params !== undefined && !(rq.params instanceof Array)) {
            this.#error = 'Invalid parameters';
            return;
        }

        // The first element is the relative file (without its extension) where the actions class is implemented
        const [, className, method] = rq.action.split('//');
        if (!className || !method) {
            this.#error = `Invalid class "${className}" or method "${method}" specification`;
            return;
        }
        this.#className = className;
        this.#method = method;

        this.#rq = rq;
    }
}
