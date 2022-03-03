const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'css-processor.functions.hash';
    }

    get value() {
        this.children.has('hash') ? this.children.get('hash').child : 0;
    }

    constructor(template) {
        super();
        this.setMaxListeners(500);
        super.setup(new Map([['template', {child: template}]]));
    }

    _prepared(check) {
        const {children} = this;
        const {instance} = children.get('template').child;

        if (children.has('hash')) {
            if (children.get('hash').child === instance?.hash) return;
            children.unregister(['hash'], false);
        }
        if (!instance) return;

        const {hash} = instance;
        children.register(new Map([['hash', {child: hash}]]), false);
        check(hash);
    }
}
