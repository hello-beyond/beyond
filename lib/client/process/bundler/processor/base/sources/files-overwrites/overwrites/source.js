const {ipc} = global.utils;
const {FinderCollection} = global.utils;

module.exports = class extends FinderCollection.Item {
    #processor;

    get id() {
        const {specs, name} = this.#processor;
        return `${specs.bundle.id}//${name}//${this.relative.file}`;
    }

    get is() {
        return 'overwrite';
    }

    get url() {
        const {specs: {bundle}, name} = this.#processor;
        return `/${bundle.pathname}[${name}]/src/overwrites/${this.relative.file}`;
    }

    constructor(collection, file) {
        super(collection, file);
        this.#processor = collection.processor;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-overwrites',
            id: this.id
        });
    }
}
