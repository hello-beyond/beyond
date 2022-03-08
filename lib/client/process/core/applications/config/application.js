const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.start.config.application';
    }

    #distribution;
    #ports;

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #config;
    get config() {
        return this.#config;
    }

    constructor(application, distribution, ports) {
        super();
        this.#distribution = distribution;
        this.#ports = ports;

        const children = new Map();
        children.set('application', {child: application});
        super.setup(children);
    }

    async _process(request) {
        const application = this.children.get('application').child;
        const distribution = this.#distribution;
        const {platform} = distribution;
        const {platforms} = global;

        this.#errors = [];
        if (distribution.build && application.connect && !application.host(distribution)) {
            this.#errors.push(`Application must specify its host`);
        }

        const config = {
            package: application.package,
            version: application.version,
            languages: application.languages
        };
        distribution.local && (config.local = {id: application.id});

        if (platforms.webAndMobileAndSSR.includes(platform)) {
            config.layout = application.layout;
        }

        const pkg = application.package;
        const namespace = pkg.startsWith('@') ? pkg.substr(1) : pkg;

        if (platforms.webAndMobileAndSSR.includes(platform)) {
            config.connect = application.connect;

            if (distribution.build && application.connect) {
                config.host = application.host(distribution);
                config.host = `${config.host}/${namespace}`;
            }
            else if (application.connect) {
                const port = await this.#ports.get('application', application.id);
                if (this._request !== request) return;
                config.host = `http://localhost:${port}/${namespace}`;
            }
        }

        const {environment} = distribution;
        const {environments} = global.utils;

        let params = typeof application.params === 'object' ? application.params : {};

        params = Object.assign({}, params, params[environment]);
        environments.forEach(environment => delete params[environment]);

        params = Object.assign(params, params[platform]);
        platforms.all.forEach(platform => delete params[platform]);

        config.params = params;
        global.dashboard && (params.monitor = distribution.monitor);

        const changed = !equal(this.#config, config);
        this.#config = config;

        // Avoid to emit the change event if the information remains the same
        return changed;
    }
}
