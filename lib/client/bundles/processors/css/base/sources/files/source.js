const {FinderCollection, ipc} = global.utils;

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
        let table = 'processors-sources';
        const {id} = this.#specs.bundle;
        id.includes('//template.global') && (table = `template-global-sources`);
        id.includes('//template.processors') && (table = `template-processors-sources`);
        id.includes('//template.application') && (table = `template-application-sources`);

        ipc.notify('data-notification', {
            type: 'record/update',
            table: table,
            id: this.id
        });
    }
}