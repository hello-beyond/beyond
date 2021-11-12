const DynamicProcessor = global.utils.DynamicProcessor();

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.start.config';
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

        const config = {
            local: !distribution.build,
            environment: distribution.environment,
            mode: distribution.bundles.mode
        };

        if (['web', 'android', 'ios'].includes(platform)) {
            // Set the baseUrl configuration
            let baseUrl = application.baseUrl ? application.baseUrl : '';
            baseUrl = baseUrl.startsWith('/') ? baseUrl.substr(1) : baseUrl;
            const root = platform === 'web' ? '/' : '';
            config.baseUrl = root + baseUrl;

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

        let code = '';
        code += `const config = ${JSON.stringify(config)};\n`;
        code += 'beyond.setup(config);\n\n';

        code += `beyond.application.setup(${JSON.stringify(application.config)});\n`;

        code += libraries.code;

        code = global.utils.code.scoped(code) + '\n\n';
        code = global.utils.code.header('APPLICATION CONFIGURATION') + code;

        return (this.#code = code);
    }

    constructor(application, distribution) {
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
