const DynamicProcessor = global.utils.DynamicProcessor();
const {equal} = global.utils;

/**
 * Actually it is required to know if the bundle is contained in a module with a txt bundle
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.bundle.packager.code.specs';
    }

    #value;
    get value() {
        return this.#value;
    }

    constructor(bundle) {
        super();

        const events = ['bundle.initialised', 'bundle.change'];
        super.setup(new Map([
            ['container.bundles', {child: bundle.container.bundles, events}]
        ]))
    }

    _prepared(check) {
        const bundles = this.children.get('container.bundles').child;
        bundles.has('txt') && !check(bundles.get('txt'));
    }

    _process() {
        const bundles = this.children.get('container.bundles').child;

        const done = ({value}) => {
            if (equal(value, this.#value)) return false;
            this.#value = value;
        }

        const value = {};
        if (!bundles.has('txt')) return done({value});

        const txt = bundles.get('txt');
        const {multilanguage} = txt;
        value.txt = {multilanguage};

        return done({value});
    }
}
