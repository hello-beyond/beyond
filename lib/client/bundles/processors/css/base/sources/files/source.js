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

    //TODO @ftovar
    // la tabla sobre la que se va a notificar va condicionada por el tipo de source
    // en el caso de los template necesitamos el id de la aplicacion para poder armar el source en el ipc
    // y retornar el source
    _notify() {
        console.log('template processor source', this.#specs.bundle.id, this.id)
        let table = this.id;
        this.id.includes('template//global/') && (table = 'template-global-sources');
        this.id.includes('template//processors/') && (table = 'template-processors-sources');
        this.id.includes('template//application/') && (table = 'template-application-sources');

        ipc.notify('data-notification', {
            type: 'record/update',
            table: table,
            id: this.id
        });
    }
}
