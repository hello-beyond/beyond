module.exports = class extends global.Dependencies {
    get dp() {
        return 'jsx.dependencies';
    }

    constructor(packager) {
        const hash = new (require('./hash'))();
        super(packager, hash);
    }

    _update() {
        const errors = [], updated = new Map();

        const add = resource => {
            if (this.has(resource)) return;

            const dependency = this._create(resource);
            dependency.is.add('import');
            updated.set(resource, dependency);
        };
        add('react');
        add('react-dom');

        return {updated, errors};
    }
}
