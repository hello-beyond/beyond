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

    _process() {
        const application = this.children.get('application').child;
        const distribution = this.#distribution;
        const {platform} = distribution;
        const {platforms} = global;

        const config = {
            package: application.package,
            version: application.version,
            languages: application.languages,
            routing: application.routing
        };

        config.routing.mode === 'pathname' && delete config.routing.mode;
        config.routing.ssr === false && delete config.routing.ssr;
        !Object.entries(config.routing).length && delete config.routing;

        application.routing && config
        platforms.webAndMobileAndSSR.includes(platform) && (config.layout = application.layout);

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
