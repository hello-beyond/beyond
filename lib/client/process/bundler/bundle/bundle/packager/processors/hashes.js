const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.processors.hashes';
    }

    constructor(processors) {
        super();
        const subscriptions = ['hash.initialised', 'hash.change'];
        super.setup(new Map([['processors', {child: processors, events: subscriptions}]]));
    }

    _prepared(check) {
        const processors = this.children.get('processors').child;
        processors.forEach(({hash}) => check(hash));
    }

    _process() {
        const processors = this.children.get('processors').child;
        this.clear();
        processors.forEach(({hash}, name) => this.set(name, hash.value));
    }
}
