const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

/**
 * Actually it is required to know if the bundle is contained in a module with a txt bundle
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.packager.code.specs';
    }

    #packager;

    #value;
    get value() {
        return this.#value;
    }

    constructor(packager) {
        super();
        this.#packager = packager;

        const events = ['bundle.initialised', 'bundle.change'];
        super.setup(new Map([
            ['container.bundles', {child: packager.bundle.container.bundles, events}]
        ]))
    }

    _prepared(check) {
        const bundles = this.children.get('container.bundles').child;
        bundles.has('txt') && !check(bundles.get('txt'));
    }

    _process() {
        const bundles = this.children.get('container.bundles').child;

        const value = {};

        const {distribution, bundle} = this.#packager;
        const {platform, local} = distribution;
        if (bundle.container.is === 'module' && ['node', 'ssr', 'backend'].includes(platform)) {
            value.module = local ? {dirname: bundle.path} : {};
        }

        const done = ({value}) => {
            if (equal(value, this.#value)) return false;
            this.#value = value;
        }

        if (!bundles.has('txt')) return done({value});

        const txt = bundles.get('txt');
        const {multilanguage} = txt;
        value.txt = {multilanguage};

        return done({value});
    }
}
