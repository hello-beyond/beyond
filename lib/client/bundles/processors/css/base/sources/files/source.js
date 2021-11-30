const {ipc} = global.utils;
const {FinderCollection} = global.utils;

module.exports = class extends FinderCollection.Item {
    #specs;
    #processorName;

    get id() {
        return `${this.#specs.bundle.id}//${this.#processorName}//${this.relative.file}`;
    }

    get is() {
        return 'source';
    }

    constructor(collection, file) {
        super(collection, file);
        this.#specs = collection.specs;
        this.#processorName = collection.processorName;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-sources',
            id: this.id
        });
    }
}
