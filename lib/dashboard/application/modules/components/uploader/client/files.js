function UploadFiles(parent, specs) {
    this._loaded = 0;
    this._events = new Events({bind: this});
    this._specs = specs;
    this._type = specs.type ? specs.type : 'any';

    this.regExp = /[^\w\d.]/g;
    this._errors = [];

    this.clean = () => {
        files = new Map();
        this._loaded = 0;
    };

    const loadEndEvents = [];
    let files = new Map();
    Object.defineProperty(this, 'items', {get: () => files});
    Object.defineProperty(this, 'loadendEvents', {get: () => items});
    const FILE_TYPE = Object.freeze({
        document: [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain',
            'application/pdf'
        ],
        image: ['image/png', 'image/jpeg', 'image/gif'],
        json: ['application/json'],
        zip: ['application/x-zip-compressed']
    });

    this._onload = (event) => {
        event.target.removeEventListener('load', this._onload);
        if (this._specs.onload && typeof this._specs.onload === 'function') {
            this._specs.onload(event);
        }
    };
    Array.prototype.unique = function () {
        var a = this.concat();
        for (var i = 0; i < a.length; ++i) {
            for (var j = i + 1; j < a.length; ++j) {
                if (a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    };

    /**
     * Se ejecuta cuando es validada la carga de uno de los archivos.
     *
     * Cuando verifica que los archivos cargados concuerdan con los seleccionados confirma
     * un evento de cambio
     * @param event
     * @param file
     * @private
     */
    this._onloadend = (event, file) => {
        this._loaded = this._loaded + 1;

        if (this._loaded === files.size) this._events.trigger('loadend');

        const name = file.name.replace(this.regExp, '');
        file = files.get(name);
        file.src = event.target.result;
        files.set(name, file);

        loadEndEvents.push(event);

        event.target.removeEventListener('onloadend', this._onloadend);
        parent.events.trigger('file.loaded');

        if (this._specs.onloadend && typeof this._specs.onloadend === 'function') {
            this._specs.onload(event);
        }
    };

    this._onerror = event => console.error(4, event);

    this.validate = file => {
        const isValid = !!FILE_TYPE[this._type].find(item => item === file.type);
        if (!isValid) {
            this._errors.push(file.name.replace(this.regExp, ''));
        }
        return isValid;
    };

    /**
     * Read a file  to be loaded
     *
     * @param file
     * @returns {Promise<void>}
     * @private
     */
    this._readFile = async file => {
        if (this._type !== 'any') {
            const isValid = await this.validate(file);
            if (!isValid) {
                this._events.trigger('error');
                return;
            }
        }

        const reader = new FileReader();
        reader.onload = (event) => this._onload(event);
        reader.onloadend = (event) => this._onloadend(event, file);
        reader.onerror = (event) => this._onerror(event);
        reader.readAsDataURL(file);
    };

    this._validateLoad = () => {
        if (this._loaded === files.size) {
        }
    };

    /**
     * Is fire when the input[type=file] change his value.
     *
     * @param event
     * @returns {Promise<void>}
     */

    this.getFiles = async fileList => {
        for (let i = 0; i < fileList.length; ++i) {
            const file = fileList[i];
            files.set(file.name.replace(this.regExp, ''), file);
            await this._readFile(file);
        }
    };

    this.onChangeInput = event => {
        this.clean();
        const target = event.currentTarget;
        this._total = target.files.length;
        this._loaded = 0;
        this.getFiles(target.files);
    }

    Object.defineProperty(this, 'entries', {get: () => files});
    Object.defineProperty(this, 'total', {get: () => this._loaded});
}
