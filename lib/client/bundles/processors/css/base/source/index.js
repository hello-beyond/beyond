const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.source';
    }

    constructor(sources) {
        super();

        const {files, overwrites} = sources;
        const children = new Map();
        children.set('files', {child: files});
        overwrites && children.set('overwrites', {child: overwrites});
        super.setup(children);
    }

    #processed;
    #process = () => {
        if (this.#processed) return;

        this.#processed = {code: '', lines: 0};
        const files = this.children.get('files').child;
        const overwrites = this.children.has('overwrites') ? this.children.get('overwrites').child : undefined;

        let code = '';
        files.forEach(source => code += `${source.content}\n\n`);
        overwrites && overwrites.forEach(source => code += `${source.content}\n\n`);

        this.#processed.code = code;
        this.#processed.lines = code ? (code.length - code.replace(/\n/g, '').length + 1) : 0;
    }

    get lines() {
        this.#process();
        return this.#processed.lines;
    }

    get code() {
        this.#process();
        return this.#processed.code;
    }

    _process() {
        this.#processed = undefined;
    }
}
