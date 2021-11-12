const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    #code;
    get code() {
        return this.#code;
    }

    #lines;
    get lines() {
        return this.#lines;
    }

    constructor(specs, processorName) {
        super();
        const {template} = specs.application;
        const finder = template.processors.get(processorName);

        const children = new Map();
        children.set('finder', {child: finder, events: ['item.change']});
        super.setup(children);

        // Two listeners per bundle ('change', 'initialise')
        this.setMaxListeners(500);
    }

    async _process(request) {
        const finder = this.children.get('finder').child;
        const promises = [];

        finder.forEach(source => promises.push(source.ready));
        await Promise.all(promises);
        if (request !== this._request) return;

        let code = '';
        finder.forEach(source => code += source.content + '\n\n');

        this.#code = code;
        this.#lines = code.length - code.replace(/\n/g, '').length + 1;
    }
}
