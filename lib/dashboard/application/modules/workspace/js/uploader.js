class UploaderController extends ReactiveModel {
    _uploader;
    get uploader() {
        return this._uploader;
    }

    _workspace;
    _model;

    get application() {
        return this._workspace?.application;
    }

    _ready;
    get ready() {
        return this._ready;
    }

    _interval;
    _items = new Map;
    get items() {
        return this._items;
    }

    constructor(workspace) {
        super();

        this._workspace = workspace;
        this._loadEnd = this._loadEnd.bind(this);
        this.loadImages = this.loadImages.bind(this);
        this.load();
    }

    load() {
        const uploader = new JidaUploader({
            type: 'image',
            name: 'images',
            params: {},
            url: ` http://localhost:8080/uploader`,//TODO @ftovar tomar el puerto correcto de la app
            input: {name: 'images', multiple: true}
        });
        this._uploader = uploader;
        uploader.bind('loadend', this._loadEnd);
        uploader.bind('file.loaded', this.loadImages);
        this._ready = true;
    }

    loadImages() {
        const {files} = this.uploader;
        files.items.forEach((item, key) => this.items.set(key, item));
        clearInterval(this._interval);
        this._interval = window.setTimeout(this.triggerEvent, 0);
    }

    create(selector, dragAndDrop = undefined, model) {
        this._model = model;
        this.uploader.create(selector);
        if (dragAndDrop) this.uploader.addDragAndDrop(dragAndDrop)
        this.triggerEvent();
    }

    deleteItem(name) {
        const item = this.items.get(name);
        item.delete();
        this.items.delete(name);
        this.triggerEvent();
    }

    async _loadEnd() {
        try {
            this._fetching = true;
            this.triggerEvent();

            const model = this._model;
            const getType = () => {
                if (model.table.name === 'applications') return 'application';
                return model.table.name === 'modules' ? 'module' : 'overwrite';
            }

            const type = getType();
            type !== 'overwrite' && await model.checkStatic();

            const specs = {id: model.id, type: type};
            const response = await this._uploader.publish(specs);
            for (const item of response.data) {
                if (!item.name) continue;

                const instance = this.getInstance(type, item);
                // console.log('type', type, item.name, 'instance', instance)
                type === 'overwrite' && model.upload({origin: model.filename, overwrite: item.name});

                //No existe el item ya que es un overwrite lo que se esta cargando
                if (!instance) continue;

                const update = async () => {
                    console.log('addImage update ', item.name, instance.landed, type, instance)
                    if (!instance.found) return;
                    this.items.set(item.name, instance);

                    // console.log('addImage update 2', instance.landed, type, instance)
                    instance.off('change', update);
                    this.triggerEvent();
                }
                instance.on('change', update);
                instance.fetch();
            }

            this._fetching = false;
            this.triggerEvent();
            this.triggerEvent('loadSuccess');
        }
        catch (e) {
            console.error(e);
        }
    }

    getInstance(type, item) {
        if (type === 'overwrite') return;

        const id = type === 'module' ? this._model.id : `application//${this._model.id}`;
        const specs = {identifier: {id: `${id}//${item.name}`}};
        const Model = type === 'module' ? ModuleStatic : ApplicationStatic;
        return new Model(specs);
    }
}
