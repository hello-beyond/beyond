module.exports = class extends Map {
    #property;
    #destroyed = false;
    get destroyed() {
        return this.#destroyed;
    }

    #initialise = branchesSpecs => branchesSpecs.forEach((type, branch) => {
        if (!branch.startsWith(`${this.#property.branch}/`)) return;
        const split = branch.substr(this.#property.branch.length + 1).split('/');
        if (split.length !== 1) return;
        const child = split[0];

        // Variable type can be 'object' or 'array'
        const property = new (require(`../${type}`))(undefined, undefined, branch, this.#property);

        this.set(child, property);
    });

    constructor(property) {
        super();
        this.#property = property;
        this.#initialise(this.#property.branchesSpecs);
    }

    #request;

    async update(request) {
        if (this.#destroyed) throw new Error('Properties are destroyed');
        this.#request = request;
        const {value} = this.#property;

        if (value && (typeof value !== 'object' || value instanceof Array)) {
            console.log('Property value is invalid:', value);
            throw new Error(`Error on configuration file: "${this.#property.path}".\n` +
                `Properties of branch "${this.#property.branch}" cannot be updated. ` +
                `Its parent value should be an "object", ` +
                `however it is an "${value instanceof Array ? 'array' : typeof value}"`);
        }

        // Update the properties
        for (const [branch, property] of this) {
            const child = branch.split('/').pop();
            await property.process(value ? value[child] : undefined);
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
