/**
 * The analyzer, sources, dependencies and options are not children of the compiler at compiler startup,
 * since the processed data can be loaded from the cache
 */
module.exports = class {
    #compiler;

    constructor(compiler) {
        this.#compiler = compiler;
    }

    #get(child) {
        if (!this.#disposed) throw new Error('Children not disposed');
        return this.#compiler.children.get(child)?.child;
    }

    get dependencies() {
        return this.#get('dependencies');
    }

    get options() {
        return this.#get('options');
    }

    get analyzer() {
        return this.#get('analyzer');
    }

    get files() {
        return this.#get('files');
    }

    get extensions() {
        return this.#get('extensions');
    }

    get extended() {
        return this.#get('extended');
    }

    get overwrites() {
        return this.#get('overwrites');
    }

    #disposed = false;

    /**
     * When the processor is updated, the data is taken from the cache, otherwise the children must be set.
     */
    dispose(check) {
        if (this.#disposed) return;
        this.#disposed = true;

        const {processor} = this.#compiler.packager;
        const {analyzer, sources, options, dependencies, meta} = processor;

        const children = new Map();
        dependencies && children.set('dependencies', {child: dependencies.declarations});
        options && children.set('options', {child: options});

        if (analyzer) {
            children.set('analyzer', {child: analyzer, events: ['item.initialised', 'item.change']});
        }
        // If the compiler doesn't have an analyzer, then take the sources from the sources object
        else {
            const {files, extensions, overwrites} = sources;
            const extended = meta.extender ? new (require('./extended'))(processor) : void 0;

            const events = ['item.initialised', 'item.change'];
            children.set('files', {child: files, events});
            children.set('extensions', {child: extensions, events});
            extended && children.set('extended', {child: extended, events});
            overwrites && children.set('overwrites', {child: overwrites, events});
        }

        this.#compiler.children.register(children);
        children.forEach(({child}) => check(child));
    }
}
