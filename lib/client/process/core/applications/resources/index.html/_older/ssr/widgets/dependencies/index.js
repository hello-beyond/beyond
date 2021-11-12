const DynamicProcessor = global.utils.DynamicProcessor(Map);

module.exports = class extends DynamicProcessor {
    get dp() {
        return 'application.resources.index.ssr.dependencies';
    }

    #errors = [];
    get errors() {
        return this.#errors;
    }

    get valid() {
        return !this.#errors.length;
    }

    constructor(bundle, distribution) {
        super();
        const packagers = new (require('../packagers'))(bundle, distribution);
        const subscriptions = ['item.initialised', 'item.change'];
        super.setup(new Map([['packagers', {child: packagers, events: subscriptions}]]));
    }

    _prepared(check) {
        const packagers = this.children.get('packagers').child;
        packagers.forEach(({packager}) => check(packager));
    }

    async _process() {
        const packagers = this.children.get('packagers').child;

        const errors = this.#errors = [];
        this.clear();
        if (!packagers.valid) {
            this.#errors = packagers.errors;
            return;
        }

        packagers.forEach(({packager, dependency}) =>
            !packager.valid && errors.push(`Dependency "${dependency.resource}" is not valid`));

        if (errors.length) {
            this.#errors = errors;
            return;
        }

        const updated = new Map();
        packagers.forEach(({packager, dependency}) => {
            let {resource, bundle} = dependency;

            // The resource should be /libraries/... or /module_path/...
            resource = resource.startsWith('beyond_libraries/') ?
                `/${resource.substr(7)}.js` :
                (resource.startsWith('beyond_modules/') ? `/${bundle.pathname}.js` : resource);

            updated.set(resource, packager.code.inline);
        });

        updated.forEach((value, key) => this.set(key, value));
    }
}
