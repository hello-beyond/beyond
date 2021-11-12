const Module = require('module');
const {SourceMap} = Module;

module.exports = class {
    #bundles;

    #is;
    get is() {
        return this.#is;
    }

    #id;
    get id() {
        return this.#id;
    }

    #code;
    get code() {
        return this.#code;
    }

    #map;
    get map() {
        return this.#map;
    }

    #error;
    get error() {
        return this.#error;
    }

    #compiled;
    get compiled() {
        return this.#compiled;
    }

    // Node js require overridden function
    #brequire = dependency => {
        if (dependency.startsWith('.')) {
            throw new Error('Relative requires should never be called by BeyondJS bundles in a BEE environment');
        }

        if (dependency && this.#bundles.has(dependency)) {
            const bundle = this.#bundles.get(dependency);

            !bundle.compiled && bundle.compile();
            if (bundle.error) {
                throw new Error(`Dependency bundle "${dependency}" has been compiled with errors`);
            }
            return bundle.compiled.exports;
        }

        // At this point, the required module is not a local BeyondJS bundle,
        // but a module of a package installed in the node_modules folder
        let required;
        try {
            required = require(dependency);
        }
        catch (exc) {
            console.log(`Required module "${dependency}" not found`, exc.stack);
            return;
        }
        return required;
    }

    /**
     * NodeJS Module object constructor
     *
     * @param bundles {object} The collection of bundles
     * @param is {string} Can be 'transversal' or 'bundle'
     * @param id {string} The bundle's id
     * @param code {string} The bundle's code
     * @param map {object} The bundle's sourcemap
     */
    constructor(bundles, is, id, code, map) {
        if (!is || !id) {
            throw new Error('Invalid parameters');
        }
        if (!code || !map) {
            const error = (!code ? 'code' : '') + (!map && !code ? ' and ' : '') + (!map ? 'source map' : '');
            throw new Error(`Invalid ${error} of bundle "${id}"`);
        }

        this.#bundles = bundles;
        this.#is = is;
        this.#id = id;
        this.#code = code;
        this.#map = new SourceMap(map);
    }

    compile() {
        if (this.#compiled) throw new Error('Bundle already compiled');

        const compiled = new Module(this.#id);
        compiled.require = this.#brequire;
        try {
            compiled._compile(this.#code, `/node_modules/${this.#id}.js`);
            this.#compiled = compiled;
        }
        catch (exc) {
            this.#error = exc.stack;
        }
    }
}
