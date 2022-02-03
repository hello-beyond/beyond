const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.analyzer';
    }

    get AnalyzedSource() {
        // This property must be overwritten
        return (...props) => void props;
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    #cache;

    #hash;
    get hash() {
        return this.#hash;
    }

    #files = new Map();
    get files() {
        return this.#files;
    }

    #extensions = new Map();
    get extensions() {
        return this.#extensions;
    }

    #overwrites = new Map();
    get overwrites() {
        return this.#overwrites;
    }

    constructor(processor) {
        super();
        this.#processor = processor;
        this.#hash = new (require('./hash'))(processor);
        this.#cache = new (require('./cache'))(this);

        super.setup(new Map([['hash', {child: this.#hash}]]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this.#cache.load();
        cached && this.hydrate(cached);

        await super.initialise();
        this.#initialising = false;
    }

    _analyze(source) {
        void (source);
        throw new Error('Method must be overridden');
    }

    _finalize() {
        throw new Error('Method must be overridden');
    }

    _process() {
        const updated = {files: new Map(), extensions: new Map(), overwrites: new Map()};
        const process = (sources, is) => sources.forEach(source => {
            const {file} = source;

            if (this[is].has(file) && this[is].get(file).hash === source.hash) {
                updated[is].set(file, this[is].get(file));
                return;
            }

            const analyzed = this._analyze(source);
            if (!analyzed) return;

            updated[is].set(file, analyzed);
        });

        const {files, overwrites, extensions} = this.#processor.sources;
        process(files, 'files');
        process(extensions, 'extensions');
        overwrites && process(overwrites, 'overwrites');

        this.files.clear();
        this.extensions.clear();
        this.overwrites.clear();
        updated.files.forEach((value, key) => this.files.set(key, value));
        updated.extensions.forEach((value, key) => this.extensions.set(key, value));
        updated.overwrites.forEach((value, key) => this.overwrites.set(key, value));

        this._finalize();

        // Save the interfaces into cache
        this.#cache.save().catch(exc => console.log(exc.stack));
    }

    hydrate(cached) {
        const hydrate = (cached, is) => {
            const source = new this.AnalyzedSource(this.#processor, is);
            source.hydrate(cached);
            return source;
        }

        // Convert raw data object into source objects
        let {files, overwrites, extensions} = cached.data;

        files = new Map(files);
        files.forEach((cached, key) => files.set(key, hydrate(cached, 'source')));
        files.forEach(source => this.#files.set(source.file, source));

        extensions = new Map(extensions);
        extensions.forEach((cached, key) => extensions.set(key, hydrate(cached, 'extension')));
        extensions.forEach(source => this.#extensions.set(source.file, source));

        overwrites = new Map(overwrites);
        overwrites.forEach((cached, key) => overwrites.set(key, hydrate(cached, 'overwrite')));
        overwrites.forEach(source => this.#overwrites.set(source.file, source));
    }

    toJSON() {
        return {files: [...this.files], extensions: [...this.extensions], overwrites: [...this.overwrites]};
    }
}
