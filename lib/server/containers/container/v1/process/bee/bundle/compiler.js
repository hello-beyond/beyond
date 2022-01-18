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

        const file = (() => {
            const {is, uri} = this.#bundle;

            const done = uri => require('path').join(process.cwd(), `${uri}.js`);

            // Check if resource is a transversal,
            // in which case, the pathname is just the name of the traversal
            if (is === 'transversal') return done(uri);

            // Check if it is an application package,
            // where the pathname does not include the /packages folder
            const pkg = this.#bundle.package;
            const path = uri.startsWith(`${pkg}/`) ? uri.substr(pkg.length) : `node_modules/${uri}`;
            return done(path);
        })();

        const compiled = new Module(this.#bundle.uri);
        compiled.require = this.#brequire.require;
        try {
            compiled._compile(this.#bundle.code, file);
            this.#compiled = compiled;
        }
        catch (exc) {
            this.#exc = exc;
            require('../log')(this.#bundle.application, {
                type: 'compiler.error',
                bundle: this.#bundle.id,
                exc: exc instanceof Error ? exc.stack : void 0
            });
        }
    }
}
