module.exports = class extends Map {
    #dependencies;

    constructor(dependencies) {
        super();
        this.#dependencies = dependencies;
    }

    add(resource, is) {
        is = is ? is : new Set(['import']);

        const dependency = this.#dependencies.create(resource);
        is.forEach(type => dependency.is.add(type));
        this.set(resource, dependency);
    }
}
