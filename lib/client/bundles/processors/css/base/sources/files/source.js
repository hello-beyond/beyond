const {FinderCollection, ipc} = global.utils;

module.exports = class extends FinderCollection.Item {
    #specs;
    #processorName;

    //TODO para los sources del template/processors se esta agregando el procesador desde el bundle.id
    // hay que quitarlo ya que aqui se agrega luego de los datos de la app
    get id() {
        let {application, bundle: {id}} = this.#specs;
        id.includes('template//') && (id = id.replace(id, `${id}//${application.id}`));
        return `${id}//${this.#processorName}//${this.relative.file}`;
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
        id.includes('template//') && (table = `${id.replace('//', '-')}-sources`);

        ipc.notify('data-notification', {
            type: 'record/update',
            table: table,
            id: this.id
        });
    }
}