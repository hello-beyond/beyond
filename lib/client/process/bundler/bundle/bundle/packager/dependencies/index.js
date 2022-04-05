module.exports = class extends global.Dependencies {
    get dp() {
        return 'bundler.bundle.dependencies';
    }

    constructor(bundle) {
        const hash = new (require('./hash'))(bundle);
        super(bundle, hash);
    }

    _prepared(check) {
        if (this.updated) return;

        if (!this.children.has('processors')) {
            const events = ['dependencies.initialised', 'dependencies.change',
                'dependency.initialised', 'dependency.change'];
            const {processors} = this.container;
            super.setup(new Map([['processors', {child: processors, events}]]));
            if (!check(processors)) return false;
        }

        const processors = this.children.get('processors').child;
        processors.forEach(({packager}) => {
            if (!packager) return;
            const {dependencies} = packager.processor;
            dependencies && check(dependencies) && dependencies.forEach(dependency => check(dependency))
        });
    }

    _update() {
        const errors = [], updated = new Map();

        const processors = this.children.get('processors').child;
        processors.forEach(({packager}) => {
            if (!packager) return;
            const {dependencies} = packager.processor;
            if (!dependencies) return;

            dependencies.forEach(({valid, resource, is}) => {
                if (!valid) {
                    errors.push(`Dependency "${resource}" is invalid`);
                    return;
                }

                const dependency = this.has(resource) ? this.get(resource) : this._create(resource);
                is.forEach(type => dependency.is.add(type));
                updated.set(resource, dependency);
            });
        });

        return {errors, updated};
    }

    //TODO @ftovar metodo inactivo hasta que se cree el modelo para manejar las dependencias desde el bundle
    // la cual tendra la sumatoria de las dependencias de los procesadores de dicho bundle
    // _notify() {
    //     let id = this.packager.id.split('//');
    //     id = id.slice(0, id.length - 2).join('//');
    //     ipc.notify('data-notification', {
    //         type: 'list/update',
    //         table: 'bundles-dependencies',
    //         filter: {processor: id}
    //     });
    // }
}
