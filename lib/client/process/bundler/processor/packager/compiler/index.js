const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc} = global.utils;
const Diagnostics = (require('./diagnostics'));

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

    get CompiledSource() {
        // This property must be overwritten to return the class that implements the source object
        return (...props) => void props;
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

    #diagnostics;
    get diagnostics() {
        return this.#diagnostics;
    }

    get valid() {
        return this.#diagnostics.valid;
    }

    #cache;
    #children = new (require('./children'))(this);
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

    constructor(packager) {
        super();
        this.#packager = packager;

        super.setup(new Map([['hash', {child: packager.processor.hash}]]));
        this.#cache = new (require('./cache'))(this);
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

        const diagnostics = new Diagnostics();
        const updated = {files: new Map(), extensions: new Map(), overwrites: new Map()};

        const done = () => {
            // Update the processed hash value
            const hash = this.children.get('hash').child;
            this.#processedHash = hash.value;

            this.#diagnostics = diagnostics;

            this.#files.clear();
            this.#extensions.clear();
            this.#overwrites.clear();
            updated.files.forEach((value, key) => this.#files.set(key, value));
            updated.extensions.forEach((value, key) => this.#extensions.set(key, value));
            updated.overwrites.forEach((value, key) => this.#overwrites.set(key, value));

            // Save the new compilation into cache
            this.#cache.save().catch(exc => console.log(exc.stack));
        }

        if (!this.#packager.processor.valid) {
            diagnostics.set({general: this.#packager.processor.errors});
            return done();
        }

        // Check for errors in the dependencies before trying to compile
        const dependencies = this.#children.dependencies;
        if (dependencies && !dependencies.valid) {
            diagnostics.set({general: dependencies.errors});
            return done();
        }

        await this._compile(updated, diagnostics, request);
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
        let {files, extensions, overwrites, diagnostics} = cached.data;

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
    }

    toJSON() {
        const {files, extensions, overwrites} = this;
        const diagnostics = this.diagnostics.toJSON();
        return {files: [...files], extensions: [...extensions], overwrites: [...overwrites], diagnostics};
    }
}
