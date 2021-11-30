/**
 * The application library
 */
module.exports = class extends require('./attributes') {
    #application;
    get application() {
        return this.#application;
    }

    #library;
    get library() {
        return this.#library;
    }

    get watcher() {
        return this.#library.watcher;
    }

    get is() {
        return 'library';
    }

    #modules;
    get modules() {
        return this.#modules;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
    }

    #_static;
    get static() {
        return this.#_static;
    }

    host = distribution => this.#library.host(distribution);

    constructor(application, library) {
        super(application, library);
        this.#application = application;
        this.#library = library;

        this.#modules = new (require('./modules'))(application, library);
        this.#modules.on('initialised', () => this._events.emit('modules.initialised'));
        this.#modules.on('change', () => this._events.emit('modules.change'));

        this.#bundles = new global.Bundles(this);
        this.#_static = new (require('./static'))(application, library);
    }

    destroy() {
        super.destroy();
        this.#modules.destroy();
        this.#bundles.destroy();
        this.#_static.destroy();
    }
}
