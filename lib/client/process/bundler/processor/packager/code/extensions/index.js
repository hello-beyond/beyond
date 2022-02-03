const DynamicProcessor = global.utils.DynamicProcessor(Map);
const ProcessorsCodeExtensions = (require('./processors'));

/**
 * The files collected from the extensions of the current processor
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.code.extensions';
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    #template;

    constructor(processor) {
        super();
        this.#processor = processor;

        const {bundle} = processor.specs;
        this.#template = bundle.name.startsWith('template/');
        if (this.#template) return;

        // The extensions of the current processor being extended by other processors of the same bundle
        const events = ['code.initialised', 'code.change'];
        super.setup(new Map([['extensions.code', {child: new ProcessorsCodeExtensions(processor), events}]]));
    }

    _prepared(check) {
        if (this.#template) return;
        const extensions = this.children.get('extensions.code').child;
        extensions.forEach(extension => check(extension.code));
    }

    _process() {
        if (this.#template) return;
        const extensions = this.children.get('extensions.code').child;
        this.clear();

        extensions.forEach(({code}) => code.forEach((compiled, file) => this.set(file, compiled)));
    }
}
