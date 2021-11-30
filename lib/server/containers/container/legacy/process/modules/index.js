/**
 * The modules actions listener.
 * Each client connection has an instance of this object.
 */
module.exports = class extends Map {
    #config;
    #service;
    #initialised;
    #initialising;

    get initialised() {
        return this.#initialised;
    }

    /**
     * Constructor
     * @param config {object} The modules configuration including the path where the modules are located
     * @param service {object} The service manager
     */
    constructor(config, service) {
        if (typeof config !== 'object' || typeof service !== 'object') throw new Error('Invalid parameters');
        const {path} = config;
        if (typeof path !== 'string' || !path) throw new Error('Invalid parameter');

        super();
        this.#config = config;
        this.#service = service;
    }

    async initialise() {
        if (this.#initialising || this.#initialised) throw new Error('Modules collection already initialised');
        this.#initialising = true;

        const {path} = this.#config;
        const finder = new global.utils.Finder(path, {'filename': 'module.json', 'excludes': []});
        await finder.ready;

        for (const file of finder.files) {
            const module = new (require('./module'))(file, this.#service);
            await module.initialise();
            this.set(module.id, module);
        }

        this.#initialised = true;
    }
}