const Files = require('./files');
const Processor = require('./processor');
module.exports = class Bundle extends require('../../file-manager') {
    _validProcessors = ["jsx", "ts", "scss", "less"];

    _hmr;
    _created;
    _existingProcessors;
    _processorsTypes = ['ts', 'less', 'scss'];
    _processorsMap = new Map();
    _create;
    /**
     * Name of the bundle type
     * @private
     */
    _type;

    /**
     * Bundle constructor
     *
     *
     * @param module The module object where the bundle is located
     * @param path the path of the module.
     * @param specs parameters to set in the bundle class
     */
    constructor(module, path, specs = {}) {
        super(path);

        this._module = module;
        this.validateSpecs(specs);
        this._type = specs.bundle;
    }

    get type() {
        return this._type;
    }

    get identifier() {
        return this._identifier;
    }

    get path() {
        return this._path;
    }

    setValues(specs) {
        this._checkProperties(specs, true);

        for (let processorName of this._validProcessors) {
            const has = specs.hasOwnProperty(processorName) || specs?.processors?.includes(processorName);
            if (!has) continue;
            if (!this._processorsMap.has(processorName)) {
                this._processorsMap.set(processorName, new Processor(specs[processorName]));
                continue;
            }
            const processor = this._processorsMap.get(processorName);
            processor._checkProperties(specs[processorName]);
        }
    }

    validateSpecs(specs) {
        this._checkProperties(specs);

        for (let processorName of this._validProcessors) {
            const has = specs.hasOwnProperty(processorName) || specs?.processors?.includes(processorName);
            if (!has) continue;

            const processorPath = specs.bundlePath === true ? `${specs.bundle}/${processorName}` : processorName;

            let attr = {path: processorPath};
            attr = Object.assign(attr, specs.hasOwnProperty(processorName) ? specs[processorName] : specs);
            const processor = new Processor(this, processorName, attr);

            this._processorsMap.set(processorName, processor);
        }

        if (specs.bundle) this._type = specs.bundle;
    }

    addProcessor(processor) {
        if (this._processorsMap.has(processor)) return;

        this._processorsMap.set(processor, new Processor(this, processor, {path: processor}));
        if (!this.skeleton.includes(processor)) this.skeleton.push(processor);
    }

    addProcessors(processors) {
        processors.forEach(processor => this.addProcessor(processor));
    }

    checkProcessors(processors) {
        if (!processors?.length) return;
        for (const processor of processors) {
            // The processor is included only if is defined as a processorType and is not
            // included by default in the bundle
            if (!this._processorsMapTypes.includes(processor)) continue;
            this.addProcessor(processor)
        }
    }

    /**
     * Build the bundle module structure
     *
     * The method must be called to create correctly the bundle, is the charge to
     * create directories and files required
     * @param path
     * @returns {Promise<void>}
     */
    async build(path) {
        const promises = [];
        //check default files
        const tplPath = await this.templatesPath();

        if (Files.hasOwnProperty(this._type)) {
            const files = Files[this._type]['ts'];
            files.forEach(file => {
                const dirname = this.joinPath(tplPath, 'bundles', this._type, 'ts', file);
                this._processorsMap.get('ts').addFile({dirname: dirname, name: file});
            });
        }

        this._processorsMap.forEach(processor => promises.push(processor.build()));
        if (promises.length) return Promise.all(promises);
    }

    /**
     * Generates the files required by the bundle
     * @param processor
     * @param overwrite
     * @param files
     * @returns {Promise<void>}
     * @deprecated
     */
    async generateFiles(processor, overwrite, files = []) {
        const tplPath = await this.templatesPath();
        for (const file of files) {
            const tpl = this.joinPath(tplPath, 'bundles', this.identifier, `${file.split('.')[0]}.txt`)

            const content = await this._fs.readFile(tpl, 'utf8');
            const dest = this.joinPath(this.path, processor, file)
            this._write(dest, content);
        }
    }

    getProperties() {
        const props = super.getProperties();
        this._processorsMap.forEach((processor, key) => props[key] = processor.getProperties());
        return props;
    }

    update(specs) {
        this.validateSpecs(specs);
    }

    async buildFiles(path, tplPath) {
        const dest = require('path').resolve(path, `./${this._identifier}`);
        const current = require('path').resolve(tplPath, `./bundles/${this._identifier}`);
        await this._fs.copy(current, dest);
    }
}