module.exports = new class {
    #workers = [];
    #queue = [];

    constructor() {
        // Create as many workers as CPUs
        const os = require('os');
        os.cpus().forEach(() => this.#workers.push(new (require('./worker'))()));
    }

    #next = () => {
        if (!this.#queue.length) return;
        const info = this.#queue.shift();
        const free = this.#workers.find(worker => !worker.processing);
        this.#execute(free, info);
    };

    #execute = (worker, info) => worker.process(...info.params)
        .then(response => {
            info.promise.resolve(response);
            this.#next();
        })
        .catch(exc => info.promise.reject(exc));

    process(...params) {
        if (!['render', 'process-url'].includes(params[0])) throw new Error(`Invalid parameters`);

        const promise = Promise.pending();
        const free = this.#workers.find(worker => !worker.processing);

        const info = {promise: promise, params: [...params]};
        free ? this.#execute(free, info) : this.#queue.push(info);
        return promise.value;
    }
}
