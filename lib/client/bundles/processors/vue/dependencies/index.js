module.exports = class extends global.Dependencies {
    get dp() {
        return 'vue.dependencies';
    }

    constructor(processor) {
        const hash = new (require('./hash'))();
        super(processor, hash);
    }

    _update() {
        const errors = [], updated = new Map();

        const add = resource => {
            if (this.has(resource)) return;

            const dependency = this._create(resource);
            dependency.is.add('import');
            updated.set(resource, dependency);
        };
        add('vue');

        return {updated, errors};
    }
}
