const DynamicProcessor = global.utils.DynamicProcessor(Map);

/**
 * The hashes of the processors packagers
 * Processors that are only extenders of other processors are not considered for the hash calculation
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.processors.hashes';
    }

    constructor(processors) {
        super();
        const events = ['hash.initialised', 'hash.change'];
        super.setup(new Map([['processors', {child: processors, events}]]));
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
