class UIController extends ReactiveModel {
    _uploader;
    get uploader() {
        return this._uploader;
    }

    _items = new Map;
    get items() {
        return this._items;
    }

    get ready() {
        true;
    }

    _module;
    _application;

    constructor() {
        super();
        this.loadImages = this.loadImages.bind(this);
        this.checkItems = this.checkItems.bind(this);

        const id = {
            application: 1917723684,
            module: 'application//1917723684//static-test'
        };
        this._module = new Module({identifier: {id: id.module}});
        this._application = new Application({identifier: {id: id.application}});

        this.load();
    }

    checkItems() {
        this.triggerEvent();
    }

    load() {
        const params = {
            application: {
                id: this._application.id,
                type: 'application'
            },
            module: {
                id: this._module.id,
                type: 'module',
            },
            overwrite: {
                id: this._module.id,
                type: 'overwrite',
                image: 'static/jida.png'
            }
        };

        const uploader = new JidaUploader({
            type: 'image',
            name: 'images',
            params: {},
            url: `http://localhost:8080/uploader`,
            input: {
                name: 'images',
                multiple: true
            }
        });
        this._uploader = uploader;
        uploader.bind('file.loaded', this.loadImages);
        uploader.bind('loadend', async (event) => {
            try {
                this._processing = true;
                this.triggerEvent();

                //validamos la ruta static del modulo
                await this._module.checkStatic();
                //TODO aqui debo llamar cuando es overwrite para agregar la entrada

                //validamos la ruta static de la applicacion
                await this._application.checkStatic();

                const response = await uploader.publish(params.application);
                response.data.forEach(item => {
                    if (item.originalName) {
                        const instance = new MediaItem();
                        instance.loadFromLocale(item);
                        this.items.set(item.originalName, instance);
                    }
                });
                this._processing = false;
                this.triggerEvent();

            }
            catch (e) {
                console.error(e)
            }
        });
    }

    _interval;

    loadImages() {
        const {files} = this.uploader;
        this.uploader.files.items.forEach((item, key) => {
            this.items.set(key, item)
        });

        clearInterval(this._interval);
        this._interval = window.setTimeout(() => {
            this.triggerEvent();
        }, 0);
    }

    create(selector, draganddrop) {
        this.uploader.create(selector);
        this.uploader.addDragAndDrop(draganddrop)
        this.triggerEvent();
    }

    deleteItem(name) {
        const item = this.items.get(name);
        item.remove();
        this.items.delete(name);
        this.triggerEvent();
    }
}
