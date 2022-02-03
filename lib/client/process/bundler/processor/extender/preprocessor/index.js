const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'processor.extender.preprocessor';
    }

    #processor;
    get processor() {
        return this.#processor;
    }

    get analyzer() {
        return this.children.get('analyzer')?.child;
    }

    get files() {
        return this.children.get('files')?.child;
    }

    get overwrites() {
        return this.children.get('overwrites')?.child;
    }

    /**
     * Processors extender constructor
     *
     * @param processor {object} The processor object
     */
    constructor(processor) {
        super();
        this.#processor = processor;
        const children = [];

        // The children can be the compiler if it exists, otherwise it could be the analyzer if it exists,
        // or the processor sources (files and overwrites)
        const {analyzer, files, overwrites} = processor;
        if (analyzer) {
            children.push(['analyzer', {'child': analyzer}]);
        }
        else {
            const events = ['item.initialised', 'item.change'];
            children.push(['files', {'child': files, events}]);
            overwrites && children.push(['overwrites', {'child': overwrites, events}]);
        }

        super.setup(new Map(children));

        const {meta} = processor;
        const {extends: _extends} = meta.extender;
        _extends.forEach(processorName => this.set(processorName, new Map()));
    }

    _prepared(check) {
        this.files?.forEach(source => check(source));
        this.overwrites?.forEach(source => check(source));
    }

    async _process(request) {
        const updated = new Map();
        [...this.keys()].forEach(processor => updated.set(processor, new Map()));

        await this._preprocess(updated, request);
        if (this._request !== request) return;

        // Copy the preprocessed files of the extended processors
        this.forEach((files, processorName) => {
            files.clear();
            if (!updated.has(processorName)) return;
            updated.get(processorName).forEach((value, key) => files.set(key, value));
        });
    }
}
