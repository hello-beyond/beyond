/**
 * BeyondJS "jsx" native processor compiler
 */
module.exports = class {
    get name() {
        return 'jsx';
    }

    get imports() {
        const imports = [];
        imports.push(`import * as React from 'react';`);
        imports.push(`import * as ReactDOM from 'react-dom';`);
        return imports;
    }

    #sources;
    #compiler;
    get compiler() {
        return this.#compiler;
    }

    #specs;
    #path;
    get path() {
        return this.#path;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #code;
    get code() {
        return this.#code;
    }

    /**
     * Processor constructor
     *
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     */
    constructor(specs) {
        this.#specs = specs;
        this.#sources = new (require('./sources'))(specs);
        this.#compiler = new (require('./compiler'))(this.#sources);
        this.#code = new (require('./code'))(this.#compiler);
        this.#hash = new (require('./hash'))(this.#sources);
    }

    configure(config) {
        config = require('../finder-config')(config, {extname: ['.jsx']});
        if (config.errors) {
            this.#errors = config.errors;
            this.#sources.configure();
            return;
        }

        this.#errors = [];
        this.#path = require('path').join(this.#specs.bundle.path, config.path);
        this.#sources.configure(this.#path, config.value);
    }

    destroy() {
        this.#sources.destroy();
        this.#compiler = new (require('./compiler'))(this.#sources);
        this.#code.destroy();
    }
}
