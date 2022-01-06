const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.packager.code';
    }

    get id() {
        return this.#packager.id;
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    #hash;
    #cache;

    #specs;
    get specs() {
        return this.#specs;
    }

    #errors;
    get errors() {
        this.#process();
        return this.#errors ? this.#errors : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    #sourcemap;

    get code() {
        this.#process();
        return this.#sourcemap?.code;
    }

    get map() {
        this.#process();
        return this.#sourcemap?.map;
    }

    constructor(packager, bundle) {
        super();
        this.#packager = packager;
        this.#cache = new (require('./cache'))(packager);

        const specs = new (require('./specs'))(bundle);

        super.setup(new Map([
            ['hash', {child: packager.hash}],
            ['specs', {child: specs}]
        ]));
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
            this.#sourcemap = cached.sourcemap;
            this.#specs = cached.specs;
            this.#errors = cached.errors;
            this.#hash = cached.hash;
        }
        await this.#packager.initialise();
        await super.initialise();
        this.#initialising = false;
    }

    #processed = () => {
        const hash = this.children.get('hash').child;
        const specs = this.children.get('specs').child;
        return (hash.value === this.#hash) && equal(specs.value, this.#specs);
    }

    _prepared(check) {
        if (this.#processed()) return;

        // When the code was returned from cache, and the processors and imports were not registered as a child
        if (!this.children.has('processors')) {
            const packager = this.#packager;
            const children = new Map();
            children.set('processors', {child: packager.processors, events: ['code.initialised', 'code.change']});
            children.set('dependencies', {child: packager.dependencies.code});
            children.set('imports', {child: packager.imports, events: ['item.initialised', 'item.change']});
            this.children.register(children, false);
        }

        const processors = this.children.get('processors').child;
        const dependencies = this.children.get('dependencies').child;
        const imports = this.children.get('imports').child;
        if (!check(dependencies) || !check(processors) || !check(imports)) return false;
        processors.forEach(({code}) => check(code));
        imports.forEach(i => check(i));
    }

    _process() {
        if (this.#processed() && !this.#sourcemap && !this.#errors) {
            throw new Error('Sourcemap or errors should be defined');
        }
        if (this.#processed()) return false;
        this.#hash = this.#sourcemap = this.#errors = undefined;
    }

    #process() {
        if (this.#sourcemap || this.#errors) return; // Already processed
        if (!this.processed) {
            throw new Error('Processor is not ready. Wait for the .ready property before accessing its state.');
        }

        const hash = this.children.get('hash').child.value;
        const dependencies = this.children.get('dependencies').child;
        const processors = this.children.get('processors').child;
        const specs = this.children.get('specs').child;

        const done = ({sourcemap, errors}) => {
            this.#sourcemap = sourcemap;
            this.#errors = errors ? errors : [];
            this.#hash = hash;
            this.#specs = specs.value;
            this.#cache.save(this.#sourcemap, this.#specs, this.#errors, hash);
        };

        if (!processors.size) return done({});

        // Check if any of the processors is not in a valid state
        let errors = [];
        for (const [name, {code}] of processors) {
            if (code.valid) continue;
            errors.push(`Processor ${name} has been compiled with errors.`);
        }
        if (errors.length) return done({errors});

        // Check if the dependencies are all valid
        if (!dependencies.valid) {
            return done({errors: dependencies.errors});
        }

        // Process the packager code package
        const packager = this.#packager;
        const transversal = !!global.bundles.get(packager.bundle.name).Transversal;
        const processed = require('./package')(packager, transversal, specs.value);

        let code, map;
        ({code, map, errors} = processed);
        done({sourcemap: {code, map}, errors});
    }
}
