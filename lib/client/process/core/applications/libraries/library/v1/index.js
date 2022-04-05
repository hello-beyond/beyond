/**
 * The application library
 */
module.exports = class extends require('./attributes') {
    get is() {
        return 'library';
    }

    #applications;
    #pkg;

    get package() {
        return this.#pkg;
    }

    #application;
    get application() {
        return this.#application;
    }

    #library;
    get library() {
        return this.#library;
    }

    get watcher() {
        return this.#application.watcher;
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

    /**
     * Application library constructor
     *
     * @param application {object} The application object
     * @param pkg {string} The package name of the project/library being imported
     * @param applications {object} The registered applications collection
     */
    constructor(application, pkg, applications) {
        super(application, pkg);
        this.#application = application;
        this.#pkg = pkg;
        this.#applications = applications;

        this.#modules = new (require('../modules'))(this);
        this.#modules.on('initialised', () => this._events.emit('modules.initialised'));
        this.#modules.on('change', () => this._events.emit('modules.change'));

        this.#_static = new (require('../static'))(this);
        this.#bundles = new global.Bundles(this);

        const events = ['item.initialised', 'item.change'];
        super.setup(new Map([['applications', {child: applications, events}]]));
    }

    _prepared(check) {
        let prepared = true;
        this.#applications.forEach(application => prepared = check(application) && prepared);
        if (!prepared) return false;

        this.#library = [...this.#applications.values()].find(application => application.package === this.#pkg);
        this.#library && check(this.#library);
    }

    _process() {
        this.#modules.library = this.#library;
        this.#_static.library = this.#library;
    }

    destroy() {
        super.destroy();
        this.#modules.destroy();
        this.#bundles.destroy();
        this.#_static.destroy();
    }
}
