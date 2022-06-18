const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.config';
    }

    #errors;
    get errors() {
        if (this.#errors !== undefined) return this.#errors;
        this.#process();
        return this.#errors;
    }

    get valid() {
        return !this.errors.length;
    }

    #distribution;

    #code;
    get code() {
        if (this.#code !== undefined) return this.#code;
        this.#process();
        return this.#code;
    }

    #process() {
        const application = this.children.get('application').child;
        if (!application.processed) throw new Error('Application is not ready. Wait for the .ready property before calling this property.');

        const backends = this.children.get('backends').child;
        const ssr = this.children.get('ssr').child;
        const distribution = this.#distribution;
        const {platforms} = global;
        const {platform} = distribution;

        this.#errors = [];
        this.#code = undefined;

        if (!backends.valid || !ssr.valid) {
            this.#errors = backends.errors.concat(ssr.errors);
            return;
        }

        const config = {};
        config.distribution = {
            local: !distribution.build,
            key: distribution.key.toString(),
            environment: distribution.environment,
            mode: distribution.bundles.mode
        };

        config.application = application.config;
        config.backends = backends.config;
        config.ssr = ssr.config;

        // Set the baseDir configuration
        let baseDir = application.baseDir ? application.baseDir : '';
        baseDir = baseDir.startsWith('/') ? baseDir.substr(1) : baseDir;
        const root = platforms.web.includes(platform) ? '/' : '';
        config.distribution.baseDir = root + baseDir;

        let code = `globalThis.__beyond_config = ${JSON.stringify(config)};\n`;
        code = global.utils.code.header('APPLICATION CONFIGURATION') + code;
        return this.#code = code;
    }

    constructor(application, distribution) {
        if (!application.initialised) throw new Error('Application must be previously initialised');
        super();
        this.#distribution = distribution;

        const ports = new (require('./ports'))();

        const children = new Map();
        children.set('application', {child: new (require('./application'))(application, distribution, ports)});
        children.set('backends', {child: new (require('./backends'))(application, distribution, ports)});
        children.set('ssr', {child: new (require('./ssr'))(application, distribution, ports)});
        super.setup(children);
    }

    _process() {
        this.#code = this.#errors = void 0;
    }
}
