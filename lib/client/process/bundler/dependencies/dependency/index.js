const DynamicProcessor = global.utils.DynamicProcessor();

/**
 * The Dependency object required by:
 *   . The processors (actually it is being used by the "ts" processor)
 *   . The dependencies collection of the Bundle and Transversal objects
 */
module.exports = class extends DynamicProcessor {
    get dp() {
        return 'bundler.dependency';
    }

    #resource;
    get resource() {
        return this.#resource;
    }

    #packager;
    #propagator;

    get id() {
        return `${this.#packager.id}//dependency//${this.resource}`;
    }

    get distribution() {
        return this.#packager.distribution;
    }

    get language() {
        return this.#packager.language;
    }

    get seeker() {
        return this.children.get('seeker').child;
    }

    get errors() {
        return this.seeker.errors;
    }

    get valid() {
        return !this.errors.length;
    }

    get external() {
        return this.seeker.external;
    }

    get node() {
        return this.seeker.node;
    }

    get bundle() {
        return this.seeker.bundle;
    }

    get kind() {
        if (!this.seeker.valid) return;
        if (this.node) return this.node;
        if (this.external) return 'external';

        const {bundle} = this.seeker;
        const transversal = !!global.bundles.get(bundle.name).Transversal;
        return transversal ? 'transversal' : 'bundle';
    }

    get pathname() {
        if (this.external || this.node) {
            const {platform, bundles} = this.distribution;
            const {mode} = bundles;
            const root = mode === 'es6' && !['web', 'android', 'ios'].includes(platform) ? 'packages/' : '';
            return root + this.#resource;
        }
        else {
            return this.bundle?.pathname;
        }
    }

    #declaration;
    get declaration() {
        return this.#declaration;
    }

    // What kind of dependency it is ('import' | 'type' | 'reference')
    #is = new Set();
    get is() {
        return this.#is;
    }

    /**
     * Processor dependency constructor
     *
     * @param resource {string} The dependency resource
     * @param packager {{application: object, distribution: object, language: string}}
     */
    constructor(resource, packager) {
        if (!resource || !packager?.id || !packager.application || !packager.distribution || !packager.language) {
            throw new Error('Invalid parameters');
        }

        super();
        this.#resource = resource;
        this.#packager = packager;

        const {application, distribution} = packager;
        const seeker = application.modules.seekers.create(resource, distribution);
        super.setup(new Map([['seeker', {child: seeker}]]));

        this.#propagator = new (require('./propagator'))(seeker, this._events);
        this.#declaration = new (require('./declaration'))(application, this);
    }

    toJSON() {
        return {
            resource: this.#resource,
            is: [...this.#is]
        }
    }

    destroy() {
        super.destroy();
        this.#propagator.unsubscribe();
    }
}
