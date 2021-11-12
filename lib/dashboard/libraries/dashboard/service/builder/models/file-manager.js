const {join} = require('path');

class FileManager {
    _id;
    _fileName;
    _exists;
    _enconding = 'utf-8';
    _content;
    _path;
    _filePath;
    _fs = global.utils.fs;
    skeleton = [];
    _reserved = [];

    constructor(path) {
        if (path) this._path = path;
    }

    get exists() {
        return this._exists;
    }

    get path() {
        return this._path;
    }

    set encoding(encoding) {
        this._enconding = encoding;
    }

    /**
     * Shortcut to access a path.join
     */
    joinPath() {
        try {
            return require('path').join(...arguments);
        }
        catch (e) {
            console.trace("error".red, ...arguments);
            console.error(e)
        }
    }

    ipc() {
        return require('../../ipc-manager');
    }

    /**
     * Returns the path of the beyond template files
     * @returns {Promise<*>}
     */
    async templatesPath() {
        return this.ipc().main('templates');
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
        const content = this.readJSON();

        this._checkProperties(content);
    }

    /**
     * Return the absolute path of the file.x
     * @param file
     * @returns {*}
     * @private
     */
    _getFilePath(file = this._fileName) {
        if (file) return join(this.path, file);
        return this.path;
    }

    /**
     * check if file exist
     */
    validate(file = undefined) {
        if (!file) file = this._fileName;

        const {existsSync} = require('fs');
        this._exists = existsSync(this._getFilePath(file));

        return this._exists;
    }

    /**
     * Read a file in the specific path and returns it contents
     *
     * @param {string} path Path of the file
     * @returns {string} content. The file content
     */
    read(path = undefined) {
        let instanced = !path;
        if (!path && !this.path) {
            throw Error('Is necessary a path');
        }
        path = this._getFilePath(this._fileName);

        const {readFileSync} = require('fs');
        let content = readFileSync(path, {encoding: this._enconding, flag: 'r'});
        if (instanced) this._content = content;
        return content;
    }

    /**
     * Read a file and return his content in JSON Format.
     *
     * The functions needs to read a file with a json content,
     * only made a JSON.parse action.
     * @param path
     * @returns {any}
     */
    readJSON(path) {
        const content = this.read(path);
        return JSON.parse(content);
    }

    getContent(json = false) {
        if (json && this._content) return JSON.parse(this._content);
        return this._content;
    }

    _writeJSON(path, content) {
        return this._write(path, JSON.stringify(content, null, 2));
    }

    _write(path, content) {
        if (!path) {
            console.trace("error".red)
            return;
        }

        const fs = global.utils.fs;
        return fs.save(path, content, this._enconding);
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
        this._writeJSON(this._getFilePath(), this.getProperties());
    }

    /**
     * checks if the object passed has properties of the object and assigns the values.
     *
     * @param specs
     * @private
     */
    _checkProperties(specs) {
        for (const property in specs) {
            if (!specs.hasOwnProperty(property) || this?._reserved?.includes(property)) continue;
            if (this.hasOwnProperty(`_${property}`)) {
                this[`_${property}`] = specs[property];
                continue;
            }
            if (this.hasOwnProperty(property)) this[property] = specs[property];
        }
    }

    /**
     * Return a json with the skeleton values of the object
     * @returns object
     */
    getProperties(skeleton = undefined) {
        const json = {};
        skeleton = skeleton ? skeleton : this.skeleton;
        skeleton.forEach(property => {
            if (this.hasOwnProperty([`_${property}`]) && this[`_${property}`]) json[property] = this[`_${property}`];
        });

        return json;
    }
}

module.exports = FileManager;