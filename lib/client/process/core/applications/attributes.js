const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc, equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application';
    }

    #id;
    get id() {
        return this.#id;
    }

    get path() {
        return this.children.get('config').child.path;
    }

    get is() {
        return 'application';
    }

    #values = {};

    get port() {
        return this.#values.port;
    }

    get scope() {
        return this.#values.scope;
    }

    get name() {
        return this.#values.name;
    }

    get package() {
        return this.#values.package;
    }

    get version() {
        return this.#values.version;
    }

    get title() {
        return this.#values.title;
    }

    get description() {
        return this.#values.description;
    }

    get baseUrl() {
        return this.#values.baseUrl;
    }

    get languages() {
        return this.#values.languages;
    }

    get params() {
        return this.#values.params;
    }

    get routing() {
        return this.#values.routing;
    }

    get layout() {
        return this.#values.layout;
    }

    get connect() {
        return this.#values.connect;
    }

    get hosts() {
        return this.#values.hosts;
    }

    get engine() {
        return this.#values.engine;
    }

    _notify = () => {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'applications',
            id: this.#id
        });
    }

    #initialising = false;
    get initialising() {
        return this.#initialising || super.initialising;
    }

    async initialise() {
        if (this.initialised || this.#initialising) return;
        this.#initialising = true;

        this.#id = await ipc.exec('main', 'ids.path/generate', this.path);

        await super.initialise();
        this.#initialising = false;
    }

    constructor(config) {
        super();

        const children = new Map();
        children.set('config', {child: config});
        super.setup(children);
    }

    _process(config) {
        const {scope, name, version, title, description, baseUrl, routing, layout, hosts, params} = config;
        const connect = typeof config.backend === 'object';
        const engine = config.engine ? config.engine : 'v1';

        let {languages} = config;
        languages = typeof languages === 'string' ? [languages] : languages;
        languages = languages instanceof Array ? {supported: languages} : languages;
        languages = typeof languages === 'object' ? languages : {};
        languages.supported = languages.supported instanceof Array ? languages.supported : [];
        languages.default = languages.default && typeof languages.default === 'string' ? languages.default : 'en';

        const values = {
            scope, name,
            package: (config.scope ? `@${config.scope}/` : '') + config.name,
            version, title, description, baseUrl, languages,
            routing, layout, hosts, connect, engine, params
        };

        const distribution = config.deployment?.distributions.find(distribution => distribution?.default);
        values.port = distribution?.port;

        if (equal(values, this.#values)) return false;
        this.#values = values;
    }
}
