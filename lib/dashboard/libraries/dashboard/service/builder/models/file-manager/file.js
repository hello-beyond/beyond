const {readFileSync} = require("fs");
const {join} = require("path");
module.exports = class File {

    #file;
    #content;
    #enconding = 'utf-8';
    #path;
    get path() {
        return this.#path;
    }

    set path(value) {
        if (value === this.#path || typeof value !== 'string') return;
        this.#path = value;
    }

    set path(path) {
        this.#path = path;
    }

    get enconding() {
        return this.#enconding;
    }

    set enconding(value) {
        this.#enconding = value;
    }

    get content() {
        return this.#content;
    }

    get json() {
        try {
            return JSON.parse(this.#content);
        }
        catch (e) {
            console.error("error getting json", this.#content);
        }
    }

    constructor(path) {
        this.#path = path;
    }

    /**
     * Return the absolute path of the file.x
     * @param file
     * @returns {*}
     * @private
     */
    getPath(file) {
        if (file) {
            this.#file = file;
            return join(this.path, file);
        }
        return this.path;
    }

    read(path) {
        let instanced = !path;
        if (!path && !this.path) {
            throw Error('Is necessary a path');
        }
        path = this.getPath(this.#file);
        const {readFileSync} = require('fs');
        let content = readFileSync(path, {encoding: this._enconding, flag: 'r'});
        if (instanced) this.#content = content;
        return content;
    }

    readJSON(path) {
        this.read(path);
        return this.json;
    }

    write(path, content) {
        if (!content) content = this.#content;
        const fs = global.utils.fs;
        return fs.save(path, content, this.#enconding);
    }

    writeJSON(path, content) {
        // return console.log(content);
        return this.write(path, JSON.stringify(content, null, 2));

    }

}
