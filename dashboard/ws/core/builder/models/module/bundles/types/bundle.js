const {Processors} = require('../processors');
const {join, resolve} = require('path');
module.exports = class Bundle extends require('../../../file-manager') {
    _created;

    #processors;
    _create;

    skeleton = ['hmr', 'ts', 'name'];
    /**
     * Name of the bundle type
     * @private
     */
    _type;
    get type() {
        return this._type;
    }

    /**
     * The basename of the bundle represents the folder where it's contained
     * @returns {*}
     */
    get path() {
        return this.file.basename;
    }

    /**
     * Bundle constructor
     *
     *
     * @param module The module object where the bundle is located
     * @param dirname
     * @param basename
     * @param specs parameters to set in the bundle class
     */
    constructor(dirname, basename, specs = {}) {
        super(dirname, basename);
        this.#processors = new Processors(this, specs);
        this.setValues(specs);
    }

    get identifier() {
        return this._identifier;
    }

    setValues(specs) {
        this._checkProperties(specs, true);
        this.#processors.TYPES.forEach((properties, processor) => {
            const has = specs.hasOwnProperty(processor) || specs?.processors?.includes(processor);
            if (!has) return;
            specs = Object.assign({skeleton: properties}, specs)
            this.#processors.add(processor, specs);
        });
        if (specs.bundle) this._type = specs.bundle;

    }

    /**
     * Build the bundle module structure
     *
     * The method must be called to create correctly the bundle, is the charge to
     * create directories and files required
     * @returns {Promise<void>}
     */
    async build() {
        const promises = [];
        //check default files
        const tplPath = await this.templatesPath();
        const {fs} = global.utils;
        const path = join(tplPath, this._type);

        if (!fs.exists(path)) {
            throw new Error(`Template for ${this._type} bundle not found.`)
        }
        this.#processors.items.forEach(processor => promises.push(processor.build()));
        if (promises.length) return Promise.all(promises);
    }

    getProperties() {
        const props = super.getProperties();
        this.#processors.items.forEach(processor => props[processor.type] = processor.getProperties());
        return props;
    }

    update(specs) {
        this.validateSpecs(specs);
    }

}
