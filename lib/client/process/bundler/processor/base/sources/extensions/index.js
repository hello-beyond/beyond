const DynamicProcessor = global.utils.DynamicProcessor(Map);
const ProcessorsExtensions = (require('./processors'));

/**
 * The files collected from the extensions of the current processor
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.sources.extensions';
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    #template;

    constructor(processor) {
        super();
        this.#processor = processor;
        this.#hash = new (require('./hash'))(this);

        const {bundle} = processor.specs;
        this.#template = bundle.name.startsWith('template/');
        if (this.#template) return;

        // The extensions of the current processor being extended by other processors of the same bundle
        const events = ['sources.initialised', 'sources.change'];
        super.setup(new Map([['extensions.sources', {child: new ProcessorsExtensions(processor), events}]]));
    }

    _prepared(check) {
        if (this.#template) return;
        const extensions = this.children.get('extensions.sources').child;
        extensions.forEach(extension => check(extension.sources));
    }

    _process() {
        if (this.#template) return;
        const extensions = this.children.get('extensions.sources').child;
        this.clear();

        extensions.get(this.#processor.name)?.sources.forEach(source => {
            this.set(source.relative.file, source);
        });
    }
}
