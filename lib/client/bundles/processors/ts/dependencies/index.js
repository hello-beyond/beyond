const {ipc} = global.utils;

module.exports = class extends global.Dependencies {
    get dp() {
        return 'ts-processor.dependencies';
    }

    #processor;

    /**
     * Processor packager dependencies constructor
     *
     * @param processor {object} The processor packager
     */
    constructor(processor) {
        super(processor, require('./dependency'));
        this.#processor = processor;
    }

    _prepared(check) {
        if (this.updated) return;

        if (!this.children.has('analyzer')) {
            const {analyzer} = this.packager;
            super.children.register(new Map([['analyzer', {child: analyzer}]]), false);
            if (!check(analyzer)) return false;
        }
    }

    _processUpdatedItems() {
        const errors = [], updated = new Map();
        this.forEach(dependency => dependency.sources.clear());

        const analyzer = this.children.get('analyzer').child;

        const setDependency = (resource, is, source) => {
            if (resource === 'beyond_context') return;

            const setDependencyInfo = dependency => {
                dependency.is.add(is);
                source && dependency.sources.set(source.file, source);
            }

            if (updated.has(resource)) {
                setDependencyInfo(updated.get(resource));
                return;
            }
            if (this.has(resource)) {
                const dependency = this.get(resource);
                updated.set(resource, dependency);
                setDependencyInfo(dependency);
                return;
            }

            const dependency = this._create(resource);
            updated.set(resource, dependency);
            setDependencyInfo(dependency);
        };

        analyzer.forEach(source => source.dependencies.forEach((info, resource) =>
            setDependency(resource, info.is, source)));

        // All 'ts' bundles depend on beyond/core
        const core = '@beyond-js/kernel/core/ts';
        const {bundle} = this.packager.specs;
        bundle.resource !== core && setDependency(core, 'import');

        return {updated, errors};
    }

    _notify() {
        let id = this.#processor.id.split('//');
        id = id.slice(0, id.length - 2).join('//');

        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'processors-dependencies',
            filter: {processor: id}
        });
    }
}
