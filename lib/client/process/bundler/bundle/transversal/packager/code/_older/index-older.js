const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.transversal.packager.code';
    }

    get id() {
        return this.#tp.transversal.name;
    }

    #tp;
    get tp() {
        return this.#tp;
    }

    #cache;

    #errors;
    get errors() {
        this.#process();
        return this.#errors;
    }

    #warnings;
    get warnings() {
        return this.#warnings ? this.#warnings : [];
    }

    get valid() {
        return this.processed && !this.errors.length;
    }

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
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

    constructor(tp, packagers) {
        super();
        this.#tp = tp;
        this.#cache = new (require('./cache'))(tp);
        this.#dependencies = new (require('./dependencies'))(this);
        this.#bundles = new (require('./bundles'))(this);

        const libraries = new (require('./processors/libraries/hash'))(tp);
        const modules = new (require('./processors/modules/hash'))(tp);
        super.setup(new Map([['libraries.hash', {child: libraries}], ['modules.hash', {child: modules}]]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        await this.#tp.initialise();

        const cached = await this.#cache.load();
        if (cached) {
            this.#dependencies.set(cached.dependencies);
            this.#bundles.set(cached.bundles);
            this.#errors = cached.errors && cached.errors.length ? cached.errors : undefined;
            this.#hashes = cached.hashes;
        }

        await super.initialise();
        this.#initialising = false;
    }

    #hashes;
    get hashes() {
        return this.#hashes;
    }

    _prepared(check) {
        if (this.#bundles.updated) return;

        // When the code was returned from cache, and the processors and imports were not registered as a child
        const tp = this.#tp;
        if (!this.children.has('libraries')) {
            const libraries = new (require('./processors/libraries/code'))(tp);
            const modules = new (require('./processors/modules/code'))(tp);
            const children = new Map([['libraries', {child: libraries}], ['modules', {child: modules}]]);
            this.children.register(children, false);

            if (!check(libraries) || !check(modules)) return false;
        }
    }

    _process() {
        if (this.#bundles.updated) return;
        this.#hashes = this.#sourcemap = this.#errors = undefined;
    }

    #process() {
        if (this.#sourcemap || this.#errors) return; // Already processed
        if (!this.processed) throw new Error('Processor is not ready. Wait for the .ready property before accessing its state.');

        let changed = false;
        if (!this.#bundles.updated) {
            this.#dependencies.process();
            this.#bundles.process();

            const hashes = this.#bundles.hashes;
            this.#hashes = {modules: hashes.modules, libraries: hashes.libraries};
            changed = true;
        }

        const save = () => this.#cache.save(this.#dependencies, this.#bundles, this.#errors, this.#bundles.hashes);

        if (!this.#bundles.valid) {
            this.#errors = this.#bundles.errors;
            changed && save();
            return;
        }

        const {errors, warnings, code, map} = this._generate();
        this.#warnings = warnings;
        this.#errors = errors ? errors : [];
        changed && save();

        if (errors && errors.length) return;

        this.#sourcemap = {code, map};
    }
}
