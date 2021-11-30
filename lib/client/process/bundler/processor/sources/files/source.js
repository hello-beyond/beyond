const {ipc} = global.utils;
const {FinderCollection} = global.utils;

module.exports = class extends FinderCollection.Item {
    #processor;

    get id() {
        return `${this.#specs.bundle.id}//${this.#processor.name}//${this.relative.file}`;
    }

    get is() {
        return 'source';
    }

    constructor(collection, file) {
        super(collection, file);
        this.#processor = collection.processor;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-sources',
            id: this.id
        });
    }
}
