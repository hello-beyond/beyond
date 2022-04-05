function MobileFiles(specs) {

    this._loaded = 0;
    let files = new Map();
    let base64;
    const events = new Events({'bind': this});
    this._events = events;
    this._specs = specs;

    this._errors = [];

    this.clean = () => {
        files = new Map();
        this._loaded = 0;
    };

    this.getFiles = async (data) => {

        this.clean();

        base64 = data.url;
        this._events.trigger('loading');

        const [dir, filename] = data.name.split('com.jidadesarrollos.bovino/cache/');
        files.set(filename, data.url);
        this._events.trigger('loadend');

    };

    Object.defineProperty(this, 'base64', {'get': () => base64});
    Object.defineProperty(this, 'entries', {'get': () => files});
    Object.defineProperty(this, 'total', {'get': () => files.size});

}
