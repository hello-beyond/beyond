const {join} = require('path');

class Index {
    _id;
    _fileName;
    _exists;
    _filePath;
    _fs = global.utils.fs;
    skeleton = [];
    _reserved = [];
    #file;
    #templates;

    get file() {
        return this.#file;
    }

    constructor(path) {
        if (path) this.#path = path;
        this.#file = new (require('./file'))(path);
        this.#templates = (require('../templates')).get();
    }

    get exists() {
        return this._exists;
    }

    #path;
    get path() {
        return this.#path;
    }

    set path(value) {
        this.#path = value;
    }

    set encoding(encoding) {
        this._enconding = encoding;
    }

    ipc() {
        return require('../../../ipc-manager');
    }

    /**
     * Returns the path of the beyond template files
     * @returns {Promise<*>}
     */
    async templatesPath() {
        return this.#templates.path;

    }

    /**
     * Load the content of the file
     *
     * This method is used in the constructor, It checks if in the path
     * exists a file for the object instanced and get his content.
     * @private
     */
    _load() {
        if (!this.validate()) return;
        const content = this.#file.readJSON();
        this._checkProperties(content);
    }

    /**
     * check if file exist
     */
    validate(file = undefined) {
        if (!file) file = this._fileName;

        const {existsSync} = require('fs');
        this._exists = existsSync(this.#file.getPath(file));

        return this._exists;
    }

    /**
     * Set a property of the object
     * @param property
     * @param value
     */
    set(property, value) {
        const key = `_${property}`;
        if (this.hasOwnProperty(key)) {
            this[key] = value;
        }
    }

    /**
     * update a json file
     *
     * @param {object} values Values to update, if the value is not passed the
     * method will writes the values in the object
     */
    save(values) {
        if (typeof values === 'object') this._checkProperties(values);
        console.log(16, this.getProperties())
        this.#file.writeJSON(this.#file.getPath(this._fileName), this.getProperties());
    }

    /**
     * checks if the object passed has properties of the object and assigns the values.
     *
     * @param specs
     * @private
     */
    _checkProperties(specs) {
        if (!specs) return;
        const types = {
            boolean: value => !!value,
            string: value => String(value),
            object: value => {
                if (typeof value === 'object') return value;
                return {};
            },
            array: value => {
                if (Array.isArray(value)) return value;
                return [];
            },
            number: value => Number(value)
        }
        Object.keys(specs).forEach(property => {
            if (this?._reserved?.includes(property)) return;
            property = this.skeleton.find(item => item === property || item?.name === property);
            if (!property) return;

            if (typeof property === 'object') {
                const {name, type} = property;
                this[name] = type ? types[type](specs[name]) : specs[name];
                return;
            }

            this[property] = specs[property];
        });

    }

    /**
     * Return a json with the skeleton values of the object
     * @returns object
     */
    getProperties(skeleton = undefined) {
        const json = {};
        skeleton = skeleton ? skeleton : this.skeleton;
        skeleton.forEach(property => {
            const name = typeof property === 'object' ? property.name : property;
            if (![undefined, NaN, null].includes(this[name])) json[name] = this[name];
        });
        return json;
    }
}

module.exports = Index;
