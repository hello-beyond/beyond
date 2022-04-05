const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.module.static.overwrites';
    }

    #application;
    #path;
    get path() {
        return this.#path;
    }

    #config;
    get config() {
        return this.#config;
    }

    #overwrites;

    constructor(application, module) {
        super();

        this.#application = application;

        // As the id of the module can change, it is required to listen to its changes
        // The id of the module is also undefined until the module is processed,
        // since it, in turn, requires that its container is also processed
        // (in the case that the container is a library, it is necessary to know its name)
        const children = new Map();
        children.set('module', {child: module});
        super.setup(children);
    }

    #invalidate = () => super._invalidate();

    _process() {
        const application = this.#application;
        const module = this.children.get('module').child;
        const overwrites = application.template.overwrites.get(`${module.pathname}/static`);

        if (overwrites !== this.#overwrites) {
            this.#overwrites && this.#overwrites.off('change', this.#invalidate);
            overwrites.on('change', this.#invalidate);
            this.#overwrites = overwrites;
        }

        this.#path = overwrites.path;
        this.#config = overwrites.config;
    }
}
