const Dependencies = require('../../../../dependencies');

module.exports = class extends Dependencies {
    get dp() {
        return 'bundler.transversal.dependencies';
    }

    // The packagers of the bundles of the transversal
    #packagers;
    #added;

    add(resource, is) {
        this.#added.add(resource, is);
    }

    constructor(packager, packagers) {
        super(packager);
        this.#packagers = packagers;
        this.#added = new (require('./added'))(this);
    }

    _prepared(check) {
        if (this.updated) return;

        if (!this.children.has('packagers')) {
            const events = ['dependencies.initialised', 'dependencies.change',
                'dependency.initialised', 'dependency.change',];
            this.setup(new Map([['packagers', {child: this.#packagers, events}]]));
            if (!check(this.#packagers)) return false;
        }

        this.#packagers.forEach(({dependencies}) => {
            dependencies && check(dependencies) && dependencies.forEach(dependency => check(dependency))
        });
    }

    _processUpdatedItems() {
        const errors = [], updated = new Map();

        this.#added.forEach((is, resource) => {
            const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
            is.forEach(type => dependency.is.add(type));
            updated.set(resource, dependency);
        });

        const packagers = this.children.get('packagers').child;
        packagers.forEach(({dependencies: d}) => d?.forEach(({resource, is}) => {
            // Exclude the imports that refers to bundles that are part of the actual transversal
            if (resource.endsWith(`/${this.packager.transversal.name}`)) return;

            const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
            is.forEach(type => dependency.is.add(type));
            updated.set(resource, dependency);
        }));

        return {errors, updated};
    }
}
