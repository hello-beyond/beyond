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
     * @param wrapper {object} The seeker wrapper that is requiring the seeker
     * @return {object} The seeker of the resource
     */
    obtain(wrapper) {
        const {resource, distribution} = wrapper;

        // Register the wrapper that is requiring the resource
        const wrappers = this.has(resource) ? super.get(resource) : new Set();
        this.set(resource, wrappers);
        wrappers.add(wrapper);

        const key = `${resource}//${distribution.key}`;
        const seeker = this.#seekers.has(key) ? this.#seekers.get(key) :
            new (require('./seeker'))(this.#application, resource, distribution);
        this.#seekers.set(key, seeker);
        return seeker;
    }

    release(wrapper) {
        const {resource, distribution} = wrapper;

        if (!this.has(resource)) {
            throw new Error(`There are no wrappers registered for the specifier resource "${resource}"`);
        }

        const wrappers = this.get(resource);
        if (!wrappers.has(wrapper)) {
            throw new Error('Consumer is not in the registry list');
        }

        wrappers.delete(wrapper);
        if (wrappers.size) return;

        // There were no wrappers left for the specified resource
        this.delete(resource);

        const key = `${resource}//${distribution.key}`;
        const seeker = this.#seekers.get(key);
        this.#seekers.delete(resource);
        seeker.destroy();
    }
}
