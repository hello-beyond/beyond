const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.functions.code';
    }

    get instance() {
        return this.children.get('template').child.instance;
    }

    #source = new (require('./source'))(this);
    get source() {
        return this.#source;
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

    constructor(template) {
        super();
        this.setMaxListeners(500);
        super.setup(new Map([['template', {child: template}]]));
    }

    _prepared(check) {
        const {children} = this;
        const {instance} = children.get('template').child;

        if (children.has('code')) {
            if (children.get('code').child !== instance?.packager.css) return;
            children.unregister(['code'], false);
        }
        if (!instance) return;

        const {css} = instance.packager;
        children.register(new Map([['code', {child: css}]]), false);
        check(css);
    }

    _process() {
        this.#source.invalidate();
    }
}
