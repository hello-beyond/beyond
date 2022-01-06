const DynamicProcessor = global.utils.DynamicProcessor();
const {ipc, equal} = global.utils;
const {sep} = require('path');

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'module';
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
        return this.#values.resource;
    }

    get pathname() {
        return this.#values.pathname;
    }

    get title() {
        return this.#values.title;
    }

    get description() {
        return this.#values.description;
    }

    get transpile() {
        return this.#values.transpile;
    }

    get hmr() {
        return this.#values.hmr;
    }

    get layoutId() {
        return this.#values.layoutId;
    }

    get route() {
        return this.#values.route;
    }

    get vdir() {
        return this.#values.vdir;
    }

    get engines() {
        return this.#values.engines;
    }

    get platforms() {
        return this.#values.platforms;
    }

    _notify = () => {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'modules',
            id: this.id
        });
    }

    constructor(config) {
        super();

        const children = new Map();
        children.set('config', {child: config});
        super.setup(children);
    }

    _process(config) {
        config = config ? config : {};
        const values = {
            scope: config.scope,
            name: config.name,
            title: config.title,
            description: config.description,
            transpile: config.transpile,
            hmr: config.hmr,
            layoutId: config.layout,
            engines: config.engines instanceof Array ? config.engines : undefined
        };

        let platforms = config.platforms ? config.platforms : ['web', 'android', 'ios'];
        platforms = typeof platforms === 'string' ? [platforms] : platforms;
        platforms = platforms instanceof Array ? platforms : ['web', 'android', 'ios'];
        platforms = platforms.includes('*') ? ['web', 'android', 'ios', 'node', 'ssr', 'backend'] : platforms;

        platforms = new Set(platforms);
        platforms.has('web') && platforms.add('ssr');
        values.platforms = platforms;

        config.scope || config.package &&
        (values.package = (config.scope ? `@${config.scope}/` : '') + config.name);

        const {container} = this;

        if (values.package) {
            values.resource = values.package;
            values.pathname = `packages/${values.resource}`;
        }
        else {
            let path = this.file.relative.dirname;
            path = sep === '/' ? path : path.replace(/\\/g, '/');
            path = path.replace(/\/$/, ''); // Remove trailing slash;

            const name = values.name = values.name ? values.name : `unnamed/${path}`;

            values.resource = `${container.package}/${name}`;
            values.pathname = container.is === 'application' ? name : `packages/${values.resource}`;
        }

        /**
         * page and route are attributes of the page bundle but are managed as
         * module properties.
         */
        if (config.bundles?.page) {
            values.route = config.bundles.page.route;
            values.vdir = config.bundles.page.vdir;
        }

        if (equal(values, this.#values)) return false;
        this.#values = values;
    }
}
