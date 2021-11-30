const Module = require('module');

module.exports = class {
    #bundle;
    #brequire;
    #compiled;

    #exc;
    get exc() {
        return this.#exc;
    }

    get exports() {
        return this.#exc ? void 0 : this.#compiled.exports;
    }

    constructor(bundle, brequire) {
        this.#bundle = bundle;
        this.#brequire = brequire;
    }

    compile() {
        if (this.#compiled) throw new Error('Bundle already compiled');

        const compiled = new Module(this.#bundle.uri);
        compiled.require = this.#brequire.require;
        try {
            compiled._compile(this.#bundle.code, `/node_modules/${this.#bundle.uri}.js`);
            this.#compiled = compiled;
        }
        catch (exc) {
            this.#exc = exc;
            require('../log')(this.#bundle.application, {
                type: 'compiler.error',
                bundle: this.#bundle.id,
                exc: exc.stack
            });
        }
    }
}
