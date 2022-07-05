module.exports = class extends Map {
    #dependencies;

    constructor(dependencies) {
        super();
        this.#dependencies = dependencies;

        // All bundles depends on @beyond-js/kernel/bundle, except itself
        dependencies.bp.bundle.resource !== '@beyond-js/kernel/bundle' &&
        this.add('@beyond-js/kernel/bundle');
    }

    add(resource, is) {
        is = is ? is : new Set(['import']);
        this.set(resource, is);
    }
}
