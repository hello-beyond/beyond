const {ipc, FinderCollection} = global.utils;

module.exports = class extends FinderCollection.Item {
    #processor;

    get id() {
        const {specs, name} = this.#processor;
        return `${specs.bundle.id}//${name}//${this.relative.file}`;
    }

    get is() {
        return 'source';
    }

    get url() {
        const {specs: {bundle}, name} = this.#processor;
        return `/${bundle.pathname}[${name}]/src/${this.relative.file}`;
    }

    constructor(collection, file) {
        super(collection, file);
        this.#processor = collection.processor;
    }

    _notify() {
        let table = 'processors-sources';
        let {bundle: {id}} = this.#processor.specs;
        id = id.split('//').pop();
        id.includes('template.') && (table = `${id.replace('.', '-')}-sources`);

        ipc.notify('data-notification', {
            type: 'record/update',
            table: table,
            id: this.id
        });
    }
}
