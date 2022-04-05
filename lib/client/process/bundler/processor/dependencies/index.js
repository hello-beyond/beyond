/**
 * Processor dependencies
 */
module.exports = class extends require('../../dependencies') {
    get dp() {
        return 'bundler.analyzer.dependencies';
    }

    get analyzer() {
        return this.container.analyzer;
    }

    constructor(processor, hash, Dependency, Propagator) {
        if (!processor.analyzer) throw new Error('Processor analyzer was expected');

        hash = hash ? hash : processor.analyzer.hash;
        Dependency = Dependency ? Dependency : require('./dependency');

        super(processor, hash, Dependency, Propagator);
    }

    _prepared(check) {
        if (this.updated) return;

        if (!this.children.has('analyzer')) {
            const {analyzer} = this.container;
            super.children.register(new Map([['analyzer', {child: analyzer}]]), false);
            if (!check(analyzer)) return false;
        }
    }

    _update() {
        const {files, overwrites, extensions} = this.analyzer;

        // Clean data of previously created dependencies
        this.forEach(dependency => dependency.clear());

        // Check for errors in the sources of the analyzer
        let errorsCount = 0;
        const validate = source => source.errors?.length && (errorsCount++);

        files.forEach(source => validate(source));
        overwrites.forEach(source => validate(source));
        extensions.forEach(source => validate(source));

        if (errorsCount) {
            return {errors: [`There are ${errorsCount} sources analyzed with errors`]};
        }

        // Process the dependencies
        const updated = new Map();
        const process = (source) => {
            source.dependencies.forEach((is, resource) => {
                const dependency = (() => {
                    if (updated.has(resource)) return updated.get(resource);
                    if (this.has(resource)) return this.get(resource);

                    return this._create(resource);
                })();

                dependency.sources.set(source.relative.file, source);
                is.forEach(type => dependency.is.add(type));

                updated.set(resource, dependency);
            });
        }

        files.forEach(source => process(source));
        overwrites.forEach(source => process(source));
        extensions.forEach(source => process(source));

        return {updated};
    }
}
