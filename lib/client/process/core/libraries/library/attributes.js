const DynamicProcessor = global.utils.DynamicProcessor();
const {equal, ipc} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'library';
    }

    get is() {
        return 'library';
    }

    #id;
    get id() {
        return this.#id;
    }

    get path() {
        return this.children.get('config').child.path;
    }

    #values = {};

    get scope() {
        return this.#values.scope;
    }

    get name() {
        return this.#values.name;
    }

    get package() {
        return this.#values.package;
    }

    get resource() {
        return this.#values.package;
    }

    get pathname() {
        return this.#values.pathname;
    }

    get description() {
        return this.#values.description;
    }

    get version() {
        return this.#values.version;
    }

    get connect() {
        return this.#values.connect;
    }

    get hosts() {
        return this.#values.hosts;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'libraries',
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
        const pkg = (config.scope ? `@${config.scope}/` : '') + config.name;
        const values = {
            scope: config.scope,
            name: config.name,
            package: pkg,
            resource: pkg,
            pathname: `packages/${pkg}`,
            description: config.description,
            version: config.version,
            connect: config.connect,
            hosts: config.hosts
        }

        if (equal(values, this.#values)) return false;
        this.#values = values;
    }
}
