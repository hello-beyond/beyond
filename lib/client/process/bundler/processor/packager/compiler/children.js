/**
 * The analyzer, sources, dependencies and options are not children of the compiler at compiler startup,
 * since the processed data can be loaded from the cache
 */
module.exports = class {
    #compiler;
    get compiler() {
        return this.#compiler;
    }

    constructor(compiler) {
        this.#compiler = compiler;
    }

    _get(child) {
        if (!this.#disposed) throw new Error('Children not disposed');
        return this.#compiler.children.get(child)?.child;
    }

    get dependencies() {
        return this._get('dependencies');
    }

    get options() {
        return this._get('options');
    }

    get analyzer() {
        return this._get('analyzer');
    }

    get files() {
        return this._get('files');
    }

    get extensions() {
        return this._get('extensions');
    }

    get extended() {
        return this._get('extended');
    }

    get overwrites() {
        return this._get('overwrites');
    }

    #disposed = false;

    /**
     * When the processor is updated, the data is taken from the cache, otherwise the children must be set.
     * This method can be overridden.
     *
     * @param check {function} The dynamic processor check function passed to the _prepared(check) function
     * @param children? {Map<string, object>} Used by the overridden method to set extra children
     */
    dispose(check, children) {
        if (this.#disposed) return;
        this.#disposed = true;

        const {processor} = this.#compiler.packager;
        const {analyzer, sources, options, meta} = processor;

        children = children ? children : new Map();
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
