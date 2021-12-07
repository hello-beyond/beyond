const Service = require('./service');
const Deployment = require('./deployment');
module.exports = class Application extends require('../file-manager') {
    _id;
    _version = 1;
    _port;
    _imprimir = true;
    _fileName = 'application.json';

    _templates = {
        empty: './applications/empty',
        react: './applications/react',
        web: './applications/web',
        node: './applications/node',
        backend: './applications/backend',
        library: './applications/library',
        express: './applications/express'
    };

    skeleton = [
        'version',
        'title', 'name', 'description',
        'layout', 'template', 'languages',
        {name: 'modules', type: 'object'},

        'static', 'scope', 'deployment',
        {name: 'backend', type: 'object'},
        {name: 'node', type: 'object'},
        {name: 'ssr', type: 'object'},

    ];

    get id() {
        return this._id;
    }

    relativePath() {
        return `${this.id}/${this._fileName}`;
    }

    #modules;
    get modules() {
        return this.#modules.structure;
    }

    set modules(data) {
        this.#modules.set(data);
    }

    #languages;
    get languages() {
        return this.#languages.structure;
    }

    set languages(data) {
        this.#languages.set(data);
    }

    #deployment;
    get deployment() {
        return this.#deployment.structure;
    }

    set deployment(data) {
        this.#deployment.set(data);
    }

    /**
     * @returns {string|*}
     */
    get modulesPath() {
        if (!this._modules || this._modules.path === '.') return this.file.path;

        const modulePath = this._modules.hasOwnProperty('path') ? this._modules.path : this._modules;
        return this.joinPath(this.file.path, modulePath);
    }

    get path() {
        return this.file?.path;
    }

    constructor(path, specs = undefined) {
        super(path);
        this._path = path;

        // this.#backend = new Service(path, this);
        this.#modules = new (require('./modules'))();
        this.#languages = new (require('./languages'))();
        this.#deployment = new Deployment(this.file.path);
        this._load();
        this._checkProperties(specs);

    }

    _setId(name) {
        return this._id = name.replace(/ /g, '-').toLowerCase();
    }

    async create(type, specs) {
        const fs = global.utils.fs;
        if (!type) {
            throw 'The type of application was not specified';
        }

        const folder = this._setId(specs.name)
        if (!folder) throw Error('The application instance requires a name');
        this.file.path = require('path').join(this._path, folder);

        if (!this._templates.hasOwnProperty(type)) {
            /**
             * @TODO: @julio check with felix and box
             */
            throw `Does not exist a ${type} template`;
        }

        if (await fs.exists(this.path)) {
            throw `The application is already exists in ${this.path}`;
        }

        const tplPath = await this.templatesPath();
        const current = require('path').resolve(tplPath, this._templates[type]);

        await fs.copy(current, this.path);
        await this._load();

        this.#deployment.addDistribution(this.#deployment.getDefault({port: specs.port}));
        this.save(specs);
    }

    save(values = {}) {
        const json = {deployment: this.#deployment.getProperties()};
        super.save(Object.assign(values, json));
    }

    set(object) {

    }

    addDistribution = distribution => this.#deployment.addDistribution(distribution);
}
