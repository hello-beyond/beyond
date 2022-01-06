const DynamicProcessor = global.utils.DynamicProcessor();
const ts = require('typescript');
const Diagnostics = (require('./diagnostics'));
const Diagnostic = (require('../diagnostic'));

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'ts-processor.transpiler';
    }

    get is() {
        return 'transpiler';
    }

    #packager;
    #files = new Map();
    #cache;

    get files() {
        this.#process();
        return this.#files;
    }

    #hash;
    get hash() {
        this.#process();
        return this.#hash;
    }

    #diagnostics;
    get diagnostics() {
        this.#process();
        return this.#diagnostics;
    }

    constructor(packager) {
        super();

        this.#packager = packager;
        const {specs, analyzer, options} = packager;
        super.setup(new Map([
            ['analyzer', {child: analyzer, events: ['item.change']}],
            ['options', {child: options}]
        ]))

        this.#cache = new (require('./cache'))(specs);
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        if (cached) {
            const {files, diagnostics} = cached;
            files.forEach(source => this.#files.set(source.file, source));
            this.#diagnostics = new (require('./diagnostics'))(diagnostics);
        }

        await super.initialise();
        this.#initialising = false;
    }

    #processed = false;

    #process() {
        if (!this.#packager.valid) {
            this.#diagnostics = new Diagnostics({general: this.#packager.errors});
            this.#files.clear();
            return;
        }

        // this.processed is the dynamic processor property, this.#processed is the local flag to know if it is up-to-date
        if (!this.processed) throw new Error('Processor is not ready. Wait for .ready be completed.');
        if (this.#processed) return;
        this.#processed = true;

        const analyzer = this.children.get('analyzer').child;
        const options = this.children.get('options').child;

        this.#hash = require('./hash')(analyzer, options);

        const updated = new Map();
        const diagnostics = new Map();
        let changed = false;

        analyzer.forEach(source => {
            const {file, hash} = source;
            const relative = source.relative.file;

            // Check if source has been previously processed
            if (this.#files.has(file) && hash === this.#files.get(source.file).hash) {
                updated.set(file, this.#files.get(file));
                this.#diagnostics.files.has(relative) && diagnostics.set(relative, this.#diagnostics.files.get(relative));
                return;
            }

            // Process the source
            changed = true;
            const ovalue = {
                compilerOptions: options.value,
                fileName: source.relative.file,
                reportDiagnostics: true
            };

            // Transpile the code of the source file
            let transpiled = {};
            try {
                transpiled = ts.transpileModule(source.content, ovalue);
            }
            catch (exc) {
                diagnostics.set(source.relative.file, [{file: source.file, message: 'Error transpiling file'}]);
            }

            // Set the diagnostics data if exists
            transpiled.diagnostics?.forEach(diagnostic => {
                // The diagnostics are set with the relative file as the key
                const relative = source.relative.file;
                const array = diagnostics.has(relative) ? diagnostics.get(relative) : [];
                array.push(new Diagnostic(diagnostic));
                diagnostics.set(relative, array);
            });

            // Set the transpiled source
            updated.set(file, new (require('./transpiled-source'))(source, transpiled));
        });

        this.#diagnostics = new Diagnostics({files: diagnostics});

        this.#files.clear();
        updated.forEach((value, key) => this.#files.set(key, value));

        // Save the interfaces into cache
        changed && this.#cache.save(this.#files, this.#diagnostics).catch(exc => console.log(exc.stack));
    }

    _process() {
        this.#processed = false;
    }
}
