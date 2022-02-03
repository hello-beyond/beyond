const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * Bundler abstract class
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundle.packager';
    }

    get is() {
        return 'bundlePackager';
    }

    get id() {
        const language = this.#language ? `//${this.#language}` : '//.';
        return `${this.bundle.id}//${this.#distribution.key}${language}`;
    }

    get bundle() {
        return this.children.get('bundle').child;
    }

    get path() {
        return this.bundle.path;
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

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    #js;
    get js() {
        return this.#js;
    }

    #css;
    get css() {
        return this.#css;
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

        const meta = global.bundles.get(bundle.name);
        if (!(meta.extname instanceof Array)) {
            throw new Error(`Property extname in bundle "${bundle.name}" specification must be an array`);
        }
        if (!meta.extname.includes('.js') && !meta.extname.includes('.css')) {
            throw new Error(`Property extname in bundle "${bundle.name}" specification must include the entries '.js' and/or '.css'`);
        }

        this.#js = meta.extname.includes('.js') ? new (require('./code/js'))(this) : void 0;
        this.#css = meta.extname.includes('.css') ? new (require('./code/css'))(this) : void 0;
        this.#declaration = new (require('./declaration'))(this);
    }

    _process() {
        const {valid, path, config} = this.bundle;
        valid && config ? this.#imports.configure(path, config.imports) : this.#imports.configure();
    }
}
