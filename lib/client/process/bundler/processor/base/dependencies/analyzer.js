module.exports = class extends require('./') {
    get dp() {
        return 'bundler.processor.dependencies.analyzer';
    }

    constructor(processor, Dependency, Propagator) {
        super(processor, Dependency, Propagator);

        const {analyzer} = processor;
        super.setup(new Map([['analyzer', {child: analyzer}]]));
    }

    _update() {
        // Clean data of previously created dependencies
        this.forEach(dependency => dependency.clear());

        const {files, overwrites, extensions} = this.processor.analyzer;

        // Check for errors in the sources of the analyzer
        const errors = (() => {
            let count = 0;
            const validate = source => source.errors?.length && (count++);

            files.forEach(source => validate(source));
            overwrites.forEach(source => validate(source));
            extensions.forEach(source => validate(source));

            return count ? [`There are ${count} sources analyzed with errors`] : void 0;
        })();
        if (errors) return {errors};

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
