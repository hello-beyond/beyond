const {Worker} = require('worker_threads');
const path = require('path').join(__dirname, './worker.js');

module.exports = class {
    #worker;
    #promise;

    get processing() {
        return !!this.#promise;
    }

    #onMessage = message => {
        if (!this.#promise) throw new Error(`Worker received a message, but it's inactive`);
        if (message.type !== 'processed') throw new Error('Invalid message');

        const p = this.#promise;
        this.#promise = undefined;
        p.resolve(message.html);
    };

    #onError = error => console.log(`SSR processor error: `, error);

    constructor() {
        this.#worker = new Worker(path);
        this.#worker.on('message', this.#onMessage);
        this.#worker.on('error', this.#onError);
    }

    processUrl(start, bundles, url) {
        if (!start || !bundles || !url) throw new Error('Invalid parameters');

        this.#worker.postMessage({
            action: 'process-url',
            start,
            bundles: [...bundles],
            url
        });
    }

    render(page, dependencies) {
        if (!page || !dependencies) throw new Error('Invalid parameters');

        this.#worker.postMessage({
            action: 'render',
            page: page.code.inline,
            dependencies: [...dependencies]
        });
    }

    async process(action, ...params) {
        if (this.#promise) throw new Error('Worker is processing');
        this.#promise = Promise.pending();

        // Execute the action
        if (action === 'render') {
            this.render(...params);
        }
        else if (action === 'process-url') {
            this.processUrl(...params);
        }
        else {
            throw new Error('Invalid parameters');
        }

        // The response is sent by the promise when resolved
        return this.#promise.value;
    }
}
