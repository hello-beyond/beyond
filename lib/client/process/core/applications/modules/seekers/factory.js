module.exports = class extends Map {
    #application;
    #seekers = new Map();

    /**
     * Seekers factory constructor
     *
     * @param application {object} The application object
     */
    constructor(application) {
        super();
        this.#application = application;
    }

    /**
     * Returns a seeker that is responsible to find the module
     *
     * @param consumer {object} The consumer that is requiring the seeker
     * @param resource {string} The identifier of the resource being required
     * @param distribution {object} The distribution specification
     * @return {object|undefined} The seeker of the resource
     */
    obtain(consumer, resource, distribution) {
        // Register the consumer that is requiring the resource
        const consumers = this.has(resource) ? super.get(resource) : new Set();
        this.set(resource, consumers);
        consumers.add(consumer);

        const key = `${resource}//${distribution.key}`;
        const seeker = this.#seekers.has(key) ? this.#seekers.get(key) :
            new (require('./seeker'))(this.#application, resource, distribution);
        this.#seekers.set(key, seeker);
        return seeker;
    }

    release(consumer, resource) {
        if (!this.has(resource)) {
            throw new Error(`There are no consumers registered for the specifier resource "${resource}"`);
        }

        const consumers = this.get(resource);
        if (!consumers.has(consumer)) {
            throw new Error('Consumer is not in the registry list');
        }

        consumers.delete(consumer);
        if (consumers.size) return;

        // There were no consumers left for the specified resource
        this.delete(resource);

        const seeker = this.#seekers.get(resource);
        this.#seekers.delete(resource);
        seeker.destroy();
    }
}
