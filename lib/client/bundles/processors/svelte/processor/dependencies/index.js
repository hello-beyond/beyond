module.exports = class extends global.ProcessorDependencies {
    get dp() {
        return 'svelte.dependencies';
    }

    _update() {
        const errors = [], updated = new Map();

        const add = resource => {
            if (this.has(resource)) return;

            const dependency = this._create(resource);
            dependency.is.add('import');
            updated.set(resource, dependency);
        };
        add('svelte/internal');

        return {updated, errors};
    }
}
