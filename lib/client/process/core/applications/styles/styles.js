const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.styles.code';
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

    _notify() {
        ipc.notify('application-styles', {type: 'update'});
    }

    constructor(template, distribution) {
        super();
        const processor = template.processors.get(distribution);
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

    _process() {
    }
}
