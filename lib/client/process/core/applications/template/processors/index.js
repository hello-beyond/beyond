const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.template.processors';
    }

    #application;
    get application() {
        return this.#application;
    }

    #scss;
    get scss() {
        return this.#scss;
    }

    #less;
    get less() {
        return this.#less;
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    #warnings = [];
    get warnings() {
        return this.#warnings;
    }

    get valid() {
        return !this.#errors.length;
    }

    #path;
    get path() {
        return this.#path;
    }

    #value;
    get value() {
        return this.#value;
    }

    constructor(application, config) {
        super();
        this.#application = application;
        super.setup(new Map([['config', {child: config}]]));

        this.#scss = new (require('./processors'))('scss', this);
        this.#less = new (require('./processors'))('less', this);
        this.set('scss', this.#scss);
        this.set('less', this.#less);
    }

    _process() {
        const config = this.children.get('config').child;

        const done = result => {
            result = result ? result : {};
            this.#errors = result.errors ? result.errors : [];
            this.#warnings = result.warnings ? result.warnings : [];
            this.#path = config.path;
            this.#value = result.value;
        };

        if (!config.valid || !config.value) {
            const {errors, warnings} = config;
            return done({errors, warnings});
        }

        const value = {
            less: config.value?.less,
            scss: config.value?.scss
        };
        return done({value});
    }
}
