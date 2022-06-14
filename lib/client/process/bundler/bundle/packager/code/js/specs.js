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
        super.setup(new Map([['container.bundles', {child: packager.bundle.container.bundles}]]));
    }

    _prepared(require) {
        const bundles = this.children.get('container.bundles').child;
        bundles.has('txt') && !require(bundles.get('txt'));
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
            const changed = equal(this.#value, value);
            this.#value = value;
            return changed;
        }

        if (!bundles.has('txt')) return done({value});

        const txt = bundles.get('txt');
        const {multilanguage} = txt;
        value.txt = {multilanguage};
        return done({value});
    }
}
