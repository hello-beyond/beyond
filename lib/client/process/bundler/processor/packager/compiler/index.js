const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc} = global.utils;
const Diagnostics = (require('../../diagnostics'));
const Meta = (require('./meta'));

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'packager.compiler';
    }

    get id() {
        return this.#packager.id;
    }

    #packager;
    get packager() {
        return this.#packager;
    }

    get dependencies() {
        return this.#packager.processor.dependencies;
    }

    get specs() {
        return this.#packager.processor.specs;
    }

    #CompiledSource = require('../../source/compiled');
    get CompiledSource() {
        return this.#CompiledSource;
    }

    get analyzer() {
        return this.#children.analyzer;
    }

    get options() {
        return this.#children.options;
    }

    get sources() {
        return {
            files: this.#children.files,
            extensions: this.#children.extensions,
            overwrites: this.#children.overwrites
        };
    }

    get extended() {
        return this.#children.extended;
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

    #meta;
    get meta() {
        return this.#meta;
    }

    #diagnostics;
    get diagnostics() {
        return this.#diagnostics;
    }

    get valid() {
        return this.#diagnostics.valid;
    }

    _cache;
    #children;
    #processedHash;

    get path() {
        const {files} = this.#packager.sources;
        return files.path;
    }

    _notify() {
        let id = this.id.split('//');
        id = id.slice(0, id.length - 2).join('//');

        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-compilers',
            id: id
        });
    }

    constructor(packager, Children) {
        super();
        this.#packager = packager;

        Children = Children ? Children : require('./children');
        this.#children = new Children(this);
        this._cache = new (require('./cache'))(this);

        super.setup(new Map([['hash', {child: packager.processor.hash}]]));
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        const cached = await this._cache.load();

        // Allow the hydrate method to by async.
        // (The sass processor requires the hydrate method to be async)
        cached && await this.hydrate(cached);

        await super.initialise();
        this.#initialising = false;
    }

    get updated() {
        const hash = this.children.get('hash').child;
        return this.#processedHash === hash.value;
    }

    _prepared(check) {
        if (this.updated) return;

        // When the processor is updated, the data is taken from the cache, otherwise the children must be set.
        this.#children.dispose(check);
    }

    async _process(request) {
        if (this.updated) return false;

        const meta = new Meta();
        const diagnostics = new Diagnostics();
        const updated = {files: new Map(), extensions: new Map(), overwrites: new Map()};

        const done = () => {
            // Update the processed hash value
            const hash = this.children.get('hash').child;
            this.#processedHash = hash.value;

            this.#meta = meta;
            this.#diagnostics = diagnostics;

            this.#files.clear();
            this.#extensions.clear();
            this.#overwrites.clear();
            updated.files.forEach((value, key) => this.#files.set(key, value));
            updated.extensions.forEach((value, key) => this.#extensions.set(key, value));
            updated.overwrites.forEach((value, key) => this.#overwrites.set(key, value));

            // Save the new compilation into cache
            this._cache.save().catch(exc => console.log(exc.stack));
        }

        if (!this.#packager.processor.valid) {
            diagnostics.set({general: this.#packager.processor.errors});
            return done();
        }

        if (this.analyzer && !this.analyzer.valid) {
            diagnostics.set(this.analyzer.diagnostics);
            return done();
        }

        // Check for errors in the dependencies before trying to compile
        const dependencies = this.#children.dependencies;
        if (dependencies && !dependencies.valid) {
            diagnostics.set({general: dependencies.errors});
            return done();
        }

        await this._compile(updated, diagnostics, meta, request);
        if (request !== this._request) return;

        done();
    }

    // Hydrate from cache
    hydrate(cached) {
        this.#processedHash = cached.hash;

        const hydrate = (is, cached) => {
            const source = new this.CompiledSource(this.#packager.processor, is);
            source.hydrate(cached);
            return source;
        }

        // Convert raw data object into source objects
        let {files, extensions, overwrites, diagnostics, meta} = cached.data;

        files = new Map(files);
        files.forEach((cached, key) => files.set(key, hydrate('source', cached)));
        files.forEach((source, key) => this.#files.set(key, source));

        extensions = new Map(extensions);
        extensions.forEach((cached, key) => extensions.set(key, hydrate('source', cached)));
        extensions.forEach((source, key) => this.#extensions.set(key, source));

        overwrites = new Map(overwrites);
        overwrites.forEach((cached, key) => overwrites.set(key, hydrate('overwrite', cached)));
        overwrites.forEach((source, key) => this.#overwrites.set(key, source));

        this.#diagnostics = new Diagnostics();
        this.#diagnostics.hydrate(diagnostics);

        this.#meta = new Meta();
        this.#meta.hydrate(meta);
    }

    toJSON() {
        const {files, extensions, overwrites} = this;
        const diagnostics = this.diagnostics.toJSON();
        const meta = this.meta;

        return {
            files: [...files],
            extensions: [...extensions],
            overwrites: [...overwrites],
            diagnostics,
            meta
        };
    }
}
