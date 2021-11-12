const {ipc} = global.utils;
const {Item} = global.utils.FinderCollection;

module.exports = class extends Item {
    #specs;

    get id() {
        return `${this.#specs.bundle.id}//ts//${this.relative.file}`;
    }

    constructor(collection, file) {
        super(collection, file);
        this.#specs = collection.specs;
    }

    _notify() {
        ipc.notify('data-notification', {
            type: 'record/update',
            table: 'processors-sources',
            id: this.id
        });
    }
}
