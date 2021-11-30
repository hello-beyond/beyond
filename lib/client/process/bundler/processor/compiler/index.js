const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.compiler';
    }

    #processor;
    #files = new Map();
    get files() {
        return this.#files;
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

    get path() {
        const files = this.children.get('files').child;
        return files.path;
    }

    constructor(processor) {
        super();
        this.#processor = processor;
        const {files, overwrites} = processor.sources;

        const children = new Map();
        const subscriptions = ['item.initialised', 'item.change'];
        children.set('files', {child: files, events: subscriptions});
        overwrites && children.set('overwrites', {child: overwrites, events: subscriptions});
        super.setup(children);
    }

    _prepared(check) {
        const files = this.children.get('files').child;
        const overwrites = this.children.has('overwrites') ? this.children.get('overwrites').child : undefined;
        files.forEach(source => check(source));
        overwrites && overwrites.forEach(source => check(source));
    }

    _process() {
        const files = this.children.get('files').child;
        const overwrites = this.children.has('overwrites') ? this.children.get('overwrites').child : void 0;

        const updated = {files: new Map(), overwrites: new Map()};
        const diagnostics = {files: new Map(), overwrites: new Map()};

        const processSources = (sources, is) => sources.forEach(source => {
            const file = source.relative.file;

            let code;
            if (this[is].has(file) && this[is].get(file).hash === source.hash) {
                code = this[is].get(file);
                diagnostics[is].has(file) && diagnostics[is].set(file, this.#diagnostics[is].get(file));
            }
            else {
                try {
                    code = JSON.parse(source.content);
                }
                catch (exc) {
                    diagnostics[is].set(file, [{message: exc.message}]);
                }
            }

            updated[is].set(file, new (require('./compiled-source'))(this.#specs, is, source, code));
        });

        processSources(files, 'files');
        overwrites && processSources(overwrites, 'overwrites');

        this.#files.clear();
        this.#overwrites.clear();
        updated.files.forEach((value, key) => this.#files.set(key, value));
        updated.overwrites.forEach((value, key) => this.#overwrites.set(key, value));

        this.#diagnostics = new (require('./diagnostics'))(diagnostics);
        if (!this.#diagnostics.valid) return;

        const merged = {};
        this.files.forEach(compiled => require('./merge')(merged, compiled.code));
        this.overwrites.forEach(compiled => require('./merge')(merged, compiled.code));
        this.#code = merged;
    }
}
