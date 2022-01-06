class NotificationModel {
    _id;
    get id() {
        return this._id;
    }

    _count = 1;
    get count() {
        return this._count;
    }

    _type;
    get type() {
        return this._type;
    }

    _message;
    get message() {
        return this._message;
    }

    _character;
    get character() {
        return this._character;
    }

    _file;
    get file() {
        return this._file;
    }

    _line;
    get line() {
        return this._line;
    }

    set total(value) {
        this._total = value;
    }

    _bundle;
    get bundle() {
        return this._bundle;
    }

    _module;
    get module() {
        return this._module;
    }

    _application;
    get application() {
        return this._application;
    }

    constructor(item, specs) {
        this._module = specs?.module;
        this._bundle = specs?.bundle;
        this._application = specs?.application;

        for (let key in item) {
            if (!item.hasOwnProperty(key)) {
                return;
            }
            this[`_${key}`] = item[key];
        }
    }

    getters() {
        return {
            id: this.id,
            count: this.count,
            type: this.type,
            message: this.message,
            character: this.character,
            file: this.file,
            line: this.line,
            bundle: this.bundle,
            module: this.module,
            application: this.application,
        }
    }
}