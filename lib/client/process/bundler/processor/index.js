/**
 * BeyondJS Processor Packager abstract class
 */
module.exports = class {
    #name;
    get name() {
        return this.#name;
    }

    #meta;
    get meta() {
        return this.#meta;
    }

    #specs;
    get specs() {
        return this.#specs;
    }

    get application() {
        return this.#specs.application;
    }

    get distribution() {
        return this.#specs.distribution;
    }

    get language() {
        return this.#specs.language;
    }

    #path;
    get path() {
        return this.#path;
    }

    get id() {
        return `${this.#specs.bundle.id}//${this.name}//${this.distribution.key}//${this.language}`;
    }

    #sources;
    get sources() {
        return this.#sources;
    }

    get files() {
        return this.#sources.files;
    }

    get overwrites() {
        return this.#sources.overwrites;
    }

    #compiler;
    get compiler() {
        return this.#compiler;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #multilanguage;
    get multilanguage() {
        return this.#multilanguage;
    }

    set multilanguage(value) {
        if (this.#multilanguage === value) return;
        this.#multilanguage = value;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    #code;
    get code() {
        return this.#code;
    }

    /**
     * Processor packager constructor
     *
     * @param name {string} The processor's name
     * @param specs {{bundle: {id: string, resource: string, name: string, container: {is: string}, path: string, pathname: string}, distribution: object, application: object, watcher: object}}
     */
    constructor(name, specs) {
        if (!specs || !specs.bundle.name || !specs.bundle.container || !specs.bundle.path ||
            !specs.bundle.resource || !specs.application || !specs.watcher) {

            const id = specs && specs.bundle && specs.bundle.id ? `of bundle "${specs.bundle.id}" ` : '';
            console.log(`Parameter specs ${id}is invalid:`, specs);
            throw new Error('Invalid "specs" parameter');
        }

        const meta = this.#meta = global.utils.processors.get(name);
        if (!meta || !meta.sources) throw new Error(`Processor "${name}" specification is invalid`);

        const Sources = meta.sources.Controller ? meta.sources.Controller : require('./sources');
        const Hash = meta.Hash ? meta.Hash : require('./hash');
        const Compiler = meta.Compiler ? meta.Compiler : require('./compiler');
        const Code = meta.Code ? meta.Code : require('./code');

        this.#name = name;
        this.#specs = specs;
        this.#sources = new Sources(this);
        this.#compiler = new Compiler(this);
        this.#hash = new Hash(this);
        this.#code = new Code(this);
    }

    configure(config, multilanguage) {
        this.#errors = [];

        const {errors, warnings, path, value} = require('./finder-config')(config, {extname: ['.ts', '.tsx']});
        this.#warnings = warnings;
        if (errors) {
            this.#errors = errors;
            this.#sources.configure();
            return;
        }

        this.#path = require('path').join(this.#specs.bundle.path, path);
        this.#sources.configure(this.#path, value);
        this.#code.configure({multilanguage: !!multilanguage});
    }

    destroy() {
        this.#sources.destroy();
        this.#code.destroy();
    }
}
