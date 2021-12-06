const {FinderCollection, ipc} = global.utils;
const Source = require('./source');

module.exports = class extends FinderCollection {
    #packager;

    get specs() {
        return this.#packager.specs;
    }

    #hash;
    get hash() {
        return this.#hash;
    }

    constructor(packager) {
        const {specs} = packager;
        const {watcher} = specs;
        super(watcher, Source, {items: {subscriptions: ['initialised', 'change']}});

        this.#packager = packager;
        this.#hash = new (require('./hash'))(this);
    }

    configure(path, config) {
        config && !config.excludes.includes('node_modules') && config.excludes.push('node_modules');
        super.configure(path, config);
    }

    _notify() {
        //TODO @ftovar @box pendiente mejora para obetener el id del procesador
        let id = this.#packager.id.split('//');
        id = id.slice(0, id.length - 2).join('//');

        ipc.notify('data-notification', {
            type: 'list/update',
            table: 'processors-sources',
            filter: {processor: id}
        });
    }
}
