require('colors');

module.exports = class Processor extends require('../../file-manager') {
    _name;
    _files = ["*"];
    _path;
    _dom = true;
    _defaultFiles = [];
    _create;

    skeleton = {
        default: ['path', 'files'],
        scss: ['dom', 'path', 'files'],
        less: ['dom', 'path', 'files'],
        ts: ['transpile', 'path', 'files']
    };
    _DEFAULT_NAME_FILES = {
        scss: 'styles.scss',
        less: 'styles.less'
    };
    TYPES = Object.freeze([
        "scss",
        "less",
        "ts",
        "js"
    ]);
    bundle;

    constructor(bundle, processor, specs) {
        super(bundle.path);

        this.bundle = bundle;
        this._name = processor;

        //if the bundle property comes in the specs it overwrites the model that was previously set
        specs.bundle && delete specs.bundle;
        specs.path && (this._path = specs.path);
        if (specs) this._checkProperties(specs);
    }

    getSkeleton() {
        if (this.skeleton.hasOwnProperty(this._name)) return this.skeleton[this._name];
        return this.skeleton.default;
    }

    /***
     * Returns all writable processor properties
     * @returns {{}}
     */
    getProperties() {
        const json = {};
        const skeleton = this.getSkeleton();
        skeleton.forEach(property => {
            if (this.hasOwnProperty([`_${property}`])) json[property] = this[`_${property}`];
        });
        return json;
    }

    createTemplate() {

    }

    get path() {
        if (this._path) return require('path').join(this.bundle.path, this._path);
        return this.bundle.path;
    }

    async create() {
        if (!await this._fs.exists(this.path)) await this._fs.mkdir(this.path);
        const tplPath = await this.templatesPath();
        const tplFile = this.joinPath(tplPath, 'processors', `${this._name}.txt`);

        // checks if the processor has default files and add to it.
        const defaultName = this._DEFAULT_NAME_FILES[this._name];
        if (await this._fs.exists(tplFile) && defaultName) {
            this.addFile({dirname: tplFile, name: defaultName});
        }

        return this.createFiles();
    }

    get defaultFiles() {
        return this._defaultFiles;
    }

    async createFile({name, dirname}) {
        const dest = this.joinPath(this.path, name);
        const content = await this._fs.readFile(dirname, 'utf8');
        this._write(dest, content);
    }

    async createFiles() {
        for (const index in this.defaultFiles) {
            if (!this.defaultFiles.hasOwnProperty(index)) continue;
            this.createFile(this.defaultFiles[index]);
        }
    }

    addFile(file) {
        this._defaultFiles.push(file);
    }

    _checkProperties(specs, print) {
        super._checkProperties(specs, print = 'processor');
        const skeleton = this.getSkeleton();

        skeleton.forEach(item => {
            if (!this.hasOwnProperty(item) && !this.hasOwnProperty(`_${item}`) && specs.hasOwnProperty(item)) {
                this[`_${item}`] = specs[item];
            }
        });
    };

    async build() {
        await this.create();
        if (!this._name) console.error("error".red, this);
    }
}
