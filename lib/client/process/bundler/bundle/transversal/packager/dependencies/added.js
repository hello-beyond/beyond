module.exports = class extends Map {
    #dependencies;

    constructor(dependencies) {
        super();
        this.#dependencies = dependencies;
    }

    add(resource, is) {
        is = is ? is : new Set(['import']);
        this.set(resource, is);
    }
}
