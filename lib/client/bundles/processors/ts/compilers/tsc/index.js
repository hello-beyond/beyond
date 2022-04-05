module.exports = class extends global.ProcessorCompiler {
    get dp() {
        return 'ts.compiler';
    }

    get is() {
        return 'tsc';
    }

    #CompiledSource = require('../source');
    get CompiledSource() {
        return this.#CompiledSource;
    }

    get declarations() {
        return this.children.get('dependencies.declarations')?.child;
    }

    #tsBuildInfo;
    get tsBuildInfo() {
        return this.#tsBuildInfo;
    }

    #program;
    get program() {
        return this.#program;
    }

    constructor(packager) {
        super(packager, require('./children'));
        this.notifyOnFirst = true; // Notify a 'change' event when the first process is completed
    }

    _compile(updated, diagnostics) {
        this.#program = this.#program ? this.#program : new (require('./program'))(this);
        this.#tsBuildInfo = this.#program.emit(updated, diagnostics);
    }

    hydrate(cached) {
        this.#tsBuildInfo = cached.data.tsBuildInfo;
        super.hydrate(cached);
    }

    toJSON() {
        const json = super.toJSON();
        json.tsBuildInfo = this.#tsBuildInfo;
        return json;
    }
}
