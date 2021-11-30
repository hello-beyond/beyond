const {ipc} = global.utils;
const {FinderCollection} = global.utils;

module.exports = class extends FinderCollection.Item {
    #specs;

    get id() {
        return `${this.#specs.bundle.id}//txt//${this.relative.file}`;
    }

    get is() {
        return 'overwrite';
    }

    constructor(collection, file) {
        super(collection, file);
        this.#specs = collection.specs;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-overwrites',
            id: this.id
        });
    }
}
