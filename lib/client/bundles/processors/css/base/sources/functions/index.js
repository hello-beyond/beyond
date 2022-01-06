const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.functions';
    }

    #code = () => this.children.has('code') ? this.children.get('code').child : undefined;

    get diagnostics() {
        return this.#code()?.diagnostics;
    }

    get valid() {
        const code = this.#code();
        return code ? code.valid : true;
    }

    get value() {
        return this.#code()?.code;
    }

    get source() {
        const {instance} = this.children.get('processor').child;
        return instance?.source;
    }

    constructor(processorName, specs) {
        super();
        this.setMaxListeners(500);
        const template = specs.application.template;
        const processor = template.processors[processorName].get(specs.distribution);
        super.setup(new Map([['processor', {child: processor}]]));
    }

    _prepared(check) {
        const {children} = this;
        const {instance} = children.get('processor').child;
        if (children.has('code') && children.get('code') !== instance?.code) {
            children.unregister(['code'], false);
        }

        if (!instance) return;

        const {code} = instance;
        children.register(new Map([['code', {child: code}]]), false);
        check(code);
    }
}
