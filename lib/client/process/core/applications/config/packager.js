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

        const libraries = this.children.get('libraries').child;
        const distribution = this.#distribution;
        const {platform} = distribution;

        this.#errors = [];
        this.#code = undefined;

        if (!libraries.valid) {
            this.#errors = libraries.errors;
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
        config.libraries = libraries.config;

        // Set the baseUrl configuration
        let baseUrl = application.baseUrl ? application.baseUrl : '';
        baseUrl = baseUrl.startsWith('/') ? baseUrl.substr(1) : baseUrl;
        const root = platform === 'web' ? '/' : '';
        config.distribution.baseUrl = root + baseUrl;

        // Set the packages (externals) configuration
        if (['web', 'android', 'ios'].includes(platform)) {
            // Set the packages configuration
            const packages = new Map();
            const externals = this.children.get('externals').child;
            externals.forEach(external => {
                const {valid, errors} = external;
                if (!valid) {
                    packages.set(external.package, {errors});
                    return;
                }

                let {filename} = external.filename(distribution);
                filename = filename?.endsWith('.js') ? filename.substr(0, filename.length - 3) : filename;
                packages.set(external.package, filename ? {filename} : {errors: ['File not found']});
            });
            config.packages = [...packages];
        }

        let code = `globalThis.__beyond_config = ${JSON.stringify(config)};\n`;
        code = global.utils.code.header('APPLICATION CONFIGURATION') + code;
        return (this.#code = code);
    }

    constructor(application, distribution) {
        if (!application.initialised) throw new Error('Application must be previously initialised');
        super();
        this.#distribution = distribution;

        const ports = new (require('./ports'))();

        const children = new Map();
        children.set('application', {child: new (require('./application'))(application, distribution, ports)});
        children.set('libraries', {child: new (require('./libraries'))(application.libraries, distribution, ports)});
        children.set('externals', {child: application.externals, events: ['external.initialised', 'external.change']});
        super.setup(children);
    }

    _prepared(check) {
        const externals = this.children.get('externals').child;
        externals.forEach(external => check(external));
    }

    _process() {
        this.#code = this.#errors = undefined;
    }
}
