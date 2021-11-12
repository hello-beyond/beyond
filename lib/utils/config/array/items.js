module.exports = class extends Map {
    #property;
    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    constructor(property) {
        super();
        this.#property = property;
    }

    #request;

    async update(request) {
        if (this.#destroyed) throw new Error('Properties are destroyed');
        this.#request = request;
        const {value: v, branch} = this.#property;
        const value = v ? v : [];

        if (value && !(value instanceof Array)) {
            throw new Error(`Items of branch "${this.#property.branch}" cannot be updated. ` +
                `Its parent value should be an "array", however it is "${typeof value}"`);
        }

        const updated = new Map(), items = new Map();
        for (const item of value) {
            const path = typeof item === 'string' ? item : item.path;
            if (!path) continue;

            const property = this.has(path) ? this.get(path) :
                new (require('../object'))(undefined, undefined, `${branch}/children`, this.#property);

            items.set(path, item);
            updated.set(path, property);
        }

        // Destroy unused properties
        this.forEach((property, path) => !updated.has(path) && property.destroy());

        // Copy the updated properties
        this.clear();
        updated.forEach((value, key) => this.set(key, value));

        // Process the properties
        for (const [path, property] of this) {
            const item = items.get(path);
            await property.process(item);
            if (this.destroyed || this.#request !== request) return;
        }
    }

    destroy() {
        if (this.#destroyed) throw new Error('Properties already destroyed');
        this.#destroyed = true;

        this.forEach(property => property.destroy());
        super.clear();
    }
}
