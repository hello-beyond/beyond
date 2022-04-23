const {equal} = global.utils;

module.exports = class extends require('../base') {
    get dp() {
        return 'bundler.bundle.packager.code.js';
    }

    #specs;
    get specs() {
        return this.#specs;
    }

    constructor(packager) {
        super('.js', packager);
        const specs = new (require('./specs'))(packager);
        super.setup(new Map([['specs', {child: specs}]]));
    }

    get updated() {
        if (!super.updated) return false;
        const specs = this.children.get('specs').child;
        return equal(specs.value, this.#specs);
    }

    _prepared(require) {
        if (this.updated) return;

        const prepared = super._prepared(require);
        if (typeof prepared === 'string' || (typeof prepared === 'boolean' && !prepared)) return prepared;
        if (!this.children.prepared) return;

        // When the code was returned from cache, and the processors and imports were not registered as a child
        if (!this.children.has('dependencies')) {
            const packager = this.packager;
            const children = new Map();
            children.set('dependencies', {child: packager.dependencies.code});
            children.set('imports', {child: packager.imports});
            this.children.register(children);
        }

        const dependencies = this.children.get('dependencies').child;
        const imports = this.children.get('imports').child;
        if (!require(dependencies) || !require(imports)) return;
        imports.forEach(i => require(i));
    }

    _update(hmr) {
        const specs = this.children.get('specs').child;
        this.#specs = specs.value;

        // Check if the dependencies are all valid
        const dependencies = this.children.get('dependencies').child;
        if (!dependencies.valid) return {errors: dependencies.errors};

        const packager = this.packager;
        const transversal = !!global.bundles.get(packager.bundle.name).Transversal;

        return require('./package')(packager, hmr, transversal, specs.value);
    }

    hydrate(cached) {
        super.hydrate(cached);
        this.#specs = cached.specs;
    }

    toJSON() {
        return Object.assign({specs: this.#specs}, super.toJSON());
    }
}
