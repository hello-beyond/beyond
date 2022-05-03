const {ipc} = global.utils;
const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.deployment.distribution';
    }

    #application;

    get id() {
        return `${this.#application.id}//${this.#key}`;
    }

    #name;
    get name() {
        return this.#name;
    }

    #key;
    get key() {
        return this.#key;
    }

    #local;
    get local() {
        return this.#local;
    }

    #ssr;
    get ssr() {
        return this.#ssr;
    }

    #server;
    get server() {
        return this.#server;
    }

    #platform;
    get platform() {
        return this.#platform;
    }

    #environment;
    get environment() {
        return this.#environment;
    }

    #bundles;
    get bundles() {
        return this.#bundles;
    }

    #ts;
    get ts() {
        return this.#ts;
    }

    #compress;
    get compress() {
        return this.#compress;
    }

    #port;
    get port() {
        return this.#port;
    }

    #default;
    get default() {
        return this.#default;
    }

    constructor(application, config, local, key) {
        super();
        this.#key = key ? key : require('./key')(config);
        this.#name = config.name;
        this.#local = !!local;
        this.#ssr = !!config.ssr;
        this.#server = !!config.server;
        this.#application = application;

        const {platforms} = global;
        config.platform = config.platform ? config.platform : 'web';
        this.#platform = platforms.all.includes(config.platform) ? config.platform : 'web';

        this.#environment = config.environment ? config.environment : 'development';
        this.#ts = config.ts;
        this.#compress = !!config.compress;
        this.#default = !!config.default;

        const bundles = typeof config.bundles === 'object' ? config.bundles : {};
        const cjs = ['backend', 'node', 'ssr'].includes(this.#platform);
        bundles.mode = cjs ? 'cjs' : (bundles.mode === 'es6' ? 'es6' : 'amd');
        this.#bundles = bundles;
    }

    #configured = false;

    _prepared() {
        return this.#configured;
    }

    configure(port) {
        this.#configured = true;
        if (this.#port === port) return;

        this.#port = port;
        this._invalidate();
    }

    toJSON() {
        return {
            key: this.#key,
            name: this.#name,
            ssr: this.#ssr,
            server: this.#server,
            platform: this.#platform,
            environment: this.#environment,
            ts: this.#ts,
            compress: this.#compress,
            bundles: this.#bundles,
            port: this.#port,
            default: this.#default
        };
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'applications-distributions',
            id: this.id
        });
    }
}