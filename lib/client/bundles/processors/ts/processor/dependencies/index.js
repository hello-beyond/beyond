module.exports = class extends global.ProcessorAnalyzerDependencies {
    get dp() {
        return 'ts.dependencies';
    }

    #declarations;
    get declarations() {
        return this.#declarations;
    }

    constructor(processor) {
        super(processor, require('./dependency'), require('./propagator'));
        this.#declarations = new (require('./declarations'))(this);
    }

    _update() {
        const {errors, updated} = super._update();
        if (errors?.length) return {errors};

        // Add beyond core if not previously added
        (() => {
            // All 'ts' bundles depend on beyond/core, except the hydrator and beyond/core itself
            const core = '@beyond-js/kernel/core/ts';
            const hydrator = '@beyond-js/ssr/hydrator/ts';

            const {bundle} = this.processor.specs;
            if ([core, hydrator].includes(bundle.resource) || updated.has(core)) return;

            if (this.has(core)) {
                const bundle = this.get(core);
                bundle.is.add('import');
                updated.set(core, bundle);
                return;
            }

            const dependency = this._create(core);
            dependency.is.add('import');
            updated.set(core, dependency);
        })();

        return {updated};
    }

    destroy() {
        super.destroy();
        this.#declarations.destroy();
    }
}
