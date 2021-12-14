const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Bundler abstract class
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundle.packager';
    }

    get id() {
        const language = this.#language ? `//${this.#language}` : '//.';
        return `${this.bundle.id}//${this.#distribution.key}${language}`;
    }

    get bundle() {
        return this.children.get('bundle').child;
    }

    get application() {
        return this.bundle.application;
    }

    #distribution;
    get distribution() {
        return this.#distribution;
    }

    #language;
    get language() {
        return this.#language;
    }

    #code;
    get code() {
        return this.#code;
    }

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #processors;
    get processors() {
        return this.#processors;
    }

    #dependencies;
    get dependencies() {
        return this.#dependencies;
    }

    #consumers;
    get consumers() {
        return this.#consumers;
    }

    // @deprecated: Just for backward compatibility
    #imports;
    get imports() {
        return this.#imports;
    }

    /**
     * Bundler constructor
     *
     * @param bundle {object} The bundle
     * @param distribution {object} The distribution specification
     * @param language {string} The language
     */
    constructor(bundle, distribution, language) {
        if (!distribution || !distribution.key) throw new Error('Invalid parameters');

        super();
        this.#distribution = distribution;
        this.#language = language;

        super.setup(new Map([['bundle', {child: bundle}]]));

        this.#processors = new (require('./processors'))(this);
        this.#imports = new (require('./imports'))(bundle.watcher);
        this.#hash = new (require('./hash'))(this);
        this.#dependencies = new (require('./dependencies'))(this);
        this.#consumers = new (require('./consumers'))(this);
        this.#code = new (require('./code'))(this, bundle);
        this.#declaration = new (require('./declaration'))(this);
    }

    _process() {
        const {valid, path, config} = this.bundle;
        valid && config ? this.#imports.configure(path, config.imports) : this.#imports.configure();
    }
}