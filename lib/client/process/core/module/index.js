const {Config} = global.utils;
const sep = require('path').sep;

module.exports = class extends require('./attributes') {
    get is() {
        return 'module';
    }

    get watcher() {
        return this.container.watcher;
    }

    #file;
    #container;
    get container() {
        return this.#container;
    }

    get file() {
        return this.#file;
    }

    get path() {
        return this.#file.dirname;
    }

    #id;
    get id() {
        return this.#id;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    #bundles = new global.BundlesConfig(this);
    get bundles() {
        return this.#bundles;
    }

    #_static;
    get static() {
        return this.#_static;
    }

    constructor(container, file) {
        if (!container || !file) throw new Error('Invalid parameters');

        const config = new Config(file.dirname, {'/static': 'object'});
        config.data = 'module.json';
        super(config);

        this.#container = container;
        this.#file = file;

        this.#_static = new (require('./static'))(this, config.properties.get('static'));

        let path = file.relative.dirname;
        path = sep === '/' ? path : path.replace(/\\/g, '/');
        path = path.replace(/\/$/, ''); // Remove trailing slash;
        this.#id = `${container.is}//${container.id}` + (path ? `//${path}` : '//main');
    }

    _process() {
        let config = this.children.get('config').child;
        this.#warnings = config.warnings;
        this.#errors = config.errors;
        config = !config.valid || !config.value ? {bundles: {}} : require('./config')(config.value);

        super._process(config);
        this.#bundles.configure(config.bundles);
    }

    destroy() {
        super.destroy();
        this.#_static.destroy();
    }
}
