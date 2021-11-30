const {ipc} = global.utils;
const workers = require('./workers');
const DynamicProcessor = global.utils.DynamicProcessor();
const CompiledSource = require('./compiled-source');
const Diagnostics = require('./diagnostics');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.tsc';
    }

    get id() {
        return this.#packager.id;
    }

    get is() {
        return 'tsc';
    }

    #packager;
    #files = new Map();
    #cache;

    get files() {
        return this.#files;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #diagnostics;
    get diagnostics() {
        return this.#diagnostics;
    }

    get valid() {
        return this.#diagnostics.valid;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-compilers',
            id: this.id
        });
    }

    constructor(packager) {
        super();

        this.#packager = packager;
        const {specs, dependencies, analyzer, options} = packager;
        this.waitToProcess = 300;  // Wait 300ms before processing after invalidation
        this.notifyOnFirst = true; // Notify a 'change' event when the first process is completed

        super.setup(new Map([
            ['dependencies', {child: dependencies.declarations}],
            ['analyzer', {child: analyzer}],
            ['options', {child: options}]
        ]));

        this.#cache = new (require('./cache'))(specs);
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        // Check if the compiler cache exists and if it is valid,
        // only if it is the first processing time (this.first, property inherited from DynamicProcessor)
        const cached = await this.#cache.load();
        if (cached) {
            const {compilation, hash} = cached;
            this.#processed = hash;
            this.#update(compilation);
        }

        await super.initialise();
        this.#initialising = false;
    }

    #update(compilation) {
        const analyzer = this.children.get('analyzer').child;

        this.#files.clear();
        this.#diagnostics = new Diagnostics(compilation.diagnostics);
        if (!this.#diagnostics.valid) return;

        // The files that were not received from the compilation
        // This is something that should never happen
        const missing = [];

        const files = compilation.output;

        // Check if all files were received from the compiler
        // Just for finding errors in development to find possible errors
        // Delete the cache to reproduce, as this code requires the analyzer to be ready
        analyzer.forEach(source => {
            if (!files || !files.has(source.file)) {
                missing.push(source.relative.file);
                return;
            }
            const compiled = files.get(source.file);
            this.#files.set(source.file, new CompiledSource('source', source, compiled));
        });

        if (missing.length) {
            const general = [];
            general.push(`Some files were not received from compilation: "${missing}".`);
            this.#diagnostics = new Diagnostics({general});
        }
    }

    // The value of the hash of the las processed code
    #processed = 0;

    async _process() {
        if (!this.#packager.valid) {
            const diagnostics = new Diagnostics({general: this.#packager.errors});
            return this.#update({diagnostics});
        }

        const dependencies = this.children.get('dependencies').child;
        const analyzer = this.children.get('analyzer').child;
        const options = this.children.get('options').child;

        // Check for errors in the dependencies before trying to compile
        if (!dependencies.valid) {
            const diagnostics = new Diagnostics({general: dependencies.errors});
            return this.#update({diagnostics});
        }

        this.#hash = require('./hash')(dependencies, analyzer, options);
        if (this.#processed === this.#hash) return; // Nothing to do as processor is up-to-date
        this.#processed = this.#hash;

        /**
         * Create the program and compile the sources
         */
        const {path} = analyzer;
        const compilation = await workers.process(path, dependencies, analyzer, options.value);

        // Update the results of the compilation
        this.#update(compilation);

        // Save the new compilation into cache
        this.#cache.save(compilation.raw, this.#hash).catch(exc => console.log(exc.stack));
    }
}
