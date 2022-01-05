require('colors');
const {join} = require('path');
const TYPES = require('./types');
module.exports = class Processor extends require('../../../file-manager') {
    files = ["*"];
    path = 'ts';
    bundle;
    #type;
    #skeleton;

    get type() {
        return this.#type;
    }

    #name;
    get name() {
        return this.#name;
    }

    constructor(bundle, processor, specs) {
        super(bundle.file.file, processor);
        this.bundle = bundle;
        this.#name = processor;
        this.#type = processor;
        //if the bundle property comes in the specs it overwrites the model that was previously set
        specs.bundle && delete specs.bundle;

        this.skeleton = specs.skeleton;
        this.#skeleton = specs.skeleton;
        if (specs) this._checkProperties(specs);

    }

    /***
     * Returns all writable processor properties
     * @returns {{}}
     */
    getProperties() {
        const json = {};
        this.#skeleton.forEach(property => json[property] = this[property]);
        return json;
    }

    async create() {
        const tplPath = await this.templatesPath();
        const finalPath = join(tplPath, 'bundles', this.bundle.type, this.#name)
        const {fs} = global.utils;
        /**
         * if the folders exists the process is ignored.
         */
        if (!await fs.exists(this.file.file)) {
            this._fs.copy(finalPath, join(this.file.file))
        }
    }

    async createFile({name, dirname}) {
        const dest = join(this.file.file, name);
        const content = await this._fs.readFile(dirname, 'utf8');
        this.file.write(content, dest);
    }

    async build() {
        await this.create();
        if (!this.#name) console.error("error".red, this);
    }
}
