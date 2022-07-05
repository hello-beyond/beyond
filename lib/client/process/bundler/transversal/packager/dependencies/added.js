module.exports = class extends Map {
    #dependencies;

    constructor(dependencies) {
        super();
        this.#dependencies = dependencies;
        this.set('@beyond-js/kernel/bundle', new Set(['import']));
        this.set('@beyond-js/kernel/transversals', new Set(['import']));
    }

    add(resource, is) {
        is = is ? is : new Set(['import']);
        this.set(resource, is);
    }
}
