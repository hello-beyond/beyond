const Dependencies = require('../../../../dependencies');

module.exports = class extends Dependencies {
    get dp() {
        return 'bundler.bundle.dependencies';
    }

    _prepared(check) {
        if (this.updated) return;

        if (!this.children.has('processors')) {
            const events = ['dependencies.initialised', 'dependencies.change',
                'dependency.initialised', 'dependency.change'];
            const {processors} = this.packager;
            super.setup(new Map([['processors', {child: processors, events}]]));
            if (!check(processors)) return false;
        }

        const processors = this.children.get('processors').child;
        processors.forEach(({dependencies}) => {
            dependencies && check(dependencies) && dependencies.forEach(dependency => check(dependency))
        });
    }

    _processUpdatedItems() {
        const errors = [], updated = new Map();

        const processors = this.children.get('processors').child;
        processors.forEach(({dependencies: d}) => d?.forEach(({valid, resource, is}) => {
            if (!valid) {
                errors.push(`Dependency "${resource}" is invalid`);
                return;
            }

            const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
            is.forEach(type => dependency.is.add(type));
            updated.set(resource, dependency);
        }));

        return {errors, updated};
    }
}
